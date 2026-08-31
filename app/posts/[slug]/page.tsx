import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { IoHome } from 'react-icons/io5';

const postsDirectory = path.join(process.cwd(), 'posts');

export async function generateStaticParams() {
    const filenames = fs.readdirSync(postsDirectory);
    return filenames.map((filename) => ({
        slug: filename.replace(/\.mdx$/, ''),
    }));
}

// Custom components passed into the MDX compiler to preserve the style theme
const mdxComponents = {
  h1: (props: any) => <h1 className="text-3xl font-black uppercase text-black tracking-tight mb-6 mt-8" {...props} />,
  h2: (props: any) => <h2 className="text-xl font-black uppercase text-black tracking-tight border-b-3 border-black border-dashed pb-1.5 mb-4 mt-10" {...props} />,
  h3: (props: any) => <h3 className="text-lg font-black uppercase text-black tracking-tight mb-3 mt-6" {...props} />,
  p: (props: any) => <p className="text-sm font-normal leading-relaxed text-current mb-4" {...props} />,
  ul: (props: any) => <ul className="list-square pl-5 mb-5 space-y-1 text-current" {...props} />,
  ol: (props: any) => <ol className="list-decimal pl-5 mb-5 space-y-1 text-current" {...props} />,
  li: (props: any) => <li className="text-sm text-current" {...props} />,
  
  blockquote: (props: any) => (
    <div className="relative border-3 border-black bg-black text-white p-4 text-xs font-black leading-normal my-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] rounded-xs">
      <div className="absolute -top-1.5 left-6 w-2.5 h-2.5 bg-black rotate-45"></div>
      <blockquote className="italic font-mono text-center tracking-wide" {...props} />
    </div>
  ),
  
  // 🚀 FORCED BLACK BACKGROUND FOR INLINE CODE `text`
  code: (props: any) => (
    <code className="bg-black text-white! font-mono font-bold text-xs px-1.5 py-0.5 rounded-xs inline-block" {...props} />
  ),
  
  // 🚀 FORCED BLACK BACKGROUND FOR MULTI-LINE CODE BLOCKS
  pre: (props: any) => (
    <pre className="border-3 border-black bg-black p-4 font-mono font-bold text-xs text-white! overflow-x-auto shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] my-6 rounded-xs" {...props} />
  ),
};

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
    const { slug } = await params;
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const formattedDate = data.date 
        ? new Date(data.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
        : "UNDATED_CHAPTER";

    return (
        <main className="min-h-screen bg-black text-white font-sans antialiased py-12 px-4 selection:bg-white selection:text-black">
            <div className="container mx-auto max-w-3xl">
                
                {/* Navigation Controls */}
                <nav className="flex items-center justify-between font-mono text-xs font-black uppercase mb-12">
                    <Link href="/blog" className="text-white hover:underline tracking-wider flex items-center gap-1">
                        ← BACK_TO_LOGS
                    </Link>
                    
                    <Link href="/">
                        <button className="border-2 border-white bg-black text-white px-4 py-1.5 font-black hover:bg-white hover:text-black transition-colors cursor-pointer flex items-center gap-1.5 shadow-[2px_2px_0px_0px_#ffffff] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none">
                            <IoHome className="w-3.5 h-3.5" /> INDEX_HOME
                        </button>
                    </Link>
                </nav>

                {/* Main Article Comic Panel Outline */}
                <article className="manga-panel overflow-hidden mb-16">
                    
                    {/* Header Banner */}
                    <div className="bg-black text-white px-5 py-2.5 flex flex-wrap justify-between items-center font-mono text-[10px] font-black uppercase tracking-widest gap-2">
                        <span>SERIAL_ENTRY // {formattedDate}</span>
                        <span className="opacity-60">CHAPTER_ID: {slug.slice(0, 8)}</span>
                    </div>

                    {/* Content Body Layout */}
                    <div className="p-6 md:p-10 space-y-6">
                        
                        <div className="space-y-3 border-b-4 border-black pb-6">
                            <h1 className="text-3xl md:text-4xl font-black text-black tracking-tight uppercase leading-tight">
                                {data.title || "Untitled Manuscript"}
                            </h1>
                            {data.excerpt && (
                                <p className="text-slate-700 font-mono text-xs leading-normal">
                                    {data.excerpt}
                                </p>
                            )}
                            
                            {data.tags && data.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 pt-2 font-mono text-[11px] font-bold text-slate-500">
                                    {data.tags.map((tag: string) => (
                                        <span key={tag} className="text-black">
                                            [{tag.toLowerCase()}]
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Rich Content Engine */}
                        <div className="prose max-w-none text-black font-sans select-text">
                            <MDXRemote source={content} components={mdxComponents} />
                        </div>

                        {/* Finial Accent End Marker */}
                        <div className="flex items-center justify-center gap-4 font-mono text-xs font-black text-slate-400 pt-8 border-t-2 border-black/10 border-dashed">
                            <span>◈ ◈ ◈</span>
                            <span className="text-black">[ END_OF_CHAPTER ]</span>
                            <span>◈ ◈ ◈</span>
                        </div>

                    </div>
                </article>

            </div>
        </main>
    );
}