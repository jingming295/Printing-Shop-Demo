"use client";

import { useRouter } from "next/navigation";
import Image from "next/image"; // 替换 img 标签
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PRODUCTS } from "@/constants/products";
import { ArrowRight, Zap, Globe, CheckCircle, MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site"; // 引入全站配置

export default function Page()
{
  const router = useRouter();

  return (
    <div className="flex flex-col gap-12 md:gap-20 pb-20">

      {/* 1. Hero Section - 移除 bg-zinc-50，改用透明背景让 Layout 的光晕透出来 */}
      <section className="relative px-6 pt-24 pb-16 text-center md:pt-40 md:pb-24 overflow-hidden">
        <div className="container mx-auto max-w-5xl space-y-6 md:space-y-8 relative z-10">
          <h1 className="text-4xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.1]">
            The Future of Print, <br />
            <span className="text-primary italic">Live Concept Demo.</span>
          </h1>
          <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-2">
            Welcome to the ByteSphere Printing Prototype. This environment is designed to
            showcase a seamless digital-to-print workflow, from visual cataloging to automated checkout.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4 px-4 sm:px-0">
            <Button
              size="lg"
              className="w-full sm:w-auto h-14 px-10 text-md rounded-full font-bold shadow-xl shadow-primary/20"
              onClick={() => router.push("/products")}
            >
              Explore Catalog <ArrowRight className="ml-2 size-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* 2. Value Props - 适配系统变量 */}
      <section className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
        {[
          {
            icon: <Zap className="size-10 md:size-12 text-orange-500" />,
            title: "Fast Turnaround",
            desc: "General printing completed within 2-5 working days."
          },
          {
            icon: <Globe className="size-10 md:size-12 text-emerald-500" />,
            title: "Self-Pickup (JB)",
            desc: "Available for self-collection at our Johor Bahru office."
          },
          {
            icon: <CheckCircle className="size-10 md:size-12 text-primary" />,
            title: "Artwork Check",
            desc: "Manual verification of resolution and bleed before production."
          }
        ].map((f, i) => (
          <div key={i} className="group p-6 md:p-8 rounded-[2rem] border bg-card/50 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 hover:border-primary/20 relative overflow-hidden">
            <div className="relative z-10">
              <div className="mb-4 md:mb-6">{f.icon}</div>
              <h3 className="font-bold text-lg md:text-xl mb-2 tracking-tight">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* 3. Service Categories - 重点优化 Image 组件 */}
      <section className="container mx-auto px-6 space-y-8 md:space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-l-4 border-primary pl-6">
          <div className="space-y-1">
            <p className="text-primary font-bold tracking-widest uppercase text-[10px] md:text-xs">Solutions Catalog</p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight uppercase">Featured Services</h2>
          </div>
          <Button variant="outline" className="hidden md:flex rounded-full" onClick={() => router.push("/products")}>
            View Full Catalog →
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {PRODUCTS.slice(0, 4).map((p) => (
            <Card
              key={p.id}
              className="group overflow-hidden border-none shadow-sm hover:shadow-2xl transition-all duration-500 rounded-3xl ring-1 ring-border flex flex-col bg-card/50"
            >
              <CardContent className="p-0 flex flex-col sm:flex-row h-full">
                {/* 使用 Next.js Image 进行自动优化 */}
                <div className="w-full sm:w-2/5 relative min-h-[200px] sm:min-h-full overflow-hidden bg-muted">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                <div className="w-full sm:w-3/5 p-6 md:p-8 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="scale-75 md:scale-100">{p.icon}</div>
                      <h3 className="text-xl md:text-2xl font-black group-hover:text-primary transition-colors uppercase">
                        {p.name}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {p.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <Button
                      className="w-full sm:w-auto rounded-full font-bold uppercase tracking-tighter text-xs h-10 transition-colors"
                      onClick={() => router.push(`/order/${p.id}`)}
                    >
                      Order Now <ArrowRight className="ml-2 size-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button variant="outline" className="w-full md:hidden rounded-xl h-12" onClick={() => router.push("/products")}>
          Explore All Products
        </Button>
      </section>

      {/* 4. Contact Block - 使用你的 bg-whatsapp 变量 */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="bg-foreground text-background p-10 md:p-20 rounded-[2.5rem] md:rounded-[3rem] flex flex-col items-center text-center gap-8 shadow-3xl relative overflow-hidden">
          <div className="space-y-4 max-w-2xl relative z-10">
            <h2 className="text-3xl md:text-6xl font-black tracking-tighter uppercase">Need Custom Specs?</h2>
            <p className="opacity-70 text-sm md:text-lg">For bulk orders or unique designs, get an instant quote via WhatsApp within 15 mins.</p>
          </div>
          <Button
            size="lg"
            className="w-full md:w-auto bg-whatsapp text-white hover:bg-whatsapp/90 rounded-full h-14 md:h-16 px-10 md:px-12 text-md md:text-lg font-black gap-3 shadow-2xl relative z-10 group transition-all hover:scale-105"
            onClick={() => window.open(siteConfig.contact.whatsapp, "_blank")}
          >
            <MessageCircle className="size-5 md:size-6 fill-current" />
            WHATSAPP FAST QUOTE
          </Button>
          {/* 这里利用一个简单的装饰光圈，呼应你的 Layout 风格 */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full" />
        </div>
      </section>
    </div>
  );
}