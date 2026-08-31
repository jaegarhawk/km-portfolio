import React from 'react';
import Link from 'next/link';
import { getAllPosts } from '@/lib/mdx';

export interface PostFrontMatter {
  title: string;
  excerpt?: string;
  date?: string; 
  tags?: string[];
  image?: string;
}

export interface Post {
  slug: string;
  frontMatter: PostFrontMatter;
  content: string; // The rich raw content string
  isExternal?: boolean;
  externalUrl?: string;
}

interface ArticlesProps {
  currentPage: number;
  postsPerPage?: number;
  categoryFilter?: string | null;
  searchFilter?: string;
  limit?: number;          
  hidePagination?: boolean; 
}

const Articles: React.FC<ArticlesProps> = async ({ 
  currentPage = 1, 
  postsPerPage = 3, 
  categoryFilter = null,
  searchFilter = "",
  limit,
  hidePagination = false 
}) => {
    const rawPosts = await getAllPosts();
    let posts: Post[] = Array.isArray(rawPosts) ? (rawPosts as Post[]) : [];

    // Filter out by Selected Dropdown Category Side Panel if active
    if (categoryFilter) {
        posts = posts.filter(p => p.frontMatter?.tags?.includes(categoryFilter));
    }

    // Filter out by active Keyword Search Query parameters if active
    if (searchFilter) {
        const query = searchFilter.toLowerCase();
        posts = posts.filter(p => 
            p.frontMatter?.title?.toLowerCase().includes(query) || 
            p.content?.toLowerCase().includes(query)
        );
    }

    // Chronological sorting (Newest to oldest)
    const sortedPosts = [...posts].sort((a, b) => {
        if (!a.frontMatter?.date || !b.frontMatter?.date) return 0;
        return new Date(b.frontMatter.date).getTime() - new Date(a.frontMatter.date).getTime();
    });

    // Apply explicit layout slicing if a limit prop is active (e.g. for Home Showcase)
    let currentDisplayedPosts: Post[] = [];
    let totalPages = 0;
    let activePage = 1;

    if (limit) {
        currentDisplayedPosts = sortedPosts.slice(0, limit);
    } else {
        // Fall back to standard pagination slicing on your core blog route directory
        const totalPosts = sortedPosts.length;
        totalPages = Math.ceil(totalPosts / postsPerPage);
        activePage = Math.min(Math.max(currentPage, 1), totalPages || 1);
        
        const indexOfLastPost = activePage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        currentDisplayedPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);
    }

    // Build standard parameterized route URLs preserving search properties
    const buildPageRoute = (targetPage: number) => {
        let path = `/blog?page=${targetPage}`;
        if (categoryFilter) path += `&category=${categoryFilter}`;
        if (searchFilter) path += `&q=${encodeURIComponent(searchFilter)}`;
        return path;
    };

    // Double Pagination Block with navigation index
    const renderPaginationBar = () => {
        if (totalPages <= 1) return null;
        return (
            <div className="flex items-center justify-center font-mono text-[11px] font-bold text-black gap-2 select-none py-2">
                {activePage > 1 ? (
                    <>
                        <Link href={buildPageRoute(1)} className="hover:underline">&lt;&lt; FIRST</Link>
                        <span>|</span>
                        <Link href={buildPageRoute(activePage - 1)} className="hover:underline">&lt; PREV</Link>
                        <span>|</span>
                    </>
                ) : (
                    <span className="text-slate-400">&lt;&lt; FIRST | &lt; PREV |</span>
                )}

                <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                        <Link
                            key={pageNum}
                            href={buildPageRoute(pageNum)}
                            className={`px-2 py-0.5 transition-all font-black ${
                                pageNum === activePage
                                    ? 'bg-black text-white rounded-xs'
                                    : 'hover:bg-black hover:text-white rounded-xs'
                            }`}
                        >
                            [{pageNum}]
                        </Link>
                    ))}
                </div>

                {activePage < totalPages ? (
                    <>
                        <span>|</span>
                        <Link href={buildPageRoute(activePage + 1)} className="hover:underline">NEXT &gt;</Link>
                        <span>|</span>
                        <Link href={buildPageRoute(totalPages)} className="hover:underline">LAST &gt;&gt;</Link>
                    </>
                ) : (
                    <span className="text-slate-400">| NEXT &gt; | LAST &gt;&gt;</span>
                )}
            </div>
        );
    };

    return (
        <div className="space-y-8">
            
            {/* Top Pagination Bar  */}
            {totalPages > 1 && (
                <div className="manga-panel bg-white p-1">
                    {renderPaginationBar()}
                </div>
            )}

            {/* Main Log Post Loop */}
            <div className="space-y-12">
                {currentDisplayedPosts.map((post) => {
                    const formattedDate = post.frontMatter?.date 
                        ? new Date(post.frontMatter.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })
                        : "UNDATED_MANUSCRIPT";

                    return (
                        <article key={post.slug} className="manga-panel bg-white overflow-hidden">
                            
                            {/* Publication Date Header Banner Section */}
                            <div className="bg-black text-white px-5 py-2 flex justify-between items-center font-mono text-[10px] font-black uppercase tracking-widest">
                                <span>CHAPTER_LOG // {formattedDate}</span>
                                <span className="text-slate-400">PAGE_ID: {post.slug.slice(0, 6)}</span>
                            </div>

                            <div className="p-6 space-y-4">
                                {/* Title leading into dynamic subpage node */}
                                {post.isExternal ? (
                                    <a href={post.externalUrl} target="_blank" rel="noreferrer" className="inline-block group">
                                        <h3 className="text-xl font-black text-black group-hover:underline tracking-tight uppercase">
                                            {post.frontMatter?.title} <span className="text-xs font-normal font-mono text-slate-500">[EXTERNAL ↗]</span>
                                        </h3>
                                    </a>
                                ) : (
                                    <Link href={`/posts/${post.slug}`} className="inline-block group">
                                        <h3 className="text-xl font-black text-black group-hover:underline tracking-tight uppercase">
                                            {post.frontMatter?.title || "Untitled Fragment"}
                                        </h3>
                                    </Link>
                                )}

                                {/* 🚀 Inline Contents parsed beautifully by our custom CSS .prose wrapper inside globals.css */}
                                <div className="prose max-w-none text-black font-sans leading-relaxed text-sm whitespace-pre-line border-t-2 border-black border-dashed pt-4 select-text">
                                    {post.content}
                                </div>

                                {/* Bottom Tag Meta list inside flat manga brackets */}
                                {post.frontMatter?.tags && post.frontMatter.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 pt-3 border-t border-black/10 font-mono text-xs font-bold text-slate-500">
                                        <span className="text-black font-black uppercase">INDEX_TAGS:</span>
                                        {post.frontMatter.tags.map((tag: string) => (
                                            <Link key={tag} href={`/blog?category=${tag}`} className="text-black hover:underline">
                                                [{tag.toLowerCase()}]
                                            </Link>
                                        ))}
                                    </div>
                                //Primary links buttons layer panel inside cards block if you ever choose to append them later
                                )}
                            </div>
                        </article>
                    );
                })}
            </div>

            {/* Search/Filter Zero Results Handling State */}
            {currentDisplayedPosts.length === 0 && (
                <div className="text-center py-16 font-mono font-black border-3 border-dashed border-black rounded-sm bg-white text-black p-4 shadow-[6px_6px_0px_0px_#000000]">
                    [!] MANUSCRIPT_EMPTY: ZERO COPIES FOUND FOR SPECIFIED INK QUERY
                </div>
            )}

            {/* Bottom Pagination Bar */}
            {totalPages > 1 && (
                <div className="manga-panel bg-white p-1 mt-8">
                    {renderPaginationBar()}
                </div>
            )}
            
        </div>
    );
};

export default Articles;