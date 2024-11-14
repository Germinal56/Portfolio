"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faXTwitter, faGithub, faUpwork } from "@fortawesome/free-brands-svg-icons";
//import { sendEmail } from "./utils"; // Adjust the import path based on your project structure

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    surname: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [popupMessage, setPopupMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
  
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        setStatus("success");
        setPopupMessage("Message sent successfully!");
        setFormData({ email: "", name: "", surname: "", message: "" });
      } else {
        setStatus("error");
  
        let errorMessage = "Failed to send. Please try again.";
        const contentType = response.headers.get("Content-Type");
  
        // Read the response body based on its Content-Type
        const errorResponse = contentType && contentType.includes("application/json")
          ? await response.json()
          : await response.text();
  
        errorMessage = typeof errorResponse === "string" ? errorResponse : errorResponse.error || errorMessage;
  
        setPopupMessage(errorMessage);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      setStatus("error");
      setPopupMessage("An unexpected error occurred. Please try again later.");
    } finally {
      setTimeout(() => setPopupMessage(null), 3000);
    }
  };  

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      {popupMessage && (
        <div className={`fixed top-10 text-white p-3 shadow-lg ${status === 'error' ? 'bg-red-500' : 'bg-green-500'}`}>
          {popupMessage}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-8 shadow-md w-full max-w-md"
      >
        <label className="block mb-4">
          <span className="text-gray-600 dark:text-gray-300 text-sm text-lato">Email</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            pattern="[A-Za-z0-9._+\-']+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$"
            placeholder="the email you check more often"
            title="Please enter a valid email address"
            className="w-full mt-1 p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white dark:bg-gray-700 dark:text-white"
          />
        </label>

        <div className="flex gap-4">
          <label className="block w-1/2">
            <span className="text-gray-600 dark:text-gray-300 text-sm">Name</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="your name"
              required
              className="w-full mt-1 p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white dark:bg-gray-700 dark:text-white"
            />
          </label>

          <label className="block w-1/2">
            <span className="text-gray-600 dark:text-gray-300 text-sm">Surname</span>
            <input
              type="text"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              placeholder="your surname"
              required
              className="w-full mt-1 p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white dark:bg-gray-700 dark:text-white"
            />
          </label>
        </div>

        <label className="block mb-4 mt-4">
          <span className="text-gray-600 dark:text-gray-300 text-sm">Message</span>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="write here..."
            required
            className="w-full mt-1 p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white dark:bg-gray-700 dark:text-white h-32 max-h-[300px] min-h-[100px]"
          ></textarea>
        </label>

        <button
          type="submit"
          disabled={status === "loading"}
          className={`w-full bg-black text-white py-2 hover:bg-gray-800 dark:hover:bg-gray-600 font-latoBold transition ${
            status === "loading" ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {status === "loading" ? "Sending..." : "Submit"}
        </button>
      </form>

      {/* Social Icons */}
      <div className="flex space-x-6 mt-12 text-2xl">
        <a
          href="https://www.linkedin.com/in/gfornaciari/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black dark:text-white hover:text-blue-600 transition hover:animate-pulse"
          aria-label="LinkedIn"
        >
          <FontAwesomeIcon icon={faLinkedin} className="w-7 h-7"/>
        </a>
        <a
          href="https://x.com/gianlu_ufficial"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black dark:text-white hover:text-red-700 transition hover:animate-pulse"
          aria-label="Twitter"
        >
          <FontAwesomeIcon icon={faXTwitter} className="w-7 h-7"/>
        </a>
        <a
          href="https://www.upwork.com/freelancers/~0168064fbf85f699dc"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black dark:text-white hover:text-green-700 transition hover:animate-pulse"
          aria-label="Upwork"
        >
          <FontAwesomeIcon icon={faUpwork} className="w-9 h-9 mt-[-2px]"/>
        </a>
        <a
          href="https://github.com/Germinal56"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black dark:text-white hover:text-gray-500 transition hover:animate-pulse"
          aria-label="GitHub"
        >
          <FontAwesomeIcon icon={faGithub} className="w-7 h-7"/>
        </a>
      </div>
    </main>
  );
};

export default Contact;
