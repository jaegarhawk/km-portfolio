import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FaExternalLinkAlt, FaLock, FaEyeSlash, FaGithub } from "react-icons/fa";
import { getAllProjects } from "@/lib/mdx"; 
import { Project } from "@/components/Projects";

export const metadata = {
  title: "Commercial Works",
};

export default async function CommercialPage() {
  const rawProjects = getAllProjects() || [];
  
  // Cast the array cleanly using your master schema type
  const allProjects = rawProjects as Project[];
  
  // This executes flawlessly without duplicate type definitions!
  const commercialProjects = allProjects.filter(project => project.isCommercial === true);

  // Helper function to render high-contrast clearance state stamps
  const renderAccessBadge = (state: "public" | "protected" | "nda" | undefined) => {
    const tier = state || "public"; // Fallback to public if undefined
    switch (tier) {
      case "public":
        return <span className="border-2 border-black bg-white text-black font-black px-2 py-0.5 rounded-xs tracking-wider">// OPEN_ACCESS</span>;
      case "protected":
        return <span className="border-2 border-black bg-black text-white font-black px-2 py-0.5 rounded-xs tracking-wider flex items-center gap-1"><FaLock className="w-2.5 h-2.5" /> SECURE_CORE</span>;
      case "nda":
        return <span className="border-2 border-dashed border-black bg-slate-50 text-slate-600 font-black px-2 py-0.5 rounded-xs tracking-wider flex items-center gap-1"><FaEyeSlash className="w-3 h-3" /> CLASSIFIED_NDA</span>;
    }
  };

  return (
    <main className="min-h-screen bg-black text-white font-sans antialiased py-16 px-4 selection:bg-white selection:text-black">
      <div className="container mx-auto max-w-4xl">
        
        {/* Industrial Section Header Banner */}
        <header className="border-3 border-white bg-black p-5 mb-16 shadow-[6px_6px_0px_0px_#ffffff]">
          <span className="font-mono text-xs font-black text-slate-400 tracking-widest block mb-1">
            [ SECTION ]
          </span>
          <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">
            COMMERCIAL WORKS // CONTRACTS
          </h1>
        </header>

        {/* Dense Client Grid Feed */}
        <div className="space-y-8">
          {commercialProjects.map((project) => (
            <div 
              key={project.slug}
              className="manga-panel bg-white text-black overflow-hidden flex flex-col md:flex-row justify-between"
            >
              {/* LEFT COLUMN: HERO THUMBNAIL */}
              <div className="w-full md:w-56 shrink-0 aspect-video md:aspect-auto relative border-b-3 md:border-b-0 md:border-r-3 border-black bg-slate-50">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover select-none" 
                />
                {/* Flat ink category stamp floating over the top-left of the inner graphic panel */}
                <div className="absolute top-2 left-2 z-10 font-mono text-[9px] font-black uppercase tracking-wider bg-black text-white px-2 py-0.5 border border-white shadow-[1px_1px_0px_0px_#000000]">
                  {project.type === "game" && "🎮 GAME"}
                  {project.type === "web" && "🌐 WEB"}
                  {project.type === "interactive" && "🕹️ INTERACTIVE"}
                  {/* Fallback to capture anything else safely during file drafting */}
                  {!["game", "web", "interactive"].includes(project.type) && `📂 ${project.type}`}
                </div>
              </div>

              {/* CENTER COLUMN: Core Project Information Node */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-black border-dashed pb-3">
                    <div>
                      <Link href={`/works/${project.slug}`} className="group block">
                        <h3 className="text-xl font-black uppercase tracking-tight group-hover:underline text-black">
                          {project.title.split(' // ')[0]} 
                        </h3>
                      </Link>
                      <p className="font-mono text-[11px] font-bold text-slate-500 mt-1 uppercase">
                        {project.title} // DATE: {project.startDate}
                      </p>
                    </div>
                    
                    {/* Status Access Stamp */}
                    <div className="font-mono text-[10px] select-none shrink-0 self-start sm:self-center">
                      {renderAccessBadge(project.access)}
                    </div>
                  </div>

                  {/* Core Impact Text Statement */}
                  <p className="text-sm font-sans font-normal text-slate-800 leading-relaxed max-w-2xl mt-4">
                    <strong className="font-black text-black block mb-1 uppercase tracking-tight font-mono text-xs">// KEY_ACHIEVEMENT_METRIC:</strong>
                    "{project.impact || project.description}"
                  </p>
                </div>

                {/* Technical System Tag Flags inside flat brackets */}
                <div className="flex flex-wrap gap-2 pt-3 border-t border-black/10 border-dashed font-mono text-[10px] font-bold text-slate-500">
                  {project.tags.map((tag: string) => (
                    <span key={tag} className="text-black">
                      [{tag.toLowerCase()}]
                    </span>
                  ))}
                </div>
              </div>

              {/* RIGHT COLUMN: Direct Launch Strip Links */}
              {((project.link && project.link !== "#") || project.github) && (
                <div className="border-t-3 md:border-t-0 md:border-l-3 border-black bg-slate-50 min-w-full md:min-w-30 flex md:flex-col items-center justify-center p-4 gap-4 font-mono text-[10px] font-black uppercase text-center shrink-0">
                  {project.link && project.link !== "#" && (
                    <a href={project.link} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-black hover:underline tracking-tight">
                      <span>LAUNCH</span> <FaExternalLinkAlt className="w-2.5 h-2.5" />
                    </a>
                  )}
                  {project.github && project.github !== "#" && (
                    <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-black hover:underline tracking-tight">
                      <span>CODE</span> <FaGithub className="w-3 h-3" />
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

          {/* Zero Results Safe Handling Fallback */}
          {commercialProjects.length === 0 && (
            <div className="text-center py-16 font-mono font-black border-3 border-dashed border-white bg-black text-slate-500 p-4">
              [!] REGISTRY_EMPTY: ZERO COMMERCIAL NODES DETECTED IN ACTIVE POOL
            </div>
          )}
        </div>

        {/* Decorative Divider Base Accent */}
        <div className="text-center text-slate-700 font-mono text-xs pt-12 select-none">
          +======================================================+
        </div>

      
    </main>
  );
}