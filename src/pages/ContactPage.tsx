import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { ScrollReveal } from "@/components/ScrollReveal";
import { motion } from "motion/react";
import { Mail, MapPin, Clock } from "lucide-react";

const CONTACT_INFO = [
  {
    icon: Mail,
    label: "Email",
    value: "obsidian@lumora.studio",
    sub: "We respond within 48 hours. Sometimes less.",
  },
  {
    icon: MapPin,
    label: "Studio",
    value: "The Obsidian Lab, Nowhere",
    sub: "By appointment only. And we rarely make appointments.",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon – Fri, 10:00 – 18:00",
    sub: "We observe all obscure international holidays.",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  const inputClass =
    "w-full bg-transparent border border-border px-4 py-3 font-sans text-sm text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-primary transition-colors font-normal";

  return (
    <>
      <Navbar />
      <main className="bg-background min-h-screen">

        {/* ── Header ── */}
        <section className="py-16 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal direction="up">
              <p className="font-display text-[10px] tracking-[0.3em] uppercase text-primary font-medium mb-4">
                Make Contact
              </p>
              <h1 className="font-display font-black text-5xl sm:text-6xl text-foreground uppercase leading-none mb-4">
                Let's Talk
              </h1>
              <p className="text-muted-foreground font-normal text-sm leading-relaxed max-w-md">
                Whether you have a question, a complaint, or simply want to express your
                admiration, we're listening. Reluctantly, but attentively.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* ── Content ── */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-5 gap-12">

              {/* Contact info — left */}
              <div className="lg:col-span-2 space-y-8">
                <ScrollReveal direction="left" delay={0.1}>
                  <div className="space-y-6">
                    {CONTACT_INFO.map((item) => {
                      const Icon = item.icon;
                      return (
                        <div key={item.label} className="flex gap-4 border-b border-border pb-6">
                          <div className="w-8 h-8 border border-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Icon size={14} className="text-primary" />
                          </div>
                          <div>
                            <p className="font-display text-[10px] tracking-[0.3em] uppercase text-primary font-medium mb-1">
                              {item.label}
                            </p>
                            <p className="font-display font-medium text-sm text-foreground mb-1">
                              {item.value}
                            </p>
                            <p className="text-muted-foreground font-normal text-xs leading-relaxed">
                              {item.sub}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </ScrollReveal>

                {/* Social links */}
                <ScrollReveal direction="left" delay={0.2}>
                  <div>
                    <p className="font-display text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-medium mb-4">
                      Follow the Herd
                    </p>
                    <div className="flex gap-4">
                      {["Instagram", "Twitter (X)", "Vimeo"].map((s) => (
                        <span
                          key={s}
                          className="font-display text-xs tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors cursor-pointer font-medium"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              {/* Form — right */}
              <ScrollReveal direction="right" delay={0.15} className="lg:col-span-3">
                {sent ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border border-primary p-10 text-center"
                  >
                    <div className="w-10 h-10 bg-primary/20 border border-primary flex items-center justify-center mx-auto mb-4">
                      <span className="text-primary font-display font-bold">✓</span>
                    </div>
                    <h3 className="font-display font-bold text-xl text-foreground uppercase mb-2">
                      Transmission Received
                    </h3>
                    <p className="text-muted-foreground font-normal text-sm">
                      We'll get back to you. Eventually. We're very selective about urgency.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-display text-[10px] tracking-[0.25em] uppercase text-muted-foreground font-medium mb-2">
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Your name, if it matters"
                          required
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className="block font-display text-[10px] tracking-[0.25em] uppercase text-muted-foreground font-medium mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="Your address"
                          required
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-display text-[10px] tracking-[0.25em] uppercase text-muted-foreground font-medium mb-2">
                        Subject
                      </label>
                      <select
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        required
                        className={`${inputClass} cursor-pointer`}
                      >
                        <option value="" className="bg-card">Select a reason for contact</option>
                        <option value="order" className="bg-card">Order Inquiry</option>
                        <option value="collaboration" className="bg-card">Collaboration Proposal</option>
                        <option value="press" className="bg-card">Press &amp; Media</option>
                        <option value="complaint" className="bg-card">Complaint (Welcomed)</option>
                        <option value="other" className="bg-card">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-display text-[10px] tracking-[0.25em] uppercase text-muted-foreground font-medium mb-2">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Say what you mean. We appreciate directness."
                        required
                        rows={6}
                        className={`${inputClass} resize-none`}
                      />
                    </div>

                    <motion.button
                      type="submit"
                      whileTap={{ scale: 0.97 }}
                      whileHover={{ scale: 1.01 }}
                      className="w-full bg-primary text-primary-foreground font-display font-medium tracking-widest uppercase text-sm py-4 hover:bg-primary/90 transition-colors"
                    >
                      Send Transmission
                    </motion.button>
                  </form>
                )}
              </ScrollReveal>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
