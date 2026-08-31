import * as motion from "motion/react-client"
import Image from "next/image"

type Slide = {
    img: string;
    alt?: string;
}

type SliderImageProps = {
    slides: Slide[];
    duration?: number;
    gap?: number;
    imageWidth?: number;
    imageHeight?: number;
    direction?: "left" | "right";
    className?: string;
};

const SliderImage = ({
    slides,
    duration = 10,
    imageWidth = 150,
    imageHeight = 100,
    direction = "left",
    className = "",
}: SliderImageProps) => {
    
    const duplicatedSlides = [...slides, ...slides];
    
    return (
        <div className={`w-full relative overflow-hidden ${className}`}>
            <motion.div 
                className="flex"
                animate={{
                    x: direction === "left" ? ['0', '-100%'] : ['-100%', '0%'],
                }}
                transition={{
                    ease: "linear",
                    duration,
                    repeat: Infinity
                }}
            >
                {duplicatedSlides.map((slide, index) => (
                    <div 
                        key={index}
                        className="shrink-0 flex justify-center"
                        style={{ width: `${100 / slides.length}%` }}
                    >
                        <Image
                            src={slide.img}
                            width={imageWidth}
                            height={imageHeight}
                            alt={slide.alt ?? "slider image"}
                        />
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default SliderImage