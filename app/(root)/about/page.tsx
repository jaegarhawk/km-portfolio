
import { Socials } from '@/components/socials';

export const metadata = {
  title: "About",
};

const About = () => {

  return (
    <main>
      <div className="container mx-auto max-w-4xl">
          <header className="border-3 border-white bg-black p-5 mb-16 shadow-[6px_6px_0px_0px_#ffffff]">
            <span className="font-mono text-xs font-black text-slate-400 tracking-widest block mb-1">
              [ SECTION ]
            </span>
            <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">
              ABOUT
            </h1>
        </header>
      </div>

      <br />
        
        {/* Profile Image */}
        <div className="relative max-w-md mx-auto">
          <div>
            <img
              src = "/assets/img/kendal.jpg"
              alt="Kendal Mitchell"
              className="w-full aspect-auto object-cover rounded-2xl"
             />
          </div>
        </div>


        {/* Profile Bio - Text Content*/}
        <div className='relative max-w-lg mx-auto'>
          <br />
          <p className="text-2xl justify-center">
            My name is Kendal. <br /><br />

            I'm a software developer specializing in game and web programming.<br /><br />

            Based in Northern Virginia, I spend most days talking to computers and teammates. 

            My tech journey started with exposure to early Dreamcast, PS2, and browser games. 
            Enamored by those digital creations, I set out to create experiences that resonate with players and users,
            the way those creators did for me. <br /><br />

            Since then, I've been fortunate enough to work across a diverse set of industries and languages. 
            No matter the stack, my ultimate goal remains the same: to continuously grow as an engineer, teammate, and person. <br /><br />
            
            When I'm not at work, you can find me watching movies, reading, or playing Tekken.<br /><br />

            For inquiries, please email me at k1mitchell@outlook.com <br /><br />
          </p>
        </div>
        
        {/* Socials */}
        <div className="relative max-w-lg mx-auto justify-items-center">
          <Socials />
        </div>
            
    </main>
  );
}

export default About