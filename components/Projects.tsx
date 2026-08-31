'use client';
import React, { useState, useMemo } from "react";
import Link from "next/link";
import { FaGithub, FaItchIo } from "react-icons/fa6"
import { FaExternalLinkAlt } from "react-icons/fa";


export interface Project {
  slug: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  github?: string;
  itch?: string;
  type: "game" | "web" | "interactive"; // add more here as needed
  startDate: string; // Format: "YYYY-MM"
  endDate?: string; // Format: "YYYY-MM" optional if ongoing
  ongoing: boolean;
  content: string; // markdown body text
  isCommercial: boolean; 
  access: "public" | "protected" | "nda"; 
  impact: string;
}


interface ProjectsProps {
    initialProjects: Project[];
    limit?: number; // optional limit (i.e. show only top 3 items on hero page)
    showFilter?: Boolean; // toggle to hide/show the category filter dropdown 
}

const Projects: React.FC<ProjectsProps> = ({ initialProjects, limit, showFilter = true }) => {
  
  const basePath = process.env.__NEXT_ROUTER_BASEPATH || '';

  // check state for active dropdown value
  const [filterType, setFilterType] = useState<string>("all");

  // process data
  const processedProjects = useMemo(() => {
    // sorting chronologically (newest -> oldest)
    const safeProjects = Array.isArray(initialProjects) ? initialProjects : [];
    let result = safeProjects.filter((project) => project.isCommercial !== true);

    // filter by type if dropdown active
    if (showFilter && filterType !== "all") {
        result = result.filter((p) => p.type === filterType);
    }

    // apply item limit if passed as a prop
    if (limit) {
        result = result.slice(0, limit);
    }

    return result;
  }, [initialProjects, filterType, limit, showFilter]);
  
  // helper function for converting "YYYY-MM" into cleaner display labels
  const formatProjectDate = (project: Project) => {
    if (project.ongoing) return "Ongoing";
    if (!project.endDate) return project.startDate;
    return `${project.startDate} - ${project.endDate}`;
  };

  return (
    <section id="projects" className="py-4 relative text-black select-text">
      <div className="container mx-auto max-w-5xl">
        
        {/* Category Selector Dropdown Container */}
        {showFilter && (
          <div className="flex justify-end max-w-4xl mx-auto mb-10 px-4">
            <div className="relative font-mono text-xs font-black">
              <span className="absolute left-3 top-2.5 z-10 text-black">CLASS:</span>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-48 bg-white border-3 border-black text-black pl-16 pr-8 py-2 rounded-xs appearance-none focus:outline-none cursor-pointer shadow-[3px_3px_0px_0px_#000000] font-black uppercase"
              >
                <option value="all">ALL</option>
                <option value="game">GAMES</option>
                <option value="web">WEB</option>
                <option value="interactive">INTERACTIVE</option>
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-black">
                ▼
              </div>
            </div>
          </div>
        )}

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto px-4">
          {processedProjects.map((project) => (
            <div 
              key={project.slug} 
              className="manga-panel bg-white overflow-hidden flex flex-col justify-between"
            >
              {/* Card Thumbnail Core Image Shell */}
              <div className="relative overflow-hidden aspect-video border-b-3 border-black bg-slate-100">
                <img 
                  src={`${basePath}${project.image}`} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
                />
                
                {/* 🚀 Publication Schedule Date Badge Top-Right */}
                <div className="absolute top-3 right-3 z-20">
                  <span className="text-[10px] uppercase font-black font-mono tracking-wider px-2.5 py-1 rounded-xs bg-black text-white border-2 border-white shadow-[2px_2px_0px_0px_#000000]">
                    {project.ongoing ? "ONGOING" : `${project.startDate}`}
                  </span>
                </div>

                {/* Category Badge Top-Left */}
                <div className="absolute top-3 left-3 z-20">
                  <span className="text-[10px] font-black font-mono tracking-wider px-2 py-0.5 rounded-xs bg-white text-black border-2 border-black">
                    {project.type === "game" ? "🎮 GAME" : "🌐 WEB"}
                  </span>
                </div>
              </div>

              {/* Card Meta Context Info Area */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <Link href={`/works/${project.slug}`} className="block group">
                    <h3 className="text-lg font-black text-black group-hover:underline uppercase tracking-tight leading-tight">
                      {project.title}
                    </h3>
                  </Link>
                  <p className="text-xs font-normal text-slate-700 leading-normal font-sans">
                    {project.description}
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  {/* Technology Badges */}
                  <div className="flex flex-wrap gap-1.5 font-mono text-[10px] font-bold text-slate-500">
                    {project.tags.map((tag, tagIdx) => (
                      <span key={tagIdx} className="text-black">
                        [{tag.toLowerCase()}]
                      </span>
                    ))}
                  </div>

                  {(project.link !== "#" || project.github || project.itch) && (
                    <div className="flex flex-wrap gap-2 font-mono text-[10px] font-black uppercase pt-2 border-t border-black/10 border-dashed">
                      {project.link && project.link !== "#" && (
                        <a href={project.link} target="_blank" rel="noreferrer" className="flex items-center gap-1 bg-black text-white px-2.5 py-1 border-2 border-black hover:bg-white hover:text-black transition-colors rounded-xs">
                          Live Build <FaExternalLinkAlt className="w-2.5 h-2.5" />
                        </a>
                      )}
                      {project.github && project.github !== "#" && (
                        <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 bg-white text-black px-2.5 py-1 border-2 border-black hover:bg-black hover:text-white transition-colors rounded-xs">
                          Source <FaGithub className="w-3 h-3" />
                        </a>
                      )}
                      {project.itch && project.itch !== "#" && (
                        <a href={project.itch} target="_blank" rel="noreferrer" className="flex items-center gap-1 bg-white text-black px-2.5 py-1 border-2 border-black hover:bg-black hover:text-white transition-colors rounded-xs">
                          Itch.io <FaItchIo className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>


      </div>
    </section>
  );
};

export default Projects