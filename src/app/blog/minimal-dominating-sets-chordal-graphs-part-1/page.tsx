"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import GraphDiagram, {
  VertexSwatch,
  type Vertex,
  type Edge,
} from "@/components/GraphDiagram";
import "katex/dist/katex.min.css";
import { BlockMath, InlineMath } from "react-katex";

/* ------------------------------------------------------------------ */
/* Layout helpers                                                      */
/* ------------------------------------------------------------------ */

// Numbered statement (lemma, theorem, proposition, corollary, example).
const Statement = ({
  label,
  name,
  children,
}: {
  label: string;
  name?: string;
  children: React.ReactNode;
}) => (
  <div className="bg-[var(--nb-bg-card)] border-2 border-[var(--nb-border)] px-5 py-4 mb-4">
    <p className="mb-2">
      <strong>{label}</strong>
      {name && <span className="text-[var(--nb-text-muted)]"> ({name})</span>}
    </p>
    {children}
  </div>
);

const DefinitionCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="bg-[var(--nb-bg-card)] border-l-4 border-[var(--nb-primary)] pl-4 py-3 mb-6">
    <p className="font-bold mb-2">{title}</p>
    {children}
  </div>
);

// Proof block, placed directly after its statement.
const Proof = ({ children }: { children: React.ReactNode }) => (
  <div className="border-l-4 border-[var(--nb-text-muted)] pl-4 py-1 mb-6">
    <p className="italic mb-2">Proof.</p>
    {children}
  </div>
);

const Remark = ({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) => (
  <div className="bg-[var(--nb-bg)] border-2 border-dashed border-[var(--nb-border)] p-4 mb-6">
    <p className="mb-2">
      <strong>Remark</strong>
      {title && <span className="text-[var(--nb-text-muted)]"> ({title})</span>}
    </p>
    {children}
  </div>
);

const Figure = ({
  children,
  caption,
}: {
  children: React.ReactNode;
  caption?: React.ReactNode;
}) => (
  <figure className="bg-[var(--nb-bg-card)] border-2 border-[var(--nb-border)] p-4 md:p-6 mb-6 overflow-x-auto">
    <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10">
      {children}
    </div>
    {caption && (
      <figcaption className="mt-4 text-sm text-center text-[var(--nb-text-muted)]">
        {caption}
      </figcaption>
    )}
  </figure>
);

const Side = ({ children }: { children: React.ReactNode }) => (
  <div className="text-sm leading-7 md:max-w-xs">{children}</div>
);

const DataTable = ({
  head,
  rows,
}: {
  head: React.ReactNode[];
  rows: React.ReactNode[][];
}) => (
  <div className="overflow-x-auto mb-6">
    <table className="w-full text-sm border-2 border-[var(--nb-border)]">
      <thead>
        <tr className="bg-[var(--nb-primary)] text-white">
          {head.map((h, i) => (
            <th key={i} className="text-left px-3 py-2 font-semibold">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i} className="border-t-2 border-[var(--nb-border)]">
            {r.map((c, j) => (
              <td key={j} className="px-3 py-2 align-top">
                {c}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

/* ------------------------------------------------------------------ */
/* Figure data                                                         */
/* ------------------------------------------------------------------ */

// seven-vertex running example
const G7_POS: Omit<Vertex, "kind">[] = [
  { id: "a", x: 0, y: 0, label: "a" },
  { id: "b", x: 1.2, y: 0.7, label: "b" },
  { id: "c", x: 1.2, y: -0.7, label: "c" },
  { id: "v", x: 2.4, y: 0, label: "v" },
  { id: "d", x: 3.6, y: 0.7, label: "d" },
  { id: "f", x: 3.6, y: -0.7, label: "f" },
  { id: "g", x: 4.8, y: 0, label: "g" },
];
const G7_EDGES: Edge[] = [
  { from: "a", to: "b" },
  { from: "a", to: "c" },
  { from: "b", to: "v" },
  { from: "c", to: "v" },
  { from: "v", to: "d" },
  { from: "v", to: "f" },
  { from: "d", to: "g" },
  { from: "f", to: "g" },
  { from: "d", to: "f" },
];
const g7 = (sel: string[] = []): Vertex[] =>
  G7_POS.map((v) => ({ ...v, kind: sel.includes(v.id) ? "sel" : "plain" }));

// path P5
const p5 = (sel: string[] = [], ring = false, y = 0): Vertex[] =>
  [1, 2, 3, 4, 5].map((i) => ({
    id: `v${i}_${y}`,
    x: i - 1,
    y,
    label: `v_${i}`,
    kind: sel.includes(`v${i}`) ? "sel" : "plain",
    ring: ring && sel.includes(`v${i}`),
  }));
const p5Edges = (y = 0): Edge[] =>
  [1, 2, 3, 4].map((i) => ({ from: `v${i}_${y}`, to: `v${i + 1}_${y}` }));

// six-vertex graph a,b,c | c,d | d,e,f
const G6_POS: Omit<Vertex, "kind">[] = [
  { id: "a", x: 0, y: 0.8, label: "a" },
  { id: "b", x: 0, y: -0.8, label: "b" },
  { id: "c", x: 1.2, y: 0, label: "c" },
  { id: "d", x: 2.6, y: 0, label: "d" },
  { id: "e", x: 3.8, y: 0.8, label: "e" },
  { id: "f", x: 3.8, y: -0.8, label: "f" },
];
const G6_EDGES: Edge[] = [
  { from: "a", to: "b" },
  { from: "a", to: "c" },
  { from: "b", to: "c" },
  { from: "c", to: "d" },
  { from: "d", to: "e" },
  { from: "d", to: "f" },
  { from: "e", to: "f" },
];
const g6 = (kinds: Partial<Record<string, Vertex["kind"]>> = {}): Vertex[] =>
  G6_POS.map((v) => ({ ...v, kind: kinds[v.id] ?? "white" }));

// simplicial example u,a,b,c,d
const SIMP_POS = (labels: string[]): Vertex[] => [
  { id: "u", x: 0, y: 0, label: labels[0], kind: "orange" },
  { id: "a", x: 1.3, y: 0.8, label: labels[1] },
  { id: "b", x: 1.3, y: -0.8, label: labels[2] },
  { id: "c", x: 2.6, y: 0, label: labels[3] },
  { id: "d", x: 3.9, y: 0, label: labels[4] },
];
const SIMP_EDGES: Edge[] = [
  { from: "u", to: "a" },
  { from: "u", to: "b" },
  { from: "a", to: "b" },
  { from: "a", to: "c" },
  { from: "b", to: "c" },
  { from: "c", to: "d" },
];

/* ------------------------------------------------------------------ */

export default function MinimalDominatingSetsChordalPart1() {
  return (
    <div className="min-h-screen bg-[var(--nb-bg)] transition-colors duration-300">
      <header className="border-b-3 border-[var(--nb-border)] bg-[var(--nb-bg-card)]">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[var(--nb-text)] hover:text-[var(--nb-primary)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <article className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className="px-2 py-1 bg-[var(--nb-primary)] text-white text-xs font-semibold">
              Graph Theory
            </span>
            <span className="px-2 py-1 bg-[var(--nb-primary)] text-white text-xs font-semibold">
              Exact Algorithms
            </span>
            <span className="px-2 py-1 bg-[var(--nb-primary)] text-white text-xs font-semibold">
              Combinatorics
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--nb-text)] mb-4">
            Minimal Dominating Sets in Chordal Graphs, Part I
          </h1>
          <p className="text-[var(--nb-text-muted)] text-lg">
            Domination, chordal graphs, branch and reduce, and measure and
            conquer
          </p>
          <div className="flex items-center gap-4 mt-4 text-sm text-[var(--nb-text-muted)] flex-wrap">
            <span>September 2026</span>
            <span>•</span>
            <span>25 min read</span>
            <span>•</span>
            <span className="font-mono text-[var(--nb-primary)]">Scribbling</span>
          </div>
        </div>

        <div className="prose prose-lg max-w-none text-[var(--nb-text)]">
          <p className="mb-4">
            The number of minimal dominating sets of an{" "}
            <InlineMath math="n" />-vertex chordal graph is known to lie
            between <InlineMath math="1.4422^{\,n}" /> and{" "}
            <InlineMath math="1.5048^{\,n}" />, and the upper bound comes
            from a branch-and-reduce algorithm whose running time is analyzed
            by measure and conquer. These notes collect the definitions and
            lemmas needed to read that argument, starting from domination
            itself and ending with a worked branching vector. Part II uses
            them to go through the annotated enumeration algorithm.
          </p>
          <p className="mb-10">
            Throughout, <InlineMath math="G=(V,E)" /> is a finite, simple,
            undirected graph and <InlineMath math="n=|V|" />.
          </p>

          {/* ------------------------------------------------------------ */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[var(--nb-text)] mb-4 border-b-2 border-[var(--nb-border)] pb-2">
              1. Domination
            </h2>

            <h3 className="text-xl font-bold mb-4 mt-6">1.1 Neighborhoods</h3>

            <DefinitionCard title="Definition (Neighborhood)">
              <p>
                For <InlineMath math="v\in V" />, the <em>open neighborhood</em>{" "}
                is <InlineMath math="N(v)=\{u\in V: uv\in E\}" /> and the{" "}
                <em>closed neighborhood</em> is{" "}
                <InlineMath math="N[v]=N(v)\cup\{v\}" />. For{" "}
                <InlineMath math="S\subseteq V" /> we write
              </p>
              <div className="overflow-x-auto mt-3">
                <BlockMath math="N[S]=\bigcup_{v\in S}N[v]." />
              </div>
            </DefinitionCard>

            <p className="mb-4">
              The square bracket means that <InlineMath math="v" /> itself is
              included. Most statements about domination are written in
              terms of closed neighborhoods.
            </p>

            <Figure>
              <GraphDiagram
                vertices={g7()}
                edges={G7_EDGES}
                blobs={[{ nodes: ["b", "c", "v", "d", "f"] }]}
                scale={66}
              />
              <Side>
                <InlineMath math="N(v)=\{b,c,d,f\}" />
                <br />
                <InlineMath math="N[v]=\{b,c,d,f,v\}" /> (shaded)
              </Side>
            </Figure>

            <h3 className="text-xl font-bold mb-4 mt-6">1.2 Dominating sets</h3>

            <DefinitionCard title="Definition (Dominating set)">
              <p>
                <InlineMath math="D\subseteq V" /> is a <em>dominating set</em>{" "}
                of <InlineMath math="G" /> if <InlineMath math="N[D]=V" />;
                equivalently, every vertex of <InlineMath math="G" /> is
                either in <InlineMath math="D" /> or adjacent to a vertex of{" "}
                <InlineMath math="D" />.
              </p>
            </DefinitionCard>

            <Figure>
              <GraphDiagram vertices={g7(["v", "g"])} edges={G7_EDGES} scale={66} />
              <Side>
                <InlineMath math="D=\{v,g\}" /> is <em>not</em> dominating:{" "}
                <InlineMath math="a\notin N[D]" />.
              </Side>
            </Figure>

            <Figure>
              <GraphDiagram vertices={g7(["a", "v", "g"])} edges={G7_EDGES} scale={66} />
              <Side>
                <InlineMath math="D=\{a,v,g\}" /> <em>is</em> dominating:
                <br />
                <InlineMath math="N[a]=\{a,b,c\}" />,{" "}
                <InlineMath math="N[v]=\{b,c,v,d,f\}" />,{" "}
                <InlineMath math="N[g]=\{d,f,g\}" />, and the union is all
                of <InlineMath math="V" />.
              </Side>
            </Figure>

            <p className="mb-4">
              In the first figure <InlineMath math="a" /> is adjacent only to{" "}
              <InlineMath math="b" /> and <InlineMath math="c" />, neither of
              which is in <InlineMath math="\{v,g\}" />, so{" "}
              <InlineMath math="a" /> is not dominated. Adding{" "}
              <InlineMath math="a" /> to the set fixes this.
            </p>

            <h3 className="text-xl font-bold mb-4 mt-6">1.3 Minimal and minimum</h3>

            <DefinitionCard title="Definition (Minimal, minimum)">
              <p>
                A dominating set <InlineMath math="D" /> is <em>minimum</em>{" "}
                if no dominating set has smaller cardinality; its size is the
                domination number <InlineMath math="\gamma(G)" />. It is{" "}
                <em>minimal</em> (or <em>inclusion-minimal</em>) if no proper
                subset <InlineMath math="D'\subsetneq D" /> is dominating. We
                write <InlineMath math="\mathcal{D}_{\min}(G)" /> for the
                family of all minimal dominating sets.
              </p>
            </DefinitionCard>

            <p className="mb-4">
              Every minimum dominating set is minimal, but not conversely. A
              graph has one value of <InlineMath math="\gamma(G)" /> and may
              have exponentially many minimal dominating sets, so{" "}
              <InlineMath math="|\mathcal{D}_{\min}(G)|" /> is a nontrivial
              function of <InlineMath math="n" />.
            </p>

            <Statement label="Example" name="the path on five vertices">
              <p>
                Take the path <InlineMath math="v_1v_2v_3v_4v_5" />. Then{" "}
                <InlineMath math="\gamma(P_5)=2" />, realized by{" "}
                <InlineMath math="\{v_2,v_4\}" />, while{" "}
                <InlineMath math="\{v_1,v_3,v_5\}" /> is minimal of size{" "}
                <InlineMath math="3" />.
              </p>
            </Statement>

            <Figure>
              <GraphDiagram
                vertices={[...p5([], false, 0), ...p5(["v2", "v4"], false, -1.2), ...p5(["v1", "v3", "v5"], false, -2.4)]}
                edges={[...p5Edges(0), ...p5Edges(-1.2), ...p5Edges(-2.4)]}
                texts={[
                  { x: -0.6, y: 0, text: "P_5:", anchor: "end" },
                  { x: -0.6, y: -1.2, text: "{v_2, v_4}", anchor: "end" },
                  { x: -0.6, y: -2.4, text: "{v_1, v_3, v_5}", anchor: "end" },
                ]}
                scale={66}
              />
            </Figure>

            <p className="mb-4">
              The set <InlineMath math="\{v_1,v_3,v_5\}" /> cannot be shrunk
              because each member is the only one covering some vertex:{" "}
              <InlineMath math="v_1" /> alone covers <InlineMath math="v_1" />,{" "}
              <InlineMath math="v_3" /> alone covers <InlineMath math="v_3" />,
              and <InlineMath math="v_5" /> alone covers{" "}
              <InlineMath math="v_5" />. The general criterion is the same.
            </p>

            <h3 className="text-xl font-bold mb-4 mt-6">1.4 Private neighbors</h3>

            <DefinitionCard title="Definition (Private neighbor)">
              <p>
                For <InlineMath math="x\in D" />, the{" "}
                <em>private neighborhood</em> of <InlineMath math="x" /> with
                respect to <InlineMath math="D" /> is
              </p>
              <div className="overflow-x-auto mt-3">
                <BlockMath math="\operatorname{priv}(x,D)=N[x]\setminus\bigcup_{y\in D\setminus\{x\}}N[y]." />
              </div>
              <p className="mt-3">
                An element of <InlineMath math="\operatorname{priv}(x,D)" />{" "}
                is a <em>private neighbor</em> of <InlineMath math="x" />.
                Note <InlineMath math="x\in N[x]" />, so{" "}
                <InlineMath math="x" /> may be its own private neighbor.
              </p>
            </DefinitionCard>

            <Statement label="Lemma 1" name="minimality criterion">
              <p>
                A dominating set <InlineMath math="D" /> is minimal if and
                only if{" "}
                <InlineMath math="\operatorname{priv}(x,D)\neq\varnothing" />{" "}
                for every <InlineMath math="x\in D" />.
              </p>
            </Statement>
            <Proof>
                <p className="mb-3">
                  <InlineMath math="(\Leftarrow)" /> Suppose every{" "}
                  <InlineMath math="x\in D" /> has a private neighbor{" "}
                  <InlineMath math="p_x" />. If{" "}
                  <InlineMath math="D'\subsetneq D" /> were dominating, pick{" "}
                  <InlineMath math="x\in D\setminus D'" />. Then{" "}
                  <InlineMath math="p_x\in N[D']\subseteq N[D\setminus\{x\}]" />,
                  so <InlineMath math="p_x\in N[y]" /> for some{" "}
                  <InlineMath math="y\in D\setminus\{x\}" />, contradicting{" "}
                  <InlineMath math="p_x\in\operatorname{priv}(x,D)" />.
                </p>
                <p>
                  <InlineMath math="(\Rightarrow)" /> Suppose{" "}
                  <InlineMath math="\operatorname{priv}(x,D)=\varnothing" />{" "}
                  for some <InlineMath math="x\in D" />. Then{" "}
                  <InlineMath math="N[x]\subseteq\bigcup_{y\in D\setminus\{x\}}N[y]" />,
                  hence{" "}
                  <InlineMath math="N[D\setminus\{x\}]=N[D]=V" />, so{" "}
                  <InlineMath math="D\setminus\{x\}" /> is a smaller
                  dominating set and <InlineMath math="D" /> is not minimal.
                  ∎
                </p>
            </Proof>

            <Figure>
              <GraphDiagram
                vertices={p5(["v1", "v3", "v5"], true)}
                edges={p5Edges(0)}
                scale={66}
              />
              <Side>
                <InlineMath math="\operatorname{priv}(v_1,D)=\{v_1\}" />
                <br />
                <InlineMath math="\operatorname{priv}(v_3,D)=\{v_3\}" />
                <br />
                <InlineMath math="\operatorname{priv}(v_5,D)=\{v_5\}" />
              </Side>
            </Figure>

            <p className="mb-4">
              Contrast this with a <em>non</em>-minimal set. In{" "}
              <InlineMath math="P_5" /> take{" "}
              <InlineMath math="D=\{v_1,v_2,v_4\}" />: here{" "}
              <InlineMath math="N[v_1]=\{v_1,v_2\}\subseteq N[v_2]=\{v_1,v_2,v_3\}" />,
              so <InlineMath math="\operatorname{priv}(v_1,D)=\varnothing" />{" "}
              and <InlineMath math="v_1" /> can be dropped.
            </p>

            <Remark title="coverage and justification">
              <p>
                By Lemma 1, a minimal dominating set satisfies two
                independent kinds of constraint: <em>coverage</em>, every
                vertex is dominated, and <em>justification</em>, every chosen
                vertex has a private neighbor. An enumeration algorithm has
                to track both, and the second is harder to maintain
                incrementally, which is the main technical issue in Part II.
              </p>
            </Remark>
          </section>

          {/* ------------------------------------------------------------ */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[var(--nb-text)] mb-4 border-b-2 border-[var(--nb-border)] pb-2">
              2. Counting minimal dominating sets
            </h2>

            <h3 className="text-xl font-bold mb-4 mt-6">2.1 The lower bound</h3>

            <Statement label="Proposition 2">
              <p>
                For <InlineMath math="n=3t" />, the disjoint union of{" "}
                <InlineMath math="t" /> triangles has exactly{" "}
                <InlineMath math="3^{n/3}\approx 1.4422^{\,n}" /> minimal
                dominating sets.
              </p>
            </Statement>
            <Proof>
              <p>
                In a triangle every vertex dominates the whole triangle. A
                dominating set must contain at least one vertex per
                triangle; if it contained two from the same triangle,
                neither would have a private neighbor. So the minimal
                dominating sets are exactly the transversals picking one
                vertex per triangle, and there are{" "}
                <InlineMath math="3^t" /> of them. ∎
              </p>
            </Proof>

            <Figure
              caption={
                <>
                  <InlineMath math="t" /> disjoint triangles,{" "}
                  <InlineMath math="n=3t" />: exactly{" "}
                  <InlineMath math="3^{t}=3^{n/3}" /> minimal dominating sets
                </>
              }
            >
              <GraphDiagram
                vertices={[0, 1, 2].flatMap((k) => [
                  { id: `p${k}`, x: k * 2.4, y: 0 },
                  { id: `q${k}`, x: k * 2.4 + 1.2, y: 0 },
                  { id: `r${k}`, x: k * 2.4 + 0.6, y: 1 },
                ])}
                edges={[0, 1, 2].flatMap((k) => [
                  { from: `p${k}`, to: `q${k}` },
                  { from: `q${k}`, to: `r${k}` },
                  { from: `r${k}`, to: `p${k}` },
                ])}
                texts={[{ x: 7.4, y: 0.5, text: "⋯", size: 22 }]}
                scale={56}
                radius={12}
              />
            </Figure>

            <p className="mb-4">
              So <InlineMath math="|\mathcal{D}_{\min}(G)|" /> is exponential
              in the worst case, and the question is the base of the
              exponential. Formally, one wants
            </p>
            <div className="bg-[var(--nb-bg)] border-2 border-[var(--nb-border)] p-3 mb-4 text-center overflow-x-auto">
              <BlockMath math="\mathrm{md}(\mathcal{C},n)=\max\{\,|\mathcal{D}_{\min}(G)| : G\in\mathcal{C},\ |V(G)|=n\,\}" />
            </div>
            <p className="mb-4">
              for a graph class <InlineMath math="\mathcal{C}" />, up to
              polynomial factors.
            </p>

            <h3 className="text-xl font-bold mb-4 mt-6">2.2 Known bounds</h3>

            <DataTable
              head={["class", "lower bound", "upper bound"]}
              rows={[
                [
                  "all graphs",
                  <InlineMath key="l1" math="15^{n/6}\approx 1.5704^{\,n}" />,
                  <InlineMath key="u1" math="1.7159^{\,n}" />,
                ],
                [
                  "chordal",
                  <InlineMath key="l2" math="3^{n/3}\approx 1.4422^{\,n}" />,
                  <InlineMath key="u2" math="1.5048^{\,n}" />,
                ],
                [
                  "split",
                  <InlineMath key="l3" math="1.4656^{\,n}" />,
                  <>
                    <InlineMath key="u3" math="1.4656^{\,n}" /> (tight)
                  </>,
                ],
              ]}
            />

            <p className="mb-4">
              The general upper bound is due to Fomin, Grandoni, Pyatkin and
              Stepanov [5]. The chordal upper bound{" "}
              <InlineMath math="1.5048^{\,n}" /> is due to Golovach, Kratsch,
              Liedloff and Sayadi [2], improving{" "}
              <InlineMath math="1.5214^{\,n}" /> (Abu-Khzam, Heggernes) and
              before that <InlineMath math="1.6181^{\,n}" /> (Couturier,
              Heggernes, van &apos;t Hof, Kratsch [1]). The lower bound is
              Proposition 2, and for chordal graphs
            </p>
            <div className="bg-[var(--nb-bg)] border-2 border-[var(--nb-border)] p-3 mb-4 text-center overflow-x-auto">
              <BlockMath math="1.4422^{\,n}\;\le\;\mathrm{md}(\text{chordal},n)\;\le\;1.5048^{\,n}." />
            </div>
            <p className="mb-4">
              The open question is how far the upper bound can be lowered.
            </p>

            <h3 className="text-xl font-bold mb-4 mt-6">
              2.3 Input-sensitive and output-sensitive enumeration
            </h3>

            <p className="mb-4">There are two different questions here.</p>
            <ul className="list-disc pl-5 mb-4 space-y-3">
              <li>
                <strong>(a) Input-sensitive.</strong> Prove{" "}
                <InlineMath math="|\mathcal{D}_{\min}(G)|\le c^{\,n}" /> with{" "}
                <InlineMath math="c" /> small, and list all of them in{" "}
                <InlineMath math="O^*(c^{\,n})" /> time. The measure is{" "}
                <InlineMath math="n" />.
              </li>
              <li>
                <strong>(b) Output-sensitive.</strong> Enumerate{" "}
                <InlineMath math="\mathcal{D}_{\min}(G)" /> in time
                polynomial in{" "}
                <InlineMath math="n+|\mathcal{D}_{\min}(G)|" />, or with
                polynomial delay between consecutive outputs. An exponential
                total running time is acceptable if there are exponentially
                many outputs.
              </li>
            </ul>

            <p className="mb-4">
              Question (b) for general graphs, known as{" "}
              <span className="font-mono text-sm">Dom</span>, is open. The
              reason it is studied is a reformulation.{" "}
              <InlineMath math="D" /> dominates <InlineMath math="G" /> iff{" "}
              <InlineMath math="D\cap N[v]\neq\varnothing" /> for all{" "}
              <InlineMath math="v" />, i.e. <InlineMath math="D" /> is a{" "}
              <em>transversal</em> (hitting set) of the closed-neighborhood
              hypergraph
            </p>
            <div className="bg-[var(--nb-bg)] border-2 border-[var(--nb-border)] p-3 mb-4 text-center overflow-x-auto">
              <BlockMath math="\mathcal{N}(G)=\{\,N[v] : v\in V\,\}," />
            </div>
            <p className="mb-4">
              and minimal dominating sets are exactly its minimal
              transversals. Kanté, Limouzy, Mary and Nourine [4] showed that{" "}
              <span className="font-mono text-sm">Dom</span> is equivalent to
              general hypergraph transversal enumeration,{" "}
              <span className="font-mono text-sm">Trans-Enum</span>, for
              which Fredman and Khachiyan gave a quasi-polynomial{" "}
              <InlineMath math="N^{o(\log N)}" /> algorithm and for which an
              output-polynomial algorithm is not known.
            </p>

            <Remark>
              <p>
                For question (a) there is no need to maintain
                private-neighbor information during the recursion. It is
                enough that every minimal dominating set reaches at least
                one leaf of the search tree, since distinct sets then land at
                distinct leaves and{" "}
                <InlineMath math="|\mathcal{D}_{\min}(G)|\le\#\text{leaves}" />.
                For question (b) minimality has to be certified along the
                way, and the three-color annotation of Section 4 does not do
                that on its own.
              </p>
            </Remark>
          </section>

          {/* ------------------------------------------------------------ */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[var(--nb-text)] mb-4 border-b-2 border-[var(--nb-border)] pb-2">
              3. Chordal graphs
            </h2>

            <DefinitionCard title="Definition (Chordal)">
              <p>
                <InlineMath math="G" /> is <em>chordal</em> if it has no
                induced cycle of length <InlineMath math="\ge 4" />;
                equivalently, every cycle of length{" "}
                <InlineMath math="\ge 4" /> has a chord.
              </p>
            </DefinitionCard>

            <figure className="bg-[var(--nb-bg-card)] border-2 border-[var(--nb-border)] p-4 md:p-6 mb-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-end justify-items-center text-sm text-center">
                <div className="flex flex-col items-center gap-3">
                  <GraphDiagram
                    vertices={[
                      { id: "a", x: 0, y: 0 },
                      { id: "b", x: 1.2, y: 0 },
                      { id: "c", x: 1.2, y: 1.2 },
                      { id: "d", x: 0, y: 1.2 },
                    ]}
                    edges={[
                      { from: "a", to: "b" },
                      { from: "b", to: "c" },
                      { from: "c", to: "d" },
                      { from: "d", to: "a" },
                    ]}
                    scale={56}
                    radius={12}
                  />
                  <span>
                    <InlineMath math="C_4" />: <strong>not</strong> chordal
                  </span>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <GraphDiagram
                    vertices={[
                      { id: "a", x: 0, y: 0 },
                      { id: "b", x: 1.2, y: 0 },
                      { id: "c", x: 1.2, y: 1.2 },
                      { id: "d", x: 0, y: 1.2 },
                    ]}
                    edges={[
                      { from: "a", to: "b" },
                      { from: "b", to: "c" },
                      { from: "c", to: "d" },
                      { from: "d", to: "a" },
                      { from: "a", to: "c" },
                    ]}
                    scale={56}
                    radius={12}
                  />
                  <span>chordal</span>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <GraphDiagram
                    vertices={[1, 2, 3, 4, 5].map((i) => {
                      const ang = ((90 + 72 * i) * Math.PI) / 180;
                      return { id: `v${i}`, x: 0.85 * Math.cos(ang), y: 0.85 * Math.sin(ang) };
                    })}
                    edges={[1, 2, 3, 4, 5].map((i) => ({
                      from: `v${i}`,
                      to: `v${(i % 5) + 1}`,
                    }))}
                    scale={56}
                    radius={12}
                  />
                  <span>
                    <InlineMath math="C_5" />: <strong>not</strong> chordal
                  </span>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <GraphDiagram
                    vertices={[
                      { id: "r", x: 0.6, y: 1.0 },
                      { id: "x", x: 0, y: 0 },
                      { id: "y", x: 1.2, y: 0 },
                      { id: "z", x: 0.6, y: -0.9 },
                    ]}
                    edges={[
                      { from: "r", to: "x" },
                      { from: "r", to: "y" },
                      { from: "y", to: "z" },
                    ]}
                    scale={56}
                    radius={12}
                  />
                  <span>every tree is chordal</span>
                </div>
              </div>
            </figure>

            <h3 className="text-xl font-bold mb-4 mt-6">3.1 Simplicial vertices</h3>

            <DefinitionCard title="Definition (Simplicial)">
              <p>
                A vertex <InlineMath math="v" /> is <em>simplicial</em> if{" "}
                <InlineMath math="N(v)" /> is a clique; equivalently,{" "}
                <InlineMath math="N[v]" /> is a clique.
              </p>
            </DefinitionCard>

            <Figure>
              <GraphDiagram
                vertices={SIMP_POS(["u", "a", "b", "c", "d"])}
                edges={SIMP_EDGES}
                scale={64}
              />
              <Side>
                <InlineMath math="u" /> is simplicial:{" "}
                <InlineMath math="N(u)=\{a,b\}" /> is a clique.
                <br />
                <InlineMath math="d" /> is simplicial:{" "}
                <InlineMath math="N(d)=\{c\}" /> is a clique.
                <br />
                <InlineMath math="c" /> is <em>not</em>:{" "}
                <InlineMath math="N(c)=\{a,b,d\}" />, and{" "}
                <InlineMath math="ad\notin E" />.
              </Side>
            </Figure>

            <Statement label="Theorem 3" name="Dirac">
              <p>
                Every chordal graph has a simplicial vertex. If it is not
                complete, it has two nonadjacent simplicial vertices.
              </p>
            </Statement>

            <Statement label="Corollary 4" name="perfect elimination ordering">
              <p>
                <InlineMath math="G" /> is chordal iff its vertices can be
                ordered <InlineMath math="v_1,\dots,v_n" /> so that each{" "}
                <InlineMath math="v_i" /> is simplicial in{" "}
                <InlineMath math="G[\{v_i,v_{i+1},\dots,v_n\}]" />.
              </p>
            </Statement>

            <Figure>
              <GraphDiagram
                vertices={SIMP_POS(["1", "3", "4", "5", "2"]).map((v) => ({ ...v, kind: "plain" }))}
                edges={SIMP_EDGES}
                scale={64}
              />
              <Side>
                A perfect elimination ordering: peel off{" "}
                <InlineMath math="1" />, then <InlineMath math="2" />, then{" "}
                <InlineMath math="3" />, then <InlineMath math="4" />, then{" "}
                <InlineMath math="5" />. At each step the current graph still
                has a simplicial vertex to peel.
              </Side>
            </Figure>

            <p className="mb-4">Two further facts, used without proof:</p>
            <ul className="list-disc pl-5 mb-4 space-y-2">
              <li>
                chordal graphs are closed under taking induced subgraphs, so
                deleting vertices stays in the class and the recursion is
                well defined;
              </li>
              <li>
                every minimal separator of a chordal graph is a clique, and a
                chordal graph admits a <em>clique tree</em>: a tree whose
                nodes are the maximal cliques, such that for every{" "}
                <InlineMath math="v" /> the cliques containing{" "}
                <InlineMath math="v" /> form a subtree.
              </li>
            </ul>

            <Figure>
              <div className="flex flex-col items-center gap-3 text-sm">
                <GraphDiagram vertices={g6({}).map((v) => ({ ...v, kind: "plain" }))} edges={G6_EDGES} scale={60} />
                <span>
                  <InlineMath math="G" />
                </span>
              </div>
              <div className="flex flex-col items-center gap-3 text-sm">
                <GraphDiagram
                  vertices={[
                    { id: "K1", x: 0, y: 0, label: "{a, b, c}", kind: "clique" },
                    { id: "K2", x: 2.0, y: 0, label: "{c, d}", kind: "clique" },
                    { id: "K3", x: 4.0, y: 0, label: "{d, e, f}", kind: "clique" },
                  ]}
                  edges={[
                    { from: "K1", to: "K2" },
                    { from: "K2", to: "K3" },
                  ]}
                  scale={60}
                />
                <span>
                  a clique tree of <InlineMath math="G" />
                </span>
              </div>
            </Figure>

            <h3 className="text-xl font-bold mb-4 mt-6">3.2 Simplicial absorption</h3>

            <p className="mb-4">
              The following lemma is what the domination algorithms for
              chordal graphs are built on.
            </p>

            <Statement label="Lemma 5" name="simplicial absorption">
              <p>
                Let <InlineMath math="u" /> be simplicial and{" "}
                <InlineMath math="x\in N[u]" />. Then{" "}
                <InlineMath math="N[u]\subseteq N[x]" />.
              </p>
            </Statement>
            <Proof>
              <p>
                <InlineMath math="N[u]" /> is a clique containing{" "}
                <InlineMath math="x" />, so every{" "}
                <InlineMath math="y\in N[u]" /> with{" "}
                <InlineMath math="y\neq x" /> is adjacent to{" "}
                <InlineMath math="x" />, i.e.{" "}
                <InlineMath math="y\in N(x)" />; and{" "}
                <InlineMath math="x\in N[x]" />. ∎
              </p>
            </Proof>

            <p className="mb-4">Two consequences:</p>

            <Statement label="Corollary 6">
              <p>
                Any vertex that dominates a simplicial <InlineMath math="u" />{" "}
                dominates all of <InlineMath math="N[u]" />. So the question
                of which vertex dominates <InlineMath math="u" /> has{" "}
                <InlineMath math="|N[u]|" /> answers, and each answer settles
                the whole closed neighborhood.
              </p>
            </Statement>

            <Statement label="Corollary 7" name="simplicial exclusion">
              <p>
                If <InlineMath math="u" /> is simplicial and{" "}
                <InlineMath math="D" /> is minimal with{" "}
                <InlineMath math="u\in D" />, then{" "}
                <InlineMath math="D\cap N(u)=\varnothing" />.
              </p>
            </Statement>
            <Proof>
              <p>
                If <InlineMath math="x\in D\cap N(u)" /> then{" "}
                <InlineMath math="N[u]\subseteq N[x]" /> by Lemma 5, so{" "}
                <InlineMath math="\operatorname{priv}(u,D)=\varnothing" />,
                contradicting Lemma 1. ∎
              </p>
            </Proof>

            <Figure>
              <GraphDiagram
                vertices={[
                  { id: "u", x: 0, y: 0, label: "u", kind: "orange" },
                  { id: "x1", x: 1.4, y: 0.9, label: "x_1" },
                  { id: "x2", x: 1.4, y: 0, label: "x_2" },
                  { id: "x3", x: 1.4, y: -0.9, label: "x_3" },
                  { id: "p", x: 3.0, y: 0.9 },
                  { id: "q", x: 3.0, y: -0.9 },
                ]}
                edges={[
                  { from: "u", to: "x1" },
                  { from: "u", to: "x2" },
                  { from: "u", to: "x3" },
                  { from: "x1", to: "x2" },
                  { from: "x2", to: "x3" },
                  { from: "x1", to: "x3", bend: -1.0 },
                  { from: "x1", to: "p" },
                  { from: "x3", to: "q" },
                ]}
                blobs={[{ nodes: ["u", "x1", "x2", "x3"], pad: 14 }]}
                scale={66}
              />
              <Side>
                <InlineMath math="N[u]=\{u,x_1,x_2,x_3\}" /> is a clique.
                <br />
                Selecting any one of{" "}
                <InlineMath math="u,x_1,x_2,x_3" /> dominates all four.
                <br />
                Branching on the dominator of <InlineMath math="u" /> gives
                four branches, each of which settles all four vertices.
              </Side>
            </Figure>

            <p className="mb-4">
              In an arbitrary graph the candidate dominators of{" "}
              <InlineMath math="u" /> need not cover each other, and the
              branching is weaker. This is why chordal graphs have a{" "}
              <InlineMath math="1.5048^{\,n}" /> bound while the general
              bound is <InlineMath math="1.7159^{\,n}" />.
            </p>
          </section>

          {/* ------------------------------------------------------------ */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[var(--nb-text)] mb-4 border-b-2 border-[var(--nb-border)] pb-2">
              4. Branch and reduce
            </h2>

            <p className="mb-4">
              Branching on each vertex in turn, <InlineMath math="v\in D" />{" "}
              or <InlineMath math="v\notin D" />, gives{" "}
              <InlineMath math="2^n" /> leaves. To do better one branches on
              a question with fewer answers, each of which settles more of
              the graph. Corollary 6 gives such a question for chordal
              graphs.
            </p>

            <h3 className="text-xl font-bold mb-4 mt-6">4.1 Branching on a simplicial vertex</h3>
            <p className="mb-4">
              Let <InlineMath math="u" /> be simplicial with{" "}
              <InlineMath math="N[u]=\{x_1,\dots,x_k\}" />. Every dominating
              set contains some <InlineMath math="x_i" />. Branch on which
              one, and in branch <InlineMath math="i" /> also forbid{" "}
              <InlineMath math="x_1,\dots,x_{i-1}" />:
            </p>
            <div className="bg-[var(--nb-bg)] border-2 border-[var(--nb-border)] p-3 mb-4 text-center overflow-x-auto">
              <BlockMath math="I_i=\text{``select } x_i\text{, and forbid } x_1,\dots,x_{i-1}\text{''}." />
            </div>
            <p className="mb-4">
              Every solution has a well-defined smallest-index member of{" "}
              <InlineMath math="N[u]" />, so the branches partition the
              solution family and nothing is listed twice.
            </p>

            <Figure
              caption={
                <>
                  Ordered branching on{" "}
                  <InlineMath math="N[u]=\{x_1,x_2,x_3,x_4\}" />. Branch{" "}
                  <InlineMath math="i" /> captures exactly the solutions
                  whose smallest-index element of <InlineMath math="N[u]" />{" "}
                  is <InlineMath math="x_i" />, so the branches are{" "}
                  <em>disjoint</em> and <em>exhaustive</em>.
                </>
              }
            >
              <GraphDiagram
                vertices={[
                  { id: "I", x: 0, y: 0, label: "I" },
                  { id: "I1", x: -4.8, y: -2.0, label: "I_1" },
                  { id: "I2", x: -1.6, y: -2.0, label: "I_2" },
                  { id: "I3", x: 1.6, y: -2.0, label: "I_3" },
                  { id: "I4", x: 4.8, y: -2.0, label: "I_4" },
                ]}
                edges={[
                  { from: "I", to: "I1", label: "take x_1", labelSide: "left" },
                  { from: "I", to: "I2", label: "forbid x_1\ntake x_2", labelSide: "left" },
                  { from: "I", to: "I3", label: "forbid x_1, x_2\ntake x_3", labelSide: "right" },
                  { from: "I", to: "I4", label: "forbid x_1, x_2, x_3\ntake x_4", labelSide: "right" },
                ]}
                scale={60}
                radius={14}
              />
            </Figure>

            <h3 className="text-xl font-bold mb-4 mt-6">4.2 The annotation</h3>
            <p className="mb-4">
              After one branching step the subproblem is no longer a plain
              graph. Take the graph <InlineMath math="G" /> below and forbid{" "}
              <InlineMath math="c" />, i.e. restrict attention to solutions
              avoiding <InlineMath math="c" />.
            </p>

            <Figure>
              <div className="flex flex-col items-center gap-3 text-sm text-center">
                <GraphDiagram vertices={g6()} edges={G6_EDGES} scale={56} />
                <span>initial instance: everything is <InlineMath math="W" /></span>
              </div>
              <div className="text-2xl text-[var(--nb-text-muted)] rotate-90 md:rotate-0">
                <InlineMath math="\Longrightarrow" />
              </div>
              <div className="flex flex-col items-center gap-3 text-sm text-center">
                <GraphDiagram vertices={g6({ c: "red" })} edges={G6_EDGES} scale={56} />
                <span>
                  after <InlineMath math="\mathrm{Forbid}(c)" />:{" "}
                  <InlineMath math="c" /> still <em>needs</em> domination
                  <br />
                  but may no longer <em>provide</em> it
                </span>
              </div>
            </Figure>

            <p className="mb-4">
              A plain graph cannot express that a vertex needs domination
              but cannot dominate, so the recursion carries two bits per
              vertex:
            </p>

            <DataTable
              head={["", "still needs domination", "already dominated"]}
              rows={[
                [
                  <strong key="r1">still selectable</strong>,
                  <>
                    <InlineMath math="W" /> (white)
                  </>,
                  <>
                    <InlineMath math="B" /> (blue)
                  </>,
                ],
                [
                  <strong key="r2">forbidden</strong>,
                  <>
                    <InlineMath math="R" /> (red)
                  </>,
                  "delete",
                ],
              ]}
            />

            <p className="mb-4">
              This gives three live states, <InlineMath math="B" />,{" "}
              <InlineMath math="W" />, <InlineMath math="R" />, and one that
              is deleted. A forbidden vertex that becomes dominated has no
              role left, so it is deleted rather than moved to{" "}
              <InlineMath math="B" />; moving it to <InlineMath math="B" />{" "}
              would make it selectable again.
            </p>

            <div className="bg-[var(--nb-bg-card)] border-2 border-[var(--nb-border)] p-4 mb-6 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                <div className="flex items-center gap-3">
                  <VertexSwatch kind="white" />
                  <span>
                    <InlineMath math="W" />: selectable, still needs domination
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <VertexSwatch kind="blue" />
                  <span>
                    <InlineMath math="B" />: selectable, already dominated
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <VertexSwatch kind="red" />
                  <span>
                    <InlineMath math="R" />: forbidden, still needs domination
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <VertexSwatch kind="sel" />
                  <span>
                    selected (in <InlineMath math="D" />), removed from the
                    active graph
                  </span>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-bold mb-4 mt-6">4.3 Take and Forbid</h3>
            <p className="mb-4">
              For a selectable <InlineMath math="x\in B\cup W" />:
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-3">
              <li>
                <strong>
                  <InlineMath math="\mathrm{Take}(x)" />.
                </strong>{" "}
                Add <InlineMath math="x" /> to <InlineMath math="D" /> and
                delete it. Every <InlineMath math="w\in N[x]\cap W" /> becomes
                dominated: <InlineMath math="W\to B" />. Every{" "}
                <InlineMath math="r\in N[x]\cap R" /> becomes dominated and is
                deleted.
              </li>
              <li>
                <strong>
                  <InlineMath math="\mathrm{Forbid}(x)" />.
                </strong>{" "}
                If <InlineMath math="x\in W" />, move it to{" "}
                <InlineMath math="R" />. If <InlineMath math="x\in B" />,
                delete it. Either way <InlineMath math="x" /> leaves every
                candidate set.
              </li>
            </ul>

            <Figure>
              <div className="flex flex-col items-center gap-3 text-sm text-center">
                <GraphDiagram
                  vertices={[
                    { id: "a", x: 0, y: 0.8, label: "a", kind: "white" },
                    { id: "b", x: 0, y: -0.8, label: "b", kind: "white" },
                    { id: "c", x: 1.2, y: 0, label: "c", kind: "white" },
                    { id: "d", x: 2.5, y: 0, label: "d", kind: "white" },
                  ]}
                  edges={[
                    { from: "a", to: "b" },
                    { from: "a", to: "c" },
                    { from: "b", to: "c" },
                    { from: "c", to: "d" },
                  ]}
                  scale={60}
                />
                <span>before</span>
              </div>
              <div className="text-xl text-[var(--nb-text-muted)] rotate-90 md:rotate-0">
                <InlineMath math="\xrightarrow{\ \ \mathrm{Take}(c)\ \ }" />
              </div>
              <div className="flex flex-col items-center gap-3 text-sm text-center">
                <GraphDiagram
                  vertices={[
                    { id: "a", x: 0, y: 0.8, label: "a", kind: "blue" },
                    { id: "b", x: 0, y: -0.8, label: "b", kind: "blue" },
                    { id: "c", x: 1.2, y: 0, label: "c", kind: "gray" },
                    { id: "d", x: 2.5, y: 0, label: "d", kind: "blue" },
                  ]}
                  edges={[
                    { from: "a", to: "b" },
                    { from: "a", to: "c", faded: true },
                    { from: "b", to: "c", faded: true },
                    { from: "c", to: "d", faded: true },
                  ]}
                  scale={60}
                />
                <span>
                  <InlineMath math="c" /> joins <InlineMath math="D" /> and
                  leaves;
                  <br />
                  <InlineMath math="a,b,d" /> become blue
                </span>
              </div>
            </Figure>

            <Remark title="Take versus Forbid">
              <p>
                <InlineMath math="\mathrm{Take}" /> makes a lot of progress:
                one vertex leaves and all of <InlineMath math="N[x]" /> is
                satisfied. <InlineMath math="\mathrm{Forbid}" /> makes
                little: one vertex changes color. Accounting for the progress
                made in exclusion branches is the main difficulty of the
                analysis, and it is what the weighted measure in Section 5
                is for.
              </p>
            </Remark>

            <h3 className="text-xl font-bold mb-4 mt-6">4.4 Candidate sets and reductions</h3>
            <p className="mb-4">
              For a <em>demand</em> vertex <InlineMath math="v\in W\cup R" />,
              its set of currently available dominators is
            </p>
            <div className="bg-[var(--nb-bg)] border-2 border-[var(--nb-border)] p-3 mb-4 text-center overflow-x-auto">
              <BlockMath math="A(v)=N[v]\cap(B\cup W)." />
            </div>
            <p className="mb-4">
              Note that if <InlineMath math="v\in W" /> then{" "}
              <InlineMath math="v\in A(v)" />: a white vertex may dominate
              itself. Two immediate rules:
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-2">
              <li>
                if <InlineMath math="A(v)=\varnothing" />, the instance is
                infeasible; prune;
              </li>
              <li>
                if <InlineMath math="A(v)=\{x\}" />, then{" "}
                <InlineMath math="x" /> is <em>forced</em>; take it, no
                branching.
              </li>
            </ul>
            <p className="mb-4">
              Since <InlineMath math="v\in A(v)" /> for white{" "}
              <InlineMath math="v" />, <InlineMath math="\mathrm{Forbid}(v)" />{" "}
              drops <InlineMath math="|A(v)|" /> by one immediately. So a
              white vertex with exactly two available dominators forces the
              other one as soon as it is excluded.
            </p>
          </section>

          {/* ------------------------------------------------------------ */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[var(--nb-text)] mb-4 border-b-2 border-[var(--nb-border)] pb-2">
              5. Measure and conquer
            </h2>

            <h3 className="text-xl font-bold mb-4 mt-6">5.1 Branching vectors</h3>
            <p className="mb-4">
              Suppose a rule splits instance <InlineMath math="I" /> into{" "}
              <InlineMath math="I_1,\dots,I_t" />, and we have a nonnegative{" "}
              <em>measure</em> <InlineMath math="\mu" /> with{" "}
              <InlineMath math="\mu(I_0)\le n" /> at the root. Let{" "}
              <InlineMath math="\Delta_i=\mu(I)-\mu(I_i)" />. The{" "}
              <em>branching number</em> of the vector{" "}
              <InlineMath math="(\Delta_1,\dots,\Delta_t)" /> is the unique
              real <InlineMath math="c>1" /> with
            </p>
            <div className="bg-[var(--nb-bg)] border-2 border-[var(--nb-border)] p-3 mb-4 text-center overflow-x-auto">
              <BlockMath math="\sum_{i=1}^{t}c^{-\Delta_i}=1." />
            </div>
            <p className="mb-4">
              If every rule has branching number{" "}
              <InlineMath math="\le c" />, the search tree has{" "}
              <InlineMath math="O(c^{\mu(I_0)})=O(c^{\,n})" /> leaves, and
              since each node does polynomial work the running time is{" "}
              <InlineMath math="O^*(c^{\,n})" />.
            </p>

            <Statement label="Example">
              <p>
                The vector <InlineMath math="(1,1)" /> gives{" "}
                <InlineMath math="2c^{-1}=1" />, so <InlineMath math="c=2" />,
                which is the vertex-by-vertex algorithm. The vector{" "}
                <InlineMath math="(1,2)" /> gives{" "}
                <InlineMath math="c^{-1}+c^{-2}=1" />, so{" "}
                <InlineMath math="c=\varphi\approx1.6180" />, the Fibonacci
                recurrence. The vector <InlineMath math="(2,2,2)" /> gives{" "}
                <InlineMath math="3c^{-2}=1" />,{" "}
                <InlineMath math="c=\sqrt3\approx1.7321" />.
              </p>
            </Statement>

            <h3 className="text-xl font-bold mb-4 mt-6">
              5.2 Leaf count and the combinatorial bound
            </h3>

            <Statement label="Proposition 8">
              <p>
                If every <InlineMath math="D\in\mathcal{D}_{\min}(G)" /> is
                output at some leaf, and the tree has{" "}
                <InlineMath math="O(c^{\,n})" /> leaves, then{" "}
                <InlineMath math="|\mathcal{D}_{\min}(G)|\le O(c^{\,n})" />.
              </p>
            </Statement>
            <Proof>
              <p>
                Each leaf outputs at most one set, so the map{" "}
                <InlineMath math="\mathcal{D}_{\min}(G)\to\{\text{leaves}\}" />{" "}
                sending <InlineMath math="D" /> to a leaf outputting it is
                injective. ∎
              </p>
            </Proof>

            <p className="mb-4">
              So the combinatorial upper bound on{" "}
              <InlineMath math="\mathrm{md}(\text{chordal},n)" /> follows
              from the running-time analysis of the algorithm. For this
              direction only coverage is needed, i.e. that every solution
              reaches some leaf; disjointness of the branches is not.
            </p>

            <h3 className="text-xl font-bold mb-4 mt-6">5.3 Weighted measure</h3>
            <p className="mb-4">
              With <InlineMath math="\mu=n" /> the analysis is weak, because
              branches often make progress that is not vertex deletion, for
              example several white vertices becoming blue. Measure and
              conquer assigns different weights to different states. A
              natural choice is
            </p>
            <div className="bg-[var(--nb-bg)] border-2 border-[var(--nb-border)] p-3 mb-4 text-center overflow-x-auto">
              <BlockMath math="\mu(I)=|W|+\beta|B|+\sum_{r\in R}\rho_{d_A(r)},\qquad 0<\beta<1,\quad 0=\rho_1<\rho_2\le\rho_3\le\cdots<1," />
            </div>
            <p className="mb-4">
              where <InlineMath math="d_A(r)=|A(r)|" />. The measure drops
              as follows:
            </p>

            <DataTable
              head={["event", "measure drop"]}
              rows={[
                ["white vertex deleted (selected)", <InlineMath key="1" math="1" />],
                [
                  <>
                    white vertex satisfied, <InlineMath math="W\to B" />
                  </>,
                  <InlineMath key="2" math="1-\beta" />,
                ],
                ["blue vertex deleted", <InlineMath key="3" math="\beta" />],
                ["red vertex satisfied and deleted", <InlineMath key="4" math="\rho_{d_A(r)}" />],
                [
                  <>
                    a candidate of red <InlineMath math="r" /> is excluded
                  </>,
                  <InlineMath key="5" math="\rho_{d_A(r)}-\rho_{d_A(r)-1}" />,
                ],
              ]}
            />

            <p className="mb-4">
              <InlineMath math="\rho" /> increases with{" "}
              <InlineMath math="d_A" /> because a red vertex with few
              remaining candidates is closer to being forced, hence closer to
              resolved; <InlineMath math="\rho_1=0" /> because{" "}
              <InlineMath math="d_A=1" /> triggers an immediate reduction.
              This is how exclusion branches are credited with progress.
              Since <InlineMath math="\mu(I_0)=|V|=n" />, the final bound is{" "}
              <InlineMath math="O^*(c^{\,n})" />.
            </p>

            <h3 className="text-xl font-bold mb-4 mt-6">5.4 A worked example</h3>
            <p className="mb-4">
              Let <InlineMath math="u" /> be a simplicial demand vertex with{" "}
              <InlineMath math="A(u)=N[u]\subseteq W" />,{" "}
              <InlineMath math="|N[u]|=k" />, and apply the ordered branching
              of Section 4.1. By Lemma 5, selecting{" "}
              <InlineMath math="x_i" /> dominates all of{" "}
              <InlineMath math="N[u]" />. So in branch{" "}
              <InlineMath math="i" />: the forbidden{" "}
              <InlineMath math="x_1,\dots,x_{i-1}" /> turn red, are
              immediately dominated by <InlineMath math="x_i" />, and are
              deleted; <InlineMath math="x_i" /> is deleted; the remaining{" "}
              <InlineMath math="k-i" /> vertices turn blue. Hence
            </p>
            <div className="bg-[var(--nb-bg)] border-2 border-[var(--nb-border)] p-3 mb-4 text-center overflow-x-auto">
              <BlockMath math="\Delta_i=\underbrace{1}_{x_i}+\underbrace{(i-1)}_{\text{forbidden, then deleted}}+\underbrace{(k-i)(1-\beta)}_{W\to B}=i+(k-i)(1-\beta)," />
            </div>
            <p className="mb-4">
              giving the vector{" "}
              <InlineMath math="\bigl(k-(k-1)\beta,\ \dots,\ k-\beta,\ k\bigr)" />.
              For <InlineMath math="k=2" /> this is{" "}
              <InlineMath math="(2-\beta,2)" />, and at{" "}
              <InlineMath math="\beta=\tfrac12" /> the branching number is{" "}
              <InlineMath math="c\approx1.4906" />.
            </p>
            <p className="mb-4">
              <InlineMath math="\beta" /> is not a free parameter. A small{" "}
              <InlineMath math="\beta" /> makes these branches cheap and
              makes other configurations expensive, in particular any demand
              vertex whose candidates are all blue, where each branch gains
              only about <InlineMath math="\beta" />. The actual optimization
              is a min-max over all branching rules at once.
            </p>
          </section>

          {/* ------------------------------------------------------------ */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[var(--nb-text)] mb-4 border-b-2 border-[var(--nb-border)] pb-2">
              6. Part II
            </h2>
            <p className="mb-4">
              The <InlineMath math="1.5048^{\,n}" /> bound is obtained from
              the ingredients above: pick a simplicial vertex, branch on its
              dominator, track the three colors, and charge the progress to
              a weighted measure. Part II goes through the annotated
              enumeration problem itself, in particular how the subproblem
              should be defined so that minimality refers to the original
              graph rather than the current one, what happens when the
              simplicial vertex is a leaf and the branch is only two-way,
              and how the clique tree organizes the case analysis.
            </p>
            <p className="mb-4">
              When reading the analysis in [2], it is worth keeping a list of
              which branching rules are tight, meaning those that attain the
              worst branching number in the optimization. Only those
              configurations matter for an improvement; the other rules have
              slack.
            </p>
          </section>

          {/* ------------------------------------------------------------ */}
          <section className="mb-8 pt-8 border-t-4 border-[var(--nb-border)]">
            <h2 className="text-2xl font-bold text-[var(--nb-text)] mb-4">References</h2>
            <div className="space-y-3 text-[var(--nb-text)] text-sm">
              <div className="flex gap-3">
                <span className="font-mono text-[var(--nb-primary)] flex-shrink-0">[1]</span>
                <span>
                  Couturier, J.-F., Heggernes, P., van &apos;t Hof, P., &amp;
                  Kratsch, D. (2013). Minimal dominating sets in graph
                  classes: Combinatorial bounds and enumeration.{" "}
                  <em>Theoretical Computer Science</em>, 487, 82–94. (Also
                  SOFSEM 2012.) The framework; the easiest entry point.
                </span>
              </div>
              <div className="flex gap-3">
                <span className="font-mono text-[var(--nb-primary)] flex-shrink-0">[2]</span>
                <span>
                  Golovach, P. A., Kratsch, D., Liedloff, M., &amp; Sayadi,
                  M. Y. (2019). Enumeration and maximum number of minimal
                  dominating sets for chordal graphs.{" "}
                  <em>Theoretical Computer Science</em>, 783, 41–52. The
                  current record.
                </span>
              </div>
              <div className="flex gap-3">
                <span className="font-mono text-[var(--nb-primary)] flex-shrink-0">[3]</span>
                <span>
                  Fomin, F. V., &amp; Kratsch, D. (2010).{" "}
                  <em>Exact Exponential Algorithms</em>. Springer. The
                  measure-and-conquer chapter.
                </span>
              </div>
              <div className="flex gap-3">
                <span className="font-mono text-[var(--nb-primary)] flex-shrink-0">[4]</span>
                <span>
                  Kanté, M. M., Limouzy, V., Mary, A., &amp; Nourine, L.
                  (2014). On the enumeration of minimal dominating sets and
                  related notions. <em>SIAM Journal on Discrete Mathematics</em>,
                  28(4), 1916–1929. For the equivalence with hypergraph
                  transversal enumeration.
                </span>
              </div>
              <div className="flex gap-3">
                <span className="font-mono text-[var(--nb-primary)] flex-shrink-0">[5]</span>
                <span>
                  Fomin, F. V., Grandoni, F., Pyatkin, A. V., &amp; Stepanov,
                  A. A. (2008). Combinatorial bounds via measure and conquer:
                  Bounding minimal dominating sets and applications.{" "}
                  <em>ACM Transactions on Algorithms</em>, 5(1), Article 9.
                  The general <InlineMath math="1.7159^{\,n}" /> bound.
                </span>
              </div>
            </div>
          </section>
        </div>

        <div className="pt-6 mt-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-[var(--nb-primary)] text-white border-2 border-[var(--nb-border)] px-4 py-2 font-semibold hover:translate-x-0.5 hover:translate-y-0.5 shadow-[4px_4px_0_0_var(--nb-border)] hover:shadow-[2px_2px_0_0_var(--nb-border)] transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all scribblings
          </Link>
        </div>
      </article>
    </div>
  );
}
