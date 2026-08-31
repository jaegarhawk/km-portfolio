import Projects from "@/components/Projects";
import { getAllProjects } from "@/lib/mdx"

export const metadata = {
  title: "Works",
};


const Works = () => {
  
  const allProjects = getAllProjects() || [];

  return (
    <main>
      {/* Industrial Section Header Banner */}
        <div className="container mx-auto max-w-4xl">
          <header className="border-3 border-white bg-black p-5 mb-16 shadow-[6px_6px_0px_0px_#ffffff]">
            <span className="font-mono text-xs font-black text-slate-400 tracking-widest block mb-1">
              [ SECTION ]
            </span>
            <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">
              PROJECTS
            </h1>
        </header>
        <Projects initialProjects={allProjects} showFilter={true} />
      </div>  
    </main>
  );
}

export default Works