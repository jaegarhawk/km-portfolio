"use client";
import * as motion from "motion/react-client"
import { useState } from "react"

type Slide = {
    text: string;
    alt?: string;
}

type SliderTextProps = {
    slides: Slide[];
    duration?: number;
    gap?: number;
    imageWidth?: number;
    imageHeight?: number;
    direction?: "left" | "right";
    className?: string;
};

const SliderText = ({
    slides,
    duration = 50,
    direction = "left",
    className = "",
}: SliderTextProps) => {
    
    const [isHovered, setIsHovered] = useState(false); 
    const duplicatedSlides = Array(4).fill(slides).flat();

    const marqueeAnimation = {
        x: direction === "left" ? ['0', '-25%'] : ['-25%', '0%'],
    };
    
    return (
        <div className={`w-full relative overflow-hidden py-4 ${className}`}
            onMouseEnter={() => setIsHovered(true)}  // Captures pointer enter
            onMouseLeave={() => setIsHovered(false)}
        >

            {/* soft fade on left and right edges */}
            <div className="absolute inset-y-0 left-0 w-30 bg-linear-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-30 bg-linear-to-l from-background to-transparent z-10 pointer-events-none" />

            <motion.div 
                className="flex items-center min-w-max gap-12 select-none"
                animate={isHovered ? false : marqueeAnimation}
                transition={{
                    ease: "linear",
                    duration,
                    repeat: Infinity
                }}
            >
                {duplicatedSlides.map((slide, index) => (
                    <div 
                        key={index}
                        className="shrink-0 w-112.5 flex flex-col" // Much wider block size
                    >
                        <p className="text-4xl font-extrabold tracking-tight uppercase text-foreground md:text-6xl whitespace-normal break-word">
                            {slide.text}
                        </p>
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default SliderText