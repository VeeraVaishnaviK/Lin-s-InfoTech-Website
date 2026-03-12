import Hero from "@/components/Hero";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Services Highlight Placeholder */}
      <section id="services" className="py-20 bg-background">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-12">
            Our <span className="text-primary">Capabilities</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-8 rounded-3xl text-left">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-6">
                <span className="text-primary text-2xl font-bold">01</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">AI Development</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Custom LLMs, intelligent agents, and RAG pipelines tailored for your business data.
              </p>
            </div>
            <div className="glass-card p-8 rounded-3xl text-left border-primary/20">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-6">
                <span className="text-primary text-2xl font-bold">02</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Web Engineering</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                High-performance Next.js 14 applications with seamless UI/UX and motion design.
              </p>
            </div>
            <div className="glass-card p-8 rounded-3xl text-left">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-6">
                <span className="text-primary text-2xl font-bold">03</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Process Automation</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Intelligent workflows that eliminate manual overhead and optimize production.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us / AI Tools Redirect Section Placeholder */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-primary/5 skewed-bg pointer-events-none" />
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
              Why <span className="text-primary">Lin's InfoTech</span>?
            </h2>
            <p className="text-white/60 mb-8 leading-relaxed">
              We don't just write code; we engineer intelligence. By leveraging
              Google's Gemini 1.5 Flash, we build systems that understand your
              business as well as you do.
            </p>
            <ul className="space-y-4">
              {["Premium Design Aesthetics", "AI-First Infrastructure", "Scalable Enterprise Architecture"].map(item => (
                <li key={item} className="flex items-center gap-3 text-white/80">
                  <div className="w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_rgba(227,0,15,0.8)]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="glass-card p-2 rounded-[2.5rem] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <img
              src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800"
              alt="AI Concept"
              className="rounded-[2.3rem] w-full object-cover aspect-video grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>
      </section>
    </>
  );
}
