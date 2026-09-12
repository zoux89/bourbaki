"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen, ExternalLink } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function DNFLearningChebyshev() {
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
              Learning Theory
            </span>
            <span className="px-2 py-1 bg-[var(--nb-primary)] text-white text-xs font-semibold">
              Approximation
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--nb-text)] mb-4">
            Polynomial Approximation of DNF Formulae
          </h1>
          <p className="text-[var(--nb-text-muted)] text-lg">
            Investigating Low-Degree Approximations of Boolean Functions
          </p>
          <div className="flex items-center gap-4 mt-4 text-sm text-[var(--nb-text-muted)]">
            <span>December 2024</span>
            <span>•</span>
            <span>10 min read</span>
            <span>•</span>
            <span className="font-mono text-[var(--nb-primary)]">Scribbling</span>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none text-[var(--nb-text)]">
          
          {/* Background and Introduction */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[var(--nb-text)] mb-4 border-b-2 border-[var(--nb-border)] pb-2">
              1. Background and Introduction
            </h2>
            <p className="mb-4">
              A disjunctive normal form (DNF) formula is a logical formula consisting of a disjunction of boolean conjunctions. 
              For example, an <InlineMath math="s" />-term DNF formula over <InlineMath math="n" /> variables might look like <InlineMath math="(A \land \neg B) \lor (B \land C)" />. 
              These formulae are fundamental in computational learning theory because any Boolean function can be represented as a DNF.
            </p>
            <p className="mb-4">
              A key concept in learning these functions is the <strong>polynomial threshold function (PTF)</strong>. 
              A function <InlineMath math="f : \{0, 1\}^n \rightarrow \{+, -\}" /> is computed by a PTF <InlineMath math="p" /> of degree <InlineMath math="d" /> if there exists a threshold <InlineMath math="\theta" /> such that:
            </p>
            <div className="bg-[var(--nb-bg)] border-2 border-[var(--nb-border)] p-3 mb-4 text-center text-sm overflow-x-auto">
              <BlockMath math="f(x) = \text{sign}(p(x - \theta)) \quad \forall x \in \{0, 1\}^n" />
            </div>
            <p className="mb-4">
              In their seminal paper <em>Learning DNF in Time <InlineMath math="2^{\tilde{O}(n^{1/3})}" /></em>, Klivans and Servedio established a novel connection 
              between DNF formulae and PTFs. They conjectured that any <InlineMath math="s" />-term DNF on <InlineMath math="n" /> variables can be 
              computed by a PTF with degree <InlineMath math="O(n^{1/3} \log s)" />. This upper bound enabled the fastest known algorithm for learning polynomial size DNF.
            </p>
            <div className="bg-[var(--nb-bg-card)] p-4 border-l-4 border-[var(--nb-primary)] mb-4 text-sm">
              <p className="mb-2 font-bold">Historical Context</p>
              <p>
                Prior to this work, the best subexponential time algorithm for learning DNF was from Bshouty, who achieved a time complexity of 
                <InlineMath math="2^{O((n \log s)^{1/2}\log^{3/2}n)}" />. Tarui and Tsukiji later provided a similar bound using approximate inclusion/exclusion.
              </p>
            </div>
          </section>

          {/* Main Result of Reference Paper */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[var(--nb-text)] mb-4 border-b-2 border-[var(--nb-border)] pb-2">
              2. Klivans & Servedio's Approach
            </h2>
            <p className="mb-4">
              The novelty of Klivans and Servedio's approach lies in representing a DNF formula as a low-degree polynomial threshold function. 
              This is powerful because polynomial time algorithms for learning linear threshold functions can be adapted to learn PTFs of degree <InlineMath math="k" /> 
              in time <InlineMath math="n^{O(k)}" />.
            </p>
            <p className="mb-4">
              To prove their general result, they relied on several intermediate steps:
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-2">
              <li>
                <strong>Lemma 10:</strong> Any <InlineMath math="s" />-term DNF can be expressed as a 1-decision tree <InlineMath math="T" /> 
                of rank at most <InlineMath math="(2n/t) \log s + 1" />.
              </li>
              <li>
                <strong>Theorem 1:</strong> Any <InlineMath math="s" />-term <InlineMath math="t" />-DNF can be expressed as a PTF of degree <InlineMath math="O(t^{1/2} \log s)^2" />. 
                This is constructed using Chebyshev polynomials of the first kind.
              </li>
            </ul>
            
            <div className="bg-[var(--nb-bg-card)] border-3 border-[var(--nb-border)] p-6 shadow-[4px_4px_0_0_var(--nb-border)] mb-6">
              <strong className="block text-lg mb-3">Key Theorem (Fact 7)</strong>
              <p className="mb-4">
                Let <InlineMath math="C" /> be a class of functions, each of which can be expressed as a degree-<InlineMath math="d" /> PTF over <InlineMath math="\{0,1\}^n" />. 
                Then, in both the PAC learning model and the exact learning model, there exists a learning algorithm for <InlineMath math="C" /> running in time <InlineMath math="n^{O(d)}" />.
              </p>
              
              <div className="mt-4 border-t-2 border-[var(--nb-border)] pt-4">
                <strong className="italic block mb-2">Proof Sketch:</strong>
                <p>
                  Let <InlineMath math="p(x)" /> be a degree <InlineMath math="d" /> polynomial in <InlineMath math="n" /> variables. If we map each of the (at most <InlineMath math="n^d" />) monomials to a new variable <InlineMath math="y_i" /> of degree 1, 
                  the problem reduces to learning a linear threshold function in a higher dimensional space. Since linear threshold functions can be learned 
                  in polynomial time relative to their dimension, the total time is <InlineMath math="\text{poly}(n^d)" />.
                </p>
              </div>
            </div>
            
            <p className="italic text-[var(--nb-text-muted)]">
              This note expands on these results to investigate the approximation of polynomials representing <InlineMath math="n" />-variable DNFs.
            </p>
          </section>

          {/* Research Paper Content (Milestone 2) */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[var(--nb-text)] mb-4 border-b-2 border-[var(--nb-border)] pb-2">
              3. Mathematical Foundation
            </h2>
            
            <p className="mb-6">
              To present our conjecture, we first need to establish some prior theorems and definitions. 
              Recall the following from the main result discussed above:
            </p>

            <div className="bg-[var(--nb-bg-card)] border-l-4 border-[var(--nb-primary)] pl-4 py-2 mb-6">
              <p className="font-bold mb-1">Theorem 1</p>
              <p className="italic">
                Any <InlineMath math="s" />-term DNF containing conjunctions of max size <InlineMath math="t" /> can be expressed as a polynomial threshold 
                function of degree <InlineMath math="O(t^{1/2} \log s)" />.
              </p>
            </div>

            <p className="mb-4">
              Since the total degree of a multivariate polynomial is the maximum degree of any monomial term (sum of exponents), 
              we can derive the following fact:
            </p>

            <div className="bg-[var(--nb-bg-card)] border-l-4 border-[var(--nb-primary)] pl-4 py-2 mb-6">
              <p className="font-bold mb-1">Fact 1</p>
              <p className="italic">
                Any <InlineMath math="s" />-term DNF containing conjunctions of max size <InlineMath math="t" /> can be expressed as a PTF of degree <InlineMath math="O(t)" />. 
                Consequently, any <InlineMath math="n" />-variable DNF can be expressed as a PTF of degree <InlineMath math="O(n)" />.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-[var(--nb-bg-card)] border-l-4 border-[var(--nb-primary)] pl-4 py-2">
                <p className="font-bold mb-1">Heine-Borel Theorem</p>
                <p className="italic">Let <InlineMath math="A \subseteq \mathbb{K}^n" />. <InlineMath math="A" /> is compact if and only if it is closed and bounded.</p>
              </div>

              <div className="bg-[var(--nb-bg-card)] border-l-4 border-[var(--nb-primary)] pl-4 py-2">
                <p className="font-bold mb-2">Chebyshev Approximation Problem</p>
                <p className="italic mb-2">
                  Let <InlineMath math="X" /> be a compact topological index set, <InlineMath math="f: X \rightarrow \mathbb{R}" /> be an objective function, and <InlineMath math="\phi: X \rightarrow \mathbb{R}^n" /> be a basis function vector. 
                  The problem is to find:
                </p>
                <div className="bg-[var(--nb-bg)] border-2 border-[var(--nb-border)] p-3 overflow-x-auto text-sm not-italic">
                  <BlockMath math="\min_{a \in \mathbb{R}^n} \max_{x \in X} \left| \sum_{i=1}^{n} a_i \phi_i(x) - f(x) \right|" />
                </div>
              </div>

              <div className="bg-[var(--nb-bg-card)] border-l-4 border-[var(--nb-primary)] pl-4 py-2">
                <p className="font-bold mb-2">Haar Matrix</p>
                <p className="italic mb-2">
                  For a basis function vector <InlineMath math="\phi" /> and points <InlineMath math="x_1, \dots, x_k \in X" />, the Haar matrix is defined as:
                </p>
                <div className="bg-[var(--nb-bg)] border-2 border-[var(--nb-border)] p-3 overflow-x-auto text-sm not-italic">
                  <BlockMath math="H(x_1, \dots, x_k) = (\phi(x_1), \dots, \phi(x_k)) \in \mathbb{R}^{n \times k}" />
                </div>
              </div>

              <div className="bg-[var(--nb-bg-card)] border-l-4 border-[var(--nb-primary)] pl-4 py-2">
                <p className="font-bold mb-1">Weak Haar Condition</p>
                <p className="italic">
                  Exists <InlineMath math="x_1, \dots, x_n \in X" /> such that <InlineMath math="H(x_1, \dots, x_n)" /> is square and nonsingular.
                </p>
              </div>

              <div className="bg-[var(--nb-bg-card)] border-l-4 border-[var(--nb-primary)] pl-4 py-2">
                <p className="font-bold mb-1">Multivariate Equioscillation Theorem</p>
                <p className="italic">
                  Let <InlineMath math="\phi(x)" /> be continuous. If the weak Haar condition holds for <InlineMath math="\phi(x)" /> and <InlineMath math="X" />, 
                  then there exists an optimal solution to the Chebyshev approximation problem.
                </p>
              </div>
            </div>
          </section>

          {/* Random Thoughts */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[var(--nb-text)] mb-4 border-b-2 border-[var(--nb-border)] pb-2">
              4. Random Thoughts
            </h2>
            
            <h3 className="text-xl font-bold mb-4">4.1 Existence of an approximation</h3>

            <div className="bg-[var(--nb-bg-card)] border-l-4 border-[var(--nb-primary)] pl-4 py-2 mb-6">
              <strong className="block mb-2">Observation 1</strong>
              <p className="italic">
                Let <InlineMath math="f" /> be a degree <InlineMath math="n" /> polynomial representing a DNF (from Fact 1). Since <InlineMath math="x^i = x" /> for any boolean variable <InlineMath math="x" />, 
                every literal has degree 1. Thus, each monomial of degree <InlineMath math="k" /> is a product of <InlineMath math="k" /> distinct literals. 
                It follows that in our surrogate function <InlineMath math="g" /> of degree <InlineMath math="n^{1/3}" />, each monomial is a product of at most <InlineMath math="n^{1/3}" /> distinct literals.
              </p>
            </div>

            <div className="bg-[var(--nb-bg-card)] border-3 border-[var(--nb-border)] p-6 shadow-[4px_4px_0_0_var(--nb-border)] mb-8">
              <strong className="block text-lg mb-3">Proposition 1</strong>
              <p className="mb-4">
                Let <InlineMath math="f: X \rightarrow \mathbb{R}" /> be a function of degree <InlineMath math="n" />, where each monomial <InlineMath math="m" /> of degree <InlineMath math="k" /> is a product of <InlineMath math="k" /> distinct monomials. 
                Then <InlineMath math="f" /> can be approximated with a function <InlineMath math="g(x) = \sum_{i=1}^n a_i \phi_i(x)" /> of degree <InlineMath math="n^{1/3}" /> such that:
              </p>
              <div className="text-center my-2 overflow-x-auto">
                <BlockMath math="\min_{a \in \mathbb{R}^n} \max_{x \in X} |g(x) - f(x)| < \epsilon" />
              </div>

              <div className="mt-6 border-t-2 border-[var(--nb-border)] pt-4">
                <strong className="italic block mb-2">Proof:</strong>
                <p className="mb-3">
                  Let <InlineMath math="\phi(x) = (1, x_1, \dots, x_n, x_1 x_2, x_2 x_3,\dots, x_{n-1}x_n,\dots, x_1 x_2 \dots x_{n^{1/3}}, \dots, x_{n - n^{1/3}}\dots x_n)" /> be a basis function vector for <InlineMath math="g" />. 
                  In addition, let <InlineMath math="X = [0, 1]^n" />, then <InlineMath math="X" /> is a compact set by the Heine-Borel-Lebesgue theorem. 
                  Following the multivariate equioscillation theorem, for <InlineMath math="g(x) = \sum_{i=1}^n a_i \phi_i(x)" /> to exist, there exists vectors <InlineMath math="p_1, p_2, \dots, p_{|\phi(x)|} \in X = [0, 1]^n" /> such that the weak Haar condition holds. 
                  In addition, let <InlineMath math="|\phi(x)| = k" /> and <InlineMath math="p^\mu" /> be an <InlineMath math="n" />-dimensional vector constructed in the following way:
                </p>
                <div className="overflow-x-auto my-4">
                  <BlockMath math={`p_i^\\mu = \\begin{cases}
                    1 & \\text{if } x_i \\text{ in the monomial } \\phi(x)_\\mu\\\\
                    0 & \\text{otherwise}
                  \\end{cases}`} />
                </div>

                <p className="mb-3">
                  Since <InlineMath math="\phi(x)" /> is ordered lexicographically with <InlineMath math="x_1 < x_2 < \dots < x_n" />, then for all <InlineMath math="\nu > \mu" />, 
                  there exists a literal <InlineMath math="x_i" /> in <InlineMath math="\phi(x)_\mu" /> that is not included in <InlineMath math="\phi(x)_\nu" />. 
                  It follows that for any input <InlineMath math="p \in X" />, <InlineMath math="\phi(p)_\nu \neq \phi(p)_\mu" /> by construction of <InlineMath math="p" />. 
                  Similarly, by construction of <InlineMath math="p" />, <InlineMath math="p_i = 1" /> for all literals <InlineMath math="x_i" /> in <InlineMath math="\phi(x)_\mu" />, 
                  and it follows that <InlineMath math="\phi(p^\mu)_\mu = 1" /> for any <InlineMath math="p^\mu" />.
                </p>

                <p className="mb-3">
                  Therefore it follows that for any <InlineMath math="p^\mu \in \{1, p^1, \dots, p^k\}" /> that <InlineMath math="\phi(p^\mu)_\nu = 0" /> since <InlineMath math="\phi(p^\mu)_\nu \neq \phi(p^\mu)_\mu" /> 
                  and <InlineMath math="\phi(p^\mu)_\mu = 1" /> for any <InlineMath math="\nu > \mu" />. Then it follows that:
                </p>
                
                <div className="overflow-x-auto my-4">
                  <BlockMath math={`\\phi(p^\\mu)_i = \\begin{cases}
                      1 & \\text{if } i = \\mu\\\\
                      0 & \\text{if } i > \\mu\\\\
                      0 \\text{ or } 1 & \\text{if } i < \\mu
                  \\end{cases}`} />
                </div>

                <p className="mb-3">
                  Then it follows that for <InlineMath math="\phi(x)" />, and <InlineMath math="p^1, \dots, p^k \in X" />, the Haar matrix is defined as:
                </p>
                
                <div className="overflow-x-auto my-4">
                  <BlockMath math={`H(p^1, \\dots, p^k) = (\\phi(p^1), \\dots, \\phi(p^k)) = H \\text{ of the form } H_{i,\\mu} = \\begin{cases}
                      1 & \\text{if } i = \\mu\\\\
                      0 & \\text{if } i > \\mu\\\\
                      0 \\text{ or } 1 & \\text{if } i < \\mu
                  \\end{cases}`} />
                </div>

                <p>
                  Therefore, the resulting Haar matrix <InlineMath math="H" /> is an <strong>upper triangular matrix with 1 on the diagonal</strong>, 
                  and it follows that the determinant of <InlineMath math="H" />, <InlineMath math="|H| = 1 \neq 0" /> and the resulting Haar matrix is non-singular. 
                  It follows that the weak Haar condition holds for the defined by the basis function vector <InlineMath math="\phi(x)" />, 
                  and following the multivariate equioscillation theorem, a solution exists for the Chebyshev optimization problem. ∎
                </p>
              </div>
            </div>

            <div className="bg-[var(--nb-primary)] text-white border-3 border-[var(--nb-border)] p-6 shadow-[4px_4px_0_0_var(--nb-border)]">
              <strong className="block text-lg mb-2">Conjecture 1</strong>
              <p>
                Consider a function <InlineMath math="f" /> representing an <InlineMath math="n" />-variable DNF. We conjecture that a 
                polynomial <InlineMath math="g" /> of degree <InlineMath math="n^{1/3}" /> can approximate <InlineMath math="f" /> with <InlineMath math="\lim_{n \to \infty} \epsilon < 0.5" />.
              </p>
            </div>
          </section>

          {/* Discussion */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[var(--nb-text)] mb-4 border-b-2 border-[var(--nb-border)] pb-2">
              5. Discussion
            </h2>
            <p>
              If our conjecture holds—that the approximation error <InlineMath math="\epsilon" /> remains strictly less than 0.5—then the maximum distance between 
              the surrogate function <InlineMath math="g" /> (of dimension <InlineMath math="n^{1/3}" />) and the objective <InlineMath math="f" /> (of dimension <InlineMath math="n" />) 
              is at most 0.5.
            </p>
            <p className="mt-4 font-bold">
              This implies a powerful result: simply rounding the output of the low-degree surrogate <InlineMath math="g" /> to the closest integer 
              would perfectly recover the correct output of the original DNF function <InlineMath math="f" />.
            </p>
          </section>

          {/* References */}
          <section className="mb-8 pt-8 border-t-4 border-[var(--nb-border)]">
            <h2 className="text-2xl font-bold text-[var(--nb-text)] mb-4">References</h2>
            
            <div className="space-y-3 text-[var(--nb-text)] text-sm">
              <div className="flex gap-3">
                <span className="font-mono text-[var(--nb-primary)] flex-shrink-0">[0]</span>
                <span>
                  Klivans, A. R., &amp; Servedio, R. A. (2004). Learning DNF in time <InlineMath math="2^{\tilde{O}(n^{1/3})}" />. 
                  <em>Journal of Computer and System Sciences</em>, 68(2), 303-318. 
                  <a href="https://doi.org/10.1016/j.jcss.2003.07.007" target="_blank" rel="noopener noreferrer" className="text-[var(--nb-primary)] hover:underline ml-1">
                    doi:10.1016/j.jcss.2003.07.007
                  </a>
                </span>
              </div>
              <div className="flex gap-3">
                <span className="font-mono text-[var(--nb-primary)] flex-shrink-0">[1]</span>
                <span>
                  Goldsztejn, A. (2023). An equioscillation theorem for multivariate Chebyshev approximation. 
                  <em>arXiv preprint</em> arXiv:2310.01851v2.
                </span>
              </div>
              <div className="flex gap-3">
                <span className="font-mono text-[var(--nb-primary)] flex-shrink-0">[2]</span>
                <span>
                  Malachivskyy, P. S., Melnychok, L. S., &amp; Pizyur, Ya. V. (2021). Chebyshev approximation of 
                  multivariable functions by the exponential expression. <em>Cybernetics and Systems Analysis</em>, 57(3), 429-435.
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
