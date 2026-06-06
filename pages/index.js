import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import Aurora from '../components/Aurora'
import { MorphingCardStack } from '../components/MorphingCardStack'
import CinematicThemeSwitcher from '../components/CinematicThemeSwitcher'
import DownloadCVButton from '../components/DownloadCVButton'
import AnimatedContactButton from '../components/AnimatedContactButton'
import Typewriter from '../components/Typewriter'
import HeroSection from '../components/HeroSection'
import { HeroHighlight, Highlight } from '../components/ui/hero-highlight'
import ProjectsSection from '../components/ProjectsSection'

export default function Home() {
  const [expandedService, setExpandedService] = useState(null)
  const [showCourseDetails, setShowCourseDetails] = useState(false)
  const [activeIbmPhase, setActiveIbmPhase] = useState(1)
  const [theme, setTheme] = useState('dark')

  const ibmPhases = [
    {
      id: 1,
      title: "Phase 1: Foundations",
      subtitle: "AI & Python Basics",
      description: "Getting started with core AI concepts, prompt engineering, and Python programming fundamentals.",
      courses: [1, 2, 3, 4]
    },
    {
      id: 2,
      title: "Phase 2: Analytics & ML",
      subtitle: "Data & Model Engineering",
      description: "Developing Flask APIs, cleaning datasets, analyzing data with Pandas/NumPy, and training machine learning models.",
      courses: [5, 6, 7, 8]
    },
    {
      id: 3,
      title: "Phase 3: Deep Learning",
      subtitle: "Neural Networks & NLP",
      description: "Deep learning models, Transformers architecture, text embeddings, and foundational NLP language models.",
      courses: [9, 10, 11, 12]
    },
    {
      id: 4,
      title: "Phase 4: AI Agents",
      subtitle: "Fine-Tuning & Capstones",
      description: "Advanced model tuning, parameter efficient learning, building fully custom AI Agents, RAG, and LangChain integration.",
      courses: [13, 14, 15, 16]
    }
  ]

  const { scrollY: pageScrollY } = useScroll()
  const smoothScrollY = useSpring(pageScrollY, {
    stiffness: 65,  // Highly organic organic deceleration stiffness
    damping: 24,    // Well-damped with no overshoot oscillation
    restDelta: 0.001
  })
  const backgroundTextX = useTransform(smoothScrollY, [300, 1600], [-300, 300])

  const mobileIntroWords = [
    "Hi, I'm Mohammed Shaaz.",
    'Software Engineer - Frontend / Backend.',
    'I build production web applications.'
  ]



  useEffect(() => {
    if (typeof window === 'undefined') return

    const storedTheme = localStorage.getItem('theme')
    if (storedTheme === 'light' || storedTheme === 'dark') {
      setTheme(storedTheme)
    }

    const handleThemeChange = (event) => {
      const nextTheme = event.detail
      if (nextTheme === 'light' || nextTheme === 'dark') {
        setTheme(nextTheme)
      }
    }

    const handleStorage = (event) => {
      if (event.key === 'theme' && (event.newValue === 'light' || event.newValue === 'dark')) {
        setTheme(event.newValue)
      }
    }

    window.addEventListener('theme-change', handleThemeChange)
    window.addEventListener('storage', handleStorage)

    return () => {
      window.removeEventListener('theme-change', handleThemeChange)
      window.removeEventListener('storage', handleStorage)
    }
  }, [])

  useEffect(() => {
    if (typeof document === 'undefined') return

    const pageBg = theme === 'dark' ? '#0f0f0f' : '#f8f9fa'
    document.documentElement.style.backgroundColor = pageBg
    document.body.style.backgroundColor = pageBg
  }, [theme])

  // Lock scroll when modal is open
  useEffect(() => {
    if (showCourseDetails) {
      document.body.classList.add('modal-open')
      document.documentElement.classList.add('modal-open')
    } else {
      document.body.classList.remove('modal-open')
      document.documentElement.classList.remove('modal-open')
    }
    return () => {
      document.body.classList.remove('modal-open')
      document.documentElement.classList.remove('modal-open')
    }
  }, [showCourseDetails])

  const skillCategories = [
    {
      title: 'Programming Languages',
      icon: '/icons/prog.png',
      count: '7 technologies',
      skills: ['Python', 'JavaScript', 'HTML', 'CSS', 'SQL', 'C']
    },
    {
      title: 'Frameworks & Libraries',
      icon: '/icons/framework.png',
      count: '6 technologies',
      skills: ['React', 'Next.js', 'FastAPI', 'Apache Airflow', 'Pandas', 'NumPy']
    },
    {
      title: 'Tools & Platforms',
      icon: '/icons/tools.png',
      count: '6 technologies',
      skills: ['GitHub', 'VS Code', 'Power BI', 'Microsoft Excel', 'MongoDB', 'PostgreSQL']
    },
    {
      title: 'Machine Learning',
      icon: '/icons/ml.png',
      count: '3 technologies',
      skills: ['Supervised Learning', 'Model Evaluation', 'XGBoost']
    },
    {
      title: 'Data Analytics',
      icon: '/icons/data2.png',
      count: '3 technologies',
      skills: ['Matplotlib', 'Power BI', 'Excel', 'DAX', 'Power Query']
    },
    {
      title: 'Languages',
      icon: '/icons/lang.png',
      count: '3 languages',
      skills: ['English', 'Malayalam', 'Hindi']
    }
  ]

const services = [
  {
    id: 'data-analytics',
    title: '1. DATA ANALYST / JUNIOR DATA SCIENTIST',
    description: `I analyze data to uncover insights and build data-driven solutions. I specialize in:

• Exploratory Data Analysis (EDA) on large datasets
• Data cleaning, preprocessing, and feature engineering
• Creating visualizations using Matplotlib, Excel, Power BI
• Generating reports, dashboards, and decision-support insights
• Training and evaluating simple ML models for trend prediction

My internship at Shell strengthened my real-world analytics experience.`,
    image: '/data.jpg'
  },
  {
    id: 'machine-learning',
    title: '2. MACHINE LEARNING ENGINEER',
    description: `I build end-to-end machine learning solutions using Python and Scikit-learn. My experience includes:

• Training and evaluating models such as XGBoost, Random Forest, SVM
• Working with Pandas, NumPy, and real-world datasets
• Deploying ML models with FastAPI for real-time predictions
• Using SHAP for model explainability and insights
• Building prediction systems like health-risk models and student performance predictors

This role fits how I work: data → model → API → deployment.`,
    image: '/machine.jpg'
  },
  {
    id: 'full-stack',
    title: '3. FULL-STACK DEVELOPER',
    description: `I develop complete, production-ready web applications from frontend to backend. My strengths include:

• Building interfaces using React, Next.js, JavaScript
• Developing backends with FastAPI, Node.js, Express
• Implementing authentication, APIs, and cloud integration
• Working with Firebase, GitHub, and modern tooling
• Shipping full apps like AI Resume Builder, MedPrompt+, and AutoFlow

I'm comfortable with the entire development pipeline—from UX to API deployment.`,
    image: '/full.jpg'
  },
  {
    id: 'AI Engineer',
    title: '4. AI ENGINEER / GENERATIVE AI DEVELOPER',
    description: `I create AI-powered applications that use LLMs and automation. My experience includes:

• Integrating GPT, Claude, Gemini into real products
• Designing chatbots, assistants, and conversational workflows
• Working with RAG pipelines, embeddings, and PDF/image parsing
• Automating tasks using AI inside platforms like AutoFlow
• Building AI-driven features such as resume scoring, health interpretation, and workflow automation

This is one of my strongest areas, as I've built real AI systems used in full applications.`,
    image: '/ai.jpg'
  }
]

const stats = [
    {
    id: 'hackathons-won',
    label: 'Hackathons Won',
    value: '2',
    icon: '🏆',
    color: 'from-green-500/20 to-teal-500/20',
    borderColor: 'rgba(34, 197, 94, 0.3)',
    description: 'Competition victories'
  },
  { 
    id: 'internships',
    label: 'Internships Completed', 
    value: '4',
    icon: '💼',
    color: 'from-purple-500/20 to-pink-500/20',
    borderColor: 'rgba(168, 85, 247, 0.3)',
    description: 'Industry experience at top companies'
  },
    { 
    id: 'projects',
    label: 'Projects Completed', 
    value: '10+',
    icon: '🚀',
    color: 'from-blue-500/20 to-cyan-500/20',
    borderColor: 'rgba(59, 130, 246, 0.3)',
    description: 'Full-stack applications and ML models'
  },
  { 
    id: 'events',
    label: 'Hackathons / Events', 
    value: '5+',
    icon: '🏆',
    color: 'from-orange-500/20 to-red-500/20',
    borderColor: 'rgba(249, 115, 22, 0.3)',
    description: 'Competitive coding and innovation'
  }
];

const certifications = [
  {
    id: 1,
    title: 'Career Essentials in Generative AI',
    issuer: 'Microsoft + LinkedIn',
    date: '2024',
    icon: '/imojis/1.png',
    color: 'from-blue-500/20 to-cyan-500/20',
    borderColor: 'border-blue-500/30',
    certificateUrl: '/certificates/genai.pdf'
  },
  {
    id: 2,
    title: 'Introduction to Machine Learning',
    issuer: 'NPTEL',
    date: '2025',
    icon: '/imojis/3.png',
    color: 'from-purple-500/20 to-pink-500/20',
    borderColor: 'border-purple-500/30',
    certificateUrl: '/certificates/introduction to machine learning.pdf'
  },
  {
    id: 3,
    title: 'Data Analysis with Python',
    issuer: 'FreeCodeCamp',
    date: '2023',
    icon: '/imojis/2.png',
    color: 'from-green-500/20 to-teal-500/20',
    borderColor: 'border-green-500/30',
    certificateUrl: '/certificates/fcc.pdf'
  },
  {
    id: 4,
    title: 'Data Science for Engineers',
    issuer: 'NPTEL (Elite Grade)',
    date: '2024',
    icon: '/imojis/4.png',
    color: 'from-orange-500/20 to-red-500/20',
    borderColor: 'border-orange-500/30',
    certificateUrl: '/certificates/dfe.pdf'
  },
  {
    id: 5,
    title: 'Full Stack Development Bootcamp',
    issuer: 'Dev Town',
    date: '2024',
    icon: '/imojis/5.png',
    color: 'from-indigo-500/20 to-blue-500/20',
    borderColor: 'border-indigo-500/30',
    certificateUrl: '/certificates/devtown2.pdf'
  },
  {
    id: 6,
    title: 'Data Science Bootcamp',
    issuer: 'GeeksforGeeks',
    date: '2024',
    icon: '/imojis/6.png',
    color: 'from-yellow-500/20 to-orange-500/20',
    borderColor: 'border-yellow-500/30',
    certificateUrl: '/certificates/geek.pdf'
  },
  {
    id: 7,
    title: 'Master Data Analysis',
    issuer: 'Udemy',
    date: '2024',
    icon: '/imojis/7.png',
    color: 'from-red-500/20 to-pink-500/20',
    borderColor: 'border-red-500/30',
    description: 'Python, SQL, Power BI, AWS',
    certificateUrl: '/certificates/data.pdf'
  }
]

const internships = [
  {
    id: 1,
    company: 'Vaultofcodes',
    role: 'Full Stack Developer Intern',
    duration: 'Jan 25 - March 2025',
    icon: '💼',
    color: 'from-purple-500/20 to-indigo-500/20',
    borderColor: 'border-purple-500/30',
    achievements: [
      'Developed and deployed live applications (portfolio, recipe app, weather chatbot)',
      'Enhanced UI/UX with responsive design and GitHub version control',
      'Built end-to-end web solutions using modern frameworks'
    ]
  },
  {
    id: 2,
    company: 'Shell',
    role: 'Data Analytics & ML Intern',
    duration: 'July 25 - August 2025',
    icon: '⚡',
    color: 'from-yellow-500/20 to-orange-500/20',
    borderColor: 'border-yellow-500/30',
    achievements: [
      'Performed full EDA on carbon emissions dataset',
      'Trained predictive ML models and produced interactive analyses',
      'Delivered insights using Python-based visualization dashboards'
    ]
  },
  {
    id: 3,
    company: 'INFOSYS SPRINGBOARD',
    role: 'Data Analytics Intern',
    duration: 'October 2025 - December 2025',
    icon: '📊',
    color: 'from-green-500/20 to-teal-500/20',
    borderColor: 'border-green-500/30',
    achievements: [
      'Analyzed 6.7M+ flight records using Python and SQL to identify delay patterns across weather, carrier operations, and seasonal trends.',
      'Built analytical queries and feature engineering pipelines to investigate data issues and generate insights, identifying 7.4× higher winter cancellations and 2.8× holiday delay impact.',
      'Built DAX calculated measures for delay percentages and performance KPIs, presenting findings through data storytelling to highlight key operational inefficiencies for stakeholder reporting.'
    ]
  },
  {
    id: 4,
    company: 'SPRINGER CAPITAL',
    role: 'Data Engineering Intern',
    duration: 'January 2026 - April 2026',
    icon: '🛠️',
    color: 'from-cyan-500/20 to-blue-500/20',
    borderColor: 'border-cyan-500/30',
    achievements: [
      'Built and orchestrated 3+ end-to-end ETL pipelines using Python, Apache Airflow, and PostgreSQL, ingesting and processing structured data from multiple sources on a daily automated schedule',
      'Designed data transformation workflows converting raw CSV data into analytics-ready Parquet and SQL datasets (Bronze to Silver architecture)',
      'Implemented automated data validation and schema checks across 5+ pipeline stages, ensuring data quality and reliability with zero manual intervention through Airflow-scheduled execution'
    ]
  }
]

const ibmCourses = [
  { id: 1, name: 'Introduction to Artificial Intelligence (AI)', duration: '12 hours', grade: 'Not started', certificateUrl: '/ibm/genai1.pdf' },
  { id: 2, name: 'Generative AI: Introduction and Applications', duration: '8 hours', grade: 'Not started', certificateUrl: '/ibm/genai2.pdf' },
  { id: 3, name: 'Generative AI: Prompt Engineering Basics', duration: '9 hours', grade: 'Not started', certificateUrl: '/ibm/genai3.pdf' },
  { id: 4, name: 'Python for Data Science, AI & Development', duration: '25 hours', grade: 'Not started', certificateUrl: '/ibm/genai4.pdf' },
  { id: 5, name: 'Developing AI Applications with Python and Flask', duration: '11 hours', grade: 'Not started', certificateUrl: '/ibm/genai5.pdf' },
  { id: 6, name: 'Building Generative AI-Powered Applications with Python', duration: '14 hours', grade: 'Not started', certificateUrl: '/ibm/genai6.pdf' },
  { id: 7, name: 'Data Analysis with Python', duration: '17 hours', grade: 'Not started', certificateUrl: '/ibm/genai7.pdf' },
  { id: 8, name: 'Machine Learning with Python', duration: '20 hours', grade: 'Not started', certificateUrl: '/ibm/genai8.pdf' },
  { id: 9, name: 'Introduction to Deep Learning & Neural Networks with Keras', duration: '10 hours', grade: 'Not started', certificateUrl: '/ibm/genai9.pdf' },
  { id: 10, name: 'Generative AI and LLMs: Architecture and Data Preparation', duration: '5 hours', grade: 'Not started', certificateUrl: '/ibm/genai10.pdf' },
  { id: 11, name: 'Gen AI Foundational Models for NLP & Language Understanding', duration: '9 hours', grade: 'Not started', certificateUrl: '/ibm/genai11.pdf' },
  { id: 12, name: 'Generative AI Language Modeling with Transformers', duration: '9 hours', grade: 'Not started', certificateUrl: '/ibm/genai12.pdf' },
  { id: 13, name: 'Generative AI Engineering and Fine-Tuning Transformers', duration: '8 hours', grade: 'Not started', certificateUrl: '/ibm/genai13.pdf' },
  { id: 14, name: 'Generative AI Advance Fine-Tuning for LLMs', duration: '9 hours', grade: 'Not started', certificateUrl: '/ibm/genai14.pdf' },
  { id: 15, name: 'Fundamentals of AI Agents Using RAG and LangChain', duration: '7 hours', grade: 'Not started', certificateUrl: '/ibm/genai15.pdf' },
  { id: 16, name: 'Project: Generative AI Applications with RAG and LangChain', duration: '9 hours', grade: 'Not started', certificateUrl: '/ibm/genai16.pdf' }
]

  return (
    <>
      {/* Contact Button - Fixed Bottom Left */}
      <div className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-50 scale-75 sm:scale-90 md:scale-100">
        <AnimatedContactButton theme={theme} />
      </div>

      {/* ─── STICKY HERO FOR CURTAIN REVEAL ─── */}
      <div className="relative w-full z-10" style={{ height: '100vh' }}>
        <div className="sticky top-0 left-0 w-full h-full overflow-hidden">
          <HeroSection theme={theme} onThemeChange={setTheme} />
        </div>
      </div>

      {/* About Section */}
      <div 
        id="about" 
        className={`relative z-20 overflow-hidden transition-colors duration-700 shadow-none md:shadow-[0_-25px_60px_rgba(0,0,0,0.35)] ${
          theme === 'dark' 
            ? 'bg-gradient-to-b from-[#050f00] via-[#0a1200] to-[#030800] text-white' 
            : 'bg-gradient-to-b from-white via-gray-50 to-gray-100 text-gray-900'
        }`}
      >
        <div className="container mx-auto px-6 py-20 md:py-32 relative z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mb-16"
            >
              <h2 className={`text-4xl md:text-7xl font-black mb-6 ${
                theme === 'dark' 
                  ? 'bg-gradient-to-r from-[#C8FF5C] to-white bg-clip-text text-transparent'
                  : 'bg-gradient-to-r from-[#8ec438] to-gray-900 bg-clip-text text-transparent'
              }`}>
                About Me
              </h2>
              <div className="w-20 h-1 bg-[#C8FF5C] rounded-full"></div>
            </motion.div>

            {/* About Content */}
            <div className="mb-20 overflow-visible">
              <HeroHighlight containerClassName="bg-transparent dark:bg-transparent min-h-0 h-auto py-4 md:py-8">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full flex justify-center text-center px-4 md:px-8"
                >
                  <p className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-relaxed lg:leading-snug font-extrabold max-w-5xl tracking-wide ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    I'm an Electronics and Communication Engineering undergrad building production-grade systems across the{' '}
                    <Highlight theme={theme}>
                      full stack
                    </Highlight>
                    {' '}— from data pipelines and{' '}
                    <Highlight theme={theme}>
                      ML backends
                    </Highlight>
                    {' '}to the interfaces on top. I specialize in{' '}
                    <Highlight theme={theme}>
                      AI engineering and data engineering
                    </Highlight>
                    : designing systems that ingest, process, and act on data intelligently. Currently shipping tools with{' '}
                    <Highlight theme={theme}>
                      Next.js, FastAPI, Python, and LLMs
                    </Highlight>
                    .
                  </p>
                </motion.div>
              </HeroHighlight>
            </div>

            {/* Skills Section */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mb-7 md:mb-9 text-center">
                <p className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.16em] border mb-3 ${
                  theme === 'dark'
                    ? 'text-[#C8FF5C] border-[#C8FF5C]/40 bg-[#C8FF5C]/10'
                    : 'text-[#6f9828] border-[#a6cf57]/60 bg-[#C8FF5C]/20'
                }`}>
                  Core Expertise
                </p>
                <h3 className={`text-3xl md:text-6xl font-black tracking-tight mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Technical Skills
                </h3>
                <p className={`text-xs md:text-sm max-w-xl mx-auto ${
                  theme === 'dark' ? 'text-white/55' : 'text-gray-600'
                }`}>
                  A practical toolkit I use to build data products, machine learning systems, and production-grade web applications.
                </p>
              </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 max-w-6xl mx-auto">
                  {skillCategories.map((category, index) => (
                <div 
                  key={category.title} 
                  className={`relative backdrop-blur-xl rounded-2xl md:rounded-3xl p-4 md:p-6 transition-all duration-500 group overflow-hidden hover:shadow-2xl hover:-translate-y-1 ${
                    theme === 'dark'
                      ? 'bg-gradient-to-br from-[#151515]/90 via-[#101010]/85 to-[#0b0b0b]/80 border border-white/10 hover:border-[#C8FF5C]/40 hover:shadow-[#C8FF5C]/15'
                      : 'bg-white/90 border border-gray-200 hover:border-[#C8FF5C]/70 hover:shadow-[#C8FF5C]/25'
                  }`}
                  style={{ transitionDelay: `${index * 70}ms` }}
                >
              <div className={`absolute inset-0 rounded-2xl md:rounded-3xl transition-all duration-500 opacity-0 group-hover:opacity-100 ${
                theme === 'dark'
                  ? 'bg-[radial-gradient(circle_at_top_right,rgba(200,255,92,0.16),transparent_55%)]'
                  : 'bg-[radial-gradient(circle_at_top_right,rgba(142,196,56,0.16),transparent_55%)]'
              }`} />

              <div className={`absolute top-0 left-0 right-0 h-px ${
                theme === 'dark'
                  ? 'bg-gradient-to-r from-transparent via-[#C8FF5C]/60 to-transparent'
                  : 'bg-gradient-to-r from-transparent via-[#8ec438]/50 to-transparent'
              }`} />
              
              <div className="relative flex items-start gap-3 md:gap-4 mb-4 md:mb-5">
                <div className={`w-11 h-11 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center group-hover:scale-105 group-hover:rotate-3 transition-all duration-500 shadow-lg overflow-hidden p-2 ${
                  theme === 'dark'
                    ? 'bg-gradient-to-br from-[#C8FF5C]/25 via-[#C8FF5C]/10 to-transparent ring-1 ring-[#C8FF5C]/25 group-hover:ring-[#C8FF5C]/45 shadow-[#C8FF5C]/15'
                    : 'bg-gradient-to-br from-[#C8FF5C]/35 via-[#C8FF5C]/15 to-transparent ring-1 ring-[#8ec438]/30 group-hover:ring-[#8ec438]/50 shadow-[#8ec438]/20'
                }`}>
                  <img 
                    src={category.icon} 
                    alt={category.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1 pt-0.5">
                  <h4 className={`text-lg sm:text-xl md:text-2xl font-black mb-1 tracking-tight transition-colors duration-300 leading-tight ${
                    theme === 'dark'
                      ? 'text-white group-hover:text-[#C8FF5C]'
                      : 'text-gray-900 group-hover:text-[#8ec438]'
                  }`}>{category.title}</h4>
                  <p className={`text-xs md:text-sm font-semibold transition-colors duration-300 ${
                    theme === 'dark'
                      ? 'text-white/45 group-hover:text-white/70'
                      : 'text-gray-500 group-hover:text-gray-700'
                  }`}>{category.count}</p>
                </div>
              </div>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <span 
                          key={skill}
                          className={`inline-flex items-center gap-1 px-2.5 md:px-3 py-1 rounded-lg text-[11px] md:text-xs border transition-all duration-300 ${
                            theme === 'dark'
                              ? 'bg-white/5 text-white/75 border-white/15 hover:border-[#C8FF5C]/60 hover:text-[#C8FF5C] hover:bg-[#C8FF5C]/10'
                              : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-[#8ec438]/70 hover:text-[#5f8420] hover:bg-[#C8FF5C]/15'
                          }`}
                        >
                          <span className={`w-1 h-1 rounded-full ${
                            theme === 'dark' ? 'bg-[#C8FF5C]/70' : 'bg-[#8ec438]/70'
                          }`} />
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Services (Redesigned Offerings) */}
            <motion.div 
              id="expertise"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-32 relative overflow-visible"
            >
              <div className="max-w-4xl mx-auto relative z-10">
                {/* Header styled exactly like screenshot */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="mb-14 text-left"
                >
                  <span className={`text-base sm:text-lg uppercase tracking-[0.25em] font-black border-b-2 pb-2 ${
                    theme === 'dark' ? 'text-[#C8FF5C] border-[#C8FF5C]/35' : 'text-[#8ec438] border-[#8ec438]/35'
                  }`}>
                    /SERVICES
                  </span>
                </motion.div>

                {/* Accordion Rows List styled exactly like screenshot */}
                <div className="border-t border-gray-200 dark:border-white/10">
                  {services.map((service, index) => {
                    const isExpanded = expandedService === service.id;
                    
                    return (
                      <motion.div
                        key={service.id}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
                        className={`border-b transition-all duration-500 overflow-hidden ${
                          theme === 'dark'
                            ? 'border-white/10 hover:border-[#C8FF5C]/40'
                            : 'border-gray-200 hover:border-[#8ec438]/40'
                        }`}
                      >
                        <button
                          onClick={() => setExpandedService(isExpanded ? null : service.id)}
                          className="w-full py-8 sm:py-10 flex items-center justify-between gap-6 text-left group relative"
                          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                        >
                          <div className="flex items-center gap-6 sm:gap-10">
                            {/* Service Number */}
                            <span className={`text-sm sm:text-base font-mono font-bold ${
                              theme === 'dark' ? 'text-white/40 group-hover:text-[#C8FF5C]' : 'text-gray-400 group-hover:text-[#8ec438]'
                            } transition-colors duration-300`}>
                              0{index + 1}
                            </span>
                            
                            {/* Service Title */}
                            <span className={`text-xl sm:text-2xl md:text-3xl font-extrabold uppercase tracking-tight transition-all duration-300 ${
                              theme === 'dark' 
                                ? 'text-white group-hover:text-[#C8FF5C] group-hover:translate-x-2' 
                                : 'text-gray-900 group-hover:text-[#8ec438] group-hover:translate-x-2'
                            } transition-transform`}>
                              {service.title.replace(/^\d+\.\s*/, '')}
                            </span>
                          </div>

                          {/* Arrow Container */}
                          <div className="flex items-center justify-center flex-shrink-0">
                            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border flex items-center justify-center transition-all duration-500 ${
                              theme === 'dark'
                                ? 'border-white/15 group-hover:border-[#C8FF5C]/50 group-hover:bg-[#C8FF5C] group-hover:text-black text-white/60'
                                : 'border-gray-200 group-hover:border-[#8ec438]/50 group-hover:bg-[#8ec438] group-hover:text-white text-gray-500'
                            }`}>
                              <svg 
                                className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-500 ${
                                  isExpanded ? 'rotate-90' : 'group-hover:rotate-45'
                                }`}
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                            </div>
                          </div>
                        </button>

                        {/* Expanded Panel */}
                        <motion.div
                          initial={false}
                          animate={{
                            height: isExpanded ? 'auto' : 0,
                            opacity: isExpanded ? 1 : 0,
                          }}
                          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pb-8 md:pb-12 pt-2 px-4 sm:px-14 flex flex-col md:flex-row gap-8 md:gap-16 items-start">
                            <div className="flex-1">
                              <p className={`leading-relaxed text-sm sm:text-base whitespace-pre-line font-medium ${
                                theme === 'dark' ? 'text-white/70' : 'text-gray-700'
                              }`}>
                                {service.description}
                              </p>
                            </div>
                            
                            {service.image && (
                              <div className="w-full md:w-[320px] flex-shrink-0">
                                <div className={`rounded-3xl overflow-hidden border p-3 shadow-2xl transition-transform duration-500 hover:scale-[1.02] ${
                                  theme === 'dark'
                                    ? 'border-[#C8FF5C]/20 bg-gradient-to-br from-white/5 to-transparent shadow-[#C8FF5C]/5'
                                    : 'border-[#8ec438]/20 bg-white shadow-gray-200'
                                }`}>
                                  <img 
                                    src={service.image} 
                                    alt={service.title}
                                    className="w-full h-auto object-cover rounded-2xl"
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Achievements & Certifications Section */}
      <div 
        id="achievements" 
        className={`relative overflow-hidden scroll-mt-20 transition-colors duration-700 ${
          theme === 'dark'
            ? 'bg-gradient-to-b from-black via-[#0a0a0a] to-[#040404] text-white'
            : 'bg-gradient-to-b from-gray-100 via-gray-50 to-white text-gray-900'
        }`}
      >
        <div className="container mx-auto px-6 py-12 md:py-20 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Achievements Header */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mb-10 text-left"
            >
              <span className={`text-sm sm:text-[15px] uppercase tracking-[0.2em] font-black border-b pb-1.5 ${
                theme === 'dark' ? 'text-[#C8FF5C] border-[#C8FF5C]/30' : 'text-[#8ec438] border-[#8ec438]/30'
              }`}>
                /CREDENTIALS
              </span>
              <h2 className={`text-4xl md:text-[52px] font-black mt-3 md:mt-4 tracking-tight leading-tight ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Achievements & Certifications
              </h2>
              <p className={`text-base sm:text-lg mt-3 md:mt-4 max-w-3xl font-medium leading-relaxed ${
                theme === 'dark' ? 'text-white/50' : 'text-gray-600'
              }`}>
                Academic honors and professional certifications that showcase my commitment to continuous learning and advanced technical skill development.
              </p>
            </motion.div>

            {/* Certifications Grid */}
            <div className="mb-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={cert.id}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ type: "spring", stiffness: 85, damping: 18, delay: index * 0.05 }}
                    whileHover={{ 
                      y: -4, 
                      scale: 1.012,
                      transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
                    }}
                    className={`group relative backdrop-blur-3xl border rounded-2xl p-4 flex flex-col justify-between min-h-[170px] sm:min-h-[190px] md:min-h-[238px] transition-all duration-500 overflow-hidden hover:shadow-md ${
                      theme === 'dark'
                        ? `bg-gradient-to-br from-[#121212]/95 via-[#0a0a0a]/98 to-black/95 ${cert.borderColor} hover:border-[#C8FF5C]/35 hover:shadow-[#C8FF5C]/5`
                        : `bg-white/95 border-gray-200/70 hover:border-[#8ec438]/45 hover:shadow-gray-200/30`
                    }`}
                  >
                    {/* Top edge glowing gradient light leak */}
                    <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-transparent to-transparent group-hover:from-transparent ${
                      theme === 'dark'
                        ? 'group-hover:via-[#C8FF5C]/30'
                        : 'group-hover:via-[#8ec438]/30'
                    } group-hover:to-transparent transition-all duration-700`} />

                    <div>
                      {/* Top Row: Icon and Date */}
                      <div className="flex items-center justify-between mb-1.5">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center group-hover:scale-105 group-hover:rotate-2 transition-transform duration-500 shadow-sm overflow-hidden p-1.5 ${
                          theme === 'dark'
                            ? 'bg-white/5 border border-white/10 shadow-black/25'
                            : 'bg-gray-50 border border-gray-150 shadow-gray-100/50'
                        }`}>
                          {cert.icon.startsWith('/') ? (
                            <img 
                              src={cert.icon} 
                              alt={cert.title}
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <span className="text-base">{cert.icon}</span>
                          )}
                        </div>

                        {/* Verification Date Badge */}
                        <div className={`px-2 py-0.5 text-[10.5px] font-black rounded-full uppercase tracking-wider transition-all duration-300 ${
                          theme === 'dark'
                            ? 'bg-[#C8FF5C]/10 border border-[#C8FF5C]/20 text-[#C8FF5C]'
                            : 'bg-[#8ec438]/10 border border-[#8ec438]/20 text-[#6f9828]'
                        }`}>
                          {cert.date}
                        </div>
                      </div>

                      {/* Middle Row: Title */}
                      <h3 className={`text-[14px] sm:text-[15px] md:text-[16px] font-black mb-1.5 tracking-tight leading-snug transition-colors duration-300 line-clamp-2 ${
                        theme === 'dark' 
                          ? 'text-white group-hover:text-[#C8FF5C]' 
                          : 'text-gray-900 group-hover:text-[#8ec438]'
                      }`}>
                        {cert.title}
                      </h3>

                      {/* Issuer Badge */}
                      <span className={`text-[10.5px] font-extrabold px-2 py-0.5 rounded border uppercase tracking-wider inline-block mb-1.5 transition-all duration-300 ${
                        theme === 'dark'
                          ? 'bg-white/5 border-white/10 text-white/50 group-hover:border-white/15'
                          : 'bg-gray-100 border-gray-200 text-gray-550 group-hover:border-gray-250'
                      }`}>
                        {cert.issuer}
                      </span>

                      {/* Description (if exists) */}
                      {cert.description && (
                        <p className={`text-[11.5px] leading-relaxed line-clamp-2 font-medium ${
                          theme === 'dark' ? 'text-white/40 group-hover:text-white/50' : 'text-gray-550 group-hover:text-gray-650'
                        } transition-colors duration-300`}>
                          {cert.description}
                        </p>
                      )}
                    </div>

                    {/* Bottom Row: View Button */}
                    <div className="mt-2 pt-2 border-t border-gray-150/10 dark:border-white/5 flex items-center justify-end">
                      <a
                        href={cert.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                          className={`group/btn inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-[10.5px] font-black transition-all duration-300 hover:scale-[1.02] ${
                          theme === 'dark'
                            ? 'bg-[#C8FF5C]/10 hover:bg-[#C8FF5C] border border-[#C8FF5C]/20 hover:border-[#C8FF5C] text-[#C8FF5C] hover:text-black shadow-md shadow-black/10'
                            : 'bg-[#8ec438]/10 hover:bg-[#8ec438] border border-[#8ec438]/20 hover:border-[#8ec438] text-[#5f8420] hover:text-white shadow-sm'
                        }`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span>Verify Credential</span>
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center border transition-all duration-300 ${
                          theme === 'dark'
                            ? 'border-white/15 group-hover/btn:border-black/20 group-hover/btn:bg-black/10 text-[#C8FF5C] group-hover/btn:text-black'
                            : 'border-gray-255 group-hover/btn:border-white/20 group-hover/btn:bg-white/10 text-gray-500 group-hover/btn:text-white'
                        }`}>
                          <svg className="w-2.5 h-2.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </div>
                      </a>
                    </div>

                    {/* Holographic Glowing Orbits / Mesh */}
                    <div className={`absolute -right-16 -top-16 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-[0.1] transition-opacity duration-700 pointer-events-none ${
                      theme === 'dark'
                        ? 'bg-gradient-to-br from-[#C8FF5C] via-teal-400 to-indigo-500'
                        : 'bg-gradient-to-br from-[#8ec438] via-amber-400 to-emerald-500'
                    }`} />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Featured IBM Course Showcase Card */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 relative"
            >
              <div 
                onClick={() => setShowCourseDetails(true)}
                className={`group relative rounded-[24px] p-4 md:p-6 transition-all duration-500 overflow-hidden hover:shadow-xl hover:-translate-y-1 cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-gradient-to-br from-[#121212] via-[#0d0d0d] to-black border border-blue-500/25 hover:border-[#C8FF5C]/45 hover:shadow-[#C8FF5C]/5'
                    : 'bg-white border border-gray-250 hover:border-[#8ec438]/45 hover:shadow-lg shadow-sm'
                }`}
              >
                {/* sweeping neon/blue light leak border */}
                <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-transparent to-transparent group-hover:from-transparent ${
                  theme === 'dark'
                    ? 'group-hover:via-[#C8FF5C]/40'
                    : 'group-hover:via-[#8ec438]/40'
                } group-hover:to-transparent transition-all duration-1000`} />

                {/* Glow Overlay */}
                <div className={`absolute inset-0 rounded-[24px] transition-opacity duration-700 pointer-events-none ${
                  theme === 'dark'
                    ? 'bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100'
                    : 'bg-gradient-to-br from-[#C8FF5C]/5 via-[#8ec438]/5 to-transparent opacity-0 group-hover:opacity-100'
                }`} />
                
                <div className="relative z-10 flex flex-col gap-5">
                  {/* Info Block */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* Left Branding */}
                    <div className="flex items-start gap-3 sm:gap-4 flex-1">
                      {/* Logo container with custom neon frame */}
                      <div className={`w-11 h-11 sm:w-13 sm:h-13 rounded-xl flex items-center justify-center flex-shrink-0 p-1.5 sm:p-2 shadow-md transition-all duration-500 group-hover:rotate-1 ${
                        theme === 'dark'
                          ? 'bg-white/5 border border-white/10 ring-1 ring-white/10'
                          : 'bg-gradient-to-br from-[#C8FF5C]/25 to-[#8ec438]/10 border border-[#8ec438]/15'
                      }`}>
                        <img 
                          src="/ibm/ibm.png" 
                          alt="IBM Logo"
                          className="w-full h-full object-contain"
                        />
                      </div>

                      {/* Meta details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className={`text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] ${
                            theme === 'dark' ? 'text-white/40' : 'text-gray-500'
                          }`}>
                            Featured Specialization
                          </span>
                          <div className={`px-2 py-0.5 rounded-full border text-[9px] font-black ${
                            theme === 'dark' 
                              ? 'bg-[#C8FF5C]/10 border-[#C8FF5C]/25 text-[#C8FF5C]' 
                              : 'bg-[#8ec438]/10 border-[#8ec438]/25 text-[#5f8420]'
                          }`}>
                            16 Course Series Completed
                          </div>
                        </div>
                        
                        <h4 className={`text-lg sm:text-xl font-black mb-1 tracking-tight transition-colors duration-500 leading-snug ${
                          theme === 'dark' ? 'text-white group-hover:text-[#C8FF5C]' : 'text-gray-900 group-hover:text-[#8ec438]'
                        }`}>
                          IBM Generative AI Engineering Professional Certificate
                        </h4>
                        
                        <div className="flex items-center gap-1.5 text-yellow-400 text-[11px]">
                          <span>★★★★★</span>
                          <span className={`text-[11px] ml-1 font-semibold ${theme === 'dark' ? 'text-white/40' : 'text-gray-500'}`}>
                            Authorized by IBM Certification Board
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right Action buttons */}
                    <div className="flex flex-col sm:flex-row items-center gap-2.5 flex-shrink-0 w-full lg:w-auto">
                      <button
                        onClick={() => setShowCourseDetails(true)}
                          className={`inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-black tracking-wide w-full sm:w-auto transition-all duration-300 hover:scale-[1.02] border ${
                          theme === 'dark'
                            ? 'bg-white/5 hover:bg-white/10 border-white/10 text-white'
                            : 'bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-900'
                        }`}
                      >
                        <span>Explore Syllabus</span>
                        <svg className="w-3 h-3 group-hover:translate-y-0.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      <a
                        href="/ibm/main cert.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                          className={`inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-black tracking-wide w-full sm:w-auto transition-all duration-300 hover:scale-[1.02] shadow-lg ${
                          theme === 'dark'
                            ? 'bg-[#C8FF5C] hover:bg-[#b8ef4c] text-black shadow-[#C8FF5C]/10'
                            : 'bg-[#8ec438] hover:bg-[#7ab32e] text-white shadow-[#8ec438]/10'
                        }`}
                      >
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z" />
                        </svg>
                        <span>View Credential</span>
                      </a>
                    </div>
                  </div>

                  {/* Interactive Visual Timeline / Milestones */}
                  <div className="pt-4 border-t border-gray-150/10 dark:border-white/5 hidden md:block">
                    <div className="flex items-center justify-between max-w-2xl mx-auto">
                      {[
                        { step: "01", name: "AI Foundations" },
                        { step: "02", name: "Python & ML" },
                        { step: "03", name: "Deep Learning" },
                        { step: "04", name: "AI Agents" }
                      ].map((t, i) => (
                        <div key={t.name} className="flex items-center gap-2 group/step">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center font-black text-[9px] border transition-all duration-500 ${
                            theme === 'dark'
                              ? 'bg-white/5 border-white/10 text-white/50 group-hover/step:border-[#C8FF5C] group-hover/step:text-[#C8FF5C] group-hover/step:bg-[#C8FF5C]/10'
                              : 'bg-gray-50 border-gray-200 text-gray-400 group-hover/step:border-[#8ec438] group-hover/step:text-[#8ec438] group-hover/step:bg-[#8ec438]/10'
                          }`}>
                            {t.step}
                          </div>
                          <div className="text-left">
                            <p className={`text-[8px] uppercase font-black tracking-widest leading-none mb-0.5 ${theme === 'dark' ? 'text-white/30 group-hover/step:text-[#C8FF5C]' : 'text-gray-400 group-hover/step:text-[#8ec438]'}`}>Phase {t.step}</p>
                            <p className={`text-[11px] font-black leading-tight transition-colors duration-300 ${theme === 'dark' ? 'text-white/60 group-hover/step:text-white' : 'text-gray-700 group-hover/step:text-gray-900'}`}>{t.name}</p>
                          </div>
                          {i < 3 && (
                            <div className={`w-6 lg:w-10 h-px ml-2.5 ${theme === 'dark' ? 'bg-white/10' : 'bg-gray-250'}`} />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Ambient Soft Glow Behind card */}
                <div className={`absolute -bottom-16 -right-16 w-36 h-36 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none ${
                  theme === 'dark' ? 'bg-blue-500/10' : 'bg-[#C8FF5C]/15'
                }`} />
              </div>
            </motion.div>

                

            {/* Internship Experience Section */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-24"
            >
              <h3 className={`text-5xl md:text-6xl font-black mb-4 tracking-tight ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>Work Experience</h3>
              <p className={`text-lg mb-16 max-w-3xl leading-relaxed ${
                theme === 'dark' ? 'text-white/50' : 'text-gray-600'
              }`}>
                Gained hands-on experience delivering ML models, analytics dashboards, and full-stack web applications during industry internships
              </p>
              
              <div className="space-y-1 max-w-6xl">
                {internships.map((internship, index) => (
                  <div
                    key={internship.id}
                    className={`group relative border-t transition-all duration-500 ${
                      theme === 'dark'
                        ? 'border-white/10 hover:border-[#C8FF5C]/30'
                        : 'border-gray-200 hover:border-[#C8FF5C]/50'
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
                      {/* Left: Duration */}
                      <div className="md:col-span-2">
                        <div className="inline-flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-[#C8FF5C] group-hover:scale-125 transition-transform duration-500"></div>
                          <p className={`text-sm font-bold group-hover:text-[#C8FF5C] transition-colors duration-500 uppercase tracking-wider ${
                            theme === 'dark' ? 'text-white/60' : 'text-gray-600'
                          }`}>
                            {internship.duration}
                          </p>
                        </div>
                      </div>

                      {/* Middle: Company & Role */}
                      <div className="md:col-span-4">
                        <h4 className={`text-2xl md:text-3xl font-black mb-2 tracking-tight leading-tight group-hover:text-[#C8FF5C] transition-colors duration-500 ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                          {internship.role}
                        </h4>
                        <p className={`text-base font-semibold transition-colors duration-500 ${
                          theme === 'dark'
                            ? 'text-white/50 group-hover:text-white/70'
                            : 'text-gray-600 group-hover:text-gray-800'
                        }`}>
                          at <span className={theme === 'dark' ? 'text-white/70 group-hover:text-[#C8FF5C]/80' : 'text-gray-700 group-hover:text-[#8ec438]'}>{internship.company}</span>
                        </p>
                      </div>

                      {/* Right: Description */}
                      <div className="md:col-span-6">
                        <div className="space-y-3">
                          {internship.achievements.map((achievement, idx) => (
                            <p 
                              key={idx} 
                            className={`text-base md:text-lg leading-relaxed transition-colors duration-500 ${
                                theme === 'dark'
                                  ? 'text-white/40 group-hover:text-white/60'
                                  : 'text-gray-600 group-hover:text-gray-800'
                              }`}
                              style={{ transitionDelay: `${idx * 50}ms` }}
                            >
                              {achievement}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Hover accent line */}
                    <div className="absolute left-0 top-0 w-0 h-[1px] bg-gradient-to-r from-[#C8FF5C] to-transparent group-hover:w-full transition-all duration-700"></div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Stats Section */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-24"
            >
              <MorphingCardStack 
                cards={stats}
                theme={theme}
                onCardClick={(card) => console.log('Card clicked:', card)}
              />
            </motion.div>

          </div>
        </div>
      </div>

      <ProjectsSection theme={theme} />

      {/* Contact Section - Add before closing fragment */}
      <div id="contact" className={`relative overflow-hidden transition-colors duration-700 ${
        theme === 'dark'
          ? 'bg-gradient-to-b from-black via-[#0f0f0f] to-[#1a1a1a] text-white'
          : 'bg-gradient-to-b from-gray-100 via-gray-50 to-white text-gray-900'
      }`}>
        <div className="container mx-auto px-6 py-12 md:py-15 min-h-screen flex items-center">
          <div className="max-w-5xl mx-auto">
            {/* Header matching Featured Projects style */}
            <div className="mb-6">
              <h2 className={`text-5xl md:text-7xl font-black mb-4 ${
                theme === 'dark' ? 'text-[#C8FF5C]' : 'text-[#8ec438]'
              }`}>
                Let's Work Together
              </h2>
              <div className={`w-32 h-1 rounded-full mb-6 ${
                theme === 'dark' ? 'bg-[#C8FF5C]' : 'bg-[#8ec438]'
              }`}></div>
              <p className={`text-base md:text-lg max-w-3xl ${
                theme === 'dark' ? 'text-white/60' : 'text-gray-600'
              }`}>
                Let's build something impactful together—whether it's your brand, your website, or your next big idea.
              </p>
            </div>

            {/* Contact Form */}
            <div className="max-w-2xl">
              <form className="space-y-6">
                {/* Name and Email Row */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div>
                    <label 
                      htmlFor="name" 
                      className={`block text-sm font-semibold mb-2 ${
                        theme === 'dark' ? 'text-white/90' : 'text-gray-900'
                      }`}
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      placeholder="John Smith"
                      className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#C8FF5C]/50 ${
                        theme === 'dark'
                          ? 'bg-[#2a2a2a] border-white/10 text-white placeholder-white/40 hover:border-white/20'
                          : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 hover:border-gray-300'
                      }`}
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label 
                      htmlFor="email" 
                      className={`block text-sm font-semibold mb-2 ${
                        theme === 'dark' ? 'text-white/90' : 'text-gray-900'
                      }`}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="johnsmith@gmail.com"
                      className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#C8FF5C]/50 ${
                        theme === 'dark'
                          ? 'bg-[#2a2a2a] border-white/10 text-white placeholder-white/40 hover:border-white/20'
                          : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 hover:border-gray-300'
                      }`}
                    />
                  </div>
                </div>

                {/* Service Needed Dropdown */}
                <div>
                  <label 
                    htmlFor="service" 
                    className={`block text-sm font-semibold mb-2 ${
                      theme === 'dark' ? 'text-white/90' : 'text-gray-900'
                    }`}
                  >
                    Service Needed <span className={theme === 'dark' ? 'text-[#C8FF5C]' : 'text-[#8ec438]'}>?</span>
                  </label>
                  <div className="relative">
                    <select
                      id="service"
                      className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#C8FF5C]/50 appearance-none cursor-pointer ${
                        theme === 'dark'
                          ? 'bg-[#2a2a2a] border-white/10 text-white hover:border-white/20'
                          : 'bg-white border-gray-200 text-gray-900 hover:border-gray-300'
                      }`}
                    >
                      <option value="">Select...</option>
                      <option value="data-analytics">Data Analytics / Data Science</option>
                      <option value="machine-learning">Machine Learning</option>
                      <option value="full-stack">Full-Stack Development</option>
                      <option value="ai-engineering">AI Engineering / Gen AI</option>
                      <option value="consulting">Consulting / Advisory</option>
                      <option value="other">Other</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg 
                        className={`w-4 h-4 ${theme === 'dark' ? 'text-white/60' : 'text-gray-500'}`}
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Message Textarea */}
                <div>
                  <label 
                    htmlFor="message" 
                    className={`block text-sm font-semibold mb-2 ${
                      theme === 'dark' ? 'text-white/90' : 'text-gray-900'
                    }`}
                  >
                    What Can I Help You...
                  </label>
                  <textarea
                    id="message"
                    rows="6"
                    placeholder="Hello, I'd like to enquire about..."
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#C8FF5C]/50 resize-none ${
                      theme === 'dark'
                        ? 'bg-[#2a2a2a] border-white/10 text-white placeholder-white/40 hover:border-white/20'
                        : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 hover:border-gray-300'
                    }`}
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className={`w-full md:w-auto px-10 py-3.5 rounded-full font-bold uppercase text-sm tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                    theme === 'dark'
                      ? 'bg-[#C8FF5C] hover:bg-[#a8d949] text-black shadow-lg shadow-[#C8FF5C]/20'
                      : 'bg-[#8ec438] hover:bg-[#7ab32e] text-white shadow-lg shadow-[#8ec438]/20'
                  }`}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <footer className={`border-t ${
          theme === 'dark' ? 'border-white/10' : 'border-gray-200'
        }`}>
          {/* Main Footer Section */}
          <div className={`py-8 ${
            theme === 'dark' ? 'bg-[#a8d949]' : 'bg-[#8ec438]'
          }`}>
            <div className="container mx-auto px-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                {/* Left: Contact Info */}
                <div className="flex flex-col md:flex-row gap-6 text-center md:text-left">
                  <div>
                    <p className="text-xs font-semibold text-black/60 uppercase tracking-wider mb-1">Email :</p>
                    <a 
                      href="mailto:your.email@example.com" 
                      className="text-sm md:text-base font-bold text-black hover:underline transition-all duration-300"
                    >
                      shaazney123@gmail.com
                    </a>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-black/60 uppercase tracking-wider mb-1">Call Today :</p>
                    <a 
                      href="tel:+1234567890" 
                      className="text-sm md:text-base font-bold text-black hover:underline transition-all duration-300"
                    >
                      +91 6282984460
                    </a>
                  </div>
                </div>

                {/* Right: Social Icons */}
                <div className="flex items-center gap-3">
                  <p className="text-xs font-semibold text-black/60 uppercase tracking-wider">Social :</p>
                  <div className="flex gap-3">
                    {/* Twitter/X */}
                    <a
                      href="https://www.instagram.com/_shxz7_/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-[#5f8d26]/90 hover:bg-[#507920] flex items-center justify-center transition-all duration-300 hover:scale-110"
                    >
                      <svg className="w-4 h-4 text-[#C8FF5C]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>

                    {/* GitHub */}
                    <a
                      href="https://github.com/SHXZ7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-[#5f8d26]/90 hover:bg-[#507920] flex items-center justify-center transition-all duration-300 hover:scale-110"
                    >
                      <svg className="w-4 h-4 text-[#C8FF5C]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>

                    {/* LinkedIn */}
                    <a
                      href="https://www.linkedin.com/in/mohammed-shaaz-098a1628b/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-[#5f8d26]/90 hover:bg-[#507920] flex items-center justify-center transition-all duration-300 hover:scale-110"
                    >
                      <svg className="w-4 h-4 text-[#C8FF5C]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>

                    {/* Dribbble */}
                    <a
                      href="https://leetcode.com/u/SHXZ7/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-[#5f8d26]/90 hover:bg-[#507920] flex items-center justify-center transition-all duration-300 hover:scale-110"
                    >
                      <svg className="w-4 h-4 text-[#C8FF5C]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Copyright Bar - Slightly Darker Green */}
          <div className={`py-4 ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-[#a8d949] to-[#8ec438]'
              : 'bg-gradient-to-r from-[#7ab32e] to-[#6a9c28]'
          }`}>
            <div className="container mx-auto px-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-xs">
                <p className="text-black/80 font-medium">
                  © Copyright {new Date().getFullYear()}. All Rights Reserved by{' '}
                  <span className="font-bold text-black">Mohammed Shaaz</span>
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-black/80 font-medium">Created by</span>
                  <a 
                    href="https://yourportfolio.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black/10 hover:bg-black/20 rounded-full transition-all duration-300"
                  >
                    <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center">
                      <span className="text-[10px] font-bold text-[#C8FF5C]">MS</span>
                    </div>
                    <span className="text-black font-bold text-xs">Mohammed Shaaz</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Course Details Modal - Redesigned split-column progress tracker */}
      {showCourseDetails && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          onClick={() => setShowCourseDetails(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md animate-fadeIn" />
          
          {/* Modal Content */}
          <div 
            className={`relative rounded-[32px] p-5 sm:p-6 md:p-10 max-w-5xl w-full max-h-[90vh] overflow-y-auto lg:overflow-hidden shadow-2xl animate-slideInUp ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-[#121212] via-[#0d0d0d] to-black border border-blue-500/25'
                : 'bg-white border border-gray-205 shadow-2xl shadow-gray-300'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowCourseDetails(false)}
              className={`absolute top-6 right-6 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:rotate-90 group ${
                theme === 'dark'
                  ? 'bg-white/10 hover:bg-white/20'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <svg className={`w-5 h-5 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className={`flex flex-col md:flex-row items-start gap-6 mb-8 pb-6 border-b ${
              theme === 'dark' ? 'border-white/10' : 'border-gray-200'
            }`}>
              <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center flex-shrink-0 p-3.5 shadow-md ${
                theme === 'dark'
                  ? 'bg-white/5 border border-white/10'
                  : 'bg-gradient-to-br from-[#C8FF5C]/30 to-[#8ec438]/15 border border-[#8ec438]/20'
              }`}>
                <img 
                  src="/ibm/ibm.png" 
                  alt="IBM Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1 pr-8 md:pr-0">
                <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
                  <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${theme === 'dark' ? 'text-white/40' : 'text-gray-500'}`}>
                    Professional Specialization
                  </span>
                  <div className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase ${
                    theme === 'dark' ? 'bg-[#C8FF5C]/10 border border-[#C8FF5C]/25 text-[#C8FF5C]' : 'bg-[#8ec438]/10 border border-[#8ec438]/25 text-[#6f9828]'
                  }`}>
                    Authorized by IBM
                  </div>
                </div>
                <h4 className={`text-2xl md:text-3xl font-black mb-3 tracking-tight leading-tight ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  IBM Generative AI Engineering Professional Certificate
                </h4>
                <div className="flex flex-wrap items-center gap-4 text-xs font-semibold">
                  <div className="flex items-center gap-2">
                    <span className={theme === 'dark' ? 'text-white/60' : 'text-gray-700'}>Curriculum Length: <span className={theme === 'dark' ? 'text-[#C8FF5C]' : 'text-[#6f9828]'} >16 Courses</span></span>
                  </div>
                  <span className="opacity-20">•</span>
                  <span className={theme === 'dark' ? 'text-white/40' : 'text-gray-500'}>180+ Study Hours</span>
                  <span className="opacity-20">•</span>
                  <span className={theme === 'dark' ? 'text-white/40' : 'text-gray-500'}>Status: <span className={theme === 'dark' ? 'text-white/60' : 'text-gray-700'}>Completed</span></span>
                </div>
              </div>
            </div>

            {/* Split dashboard Columns */}
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 overflow-y-visible lg:overflow-hidden h-auto lg:h-[calc(90vh-220px)]">
              {/* Mobile Tab Selector */}
              <div className="flex lg:hidden overflow-x-auto gap-2 pb-3 mb-2 scrollbar-none flex-shrink-0">
                {ibmPhases.map((phase) => {
                  const isActive = activeIbmPhase === phase.id;
                  const phaseName = phase.title.split(': ')[1] || phase.subtitle;
                  return (
                    <button
                      key={phase.id}
                      onClick={() => setActiveIbmPhase(phase.id)}
                      className={`px-4 py-2.5 rounded-full text-xs font-black whitespace-nowrap border transition-all duration-300 ${
                        isActive
                          ? theme === 'dark'
                            ? 'bg-[#C8FF5C]/15 border-[#C8FF5C] text-[#C8FF5C] shadow-md shadow-[#C8FF5C]/5'
                            : 'bg-[#8ec438]/15 border-[#8ec438] text-[#5f8420] shadow-sm'
                          : theme === 'dark'
                            ? 'bg-white/5 border-white/10 text-white/70 hover:text-white'
                            : 'bg-gray-50 border-gray-200 text-gray-700 hover:text-gray-900'
                      }`}
                    >
                      Phase {phase.id}: {phaseName}
                    </button>
                  );
                })}
              </div>

              {/* Left Selector Sidebar (Desktop only) */}
              <div className="hidden lg:flex w-[320px] flex-col gap-3 overflow-y-auto pr-1 pb-4 flex-shrink-0">
                <p className={`text-[10px] font-black uppercase tracking-[0.2em] mb-1 ${theme === 'dark' ? 'text-white/40' : 'text-gray-500'}`}>
                  Specialization Milestones
                </p>
                {ibmPhases.map((phase) => {
                  const isActive = activeIbmPhase === phase.id;
                  return (
                    <button
                      key={phase.id}
                      onClick={() => setActiveIbmPhase(phase.id)}
                      className={`text-left p-4 rounded-2xl border transition-all duration-300 relative group/btn ${
                        isActive
                          ? theme === 'dark'
                            ? 'bg-[#C8FF5C]/10 border-[#C8FF5C]/40 text-[#C8FF5C] shadow-lg shadow-[#C8FF5C]/5'
                            : 'bg-[#8ec438]/10 border-[#8ec438]/40 text-[#5f8420]'
                          : theme === 'dark'
                            ? 'bg-white/5 border-white/10 hover:border-white/20 text-white/70 hover:text-white'
                            : 'bg-gray-50 border-gray-200 hover:border-gray-300 text-gray-700 hover:text-gray-900'
                      }`}
                      style={{ outline: 'none' }}
                    >
                      {/* Left glowing marker indicator */}
                      <div className={`absolute left-0 top-1/4 bottom-1/4 w-[3px] rounded-r-full transition-all duration-300 ${
                        isActive
                          ? theme === 'dark' ? 'bg-[#C8FF5C]' : 'bg-[#8ec438]'
                          : 'bg-transparent'
                      }`} />

                      <div className="flex justify-between items-center mb-1">
                        <span className={`text-[9px] font-black uppercase tracking-widest ${isActive ? '' : 'opacity-70'}`}>
                          {phase.title}
                        </span>
                        <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${
                          theme === 'dark'
                            ? 'bg-[#C8FF5C]/15 text-[#C8FF5C]'
                            : 'bg-[#8ec438]/15 text-[#6f9828]'
                        }`}>
                          ✓ Done
                        </span>
                      </div>
                      <p className={`text-sm font-black mb-1 transition-colors duration-300 ${theme === 'dark' ? 'text-white' : 'text-gray-900'} ${isActive ? (theme === 'dark' ? 'text-[#C8FF5C]' : 'text-[#8ec438]') : ''}`}>{phase.subtitle}</p>
                      <p className={`text-[11px] leading-normal line-clamp-2 ${theme === 'dark' ? 'text-white/40 group-hover/btn:text-white/60' : 'text-gray-500'}`}>{phase.description}</p>
                    </button>
                  );
                })}
              </div>

              {/* Right Course cards Panel */}
              <div className="flex-1 overflow-y-visible lg:overflow-y-auto pr-0 lg:pr-2 space-y-3 pb-8 h-auto lg:h-full">
                <p className={`text-[10px] font-black uppercase tracking-[0.2em] mb-1 ${theme === 'dark' ? 'text-white/40' : 'text-gray-500'}`}>
                  Milestone Curriculum ({ibmPhases.find(p => p.id === activeIbmPhase)?.courses.length} courses)
                </p>
                {ibmCourses
                  .filter(c => ibmPhases.find(p => p.id === activeIbmPhase)?.courses.includes(c.id))
                  .map((course, idx) => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                      className={`group rounded-2xl p-4 border transition-all duration-300 ${
                        theme === 'dark'
                          ? 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-[#C8FF5C]/35'
                          : 'bg-gray-50 hover:bg-gray-100 border-gray-205 hover:border-[#8ec438]/45 shadow-sm'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-start sm:items-center gap-4 flex-1 min-w-0">
                          {/* Course Number Badge */}
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-black text-sm transition-all duration-300 ${
                            theme === 'dark'
                              ? 'bg-[#C8FF5C]/10 border border-[#C8FF5C]/25 text-[#C8FF5C] group-hover:bg-[#C8FF5C] group-hover:text-black'
                              : 'bg-[#8ec438]/10 border border-[#8ec438]/25 text-[#6f9828] group-hover:bg-[#8ec438] group-hover:text-white'
                          }`}>
                            {course.id < 10 ? `0${course.id}` : course.id}
                          </div>

                          {/* Course metadata */}
                          <div className="flex-1 min-w-0">
                            <h6 className={`font-black text-sm sm:text-base mb-1 tracking-tight transition-colors duration-300 ${
                              theme === 'dark' 
                                ? 'text-white group-hover:text-[#C8FF5C]' 
                                : 'text-gray-900 group-hover:text-[#8ec438]'
                            }`}>
                              {course.name}
                            </h6>
                            <div className="flex items-center gap-3 text-[11px] font-bold">
                              <span className={theme === 'dark' ? 'text-white/45' : 'text-gray-500'}>{course.duration}</span>
                              <span className="opacity-30">•</span>
                              <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase ${
                                theme === 'dark' ? 'bg-white/5 text-white/65 border border-white/10' : 'bg-gray-100 text-gray-550 border border-gray-200'
                              }`}>Completed</span>
                            </div>
                          </div>
                        </div>

                        {/* View Course Certificate */}
                        <a
                          href={course.certificateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex-shrink-0 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all duration-300 hover:scale-[1.03] shadow-md ${
                            theme === 'dark'
                              ? 'bg-[#C8FF5C]/10 hover:bg-[#C8FF5C] border border-[#C8FF5C]/25 text-[#C8FF5C] hover:text-black shadow-black/10'
                              : 'bg-[#8ec438]/10 hover:bg-[#8ec438] border border-[#8ec438]/25 text-[#5f8420] hover:text-white shadow-gray-150'
                          }`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          <span>View Certificate</span>
                        </a>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
