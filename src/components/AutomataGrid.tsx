"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Play, Pause, Trash2, Shuffle, Grid3X3 } from "lucide-react";

interface AutomataGridProps {
  rows?: number;
  cols?: number;
}

export default function AutomataGrid({ rows = 12, cols = 14 }: AutomataGridProps) {
  const [grid, setGrid] = useState<boolean[][]>(() => 
    Array(rows).fill(null).map(() => Array(cols).fill(false))
  );
  const [isRunning, setIsRunning] = useState(false);
  const [generation, setGeneration] = useState(0);
  const runningRef = useRef(isRunning);
  runningRef.current = isRunning;

  // Colors for alive cells - cycling through for visual interest
  const cellColors = [
    "bg-[#FF6B6B]", // coral red
    "bg-[#4ECDC4]", // teal
    "bg-[#FFE66D]", // yellow
    "bg-[#95E1D3]", // mint
    "bg-[#F38181]", // salmon
    "bg-[#AA96DA]", // lavender
    "bg-[#FCBAD3]", // pink
    "bg-[#A8D8EA]", // sky blue
  ];

  const getCellColor = (row: number, col: number) => {
    return cellColors[(row + col) % cellColors.length];
  };

  const countNeighbors = useCallback((g: boolean[][], row: number, col: number) => {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        const newRow = (row + i + rows) % rows;
        const newCol = (col + j + cols) % cols;
        if (g[newRow][newCol]) count++;
      }
    }
    return count;
  }, [rows, cols]);

  const runSimulation = useCallback(() => {
    if (!runningRef.current) return;

    setGrid((currentGrid) => {
      const newGrid = currentGrid.map((row, i) =>
        row.map((cell, j) => {
          const neighbors = countNeighbors(currentGrid, i, j);
          if (cell) {
            return neighbors === 2 || neighbors === 3;
          } else {
            return neighbors === 3;
          }
        })
      );
      return newGrid;
    });

    setGeneration((g) => g + 1);
    setTimeout(runSimulation, 150);
  }, [countNeighbors]);

  useEffect(() => {
    if (isRunning) {
      runSimulation();
    }
  }, [isRunning, runSimulation]);

  const toggleCell = (row: number, col: number) => {
    if (isRunning) return;
    const newGrid = grid.map((r, i) =>
      r.map((cell, j) => (i === row && j === col ? !cell : cell))
    );
    setGrid(newGrid);
  };

  const clearGrid = () => {
    setIsRunning(false);
    setGrid(Array(rows).fill(null).map(() => Array(cols).fill(false)));
    setGeneration(0);
  };

  const randomize = () => {
    setIsRunning(false);
    setGrid(
      Array(rows).fill(null).map(() =>
        Array(cols).fill(null).map(() => Math.random() > 0.7)
      )
    );
    setGeneration(0);
  };

  const hasLiveCells = grid.some(row => row.some(cell => cell));

  return (
    <div className="bg-[var(--nb-card)] border-3 border-[var(--nb-border)] p-4 shadow-[4px_4px_0_0_var(--nb-border)] h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Grid3X3 className="w-5 h-5 text-[var(--nb-primary)]" />
          <span className="text-[var(--nb-text)] font-semibold text-sm uppercase tracking-wider">
            Automata
          </span>
        </div>
        <span className="text-[var(--nb-text-secondary)] text-xs font-mono">
          Gen: {generation}
        </span>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div 
          className="grid gap-[2px] p-2 bg-[var(--nb-border)] border-2 border-[var(--nb-border)]"
          style={{ 
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
          }}
        >
          {grid.map((row, i) =>
            row.map((cell, j) => (
              <button
                key={`${i}-${j}`}
                onClick={() => toggleCell(i, j)}
                disabled={isRunning}
                className={`
                  w-[14px] h-[14px] transition-all duration-100
                  ${cell 
                    ? `${getCellColor(i, j)} scale-100` 
                    : "bg-[var(--nb-bg)] hover:bg-[var(--nb-bg-secondary)]"
                  }
                  ${!isRunning ? "cursor-pointer" : "cursor-default"}
                  border border-[var(--nb-border)]/30
                `}
              />
            ))
          )}
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 mt-3">
        <button
          onClick={() => setIsRunning(!isRunning)}
          disabled={!hasLiveCells && !isRunning}
          className={`
            w-9 h-9 border-2 border-[var(--nb-border)] flex items-center justify-center
            transition-all
            ${hasLiveCells || isRunning
              ? "bg-[var(--nb-primary)] text-white hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none shadow-[2px_2px_0_0_var(--nb-border)]"
              : "bg-[var(--nb-bg-secondary)] text-[var(--nb-text-secondary)] cursor-not-allowed"
            }
          `}
        >
          {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
        <button
          onClick={randomize}
          className="w-9 h-9 border-2 border-[var(--nb-border)] bg-[var(--nb-card)] flex items-center justify-center hover:bg-[var(--nb-bg-secondary)] transition-all shadow-[2px_2px_0_0_var(--nb-border)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
          title="Randomize"
        >
          <Shuffle className="w-4 h-4 text-[var(--nb-text)]" />
        </button>
        <button
          onClick={clearGrid}
          className="w-9 h-9 border-2 border-[var(--nb-border)] bg-[var(--nb-card)] flex items-center justify-center hover:bg-[var(--nb-bg-secondary)] transition-all shadow-[2px_2px_0_0_var(--nb-border)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
          title="Clear"
        >
          <Trash2 className="w-4 h-4 text-[var(--nb-text)]" />
        </button>
      </div>

      <p className="text-[var(--nb-text-secondary)] text-[10px] text-center mt-2">
        Click cells to set state, then play
      </p>
    </div>
  );
}

