"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function TernaryLogic() {
  return (
    <div className="min-h-screen bg-[var(--nb-bg)] transition-colors duration-300">
      {/* Header */}
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

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Title Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-2 py-1 bg-[var(--nb-primary)] text-white text-xs font-semibold">
              Logic
            </span>
            <span className="px-2 py-1 bg-[var(--nb-primary)] text-white text-xs font-semibold">
              Computer Science
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--nb-text)] mb-4">
            Universality in Ternary Logic
          </h1>
          <p className="text-[var(--nb-text-muted)] text-lg">
            Optimal Radix Economy and the Enumeration of Universal Gates
          </p>
          <div className="flex items-center gap-4 mt-4 text-sm text-[var(--nb-text-muted)]">
            <span>December 2025</span>
            <span>•</span>
            <span>12 min read</span>
            <span>•</span>
            <span className="font-mono text-[var(--nb-primary)]">Scribbling</span>
          </div>
          <p className="mt-4 text-sm text-[var(--nb-text-muted)] italic">
            Note: This project was a collaborative effort with{' '}
            <a
              href="https://ralphrazzouk.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--nb-primary)] hover:underline"
            >
              Ralph Razzouk
            </a>.
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none text-[var(--nb-text)]">

          {/* Section 1 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[var(--nb-text)] mb-4 border-b-2 border-[var(--nb-border)] pb-2">
              1. The Efficiency of <InlineMath math="n" />-ary Representation
            </h2>
            <p className="mb-4">
              Before diving into logic gates, it is worth asking: why leave binary at all? The answer lies in <strong>radix economy</strong>.
            </p>
            <p className="mb-4">
              To represent a number <InlineMath math="N" /> in a system with radix (base) <InlineMath math="b" />, the width required is <InlineMath math="w \approx \log_b N" />.
              Assuming that the physical complexity of a state is proportional to the radix <InlineMath math="b" />, the cost <InlineMath math="C" /> is the product of the radix and the width:
            </p>
            <div className="bg-[var(--nb-bg)] border-2 border-[var(--nb-border)] p-3 mb-4 text-center overflow-x-auto">
              <BlockMath math="C(b) = b \cdot \log_b N = \ln N \cdot \frac{b}{\ln b}" />
            </div>
            <p className="mb-4">
              To find the most efficient base, <InlineMath math="b" /> is treated as a continuous variable to minimize the function <InlineMath math="f(b) = \frac{b}{\ln b}" />. Taking the derivative:
            </p>
            <div className="bg-[var(--nb-bg)] border-2 border-[var(--nb-border)] p-3 mb-4 text-center overflow-x-auto">
              <BlockMath math="f'(b) = \frac{\ln b - 1}{(\ln b)^2}" />
            </div>
            <p className="mb-4">
              Setting <InlineMath math="f'(b) = 0" /> yields <InlineMath math="\ln b = 1" />, or <InlineMath math="b = e" />.
            </p>
            <p className="mb-4">
              Since a computer cannot be built with base <InlineMath math="e \approx 2.718" />, the optimal integer base must be determined.
              Looking at the derivative, the denominator <InlineMath math="(\ln b)^2" /> is always positive. For <InlineMath math="b > e" />, <InlineMath math="\ln b > 1" />,
              which implies that the numerator <InlineMath math="\ln b - 1 > 0" />.
            </p>
            <p className="mb-4">
              Therefore, <InlineMath math="f'(b) > 0" /> for all <InlineMath math="b > e" />.
            </p>
            <p className="mb-4">
              This proves that the cost function <InlineMath math="f(b)" /> is <strong>strictly increasing</strong> for all values greater than <InlineMath math="e" />.
              Consequently, for integer bases <InlineMath math="b \ge 3" />, the efficiency strictly worsens as <InlineMath math="b" /> increases.
              The search for the optimal integer base is thus narrowed to the two integers immediately surrounding the theoretical minimum <InlineMath math="e" />: 2 and 3.
            </p>
            <p className="mb-4">
              Checking the values:
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-2">
              <li>For <InlineMath math="b=2" />: <InlineMath math="2 / \ln 2 \approx 2.885" /></li>
              <li>For <InlineMath math="b=3" />: <InlineMath math="3 / \ln 3 \approx 2.730" /></li>
            </ul>
            <p className="mb-4">
              Base 3 is theoretically more efficient than base 2. This efficiency, combined with the richer semantic capacity of ternary states (True, False, Unknown),
              motivates the construction of a ternary computer.
            </p>
          </section>

          {/* Section 2 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[var(--nb-text)] mb-4 border-b-2 border-[var(--nb-border)] pb-2">
              2. Enumerating Universal Ternary Gates
            </h2>
            <p className="mb-4">
              To build this computer, logic gates are required. Specifically, <strong>universal gates</strong> are needed—single operators from which any other logic function can be composed.
            </p>
            <p className="mb-4">
              In a 3-valued system, the search space for 2-input gates is massive:
            </p>
            <div className="bg-[var(--nb-bg)] border-2 border-[var(--nb-border)] p-3 mb-4 text-center overflow-x-auto">
              <BlockMath math="3^{3^2} = 3^9 = 19{,}683 \text{ possible gates}" />
            </div>
            <p className="mb-4">
              Rather than brute-forcing the composition of every gate to see if it generates the entire space (which is computationally intractable),
              a sieve method is employed based on the fundamental theorem from Davies [1].
            </p>
            <p className="mb-4">
              The theorem states that a function <InlineMath math="f: U \times U \to U" /> is functionally complete (universal) if and only if it fails to satisfy <strong>all three</strong> of the following incompleteness conditions:
            </p>

            <h3 className="text-xl font-bold mb-4 mt-6">A. The Semiclosed Condition</h3>
            <p className="mb-4">
              There exists a proper nonempty subset <InlineMath math="S \subsetneq U" /> such that the function is closed under <InlineMath math="S" />. That is:
            </p>
            <div className="bg-[var(--nb-bg)] border-2 border-[var(--nb-border)] p-3 mb-4 text-center overflow-x-auto">
              <BlockMath math="\forall x, y \in S, \quad f(x, y) \in S" />
            </div>
            <p className="mb-4">
              If a gate satisfies this, inputs restricted to <InlineMath math="S" /> can never generate a value outside <InlineMath math="S" />, rendering the gate incomplete.
            </p>

            <h3 className="text-xl font-bold mb-4 mt-6">B. The Equivalence Condition</h3>
            <p className="mb-4">
              There exists a non-trivial equivalence relation <InlineMath math="\sim" /> on <InlineMath math="U" /> such that <InlineMath math="f" /> preserves the relation.
              Specifically, if <InlineMath math="x_1 \sim x_2" /> and <InlineMath math="y_1 \sim y_2" />, then:
            </p>
            <div className="bg-[var(--nb-bg)] border-2 border-[var(--nb-border)] p-3 mb-4 text-center overflow-x-auto">
              <BlockMath math="f(x_1, y_1) \sim f(x_2, y_2)" />
            </div>
            <p className="mb-4">
              This implies the function operates on equivalence classes rather than individual values, losing the granularity required for universality.
            </p>

            <h3 className="text-xl font-bold mb-4 mt-6">C. The Permutation Condition</h3>
            <p className="mb-4">
              There exists a permutation <InlineMath math="\pi" /> on <InlineMath math="U" /> consisting of cycles of length <InlineMath math="p" /> (where <InlineMath math="p" /> is a prime factor of <InlineMath math="n" />)
              such that <InlineMath math="f" /> commutes with <InlineMath math="\pi" />. That is:
            </p>
            <div className="bg-[var(--nb-bg)] border-2 border-[var(--nb-border)] p-3 mb-4 text-center overflow-x-auto">
              <BlockMath math="\pi(f(x, y)) = f(\pi(x), \pi(y)) \quad \forall x, y \in U" />
            </div>
            <p className="mb-4">
              For <InlineMath math="n=3" />, this effectively checks if the gate is just "rotating" the inputs.
            </p>
            <p className="mb-6">
              By iterating through all 19,683 candidates and discarding those that satisfy any of these conditions, exactly <strong>3,774 universal gates</strong> are identified.
            </p>

            <div className="bg-[var(--nb-bg-card)] border-3 border-[var(--nb-border)] p-6 shadow-[4px_4px_0_0_var(--nb-border)] mb-6">
              <strong className="block text-lg mb-3">Algorithm 1: Universal Gate Enumeration</strong>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Let <InlineMath math="G" /> be the set of all possible functions <InlineMath math="U \times U \to U" />.</li>
                <li><strong>Initialize</strong> <InlineMath math="U_{gates} = \emptyset" />.</li>
                <li><strong>Iterate</strong> through each <InlineMath math="g \in G" />.</li>
                <li><strong>Check Constraints:</strong>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>If <InlineMath math="g" /> has a closed subset <InlineMath math="S" />, discard.</li>
                    <li>If <InlineMath math="g" /> preserves a non-trivial equivalence relation, discard.</li>
                    <li>If <InlineMath math="g" /> is self-dual with respect to a cyclic permutation, discard.</li>
                  </ul>
                </li>
                <li><strong>Collection:</strong> If <InlineMath math="g" /> satisfies none of the above, <InlineMath math="g \in U_{gates}" />.</li>
              </ol>
            </div>
          </section>

          {/* Section 3 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[var(--nb-text)] mb-4 border-b-2 border-[var(--nb-border)] pb-2">
              3. A Corner Case: The Probability of Universality
            </h2>
            <p className="mb-4">
              As a side note, an interesting question might be about the existence of an upper bound for the density of universal gates as <InlineMath math="n \to \infty" />.
            </p>
            <p className="mb-4">
              Consider the condition required for a gate <InlineMath math="f" /> to generate constants. If <InlineMath math="f(x,x) = x" />, the gate is idempotent for that input.
              If this gate is chained into itself, the output is "stuck" at <InlineMath math="x" />—new values cannot be generated from a signal of pure <InlineMath math="x" />.
              Therefore, a necessary condition for universality is that <InlineMath math="f" /> has no fixed points on the diagonal:
            </p>
            <div className="bg-[var(--nb-bg)] border-2 border-[var(--nb-border)] p-3 mb-4 text-center overflow-x-auto">
              <BlockMath math="\forall x \in U, \quad f(x,x) \neq x" />
            </div>
            <p className="mb-4">
              For a given logic value <InlineMath math="x" />, assuming a uniform distribution of outputs, the probability that <InlineMath math="f(x,x) \neq x" /> is:
            </p>
            <div className="bg-[var(--nb-bg)] border-2 border-[var(--nb-border)] p-3 mb-4 text-center overflow-x-auto">
              <BlockMath math="P(\text{no fixed point at } x) = \frac{n-1}{n} = 1 - \frac{1}{n}" />
            </div>
            <p className="mb-4">
              Since this must hold for <em>all</em> <InlineMath math="n" /> logic values in <InlineMath math="U" />, and assuming independence across the diagonal entries:
            </p>
            <div className="bg-[var(--nb-bg)] border-2 border-[var(--nb-border)] p-3 mb-4 text-center overflow-x-auto">
              <BlockMath math="P(\text{Universality}) \approx \left(1 - \frac{1}{n}\right)^n" />
            </div>
            <p className="mb-4">
              Taking the limit as <InlineMath math="n \to \infty" />:
            </p>
            <div className="bg-[var(--nb-bg)] border-2 border-[var(--nb-border)] p-3 mb-4 text-center overflow-x-auto">
              <BlockMath math="\lim_{n \to \infty} \left(1 - \frac{1}{n}\right)^n = \frac{1}{e}" />
            </div>
            <p className="mb-4">
              Thus, for any <InlineMath math="n" />-valued logic system, the proportion of universal gates is bounded by <InlineMath math="1/e \approx 36.7\%" />.
            </p>
          </section>

          {/* Section 4 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[var(--nb-text)] mb-4 border-b-2 border-[var(--nb-border)] pb-2">
              4. Representation Search
            </h2>
            <p className="mb-4">
              Identifying the gates is only half the battle. To be useful, physical implementation requires a construction recipe.
              A foundational gate, called <strong>TAND</strong> (Ternary NAND), was selected to act as the primary building block.
            </p>
            <p className="mb-4">
              The final phase of the project involves a search algorithm to decompose every identified universal gate into a TAND representation.
              This is effectively a <strong>Breadth-First Search (BFS)</strong> over the space of valid syntactic expressions.
            </p>
            <p className="mb-4">
              We define a set of atomic expressions <InlineMath math="S_0 = \{x, y, 0, 1, 2\}" />. In each iteration, the set of known expressions is expanded by applying the TAND operator to every pair of existing expressions.
              This generates a new "layer" of functions with increasing depth.
            </p>

            <div className="bg-[var(--nb-bg-card)] border-3 border-[var(--nb-border)] p-6 shadow-[4px_4px_0_0_var(--nb-border)] mb-6">
              <strong className="block text-lg mb-3">Algorithm 2: TAND Decomposition Search</strong>
              <ol className="list-decimal pl-5 space-y-2">
                <li><strong>Initialize</strong> set of known expressions <InlineMath math="S = \{x, y, 0, 1, 2\}" />.</li>
                <li><strong>Initialize</strong> <InlineMath math="Found = \emptyset" />.</li>
                <li><strong>Loop</strong> until all universal gates are found or max depth is reached:
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Generate candidate set <InlineMath math="C = \{ \text{TAND}(u, v) \mid u, v \in S \}" />.</li>
                    <li>For each expression <InlineMath math="e \in C" />:
                      <ul className="list-[circle] pl-5 mt-1 space-y-1">
                        <li>Compute truth table <InlineMath math="T_e" />.</li>
                        <li><strong>If</strong> <InlineMath math="T_e" /> corresponds to a universal gate <InlineMath math="G" /> <strong>AND</strong> <InlineMath math="G \notin Found" />:
                          <ul className="list-[square] pl-5 mt-1 space-y-1">
                            <li>Record <InlineMath math="e" /> as the minimal representation of <InlineMath math="G" />.</li>
                            <li>Add <InlineMath math="G" /> to <InlineMath math="Found" />.</li>
                          </ul>
                        </li>
                        <li><strong>If</strong> <InlineMath math="T_e" /> is a new unique function:
                          <ul className="list-[square] pl-5 mt-1 space-y-1">
                            <li>Add <InlineMath math="e" /> to <InlineMath math="S" />.</li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ol>
            </div>

            <p className="mb-4">
              This process is computationally intensive, as the set of expressions grows exponentially with depth, but it successfully yields a construction "recipe" for the abstract universal gates found in section 2.
            </p>
            <p className="mb-4">
              The code for the generator, the TAND search, and the full catalog of gates can be found in the repository:{' '}
              <a
                href="https://github.com/bour278/ternary"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--nb-primary)] hover:underline font-semibold"
              >
                bour278/ternary
              </a>.
            </p>
          </section>

          {/* References */}
          <section className="mb-8 pt-8 border-t-4 border-[var(--nb-border)]">
            <h2 className="text-2xl font-bold text-[var(--nb-text)] mb-4">References</h2>

            <div className="space-y-3 text-[var(--nb-text)] text-sm">
              <div className="flex gap-3">
                <span className="font-mono text-[var(--nb-primary)] flex-shrink-0">[1]</span>
                <span>
                  Davies, R. O. (1970). On n-Valued Sheffer Functions. <em>Preprint</em>.
                </span>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
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
