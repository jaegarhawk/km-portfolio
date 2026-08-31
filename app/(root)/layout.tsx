import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const Layout = ( {children}: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-1 pt-30 pb-30">
                {children}
            </main>
            
            <Footer />
        </div>
    )
}

export default Layout