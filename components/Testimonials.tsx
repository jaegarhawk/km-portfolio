"use client";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react";

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
    {
        quote: "Provided detailed feedback on exactly what we asked for and with very fast turn around time after a major update to the game. The feedback was given in a very detailed report with video clips showing issues, and great suggestions on how to improve the game. We highly recommend and would use again! Thank you so much!",
        author: "C3B Games",
        role: "Game Developer",
        avatar:
            "https://blogger.googleusercontent.com/img/a/AVvXsEgYlXHLk6OPM_TYGakFC58vPL1_pY5fRraYX1BVdsgM5MYLXvz6io7cu3e9F0pwzFsvAOJ_rpdfRCf0EEX0Rtp41HnynYlqWEEtM8meMrvvQjJ0vwTYoEAW8FpNNFwCoLTaiidu1gpfpMdGYhct1KyAqmYX6PPLkgAcXi-zengzGBDqPoeUiM6S0DP6Q1Yb=w72-h72-p-k-no-nu"
    },
    {
        quote: "A pleasure to work with! Really responsive and helpful. Thank you! :)",
        author: "sarahpaxton827",
        role: "Android Application Developer",
        avatar:
            "https://ui-avatars.com/api/?name=SP"
    },
    {
        quote: "i like it, and working with you is good",
        author: "user16295738",
        role: "Game Developer",
        avatar:
            "https://ui-avatars.com/api/?name=:)"
    },
    {
        quote: "Quick delivery. Code was commented nicely and achieved what was asked.",
        author: "suspense304",
        role: "Web Developer and Author",
        avatar:
            "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_original/v1/profile/photos/4097365/original/Doug_Business_Portrait.jpg"
    },
]

export const Testimonials = () => {
    const [activeIdx, setActiveIdx] = useState<number>(0);

    const next = () => {
        setActiveIdx((prev) => (prev + 1) % testimonials.length);
    };

    const previous = () => {
        setActiveIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    // Prevent rendering issues if data arrays are empty
    if (!testimonials || testimonials.length === 0) return null;

    return (
        <section id="testimonials" className="py-20 relative bg-black text-white font-sans antialiased select-none">
            <div className="container mx-auto px-6 relative z-10 max-w-4xl">

                {/* Main Monologue Splash Frame */}
                <div className="max-w-3xl mx-auto">
                    <div className="relative">
                        
                        {/* Main Card Panel container reshaped into a bold forced-white manga box */}
                        <div className="manga-panel bg-white p-8 md:p-12 text-black relative flex flex-col justify-between min-h-[280px]">
                            
                            {/* Hard Inverted Pitch Black Quote Icon Badge Block */}
                            <div className="absolute -top-[4px] left-8 w-10 h-10 border-3 border-black bg-black text-white flex items-center justify-center shadow-[2px_2px_0px_0px_#ffffff]">
                                <Quote className="w-4 h-4 fill-white" />
                            </div>

                            {/* Speech Body Text Box */}
                            
                            <blockquote className="text-lg md:text-xl font-black font-sans leading-relaxed mb-8 pt-4 tracking-tight uppercase">
                                " {testimonials[activeIdx].quote} "
                            </blockquote>
                            
                            {/* Author Identification Profile Metadata Row (Solid Ink Separator) */}
                            <div className="flex items-center gap-4 border-t-2 border-black border-dashed pt-4 font-mono text-xs font-bold">
                                <img 
                                    src={testimonials[activeIdx].avatar} 
                                    alt={testimonials[activeIdx].author}
                                    className="w-12 h-12 border-2 border-black object-cover rounded-xs shrink-0 bg-slate-100"
                                />
                                <div className="leading-tight">
                                    <div className="text-sm font-black text-black uppercase tracking-tight">
                                        {testimonials[activeIdx].author}
                                    </div>
                                    <div className="text-slate-500 uppercase tracking-wider text-[10px] mt-0.5">
                                        {testimonials[activeIdx].role}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* TESTIMONIALS NAVIGATION: Styled like a retro forum index footer strip */}
                        <div className="flex items-center justify-center gap-4 mt-10 font-mono text-xs font-black">
                            
                            {/* Prev Control Block Shadow Button */}
                            <button 
                                onClick={previous} 
                                className="border-2 border-white bg-black text-white p-2 rounded-xs hover:bg-white hover:text-black transition-colors cursor-pointer shadow-[2px_2px_0px_0px_#ffffff] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                            >
                                <ChevronLeft className="w-4 h-4 stroke-[3]" />
                            </button>

                            {/* Forum-Style Index Tracker Dots: Transformed into bracket strings (e.g.) */}
                            <div className="flex items-center gap-1.5 px-2">
                                {testimonials.map((_, idx) => {
                                    // Formats counting strings nicely (01, 02, etc.)
                                    const paddedNumber = String(idx + 1).padStart(2, '0');
                                    
                                    return (
                                        <button 
                                            key={idx}
                                            onClick={() => setActiveIdx(idx)}
                                            className={`px-1.5 py-0.5 text-[11px] font-black tracking-tighter transition-all rounded-xs cursor-pointer ${
                                                idx === activeIdx 
                                                    ? "bg-white text-black"
                                                    : "text-slate-500 hover:text-white"
                                            }`}
                                        >
                                            [{paddedNumber}]
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Next Control Block Shadow Button */}
                            <button 
                                onClick={next} 
                                className="border-2 border-white bg-black text-white p-2 rounded-xs hover:bg-white hover:text-black transition-colors cursor-pointer shadow-[2px_2px_0px_0px_#ffffff] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                            >
                                <ChevronRight className="w-4 h-4 stroke-[3]" />
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
};