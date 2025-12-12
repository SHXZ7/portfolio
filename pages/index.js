import { useEffect, useState } from 'react'
import { Montserrat } from 'next/font/google'
import Aurora from '../components/Aurora'
import { MorphingCardStack } from '../components/MorphingCardStack'
import { ExpandableProjectGallery } from '../components/ExpandableProjectGallery'
import CinematicThemeSwitcher from '../components/CinematicThemeSwitcher'
import { SocialIcons } from '../components/SocialIcons'
import DownloadCVButton from '../components/DownloadCVButton'
import AnimatedContactButton from '../components/AnimatedContactButton'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900'],
  display: 'swap',
})

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [expandedService, setExpandedService] = useState(null)
  const [showCourseDetails, setShowCourseDetails] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [projectFilter, setProjectFilter] = useState('All')
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
      skills: ['Python', 'JavaScript', 'HTML', 'CSS', 'SQL']
    },
    {
      title: 'Frameworks & Libraries',
      icon: '/icons/framework.png',
      count: '6 technologies',
      skills: ['React', 'Next.js', 'FastAPI', 'Scikit-learn', 'Pandas', 'NumPy']
    },
    {
      title: 'Tools & Platforms',
      icon: '/icons/tools.png',
      count: '6 technologies',
      skills: ['GitHub', 'VS Code', 'Power BI', 'Microsoft Excel', 'Arduino IDE', 'Figma']
    },
    {
      title: 'Machine Learning',
      icon: '/icons/ml.png',
      count: '3 technologies',
      skills: ['Supervised Learning', 'Model Evaluation', 'XGBoost']
    },
    {
      title: 'Data Visualization',
      icon: '/icons/data2.png',
      count: '3 technologies',
      skills: ['Matplotlib', 'Power BI', 'Excel Charts']
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
    id: 'projects',
    label: 'Projects Completed', 
    value: '10+',
    icon: '🚀',
    color: 'from-blue-500/20 to-cyan-500/20',
    borderColor: 'rgba(59, 130, 246, 0.3)',
    description: 'Full-stack applications and ML models'
  },
  { 
    id: 'internships',
    label: 'Internships Completed', 
    value: '3',
    icon: '💼',
    color: 'from-purple-500/20 to-pink-500/20',
    borderColor: 'rgba(168, 85, 247, 0.3)',
    description: 'Industry experience at top companies'
  },
  { 
    id: 'technologies',
    label: 'Technologies Used', 
    value: '20+',
    icon: '⚡',
    color: 'from-green-500/20 to-teal-500/20',
    borderColor: 'rgba(34, 197, 94, 0.3)',
    description: 'Modern frameworks and tools'
  },
  { 
    id: 'events',
    label: 'Hackathons / Events', 
    value: '3+',
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
    duration: '2024',
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
    duration: '2024',
    icon: '⚡',
    color: 'from-yellow-500/20 to-orange-500/20',
    borderColor: 'border-yellow-500/30',
    achievements: [
      'Performed full EDA on carbon emissions dataset',
      'Trained predictive ML models and produced interactive analyses',
      'Delivered insights using Python-based visualization dashboards'
    ]
  }
]

const ibmCourses = [
  { id: 1, name: 'Introduction to Artificial Intelligence (AI)', duration: '12 hours', grade: 'Not started', certificateUrl: '/certificates/ibm/course1.pdf' },
  { id: 2, name: 'Generative AI: Introduction and Applications', duration: '8 hours', grade: 'Not started', certificateUrl: '/certificates/ibm/course2.pdf' },
  { id: 3, name: 'Generative AI: Prompt Engineering Basics', duration: '9 hours', grade: 'Not started', certificateUrl: '/certificates/ibm/course3.pdf' },
  { id: 4, name: 'Python for Data Science, AI & Development', duration: '25 hours', grade: 'Not started', certificateUrl: '/certificates/ibm/course4.pdf' },
  { id: 5, name: 'Developing AI Applications with Python and Flask', duration: '11 hours', grade: 'Not started', certificateUrl: '/certificates/ibm/course5.pdf' },
  { id: 6, name: 'Building Generative AI-Powered Applications with Python', duration: '14 hours', grade: 'Not started', certificateUrl: '/certificates/ibm/course6.pdf' },
  { id: 7, name: 'Data Analysis with Python', duration: '17 hours', grade: 'Not started', certificateUrl: '/certificates/ibm/course7.pdf' },
  { id: 8, name: 'Machine Learning with Python', duration: '20 hours', grade: 'Not started', certificateUrl: '/certificates/ibm/course8.pdf' },
  { id: 9, name: 'Introduction to Deep Learning & Neural Networks with Keras', duration: '10 hours', grade: 'Not started', certificateUrl: '/certificates/ibm/course9.pdf' },
  { id: 10, name: 'Generative AI and LLMs: Architecture and Data Preparation', duration: '5 hours', grade: 'Not started', certificateUrl: '/certificates/ibm/course10.pdf' },
  { id: 11, name: 'Gen AI Foundational Models for NLP & Language Understanding', duration: '9 hours', grade: 'Not started', certificateUrl: '/certificates/ibm/course11.pdf' },
  { id: 12, name: 'Generative AI Language Modeling with Transformers', duration: '9 hours', grade: 'Not started', certificateUrl: '/certificates/ibm/course12.pdf' },
  { id: 13, name: 'Generative AI Engineering and Fine-Tuning Transformers', duration: '8 hours', grade: 'Not started', certificateUrl: '/certificates/ibm/course13.pdf' },
  { id: 14, name: 'Generative AI Advance Fine-Tuning for LLMs', duration: '9 hours', grade: 'Not started', certificateUrl: '/certificates/ibm/course14.pdf' },
  { id: 15, name: 'Fundamentals of AI Agents Using RAG and LangChain', duration: '7 hours', grade: 'Not started', certificateUrl: '/certificates/ibm/course15.pdf' },
  { id: 16, name: 'Project: Generative AI Applications with RAG and LangChain', duration: '9 hours', grade: 'Not started', certificateUrl: '/certificates/ibm/course16.pdf' }
]

  const projects = [
    {
      id: 1,
      title: 'Customer Churn Prediction',
      shortDescription: 'ML-powered analytics to predict customer retention',
      category: 'ML',
      description: 'A predictive analytics project that identifies which customers are likely to stop using a service. Built end-to-end ML pipelines involving EDA, feature engineering, scaling, and multiple models (Logistic Regression, Random Forest, XGBoost). The system evaluates performance using precision, recall, F1, ROC AUC, and exports trained models using pickle for deployment.',
      features: [
        'Exploratory Data Analysis (EDA) on large customer datasets',
        'Advanced feature engineering and data preprocessing',
        'Multiple classification models (Logistic Regression, Random Forest, XGBoost)',
        'Comprehensive model evaluation (Precision, Recall, F1, ROC AUC)',
        'Model export using pickle for production deployment',
        'Real-time prediction API using FastAPI'
      ],
      tech: ['Python', 'Scikit-Learn', 'XGBoost', 'Pandas', 'NumPy', 'Flask', 'FastAPI'],
      highlights: [
        'Built 3 classification models and compared results',
        'Cleaned + processed large customer datasets',
        'Exported ML models for production use',
        'Achieved 85%+ accuracy in churn prediction'
      ],
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      github: 'https://github.com/SHXZ7/churn_prediction.git',
      demo: '#'
    },
    {
      id: 2,
      title: 'MedPrompt+ Health Assistant',
      shortDescription: 'AI-powered health assistant with multi-modal capabilities',
      category: 'Full Stack',
      description: 'A fully functional AI health assistant that predicts medical risk, chats with an AI doctor, parses medical PDFs/images, and visualizes health trends. Combined Machine Learning, LLM AI, PDF parsing, OCR, RAG, and data visualization into one integrated system.',
      features: [
        'Health risk prediction (Low/Moderate/High)',
        'AI Chat Assistant with memory and context',
        'Voice input with speech-to-text',
        'Text-to-speech output for responses',
        'PDF & OCR lab report parsing',
        'Interactive health trend visualization charts',
        '7-day AI-generated personalized health plans'
      ],
      tech: ['Next.js', 'FastAPI', 'Scikit-Learn', 'Gemini AI', 'OpenRouter', 'Tailwind CSS', 'Python', 'OCR', 'RAG'],
      highlights: [
        'Full multi-module dashboard',
        'ML + LLM + visualization in one system',
        'Modern UI with dark/light mode',
        'Real-time health monitoring and alerts'
      ],
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      github: 'https://github.com/SHXZ7/medprompt.git',
      demo: '#'
    },
    {
      id: 3,
      title: 'AI Resume Builder',
      shortDescription: 'Smart resume creation with AI-powered content generation',
      category: 'AI',
      description: 'A modern web app that helps users generate, edit, and export professional resumes. The system uses AI to generate job-specific bullet points, correct grammar, and provide suggestions — all in real time.',
      features: [
        'AI bullet point generator using Gemini API',
        'Real-time grammar correction and suggestions',
        'Multiple professional resume templates',
        'Live preview with instant updates',
        'PDF export using jsPDF & html2canvas',
        'Firebase cloud storage integration',
        'Anonymous login for quick access',
        'Dark/light theme support'
      ],
      tech: ['Next.js', 'Gemini API', 'Firebase', 'jsPDF', 'html2canvas', 'Tailwind CSS', 'React'],
      highlights: [
        'Fully customizable resume editor',
        'Cloud-synced resume storage',
        'AI-driven resume content generation',
        'Export to multiple formats'
      ],
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      github: 'https://github.com/SHXZ7/airesumebuilder.git',
      demo: '#'
    },
    {
      id: 4,
      title: 'EduNova Teaching Platform',
      shortDescription: 'AI-powered educational platform for modern teachers',
      category: 'AI',
      description: 'A powerful educational platform for teachers, integrating AI for lesson planning, content generation, and resource management. Includes community features, real-time chat, file upload, multilingual support, and offline mode for seamless teaching experience.',
      features: [
        'AI-powered lesson plan generation',
        'Smart notes generator (flashcards, mind-maps, summaries)',
        'File upload with PDF/image text extraction',
        'Teacher communities with collaboration tools',
        'Real-time chat with WebSockets',
        'Offline mode with intelligent caching',
        'Multilingual lesson translation',
        'Resource library and management'
      ],
      tech: ['FastAPI', 'Next.js', 'MongoDB', 'OpenRouter AI', 'WebSockets', 'Redis', 'Python', 'React'],
      highlights: [
        'Complex multi-module architecture',
        'Real-time chat + resource management',
        'Advanced AI tools for educators',
        'Scalable cloud infrastructure'
      ],
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      github: 'https://github.com/SHXZ7/teachers-connect.git',
      demo: 'edunova-rosy.vercel.app'
    },
    {
      id: 5,
      title: 'AutoFlow',
      shortDescription: 'Visual Workflow Automation Platform',
      category: 'AI',
      description: 'AutoFlow is a visual drag-and-drop workflow automation platform that lets users build automations without writing code. It integrates multiple AI models, communication channels, file systems, and APIs into a real-time execution engine. Users can create automated pipelines for AI tasks, emails, Discord bots, scheduling, reporting, and document processing.',
      features: [
        'Visual workflow builder with ReactFlow for drag-and-drop automation design',
        'AI processing using GPT-4, Claude, Gemini, and Llama models',
        'Email, Discord, SMS, and social media automation channels',
        'PDF, Excel, and document parsing with AI analysis capabilities',
        'Cron-based scheduling for automated task execution',
        'Real-time workflow execution with detailed logging and monitoring',
        'Role-based authentication with encrypted credentials management'
      ],
      tech: ['Next.js', 'ReactFlow', 'Tailwind CSS', 'FastAPI', 'MongoDB', 'JWT', 'APScheduler', 'OpenRouter', 'AI APIs'],
      highlights: [
        'No-code workflow automation platform',
        'Multi-AI model integration',
        'Real-time execution engine with logs',
        'Secure credential management with encryption'
      ],
      gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
      github: 'https://github.com/SHXZ7/autofloww.git',
      demo: 'autofloww-pi.vercel.app'
    },
    {
      id: 6,
      title: 'AuraHire AI',
      shortDescription: 'Intelligent Resume-Job Matching System',
      category: 'Full Stack',
      description: 'A comprehensive full-stack application featuring a Streamlit frontend and FastAPI backend with PostgreSQL database integration for intelligent resume-job matching. The system uses advanced NLP algorithms, fuzzy matching, and semantic analysis to provide accurate match scores and actionable feedback for job seekers.',
      features: [
        'Quick Match with file upload (PDF, DOCX, TXT) and configurable scoring weights',
        'Advanced skill extraction with 100+ technology skills and fuzzy matching',
        'Resume Parser with email, phone detection and text statistics',
        'Job Parser with automatic skill extraction and requirement analysis',
        'PostgreSQL database with full CRUD operations and match history',
        'Real-time database visualization across multiple management tabs',
        'Audit logging system for tracking all operations and activities',
        'Gap analysis with actionable improvement suggestions'
      ],
      tech: ['FastAPI', 'Streamlit', 'PostgreSQL', 'SQLAlchemy 2.0', 'Alembic', 'NLP', 'Pandas', 'Asyncpg', 'Python'],
      highlights: [
        'Advanced matching algorithm with 70% skills + 30% semantic scoring',
        '100+ skill dictionary with variations and synonyms',
        'Complete database persistence with deduplication',
        'Professional multi-tab interface with real-time updates'
      ],
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      github: 'https://github.com/SHXZ7/AuraHire-AI.git',
      demo: 'https://aurahire-ai-xs4z7kkrlazyrbnpssquvx.streamlit.app/'
    },
    {
      id: 7,
      title: 'AirFly - Flight Delay Analysis',
      shortDescription: 'Comprehensive flight delay pattern analysis across 16 years',
      category: 'Data Analytics',
      description: 'A comprehensive data analytics project analyzing flight delay patterns across multiple datasets spanning from 2008 to 2024. The project provides deep insights into delay causes, seasonal trends, airline performance, geographic patterns, and cancellation analysis using advanced statistical methods and visualizations.',
      features: [
        'Multi-dataset integration: 6.7M+ flight records across 2008-2024 timespan',
        'Advanced preprocessing with feature engineering: temporal, route, and delay indicators',
        'Comprehensive EDA with univariate, bivariate, and correlation analysis',
        'Geographic intelligence: route-level analysis with coordinate mapping',
        'Seasonal pattern analysis: winter vs non-winter impact (7.4x factor)',
        'Cancellation breakdown: weather (48.5%), carrier (38.9%), NAS (12.6%)',
        'Airport performance ranking with delay heatmaps and temporal patterns',
        'Statistical insights: 99.97% flight completion rate, peak delay identification'
      ],
      tech: ['Python', 'Pandas', 'NumPy', 'Jupyter Notebook', 'Matplotlib', 'Seaborn', 'Statistical Analysis'],
      highlights: [
        '7-week comprehensive analysis covering 1.9M+ flights',
        'Geographic mapping with 50+ airports and coordinate integration',
        'Advanced visualization portfolio with 40+ professional charts',
        'Business intelligence ready with actionable operational insights'
      ],
      gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
      github: 'https://github.com/SHXZ7/AirFly_-_Mohammed-Shaaz',
      demo: '#'
    }
  ]

  // Filter projects based on selected category
  const filteredProjects = projectFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === projectFilter)

  // Get unique categories from projects
  const categories = ['All', ...new Set(projects.map(p => p.category))]

  return (
    <>
      {/* Theme Switcher - Fixed Top Left (Hidden on Mobile) */}
      <div className="hidden md:block fixed top-6 left-6 z-50">
        <CinematicThemeSwitcher onThemeChange={setTheme} />
      </div>

      {/* CV Download Button - Bottom Right on Mobile, Top Right on Desktop */}
      <div className="fixed bottom-4 right-4 md:bottom-auto md:top-8 md:right-6 z-50">
        <DownloadCVButton theme={theme} />
      </div>

      {/* Contact Button - Fixed Bottom Left */}
      <div className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-50 scale-75 sm:scale-90 md:scale-100">
        <AnimatedContactButton theme={theme} />
      </div>

      {/* Social Icons - Fixed Bottom Center */}
      <div className="fixed bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-50 scale-75 sm:scale-90 md:scale-100">
        <SocialIcons theme={theme} />
      </div>

      {/* Hero Section */}
      <div className={`min-h-screen relative overflow-hidden transition-colors duration-700 ${
        theme === 'dark' ? 'bg-[#1a1a1a] text-white' : 'bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] text-gray-900'
      }`}>
        {/* Aurora Background - only show in dark mode */}
        {theme === 'dark' && (
          <Aurora 
            colorStops={['#1a1a1a', '#C8FF5C', '#1a1a1a']}
            amplitude={0.8}
            blend={0.6}
            speed={0.5}
          />
        )}

        <div className="container mx-auto px-6 md:px-8 relative z-10 min-h-screen pt-24 pb-20 flex items-center">
          {/* Main Typography Layout */}
          <div className="w-full relative px-4 md:px-0">
            {/* Top Side - NAME & DATA (Hidden on Mobile) */}
            <div 
              className="hidden md:block absolute left-[-8%] top-1/2 -translate-y-1/2 z-10 transition-all duration-700"
              style={{ 
                opacity: 1 - scrollY / 500,
                transform: `translate(-${scrollY / 5}px, -50%)`
              }}
            >
              <p className={`${montserrat.className} text-[8px] sm:text-[10px] md:text-[13px] uppercase tracking-[0.2em] sm:tracking-[0.25em] md:tracking-[0.3em] mb-2 sm:mb-3 md:mb-4 font-semibold animate-fadeIn ${
                theme === 'dark' ? 'text-white/60' : 'text-gray-600'
              }`}>
                MOHAMMED SHAAZ
              </p>
              <h1 className={`${montserrat.className} text-[50px] sm:text-[65px] md:text-[clamp(70px,10vw,160px)] font-black leading-[0.85] tracking-[-0.03em] animate-slideInLeft`} style={{ fontWeight: 900 }}>
                DATA 
              </h1>
            </div>

            {/* Bottom Side - SCIENCE (Hidden on Mobile) */}
            <div 
              className="hidden md:block absolute right-[-11%] top-1/2 -translate-y-1/2 z-10 transition-all duration-700 text-right"
              style={{ 
                opacity: 1 - scrollY / 500,
                transform: `translate(${scrollY / 5}px, -50%)`
              }}
            >
              <h1 className={`${montserrat.className} text-[50px] sm:text-[65px] md:text-[clamp(70px,10vw,160px)] font-black leading-[0.85] tracking-[-0.03em] animate-slideInRight`} style={{ fontWeight: 900 }}>
                SCIENCE
              </h1>
              <p className={`text-[10px] sm:text-xs md:text-sm mt-2 sm:mt-3 md:mt-3 max-w-[200px] sm:max-w-[240px] md:max-w-md mx-auto md:mx-0 md:ml-auto font-bold leading-relaxed animate-fadeIn opacity-0 ${
                theme === 'dark' ? 'text-white/80' : 'text-gray-700'
              }`} style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
                I'm an Indian-based Data Analyst and Machine Learning enthusiast
              </p>
            </div>

            {/* Center Portrait */}
            <div 
              className="absolute left-[42%] top-[40%] sm:top-[42%] md:top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-700"
              style={{ 
                opacity: 1 - scrollY / 400,
                transform: `translate(-50%, calc(-50% - ${scrollY / 3}px)) scale(${1 - scrollY / 2000})`
              }}
            >
              <div className="w-[180px] h-[240px] sm:w-[220px] sm:h-[300px] md:w-[270px] md:h-[370px] lg:w-[310px] lg:h-[420px] rounded-[20px] overflow-hidden shadow-2xl bg-[#f5f5f5] animate-scaleIn transition-transform hover:scale-105 duration-300">
                <img
                  src="/shaaz.jpg"
                  alt="Mohammed Shaaz Sharafuddin"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.backgroundColor = '#f5f5f5'
                    e.target.src = '/shaaz.jpg'
                  }}
                />
              </div>

              {/* Speech Bubble "Hi" */}
              <div className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 md:-bottom-10 md:-left-10 z-40 animate-bounceIn" style={{ animationDelay: '0.5s' }}>
                <div className="relative group cursor-pointer">
                  <div className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] md:w-[130px] md:h-[130px] lg:w-[150px] lg:h-[150px] bg-[#C8FF5C] rounded-full flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110 duration-300">
                    <span className="text-[#1a1a1a] text-[28px] sm:text-[36px] md:text-[46px] lg:text-[52px] font-semibold">Hi</span>
                  </div>
                  <div className="absolute -bottom-1.5 sm:-bottom-2 left-8 sm:left-10 md:left-12 lg:left-16 w-0 h-0 
                    border-l-[10px] sm:border-l-[12px] md:border-l-[16px] lg:border-l-[18px] border-l-transparent 
                    border-r-[10px] sm:border-r-[12px] md:border-r-[16px] lg:border-r-[18px] border-r-transparent 
                    border-t-[14px] sm:border-t-[16px] md:border-t-[20px] lg:border-t-[22px] border-t-[#C8FF5C] 
                    rotate-[20deg]">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div id="about" className={`relative overflow-hidden transition-colors duration-700 ${
        theme === 'dark' 
          ? 'bg-gradient-to-b from-[#1a1a1a] via-[#0f0f0f] to-black text-white' 
          : 'bg-gradient-to-b from-white via-gray-50 to-gray-100 text-gray-900'
      }`}>
        <div className="container mx-auto px-6 py-20 md:py-32">
          <div className="max-w-6xl mx-auto">
            {/* About Header */}
            <div 
              className="mb-16 transition-all duration-1000 ease-out"
              style={{
                opacity: scrollY > 200 ? 1 : 0,
                transform: scrollY > 200 ? 'translateY(0)' : 'translateY(50px)'
              }}
            >
              <h2 className={`text-5xl md:text-7xl font-black mb-6 ${
                theme === 'dark' 
                  ? 'bg-gradient-to-r from-[#C8FF5C] to-white bg-clip-text text-transparent'
                  : 'bg-gradient-to-r from-[#8ec438] to-gray-900 bg-clip-text text-transparent'
              }`}>
                About Me
              </h2>
              <div className="w-20 h-1 bg-[#C8FF5C] rounded-full"></div>
            </div>

            {/* About Content */}
            <div className="grid md:grid-cols-2 gap-12 mb-20">
              <div 
                className="transition-all duration-1000 ease-out delay-200"
                style={{
                  opacity: scrollY > 300 ? 1 : 0,
                  transform: scrollY > 300 ? 'translateX(0)' : 'translateX(-50px)'
                }}
              >
                <h3 className="text-2xl font-bold mb-4 text-[#C8FF5C]">Who I Am</h3>
                <p className={`text-lg leading-relaxed mb-4 ${
                  theme === 'dark' ? 'text-white/80' : 'text-gray-700'
                }`}>
                  I'm an Electronics and Communication Engineering student with hands-on experience in data analytics, machine learning, and full-stack development
                </p>
                <p className={`text-lg leading-relaxed ${
                  theme === 'dark' ? 'text-white/80' : 'text-gray-700'
                }`}>
                  I enjoy uncovering meaningful insights from complex datasets and transforming them into real-world solutions. My background includes building AI-driven applications, health prediction systems, and intelligent resume tools, backed by strong problem-solving and communication skills
                </p>
              </div>

              <div 
                className="transition-all duration-1000 ease-out delay-300"
                style={{
                  opacity: scrollY > 300 ? 1 : 0,
                  transform: scrollY > 300 ? 'translateX(0)' : 'translateX(50px)'
                }}
              >
                <h3 className="text-2xl font-bold mb-4 text-[#C8FF5C]">What I Do</h3>
                <p className={`text-lg leading-relaxed mb-4 ${
                  theme === 'dark' ? 'text-white/80' : 'text-gray-700'
                }`}>
                  I turn raw data into actionable insights using Python, advanced analytics, and machine learning techniques.
                </p>
                <p className={`text-lg leading-relaxed ${
                  theme === 'dark' ? 'text-white/80' : 'text-gray-700'
                }`}>
                 I design and develop full-stack applications with frameworks like Next.js and FastAPI, integrating AI models, dashboards, and automation workflows. From predictive modeling to intuitive web interfaces, I help create data-driven solutions that improve decision-making and user experience.
                </p>
              </div>
            </div>

            {/* Skills Section */}
            <div 
              className="transition-all duration-1000 ease-out delay-500"
              style={{
                opacity: scrollY > 500 ? 1 : 0,
                transform: scrollY > 500 ? 'translateY(0)' : 'translateY(50px)'
              }}
            >
              <h3 className="text-4xl font-extrabold mb-8 text-center">Technical Skills</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                  {skillCategories.map((category) => (
                <div 
                  key={category.title} 
                  className={`relative backdrop-blur-xl rounded-3xl p-8 transition-all duration-500 group overflow-hidden hover:shadow-2xl hover:-translate-y-1 ${
                    theme === 'dark'
                      ? 'bg-gradient-to-br from-[#1a1a1a]/80 to-[#0d0d0d]/60 border border-white/5 hover:border-[#C8FF5C]/40 hover:shadow-[#C8FF5C]/10'
                      : 'bg-white/80 border border-gray-200 hover:border-[#C8FF5C]/60 hover:shadow-[#C8FF5C]/20'
                  }`}
                >
              <div className={`absolute inset-0 rounded-3xl transition-all duration-500 ${
                theme === 'dark'
                  ? 'bg-gradient-to-br from-[#C8FF5C]/0 to-[#C8FF5C]/0 group-hover:from-[#C8FF5C]/5 group-hover:to-transparent'
                  : 'bg-gradient-to-br from-[#C8FF5C]/0 to-[#C8FF5C]/0 group-hover:from-[#C8FF5C]/10 group-hover:to-transparent'
              }`} />
              
              <div className="relative flex items-start gap-5 mb-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-lg overflow-hidden p-2 ${
                  theme === 'dark'
                    ? 'bg-gradient-to-br from-[#C8FF5C]/15 to-[#C8FF5C]/5 group-hover:from-[#C8FF5C]/25 group-hover:to-[#C8FF5C]/10 shadow-[#C8FF5C]/0 group-hover:shadow-[#C8FF5C]/20'
                    : 'bg-gradient-to-br from-[#C8FF5C]/30 to-[#C8FF5C]/10 group-hover:from-[#C8FF5C]/50 group-hover:to-[#C8FF5C]/20 shadow-[#C8FF5C]/10 group-hover:shadow-[#C8FF5C]/30'
                }`}>
                  <img 
                    src={category.icon} 
                    alt={category.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1 pt-1">
                  <h4 className={`text-xl font-bold mb-2 tracking-tight transition-colors duration-300 ${
                    theme === 'dark'
                      ? 'text-white group-hover:text-[#C8FF5C]'
                      : 'text-gray-900 group-hover:text-[#8ec438]'
                  }`}>{category.title}</h4>
                  <p className={`text-sm font-medium transition-colors duration-300 ${
                    theme === 'dark'
                      ? 'text-white/40 group-hover:text-white/60'
                      : 'text-gray-500 group-hover:text-gray-700'
                  }`}>{category.count}</p>
                </div>
              </div>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <span 
                          key={skill}
                          className={`px-3 py-1.5 rounded-lg text-xs border transition-all duration-300 ${
                            theme === 'dark'
                              ? 'bg-white/5 text-white/70 border-white/10 hover:border-[#C8FF5C]/50 hover:text-[#C8FF5C]'
                              : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-[#C8FF5C]/70 hover:text-[#8ec438] hover:bg-[#C8FF5C]/10'
                          }`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* What I Can Do For You Section */}
            <div 
              className="mt-32 transition-all duration-1000 ease-out"
              style={{
                opacity: scrollY > 900 ? 1 : 0,
                transform: scrollY > 900 ? 'translateY(0)' : 'translateY(50px)'
              }}
            >
              <div className="max-w-4xl mx-auto">
                <h2 className="text-5xl md:text-6xl font-black mb-4 uppercase tracking-tight">
                  What I Can Do For You
                </h2>
                <p className={`text-lg mb-12 max-w-2xl ${
                  theme === 'dark' ? 'text-white/60' : 'text-gray-600'
                }`}>
                  As a data scientist and full-stack developer, I craft data-driven solutions that connect insights with innovation
                </p>

                <div className="space-y-4">
                  {services.map((service, index) => (
                    <div
                      key={service.id}
                      className={`group backdrop-blur-sm rounded-2xl overflow-hidden transition-all duration-300 ${
                        theme === 'dark'
                          ? 'bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-[#C8FF5C]/30'
                          : 'bg-white/80 border border-gray-200 hover:border-[#C8FF5C]/50 shadow-sm hover:shadow-lg'
                      }`}
                      style={{ transitionDelay: `${index * 50}ms` }}
                    >
                      <button
                        onClick={() => setExpandedService(expandedService === service.id ? null : service.id)}
                        className={`w-full px-8 py-6 flex items-center justify-between text-left transition-colors duration-300 ${
                          theme === 'dark' ? 'group-hover:bg-white/[0.02]' : 'group-hover:bg-gray-50/50'
                        }`}
                      >
                        <span className={`text-xl md:text-2xl font-bold transition-colors duration-300 ${
                          theme === 'dark'
                            ? 'text-white/90 group-hover:text-[#C8FF5C]'
                            : 'text-gray-900 group-hover:text-[#8ec438]'
                        }`}>
                          {service.title}
                        </span>
                        <svg
                          className={`w-6 h-6 transition-all duration-300 ${
                            expandedService === service.id ? 'rotate-180' : ''
                          } ${
                            theme === 'dark'
                              ? 'text-white/60 group-hover:text-[#C8FF5C]'
                              : 'text-gray-500 group-hover:text-[#8ec438]'
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          expandedService === service.id ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="px-8 pb-6 pt-2">
                          {service.image ? (
                            <div className="flex flex-col md:flex-row gap-8 items-start">
                              <div className="flex-1">
                                <p className={`leading-relaxed text-base whitespace-pre-line ${
                                  theme === 'dark' ? 'text-white/70' : 'text-gray-700'
                                }`}>
                                  {service.description}
                                </p>
                              </div>
                              <div className="w-full md:w-[380px] flex-shrink-0">
                                <div className={`rounded-2xl overflow-hidden border p-4 shadow-lg ${
                                  theme === 'dark'
                                    ? 'border-[#C8FF5C]/20 bg-gradient-to-br from-white/5 to-transparent shadow-[#C8FF5C]/10'
                                    : 'border-[#C8FF5C]/30 bg-white shadow-[#C8FF5C]/20'
                                }`}>
                                  <img 
                                    src={service.image} 
                                    alt={service.title}
                                    className="w-full h-auto object-contain rounded-xl"
                                  />
                                </div>
                              </div>
                            </div>
                          ) : (
                            <p className={`leading-relaxed text-base whitespace-pre-line ${
                              theme === 'dark' ? 'text-white/70' : 'text-gray-700'
                            }`}>
                              {service.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div id="achievements" className={`relative overflow-hidden scroll-mt-20 transition-colors duration-700 ${
        theme === 'dark'
          ? 'bg-gradient-to-b from-black via-[#0f0f0f] to-[#1a1a1a] text-white'
          : 'bg-gradient-to-b from-gray-100 via-gray-50 to-white text-gray-900'
      }`}>
        <div className="container mx-auto px-6 py-20 md:py-32">
          <div className="max-w-7xl mx-auto">
            {/* Achievements Header */}
            <div 
              className="mb-16 transition-all duration-1000 ease-out"
              style={{
                opacity: scrollY > 1200 ? 1 : 0,
                transform: scrollY > 1200 ? 'translateY(0)' : 'translateY(50px)'
              }}
            >
              <h2 className={`text-5xl md:text-7xl font-black mb-6 ${
                theme === 'dark'
                  ? 'bg-gradient-to-r from-[#C8FF5C] to-white bg-clip-text text-transparent'
                  : 'bg-gradient-to-r from-[#8ec438] to-gray-900 bg-clip-text text-transparent'
              }`}>
                Achievements & Certifications
              </h2>
              <div className="w-20 h-1 bg-[#C8FF5C] rounded-full"></div>
              <p className={`text-lg mt-6 max-w-2xl ${
                theme === 'dark' ? 'text-white/60' : 'text-gray-600'
              }`}>
                Academic excellence and professional certifications that showcase my commitment to continuous learning and skill development
              </p>
            </div>

            {/* Certifications Grid */}
            <div 
              className="transition-all duration-1000 ease-out"
              style={{
                opacity: scrollY > 1300 ? 1 : 0,
                transform: scrollY > 1300 ? 'translateY(0)' : 'translateY(50px)'
              }}
            >
              <h3 className="text-3xl font-bold mb-8 text-[#C8FF5C]">🎓 Certification Achievements </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certifications.map((cert, index) => (
                  <div
                    key={cert.id}
                    className={`group relative backdrop-blur-xl border rounded-3xl p-6 transition-all duration-500 overflow-hidden hover:shadow-2xl hover:-translate-y-2 ${
                      theme === 'dark'
                        ? `bg-gradient-to-br from-[#1a1a1a]/80 to-[#0d0d0d]/60 ${cert.borderColor} hover:border-[#C8FF5C]/50 hover:shadow-[#C8FF5C]/10`
                        : `bg-white border-gray-200 hover:border-[#C8FF5C]/60 hover:shadow-[#C8FF5C]/20`
                    }`}
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`} />
                    
                    <div className="relative z-10">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500 shadow-lg overflow-hidden ${
                        theme === 'dark'
                          ? 'bg-gradient-to-br from-[#C8FF5C]/15 to-[#C8FF5C]/5'
                          : 'bg-gradient-to-br from-[#C8FF5C]/30 to-[#C8FF5C]/10'
                      }`}>
                        {cert.icon.startsWith('/') ? (
                          <img 
                            src={cert.icon} 
                            alt={cert.title}
                            className="w-10 h-10 object-contain"
                          />
                        ) : (
                          <span className="text-4xl">{cert.icon}</span>
                        )}
                      </div>
                      
                      <h3 className={`text-xl font-bold mb-2 tracking-tight group-hover:text-[#C8FF5C] transition-colors duration-300 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {cert.title}
                      </h3>
                      
                      <p className={`text-sm font-medium mb-2 transition-colors duration-300 ${
                        theme === 'dark'
                          ? 'text-white/60 group-hover:text-white/80'
                          : 'text-gray-600 group-hover:text-gray-800'
                      }`}>
                        {cert.issuer}
                      </p>
                      
                      {cert.description && (
                        <p className={`text-xs mb-3 transition-colors duration-300 ${
                          theme === 'dark'
                            ? 'text-white/50 group-hover:text-white/70'
                            : 'text-gray-500 group-hover:text-gray-700'
                        }`}>
                          {cert.description}
                        </p>
                      )}
                      
                      <div className="flex items-center justify-between mt-4">
                        <div className="inline-block px-3 py-1 bg-[#C8FF5C]/10 border border-[#C8FF5C]/30 rounded-full text-xs text-[#C8FF5C] font-medium">
                          {cert.date}
                        </div>
                        
                        <a
                          href={cert.certificateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/btn inline-flex items-center gap-2 px-4 py-2 bg-[#C8FF5C]/20 hover:bg-[#C8FF5C]/30 border border-[#C8FF5C]/40 hover:border-[#C8FF5C]/60 rounded-full text-xs text-[#C8FF5C] font-semibold transition-all duration-300 hover:scale-105"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span>View</span>
                          <svg 
                            className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform duration-300" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </a>
                      </div>
                    </div>

                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#C8FF5C]/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                ))}
              </div>
            </div>

            {/* IBM Courses Section - Fixed */}
            <div 
              className="mt-24 transition-all duration-1000 ease-out"
              style={{
                opacity: scrollY > 1450 ? 1 : 0,
                transform: scrollY > 1450 ? 'translateY(0)' : 'translateY(50px)'
              }}
            >
              <h3 className="text-3xl font-bold mb-8 text-[#C8FF5C]">🎯 Professional Certification</h3>
              
              {/* Compact Card - Collapsed State */}
              <div 
                onClick={() => setShowCourseDetails(true)}
                className={`group relative rounded-3xl p-8 transition-all duration-500 overflow-hidden hover:shadow-2xl hover:-translate-y-2 max-w-3xl cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] backdrop-blur-2xl border border-blue-500/30 hover:border-[#C8FF5C]/60 hover:shadow-[#C8FF5C]/10'
                    : 'bg-white border border-gray-200 hover:border-[#C8FF5C]/60 hover:shadow-[#C8FF5C]/20'
                }`}
              >
                <div className={`absolute inset-0 rounded-3xl transition-opacity duration-500 ${
                  theme === 'dark'
                    ? 'bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100'
                    : 'bg-gradient-to-br from-[#C8FF5C]/5 to-transparent opacity-100'
                }`} />
                
                <div className="relative z-10 flex items-center gap-6">
                  {/* Logo */}
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500 p-2 ${
                    theme === 'dark'
                      ? 'bg-gradient-to-br from-blue-500/20 to-blue-600/10'
                      : 'bg-gradient-to-br from-[#C8FF5C]/30 to-[#8ec438]/20'
                  }`}>
                    <img 
                      src="/ibm/ibm.png" 
                      alt="IBM Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h4 className={`text-xl md:text-2xl font-black mb-2 tracking-tight group-hover:text-[#C8FF5C] transition-colors duration-500 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      IBM Generative AI Engineering Professional Certificate
                    </h4>
                    <div className="flex items-center gap-3 flex-wrap">
                      <div className="px-3 py-1 bg-gradient-to-r from-[#C8FF5C]/15 to-[#C8FF5C]/5 border border-[#C8FF5C]/20 rounded-full">
                        <span className="text-xs text-[#C8FF5C] font-bold">16 courses</span>
                      </div>
                      <span className="text-yellow-400 text-sm">★</span>
                      <span className={`text-xs ${theme === 'dark' ? 'text-white/50' : 'text-gray-500'}`}>Click to see details →</span>
                    </div>
                  </div>
                </div>

                <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                  theme === 'dark'
                    ? 'bg-gradient-to-br from-blue-500/20 to-transparent'
                    : 'bg-gradient-to-br from-[#C8FF5C]/20 to-transparent'
                }`} />
              </div>
            </div>

            {/* Internship Experience Section */}
            <div 
              className="mt-24 transition-all duration-1000 ease-out"
              style={{
                opacity: scrollY > 1500 ? 1 : 0,
                transform: scrollY > 1500 ? 'translateY(0)' : 'translateY(50px)'
              }}
            >
              <h3 className={`text-5xl md:text-6xl font-black mb-4 tracking-tight ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>Work Experience</h3>
              <p className={`text-base mb-16 max-w-3xl leading-relaxed ${
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
                              className={`text-sm md:text-base leading-relaxed transition-colors duration-500 ${
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
            </div>

            {/* Stats Section */}
            <div 
              className="mt-24 transition-all duration-1000 ease-out"
              style={{
                opacity: scrollY > 1700 ? 1 : 0,
                transform: scrollY > 1700 ? 'translateY(0)' : 'translateY(50px)'
              }}
            >
              <MorphingCardStack 
                cards={stats}
                theme={theme}
                onCardClick={(card) => console.log('Card clicked:', card)}
              />
            </div>

          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div id="projects" className={`relative overflow-hidden scroll-mt-20 transition-colors duration-700 ${
        theme === 'dark'
          ? 'bg-gradient-to-b from-[#1a1a1a] via-[#0f0f0f] to-black text-white'
          : 'bg-gradient-to-b from-white via-gray-50 to-gray-100 text-gray-900'
      }`}>
        <div className="container mx-auto px-6 pt-1 md:pt-2 pb-20 md:pb-32">
          <div className="max-w-7xl mx-auto">
            {/* Projects Header */}
            <div 
              className="mb-16 transition-all duration-1000 ease-out"
              style={{
                opacity: scrollY > 1850 ? 1 : 0,
                transform: scrollY > 1850 ? 'translateY(0)' : 'translateY(50px)'
              }}
            >
              <h2 className={`text-5xl md:text-7xl font-black mb-6 leading-[1.1] pb-2 ${
                theme === 'dark'
                  ? 'bg-gradient-to-r from-[#C8FF5C] to-white bg-clip-text text-transparent'
                  : 'bg-gradient-to-r from-[#8ec438] to-gray-900 bg-clip-text text-transparent'
              }`}>
                Featured Projects
              </h2>
              <div className="w-20 h-1 bg-[#C8FF5C] rounded-full"></div>
              <p className={`text-lg mt-6 max-w-2xl ${
                theme === 'dark' ? 'text-white/60' : 'text-gray-600'
              }`}>
                Explore my portfolio of data science, machine learning, and full-stack development projects. 
                Hover to preview, click to view details.
              </p>
            </div>

            {/* Filter Bar */}
            <div 
              className="mb-12 transition-all duration-1000 ease-out"
              style={{
                opacity: scrollY > 1850 ? 1 : 0,
                transform: scrollY > 1850 ? 'translateY(0)' : 'translateY(30px)'
              }}
            >
              <div className="flex flex-wrap gap-3 items-center">
                <span className={`text-sm font-semibold mr-2 ${
                  theme === 'dark' ? 'text-white/50' : 'text-gray-500'
                }`}>Filter by:</span>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setProjectFilter(category)}
                    className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                      projectFilter === category
                        ? 'bg-[#C8FF5C] text-black shadow-lg shadow-[#C8FF5C]/20 scale-105'
                        : theme === 'dark'
                        ? 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10 hover:border-[#C8FF5C]/30'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-[#C8FF5C]/50 shadow-sm'
                    }`}
                  >
                    {category}
                    {category !== 'All' && (
                      <span className="ml-2 text-xs opacity-60">
                        ({projects.filter(p => p.category === category).length})
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Expandable Project Gallery */}
            <div 
              className="transition-all duration-1000 ease-out"
              style={{
                opacity: scrollY > 1900 ? 1 : 0,
                transform: scrollY > 1900 ? 'translateY(0)' : 'translateY(50px)'
              }}
            >
              <ExpandableProjectGallery projects={filteredProjects} theme={theme} className="max-w-7xl mx-auto" />
            </div>
          </div>
        </div>
      </div>

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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
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
            theme === 'dark' ? 'bg-[#C8FF5C]' : 'bg-[#8ec438]'
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
                      className="w-9 h-9 rounded-full bg-black/90 hover:bg-black flex items-center justify-center transition-all duration-300 hover:scale-110"
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
                      className="w-9 h-9 rounded-full bg-black/90 hover:bg-black flex items-center justify-center transition-all duration-300 hover:scale-110"
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
                      className="w-9 h-9 rounded-full bg-black/90 hover:bg-black flex items-center justify-center transition-all duration-300 hover:scale-110"
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
                      className="w-9 h-9 rounded-full bg-black/90 hover:bg-black flex items-center justify-center transition-all duration-300 hover:scale-110"
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


      {/* Course Details Modal - Fixed */}
      {showCourseDetails && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          onClick={() => setShowCourseDetails(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md animate-fadeIn" />
          
          {/* Modal Content */}
          <div 
            className={`relative rounded-[32px] p-8 md:p-12 max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-slideInUp ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-blue-500/30'
                : 'bg-white border border-gray-200'
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
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0 p-3 ${
                theme === 'dark'
                  ? 'bg-gradient-to-br from-blue-500/20 to-blue-600/10'
                  : 'bg-gradient-to-br from-[#C8FF5C]/30 to-[#8ec438]/20'
              }`}>
                <img 
                  src="/ibm/ibm.png" 
                  alt="IBM Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1">
                <h4 className={`text-2xl md:text-3xl font-black mb-3 tracking-tight leading-tight ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  IBM Generative AI Engineering Professional Certificate
                </h4>
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-[#C8FF5C] font-bold">16 courses</span>
                  </div>
                  <span className="text-yellow-400 text-sm">★</span>
                  <span className={`text-xs ${theme === 'dark' ? 'text-white/50' : 'text-gray-500'}`}>Click to see details →</span>
                </div>
              </div>
            </div>

            {/* Courses List */}
            <div className="mb-8">
              <h5 className={`text-xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Course Series (16 Courses)</h5>
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#C8FF5C]/30 scrollbar-track-white/5 hover:scrollbar-thumb-[#C8FF5C]/50">
                {ibmCourses.map((course) => (
                  <div 
                    key={course.id}
                    className={`group rounded-xl p-4 border transition-all duration-300 ${
                      theme === 'dark'
                        ? 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-[#C8FF5C]/30'
                        : 'bg-gray-50 hover:bg-gray-100 border-gray-200 hover:border-[#C8FF5C]/50'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Course Number */}
                      <div className="w-10 h-10 bg-gradient-to-br from-[#C8FF5C]/20 to-[#C8FF5C]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-[#C8FF5C] font-bold text-sm">{course.id}</span>
                      </div>

                      {/* Course Details */}
                      <div className="flex-1 min-w-0">
                        <h6 className={`font-semibold text-sm mb-1 group-hover:text-[#C8FF5C] transition-colors duration-300 ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                          {course.name}
                        </h6>
                        <div className="flex items-center gap-4 text-xs">
                          <span className={theme === 'dark' ? 'text-white/50' : 'text-gray-600'}>{course.duration}</span>
                          <span className={theme === 'dark' ? 'text-white/40' : 'text-gray-400'}>•</span>
                          <span className={theme === 'dark' ? 'text-white/60' : 'text-gray-700'}>Grade: <span className={theme === 'dark' ? 'text-white/40' : 'text-gray-500'}>{course.grade}</span></span>
                        </div>
                      </div>

                      {/* View Certificate Button */}
                      <a
                        href={course.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#C8FF5C]/10 hover:bg-[#C8FF5C]/20 border border-[#C8FF5C]/30 hover:border-[#C8FF5C]/50 rounded-lg text-xs text-[#C8FF5C] font-semibold transition-all duration-300 hover:scale-105"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <span>View</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
    
      )}
    </>
  )
}