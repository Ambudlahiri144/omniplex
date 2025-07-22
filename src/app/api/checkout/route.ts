import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Make sure to use non-null assertion (!) or handle potential null value
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  try {
    const origin = request.headers.get('origin') || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Pro Plan',
            },
            unit_amount: 1000, // $10.00 in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/success`, // Or a dedicated success page
      cancel_url: `${origin}/cancel`,   // Or a dedicated cancel page
    });

    // Use NextResponse.json to send back a response
    return NextResponse.json({ id: session.id });

  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}