"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function CategoryTheoryFundamentals() {
  return (
    <div className="min-h-screen bg-[var(--nb-bg)] transition-colors duration-300">
      {/* Header */}
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

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Title Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-2 py-1 bg-[var(--nb-primary)] text-white text-xs font-semibold">
              Category Theory
            </span>
            <span className="px-2 py-1 bg-[var(--nb-primary)] text-white text-xs font-semibold">
              Abstract Algebra
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--nb-text)] mb-4">
            Notes on Category Theory
          </h1>
          <p className="text-[var(--nb-text-muted)] text-lg">
            A Formal Summary of Core Concepts
          </p>
          <div className="flex items-center gap-4 mt-4 text-sm text-[var(--nb-text-muted)]">
            <span>September 2025</span>
            <span>•</span>
            <span>6 min read</span>
            <span>•</span>
            <span className="font-mono text-[var(--nb-primary)]">Math Notebook</span>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none text-[var(--nb-text)]">
          
          {/* Definition */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[var(--nb-text)] mb-4 border-b-2 border-[var(--nb-border)] pb-2">
              Definition
            </h2>
            <p className="mb-4">
              A <strong>category</strong> is a triple <InlineMath math="C=(ob(C), \text{hom}(C), \circ)" /> consisting of the following data:
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-2">
              <li>
                <strong>Objects</strong>: A class <InlineMath math="ob(C)" /> of elements called objects. This class is not required to be a set.
              </li>
              <li>
                <strong>Morphisms</strong>: A class <InlineMath math="\text{hom}(C)" /> of elements called morphisms.
                <ul className="list-[circle] pl-5 mt-2 space-y-1">
                  <li>
                    Each morphism <InlineMath math="f \in \text{hom}(C)" /> corresponds to an ordered pair of objects <InlineMath math="(X, Y)" />, where X is the <strong>domain</strong> and Y is the <strong>codomain</strong>. This is written as <InlineMath math="f: X \rightarrow Y" />.
                  </li>
                  <li>
                    The collection of all morphisms from X to Y is the <strong>hom-class</strong>, denoted by <InlineMath math="\text{Hom}_C(X, Y)" />.
                  </li>
                </ul>
              </li>
              <li>
                <strong>Identity Morphisms</strong>: For each object A, there exists an identity morphism <InlineMath math="Id_A \in \text{Hom}_C(A, A)" />.
              </li>
              <li>
                <strong>Composition</strong>: For each triple of objects X, Y, Z, there is a binary operation <InlineMath math="\circ: \text{Hom}_C(X,Y) \times \text{Hom}_C(Y,Z) \rightarrow \text{Hom}_C(X,Z)" />, which maps a pair of morphisms <InlineMath math="(f,g)" /> to their composition <InlineMath math="g \circ f" />.
              </li>
            </ul>
          </section>

          {/* Axioms */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[var(--nb-text)] mb-4 border-b-2 border-[var(--nb-border)] pb-2">
              Axioms
            </h2>
            <p className="mb-4">Composition must satisfy two axioms:</p>
            
            <div className="bg-[var(--nb-bg-card)] border-l-4 border-[var(--nb-primary)] pl-4 py-2 mb-4">
              <p className="font-bold mb-1">Associativity</p>
              <p className="italic">
                For any morphisms <InlineMath math="f \in \text{Hom}_C(X,Y)" />, <InlineMath math="g \in \text{Hom}_C(Y,Z)" />, and <InlineMath math="h \in \text{Hom}_C(Z,W)" />, the following holds: <InlineMath math="(h \circ g) \circ f = h \circ (g \circ f)" />.
              </p>
            </div>

            <div className="bg-[var(--nb-bg-card)] border-l-4 border-[var(--nb-primary)] pl-4 py-2">
              <p className="font-bold mb-1">Identity</p>
              <p className="italic">
                For each object <InlineMath math="X \in ob(C)" />, there exists a unique identity morphism <InlineMath math="Id_X \in \text{Hom}_C(X,X)" />. For any morphism <InlineMath math="f \in \text{Hom}_C(X,Y)" />, we have <InlineMath math="Id_Y \circ f = f = f \circ Id_X" />.
              </p>
            </div>
          </section>

          {/* Types of Morphisms */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[var(--nb-text)] mb-4 border-b-2 border-[var(--nb-border)] pb-2">
              Types of Morphisms
            </h2>
            <p className="mb-4">For a morphism <InlineMath math="f \in \text{Hom}_C(X,Y)" />:</p>
            
            <div className="grid gap-4">
              <div className="bg-[var(--nb-bg-card)] border-2 border-[var(--nb-border)] p-4">
                <strong className="block mb-1 text-[var(--nb-primary)]">Monomorphism</strong>
                <p>
                  <InlineMath math="f" /> is monic if for every object <InlineMath math="A" /> and any two morphisms <InlineMath math="g_1, g_2 \in \text{Hom}_C(A,X)" />, the equality <InlineMath math="f \circ g_1 = f \circ g_2" /> implies <InlineMath math="g_1 = g_2" />.
                </p>
              </div>
              
              <div className="bg-[var(--nb-bg-card)] border-2 border-[var(--nb-border)] p-4">
                <strong className="block mb-1 text-[var(--nb-primary)]">Epimorphism</strong>
                <p>
                  <InlineMath math="f" /> is epic if for every object <InlineMath math="A" /> and any two morphisms <InlineMath math="g_1, g_2 \in \text{Hom}_C(Y,A)" />, the equality <InlineMath math="g_1 \circ f = g_2 \circ f" /> implies <InlineMath math="g_1 = g_2" />.
                </p>
              </div>

              <div className="bg-[var(--nb-bg-card)] border-2 border-[var(--nb-border)] p-4">
                <strong className="block mb-1 text-[var(--nb-primary)]">Isomorphism</strong>
                <p>
                  <InlineMath math="f" /> is an isomorphism if there exists a morphism <InlineMath math="g \in \text{Hom}_C(Y,X)" /> such that <InlineMath math="f \circ g = Id_Y" /> and <InlineMath math="g \circ f = Id_X" />.
                </p>
              </div>

              <div className="bg-[var(--nb-bg-card)] border-2 border-[var(--nb-border)] p-4">
                <strong className="block mb-1 text-[var(--nb-primary)]">Endomorphism</strong>
                <p>
                  <InlineMath math="f" /> is an endomorphism if its domain and codomain are the same object (<InlineMath math="X=Y" />).
                </p>
              </div>

              <div className="bg-[var(--nb-bg-card)] border-2 border-[var(--nb-border)] p-4">
                <strong className="block mb-1 text-[var(--nb-primary)]">Automorphism</strong>
                <p>
                  <InlineMath math="f" /> is an automorphism if it is both an endomorphism and an isomorphism.
                </p>
              </div>
            </div>
          </section>

          {/* Functors */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[var(--nb-text)] mb-4 border-b-2 border-[var(--nb-border)] pb-2">
              Functors
            </h2>
            <p className="mb-6">
              A functor is a structure-preserving map between two categories, C and D.
            </p>

            <h3 className="text-xl font-bold mb-4">Covariant Functor</h3>
            <div className="bg-[var(--nb-bg-card)] border-3 border-[var(--nb-border)] p-5 shadow-[4px_4px_0_0_var(--nb-border)] mb-8">
              <p className="mb-2">A covariant functor <InlineMath math="\mathcal{F}:C \rightarrow D" /> consists of:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>An assignment of each object <InlineMath math="X \in ob(C)" /> to an object <InlineMath math="\mathcal{F}(X) \in ob(D)" />.</li>
                <li>
                  An assignment of each morphism <InlineMath math="f \in \text{Hom}_C(X,Y)" /> to a morphism <InlineMath math="\mathcal{F}(f) \in \text{Hom}_D(\mathcal{F}(X), \mathcal{F}(Y))" /> such that:
                  <ul className="list-[circle] pl-5 mt-1 space-y-1">
                    <li><InlineMath math="\mathcal{F}(Id_X) = Id_{\mathcal{F}(X)}" /> (preserves identity).</li>
                    <li><InlineMath math="\mathcal{F}(g \circ f) = \mathcal{F}(g) \circ \mathcal{F}(f)" /> (preserves composition).</li>
                  </ul>
                </li>
              </ul>
            </div>

            <h3 className="text-xl font-bold mb-4">Contravariant Functor</h3>
            <div className="bg-[var(--nb-bg-card)] border-3 border-[var(--nb-border)] p-5 shadow-[4px_4px_0_0_var(--nb-border)] mb-6">
              <p className="mb-2">A contravariant functor <InlineMath math="\mathcal{F}:C \rightarrow D" /> consists of:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>An assignment of each object <InlineMath math="X \in ob(C)" /> to an object <InlineMath math="\mathcal{F}(X) \in ob(D)" />.</li>
                <li>
                  An assignment of each morphism <InlineMath math="f \in \text{Hom}_C(X,Y)" /> to a morphism <InlineMath math="\mathcal{F}(f) \in \text{Hom}_D(\mathcal{F}(Y), \mathcal{F}(X))" /> such that:
                  <ul className="list-[circle] pl-5 mt-1 space-y-1">
                    <li><InlineMath math="\mathcal{F}(Id_X) = Id_{\mathcal{F}(X)}" /> (preserves identity).</li>
                    <li><InlineMath math="\mathcal{F}(g \circ f) = \mathcal{F}(f) \circ \mathcal{F}(g)" /> (reverses composition).</li>
                  </ul>
                </li>
              </ul>
            </div>
          </section>

          {/* Properties of Functors */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[var(--nb-text)] mb-4 border-b-2 border-[var(--nb-border)] pb-2">
              Properties of Functors
            </h2>
            <p className="mb-4">For a functor <InlineMath math="\mathcal{F}:C \rightarrow D" />:</p>
            
            <div className="space-y-4">
              <div className="bg-[var(--nb-bg-card)] border-l-4 border-[var(--nb-primary)] pl-4 py-2">
                <p className="font-bold mb-1">Essentially Surjective</p>
                <p>
                  For every object <InlineMath math="Y \in ob(D)" />, there exists an object <InlineMath math="X \in ob(C)" /> such that <InlineMath math="\mathcal{F}(X) \cong Y" />.
                </p>
              </div>

              <div className="bg-[var(--nb-bg-card)] border-l-4 border-[var(--nb-primary)] pl-4 py-2">
                <p className="font-bold mb-1">Fully Faithful</p>
                <p>
                  For every pair of objects <InlineMath math="X, Y \in ob(C)" />, the induced map from <InlineMath math="\text{Hom}_C(X,Y)" /> to <InlineMath math="\text{Hom}_D(\mathcal{F}(X), \mathcal{F}(Y))" /> is a bijection.
                </p>
              </div>

              <div className="bg-[var(--nb-bg-card)] border-l-4 border-[var(--nb-primary)] pl-4 py-2">
                <p className="font-bold mb-1">Equivalence</p>
                <p className="mb-2"><InlineMath math="\mathcal{F}" /> is said to be an equivalence if either of the following (equivalent) conditions holds:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    There exists a functor <InlineMath math="\mathcal{F}': D \rightarrow C" /> such that both compositions of <InlineMath math="\mathcal{F}" /> and <InlineMath math="\mathcal{F}'" /> are naturally isomorphic to the identity functors (on the corresponding categories); namely <InlineMath math="\mathcal{F} \circ \mathcal{F}' \cong Id_D" /> and <InlineMath math="\mathcal{F}' \circ \mathcal{F} \cong Id_C" />. In which case, <InlineMath math="\mathcal{F}'" /> is said to be a quasi-inverse of F.
                  </li>
                  <li>
                    <InlineMath math="\mathcal{F}" /> is fully faithful and essentially surjective.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Natural Transformations */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[var(--nb-text)] mb-4 border-b-2 border-[var(--nb-border)] pb-2">
              Natural Transformations
            </h2>
            <p className="mb-4">
              A natural transformation is a map between two functors. Given two covariant functors <InlineMath math="\mathcal{F}, \mathcal{G} : C \rightarrow D" />, a natural transformation <InlineMath math="\eta" /> from <InlineMath math="\mathcal{F}" /> to <InlineMath math="\mathcal{G}" /> is a family of morphisms <InlineMath math="\{\eta_X\}_{X \in ob(C)}" /> where each <InlineMath math="\eta_X \in \text{Hom}_D(\mathcal{F}(X), \mathcal{G}(X))" />. This family must satisfy the condition that for every morphism <InlineMath math="f: X \rightarrow Y" /> in C, the following diagram commutes:
            </p>
            
            <div className="bg-[var(--nb-bg)] border-2 border-[var(--nb-border)] p-4 my-6 overflow-x-auto flex justify-center">
              <BlockMath math={`\\begin{array}{ccc}
                \\mathcal{F}(X) & \\xrightarrow{\\mathcal{F}(f)} & \\mathcal{F}(Y) \\\\
                \\downarrow{\\eta_X} & & \\downarrow{\\eta_Y} \\\\
                \\mathcal{G}(X) & \\xrightarrow{\\mathcal{G}(f)} & \\mathcal{G}(Y)
              \\end{array}`} />
            </div>

            <p>
              If every <InlineMath math="\eta_X" /> is an isomorphism in D, then <InlineMath math="\eta" /> is a <strong>natural isomorphism</strong>.
            </p>
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

