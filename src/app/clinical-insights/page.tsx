import Link from "next/link";
import { getPublishedNotionPosts, NotionPost } from "@/lib/notion";
import { format } from "date-fns";
import NextImage from "next/image";

export const metadata = {
  title: "Clinical Insights | Dt. Ashwini Gawad",
  description: "Clinical insights, case studies, and nutritional protocols from 25-yr veteran Dt. Ashwini Gawad.",
};

export default async function InsightsIndexPage() {
  const posts: NotionPost[] = await getPublishedNotionPosts();

  return (
    <div className="relative min-h-screen bg-midnight-950 px-4 py-20 md:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(232,200,101,0.06),transparent_60%)]" />

      <div className="container-wide relative z-10 mx-auto">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-1.5 text-xs font-heading font-medium uppercase tracking-[0.15em] text-gold-300">
            The Journal
          </span>
          <h1 className="mb-6 font-display text-4xl leading-tight text-white sm:text-5xl">
            Clinical Insights &amp;{" "}
            <span className="text-gradient-gold">Case Protocols</span>
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-400">
            Direct observations, nutritional interventions, and case studies
            from 25 years of managing severe clinical conditions across India.
          </p>

          {posts.length === 0 && (
            <div className="mx-auto mt-8 max-w-lg rounded-xl border border-gold-500/20 bg-gold-500/5 p-4 text-sm text-gold-300">
              No published articles yet. Add{" "}
              <code className="rounded bg-white/10 px-1">NOTION_DATABASE_ID</code> to
              environment variables to pull articles from Notion.
            </div>
          )}
        </div>

        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/clinical-insights/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-midnight-900/50 transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/30"
            >
              {post.coverImage ? (
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-midnight-950">
                  <NextImage
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight-900 to-transparent" />
                </div>
              ) : (
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-gradient-to-br from-midnight-800 to-midnight-950">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,200,176,0.1),transparent_70%)]" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <span className="font-display text-8xl text-gold-500">A</span>
                  </div>
                </div>
              )}

              <div className="flex flex-1 flex-col p-6">
                <div className="mb-3 flex items-center gap-3">
                  <span className="text-xs font-heading font-semibold uppercase tracking-wider text-teal-400">
                    {post.category || "Insight"}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-slate-600" />
                  <time className="text-xs text-slate-500">
                    {post.date ? format(new Date(post.date), "MMM d, yyyy") : "Recent"}
                  </time>
                </div>

                <h2 className="mb-3 line-clamp-2 font-display text-xl leading-snug text-white transition-colors group-hover:text-gold-300">
                  {post.title}
                </h2>

                <p className="mb-6 flex-1 line-clamp-3 text-sm leading-relaxed text-slate-400">
                  {post.excerpt}
                </p>

                <div className="mt-auto flex items-center gap-2 text-sm font-heading font-bold text-gold-400 transition-transform group-hover:translate-x-1">
                  Read Case Study
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
