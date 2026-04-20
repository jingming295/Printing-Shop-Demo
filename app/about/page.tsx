import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Code2, Cpu, Globe2, Layers, Rocket, MapPin } from "lucide-react";
import { Metadata } from "next";

// 1. 注入针对 About 页面的 SEO
export const metadata: Metadata = {
    title: "About ByteSphere Printing | Modern Printing Solutions in Mount Austin",
    description: "Learn how ByteSphere Labs combines cutting-edge tech with traditional printing. High-fidelity demo showcasing digital excellence in Johor Bahru.",
};

export default function About()
{
    return (
        <div className="flex flex-col gap-16 md:gap-24 py-20 px-6 max-w-6xl mx-auto">

            {/* 1. Hero Section */}
            <section className="text-center space-y-6 mt-5">
                <Badge variant="outline" className="px-4 py-1 border-primary/30 text-primary bg-primary/5 mb-4 animate-pulse">
                    CONCEPTUAL PROTOTYPE v1.0
                </Badge>
                <h1 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-none">
                    Engineering <br />
                    <span className="text-primary italic">Digital Excellence</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                    This platform is a high-fidelity demonstration developed by
                    <span className="font-bold text-foreground px-1.5">ByteSphere</span>
                    to showcase how modern tech stacks can transform traditional service industries in
                    <span className="text-primary font-semibold underline decoration-primary/30 decoration-2 underline-offset-4 ml-1">Mount Austin, JB.</span>
                </p>
            </section>

            {/* 2. Demo Disclaimer */}
            <section>
                <Card className="bg-card/40 backdrop-blur-md border-border/50 rounded-[2.5rem] overflow-hidden shadow-xl ring-1 ring-white/10">
                    <CardContent className="p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
                        <div className="flex-1 space-y-6">
                            <div className="flex items-center gap-2 text-primary font-bold tracking-[0.2em] text-xs uppercase">
                                <Rocket className="size-5" />
                                Solution Showcase
                            </div>
                            <h2 className="text-3xl md:text-4xl font-black tracking-tight uppercase">
                                Built for <br />Presentation
                            </h2>
                            <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                                This environment simulates a complete end-to-end user journey for a
                                professional printing business in <span className="text-foreground font-semibold">Taman Mount Austin.</span> From high-performance product browsing
                                to instant WhatsApp lead generation, we demonstrate the potential of
                                <span className="text-foreground font-semibold px-1">automated workflows.</span>
                            </p>
                            <div className="flex flex-col gap-3">
                                <p className="text-xs text-muted-foreground/80 flex items-center gap-2 italic">
                                    <MapPin className="size-3" /> Targeted for Johor Bahru local business demonstration.
                                </p>
                                <p className="text-xs text-muted-foreground/60 italic border-l-2 border-primary/30 pl-4">
                                    Note: All product data, pricing, and images used here are placeholder assets for
                                    architectural demonstration purposes. No commercial transactions are processed.
                                </p>
                            </div>
                        </div>

                        {/* 右侧统计小方块 */}
                        <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
                            {[
                                { label: "ESTABLISHED", value: "2026" },
                                { label: "LIGHTHOUSE", value: "100" },
                            ].map((stat, i) => (
                                <div key={i} className="p-8 rounded-[2rem] bg-accent/50 border border-border flex flex-col items-center justify-center min-w-[140px] shadow-inner">
                                    <p className="text-3xl font-black text-primary tracking-tighter">{stat.value}</p>
                                    <p className="text-[10px] uppercase tracking-tighter font-bold opacity-60 mt-1">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </section>

            {/* 3. Tech Stack */}
            <section className="space-y-12">
                <div className="flex items-center gap-4">
                    <Separator className="flex-1 opacity-50" />
                    <h3 className="text-sm font-bold tracking-[0.3em] text-muted-foreground uppercase px-4 text-center">
                        Our Modern Tech Stack
                    </h3>
                    <Separator className="flex-1 opacity-50" />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                    {[
                        { icon: <Globe2 className="size-6" />, name: "Next.js 15", desc: "Server Actions & SSR" },
                        { icon: <Layers className="size-6" />, name: "Tailwind 4", desc: "Dynamic Styling" },
                        { icon: <Cpu className="size-6" />, name: "Shadcn UI", desc: "Accessible Design" },
                        { icon: <Code2 className="size-6" />, name: "SEO Focus", desc: "JSON-LD & Metadata" },
                    ].map((tech, i) => (
                        <Card key={i} className="group bg-transparent border-none shadow-none text-center hover:translate-y-[-4px] transition-all duration-300">
                            <CardHeader className="flex flex-col items-center space-y-4">
                                <div className="p-5 rounded-2xl bg-secondary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-sm">
                                    {tech.icon}
                                </div>
                                <div className="space-y-1">
                                    <CardTitle className="text-sm font-black uppercase tracking-widest">{tech.name}</CardTitle>
                                    <CardDescription className="text-[10px] font-medium">{tech.desc}</CardDescription>
                                </div>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </section>

            {/* 4. Footer Branding */}
            <section className="text-center pt-12 border-t border-border/20">
                <div className="inline-block relative">
                    <p className="text-sm text-muted-foreground relative z-10">
                        © 2026 <span className="font-bold text-foreground border-b border-primary/50">ByteSphere Labs</span>.
                        Engineering the future, one demo at a time.
                    </p>
                </div>
            </section>
        </div>
    );
}