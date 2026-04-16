import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export default function BecomeRecruiter() {
    const redirect = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleUpgrade = async () => {
        try {
            setLoading(true);
            const backendUrl = import.meta.env.VITE_BACKEND_API;
            const data = await axios.post(`${backendUrl}/admin/subscribe`,
                {plan: "admin"},
                {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                }
            );

            // 👉 Razorpay/Stripe integration will go here
            console.log("Order created:", data);
            localStorage.setItem("role", "admin");
            console.log("Received token from backend:", data.data.token);
            localStorage.setItem("token", data.data.token); // Update token with new role info
            redirect("/");
        } catch (err) {
            console.log(err);
            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">
            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-[var(--color-primary)]">
                        Become a Recruiter
                    </h1>
                    <p className="text-gray-600 mt-3">
                        Unlock powerful hiring tools and connect with top talent.
                    </p>
                </div>

                {/* Pricing Card */}
                <div className="bg-white shadow-lg rounded-2xl p-8 border">
                    <div className="flex flex-col md:flex-row justify-between items-center">

                        {/* Left */}
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-800">
                                Recruiter Plan
                            </h2>
                            <p className="text-gray-500 mt-2">
                                Perfect for companies & individuals hiring talent
                            </p>

                            <ul className="mt-6 space-y-3">
                                <li>✅ Post unlimited jobs</li>
                                <li>✅ Access candidate applications</li>
                                <li>✅ Priority job listing</li>
                                <li>✅ Dashboard analytics</li>
                                <li>✅ Direct messaging with candidates</li>
                            </ul>
                        </div>

                        {/* Right */}
                        <div className="mt-8 md:mt-0 text-center">
                            <p className="text-4xl font-bold text-[var(--color-primary)]">
                                ₹499
                            </p>
                            <p className="text-gray-500">/ month</p>

                            <button
                                onClick={handleUpgrade}
                                disabled={loading}
                                className="mt-6 bg-[var(--color-primary)] text-white px-6 py-3 rounded-xl hover:opacity-90 transition"
                            >
                                {loading ? "Processing..." : "Upgrade Now"}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Comparison Section */}
                <div className="mt-12">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">
                        Free vs Recruiter
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Free */}
                        <div className="border rounded-xl p-6">
                            <h4 className="font-semibold text-lg">Free</h4>
                            <ul className="mt-4 space-y-2 text-gray-600">
                                <li>✔ Browse jobs</li>
                                <li>✔ Apply to jobs</li>
                                <li>❌ Post jobs</li>
                                <li>❌ View applicants</li>
                            </ul>
                        </div>

                        {/* Recruiter */}
                        <div className="border-2 border-[var(--color-primary)] rounded-xl p-6">
                            <h4 className="font-semibold text-lg text-[var(--color-primary)]">
                                Recruiter
                            </h4>
                            <ul className="mt-4 space-y-2 text-gray-700">
                                <li>✔ Everything in Free</li>
                                <li>✔ Post jobs</li>
                                <li>✔ View applicants</li>
                                <li>✔ Analytics dashboard</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Trust Section */}
                <div className="mt-12 text-center text-gray-500">
                    <p>Secure payments powered by Razorpay</p>
                    <p className="text-sm mt-2">
                        Cancel anytime • No hidden charges
                    </p>
                </div>

            </div>
        </div>
    );
}