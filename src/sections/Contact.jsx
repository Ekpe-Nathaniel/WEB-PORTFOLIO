import React, { useState } from "react";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "loading", message: "Sending..." });

    try {
      // Use relative path for Vercel, fallback to localhost for dev
      const apiUrl = import.meta.env.VITE_API_BASE_URL 
        ? `${import.meta.env.VITE_API_BASE_URL}/api/send-email`
        : '/api/send-email';

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setStatus({ type: "success", message: data.message });
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus({ type: "error", message: data.message || "Failed to send message. Please try again later." });
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus({ type: "error", message: "An error occurred. Please try again later." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-12"
        >
          Contact Me
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto p-8 glass rounded-2xl"
        >
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="name" className="block mb-2 font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-3 bg-white/5 dark:bg-black/5 border-b-2 border-blue-500 focus:outline-none focus:bg-white/10 dark:focus:bg-black/10 transition-colors"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block mb-2 font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-3 bg-white/5 dark:bg-black/5 border-b-2 border-blue-500 focus:outline-none focus:bg-white/10 dark:focus:bg-black/10 transition-colors"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block mb-2 font-medium">
                Message
              </label>
              <textarea
                id="message"
                rows="4"
                className="w-full p-3 bg-white/5 dark:bg-black/5 border-b-2 border-blue-500 focus:outline-none focus:bg-white/10 dark:focus:bg-black/10 transition-colors"
                placeholder="Your message..."
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl hover-scale hover-glow transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
            {status.message && (
              <p className={`text-center mt-4 ${
                status.type === 'success' ? 'text-green-500' : 
                status.type === 'error' ? 'text-red-500' : 'text-blue-500'
              }`}>
                {status.message}
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
