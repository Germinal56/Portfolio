"use client";

import { useState } from "react";
import axios from "axios";
import Image from "next/image";

export default function NewsletterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    agreedToTerms: false,
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.agreedToTerms) {
      setMessage("You must agree to subscribe to the newsletter to receive the ebook.");
      return;
    }

    setStatus("loading");
    setMessage(null);

    try {
      const response = await axios.post("/api/subscribe", {
        name: formData.name,
        email: formData.email,
      });
    
      if (response.status === 200) {
        setStatus("success");
        setMessage("Thank you! \nCheck your email for the ebook link. \n(It will be sent in max 24h)");
        setFormData({ name: "", email: "", agreedToTerms: false });
      } else {
        throw new Error("Subscription failed");
      }
    } catch {
      setStatus("error");
      setMessage("Failed to subscribe. Please try again later.");
    } finally {
      setStatus("idle");
    }
  };

  return (
    <div className="min-h-screen flex flex-col sm:flex-row items-center justify-center p-4 mt-12 sm:mt-0">
      {/* Privacy Policy Popup */}
      {showPrivacyPolicy && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold font-playfair text-center mb-4">Privacy Policy</h2>
            <ul className="list-disc pl-5 mb-4">
              <li>
                You will respect the rights of the owner of the contents and get access to the resources for personal use only.
              </li>
              <li>
                You may receive emails from time to time. Emails will be useful and pleasant by design so hopefully you even like them.
              </li>
              <li>You will be subscribed to the newsletter until you unsubscribe.</li>
              <li>
                Your personal data (name, e-mail) will NOT be shared with third parties. You can ask to delete your data at any moment, just by sending your request to mail@gianlucafornaciari.com or clicking unsubscribe at the bottom of the emails you receive.
              </li>
            </ul>
            <div className="flex justify-center">
              <button
                onClick={() => setShowPrivacyPolicy(false)}
                className="bg-red-800 text-white py-2 px-4 font-latoBold hover:bg-red-900 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Section */}
      <div className="sm:w-1/3 w-2/3 mb-4 sm:mb-0">
        <Image
          src="/honest-investments-cover.webp"
          alt="Honest Investments Cover"
          width={400}
          height={400}
          className="w-full h-auto object-cover"
          priority
        />
      </div>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow-lg max-w-md w-full sm:w-2/3"
      >
        <h1 className="text-2xl font-bold mb-4 font-playfair text-center">Get the Book</h1>
        <p className="mb-4">
          Learn personal finance, protect yourself from rip-offs, and start investing on your own.
        </p>
        <label className="block mb-2">
          your *real* name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border rounded"
          />
        </label>
        <label className="block mb-2">
          your best e-mail
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            pattern="[A-Za-z0-9._+\-']+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$"
            required
            className="w-full mt-1 p-2 border rounded"
          />
        </label>
        <label className="block mb-4 text-sm">
          <input
            type="checkbox"
            name="agreedToTerms"
            checked={formData.agreedToTerms}
            onChange={handleChange}
            required
            className="mr-2"
          />
          I agree to subscribe to the newsletter to receive the ebook.{" "}
          <span
            onClick={() => setShowPrivacyPolicy(true)}
            className="underline cursor-pointer"
          >
            Read the Privacy Policy
          </span>.
        </label>
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-black hover:bg-gray-800 dark:hover:bg-gray-600 text-white py-2 font-latoBold transition"
        >
          {status === "loading" ? "Submitting..." : "Get the Book"}
        </button>
        {message && (
          <p className={`mt-4 text-center font-latoBold whitespace-pre-line ${status === 'error' ? 'text-red-700' : 'text-green-700'}`}>{message}</p>
        )}
      </form>
    </div>
  );
}
