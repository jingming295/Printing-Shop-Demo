"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle2, ArrowRight, Printer, ShoppingBag, Home } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

interface OrderResponse
{
    status: 'paid' | 'unpaid' | 'no_session';
    customer: string;
    amount: number;
}

// Next.js 中使用 useSearchParams 必须包裹在 Suspense 中
export default function SuccessPage()
{
    return (
        <Suspense fallback={<div className="h-screen flex items-center justify-center italic font-black animate-pulse">LOADING...</div>}>
            <SuccessContent />
        </Suspense>
    );
}

function SuccessContent()
{
    const searchParams = useSearchParams();
    const router = useRouter();
    const sessionId = searchParams.get('session_id');

    // 初始化时直接根据 sessionId 决定状态，修复之前的 ESLint 报错
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
        sessionId ? 'loading' : 'error'
    );
    const [orderInfo, setOrderInfo] = useState<OrderResponse | null>(null);

    useEffect(() =>
    {
        if (!sessionId) return;

        let isMounted = true;
        fetch(`/api/check-session?session_id=${sessionId}`)
            .then(res => res.json())
            .then(data =>
            {
                if (!isMounted) return;
                if (data.status === 'paid')
                {
                    setOrderInfo(data);
                    setStatus('success');
                    toast.success("Payment Verified");
                } else
                {
                    setStatus('error');
                }
            })
            .catch(() =>
            {
                if (isMounted) setStatus('error');
            });

        return () => { isMounted = false; };
    }, [sessionId]);

    // --- 这里开始“读取”变量，解决 ts(6133) ---

    // 1. 读取 status 处理加载中
    if (status === 'loading')
    {
        return (
            <div className="h-[80vh] flex flex-col items-center justify-center gap-6">
                <div className="size-20 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                <h2 className="italic font-black text-2xl tracking-tighter uppercase animate-pulse">Verifying...</h2>
            </div>
        );
    }

    // 2. 读取 status 处理错误
    if (status === 'error')
    {
        return (
            <div className="h-[80vh] flex flex-col items-center justify-center gap-6 text-center">
                <ShoppingBag className="size-16 text-destructive opacity-20" />
                <h1 className="text-3xl font-black uppercase italic tracking-tighter">Invalid Session</h1>
                <Button variant="outline" onClick={() => router.push("/")}>Back to Shop</Button>
            </div>
        );
    }

    // 3. 读取 status 和 orderInfo 处理成功
    return (
        // 1. 增加 py-12 或 pt-24，确保不被 Navbar 挡住；min-h-screen 配合 flex
        <div className="min-h-screen flex flex-col items-center justify-start pt-24 pb-12 px-6 animate-in fade-in zoom-in-95 duration-500">

            {/* 2. 优化圆角为 rounded-[2rem]，更显精致 */}
            <Card className="max-w-md w-full border-none bg-card/40 shadow-2xl rounded-[2rem] overflow-hidden ring-1 ring-border p-0">
                <CardContent className="p-0">

                    {/* 顶部蓝色横幅 */}
                    <div className="bg-primary p-10 flex flex-col items-center text-primary-foreground relative">
                        <CheckCircle2 className="size-16 mb-4 fill-primary-foreground/10" />
                        <h1 className="text-3xl font-black italic tracking-tighter text-center leading-none">ORDER PLACED</h1>
                        <p className="opacity-80 text-xs mt-3 font-bold uppercase tracking-[0.2em]">
                            Thank you, {orderInfo?.customer}
                        </p>
                    </div>

                    <div className="p-8 space-y-8">
                        {/* 订单明细：保持圆润感但不过火 */}
                        <div className="bg-accent/50 rounded-[1.5rem] p-6 space-y-4 border border-border/50">
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mb-1">Amount Paid</p>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-lg font-black text-primary italic">RM</span>
                                        <span className="text-4xl font-black tracking-tighter italic">
                                            {orderInfo?.amount.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                                <Printer className="size-10 text-primary/20" />
                            </div>
                        </div>

                        {/* 3. 优化动作区域：增加间距，让“Back to Home”更有质感 */}
                        <div className="pt-2 space-y-4">
                            <Button
                                className="w-full h-14 rounded-xl font-black italic tracking-tight gap-2 shadow-lg shadow-primary/20 text-sm"
                            >
                                TRACK STATUS <ArrowRight className="size-4" />
                            </Button>

                            <button
                                onClick={() => router.push("/")}
                                className=" cursor-pointer w-full flex items-center justify-center gap-2 text-muted-foreground hover:text-primary transition-all text-xs font-bold uppercase tracking-widest py-2"
                            >
                                <Home className="size-3" />
                                <span>Back to Home</span>
                            </button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* 底部可以加点装饰或版权文字，防止视觉太飘 */}
            <p className="mt-8 text-[10px] text-muted-foreground/50 font-medium uppercase tracking-[0.3em]">
                Bytesphere Printing Solutions
            </p>
        </div>
    );
}