import { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Mail, Phone, Code, Brain, Database, Cpu, BookOpen, Monitor,
  ChevronDown, GraduationCap, Briefcase, Github, Terminal,
  BarChart3, Bot, Layers, Download
} from "lucide-react";
import profilePhoto from "@/assets/profile-photo.jpeg";

const NAV_ITEMS = ["Home", "About", "Skills", "Internship", "Projects", "Education", "Contact"];

const SKILLS_CATEGORIES = [
  {
    title: "Programming Languages",
    skills: [
      { name: "Java", icon: Code, color: "from-orange-500 to-red-500" },
      { name: "Python", icon: Brain, color: "from-blue-500 to-cyan-500" },
      { name: "C", icon: Monitor, color: "from-violet-500 to-purple-500" },
    ],
  },
  {
    title: "Database",
    skills: [
      { name: "SQL", icon: Database, color: "from-emerald-500 to-green-500" },
    ],
  },
  {
    title: "Technologies",
    skills: [
      { name: "Artificial Intelligence", icon: Cpu, color: "from-pink-500 to-rose-500" },
      { name: "Machine Learning", icon: Brain, color: "from-amber-500 to-yellow-500" },
      { name: "Data Analysis", icon: BarChart3, color: "from-teal-500 to-cyan-500" },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "GitHub", icon: Github, color: "from-gray-500 to-slate-500" },
      { name: "VS Code", icon: Terminal, color: "from-blue-600 to-indigo-500" },
    ],
  },
];

const PROJECTS = [
  {
    title: "Email Spam Detection",
    points: [
      "Built a Machine Learning model to classify emails as Spam or Not Spam",
      "Used Python, NLP techniques, and ML algorithms",
      "Implemented text preprocessing and feature extraction",
      "Achieved accurate spam prediction using training data",
    ],
    tags: ["Python", "NLP", "ML", "Scikit-learn"],
    gradient: "from-blue-600/20 to-cyan-600/20",
    border: "border-blue-500/30",
    icon: Mail,
  },
  {
    title: "Laptop Price Prediction",
    points: [
      "Developed a ML regression model to predict laptop prices",
      "Used Python, Pandas, NumPy, and Scikit-learn",
      "Performed data preprocessing and feature engineering",
      "Trained the model using historical laptop dataset",
    ],
    tags: ["Python", "Regression", "Scikit-learn", "Pandas"],
    gradient: "from-violet-600/20 to-purple-600/20",
    border: "border-violet-500/30",
    icon: Monitor,
  },
  {
    title: "Library Management System",
    points: [
      "Developed a CLI application in Java",
      "Features: Add books, remove books, search books",
      "Implemented file handling and input validation",
    ],
    tags: ["Java", "OOP", "CLI", "File I/O"],
    gradient: "from-emerald-600/20 to-green-600/20",
    border: "border-emerald-500/30",
    icon: BookOpen,
  },
  {
    title: "AI Study Companion",
    points: [
      "AI-based chatbot for exam preparation",
      "Implemented clustering and ML techniques",
      "Developed using Python and ML libraries",
    ],
    tags: ["Python", "AI", "Chatbot", "Clustering"],
    gradient: "from-rose-600/20 to-pink-600/20",
    border: "border-rose-500/30",
    icon: Bot,
  },
];

const EDUCATION_SUBJECTS = ["Data Structures", "Machine Learning", "Linear Algebra", "Embedded Systems"];

// Animated section wrapper
const AnimatedSection = ({ children, id, className = "" }: { children: React.ReactNode; id: string; className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section id={id} ref={ref} className={className}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </section>
  );
};

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <div className="text-center mb-14">
    <h2 className="text-3xl sm:text-4xl font-bold mb-4">{children}</h2>
    <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full" />
  </div>
);

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
    <div className="min-h-screen bg-[#0a0a1a] text-gray-100 font-sans overflow-x-hidden">
      {/* Navbar */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
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
          <button className="md:hidden text-gray-400 hover:text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0f0f2a]/95 backdrop-blur-xl border-t border-white/5 px-4 py-3 space-y-1"
          >
            {NAV_ITEMS.map((item) => (
              <button key={item} onClick={() => scrollTo(item)} className="block w-full text-left px-4 py-2.5 rounded-lg text-sm text-gray-300 hover:bg-white/5 hover:text-white transition">
                {item}
              </button>
            ))}
          </motion.div>
        )}
      </motion.nav>

      {/* Hero */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-[#0a0a1a] to-purple-900/20" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 p-[3px] shadow-2xl shadow-blue-500/30"
          >
            <img src={profilePhoto} alt="Sujoy Barik" className="w-full h-full rounded-full object-cover" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl sm:text-6xl font-extrabold mb-4 leading-tight"
          >
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Sujoy Barik
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-lg sm:text-xl text-gray-400 mb-6 max-w-xl mx-auto leading-relaxed"
          >
            Computer Science Student &bull; AI & ML Enthusiast &bull; Software Developer
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            className="text-base text-gray-500 mb-10 max-w-lg mx-auto leading-relaxed"
          >
            Hello! I am a passionate Computer Science student with skills in Java, Python, SQL, and C. I enjoy building projects related to AI, ML, and software development.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button onClick={() => scrollTo("Projects")} className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all hover:-translate-y-0.5">
              View Projects
            </button>
            <button onClick={() => scrollTo("Contact")} className="px-8 py-3.5 border border-gray-700 text-gray-300 rounded-xl font-semibold hover:bg-white/5 hover:border-gray-500 transition-all hover:-translate-y-0.5">
              Contact Me
            </button>
          </motion.div>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            onClick={() => scrollTo("About")}
            className="mt-16 animate-bounce text-gray-500 hover:text-blue-400 transition"
          >
            <ChevronDown className="w-6 h-6 mx-auto" />
          </motion.button>
        </div>
      </section>

      {/* About */}
      <AnimatedSection id="about" className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <SectionHeading>
            About <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Me</span>
          </SectionHeading>
          <div className="bg-[#11112a]/80 border border-white/5 rounded-2xl p-8 sm:p-12 backdrop-blur">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 shrink-0 rounded-xl bg-blue-500/15 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Who I Am</h3>
                <p className="text-gray-400 leading-relaxed text-[15px] mb-4">
                  I am Sujoy Barik, a Computer Science student interested in Artificial Intelligence, Machine Learning, and software development. I have programming knowledge in Java, Python, SQL, and C.
                </p>
                <p className="text-gray-400 leading-relaxed text-[15px]">
                  I completed an AI & Machine Learning internship at Interslite using Python, where I worked with datasets, machine learning models, and data preprocessing techniques. I enjoy learning new technologies and building innovative projects.
                </p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Skills */}
      <AnimatedSection id="skills" className="py-24 px-4 bg-[#0d0d22]/50">
        <div className="max-w-5xl mx-auto">
          <SectionHeading>
            My <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Skills</span>
          </SectionHeading>
          <div className="space-y-10">
            {SKILLS_CATEGORIES.map((cat, catIdx) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, x: catIdx % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: catIdx * 0.1 }}
              >
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  {cat.title}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {cat.skills.map((skill, i) => (
                    <motion.div
                      key={skill.name}
                      whileHover={{ scale: 1.05, y: -4 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="group bg-[#11112a]/80 border border-white/5 rounded-2xl p-6 text-center hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-900/10 transition-colors"
                    >
                      <div className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br ${skill.color} p-[1px]`}>
                        <div className="w-full h-full rounded-xl bg-[#11112a] flex items-center justify-center">
                          <skill.icon className="w-6 h-6 text-gray-300 group-hover:text-white transition" />
                        </div>
                      </div>
                      <h4 className="font-semibold text-sm text-gray-200">{skill.name}</h4>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Internship */}
      <AnimatedSection id="internship" className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <SectionHeading>
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Internship</span> / Experience
          </SectionHeading>
          <div className="bg-[#11112a]/80 border border-white/5 rounded-2xl p-8 sm:p-12 backdrop-blur relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/5 rounded-full blur-2xl" />
            <div className="relative flex items-start gap-4">
              <div className="w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">AI & Machine Learning Intern</h3>
                <p className="text-blue-400 font-medium mb-4">Interslite</p>
                <ul className="space-y-2 text-gray-400 text-[15px]">
                  {[
                    "Worked on AI and ML projects using Python",
                    "Performed data preprocessing and model training",
                    "Implemented machine learning algorithms",
                    "Analyzed datasets and built predictive models",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2 mt-5">
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
      </AnimatedSection>

      {/* Projects */}
      <AnimatedSection id="projects" className="py-24 px-4 bg-[#0d0d22]/50">
        <div className="max-w-6xl mx-auto">
          <SectionHeading>
            My <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Projects</span>
          </SectionHeading>
          <div className="grid md:grid-cols-2 gap-6">
            {PROJECTS.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className={`group bg-gradient-to-br ${project.gradient} border ${project.border} rounded-2xl p-7 backdrop-blur hover:shadow-2xl transition-shadow duration-300`}
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <project.icon className="w-6 h-6 text-gray-300" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{project.title}</h3>
                <ul className="space-y-1.5 mb-5">
                  {project.points.map((pt) => (
                    <li key={pt} className="text-gray-400 text-sm leading-relaxed flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-gray-500 mt-2 shrink-0" />
                      {pt}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-white/5 text-gray-300 border border-white/10">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Education */}
      <AnimatedSection id="education" className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <SectionHeading>
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Education</span>
          </SectionHeading>
          <div className="bg-[#11112a]/80 border border-white/5 rounded-2xl p-8 sm:p-12 backdrop-blur relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-500/5 rounded-full blur-2xl" />
            <div className="relative flex items-start gap-4">
              <div className="w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Bachelor of Technology (B.Tech)</h3>
                <p className="text-cyan-400 font-medium mb-5">Computer Science and Engineering</p>
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-3">Relevant Subjects</h4>
                <div className="grid grid-cols-2 gap-2">
                  {EDUCATION_SUBJECTS.map((subj) => (
                    <span key={subj} className="flex items-center gap-2 text-gray-400 text-[15px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                      {subj}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Contact */}
      <AnimatedSection id="contact" className="py-24 px-4 bg-[#0d0d22]/50">
        <div className="max-w-4xl mx-auto">
          <SectionHeading>
            Get In <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Touch</span>
          </SectionHeading>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { href: "tel:9064409304", icon: Phone, label: "Phone", value: "9064409304", grad: "from-blue-600 to-cyan-500", shadow: "shadow-blue-500/20", hover: "group-hover:text-blue-400" },
              { href: "mailto:sujoybarik924@gmail.com", icon: Mail, label: "Email", value: "sujoybarik924@gmail.com", grad: "from-purple-600 to-pink-500", shadow: "shadow-purple-500/20", hover: "group-hover:text-purple-400" },
            ].map((c) => (
              <motion.a
                key={c.label}
                href={c.href}
                whileHover={{ scale: 1.03, y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group bg-[#11112a]/80 border border-white/5 rounded-2xl p-8 flex items-center gap-5 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-900/10 transition-colors"
              >
                <div className={`w-14 h-14 shrink-0 rounded-xl bg-gradient-to-br ${c.grad} flex items-center justify-center shadow-lg ${c.shadow}`}>
                  <c.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">{c.label}</p>
                  <p className={`text-lg font-semibold text-white ${c.hover} transition break-all`}>{c.value}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Footer */}
      <footer className="py-8 border-t border-white/5 text-center">
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Sujoy Barik. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default Portfolio;
