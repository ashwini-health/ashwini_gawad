import Link from "next/link";
import { getPublishedNotionPosts, NotionPost } from "@/lib/notion";
import { format } from "date-fns";
import NextImage from "next/image";

export const metadata = {
  title: "Clinical Insights | Dt. Ashwini Gawad",
  description: "Read clinical insights, case studies, and nutritional protocols from 25-yr veteran Dt. Ashwini Gawad.",
};

export default async function InsightsIndexPage() {
  // Fetch from the new Notion API bridge
  const posts: NotionPost[] = await getPublishedNotionPosts();

  return (
    <div className="relative min-h-screen bg-midnight-950">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(232,200,101,0.06),transparent_60%)]" />
      <div className="pointer-events-none absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />

      {/* Subtle Header / Nav bridge back to Funnel */}
      <header className="relative z-20 flex items-center justify-between px-6 py-6 md:px-12">
        <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gold-500/30 bg-midnight-900 shadow-[0_0_15px_rgba(232,200,101,0.15)]">
            <span className="font-heading text-lg font-bold text-gold-400">AG</span>
          </div>
          <div className="hidden flex-col md:flex">
            <span className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Dietitian
            </span>
            <span className="font-display text-base font-semibold text-white">
              Ashwini Gawad
            </span>
          </div>
        </Link>
        <Link
          href="/"
          className="rounded-full border border-white/10 bg-white/5 px-5 py-2 font-heading text-xs font-bold uppercase tracking-wider text-slate-300 transition-colors hover:bg-white/10"
        >
          Return to Protocol
        </Link>
      </header>

      <main className="container-wide relative z-10 mx-auto px-4 pb-32 pt-16 md:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-20 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.15em] text-gold-300 backdrop-blur-md">
            The Journal
          </span>
          <h1 className="mb-6 font-display text-4xl leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Clinical Insights & <br className="hidden sm:block" />
            <span className="text-gradient-gold">Case Protocols</span>
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">
            Direct observations, nutritional interventions, and case studies
            from 25 years of managing severe clinical conditions across India.
          </p>
          
          {posts.length === 0 && (
             <div className="mt-8 rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-4 text-sm text-yellow-200">
               <p><strong>Setup Required:</strong> The Notion API is connected, but no published articles were found. Please add the `NOTION_DATABASE_ID` to your environment variables to fetch real articles.</p>
             </div>
          )}
        </div>

        {/* Posts Grid */}
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, idx) => (
            <Link
              key={post.id}
              href={`/clinical-insights/${post.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-midnight-900/50 transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/30 hover:shadow-[0_15px_40px_-10px_rgba(232,200,101,0.1)]"
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
                   <div className="absolute inset-0 flex items-center justify-center opacity-20 transition-transform duration-500 group-hover:scale-110">
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
                
                <h2 className="mb-3 font-display text-xl leading-snug text-white transition-colors group-hover:text-gold-300 line-clamp-2">
                  {post.title}
                </h2>
                
                <p className="mb-6 flex-1 text-sm leading-relaxed text-slate-400 line-clamp-3">
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
      </main>
    </div>
  );
}
