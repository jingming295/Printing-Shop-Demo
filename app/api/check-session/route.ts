import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export async function GET(req: Request)
{
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId)
    {
        return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
    }

    try
    {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        return NextResponse.json({
            status: session.payment_status,
            customer: session.customer_details?.name,
            amount: session.amount_total ? session.amount_total / 100 : 0,
        });
    } catch (error)
    {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}