import { Navbar } from "@/components/navbar";
import { ScrollReveal, StaggerReveal } from "@/components/ScrollReveal";
import { Link } from "react-router-dom";

const IMG_MONOLITH =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCuLJLKla1-iyM_6tgrkH884TUmlC2Iu487z2mlgCV4_8brtP1QvvUsJ_YvOVv71ZxR0Gbmdwkntax7IHgh9YalNw2H-GlPqPXYw7iuv33oBg4BZICxwr4reE9F8N2g83sUx_a8mkYl_Hn8w7l3gIgyFY4JzvwWsPoKw_HVNvFX6yVPwVO2Scls2r5GMgdb60wOQKH5Tlr8kIEnbwcU0wJBEiHQbTJ5OeI7LUGryq6ButRNSscsKA-Hgg";

const TEAM = [
  {
    name: "Kira Novak",
    role: "Founder & Chief Curator",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCk1mMROLTMhZxO5ExqCxlvrWgBl0u-bdbjU1V3zo8dz5xagEZgvHoeKxN69l8DHgEahRHlmdCxqQq_l79r33uu-hINMVNJ0lqXz7VArII4ye02-lTk9ZcUB_yWVN9YBqNoreD1EcXBVb4QIi-Q7MDTfCmA9G1Tjleo7SQMYKq_Zb1AHg2EAvfl-MUqZiSg0x9xafELagBhuG3_tnM-_oxfBlcBHggFZd_7iDNmM8BbbSygjP1V5ZKTVA",
    bio: "Former aerospace engineer turned design obsessive. Built LUMORA after realizing most luxury brands had lost their edge.",
  },
  {
    name: "Emre Selin",
    role: "Head of Design",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCOeQOhV7OJUpKsLXig_g60fLyjUKB40uHgi-Swa_3lvQ0b3ovXJpT0QyhZN0moDaCrQj7YK3QdMYkVDsx59pyPI6gqIji5F4wZgyo3MEWEKOwrha8F9stDVxQChNuZ-IV9S4clbQ8Lqw6Iqu-VEfVvCMuOnPe20OAH96zvAHIDblyRrkCYxhtLU3Q45bmZ7vHqWTgqMuqnigkk-u8MZQ5DmCq_h6n42gcQlZZHruKCQ6gXZSL3BD5H6g",
    bio: "Trained under three masters of industrial design. Believes a product must earn its place in a room.",
  },
  {
    name: "Sol Park",
    role: "Acquisitions",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBs-z5ppEotX02fBmVuL8pWaPcsgHQzikBprTcj7Of1jgnbyjUZzWQ92xCoGTxtjYOy60-s32S3nehNw-EYX-JSVCSZXeGIij3a5AY0Q4f5VL4dWW61MrqMDl39Y8tk4IEjV_VxO3b-a68Rjijy1X21-wHCs-5zfGbuHHcYKM3qsTRq2DN-CKqQcodSLxb7_0MMDKuWIGTG4CzHutAQXkCHEJ4llGuf5kNEY9a7rSZ3hknYXiihef1GQw",
    bio: "Sources what cannot be found. Has visited 62 countries in pursuit of objects that deserve to exist.",
  },
];

const VALUES = [
  {
    number: "01",
    title: "Radical Selectivity",
    desc: "We decline more items than we stock. If it doesn't make our team uncomfortable with desire, it doesn't qualify.",
  },
  {
    number: "02",
    title: "Material Honesty",
    desc: "Every product lists exactly what it is made of. We don't use the word 'premium' as a substitute for specifics.",
  },
  {
    number: "03",
    title: "Quiet Superiority",
    desc: "We don't shout. The objects speak. Those who know, know.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="bg-background min-h-screen">

        {/* ── Hero ── */}
        <section className="py-20 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">

              <ScrollReveal direction="up">
                <div>
                  <p className="font-display text-[10px] tracking-[0.3em] uppercase text-primary font-medium mb-4">
                    Est. 2019 — Obsidian Lab
                  </p>
                  <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl text-foreground uppercase leading-none mb-6">
                    About<br />LUMORA
                  </h1>
                  <p className="text-muted-foreground font-normal text-sm leading-relaxed max-w-md">
                    LUMORA was built on a single, possibly deranged premise: that most products
                    do not deserve to exist. We set out to find the ones that do, and to sell
                    them to people with the good taste — or at least the disposable income —
                    to appreciate them.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="right" delay={0.2}>
                <div className="aspect-square max-h-[380px] lg:max-h-[420px] overflow-hidden border border-border">
                  <img
                    src={IMG_MONOLITH}
                    alt="LUMORA Studio"
                    className="w-full h-full object-cover"
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ── Values ── */}
        <section className="py-20 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal direction="up">
              <h2 className="font-display font-black text-3xl sm:text-4xl text-foreground uppercase mb-12">
                What We Believe
              </h2>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-px bg-border">
              {VALUES.map((v) => (
                <ScrollReveal key={v.number} direction="up">
                  <div className="bg-background p-8">
                    <p className="font-display font-black text-5xl text-primary/20 mb-4">{v.number}</p>
                    <h3 className="font-display font-bold text-lg text-foreground uppercase mb-3">{v.title}</h3>
                    <p className="text-muted-foreground font-normal text-sm leading-relaxed">{v.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Team ── */}
        <section className="py-20 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal direction="up">
              <div className="mb-10">
                <p className="font-display text-[10px] tracking-[0.3em] uppercase text-primary font-medium mb-3">
                  The Responsible Parties
                </p>
                <h2 className="font-display font-black text-3xl sm:text-4xl text-foreground uppercase">
                  Our Team
                </h2>
              </div>
            </ScrollReveal>

            <StaggerReveal className="grid md:grid-cols-3 gap-8" staggerDelay={0.1} direction="up">
              {TEAM.map((member) => (
                <div key={member.name} className="border border-border">
                  <div className="aspect-square overflow-hidden bg-card">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover filter grayscale"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display font-bold text-base text-foreground uppercase">{member.name}</h3>
                    <p className="font-display text-xs tracking-widest uppercase text-primary font-medium mt-1 mb-3">{member.role}</p>
                    <p className="text-muted-foreground font-normal text-xs leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              ))}
            </StaggerReveal>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <ScrollReveal direction="up">
              <h2 className="font-display font-black text-3xl sm:text-4xl text-foreground uppercase mb-4">
                Ready to surrender?
              </h2>
              <p className="text-muted-foreground font-normal text-sm mb-8">
                The collection awaits. Your wallet is already nervous.
              </p>
              <Link to="/products">
                <button className="bg-primary text-primary-foreground font-display font-medium tracking-widest uppercase text-sm px-10 py-3 hover:bg-primary/90 transition-colors">
                  Browse Collections
                </button>
              </Link>
            </ScrollReveal>
          </div>
        </section>

      </main>
    </>
  );
}
