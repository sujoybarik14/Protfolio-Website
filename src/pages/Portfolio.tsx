import { useState, useEffect } from "react";
import { Mail, Phone, Code, Brain, Database, Cpu, BookOpen, Monitor, ChevronDown, ExternalLink, GraduationCap, Briefcase } from "lucide-react";

const NAV_ITEMS = ["Home", "About", "Skills", "Internship", "Projects", "Contact"];

const SKILLS = [
  { name: "Java", icon: Code, color: "from-orange-500 to-red-500" },
  { name: "Python", icon: Brain, color: "from-blue-500 to-cyan-500" },
  { name: "C Programming", icon: Monitor, color: "from-violet-500 to-purple-500" },
  { name: "SQL", icon: Database, color: "from-emerald-500 to-green-500" },
  { name: "Artificial Intelligence", icon: Cpu, color: "from-pink-500 to-rose-500" },
  { name: "Machine Learning", icon: Brain, color: "from-amber-500 to-yellow-500" },
];

const PROJECTS = [
  {
    title: "Email Spam Detection",
    description: "Machine learning model that classifies emails as spam or not spam using Python and NLP techniques.",
    tags: ["Python", "NLP", "ML", "Scikit-learn"],
    gradient: "from-blue-600/20 to-cyan-600/20",
    border: "border-blue-500/30",
    icon: Mail,
  },
  {
    title: "Laptop Price Prediction",
    description: "Regression-based machine learning model that predicts laptop prices using Python and Scikit-learn.",
    tags: ["Python", "Regression", "Scikit-learn", "Data Analysis"],
    gradient: "from-violet-600/20 to-purple-600/20",
    border: "border-violet-500/30",
    icon: Monitor,
  },
  {
    title: "Library Management System",
    description: "Command-line Java application for adding, removing, and searching books efficiently.",
    tags: ["Java", "OOP", "CLI", "Data Structures"],
    gradient: "from-emerald-600/20 to-green-600/20",
    border: "border-emerald-500/30",
    icon: BookOpen,
  },
];

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState("Home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = NAV_ITEMS.map((item) => {
        const el = document.getElementById(item.toLowerCase());
        if (!el) return { name: item, top: Infinity };
        return { name: item, top: Math.abs(el.getBoundingClientRect().top) };
      });
      const closest = sections.reduce((a, b) => (a.top < b.top ? a : b));
      setActiveSection(closest.name);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-gray-100 font-sans">
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-[#0a0a1a]/90 backdrop-blur-xl shadow-2xl shadow-blue-900/10" : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            SB
          </span>
          <div className="hidden md:flex gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeSection === item
                    ? "bg-blue-500/20 text-blue-400"
                    : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
          <button
            className="md:hidden text-gray-400 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0f0f2a]/95 backdrop-blur-xl border-t border-white/5 px-4 py-3 space-y-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className="block w-full text-left px-4 py-2.5 rounded-lg text-sm text-gray-300 hover:bg-white/5 hover:text-white transition"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-[#0a0a1a] to-purple-900/20" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/8 rounded-full blur-3xl" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <div className="w-28 h-28 mx-auto mb-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-4xl font-bold text-white shadow-2xl shadow-blue-500/30">
            SB
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold mb-4 leading-tight">
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Sujoy Barik
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 mb-10 max-w-xl mx-auto leading-relaxed">
            Computer Science Student &bull; AI & ML Enthusiast &bull; Software Developer
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollTo("Projects")}
              className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all hover:-translate-y-0.5"
            >
              View Projects
            </button>
            <button
              onClick={() => scrollTo("Contact")}
              className="px-8 py-3.5 border border-gray-700 text-gray-300 rounded-xl font-semibold hover:bg-white/5 hover:border-gray-500 transition-all hover:-translate-y-0.5"
            >
              Contact Me
            </button>
          </div>
          <button onClick={() => scrollTo("About")} className="mt-16 animate-bounce text-gray-500 hover:text-blue-400 transition">
            <ChevronDown className="w-6 h-6 mx-auto" />
          </button>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            About <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Me</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full mb-12" />
          <div className="bg-[#11112a]/80 border border-white/5 rounded-2xl p-8 sm:p-12 backdrop-blur">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 shrink-0 rounded-xl bg-blue-500/15 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Who I Am</h3>
                <p className="text-gray-400 leading-relaxed text-[15px]">
                  I am a Computer Science student with programming skills in Java, Python, C, and SQL. I have completed an AI & Machine Learning internship at Interslite using Python. I enjoy building machine learning projects and developing intelligent software solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-24 px-4 bg-[#0d0d22]/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            My <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Skills</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full mb-12" />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
            {SKILLS.map((skill) => (
              <div
                key={skill.name}
                className="group bg-[#11112a]/80 border border-white/5 rounded-2xl p-6 text-center hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-900/10 transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br ${skill.color} p-[1px]`}>
                  <div className="w-full h-full rounded-xl bg-[#11112a] flex items-center justify-center">
                    <skill.icon className="w-6 h-6 text-gray-300 group-hover:text-white transition" />
                  </div>
                </div>
                <h3 className="font-semibold text-sm sm:text-base text-gray-200">{skill.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internship */}
      <section id="internship" className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Internship</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full mb-12" />
          <div className="bg-[#11112a]/80 border border-white/5 rounded-2xl p-8 sm:p-12 backdrop-blur relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/5 rounded-full blur-2xl" />
            <div className="relative flex items-start gap-4">
              <div className="w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">AI & Machine Learning Intern</h3>
                <p className="text-blue-400 font-medium mb-3">Interslite</p>
                <p className="text-gray-400 leading-relaxed text-[15px]">
                  Worked with Python to build machine learning models, perform data preprocessing, and analyze datasets. Gained hands-on experience with real-world AI applications and data pipelines.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {["Python", "Machine Learning", "Data Preprocessing", "Data Analysis"].map((tag) => (
                    <span key={tag} className="px-3 py-1 text-xs font-medium rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-24 px-4 bg-[#0d0d22]/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            My <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Projects</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full mb-12" />
          <div className="grid md:grid-cols-3 gap-6">
            {PROJECTS.map((project) => (
              <div
                key={project.title}
                className={`group bg-gradient-to-br ${project.gradient} border ${project.border} rounded-2xl p-6 backdrop-blur hover:shadow-2xl transition-all duration-300 hover:-translate-y-2`}
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <project.icon className="w-6 h-6 text-gray-300" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-5">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-white/5 text-gray-300 border border-white/10">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            Get In <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Touch</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full mb-12" />
          <div className="grid sm:grid-cols-2 gap-6">
            <a
              href="tel:9064409304"
              className="group bg-[#11112a]/80 border border-white/5 rounded-2xl p-8 flex items-center gap-5 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-900/10 transition-all hover:-translate-y-1"
            >
              <div className="w-14 h-14 shrink-0 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Phone</p>
                <p className="text-lg font-semibold text-white group-hover:text-blue-400 transition">9064409304</p>
              </div>
            </a>
            <a
              href="mailto:sujoybarik924@gmail.com"
              className="group bg-[#11112a]/80 border border-white/5 rounded-2xl p-8 flex items-center gap-5 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-900/10 transition-all hover:-translate-y-1"
            >
              <div className="w-14 h-14 shrink-0 rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Email</p>
                <p className="text-lg font-semibold text-white group-hover:text-purple-400 transition break-all">sujoybarik924@gmail.com</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/5 text-center">
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Sujoy Barik. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Portfolio;
