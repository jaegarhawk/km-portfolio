// works/[slug]/page.tsx

import { notFound } from "next/navigation";
import { getAllProjects } from "@/lib/mdx"
import Link from "next/link";
import { FaExternalLinkAlt, FaGithub, FaItchIo } from "react-icons/fa";

interface PageProps {
    params: Promise<{ slug: string }>;
}

// prebuild paths for page loading
export async function generateStaticParams() {
    const projects = getAllProjects();
    return projects.map((project) => ({
        slug: project.slug,
    }));
}

export default async function ProjectSubPage({ params }: PageProps) {
    const { slug } = await params;
    const projects = getAllProjects();
    const project = projects.find((p) => p.slug === slug);
    const backPath = project?.isCommercial ? '/commercial-work' : '/works';

    if (!project) notFound();

    return (
        // 💡 Base page canvas locks down to crisp solid black with highly readable white navigation items
        <main className="min-h-screen bg-black text-white font-sans antialiased py-16 px-4 selection:bg-white selection:text-black">
            <div className="container mx-auto max-w-3xl">
                
                {/* Vintage Game-Style Navigation Return Link */}
                <Link 
                    href={backPath} 
                    className="font-mono text-xs font-black uppercase tracking-wider text-slate-400 hover:text-white transition-colors mb-10 inline-block"
                >
                    ← RETURN
                </Link>

                {/* 🚀 Main Project Page Container Panel (Forced White Canvas Base Layer) */}
                <div className="manga-panel bg-white overflow-hidden mb-16 text-black select-text">
                    
                    {/* Solid Pitch Black Header Label Bar */}
                    <div className="bg-black text-white px-5 py-2 flex justify-between items-center font-mono text-[10px] font-black uppercase tracking-widest">
                        <span>PROJECT_MANUSCRIPT // BUILT_SYSTEM</span>
                        <span className="text-slate-400">ID: {project.slug.slice(0, 6)}</span>
                    </div>

                    {/* Content Section Padding Container */}
                    <div className="p-6 md:p-10 space-y-8">
                        
                        {/* 🚀 Project Cover Image Frame with Thick Solid Ink Linework */}
                        <div className="relative aspect-video w-full overflow-hidden border-3 border-black shadow-[4px_4px_0px_0px_#000000]">
                            <img 
                                src={project.image} 
                                alt={project.title} 
                                className="w-full h-full object-cover" 
                            />
                        </div>

                        {/* Title Header and Action Control Links Row */}
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b-3 border-black border-dashed">
                            <div className="space-y-3 max-w-xl">
                                <h1 className="text-2xl md:text-3xl font-black tracking-tight uppercase leading-tight text-black">
                                    {project.title}
                                </h1>
                                <p className="text-sm font-normal font-sans text-slate-700 leading-relaxed">
                                    {project.description}
                                </p>

                                {/* System Properties Enclosed inside Retro Brackets */}
                                <div className="flex flex-wrap gap-1.5 font-mono text-[10px] font-bold text-slate-500 pt-1">
                                    {project.tags?.map((tag: string, idx: number) => (
                                        <span key={idx} className="text-black uppercase">
                                            [{tag.toLowerCase()}]
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* 🚀 Interactive External Button Dashboard Panel (Tactile Block Shadows) */}
                            {(project.link !== "#" || project.github || project.itch) && (
                                <div className="flex flex-wrap gap-3 md:flex-col min-w-35 font-mono text-xs font-black uppercase">
                                    {project.link && project.link !== "#" && (
                                        <a 
                                            href={project.link} 
                                            target="_blank" 
                                            rel="noreferrer" 
                                            className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-black bg-black text-white hover:bg-white hover:text-black transition-colors rounded-xs shadow-[2px_2px_0px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                                        >
                                            Live Site <FaExternalLinkAlt className="w-3 h-3" />
                                        </a>
                                    )}
                                    {project.github && project.github !== "#" && (
                                        <a 
                                            href={project.github} 
                                            target="_blank" 
                                            rel="noreferrer" 
                                            className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-black bg-white text-black hover:bg-black hover:text-white transition-colors rounded-xs shadow-[2px_2px_0px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                                        >
                                            GitHub <FaGithub className="w-4 h-4" />
                                        </a>
                                    )}
                                    {project.itch && project.itch !== "#" && (
                                        <a 
                                            href={project.itch} 
                                            target="_blank" 
                                            rel="noreferrer" 
                                            className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-black bg-white text-black hover:bg-black hover:text-white transition-colors rounded-xs shadow-[2px_2px_0px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                                        >
                                            Itch.io <FaItchIo className="w-4 h-4" />
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* 🚀 Core Markdown Content Render Block */}
                        {/* Custom Space Grotesk CSS rules apply via the .prose tag */}
                        <article className="prose max-w-none text-black select-text">
                            <div className="whitespace-pre-line">
                                {project.content}
                            </div>
                        </article>

                        {/* Anthology Chapter Structural Finish Line Badge */}
                        <div className="flex items-center justify-center gap-4 font-mono text-xs font-black text-slate-400 pt-8 border-t-2 border-black/10 border-dashed select-none">
                            <span>◈ ◈ ◈</span>
                            <span className="text-black">[ END_OF_MANUSCRIPT ]</span>
                            <span>◈ ◈ ◈</span>
                        </div>

                    </div>
                </div>

            </div>
        </main>
    );
}