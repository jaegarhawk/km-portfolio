import { FaXTwitter, FaGithub, FaLinkedin, FaItchIo } from "react-icons/fa6"

const socialLinks = [
    {href: "https://www.linkedin.com/in/kendal-mitchell/", label: "LinkedIn", icon: FaLinkedin},
    {href: "https://x.com/jaegarhawk", label: "X", icon: FaXTwitter},
    {href: "https://github.com/jaegarhawk", label: "GitHub", icon: FaGithub},
    {href: "https://jaegarhawk.itch.io/", label: "Itch.io", icon: FaItchIo}
]

export const Socials = () => {
    return (
        <div className="flex items-center justify-center select-none font-mono">
            <div className="border-2 border-white bg-black p-0.5 flex items-center shadow-[3px_3px_0px_0px_#ffffff]">
                {socialLinks.map((link) => {
                    const Icon = link.icon;

                    return (
                        <a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={link.label}
                            className="p-2.5 text-white hover:bg-white hover:text-black transition-all duration-100 flex items-center justify-center group"
                        >
                            {/* scales up the line art on hover */}
                            <Icon className="text-base transition-transform duration-100 group-hover:scale-110" />
                        </a>
                    );
                })}
            </div>
        </div>
    );
};
