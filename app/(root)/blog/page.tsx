import React from 'react';
import Link from 'next/link';
import { getAllPosts } from "@/lib/mdx";
import Articles from "@/components/Articles";

export const metadata = {
  title: "Blog & Writings",
};

interface PageProps {
  searchParams: Promise<{ page?: string; category?: string; q?: string }>;
}

export default async function BlogPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const currentPage = params.page ? parseInt(params.page, 10) : 1;
  const activeCategory = params.category || null;
  const searchQuery = params.q || "";

  // Fetch all posts down from your MDX reader on the server
  const rawPosts = await getAllPosts() || [];
  
  // Quick data calculations to populate our sidebar metrics dynamically
  const allCategories = Array.from(
    new Set(rawPosts.flatMap((p: any) => p.frontMatter?.tags || []))
  ) as string[];

  const recentArticles = [...rawPosts]
    .sort((a: any, b: any) => new Date(b.frontMatter?.date).getTime() - new Date(a.frontMatter?.date).getTime())
    .slice(0, 5);

  return (
    // 💡 Theme Palette
    <main className="min-h-screen bg-[#fcfcfc] text-[#000000] font-sans antialiased selection:bg-[#000000] selection:text-primary-foreground py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Title Header Banner Area */}
        <header className="border-3 border-black bg-black text-white p-5 mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-center font-mono rounded-sm shadow-[6px_6px_0px_0px_#000000]">
          <div>
            <Link href="/" className="text-[10px] font-black text-slate-400 hover:text-white transition-colors mb-1 inline-block tracking-widest">
              [ ROOT_HOME_NAVIGATION ]
            </Link>
            <h1 className="text-2xl font-black tracking-tighter uppercase leading-none">
              VOL.01 // BLOG
            </h1>
          </div>
          <div className="text-left sm:text-right text-[10px] font-black leading-tight border-t sm:border-t-0 sm:border-l border-slate-700 pt-2 sm:pt-0 sm:pl-4 mt-2 sm:mt-0 tracking-wider">
            <p>WELCOME</p>
            <p>STATUS // ONLINE</p>
          </div>
        </header>

        {/* Dynamic Split Dashboard Frame Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: SIDEBAR          */}
          <aside className="lg:col-span-4 space-y-6 font-mono text-xs font-bold text-black">
            
            {/* Blog Administrator Info */}
            <div className="manga-panel p-4 bg-white">
              <h4 className="text-white bg-black px-2 py-0.5 inline-block text-[10px] font-black tracking-wider uppercase mb-3">
                // AUTHOR_PROFILE
              </h4>
              <div className="space-y-2 leading-tight">
                <Link href="/about" className="group block cursor-pointer">
                <p className="font-black text-sm uppercase tracking-tight">{"Kendal Mitchell"}</p>
                <p className="text-slate-700 font-normal">
                  Building interactive applications, games, tools, and web layouts from the ground up.
                </p>
                </Link>
                {/* Speech Bubble Block Overlay */}
                <div className="relative border-2 border-black dark:border-white bg-black dark:bg-white p-2.5 text-[11px] font-black text-white dark:text-black leading-normal rounded-xs shadow-[2px_2px_0px_0px_#000000] dark:shadow-[2px_2px_0px_0px_#ffffff]">
                  {/* Decorative Speech Arrow Pointer Accent */}
                  <div className="absolute -top-1.25 left-4 w-2 h-2 bg-black dark:bg-white rotate-45"></div>
                  
                  <p className="italic font-mono text-center tracking-wide">
                    「 No one stands on top of the world... 」
                  </p>
                </div>
              </div>
            </div>

            {/* Article Search */}
            <div className="manga-panel p-4 bg-white">
              <h4 className="text-white bg-black px-2 py-0.5 inline-block text-[10px] font-black tracking-wider uppercase mb-3">
                // SEARCH_INDEX
              </h4>
              <form action="/blog" method="GET" className="flex gap-2">
                <input 
                  type="text" 
                  name="q"
                  defaultValue={searchQuery}
                  placeholder="Keyword search..." 
                  className="w-full bg-white border-2 border-black rounded-xs px-3 py-1.5 text-xs text-black font-bold focus:outline-none focus:bg-slate-50 transition-colors"
                />
                <button 
                  type="submit" 
                  className="bg-black text-white px-4 font-black border-2 border-black hover:bg-white hover:text-black transition-colors cursor-pointer"
                >
                  GO
                </button>
              </form>
            </div>

            {/* Calendar Box */}
            <div className="manga-panel p-4 bg-white text-center">
              <h4 className="text-white bg-black px-2 py-0.5 inline-block text-[10px] font-black tracking-wider uppercase text-left mb-3 w-full">
                // SERIALIZATION_CLOCK
              </h4>
              <div className="text-black font-black uppercase text-sm py-2 border-2 border-dashed border-black/40 bg-slate-50 rounded-xs">
                {new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' })}
                <div className="text-[9px] mt-0.5 font-mono text-slate-500 font-normal normal-case">
                  System state: Synced // Page_{currentPage}
                </div>
              </div>
            </div>

            {/* New & latest Articles */}
            <div className="manga-panel p-4 bg-white">
              <h4 className="text-white bg-black px-2 py-0.5 inline-block text-[10px] font-black tracking-wider uppercase mb-3">
                // LATEST_CHAPTERS
              </h4>
              <ul className="space-y-2 list-none pl-0">
                {recentArticles.map((post: any) => (
                  <li key={post.slug} className="truncate border-b border-black/10 pb-1.5 last:border-0 last:pb-0">
                    <Link href={`/posts/${post.slug}`} className="hover:underline flex items-center gap-1.5 group">
                      <span className="text-black group-hover:scale-125 transition-transform shrink-0">▰</span>
                      <span className="truncate uppercase font-black tracking-tight">{post.frontMatter?.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Category */}
            <div className="manga-panel p-4 bg-white">
              <h4 className="text-white bg-black px-2 py-0.5 inline-block text-[10px] font-black tracking-wider uppercase mb-3">
                // CLASSIFICATION
              </h4>
              <div className="flex flex-wrap gap-2">
                <Link 
                  href="/blog" 
                  className={`px-2 py-1 border-2 border-black font-black text-[10px] uppercase rounded-xs transition-colors ${
                    !activeCategory 
                      ? 'bg-black text-white' 
                      : 'bg-white text-black hover:bg-slate-100'
                  }`}
                >
                  ALL_CHAPTERS
                </Link>
                {allCategories.map((cat) => (
                  <Link 
                    key={cat} 
                    href={`/blog?category=${cat}`} 
                    className={`px-2 py-1 border-2 border-black font-black text-[10px] uppercase rounded-xs transition-colors ${
                      activeCategory === cat 
                        ? 'bg-black text-white' 
                        : 'bg-white text-black hover:bg-slate-100'
                    }`}
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>

            {/* Past Logs */}
            <div className="manga-panel p-4 bg-white">
              <h4 className="text-white bg-black px-2 py-0.5 inline-block text-[10px] font-black tracking-wider uppercase mb-2">
                // ARCHIVE
              </h4>
              <p className="text-slate-500 font-normal text-[11px]">
                No entries yet archived.
              </p>
            </div>
          </aside>

          {/* ========================================== */}
          {/* RIGHT COLUMN: REUSABLE ARTICLES FEED  */}
          {/* ========================================== */}
          <div className="lg:col-span-8">
            <Articles 
              currentPage={currentPage} 
              postsPerPage={3} 
              categoryFilter={activeCategory}
              searchFilter={searchQuery}
            />
          </div>

        </div>
      </div>
    </main>
  );
}
