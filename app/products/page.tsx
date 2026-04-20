"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { PRODUCTS } from "@/constants/products";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronsRight, ShoppingCart } from "lucide-react";

export default function Products()
{
    const router = useRouter();

    return (
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-20 space-y-10 md:space-y-16">

            {/* 标题部分 - 采用与 About 页面一致的风格 */}
            <div className="flex flex-col items-center text-center space-y-4">
                <Badge variant="secondary" className="px-3 py-1 rounded-full uppercase tracking-widest text-[10px]">
                    Full Catalog
                </Badge>
                <h2 className="text-3xl md:text-6xl font-black tracking-tighter uppercase italic">
                    Our <span className="text-primary">Products</span>
                </h2>
                <p className="text-muted-foreground max-w-xl text-sm md:text-base">
                    Premium printing solutions for your business and personal needs.
                    High-quality materials with professional finishing.
                </p>
            </div>

            {/* 网格布局 - 适配玻璃拟态风格 */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                {PRODUCTS.map((p) => (
                    <div key={p.id} className="group relative flex flex-col">
                        <Card
                            className="relative aspect-square overflow-hidden border-none bg-card/50 backdrop-blur-sm shadow-sm ring-1 ring-border group-hover:ring-primary/50 group-hover:shadow-2xl group-hover:shadow-primary/10 transition-all duration-500 rounded-2xl md:rounded-[2rem] cursor-pointer"
                            onClick={() => router.push(`/order/${p.id}`)}
                        >
                            <CardContent className="p-0 h-full w-full">
                                {/* 图片处理 */}
                                <div className="relative w-full h-full">
                                    <Image
                                        src={p.image}
                                        alt={p.name}
                                        fill
                                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    {/* 图片上的遮罩层 - 仅在移动端增加一点质感 */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </CardContent>
                        </Card>

                        {/* 产品名称 - 语义化字体颜色 */}
                        <div className="mt-3 md:mt-5 mb-3 md:mb-5 px-1 flex flex-col items-center">
                            <h3 className="text-xs md:text-lg font-black tracking-tight text-foreground text-center line-clamp-2 uppercase leading-tight min-h-[2rem] md:min-h-[2.5rem]">
                                {p.name}
                            </h3>
                        </div>

                        {/* 按钮 - 使用 Shadcn Button & 适配 layout 风格 */}
                        <Button
                            className="w-full rounded-full h-9 md:h-12 font-black italic text-[10px] md:text-xs gap-1 transition-all hover:gap-2 active:scale-95 uppercase shadow-lg shadow-primary/10"
                            onClick={() => router.push(`/order/${p.id}`)}
                        >
                            <ShoppingCart className="size-3 md:size-4" />
                            Order<span className="hidden sm:inline ml-1 text-[10px] md:text-xs">Now</span>
                            <ChevronsRight className="size-3 md:size-4" />
                        </Button>
                    </div>
                ))}
            </div>

            {/* 底部提示 */}
            <div className="bg-accent/30 rounded-3xl p-8 text-center border border-dashed border-border mt-10">
                <p className="text-sm text-muted-foreground italic">
                    Don&apos;t see what you&apos;re looking for?
                    <span className="text-primary font-bold ml-1 cursor-pointer hover:underline" onClick={() => router.push('/contact')}>
                        Contact us
                    </span> for custom requests.
                </p>
            </div>
        </div>
    );
}