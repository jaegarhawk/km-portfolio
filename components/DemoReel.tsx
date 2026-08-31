export default function DemoReel() {
    return (
        <div className="relative aspect-video w-full object-cover -z-1">
            <video 
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-cover"
                id="bg-video"
            >
            <source src={"/assets/vid/k-demo-reel.mp4"} type='video/mp4' />
            </video>
        </div>
    )
}