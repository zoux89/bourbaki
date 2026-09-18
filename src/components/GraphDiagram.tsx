import React from "react";

/*
 * Small SVG graph renderer used by the blog posts.
 *
 * Coordinates are given in abstract units (roughly TikZ centimetres) with
 * y pointing up; the component flips y and scales to pixels. Colours are
 * taken from the site's CSS variables so the figures follow the theme.
 */

export type VertexKind =
  | "plain"
  | "sel"
  | "white"
  | "blue"
  | "red"
  | "gray"
  | "orange"
  | "green"
  | "clique";

export interface Vertex {
  id: string;
  x: number;
  y: number;
  label?: string;
  kind?: VertexKind;
  /** draw an orange ring around the vertex */
  ring?: boolean;
}

export interface Edge {
  from: string;
  to: string;
  faded?: boolean;
  /** perpendicular offset (in units) of the control point; sign picks the side */
  bend?: number;
  label?: string;
  labelSide?: "left" | "right";
}

export interface Blob {
  nodes: string[];
  label?: string;
  /** extra padding in pixels */
  pad?: number;
}

export interface FreeText {
  x: number;
  y: number;
  text: string;
  anchor?: "start" | "middle" | "end";
  muted?: boolean;
  size?: number;
}

interface GraphDiagramProps {
  vertices: Vertex[];
  edges?: Edge[];
  blobs?: Blob[];
  texts?: FreeText[];
  /** pixels per unit */
  scale?: number;
  /** vertex radius in pixels */
  radius?: number;
  className?: string;
}

const MATH_FONT = "KaTeX_Math, 'Cambria Math', 'Times New Roman', serif";
const ROMAN_FONT = "KaTeX_Main, 'Times New Roman', serif";
const SANS_FONT = "var(--font-sans), system-ui, sans-serif";

const STYLE: Record<
  VertexKind,
  { fill: string; stroke: string; text: string; dashed?: boolean }
> = {
  plain: { fill: "var(--nb-bg-card)", stroke: "var(--nb-border)", text: "var(--nb-text)" },
  white: { fill: "var(--nb-bg-card)", stroke: "var(--nb-border)", text: "var(--nb-text)" },
  sel: { fill: "var(--nb-text)", stroke: "var(--nb-border)", text: "var(--nb-bg-card)" },
  blue: { fill: "#93c5fd", stroke: "var(--nb-border)", text: "#0a0a0a" },
  red: { fill: "#fca5a5", stroke: "var(--nb-border)", text: "#0a0a0a" },
  orange: { fill: "#fdba74", stroke: "var(--nb-border)", text: "#0a0a0a" },
  green: { fill: "#86efac", stroke: "var(--nb-border)", text: "#0a0a0a" },
  gray: {
    fill: "var(--nb-bg-card)",
    stroke: "var(--nb-text-muted)",
    text: "var(--nb-text-muted)",
    dashed: true,
  },
  clique: { fill: "#bbf7d0", stroke: "var(--nb-border)", text: "#0a0a0a" },
};

const RING_COLOR = "#ea580c";
const BLOB_COLOR = "var(--nb-primary)";

/* ------------------------------------------------------------------ */
/* Label parsing: "v_1", "{a,b,c}", "forbid x_1, x_2" -> styled tspans   */
/* ------------------------------------------------------------------ */

type Token =
  | { kind: "var"; text: string }
  | { kind: "word"; text: string }
  | { kind: "punct"; text: string }
  | { kind: "sub"; text: string };

function parseLabel(s: string): Token[] {
  const out: Token[] = [];
  const re = /([A-Za-z]+)(?:_(?:\{([^}]*)\}|([A-Za-z0-9])))?/g;
  let last = 0;
  for (const m of s.matchAll(re)) {
    const idx = m.index ?? 0;
    if (idx > last) out.push({ kind: "punct", text: s.slice(last, idx) });
    const word = m[1];
    const sub = m[2] ?? m[3];
    out.push({ kind: word.length === 1 ? "var" : "word", text: word });
    if (sub !== undefined) out.push({ kind: "sub", text: sub });
    last = idx + m[0].length;
  }
  if (last < s.length) out.push({ kind: "punct", text: s.slice(last) });
  return out;
}

function estimateWidth(s: string, fontSize: number): number {
  return s.replace(/_\{[^}]*\}|_./g, "").length * fontSize * 0.55;
}

/** Baseline offsets: a subscript drops the baseline, the token after it restores it. */
function baselineShifts(parts: Token[], shift: number): (number | undefined)[] {
  const out: (number | undefined)[] = [];
  for (let i = 0; i < parts.length; i++) {
    if (parts[i].kind === "sub") out.push(shift);
    else if (i > 0 && parts[i - 1].kind === "sub") out.push(-shift);
    else out.push(undefined);
  }
  return out;
}

function Tspans({ line, fontSize }: { line: string; fontSize: number }) {
  const parts = parseLabel(line);
  const shifts = baselineShifts(parts, fontSize * 0.3);
  return (
    <>
      {parts.map((p, i) => {
        const dy = shifts[i];
        if (p.kind === "sub") {
          const isNum = /^\d+$/.test(p.text);
          return (
            <tspan
              key={i}
              dy={dy}
              fontSize={fontSize * 0.72}
              fontFamily={isNum ? ROMAN_FONT : MATH_FONT}
              fontStyle={isNum ? "normal" : "italic"}
            >
              {p.text}
            </tspan>
          );
        }
        if (p.kind === "var") {
          return (
            <tspan key={i} dy={dy} fontFamily={MATH_FONT} fontStyle="italic">
              {p.text}
            </tspan>
          );
        }
        if (p.kind === "word") {
          return (
            <tspan key={i} dy={dy} fontFamily={SANS_FONT}>
              {p.text}
            </tspan>
          );
        }
        return (
          <tspan key={i} dy={dy} fontFamily={ROMAN_FONT} xmlSpace="preserve">
            {p.text}
          </tspan>
        );
      })}
    </>
  );
}

function Label({
  x,
  y,
  text,
  fontSize,
  color,
  anchor = "middle",
}: {
  x: number;
  y: number;
  text: string;
  fontSize: number;
  color: string;
  anchor?: "start" | "middle" | "end";
}) {
  const lines = text.split("\n");
  const lh = fontSize * 1.25;
  const y0 = y - ((lines.length - 1) * lh) / 2;
  return (
    <>
      {lines.map((line, i) => (
        <text
          key={i}
          x={x}
          y={y0 + i * lh}
          fontSize={fontSize}
          fill={color}
          textAnchor={anchor}
          dominantBaseline="central"
          style={{ userSelect: "none" }}
        >
          <Tspans line={line} fontSize={fontSize} />
        </text>
      ))}
    </>
  );
}

/* ------------------------------------------------------------------ */

export default function GraphDiagram({
  vertices,
  edges = [],
  blobs = [],
  texts = [],
  scale = 60,
  radius = 15,
  className = "",
}: GraphDiagramProps) {
  const fontSize = radius * 0.95;
  const byId = new Map(vertices.map((v) => [v.id, v]));

  const px = (v: { x: number; y: number }) => ({ x: v.x * scale, y: -v.y * scale });

  const cliqueBox = (v: Vertex) => {
    const w = Math.max(44, estimateWidth(v.label ?? "", fontSize) + 22);
    const h = radius * 1.9;
    return { w, h };
  };

  // bounding box
  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;
  const grow = (x: number, y: number, r: number) => {
    minX = Math.min(minX, x - r);
    maxX = Math.max(maxX, x + r);
    minY = Math.min(minY, y - r);
    maxY = Math.max(maxY, y + r);
  };
  for (const v of vertices) {
    const p = px(v);
    if (v.kind === "clique") {
      const { w, h } = cliqueBox(v);
      grow(p.x, p.y, Math.max(w, h) / 2 + 2);
    } else {
      grow(p.x, p.y, radius + (v.ring ? 8 : 3));
    }
  }
  for (const b of blobs) {
    const pad = radius + (b.pad ?? 10);
    for (const id of b.nodes) {
      const v = byId.get(id);
      if (!v) continue;
      const p = px(v);
      grow(p.x, p.y, pad + 2);
      if (b.label) grow(p.x, p.y - pad - fontSize, 2);
    }
  }
  for (const t of texts) {
    const p = px(t);
    const fs = t.size ?? fontSize;
    const w = estimateWidth(t.text, fs);
    const a = t.anchor ?? "middle";
    const left = a === "start" ? 0 : a === "end" ? w : w / 2;
    const right = a === "start" ? w : a === "end" ? 0 : w / 2;
    minX = Math.min(minX, p.x - left);
    maxX = Math.max(maxX, p.x + right);
    grow(p.x, p.y, fs * 0.7);
  }
  for (const e of edges) {
    if (!e.label) continue;
    const a = byId.get(e.from);
    const b = byId.get(e.to);
    if (!a || !b) continue;
    const pa = px(a);
    const pb = px(b);
    const mx = (pa.x + pb.x) / 2;
    const my = (pa.y + pb.y) / 2;
    const lines = e.label.split("\n");
    const w = Math.max(...lines.map((l) => estimateWidth(l, fontSize * 0.8)));
    const h = lines.length * fontSize;
    if ((e.labelSide ?? "right") === "left") minX = Math.min(minX, mx - w - 12);
    else maxX = Math.max(maxX, mx + w + 12);
    grow(mx, my, h / 2 + 4);
  }
  const margin = 6;
  const vbX = minX - margin;
  const vbY = minY - margin;
  const vbW = maxX - minX + 2 * margin;
  const vbH = maxY - minY + 2 * margin;

  return (
    <svg
      viewBox={`${vbX} ${vbY} ${vbW} ${vbH}`}
      width={vbW}
      height={vbH}
      className={`block max-w-full h-auto ${className}`}
      role="img"
    >
      {/* blobs (background) */}
      {blobs.map((b, i) => {
        const pad = radius + (b.pad ?? 10);
        let bx0 = Infinity,
          by0 = Infinity,
          bx1 = -Infinity,
          by1 = -Infinity;
        for (const id of b.nodes) {
          const v = byId.get(id);
          if (!v) continue;
          const p = px(v);
          bx0 = Math.min(bx0, p.x - pad);
          bx1 = Math.max(bx1, p.x + pad);
          by0 = Math.min(by0, p.y - pad);
          by1 = Math.max(by1, p.y + pad);
        }
        return (
          <g key={`blob-${i}`}>
            <rect
              x={bx0}
              y={by0}
              width={bx1 - bx0}
              height={by1 - by0}
              rx={radius}
              fill={BLOB_COLOR}
              fillOpacity={0.12}
              stroke={BLOB_COLOR}
              strokeOpacity={0.75}
              strokeWidth={1.5}
              strokeDasharray="6 4"
            />
            {b.label && (
              <Label
                x={(bx0 + bx1) / 2}
                y={by0 - fontSize * 0.7}
                text={b.label}
                fontSize={fontSize}
                color={BLOB_COLOR}
              />
            )}
          </g>
        );
      })}

      {/* edges */}
      {edges.map((e, i) => {
        const a = byId.get(e.from);
        const b = byId.get(e.to);
        if (!a || !b) return null;
        const pa = px(a);
        const pb = px(b);
        const dx = pb.x - pa.x;
        const dy = pb.y - pa.y;
        const len = Math.hypot(dx, dy) || 1;
        const nx = -dy / len;
        const ny = dx / len;
        const mx = (pa.x + pb.x) / 2;
        const my = (pa.y + pb.y) / 2;
        const stroke = e.faded ? "var(--nb-text-muted)" : "var(--nb-border)";
        const opacity = e.faded ? 0.35 : 1;
        let path: React.ReactNode;
        if (e.bend) {
          const cx = mx + nx * e.bend * scale;
          const cy = my + ny * e.bend * scale;
          path = (
            <path
              d={`M ${pa.x} ${pa.y} Q ${cx} ${cy} ${pb.x} ${pb.y}`}
              fill="none"
              stroke={stroke}
              strokeOpacity={opacity}
              strokeWidth={2}
            />
          );
        } else {
          path = (
            <line
              x1={pa.x}
              y1={pa.y}
              x2={pb.x}
              y2={pb.y}
              stroke={stroke}
              strokeOpacity={opacity}
              strokeWidth={2}
            />
          );
        }
        let label: React.ReactNode = null;
        if (e.label) {
          const side = e.labelSide ?? "right";
          const off = 9;
          const lx = side === "left" ? mx + nx * off : mx - nx * off;
          const ly = side === "left" ? my + ny * off : my - ny * off;
          label = (
            <Label
              x={lx}
              y={ly}
              text={e.label}
              fontSize={fontSize * 0.8}
              color="var(--nb-text-muted)"
              anchor={side === "left" ? "end" : "start"}
            />
          );
        }
        return (
          <g key={`edge-${i}`}>
            {path}
            {label}
          </g>
        );
      })}

      {/* vertices */}
      {vertices.map((v) => {
        const p = px(v);
        const st = STYLE[v.kind ?? "plain"];
        if (v.kind === "clique") {
          const { w, h } = cliqueBox(v);
          return (
            <g key={v.id}>
              <rect
                x={p.x - w / 2}
                y={p.y - h / 2}
                width={w}
                height={h}
                rx={5}
                fill={st.fill}
                stroke={st.stroke}
                strokeWidth={2}
              />
              {v.label && (
                <Label x={p.x} y={p.y} text={v.label} fontSize={fontSize} color={st.text} />
              )}
            </g>
          );
        }
        return (
          <g key={v.id}>
            {v.ring && (
              <circle
                cx={p.x}
                cy={p.y}
                r={radius + 5}
                fill="none"
                stroke={RING_COLOR}
                strokeWidth={2.5}
              />
            )}
            <circle
              cx={p.x}
              cy={p.y}
              r={radius}
              fill={st.fill}
              stroke={st.stroke}
              strokeWidth={2}
              strokeDasharray={st.dashed ? "4 3" : undefined}
            />
            {v.label && (
              <Label x={p.x} y={p.y} text={v.label} fontSize={fontSize} color={st.text} />
            )}
          </g>
        );
      })}

      {/* free text */}
      {texts.map((t, i) => {
        const p = px(t);
        return (
          <Label
            key={`text-${i}`}
            x={p.x}
            y={p.y}
            text={t.text}
            fontSize={t.size ?? fontSize}
            color={t.muted ? "var(--nb-text-muted)" : "var(--nb-text)"}
            anchor={t.anchor ?? "middle"}
          />
        );
      })}
    </svg>
  );
}

/** Small inline swatch of a vertex kind, for legends. */
export function VertexSwatch({ kind }: { kind: VertexKind }) {
  const st = STYLE[kind];
  return (
    <svg width={22} height={22} viewBox="0 0 22 22" className="inline-block align-middle">
      <circle
        cx={11}
        cy={11}
        r={8.5}
        fill={st.fill}
        stroke={st.stroke}
        strokeWidth={2}
        strokeDasharray={st.dashed ? "3 2" : undefined}
      />
    </svg>
  );
}
