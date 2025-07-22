"use client";

import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

// Make sure to put your Stripe publishable key in your .env.local file
// NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const UpgradeButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // 1. Fetch the checkout session ID from your new API endpoint
      const response = await fetch("/api/checkout", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session.");
      }

      const session = await response.json();

      // 2. Get an instance of Stripe
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error("Stripe.js has not loaded yet.");
      }

      // 3. Redirect to Stripe Checkout
      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      // This point will only be reached if there is an immediate error when
      // redirecting to checkout. Otherwise, the user will be sent to Stripe.
      if (error) {
        setError(error.message ?? "Checkout failed");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleCheckout}
        disabled={isLoading}
        className="px-6 py-3 font-semibold bg-transparent border border-white text-white rounded-lg shadow-md hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
      >
        {isLoading ? "Processing..." : "Upgrade to Pro - $10"}
      </button>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default UpgradeButton;
