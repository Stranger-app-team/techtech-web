import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight, Users, Shield, DollarSign, MapPin, Phone, Mail, ShieldCheck, Network, IndianRupee, Settings } from 'lucide-react';
import TechTechLogo from "./assets/TechTechLogo.png";
import design from './assets/design.png';
import PixelBG from "./assets/pixel-bg.png";
import { motion } from 'framer-motion';
import CombinedBG from './assets/Footer.png'
import groupPng from './assets/Group.png'; // The crowd/group silhouette
import vectorPng from './assets/Vector.png'; // The gear/vector icon
import pricingPng from './assets/Rupees.svg';
import usersIcon from './assets/users.svg';
import  DNA from './assets/DNA.png';


// FadeIn Component
const FadeIn = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// Counter Component
const Counter = ({ end }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;

    let startTime = null;
    const duration = 2000;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));
      if (progress < 1) window.requestAnimationFrame(step);
    };

    window.requestAnimationFrame(step);
  }, [inView, end]);

  return <span ref={ref}>{count}</span>;
};


const PlexusBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.8 + 1,
    }));

    let animationFrame;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(94,234,212,0.7)";
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dist = Math.hypot(p.x - q.x, p.y - q.y);

          if (dist < 130) {
            ctx.strokeStyle = `rgba(94,234,212,${0.15 *
              (1 - dist / 130)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
    />
  );
};
const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (!el) return;

  const yOffset = -120; // fixed navbar offset
  const y =
    el.getBoundingClientRect().top + window.pageYOffset + yOffset;

  window.scrollTo({ top: y, behavior: "smooth" });
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "HOME", id: "home" },

    { label: "TECHNOLOGIES", id: "technologies" },
    { label: "ABOUT", id: "about" },
    // { label: "SERVICES", id: "services" },
    { label: "CONTACT US", id: "contact" },
  ];

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl flex items-center justify-between">
      {/* Main Navbar */}
      <div className="flex-1 bg-[#0a0a0a]/40 backdrop-blur-xl border border-gray-200/30 rounded-full px-8 py-2 flex items-center justify-between shadow-lg">
        <img src={TechTechLogo} className="h-8" alt="TechTech" />

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-sm text-white uppercase tracking-wider">
          {navItems.map((item) => (
            <li
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="hover:text-cyan-400 cursor-pointer transition-colors"
            >
              {item.label}
            </li>
          ))}
        </ul>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* CTA Button */}
      <div className="ml-4 hidden md:block">
        <button
          onClick={() => scrollToSection("contact")}
          className="bg-[#0a0a0a]/40 backdrop-blur-xl border border-gray-200/30 rounded-full px-8 py-2 text-white shadow-lg hover:text-cyan-400 transition-colors"
        >
          GET IN TOUCH
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[90%] bg-[#0a0a0a]/90 backdrop-blur-xl border border-gray-200/20 rounded-2xl p-6 md:hidden shadow-xl">
          <ul className="flex flex-col gap-4 text-white text-sm uppercase tracking-wider">
            {navItems.map((item) => (
              <li
                key={item.id}
                onClick={() => {
                  scrollToSection(item.id);
                  setIsOpen(false);
                }}
                className="hover:text-cyan-400 cursor-pointer transition-colors"
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};


// Hero Section
const Hero = () => {
  return (
    <header id="home" className="relative min-h-screen bg-black overflow-hidden">
      <img
        src={PixelBG}
        className="absolute inset-0 w-full h-full object-cover"
        alt="Pixel Background"
      />

      <div className="absolute inset-0 bg-linear-to-b from-black/0 via-black/10 to-black/20" />

      <div className="relative z-10 pt-50 text-center px-15">
        <img src={TechTechLogo} className="h-32 mx-auto mb-6" alt="Hero Logo" />

        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          CRAFTING DIGITAL EXCELLENCE FOR YOUR BUSINESS

        </h1>

        <p className="text-gray-400 max-w-3xl mx-auto">
          Next-Gen Digital Solutions | Enterprise-Grade Engineering | Scalable Ecosystems
        </p>

        <p className="mt-10 mb-10 w-full px-4 font-mono text-gray-700 text-sm tracking-[0.25em] md:tracking-[0.45em] text-center whitespace-nowrap overflow-hidden text-ellipsis">
          01010100011001010110001101101000 01010100011001010110001101101000</p>

        <section className="relative overflow-hidden mt-24">

          {/* FULL NETWORK BACKGROUND */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <CoreNetworkBackground />
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 max-w-7xl mx-auto items-center">

            {/* IMAGE SECTION */}
            <div
              className="order-1 relative overflow-hidden rounded-3xl group"
              style={{ perspective: "1200px" }}
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-linear-to-br from-black/40 via-black/20 to-black/60 z-10 pointer-events-none" />

              {/* Rotating Image */}
              <div className="relative">
                <img
                  src={design}
                  alt="Design"
                  className="h-72 md:h-136 mx-auto animate-[spin_30s_linear_infinite]"
                />
              </div>
            </div>

            {/* TEXT SECTION */}
            <div className="order-2 text-left">
              <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white text-center md:text-left">
                Innovating<br />the Future of<br />Technology
              </h2>


              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-all duration-300">
                <p className="text-gray-200 leading-relaxed">
                  Based in the tech hub of Pune, TechTech isn't just a development agency—we are your partners in digital transformation. We fuse cutting-edge code with intuitive design to build digital legacies that are fast, secure, and infinitely scalable.
                </p>
              </div>
            </div>

          </div>
        </section>



      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
      `}</style>
    </header>
  );
};

const CoreNetworkBackground = () => {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // INCREASED: length to 65 for more density, and speed (vx, vy) for better movement
    const points = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.6, // Increased speed from 0.2 to 0.6
      vy: (Math.random() - 0.5) * 0.6,
    }));

    let frame;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      points.forEach((p, i) => {
        // Update positions
        p.x += p.vx;
        p.y += p.vy;

        // Bounce logic with padding to prevent sticking
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // INCREASED: Dot size from 1.5 to 3.5
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3.5, 0, Math.PI * 2); 
        ctx.fillStyle = "rgba(148, 242, 233, 0.8)"; // Increased opacity
        ctx.fill();

        for (let j = i + 1; j < points.length; j++) {
          const q = points[j];
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          
          // INCREASED: Connection distance from 140 to 180
          if (d < 180) {
            // INCREASED: Line width based on proximity
            ctx.lineWidth = 2.5 * (1 - d / 180); 
            ctx.strokeStyle = `rgba(148,242,233,${0.4 * (1 - d / 180)})`; // Increased opacity
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      });

      frame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
    />
  );
};

const CoreCompetenciesWithStats = () => {
  const competencies = [
    {
      title: "Full-Cycle Web Engineering",
      desc: "We move beyond static pages to build living, breathing SaaS platforms and complex web architectures.",
      vision: "High-concurrency web apps, microservices architecture, and robust APIs designed for heavy loads and smooth scaling.",
    },
    {
      title: "Immersive UI/UX Design",
      desc: "We don't just design screens; we craft user journeys. Our design philosophy bridges the gap between human psychology and digital interaction.",
      vision: "Design systems, wireframing to high-fidelity prototyping, and friction-free user experiences that drive retention.",
    },
    {
      title: "Cross-Platform Mobile Ecosystems",
      desc: "Delivering native-performance apps across iOS and Android from a single, unified code strategy.",
      vision: "Flutter/React Native expertise, seamless device integration, and mobile-first logic ensuring your product lives in your user's pocket.",
    },
    {
      title: "Data-Driven Growth Engines",
      desc: "Marketing minus the guesswork. We utilize analytics and algorithmic strategies to position your brand in front of the right eyes.",
      vision: "SEO/SEM optimization, conversion rate optimization (CRO), and targeted social campaigns rooted in data science.",
    },
  ];

  const stats = [
    { number: 4500, suffix: "+", label: "Hours Deployed" },
    { number: 15, suffix: "+", label: "Partner Startups" },
    { number: 99, suffix: "%", label: "Client Retention" },
    { number: 30, suffix: "+", label: "Countries Served" },
  ];

  return (
    <section id="technologies" className="relative py-12 overflow-hidden">

      {/* Gradient Base */}
      <div className="absolute inset-0 bg-linear-to-b from-black to-[#105A67]" />

      {/* Generated Network */}
      <CoreNetworkBackground />

      {/* Soft Contrast Overlay */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8 mt-20">
            Core Competencies (Our Stack)
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto mb-10">
          {competencies.map((c, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div className="
        rounded-2xl
        px-6 py-10
        min-h-65
        bg-white/8 backdrop-blur-xl
        border border-white/20
        hover:bg-white/18
        transition-all hover:-translate-y-1
      ">
                <h3 className="text-xl font-bold text-white mb-3">{c.title}</h3>
                <p className="text-gray-300 text-sm mb-4">{c.desc}</p>
                <p className="text-white text-sm font-semibold">The Vibe :</p>
                <p className="text-gray-200 text-sm">{c.vision}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={400}>
          <p className="text-center text-xl md:text-2xl text-gray-300 bold max-w-4xl mx-auto mt-10 mb-12">
            "We don't just build websites; we build digital legacies that stand the test of time."
          </p>
        </FadeIn>

        {/* Stats Wrapper with SINGLE border */}
        <div className="max-w-5xl mx-auto rounded-3xl border border-white/20 bg-white/5 backdrop-blur-xl p-6">

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="text-center p-4 rounded-2xl cursor-pointer group">
  <h3 className="text-4xl font-bold mb-2 text-white group-hover:text-cyan-500 transition-colors duration-300">
    <Counter end={s.number} />
    {s.suffix}
  </h3>
  <p className="text-xs uppercase tracking-wider text-gray-200">
    {s.label}
  </p>
</div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};


/* ================= COMBINED WHY US + DNA ================= */
const WhyUsAndDNA = () => {
  const features = [
  {
  title: "Exclusive Teams",
  desc: "Dedicated squads flexibly tailored to your project needs.",
  icon: <img src={usersIcon} alt="Teams" className="w-55 h-auto opacity-70" />,
},
   {
  title: "Security",
  desc: "Enterprise-grade security protocols ensuring your data.",
  icon: (
    <img src={vectorPng} alt="Security" className="w-40 h-auto object-contain opacity-80"
      style={{ filter: 'sepia(100%) inherit-hue saturate(500%) hue-rotate(130deg)' }} 
    />
  ),
},
{
  title: "Community",
  desc: "Access to a vast network of experts and resources.",
  icon: (
    <img src={groupPng} alt="Community" className="w-55 h-auto object-contain opacity-70" 
    />
  ),
},
   {
  title: "Pricing",
  desc: "Transparent, flexible pricing that fits your budget.",
  icon: <img src={pricingPng} alt="Pricing Icon" className="w-65 h-auto opacity-70 object-contain" />,
},
  ];
  return (
    <section id="about" className="relative py-12 overflow-hidden">

      {/* Gradient Base */}
      <div className="absolute inset-0 bg-linear-to-b  from-[#105A67] 
  via-black/10 to-[#0B3F47]" />


      <CoreNetworkBackground /> {/* Your geometric plexus network */}
    
      {/* Plexus Particle Web */}
      <PlexusBackground />

      {/* Contrast Overlay */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-10">
            <p className="text-white font-bold text-md tracking-[0.3em] mb-4">
              WHY US
            </p>
            <h2 className="text-4xl md:text-6xl font-bold text-white">
              Empowering Success Through
              <br />
              Patient, High-Impact Solutions.
            </h2>
          </div>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-14">
          {features.map((f, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div className="relative min-h-65 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/30 px-4 py-3 transition-all hover:-translate-y-2 hover:bg-white/10">
                <h3 className="text-xl font-bold text-white mb-4">
                  {f.title}
                </h3>
                <p className="text-gray-200">{f.desc}</p>
                <div className="absolute bottom-0.5 right-1 opacity-60">
                  {f.icon}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

       <div className="relative py-20">
  {/* DNA Background */}
<img src={DNA} alt="DNA"
    className="absolute top-0 left-0 w-full h-full object-cover opacity-20 -z-10"
  />

  <FadeIn>
    <h2 className="text-4xl font-bold text-white text-center mt-6 mb-12">
      OUR DNA
    </h2>
  </FadeIn>

  <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
    <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/30 p-8">
      <h3 className="text-xl font-bold text-white mb-3">
        Agile Squad Model
      </h3>
      <p className="text-gray-200">
        We believe great software is born from synergy.
        Our "Exclusive Teams" integrate seamlessly with your vision,
        operating on agile sprints to deliver rapid iterations.
      </p>
    </div>

    <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/30 p-8">
      <h3 className="text-xl font-bold text-white mb-3">
        DevSecOps Mindset
      </h3>
      <p className="text-gray-200">
        Security isn't an afterthought; it's baked into our code.
        We deploy enterprise-grade security protocols to protect your IP and user data.
      </p>
    </div>
  </div>
</div>


        <FadeIn delay={300}>
          <p className="
    text-center text-2xl text-gray-300 font-bold
    max-w-4xl mx-auto mt-12
    min-h-55
    px-10 py-12
    rounded-2xl
    bg-white/7
    backdrop-blur-xl
    border border-gray-600/30
    flex items-center justify-center
  ">
            “We aren't just shipping code; we are building” <br />
            the digital infrastructure of tomorrow.
          </p>
        </FadeIn>

      </div>
    </section>
  );
};

/* ================= CTA ================= */
const CTAFooter = () => (
  <section id="contact" className="relative overflow-hidden py-10">

    {/* Base Gradient + Network Background */}
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-linear-to-t  from-black/10 via-[#105A67] to-[#0B3F47]" />
      <CoreNetworkBackground /> {/* Your geometric plexus network */}
    </div>

    {/* Pixel / Digital Noise Layer */}
    <div
      className="absolute inset-0 opacity-30"
      style={{
        backgroundImage: `
          radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px),
          radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)
        `,
        backgroundSize: "24px 24px, 48px 48px",
        backgroundPosition: "0 0, 12px 12px",
      }}
    />

    {/* Contrast Overlay */}
    <div className="absolute inset-0 bg-black/35" />

    {/* Content */}
    <div className="relative z-10 container mx-auto px-6 text-center">
      <FadeIn>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
          Ready to deploy your vision?
          <br />
          Let's build something{" "}
          <span className="text-cyan-400">scalable</span>.
        </h2>

      
        <p className="mt-10 mb-10 w-full px-4 font-mono text-gray-700 text-sm tracking-[0.25em] md:tracking-[0.45em] text-center whitespace-nowrap overflow-hidden text-ellipsis">
          01010100011001010110001101101000 01010100011001010110001101101000</p>
      </FadeIn>

      <div className="grid md:grid-cols-3 gap-8 mb-10 text-left">

        {/* Company */}
        <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/20">
          <h4 className="text-white font-bold mb-4">Company</h4>
          <div className="space-y-2 text-sm text-gray-300">
            <a className="block hover:text-cyan-400">Home</a>
            <a className="block hover:text-cyan-400">About</a>
            <a className="block hover:text-cyan-400">Technologies</a>
            <a className="block hover:text-cyan-400">Services</a>
          </div>
        </div>

        {/* Legal */}
        <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/20">
          <h4 className="text-white font-bold mb-4">Legal</h4>
          <div className="space-y-2 text-sm text-gray-300">
            <a className="block hover:text-cyan-400">Privacy Policy</a>
            <a className="block hover:text-cyan-400">Terms of Service</a>
            <a className="block hover:text-cyan-400">Cookie Policy</a>
            <a className="block hover:text-cyan-400">Careers</a>
          </div>
        </div>

        {/* Contact */}
        <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/20 shadow-lg">
          <h4 className="text-white font-bold mb-4">Contact Us</h4>
          <div className="space-y-3 text-sm text-gray-300">
            <div className="flex gap-2">
              <div className="mt-1 p-1 border border-cyan-400 rounded-full flex items-center justify-center">
                <MapPin size={16} className="text-cyan-400" />
              </div>


              <span>Pimple Nilakh, Pune, Maharashtra 411057</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="p-1 border border-cyan-400/60 rounded-full flex items-center justify-center">
                <Phone size={16} className="text-cyan-400" />
              </div>
              <span>+91 9619555596</span>
            </div>

            <div className="flex items-start gap-2">
              <div className="p-1 border border-cyan-400/60 rounded-full flex items-center justify-center">
                <Mail size={16} className="text-cyan-400" />
              </div>
              <span>tech@techtech.in</span>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="flex flex-col items-center gap-2">
        <img src={TechTechLogo} className="w-70 mb-4" />
        <p className="text-gray-200 text-xs">© 2024 TechTech. All Rights Reserved.</p>
      </div>
    </div>
  </section>
);

/* ================= APP ================= */
const App = () => (
  <div className="bg-black text-white">
    <Navbar />
    <Hero />
    <CoreCompetenciesWithStats />
    <WhyUsAndDNA />
    <CTAFooter />
  </div>
);

export default App;