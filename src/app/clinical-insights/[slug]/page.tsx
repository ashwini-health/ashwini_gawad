import { getPostBySlug, getPostSlugs } from "@/lib/blog";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.mdx?$/, ""),
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "Not Found" };
  return {
    title: `${post.title} | Dt. Ashwini Gawad`,
    description: post.excerpt,
  };
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="relative min-h-screen bg-midnight-950">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(232,200,101,0.04),transparent_50%)]" />

      {/* Header */}
      <header className="relative z-20 mx-auto flex max-w-4xl items-center justify-between px-6 py-6 md:px-8">
        <Link
          href="/clinical-insights"
          className="group flex items-center gap-2 text-sm font-heading font-semibold text-slate-400 transition-colors hover:text-gold-400"
        >
          <svg className="h-4 w-4 transition-transform group-hover:-translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Insights
        </Link>
      </header>

      <main className="relative z-10 mx-auto max-w-3xl px-6 pb-32 pt-10 md:px-8 lg:pt-16">
        
        {/* Article Header */}
        <header className="mb-16">
          <div className="mb-6 flex items-center gap-3">
             <span className="rounded-full bg-teal-500/10 px-3 py-1 text-xs font-heading font-bold uppercase tracking-wider text-teal-400">
                {post.category}
             </span>
             <span className="h-1 w-1 rounded-full bg-slate-600" />
             <time className="text-sm font-heading text-slate-400">
               {format(new Date(post.date), "MMMM d, yyyy")}
             </time>
          </div>

          <h1 className="mb-8 font-display text-3xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 border-t border-white/10 pt-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gold-500 to-gold-700 text-midnight-950 shadow-[0_0_15px_rgba(232,200,101,0.3)]">
               <span className="font-heading font-bold">AG</span>
            </div>
            <div>
              <p className="font-heading text-sm font-bold text-white">Dt. Ashwini Gawad</p>
              <p className="text-xs text-gold-400">Clinical Dietitian • 25 Yrs Exp.</p>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <article className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:text-gold-200 prose-a:text-teal-400 hover:prose-a:text-teal-300 prose-p:text-slate-300 prose-li:text-slate-300 prose-strong:text-white">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </article>

        {/* The "Reverse Funnel" Call to Action */}
        <div className="mt-20 rounded-2xl border border-gold-500/30 bg-gradient-to-br from-midnight-900 to-midnight-950 p-8 shadow-[0_0_40px_rgba(232,200,101,0.06)] md:p-10">
          <div className="mb-4 flex items-center gap-3">
             <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-500/20 text-xl">
               ⚕️
             </span>
             <h3 className="font-display text-2xl text-white md:text-3xl">Ready for a Clinical Intervention?</h3>
          </div>
          <p className="mb-8 text-base leading-relaxed text-slate-400">
            If your parents' health parameters look similar to a case study and their current plan isn't working, it's time to escalate their care. Apply for the 90-Day Concierge Protocol.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/"
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-gold-300 to-gold-500 px-8 py-4 font-heading text-sm font-bold uppercase tracking-wider text-midnight-950 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(232,200,101,0.4)]"
            >
              Learn About The Protocol
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>

      </main>
    </div>
  );
}
