"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation"; // 换成 Next 路由
import { PRODUCTS } from "@/constants/products";
import
{
    ChevronLeft,
    AlertCircle,
    CheckCircle2,
    Loader2,
    ShoppingCart,
    ShieldCheck
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadArea } from "./UploadArea";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const Order = () =>
{
    const params = useParams();
    const router = useRouter();
    const id = params?.id as string;

    const product = PRODUCTS.find((p) => p.id === id?.trim());
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [quantity, setQuantity] = useState(product?.specs.minOrder || 0);
    const [file, setFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!product)
    {
        return (
            <div className="flex h-[70vh] flex-col items-center justify-center gap-4">
                <h2 className="text-2xl font-black italic opacity-20 uppercase">Product Not Found</h2>
                <Button onClick={() => router.push("/products")}>Back to Catalog</Button>
            </div>
        );
    }

    const totalPrice = (product.pricing.unitPrice * (quantity || 0)).toFixed(2);
    const totalItems = product.specs.qtyPerUnit * (quantity || 0);
    const isInvalid = !product || isNaN(quantity) || quantity < product.specs.minOrder;
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    {
        const val = parseInt(e.target.value);
        setQuantity(isNaN(val) ? 0 : val);
    };

    const handleBlur = () =>
    {
        if (quantity < product.specs.minOrder)
        {
            setQuantity(product.specs.minOrder);
        }
    };

    const handleProcessOrder = async () =>
    {
        if (!file)
        {
            toast.error("Missing Artwork", {
                description: "Please upload a file or create a design before ordering.",
            });
            return;
        }

        setIsSubmitting(true);

        // 定义真正的支付请求逻辑
        const processPayment = async () =>
        {
            const response = await fetch("/api/create-checkout-session", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    productId: product.id,
                    productName: product.name,
                    amount: product.pricing.unitPrice, // 传入 RM 数值，后端会乘 100
                    quantity: quantity,
                }),
            });

            const data = await response.json();

            if (!response.ok)
            {
                throw new Error(data.error || "Failed to create checkout session");
            }

            if (data.url)
            {
                // 成功后跳转到 Stripe 托管页面
                window.location.href = data.url;
            }
        };

        // 使用 toast.promise 包裹请求
        toast.promise(processPayment(), {
            loading: "Preparing secure checkout...",
            success: "Redirecting to Stripe...",
            error: (err) => `Checkout error: ${err.message}`,
        });

        // 注意：这里不需要手动 setSubmitting(false)，
        // 因为 window.location.href 会导致页面离开。
        // 如果请求报错，toast.promise 的 error 会触发。
    };

    return (
        <div className="container mx-auto px-4 py-8 md:py-24 max-w-6xl">
            {/* 1. 顶部返回 - 极简风格 */}
            <Button
                variant="ghost"
                className="mb-8 group text-muted-foreground hover:text-primary transition-colors"
                onClick={() => router.push("/products")}
            >
                <ChevronLeft className="mr-2 size-4 transition-transform group-hover:-translate-x-1" />
                <span className="text-xs font-bold uppercase tracking-widest">Back to Products</span>
            </Button>

            <div className="grid lg:grid-cols-2 gap-10 md:gap-20 items-start">

                {/* 左侧：文件上传/预览 - 增加背景通透感 */}
                <div className="space-y-6">
                    <UploadArea
                        file={file}
                        setFile={setFile}
                        productSize={product.specs.size}
                        onOpenEditor={() => setIsEditorOpen(true)}
                    />

                    <div className="flex items-center gap-3 px-6 text-muted-foreground/60">
                        <ShieldCheck className="size-4" />
                        <span className="text-[10px] font-bold uppercase tracking-tighter">Secure artwork verification enabled</span>
                    </div>
                </div>

                {/* 右侧：配置区 - 移除 bg-white */}
                <div className="flex flex-col space-y-8">
                    {/* 产品标题区 */}
                    <div className="space-y-4">
                        <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5 uppercase italic font-black px-3 py-1 text-[10px]">
                            {product.category}
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic leading-none">
                            {product.name}
                        </h1>
                        <p className="text-muted-foreground text-sm md:text-lg leading-relaxed max-w-md">
                            {product.desc}
                        </p>
                    </div>

                    <div className="space-y-6">
                        {/* 数量输入卡片 - 玻璃拟态 */}
                        <Card className={cn(
                            "border-none rounded-[2rem] transition-all duration-500 shadow-2xl",
                            isInvalid ? "bg-destructive/5 ring-2 ring-destructive" : "bg-card/50 ring-1 ring-border"
                        )}>
                            <CardContent className="p-6 md:p-10 space-y-8">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center px-1">
                                        <Label className="font-black text-muted-foreground uppercase tracking-widest text-[10px] italic">
                                            Step 2: Config Quantity
                                        </Label>
                                        <Badge variant="secondary" className="font-black text-[10px] rounded-full">
                                            MIN: {product.specs.minOrder} {product.specs.unit}s
                                        </Badge>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="relative flex-1">
                                            <Input
                                                type="number"
                                                value={quantity === 0 ? "" : quantity}
                                                onChange={handleInputChange}
                                                onBlur={handleBlur}
                                                className={cn(
                                                    "h-20 md:h-28 text-5xl md:text-7xl font-black rounded-3xl border-none text-center bg-background/50 focus-visible:ring-2 focus-visible:ring-primary transition-all",
                                                    isInvalid && "text-destructive"
                                                )}
                                            />
                                        </div>
                                        <div className="text-muted-foreground/40 font-black italic text-2xl md:text-4xl uppercase tracking-tighter shrink-0">
                                            {product.specs.unit}s
                                        </div>
                                    </div>

                                    {isInvalid && (
                                        <div className="flex items-center gap-2 text-destructive px-2 animate-in slide-in-from-top-1">
                                            <AlertCircle className="size-4" />
                                            <span className="text-[10px] font-black uppercase tracking-widest">Under Minimum Order</span>
                                        </div>
                                    )}
                                </div>

                                <Separator className="bg-border/50" />

                                <div className="flex justify-between items-end">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Total Price</p>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-xl md:text-2xl font-black text-primary italic tracking-tighter">RM</span>
                                            <span className={cn(
                                                "text-5xl md:text-7xl font-black tracking-tighter transition-all duration-500",
                                                isInvalid ? "opacity-20" : "opacity-100"
                                            )}>
                                                {totalPrice}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="text-right flex flex-col items-end gap-3">
                                        <div className="flex items-center gap-1.5 text-emerald-500 font-black text-[10px] uppercase bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                                            <CheckCircle2 className="size-3" /> Ready to Print
                                        </div>
                                        <span className="text-[10px] text-muted-foreground font-black uppercase leading-tight tracking-tighter text-right opacity-60">
                                            {totalItems.toLocaleString()} Units Total<br />
                                            Est. Lead Time: {product.specs.leadTime}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* 下单按钮 - 增加视觉冲击力 */}
                        <Button
                            size="lg"
                            disabled={isInvalid || quantity === 0 || isSubmitting}
                            onClick={handleProcessOrder}
                            className={cn(
                                "w-full h-20 md:h-28 text-2xl md:text-3xl font-black rounded-[2rem] shadow-2xl transition-all gap-4 overflow-hidden relative group",
                                !isInvalid && !isSubmitting && "bg-primary hover:bg-primary/90 hover:scale-[1.02] shadow-primary/20"
                            )}
                        >
                            {isSubmitting ? (
                                <Loader2 className="size-8 animate-spin" />
                            ) : (
                                <>
                                    {isInvalid ? (
                                        "ORDER LIMIT NOT MET"
                                    ) : (
                                        <div className="flex items-center gap-4 italic uppercase tracking-tighter">
                                            <ShoppingCart className="size-8" />
                                            <span>Proceed to Checkout</span>
                                        </div>
                                    )}
                                </>
                            )}
                            {/* 按钮内的流光动效 (纯 CSS 增强) */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* 设计器 Overlay - 改为 Shadcn 风格的大全屏 */}
            {isEditorOpen && (
                <div className="fixed inset-0 z-[100] bg-background animate-in fade-in zoom-in-95 duration-300">
                    {/* <Designer
                        size={product.specs.size}
                        productName={product.name}
                        onSave={(designData) =>
                        {
                            console.log("Saved:", designData);
                            setIsEditorOpen(false);
                            toast.success("Design saved successfully!");
                        }}
                        onClose={() => setIsEditorOpen(false)}
                    /> */}
                </div>
            )}
        </div>
    );
};

export default Order;