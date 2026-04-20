import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2026-03-25.dahlia", // 确保版本一致
});

export async function POST(req: Request)
{
    try
    {
        const body = await req.json();
        const { productId, amount, quantity, productName } = body;

        // 打印一下，看看这行到底拿到了什么
        console.log("DOMAIN URL:", process.env.CLIENT_URL);

        // 增加保底逻辑，防止变量为空导致错误
        const YOUR_DOMAIN = process.env.CLIENT_URL || "http://localhost:3000";

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"], // 建议显式加上
            line_items: [
                {
                    price_data: {
                        currency: "myr",
                        product_data: {
                            name: productName || `Order`,
                        },
                        unit_amount: Math.round(amount * 100),
                    },
                    quantity: quantity || 1,
                },
            ],
            mode: "payment",
            // 确保这里的 URL 拼接出来是绝对路径
            success_url: `${YOUR_DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${YOUR_DOMAIN}/order/${productId}`,
        });

        return NextResponse.json({ url: session.url });
    } catch (error)
    {
        console.error("Stripe Error Details:", (error as Error).message);
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}