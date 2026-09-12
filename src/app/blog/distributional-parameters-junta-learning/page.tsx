"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import "katex/dist/katex.min.css";
import { BlockMath, InlineMath } from "react-katex";

const TheoremCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="bg-[var(--nb-bg-card)] border-3 border-[var(--nb-border)] p-6 shadow-[4px_4px_0_0_var(--nb-border)] mb-6">
    <strong className="block text-lg mb-3">{title}</strong>
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

export default function DistributionalParametersJuntaLearning() {
  return (
    <div className="min-h-screen bg-[var(--nb-bg)] transition-colors duration-300">
      <header className="border-b-3 border-[var(--nb-border)] bg-[var(--nb-bg-card)]">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[var(--nb-text)] hover:text-[var(--nb-primary)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
        </div>
      </header>

      <article className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className="px-2 py-1 bg-[var(--nb-primary)] text-white text-xs font-semibold">
              Learning Theory
            </span>
            <span className="px-2 py-1 bg-[var(--nb-primary)] text-white text-xs font-semibold">
              Parameterized Complexity
            </span>
            <span className="px-2 py-1 bg-[var(--nb-primary)] text-white text-xs font-semibold">
              PAC Learning
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--nb-text)] mb-4">
            Distributional Parameters in Proper Junta Learning
          </h1>
          <p className="text-[var(--nb-text-muted)] text-lg">
            Tight ETH Bounds and the Limits of Support-Based
            Parameterizations
          </p>
          <div className="flex items-center gap-4 mt-4 text-sm text-[var(--nb-text-muted)] flex-wrap">
            <span>August 2026</span>
            <span>•</span>
            <span>30 min read</span>
            <span>•</span>
            <span className="font-mono text-[var(--nb-primary)]">
              Research Note
            </span>
          </div>
        </div>

        <div className="prose prose-lg max-w-none text-[var(--nb-text)]">
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[var(--nb-text)] mb-4 border-b-2 border-[var(--nb-border)] pb-2">
              1. Introduction
            </h2>
            <p className="mb-4">
              A Boolean function{" "}
              <InlineMath math="f:\{0,1\}^n\to\{0,1\}" /> is a{" "}
              <strong>
                <InlineMath math="k" />-junta
              </strong>{" "}
              if its output depends on at most <InlineMath math="k" /> of
              the <InlineMath math="n" /> input coordinates, making juntas a
              clean model for learning with many irrelevant features, since
              the ambient dimension may be enormous even though the target
              concept uses only a small hidden set of variables.
            </p>
            <p className="mb-4">
              Exhaustive search over relevant coordinate sets gives a proper
              PAC learner in time <InlineMath math="n^{O(k)}" />, and even
              under the uniform distribution, the best known algorithms
              improve only the constant in the exponent; whether one can
              achieve <InlineMath math="n^{o(k)}" /> remains open.
            </p>
            <p className="mb-4">
              Parameterized PAC learning refines the problem by tracking
              not only the complexity <InlineMath math="k" /> of the target,
              but also a parameter <InlineMath math="\ell" /> describing the
              hidden data distribution.
            </p>
            <p>
              Within this framework, we study proper learning of{" "}
              <InlineMath math="k" />-juntas and prove an ETH-tight lower
              bound for the trivial distributional parameter,
              fixed-parameter tractability for support-bounding parameters
              and bounded Hamming geometry, and non-monotonicity results for
              intrinsic parameters of structured distributions.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[var(--nb-text)] mb-4 border-b-2 border-[var(--nb-border)] pb-2">
              2. Preliminaries
            </h2>
            <DefinitionCard title="Proper junta learning">
              <p>
                A learner receives labeled examples{" "}
                <InlineMath math="(x,c^\ast(x))" /> with{" "}
                <InlineMath math="x\sim\mathcal D" />. Given{" "}
                <InlineMath math="\varepsilon,\delta>0" />, it must output,
                with probability at least <InlineMath math="1-\delta" />, a
                hypothesis <InlineMath math="h" /> satisfying
              </p>
              <div className="overflow-x-auto mt-3">
                <BlockMath math="\Pr_{x\sim\mathcal D}[h(x)\neq c^\ast(x)]\le\varepsilon." />
              </div>
              <p>
                Properness means that <InlineMath math="h" /> must itself be
                represented as a <InlineMath math="k" />-junta.
              </p>
            </DefinitionCard>

            <p className="mb-4">
              Brand, Ganian, and Simonov associate a consistency problem with
              parameterized learning. Given pairwise distinct labeled
              samples
            </p>
            <div className="bg-[var(--nb-bg)] border-2 border-[var(--nb-border)] p-3 mb-4 text-center overflow-x-auto">
              <BlockMath math="(x_1,a_1),\ldots,(x_t,a_t)\in\{0,1\}^n\times\{0,1\}," />
            </div>
            <p className="mb-4">
              <strong>
                <InlineMath math="k" />-Junta-Consistency
              </strong>{" "}
              asks whether some <InlineMath math="k" />-junta agrees with all
              samples. The learning and consistency problems are linked in
              both directions, and the lower-bound direction is especially
              important here because a proper learner can be turned into a
              randomized consistency solver.
            </p>

            <TheoremCard title="Lemma: Reduction from proper learning to consistency">
              <p className="mb-3">
                If an algorithm properly learns{" "}
                <InlineMath math="k" />-juntas in time{" "}
                <InlineMath math="T(n,1/\varepsilon,1/\delta,k)" /> using at
                at most <InlineMath math="S\le T" /> examples, then consistency
                on <InlineMath math="t" /> samples can be decided with
                one-sided error in time
              </p>
              <div className="overflow-x-auto">
                <BlockMath math="O(T(n,t+1,3,k))+O(S(n,t+1,3,k)\cdot n)+O(2^k+tk)+\operatorname{poly}(n,t)." />
              </div>
            </TheoremCard>

            <div className="bg-[var(--nb-bg-card)] border-l-4 border-[var(--nb-primary)] pl-4 py-3 mb-6">
              <strong className="italic block mb-3">Proof</strong>
              <p className="mb-3">
                Let{" "}
                <InlineMath math="I=((x_1,a_1),\ldots,(x_t,a_t),k)" /> be a
                consistency instance. Run the learner with
              </p>
              <div className="overflow-x-auto">
                <BlockMath math="\varepsilon=\frac1{t+1},\qquad \delta=\frac13." />
              </div>
              <p className="mb-3">
                On each example request, sample{" "}
                <InlineMath math="i\sim\operatorname{Unif}([t])" /> and return{" "}
                <InlineMath math="(x_i,a_i)" />. Thus the requests are
                independent, and each request is simulated in{" "}
                <InlineMath math="O(n)" /> time.
              </p>
              <p className="mb-3">
                Suppose first that <InlineMath math="I" /> is a yes-instance.
                Fix a consistent <InlineMath math="k" />-junta{" "}
                <InlineMath math="c^\ast" /> and define
              </p>
              <div className="overflow-x-auto">
                <BlockMath math="\mathcal D=\operatorname{Unif}\{x_1,\ldots,x_t\},\qquad a_i=c^\ast(x_i)\quad(\forall i\in[t])." />
              </div>
              <p className="mb-3">
                The simulated oracle is therefore exactly{" "}
                <InlineMath math="\operatorname{EX}(c^\ast,\mathcal D)" />.
                With probability at least <InlineMath math="1-\delta=2/3" />,
                the learner outputs a <InlineMath math="k" />-junta{" "}
                <InlineMath math="h" /> satisfying
              </p>
              <div className="overflow-x-auto">
                <BlockMath math="\operatorname{err}_{\mathcal D}(h,c^\ast)=\frac1t\left|\{i\in[t]:h(x_i)\neq c^\ast(x_i)\}\right|\le\frac1{t+1}<\frac1t." />
              </div>
              <p className="mb-3">
                Since the cardinality in the numerator is an integer, it is
                zero. Hence
              </p>
              <div className="overflow-x-auto">
                <BlockMath math="\forall i\in[t],\qquad h(x_i)=c^\ast(x_i)=a_i." />
              </div>
              <p>
                Parse the output as a natural junta representation, rejecting
                unless it specifies at most <InlineMath math="k" /> coordinates
                and a valid truth table; then accept exactly when{" "}
                <InlineMath math="h(x_i)=a_i" /> for every{" "}
                <InlineMath math="i\in[t]" />. If <InlineMath math="I" /> is a
                no-instance, every valid <InlineMath math="k" />-junta fails
                this test, independently of the learner&apos;s behavior, so
                the procedure has no false positives. A timeout or excess
                sample request is also rejected. The total time is
              </p>
              <div className="overflow-x-auto">
                <BlockMath math="O(T(n,t+1,3,k))+O(S(n,t+1,3,k)n)+O(k\log n+2^k+tk)+\operatorname{poly}(n,t)," />
              </div>
              <p>
                and <InlineMath math="k\log n" /> is absorbed by the final
                polynomial term. ∎
              </p>
            </div>
            <p>
              Properness is essential in the no-instance case because an
              improper learner could return a hypothesis outside the class
              that is consistent with the samples.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[var(--nb-text)] mb-4 border-b-2 border-[var(--nb-border)] pb-2">
              3. ETH-Tight Hardness of Proper Junta Learning
            </h2>
            <p className="mb-4">
              The lower bound begins with a parameter-preserving reduction
              from <strong>Hitting Set</strong>. Given a universe{" "}
              <InlineMath math="U=[n]" />, a family{" "}
              <InlineMath math="\mathcal F=\{F_1,\ldots,F_m\}" />, and a
              budget <InlineMath math="k" />, construct the labeled samples
            </p>
            <div className="bg-[var(--nb-bg)] border-2 border-[var(--nb-border)] p-3 mb-4 text-center overflow-x-auto">
              <BlockMath math="(\chi_{F_1},1),\ldots,(\chi_{F_m},1),(0^n,0)," />
            </div>
            <p className="mb-4">
              where <InlineMath math="\chi_F" /> is the characteristic vector
              of <InlineMath math="F" />, and the parameter remains exactly{" "}
              <InlineMath math="k" />.
            </p>

            <TheoremCard title="Parameter-preserving equivalence">
              <p>
                The family <InlineMath math="\mathcal F" /> has a hitting set
                of size at most <InlineMath math="k" /> if and only if the
                constructed samples are consistent with a{" "}
                <InlineMath math="k" />-junta.
              </p>
              <div className="mt-4 border-t-2 border-[var(--nb-border)] pt-4">
                <strong className="italic block mb-2">Proof</strong>
                <p className="mb-3">
                  Deduplicate repeated sets and output the stated samples;
                  because every <InlineMath math="F_i\neq\varnothing" />, no
                  positive sample equals <InlineMath math="0^n" />, and hence
                  the samples are pairwise distinct with{" "}
                  <InlineMath math="t\le m+1" />.
                </p>
                <p className="mb-3">
                  <InlineMath math="(\Rightarrow)" /> Let{" "}
                  <InlineMath math="S\subseteq U" /> satisfy{" "}
                  <InlineMath math="|S|\le k" /> and{" "}
                  <InlineMath math="S\cap F_i\neq\varnothing" /> for all{" "}
                  <InlineMath math="i\in[m]" />. Define
                </p>
                <div className="overflow-x-auto">
                  <BlockMath math="c(x)=\bigvee_{j\in S}x_j." />
                </div>
                <p className="mb-3">
                  Then <InlineMath math="c" /> depends only on{" "}
                  <InlineMath math="S" />, and
                </p>
                <div className="overflow-x-auto">
                  <BlockMath math="\forall i\in[m],\quad S\cap F_i\neq\varnothing\Longrightarrow c(\chi_{F_i})=1,\qquad c(0^n)=0." />
                </div>
                <p>
                  <InlineMath math="(\Leftarrow)" /> Conversely, let{" "}
                  <InlineMath math="c(x)=g(x_S)" /> be consistent, where{" "}
                  <InlineMath math="S\subseteq[n]" /> and{" "}
                  <InlineMath math="|S|\le k" />. For each{" "}
                  <InlineMath math="i\in[m]" />,
                </p>
                <div className="overflow-x-auto">
                  <BlockMath math="g((\chi_{F_i})_S)=c(\chi_{F_i})=1\neq0=c(0^n)=g((0^n)_S)." />
                </div>
                <p>
                  Therefore{" "}
                  <InlineMath math="(\chi_{F_i})_S\neq(0^n)_S" />, which is
                  equivalent to <InlineMath math="S\cap F_i\neq\varnothing" />.
                  Thus <InlineMath math="S" /> hits every member of{" "}
                  <InlineMath math="\mathcal F" /> and has size at most{" "}
                  <InlineMath math="k" />. ∎
                </p>
              </div>
            </TheoremCard>

            <TheoremCard title="Corollary: ETH hardness of junta consistency">
              <p className="mb-3">
                Assuming ETH, no algorithm solves{" "}
                <InlineMath math="k" />-Junta-Consistency in time{" "}
                <InlineMath math="f(k)(n+t)^{o(k)}" /> for any computable{" "}
                <InlineMath math="f" />. Under randomized ETH, the same holds
                for randomized algorithms with success probability at least{" "}
                <InlineMath math="2/3" />.
              </p>
              <div className="mt-4 border-t-2 border-[var(--nb-border)] pt-4">
                <strong className="italic block mb-2">Proof</strong>
                <p className="mb-3">
                  Let <InlineMath math="N=n+m" /> denote the Hitting Set base
                  size. The reduction is polynomial-time, maps{" "}
                  <InlineMath math="k\mapsto k" />, and satisfies
                </p>
                <div className="overflow-x-auto">
                  <BlockMath math="t\le m+1,\qquad n+t\le n+m+1=N+1=O(N)." />
                </div>
                <p className="mb-3">
                  If consistency were decidable in time{" "}
                  <InlineMath math="f(k)(n+t)^{g(k)}" /> for some{" "}
                  <InlineMath math="g(k)=o(k)" />, then Hitting Set would be
                  decidable in time
                </p>
                <div className="overflow-x-auto">
                  <BlockMath math="\operatorname{poly}(N)+f(k)(N+1)^{g(k)}\le \operatorname{poly}(N)+f'(k)N^{g(k)}=f''(k)N^{o(k)}," />
                </div>
                <p>
                  contradicting the ETH lower bound. For a randomized search
                  algorithm, accept only after parsing the returned
                  representation and verifying all <InlineMath math="t" />{" "}
                  labels. This gives one-sided error with success probability
                  at least <InlineMath math="2/3" />, while the rETH lower
                  bound already excludes two-sided bounded error. ∎
                </p>
              </div>
            </TheoremCard>

            <div className="bg-[var(--nb-primary)] text-white border-3 border-[var(--nb-border)] p-6 shadow-[4px_4px_0_0_var(--nb-border)] mb-6">
              <strong className="block text-lg mb-3">
                ETH-tight hardness of proper junta learning
              </strong>
              <p className="mb-3">
                Assuming randomized ETH, no randomized algorithm properly
                PAC-learns <InlineMath math="k" />-juntas in time
              </p>
              <div className="overflow-x-auto">
                <BlockMath math="f(k)\cdot\left(n\cdot\frac1\varepsilon\cdot\frac1\delta\right)^{o(k)}" />
              </div>
              <p>
                for any computable <InlineMath math="f" />. This includes
                deterministic learners. The exponent is attained up to
                constants by exhaustive search in time{" "}
                <InlineMath math="n^{O(k)}2^{O(2^k)}\operatorname{poly}(1/\varepsilon,1/\delta)" />.
              </p>
            </div>

            <div className="bg-[var(--nb-bg-card)] border-l-4 border-[var(--nb-primary)] pl-4 py-3 mb-6">
              <strong className="italic block mb-3">Proof</strong>
              <p className="mb-3">
                Suppose that a learner <InlineMath math="\mathcal A" /> has
                running time
              </p>
              <div className="overflow-x-auto">
                <BlockMath math="T\!\left(n,\frac1\varepsilon,\frac1\delta,k\right)=f(k)\left(\frac{n}{\varepsilon\delta}\right)^{g(k)},\qquad g(k)=o(k)," />
              </div>
              <p className="mb-3">
                and uses <InlineMath math="S\le T" /> examples. Substitution
                of <InlineMath math="\varepsilon=1/(t+1)" /> and{" "}
                <InlineMath math="\delta=1/3" /> into the preceding reduction
                lemma gives
              </p>
              <div className="overflow-x-auto">
                <BlockMath math="\begin{aligned}R(n,t,k)&=O\!\left(f(k)(3n(t+1))^{g(k)}\right)\\&\quad+O\!\left(f(k)(3n(t+1))^{g(k)}n\right)+O(2^k+tk)+\operatorname{poly}(n,t)\\&\le f'(k)(n+t)^{g(k)+O(1)}.\end{aligned}" />
              </div>
              <p className="mb-3">
                Here <InlineMath math="f'" /> is computable, and
              </p>
              <div className="overflow-x-auto">
                <BlockMath math="\frac{g(k)+O(1)}{k}=\frac{g(k)}k+O\!\left(\frac1k\right)\longrightarrow0." />
              </div>
              <p className="mb-3">
                Thus <InlineMath math="R(n,t,k)=f'(k)(n+t)^{o(k)}" />,
                contradicting consistency hardness under rETH. The
                contradiction also applies when{" "}
                <InlineMath math="\mathcal A" /> is deterministic, because
                the consistency procedure itself samples the simulated
                i.i.d. examples.
              </p>
              <p className="mb-3">
                For the matching upper exponent, let{" "}
                <InlineMath math="\mathcal H_{n,k}" /> be the class of
                represented <InlineMath math="k" />-juntas. It satisfies
              </p>
              <div className="overflow-x-auto">
                <BlockMath math="|\mathcal H_{n,k}|\le\binom nk\,2^{2^k},\qquad \ln|\mathcal H_{n,k}|\le\ln\binom nk+2^k\ln2." />
              </div>
              <p className="mb-3">
                Draw
              </p>
              <div className="overflow-x-auto">
                <BlockMath math="q=\left\lceil\frac{\ln|\mathcal H_{n,k}|+\ln(1/\delta)}{\varepsilon}\right\rceil=O\!\left(\frac{2^k+\log\binom nk+\log(1/\delta)}{\varepsilon}\right)" />
              </div>
              <p className="mb-3">
                examples, enumerate all relevant sets and truth tables, and
                output a consistent candidate. For every{" "}
                <InlineMath math="h" /> with true error{" "}
                <InlineMath math=">\varepsilon" />,
              </p>
              <div className="overflow-x-auto">
                <BlockMath math="\Pr[h\text{ is consistent with all }q\text{ examples}]\le(1-\varepsilon)^q\le e^{-\varepsilon q}\le\frac{\delta}{|\mathcal H_{n,k}|}." />
              </div>
              <p>
                A union bound proves error at most{" "}
                <InlineMath math="\varepsilon" /> with probability at least{" "}
                <InlineMath math="1-\delta" />. Enumeration takes{" "}
                <InlineMath math="n^{O(k)}2^{O(2^k)}\operatorname{poly}(1/\varepsilon,\log(1/\delta))" />{" "}
                time. ∎
              </p>
            </div>

            <TheoremCard title="ETH-tight hardness for width-k CNF and DNF">
              <p className="mb-3">
                Assuming randomized ETH, no randomized algorithm properly
                learns width-<InlineMath math="k" /> CNF or DNF formulas in
                time
              </p>
              <div className="overflow-x-auto">
                <BlockMath math="f(k)\left(n+s+\frac1\varepsilon+\frac1\delta\right)^{o(k)}," />
              </div>
              <p>
                where <InlineMath math="s" /> is the target representation
                size.
              </p>
              <div className="mt-4 border-t-2 border-[var(--nb-border)] pt-4">
                <strong className="italic block mb-2">Proof</strong>
                <p className="mb-3">
                  For <InlineMath math="(U,\mathcal F,k)" />, use the samples{" "}
                  <InlineMath math="(\chi_{F_i},1)" /> and{" "}
                  <InlineMath math="(0^n,0)" />. If{" "}
                  <InlineMath math="S" /> is a hitting set with{" "}
                  <InlineMath math="|S|\le k" />, the one-clause CNF
                </p>
                <div className="overflow-x-auto">
                  <BlockMath math="\Phi_S(x)=C_S(x)=\bigvee_{j\in S}x_j" />
                </div>
                <p className="mb-3">
                  has width at most <InlineMath math="k" /> and satisfies
                </p>
                <div className="overflow-x-auto">
                  <BlockMath math="\Phi_S(0^n)=0,\qquad \forall i\in[m],\quad S\cap F_i\neq\varnothing\Longrightarrow\Phi_S(\chi_{F_i})=1." />
                </div>
                <p className="mb-3">
                  Conversely, let{" "}
                  <InlineMath math="\Phi=\bigwedge_{r=1}^q C_r" /> be a
                  consistent width-<InlineMath math="k" /> CNF. Since{" "}
                  <InlineMath math="\Phi(0^n)=0" />, there exists{" "}
                  <InlineMath math="r" /> with{" "}
                  <InlineMath math="C_r(0^n)=0" />. Hence{" "}
                  <InlineMath math="C_r" /> contains no negative literal. If{" "}
                  <InlineMath math="S_r" /> is its set of variables, then{" "}
                  <InlineMath math="|S_r|\le k" /> and
                </p>
                <div className="overflow-x-auto">
                  <BlockMath math="\forall i\in[m],\quad 1=\Phi(\chi_{F_i})\Longrightarrow C_r(\chi_{F_i})=1\Longrightarrow S_r\cap F_i\neq\varnothing." />
                </div>
                <p>
                  Thus consistency is equivalent to Hitting Set, the
                  parameter is preserved, and yes-instances admit target
                  size <InlineMath math="s=O(k\log n)" />. Apply the
                  learning-to-consistency reduction with{" "}
                  <InlineMath math="\varepsilon=1/(t+1)" />; validation is
                  polynomial in <InlineMath math="|\Phi|+n+t" />. The assumed
                  learner would therefore yield a randomized Hitting Set
                  algorithm of time{" "}
                  <InlineMath math="f'(k)(n+t)^{o(k)}" />, contrary to rETH.
                  Finally, for every width-<InlineMath math="k" /> CNF{" "}
                  <InlineMath math="\Phi" />,
                </p>
                <div className="overflow-x-auto">
                  <BlockMath math="\Phi(x)=a\quad\Longleftrightarrow\quad(\neg\Phi)(x)=1-a,\qquad \neg\Phi=\bigvee_r\neg C_r," />
                </div>
                <p>
                  and each <InlineMath math="\neg C_r" /> is a term of width
                  at most <InlineMath math="k" />. Complementing every label
                  therefore gives the DNF result with the same parameter and
                  runtime bounds. ∎
                </p>
              </div>
            </TheoremCard>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[var(--nb-text)] mb-4 border-b-2 border-[var(--nb-border)] pb-2">
              4. The Collapse under Support-Bounding Distribution Parameters
            </h2>
            <p className="mb-4">
              The parameterized framework allows a distribution parameter{" "}
              <InlineMath math="\lambda(\mathcal D)" /> provided it is
              monotone under support inclusion:
            </p>
            <div className="bg-[var(--nb-bg)] border-2 border-[var(--nb-border)] p-3 mb-6 text-center overflow-x-auto">
              <BlockMath math="\operatorname{supp}\mathcal D\subseteq\operatorname{supp}\mathcal D'\Longrightarrow\lambda(\mathcal D)\le\lambda(\mathcal D')." />
            </div>

            <DefinitionCard title="Separating number">
              <p className="mb-3">
                For a finite set{" "}
                <InlineMath math="X\subseteq\{0,1\}^n" />, the separating
                number <InlineMath math="\operatorname{sep}(X)" /> is the
                smallest size of a coordinate set{" "}
                <InlineMath math="J\subseteq[n]" /> such that{" "}
                <InlineMath math="x\mapsto x_J" /> is injective on{" "}
                <InlineMath math="X" />.
              </p>
              <div className="overflow-x-auto">
                <BlockMath math="\lceil\log_2|X|\rceil\le\operatorname{sep}(X)\le |X|-1." />
              </div>
              <p className="mt-3">
                For the lower bound, an injective map into{" "}
                <InlineMath math="\{0,1\}^{|J|}" /> requires{" "}
                <InlineMath math="|X|\le2^{|J|}" />. For the upper bound,
                begin with the one-block partition of{" "}
                <InlineMath math="X" /> and, while a block contains two
                distinct points, add a coordinate that is nonconstant on that
                block. Each addition strictly refines the partition, so at
                most <InlineMath math="|X|-1" /> refinements produce the
                discrete partition.
              </p>
            </DefinitionCard>

            <p className="mb-4">
              If the separating number is <InlineMath math="\ell" />, then the
              sample support contains at most <InlineMath math="2^\ell" />{" "}
              points. On <InlineMath math="t" /> sample points, each input
              coordinate has one of at most <InlineMath math="2^t" /> column
              patterns.
            </p>

            <TheoremCard title="FPT collapse under separating number">
              <p className="mb-3">
                Junta consistency with parameters{" "}
                <InlineMath math="k+\ell" />, where{" "}
                <InlineMath math="\ell=\operatorname{sep}(X)" />, is solvable
                in deterministic time
              </p>
              <div className="overflow-x-auto">
                <BlockMath math="2^{O(k2^\ell+2^k)}\cdot\operatorname{poly}(n,t)." />
              </div>
              <div className="mt-4 border-t-2 border-[var(--nb-border)] pt-4">
                <strong className="italic block mb-2">Proof</strong>
                <p className="mb-3">
                  Let <InlineMath math="X=\{x_1,\ldots,x_t\}" />. By the
                  definition of <InlineMath math="\ell=\operatorname{sep}(X)" />,
                  some <InlineMath math="J\subseteq[n]" /> with{" "}
                  <InlineMath math="|J|=\ell" /> makes{" "}
                  <InlineMath math="x\mapsto x_J" /> injective on{" "}
                  <InlineMath math="X" />. Consequently,
                </p>
                <div className="overflow-x-auto">
                  <BlockMath math="t=|X|=|\{(x_i)_J:i\in[t]\}|\le|\{0,1\}^J|=2^\ell." />
                </div>
                <p className="mb-3">
                  For each <InlineMath math="j\in[n]" />, define
                </p>
                <div className="overflow-x-auto">
                  <BlockMath math="c_j=(x_1[j],\ldots,x_t[j])\in\{0,1\}^t,\qquad j\sim j'\Longleftrightarrow c_j=c_{j'}." />
                </div>
                <p className="mb-3">
                  There are at most <InlineMath math="\min\{n,2^t\}" />{" "}
                  equivalence classes, computable in{" "}
                  <InlineMath math="\operatorname{poly}(n,t)" /> time. If{" "}
                  <InlineMath math="h(x)=g(x_S)" /> is consistent and{" "}
                  <InlineMath math="j\in S" />, replacing{" "}
                  <InlineMath math="j" /> by an equivalent representative and
                  renaming that input of <InlineMath math="g" /> preserves
                  every tuple <InlineMath math="(x_i)_S" />. Hence a solution
                  exists if and only if one exists using at most one chosen
                  representative from each of at most{" "}
                  <InlineMath math="k" /> classes.
                </p>
                <p className="mb-3">
                  The numbers of class selections and Boolean tables are
                  bounded by
                </p>
                <div className="overflow-x-auto">
                  <BlockMath math="\sum_{r=0}^k\binom{2^t}{r}\le(2^t+1)^k\le2^{(t+1)k}\le2^{k(2^\ell+1)},\qquad \sum_{r=0}^k2^{2^r}\le(k+1)2^{2^k}." />
                </div>
                <p className="mb-3">
                  For each pair <InlineMath math="(S,g)" />, test
                </p>
                <div className="overflow-x-auto">
                  <BlockMath math="\forall i\in[t],\qquad g((x_i)_S)=a_i" />
                </div>
                <p>
                  in <InlineMath math="O(tk)" /> time. Completeness follows
                  from the replacement argument, and soundness is immediate
                  from the test. The output representation has size at most{" "}
                  <InlineMath math="k\lceil\log n\rceil+2^k" />, and the total
                  time is{" "}
                  <InlineMath math="2^{O(k2^\ell+2^k)}\operatorname{poly}(n,t)" />.
                  ∎
                </p>
              </div>
            </TheoremCard>

            <TheoremCard title="Proposition: consistency when k ≥ ℓ">
              <p>
                Let <InlineMath math="X=\{x_1,\ldots,x_t\}" /> and{" "}
                <InlineMath math="\ell=\operatorname{sep}(X)" />. If{" "}
                <InlineMath math="k\ge\ell" />, then for every labeling{" "}
                <InlineMath math="a_1,\ldots,a_t\in\{0,1\}" /> there exists a{" "}
                <InlineMath math="k" />-junta consistent with all labeled
                samples.
              </p>
              <div className="mt-4 border-t-2 border-[var(--nb-border)] pt-4">
                <strong className="italic block mb-2">Proof</strong>
                <p className="mb-3">
                  Choose <InlineMath math="J\subseteq[n]" /> with{" "}
                  <InlineMath math="|J|=\ell\le k" /> such that{" "}
                  <InlineMath math="\pi_J(x)=x_J" /> is injective on{" "}
                  <InlineMath math="X" />. Thus
                </p>
                <div className="overflow-x-auto">
                  <BlockMath math="\forall i,j\in[t],\qquad (x_i)_J=(x_j)_J\Longrightarrow x_i=x_j\Longrightarrow i=j." />
                </div>
                <p className="mb-3">
                  Therefore the assignment
                </p>
                <div className="overflow-x-auto">
                  <BlockMath math="g_0:\pi_J(X)\to\{0,1\},\qquad g_0((x_i)_J)=a_i" />
                </div>
                <p className="mb-3">
                  is well-defined. Choose any extension{" "}
                  <InlineMath math="g:\{0,1\}^J\to\{0,1\}" /> of{" "}
                  <InlineMath math="g_0" /> and define{" "}
                  <InlineMath math="h(x)=g(x_J)" />. Then
                </p>
                <div className="overflow-x-auto">
                  <BlockMath math="|\operatorname{rel}(h)|\le|J|=\ell\le k,\qquad \forall i\in[t],\quad h(x_i)=g((x_i)_J)=g_0((x_i)_J)=a_i." />
                </div>
                <p>
                  Hence <InlineMath math="h" /> is a consistent{" "}
                  <InlineMath math="k" />-junta. ∎
                </p>
              </div>
            </TheoremCard>

            <TheoremCard title="Corollary: proper learning under separating number">
              <p className="mb-3">
                Proper junta learning parameterized by{" "}
                <InlineMath math="(k,\ell)" />, where{" "}
                <InlineMath math="\ell" /> is the separating number, belongs
                to parameterized PAC time.
              </p>
              <div className="mt-4 border-t-2 border-[var(--nb-border)] pt-4">
                <strong className="italic block mb-2">Proof</strong>
                <p className="mb-3">
                  Let <InlineMath math="\mathcal H_{n,k}" /> denote the finite
                  class of represented <InlineMath math="k" />-juntas. Draw
                </p>
                <div className="overflow-x-auto">
                  <BlockMath math="q=\left\lceil\frac{\ln|\mathcal H_{n,k}|+\ln(1/\delta)}{\varepsilon}\right\rceil" />
                </div>
                <p className="mb-3">
                  i.i.d. labeled examples and let <InlineMath math="X" /> be
                  the deduplicated input set. If the hidden distribution is{" "}
                  <InlineMath math="\mathcal D" /> with{" "}
                  <InlineMath math="\operatorname{sep}(\operatorname{supp}\mathcal D)=\ell" />,
                  then restriction of any separating set gives
                </p>
                <div className="overflow-x-auto">
                  <BlockMath math="\operatorname{sep}(X)\le\operatorname{sep}(\operatorname{supp}\mathcal D)=\ell." />
                </div>
                <p className="mb-3">
                  The target itself is consistent, so the consistency
                  algorithm returns some{" "}
                  <InlineMath math="h\in\mathcal H_{n,k}" /> in FPT time. For
                  fixed <InlineMath math="h" /> with{" "}
                  <InlineMath math="\operatorname{err}_{\mathcal D}(h)>\varepsilon" />,
                </p>
                <div className="overflow-x-auto">
                  <BlockMath math="\Pr[h\text{ is sample-consistent}]=(1-\operatorname{err}_{\mathcal D}(h))^q\le(1-\varepsilon)^q\le e^{-\varepsilon q}\le\frac{\delta}{|\mathcal H_{n,k}|}." />
                </div>
                <p className="mb-3">
                  Therefore
                </p>
                <div className="overflow-x-auto">
                  <BlockMath math="\Pr[\exists h\in\mathcal H_{n,k}:\operatorname{err}_{\mathcal D}(h)>\varepsilon\ \wedge\ h\text{ is sample-consistent}]\le\sum_{h\in\mathcal H_{n,k}}\frac{\delta}{|\mathcal H_{n,k}|}=\delta." />
                </div>
                <p>
                  Finally,{" "}
                  <InlineMath math="\log|\mathcal H_{n,k}|\le k\lceil\log n\rceil+2^k" />;
                  hence <InlineMath math="q" /> has the required polynomial
                  dependence, and with probability at least{" "}
                  <InlineMath math="1-\delta" /> the returned proper hypothesis
                  has error at most <InlineMath math="\varepsilon" />. ∎
                </p>
              </div>
            </TheoremCard>

            <DefinitionCard title="Support-bounding parameter">
              <p>
                A distribution parameter <InlineMath math="\lambda" /> is
                support-bounding if a computable nondecreasing function{" "}
                <InlineMath math="g" /> satisfies{" "}
                <InlineMath math="|\operatorname{supp}\mathcal D|\le g(\lambda(\mathcal D))" />{" "}
                for every finitely supported <InlineMath math="\mathcal D" />.
              </p>
            </DefinitionCard>

            <TheoremCard title="Proposition: all support-bounding parameters">
              <p className="mb-3">
                If <InlineMath math="\lambda" /> is support-bounding, junta
                consistency is FPT in <InlineMath math="k+\ell" />, and proper
                junta learning is in parameterized PAC time.
              </p>
              <div className="mt-4 border-t-2 border-[var(--nb-border)] pt-4">
                <strong className="italic block mb-2">Proof</strong>
                <p className="mb-3">
                  Let <InlineMath math="\lambda(\mathcal D)=\ell" /> and{" "}
                  <InlineMath math="|\operatorname{supp}\mathcal D|\le g(\ell)" />.
                  For a consistency instance whose distinct input set is{" "}
                  <InlineMath math="X" />, the support bound gives
                </p>
                <div className="overflow-x-auto">
                  <BlockMath math="t=|X|\le g(\ell),\qquad \#\{c_j:j\in[n]\}\le2^t\le2^{g(\ell)}." />
                </div>
                <p className="mb-3">
                  Repeating the column-class enumeration yields time
                </p>
                <div className="overflow-x-auto">
                  <BlockMath math="2^{k(g(\ell)+1)}\,2^{2^k}\operatorname{poly}(n,t)=F(k,\ell)\operatorname{poly}(n,t)," />
                </div>
                <p className="mb-3">
                  where <InlineMath math="F" /> is computable; thus consistency
                  is FPT in <InlineMath math="k+\ell" />. For learning, every
                  deduplicated sample set <InlineMath math="X" /> satisfies
                </p>
                <div className="overflow-x-auto">
                  <BlockMath math="|X|\le|\operatorname{supp}\mathcal D|\le g(\ell)." />
                </div>
                <p>
                  Use the preceding finite-class sample size and this FPT
                  consistency procedure. The same calculation gives failure
                  probability at most{" "}
                  <InlineMath math="|\mathcal H_{n,k}|e^{-\varepsilon q}\le\delta" />,
                  while the hypothesis-space bound is unchanged. ∎
                </p>
              </div>
            </TheoremCard>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[var(--nb-text)] mb-4 border-b-2 border-[var(--nb-border)] pb-2">
              5. Tractability from Bounded Hamming Geometry
            </h2>
            <p className="mb-4">
              Although bounded support size is not necessary for
              tractability, it is useful to define, for two Boolean vectors,
              their coordinate-difference set by
            </p>
            <div className="bg-[var(--nb-bg)] border-2 border-[var(--nb-border)] p-3 mb-4 text-center overflow-x-auto">
              <BlockMath math="\Delta(x,y)=\{j\in[n]:x[j]\neq y[j]\}." />
            </div>
            <p className="mb-4">
              Given labeled samples, form a hypergraph on the coordinates
              whose edges are the difference sets of every oppositely
              labeled pair:
            </p>
            <div className="bg-[var(--nb-bg)] border-2 border-[var(--nb-border)] p-3 mb-6 text-center overflow-x-auto">
              <BlockMath math="\mathcal G=\left([n],\{\Delta(x_i,x_j):a_i\neq a_j\}\right)." />
            </div>

            <TheoremCard title="Conflict-hypergraph characterization">
              <p>
                The samples are consistent with a{" "}
                <InlineMath math="k" />-junta if and only if{" "}
                <InlineMath math="\mathcal G" /> has a hitting set of size at
                most <InlineMath math="k" />.
              </p>
              <div className="mt-4 border-t-2 border-[var(--nb-border)] pt-4">
                <strong className="italic block mb-2">Proof</strong>
                <p className="mb-3">
                  <InlineMath math="(\Rightarrow)" /> Let{" "}
                  <InlineMath math="h(x)=g(x_J)" /> be consistent with{" "}
                  <InlineMath math="|J|\le k" />. For every oppositely labeled
                  pair,
                </p>
                <div className="overflow-x-auto">
                  <BlockMath math="a_i\neq a_j\Longrightarrow h(x_i)\neq h(x_j)\Longrightarrow (x_i)_J\neq(x_j)_J\Longrightarrow J\cap\Delta(x_i,x_j)\neq\varnothing." />
                </div>
                <p className="mb-3">
                  Thus <InlineMath math="J" /> hits every edge of{" "}
                  <InlineMath math="\mathcal G" />.
                </p>
                <p className="mb-3">
                  <InlineMath math="(\Leftarrow)" /> Let{" "}
                  <InlineMath math="J\subseteq[n]" /> hit every edge and{" "}
                  <InlineMath math="|J|\le k" />. If observed projections
                  coincide, then
                </p>
                <div className="overflow-x-auto">
                  <BlockMath math="(x_i)_J=(x_j)_J\Longrightarrow J\cap\Delta(x_i,x_j)=\varnothing\Longrightarrow a_i=a_j," />
                </div>
                <p className="mb-3">
                  where the last implication is the contrapositive of the
                  hitting property. Hence
                </p>
                <div className="overflow-x-auto">
                  <BlockMath math="g_0:\{(x_i)_J:i\in[t]\}\to\{0,1\},\qquad g_0((x_i)_J)=a_i" />
                </div>
                <p>
                  is well-defined. Extend <InlineMath math="g_0" /> to{" "}
                  <InlineMath math="g:\{0,1\}^J\to\{0,1\}" /> and set{" "}
                  <InlineMath math="h(x)=g(x_J)" />. Then{" "}
                  <InlineMath math="h(x_i)=a_i" /> for every{" "}
                  <InlineMath math="i\in[t]" />, and{" "}
                  <InlineMath math="h" /> is a <InlineMath math="k" />-junta.
                  ∎
                </p>
              </div>
            </TheoremCard>

            <p className="mb-4">
              This equivalence turns geometric restrictions on the support
              into rank restrictions on a Hitting Set instance. The support
              diameter is defined by
            </p>
            <div className="bg-[var(--nb-bg)] border-2 border-[var(--nb-border)] p-3 mb-6 text-center overflow-x-auto">
              <BlockMath math="\lambda_{\mathrm{diam}}(\mathcal D)=\max_{x,y\in\operatorname{supp}\mathcal D}|\Delta(x,y)|." />
            </div>

            <TheoremCard title="Bounded-diameter consistency">
              <p className="mb-3">
                If the support has Hamming diameter{" "}
                <InlineMath math="\ell" />, junta consistency is solvable in
                time
              </p>
              <div className="overflow-x-auto">
                <BlockMath math="(\ell+1)^k\cdot\operatorname{poly}(n,t)+2^k." />
              </div>
              <div className="mt-4 border-t-2 border-[var(--nb-border)] pt-4">
                <strong className="italic block mb-2">Proof</strong>
                <p className="mb-3">
                  Construct <InlineMath math="\mathcal G" />. By the diameter
                  bound,
                </p>
                <div className="overflow-x-auto">
                  <BlockMath math="\forall E\in E(\mathcal G),\qquad |E|\le\ell." />
                </div>
                <p className="mb-3">
                  Define a search state <InlineMath math="(\mathcal E,b,J)" />,
                  where <InlineMath math="\mathcal E" /> is the set of unhit
                  edges, <InlineMath math="b" /> is the remaining budget, and{" "}
                  <InlineMath math="J" /> is the selected set. If{" "}
                  <InlineMath math="\mathcal E=\varnothing" />, return{" "}
                  <InlineMath math="J" />; if{" "}
                  <InlineMath math="\mathcal E\neq\varnothing" /> and{" "}
                  <InlineMath math="b=0" />, reject. Otherwise choose{" "}
                  <InlineMath math="E\in\mathcal E" /> and branch, for each{" "}
                  <InlineMath math="j\in E" />, to
                </p>
                <div className="overflow-x-auto">
                  <BlockMath math="\left(\{E'\in\mathcal E:j\notin E'\},\,b-1,\,J\cup\{j\}\right)." />
                </div>
                <p className="mb-3">
                  Every hitting set extending <InlineMath math="J" /> contains
                  some <InlineMath math="j\in E" />, so the branching is
                  complete; each returned set hits every original edge, so it
                  is sound. The depth is at most <InlineMath math="k" />, and
                  the leaf count is at most
                </p>
                <div className="overflow-x-auto">
                  <BlockMath math="\max\{1,\ell\}^k\le(\ell+1)^k." />
                </div>
                <p>
                  Hypergraph construction and each branch operation are
                  polynomial in <InlineMath math="n,t" />. On success, the
                  conflict-hypergraph construction defines the truth table in{" "}
                  <InlineMath math="O(2^k+tk)" /> time. Thus the total time is{" "}
                  <InlineMath math="(\ell+1)^k\operatorname{poly}(n,t)+2^k" />.
                  ∎
                </p>
              </div>
            </TheoremCard>

            <TheoremCard title="Corollary: maximum Hamming weight">
              <p className="mb-3">
                Let{" "}
                <InlineMath math="\lambda_{\mathrm{wt}}(\mathcal D)=\max\{|x|_1:x\in\operatorname{supp}\mathcal D\}" />.
                Junta consistency is solvable in
              </p>
              <div className="overflow-x-auto">
                <BlockMath math="(2\ell+1)^k\operatorname{poly}(n,t)+2^k," />
              </div>
              <p>
                and proper learning is in parameterized PAC time.
              </p>
              <div className="mt-4 border-t-2 border-[var(--nb-border)] pt-4">
                <strong className="italic block mb-2">Proof</strong>
                <p className="mb-3">
                  For all{" "}
                  <InlineMath math="x,y\in\operatorname{supp}\mathcal D" />,
                </p>
                <div className="overflow-x-auto">
                  <BlockMath math="\Delta(x,y)\subseteq\operatorname{supp}(x)\cup\operatorname{supp}(y),\qquad |\Delta(x,y)|\le|x|_1+|y|_1\le2\ell." />
                </div>
                <p className="mb-3">
                  Hence{" "}
                  <InlineMath math="\lambda_{\mathrm{diam}}(\mathcal D)\le2\ell" />,
                  and the bounded-diameter algorithm runs in{" "}
                  <InlineMath math="(2\ell+1)^k\operatorname{poly}(n,t)+2^k" />.
                  For learning, draw
                </p>
                <div className="overflow-x-auto">
                  <BlockMath math="q=\left\lceil\frac{\ln|\mathcal H_{n,k}|+\ln(1/\delta)}{\varepsilon}\right\rceil" />
                </div>
                <p>
                  examples and invoke that consistency algorithm. Every
                  sampled point has weight at most <InlineMath math="\ell" />,
                  and the target ensures realizability. The finite-class
                  estimate{" "}
                  <InlineMath math="|\mathcal H_{n,k}|e^{-\varepsilon q}\le\delta" />{" "}
                  proves that every returned consistent hypothesis has error
                  at most <InlineMath math="\varepsilon" /> with probability
                  at least <InlineMath math="1-\delta" />. ∎
                </p>
              </div>
            </TheoremCard>

            <TheoremCard title="Corollary: Hamming-diameter learning">
              <p>
                Proper junta learning parameterized by Hamming diameter is in
                parameterized PAC time.
              </p>
              <div className="mt-4 border-t-2 border-[var(--nb-border)] pt-4">
                <strong className="italic block mb-2">Proof</strong>
                <p className="mb-3">
                  Draw
                </p>
                <div className="overflow-x-auto">
                  <BlockMath math="q=\left\lceil\frac{\ln|\mathcal H_{n,k}|+\ln(1/\delta)}{\varepsilon}\right\rceil" />
                </div>
                <p className="mb-3">
                  examples and let <InlineMath math="X" /> be their
                  deduplicated input set. If{" "}
                  <InlineMath math="\lambda_{\mathrm{diam}}(\mathcal D)=\ell" />,
                  then
                </p>
                <div className="overflow-x-auto">
                  <BlockMath math="\max_{x,y\in X}|\Delta(x,y)|\le\max_{x,y\in\operatorname{supp}\mathcal D}|\Delta(x,y)|=\ell." />
                </div>
                <p>
                  The bounded-diameter consistency algorithm is therefore FPT
                  in <InlineMath math="k+\ell" /> and returns a consistent
                  proper hypothesis. As above, the probability that any{" "}
                  <InlineMath math="h\in\mathcal H_{n,k}" /> of error greater
                  than <InlineMath math="\varepsilon" /> is consistent is at
                  most{" "}
                  <InlineMath math="|\mathcal H_{n,k}|e^{-\varepsilon q}\le\delta" />.
                  ∎
                </p>
              </div>
            </TheoremCard>

            <p>
              Neither parameter bounds support size, as the set{" "}
              <InlineMath math="\{0^n,e_1,\ldots,e_n\}" /> has maximum weight{" "}
              <InlineMath math="1" />, diameter <InlineMath math="2" />, and
              size <InlineMath math="n+1" />.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[var(--nb-text)] mb-4 border-b-2 border-[var(--nb-border)] pb-2">
              6. Intrinsic Parameters and Limits of Consistency
            </h2>
            <p className="mb-4">
              Many natural descriptions of structured distributions are
              intrinsic rather than support-monotone: a distribution is an{" "}
              <InlineMath math="\ell" />-junta distribution if conditioning
              on some <InlineMath math="\ell" /> coordinates makes the
              remaining coordinates independent, with product distributions
              corresponding exactly to the case{" "}
              <InlineMath math="\ell=0" />.
            </p>
            <p className="mb-4">
              Consider the even-parity set and its uniform distribution:
            </p>
            <div className="bg-[var(--nb-bg)] border-2 border-[var(--nb-border)] p-3 mb-6 text-center overflow-x-auto">
              <BlockMath math="E_n=\left\{x\in\{0,1\}^n:\bigoplus_i x_i=0\right\},\qquad \mathcal D_n=\operatorname{Unif}(E_n)." />
            </div>

            <TheoremCard title="Parity witnesses non-monotonicity">
              <p className="mb-3">
                Let <InlineMath math="\mathcal U_n" /> be uniform on the full
                Boolean cube. Although
              </p>
              <div className="overflow-x-auto">
                <BlockMath math="\operatorname{supp}\mathcal D_n\subsetneq\operatorname{supp}\mathcal U_n," />
              </div>
              <p className="mb-3">their junta parameters satisfy</p>
              <div className="overflow-x-auto">
                <BlockMath math="\lambda_{\mathrm{junta}}(\mathcal D_n)=n-1,\qquad \lambda_{\mathrm{junta}}(\mathcal U_n)=0." />
              </div>
              <p className="mb-3">
                Consequently, <InlineMath math="\lambda_{\mathrm{junta}}" /> is
                not support-monotone and is not parameter-equivalent to any
                support-monotone parameter: there are no support-monotone{" "}
                <InlineMath math="\lambda" /> and nondecreasing{" "}
                <InlineMath math="p,q" /> such that, for every{" "}
                <InlineMath math="\mathcal D" />,
              </p>
              <div className="overflow-x-auto">
                <BlockMath math="\lambda(\mathcal D)\le p(\lambda_{\mathrm{junta}}(\mathcal D)),\qquad \lambda_{\mathrm{junta}}(\mathcal D)\le q(\lambda(\mathcal D))." />
              </div>
              <div className="mt-4 border-t-2 border-[var(--nb-border)] pt-4">
                <strong className="italic block mb-2">Proof</strong>
                <p className="mb-3">
                  Since <InlineMath math="\mathcal U_n" /> has mutually
                  independent Bernoulli-<InlineMath math="1/2" /> coordinates,{" "}
                  <InlineMath math="\lambda_{\mathrm{junta}}(\mathcal U_n)=0" />.
                  Fix <InlineMath math="J\subseteq[n]" /> with{" "}
                  <InlineMath math="|J|\le n-2" /> and an assignment{" "}
                  <InlineMath math="a\in\{0,1\}^J" /> of positive probability.
                  Put <InlineMath math="m=n-|J|\ge2" />. Under{" "}
                  <InlineMath math="\mathcal D_n(\,\cdot\mid X_J=a)" />, the
                  remaining vector is uniform on
                </p>
                <div className="overflow-x-auto">
                  <BlockMath math="P_a=\left\{y\in\{0,1\}^m:\bigoplus_{r=1}^m y_r=\bigoplus_{j\in J}a_j\right\},\qquad |P_a|=2^{m-1}." />
                </div>
                <p className="mb-3">
                  For any remaining coordinate <InlineMath math="r" />, choose{" "}
                  <InlineMath math="s\neq r" />. The map that flips bits{" "}
                  <InlineMath math="r,s" /> is a bijection of{" "}
                  <InlineMath math="P_a" /> interchanging the events{" "}
                  <InlineMath math="Y_r=0" /> and{" "}
                  <InlineMath math="Y_r=1" />. Therefore
                </p>
                <div className="overflow-x-auto">
                  <BlockMath math="\forall r\in[m],\qquad \Pr[Y_r=0\mid X_J=a]=\Pr[Y_r=1\mid X_J=a]=\frac12." />
                </div>
                <p className="mb-3">
                  If the conditional coordinates were mutually independent,
                  these marginals would imply
                </p>
                <div className="overflow-x-auto">
                  <BlockMath math="\forall y\in\{0,1\}^m,\qquad \Pr[Y=y\mid X_J=a]=\prod_{r=1}^m\frac12=2^{-m}," />
                </div>
                <p className="mb-3">
                  contradicting support size{" "}
                  <InlineMath math="|P_a|=2^{m-1}" />. Hence no set of at most{" "}
                  <InlineMath math="n-2" /> coordinates suffices. Conditioning
                  on any <InlineMath math="n-1" /> coordinates determines the
                  last coordinate, whose point-mass law is a product law.
                  Thus
                </p>
                <div className="overflow-x-auto">
                  <BlockMath math="n-1\le\lambda_{\mathrm{junta}}(\mathcal D_n)\le n-1." />
                </div>
                <p>
                  For the final assertion, suppose that a support-monotone{" "}
                  <InlineMath math="\lambda" /> and nondecreasing{" "}
                  <InlineMath math="p,q" /> satisfy the two parameter bounds
                  for every distribution. Then
                </p>
                <div className="overflow-x-auto">
                  <BlockMath math="\lambda(\mathcal D_n)\le\lambda(\mathcal U_n)\le p(\lambda_{\mathrm{junta}}(\mathcal U_n))=p(0)," />
                </div>
                <p>
                  and monotonicity of <InlineMath math="q" /> gives
                </p>
                <div className="overflow-x-auto">
                  <BlockMath math="n-1=\lambda_{\mathrm{junta}}(\mathcal D_n)\le q(\lambda(\mathcal D_n))\le q(p(0))\qquad(\forall n)," />
                </div>
                <p>
                  which is impossible because the right-hand side is constant
                  in <InlineMath math="n" />. ∎
                </p>
              </div>
            </TheoremCard>

            <TheoremCard title="Corollary: Bayesian-network parameters">
              <p>
                For <InlineMath math="n\ge2" />, the even-parity distribution
                has minimum possible
                maximum indegree and minimum possible moral-graph treewidth
                of a Bayesian-network representation both equal{" "}
                <InlineMath math="n-1" />. For the full uniform distribution,
                both equal <InlineMath math="0" />. Consequently, neither
                parameter is support-monotone.
              </p>
              <div className="mt-4 border-t-2 border-[var(--nb-border)] pt-4">
                <strong className="italic block mb-2">Proof</strong>
                <p className="mb-3">
                  The empty DAG represents the mutually independent
                  coordinates of <InlineMath math="\mathcal U_n" />. Since
                  indegree and treewidth are nonnegative,
                </p>
                <div className="overflow-x-auto">
                  <BlockMath math="\operatorname{indeg}(\mathcal U_n)=\operatorname{tw}(\mathcal U_n)=0." />
                </div>
                <p className="mb-3">
                  Let <InlineMath math="G" /> be any DAG representing{" "}
                  <InlineMath math="\mathcal D_n" />, let{" "}
                  <InlineMath math="v" /> be a sink, and put
                </p>
                <div className="overflow-x-auto">
                  <BlockMath math="P=\operatorname{pa}_G(v),\qquad R=[n]\setminus(P\cup\{v\})." />
                </div>
                <p className="mb-3">
                  Assume <InlineMath math="R\neq\varnothing" />. For every
                  positive-probability assignment{" "}
                  <InlineMath math="X_P=a" />, at least the coordinates in{" "}
                  <InlineMath math="R\cup\{v\}" /> remain unconditioned. The
                  two values of <InlineMath math="X_v" /> have equally many
                  even-parity completions, so
                </p>
                <div className="overflow-x-auto">
                  <BlockMath math="\forall c\in\{0,1\},\qquad \Pr[X_v=c\mid X_P=a]=\frac12." />
                </div>
                <p className="mb-3">
                  For every compatible assignment{" "}
                  <InlineMath math="X_R=b" />, even parity determines
                </p>
                <div className="overflow-x-auto">
                  <BlockMath math="c(a,b)=\bigoplus_{i\in P}a_i\oplus\bigoplus_{j\in R}b_j,\qquad \Pr[X_v=c(a,b)\mid X_P=a,X_R=b]=1." />
                </div>
                <p className="mb-3">
                  Because <InlineMath math="v" /> is a sink, every vertex in{" "}
                  <InlineMath math="R" /> is a nondescendant and nonparent of{" "}
                  <InlineMath math="v" />. The local Markov property requires
                </p>
                <div className="overflow-x-auto">
                  <BlockMath math="X_v\perp X_R\mid X_P,\qquad \Pr[X_v=c(a,b)\mid X_P=a,X_R=b]=\Pr[X_v=c(a,b)\mid X_P=a]," />
                </div>
                <p className="mb-3">
                  contradicting <InlineMath math="1\neq1/2" />. Therefore
                </p>
                <div className="overflow-x-auto">
                  <BlockMath math="R=\varnothing,\qquad P=[n]\setminus\{v\},\qquad \max_{u\in[n]}|\operatorname{pa}_G(u)|\ge n-1." />
                </div>
                <p className="mb-3">
                  In the moral graph, all vertices of <InlineMath math="P" />{" "}
                  are pairwise adjacent as co-parents of{" "}
                  <InlineMath math="v" />, and each is adjacent to{" "}
                  <InlineMath math="v" />. Hence the moral graph contains{" "}
                  <InlineMath math="K_n" />, so
                </p>
                <div className="overflow-x-auto">
                  <BlockMath math="\operatorname{indeg}(\mathcal D_n)\ge n-1,\qquad \operatorname{tw}(\mathcal D_n)\ge\operatorname{tw}(K_n)=n-1." />
                </div>
                <p className="mb-3">
                  Conversely, a complete DAG from any total ordering
                  represents <InlineMath math="\mathcal D_n" /> by the chain
                  rule and has
                </p>
                <div className="overflow-x-auto">
                  <BlockMath math="\max_v|\operatorname{pa}_G(v)|=n-1,\qquad G^{\mathrm{moral}}=K_n,\qquad \operatorname{tw}(K_n)=n-1." />
                </div>
                <p>
                  Thus both lower bounds are attained. Since{" "}
                  <InlineMath math="\operatorname{supp}\mathcal D_n\subsetneq\operatorname{supp}\mathcal U_n" />{" "}
                  but both parameter values decrease from{" "}
                  <InlineMath math="n-1" /> to <InlineMath math="0" />, neither
                  parameter is support-monotone. ∎
                </p>
              </div>
            </TheoremCard>

            <DefinitionCard title="Intrinsic distributional parameterization">
              <p>
                An intrinsic parameterization assigns a value directly to
                each distribution, without requiring monotonicity under
                support inclusion; the parameterized PAC classes still make
                sense because the learner is simply promised the intrinsic
                parameter value of its hidden distribution.
              </p>
            </DefinitionCard>

            <TheoremCard title="Proposition: the intrinsic parameter-zero regime">
              <p className="mb-3">
                If proper junta learning with intrinsic junta parameter{" "}
                <InlineMath math="\ell" /> has running time{" "}
                <InlineMath math="f(k,\ell)(n/(\varepsilon\delta))^{o(k)}" />,
                then juntas are properly learnable under every product
                distribution in time{" "}
                <InlineMath math="f(k,0)(n/(\varepsilon\delta))^{o(k)}" />.
              </p>
              <div className="mt-4 border-t-2 border-[var(--nb-border)] pt-4">
                <strong className="italic block mb-2">Proof</strong>
                <p className="mb-3">
                  Fix an arbitrary product distribution{" "}
                  <InlineMath math="\mathcal D" /> on{" "}
                  <InlineMath math="\{0,1\}^n" /> and an arbitrary target{" "}
                  <InlineMath math="k" />-junta <InlineMath math="c^\ast" />.
                  Mutual independence without conditioning gives
                </p>
                <div className="overflow-x-auto">
                  <BlockMath math="J=\varnothing,\qquad \mathcal D=\bigotimes_{i=1}^n\mathcal D_i,\qquad \lambda_{\mathrm{junta}}(\mathcal D)=0." />
                </div>
                <p className="mb-3">
                  Write the assumed runtime of the intrinsic learner{" "}
                  <InlineMath math="\mathcal A" /> as
                </p>
                <div className="overflow-x-auto">
                  <BlockMath math="f(k,\ell)\left(\frac{n}{\varepsilon\delta}\right)^{g(k)},\qquad g(k)=o(k)." />
                </div>
                <p className="mb-3">
                  Define <InlineMath math="\mathcal B" /> to run{" "}
                  <InlineMath math="\mathcal A" /> with the same inputs and
                  example oracle, supplying the promised intrinsic parameter{" "}
                  <InlineMath math="\ell=0" />. This promise is valid, and the
                  PAC guarantee of <InlineMath math="\mathcal A" /> gives
                </p>
                <div className="overflow-x-auto">
                  <BlockMath math="\Pr_{\mathcal A,\mathrm{EX}(c^\ast,\mathcal D)}\!\left[\Pr_{x\sim\mathcal D}[h(x)\neq c^\ast(x)]\le\varepsilon\ \wedge\ h\in\mathcal H_{n,k}\right]\ge1-\delta." />
                </div>
                <p className="mb-3">
                  Its running time is
                </p>
                <div className="overflow-x-auto">
                  <BlockMath math="f(k,0)\left(\frac{n}{\varepsilon\delta}\right)^{g(k)}=f(k,0)\left(\frac{n}{\varepsilon\delta}\right)^{o(k)}." />
                </div>
                <p>
                  Since <InlineMath math="\mathcal D" /> and{" "}
                  <InlineMath math="c^\ast" /> were arbitrary, the bound holds
                  for every product distribution and every target{" "}
                  <InlineMath math="k" />-junta. Taking{" "}
                  <InlineMath math="\mathcal D_i=\operatorname{Bernoulli}(1/2)" />{" "}
                  for all <InlineMath math="i" /> includes the uniform
                  distribution. ∎
                </p>
              </div>
            </TheoremCard>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[var(--nb-text)] mb-4 border-b-2 border-[var(--nb-border)] pb-2">
              7. Conclusion and Open Problems
            </h2>
            <p className="mb-6">
              Proper junta learning has an ETH-tight lower bound under the
              trivial distributional parameter, whereas junta consistency
              and proper learning are fixed-parameter tractable for every
              support-bounding parameter and also for the support-unbounding
              Hamming-diameter and maximum-weight parameters. By contrast,
              the junta parameter of a distribution, Bayesian-network
              indegree, and moral-graph treewidth are not support-monotone,
              and for the intrinsic junta parameter, the parameter-zero case
              contains the uniform-distribution junta-learning problem.
            </p>

            <div className="space-y-6">
              <TheoremCard title="Open Problem 1: Support-monotone parameters">
                <p>
                  Characterize the support-monotone parameters{" "}
                  <InlineMath math="\lambda" /> for which junta consistency is
                  FPT in <InlineMath math="k+\lambda" />. Can this be expressed
                  through the rank or parameterized complexity of the induced
                  conflict hypergraphs?
                </p>
              </TheoremCard>
              <TheoremCard title="Open Problem 2: Tight hardness in the gap regime">
                <p>
                  Can the tight <InlineMath math="n^{o(k)}" /> lower bound be
                  extended from exact consistency to distinguishing perfectly
                  consistent samples from samples on which every{" "}
                  <InlineMath math="k" />-junta has agreement at most{" "}
                  <InlineMath math="1/2+\delta" />?
                </p>
              </TheoremCard>
              <TheoremCard title="Open Problem 3: Fourier-side tightness">
                <p>
                  Learning results under{" "}
                  <InlineMath math="\ell" />-junta distributions use a
                  spectral-norm bound{" "}
                  <InlineMath math="L_1(f)=O(2^{(\ell+d)/2})" /> for{" "}
                  <InlineMath math="d" />-literal conjunctions. Is this
                  dependence tight?
                </p>
              </TheoremCard>
            </div>
          </section>

          <section className="mb-8 pt-8 border-t-4 border-[var(--nb-border)]">
            <h2 className="text-2xl font-bold text-[var(--nb-text)] mb-4">
              Selected References
            </h2>
            <div className="space-y-3 text-[var(--nb-text)] text-sm">
              <div className="flex gap-3">
                <span className="font-mono text-[var(--nb-primary)] flex-shrink-0">
                  [1]
                </span>
                <span>
                  Arvind, V., Köbler, J., &amp; Lindner, W. (2009).
                  Parameterized learnability of juntas.{" "}
                  <em>Theoretical Computer Science</em>, 410(47–49),
                  4928–4936.
                </span>
              </div>
              <div className="flex gap-3">
                <span className="font-mono text-[var(--nb-primary)] flex-shrink-0">
                  [2]
                </span>
                <span>
                  Bhattacharyya, A., Gadekar, A., Ghoshal, S., &amp; Saket,
                  R. (2016). On the hardness of learning sparse parities.{" "}
                  <em>ESA 2016</em>.
                </span>
              </div>
              <div className="flex gap-3">
                <span className="font-mono text-[var(--nb-primary)] flex-shrink-0">
                  [3]
                </span>
                <span>
                  Brand, C., Ganian, R., &amp; Simonov, K. (2023). A
                  parameterized theory of PAC learning. <em>AAAI 2023</em>.
                </span>
              </div>
              <div className="flex gap-3">
                <span className="font-mono text-[var(--nb-primary)] flex-shrink-0">
                  [4]
                </span>
                <span>
                  Chen, J., Huang, X., Kanj, I. A., &amp; Xia, G. (2006).
                  Strong computational lower bounds via parameterized
                  complexity. <em>Journal of Computer and System Sciences</em>,
                  72(8), 1346–1367.
                </span>
              </div>
              <div className="flex gap-3">
                <span className="font-mono text-[var(--nb-primary)] flex-shrink-0">
                  [5]
                </span>
                <span>
                  Mossel, E., O&apos;Donnell, R., &amp; Servedio, R. A.
                  (2004). Learning functions of{" "}
                  <InlineMath math="k" /> relevant variables.{" "}
                  <em>Journal of Computer and System Sciences</em>, 69(3),
                  421–434.
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
