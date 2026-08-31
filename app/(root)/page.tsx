import SliderImage from "@/components/SliderImage";
import SliderText from "@/components/SliderText";
import ExploreBtn from "@/components/ExploreBtn";
import DemoReel from "@/components/DemoReel";
import Articles from "@/components/Articles";
import { getAllProjects } from '@/lib/mdx';
import Projects from "@/components/Projects";
import { Testimonials } from "@/components/Testimonials";
import { FaExternalLinkAlt } from "react-icons/fa";
import { AnimatedBorderButton } from "@/components/AnimatedBorderButton";
import Link from "next/link";

const Home = () => {
  
  const companyLogos = [
  { img: "/assets/img/dutytocountry-517x291.jpg", alt: "Company 1" },
  { img: "/assets/img/gg_logo.png", alt: "Company 2" },
  { img: "/assets/img/sk8r-1250x708.png", alt: "Company 3" },
  { img: "/assets/img/momentum-1280x720.jpg", alt: "Company 4" },
  ];

  const clientList = [
  { text: "Penn Medicine Lancaster General Health", alt: "Company 1" },
  { text: "Filipino Veterans Recognition and Education Project", alt: "Company 2" },
  { text: "Naper Settlement", alt: "Company 3" },
  { text: "Smithsonian Institution Traveling Exhibition Service", alt: "Company 4" },
  { text: "City of Camden, New Jersey", alt: "Company 5" },
  { text: "American Petroleum Institute", alt: "Company 6" },
  ];

  const projects = getAllProjects();
  
  return (
    <main>
      {/* Demo Reel */}
      <section className="relative w-full overflow-auto">
        <DemoReel />
        {/* Explore More */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 ">
          <a href="#intro">
            <ExploreBtn />
          </a>
        </div>
      </section>

      {/* Intro | Short Bio */}
      <section id="intro" className="scroll-mt-20">
        <h2 className="mb-3 pt-10 text-center text-2xl font-bold tracking-wide whitespace-nowrap sm:text-3xl md:text-4xl lg:text-5xl">
        「 Software Developer 」
        </h2>

        <p className="text-center text-sm tracking-widest text-gray-400 sm:text-base md:text-lg">
          Full-Stack Web Development • Game Programming • Application Engineering
        </p>

        <p className="mt-3 text-center text-base text-gray-300 sm:text-lg md:text-xl">
          I'm a versatile software developer driven by complex challenges. I bridge the gap between structure and imagination, building dynamic systems with style, energy, and grit.
        </p>
      </section>

      {/* Selected Work */}
      <section
        id="selected-work"
        className="mx-auto flex max-w-7xl flex-col px-8"
      >
        <h2 className="mb-12 pt-10 text-center text-xl font-bold tracking-wide whitespace-nowrap sm:text-xl md:text-3xl lg:text-5xl">
          「 WORKS 」
        </h2>
        <Projects initialProjects={projects} limit={3} showFilter={false} />
        
         {/* "View All Projects MORE" Panel */}
        <div className="text-center mt-12 select-none">
          <Link href="/works" className="inline-block group">
            <button className="border-3 border-white bg-black text-white px-8 py-2.5 font-mono font-black text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-100 cursor-pointer shadow-[4px_4px_0px_0px_#ffffff] group-hover:shadow-[6px_6px_0px_0px_#ffffff] group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 active:shadow-none">
              // View All Projects → //  
            </button>
          </Link>
        </div>

      </section>

      {/* Clients */}
      <section className="mx-auto flex max-w-7xl flex-col px-8 py-10">
        <h2 className="mb-12 pt-10 text-right text-xl font-bold tracking-wide whitespace-nowrap sm:text-xl md:text-3xl lg:text-5xl">
          「 CLIENTS 」
        </h2>
        <SliderText slides={clientList} />
        {/*<SliderImage slides={companyLogos} />*/}
      </section>

      {/* Testimonials */}
      <section className="mx-auto flex max-w-7xl flex-col px-8 py-10">
        <h2 className="mb-12 pt-10 text-left text-xl font-bold tracking-wide whitespace-nowrap sm:text-xl md:text-3xl lg:text-5xl">
          ⌊ TESTIMONIALS ⌉
        </h2>
        
        <Testimonials />
      </section>

      {/* Writings / Articles */}
      <section className="mx-auto flex min-h-screen max-w-7xl flex-col px-8 py-10">
        <h2 className="mb-12 pt-10 text-right text-xl font-bold tracking-wide whitespace-nowrap sm:text-xl md:text-3xl lg:text-5xl">
          「 WRITINGS 」
        </h2>

        <Articles currentPage={1} limit={3} hidePagination={true} />

        {/* "SEE MORE" Panel */}
        <div className="text-center mt-12 select-none">
          <Link href="/blog" className="inline-block group">
            <button className="border-3 border-white bg-black text-white px-8 py-2.5 font-mono font-black text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-100 cursor-pointer shadow-[4px_4px_0px_0px_#ffffff] group-hover:shadow-[6px_6px_0px_0px_#ffffff] group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 active:shadow-none">
              // READ MORE ARTICLES → //  
            </button>
          </Link>
        </div>
      </section>
      
    </main>
  );
}

export default Home