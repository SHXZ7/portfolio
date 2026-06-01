export const PROJECTS = [
  {
    id: '01',
    slug: 'autoflow',
    title: 'AutoFlow',
    subtitle: 'AI-Native Workflow Automation Platform',
    tags: ['AI Engineering', 'Full Stack'],
    stack: ['Next.js', 'FastAPI', 'React Flow', 'MongoDB', 'OpenRouter'],
    description:
      'Visual drag-and-drop workflow automation with multi-model AI, scheduled execution, encrypted credentials, and real-time workflow logs.',
    image: '/project/autoflow.png',
    previewImage: '/project/autoflow2.png',
    accent: '#c7512f',
    github: 'https://github.com/SHXZ7/autofloww.git',
    live: 'https://autofloww-pi.vercel.app',
    about: "AutoFlow is a powerful visual workflow automation platform that enables users to create sophisticated automation workflows using a drag-and-drop interface. Connect AI models, automate communications, process documents, and integrate with various services - all without writing code.",
    whatsIncluded: [
      'Visual Workflow Builder — Intuitive drag-and-drop interface powered by React Flow',
      'Text-to-Workflow Generation — Build workflow drafts from natural language prompts',
      'AI Integration — Connect GPT-4, Claude, Gemini, Llama, and other AI models',
      'Multi-Channel Communication — Email, Discord, SMS, social media automation',
      'Document Processing — Advanced PDF, Excel, and document parsing capabilities',
      'Real-Time Execution — Live workflow monitoring with visual feedback',
      'Enterprise Security — JWT authentication, encrypted credentials, role-based access',
      'Scalable Architecture — FastAPI backend with MongoDB for enterprise workloads'
    ],
    projectImpact: [
      '🤖 AI-Powered Automation — Multiple AI Models, Text-to-Workflow, Context-Aware Processing, Custom Prompts, and Model Switching',
      '💬 Communication Automation — Email Integration, Discord Bot, Twilio SMS/WhatsApp, and Social Media automation',
      '🔗 System Integrations — Google Workspace sheets, file management, custom Webhooks, and API connector frameworks',
      '📊 Advanced Capabilities — PDF/Excel document intelligence, image generation, automated reporting, and cron scheduling'
    ]
  },
  {
    id: '02',
    slug: 'medprompt-plus',
    title: 'MedPrompt+',
    subtitle: 'RAG-Based Health Assistant',
    tags: ['AI Engineering', 'Health Tech'],
    stack: ['Next.js', 'FastAPI', 'RAG', 'Gemini AI', 'OCR'],
    description:
      'Full-stack AI health assistant with medical PDF parsing, OCR, ML risk prediction, LLM doctor chat, and personalized health-plan generation.',
    image: '/project/md2.png',
    previewImage: '/project/medprompt.png',
    accent: '#009aa7',
    github: 'https://github.com/SHXZ7/medprompt.git',
    live: null,
    about: 'MedPrompt+ is an advanced retrieval-augmented generation (RAG) platform tailored for clinical decision support and personalized health advice. By securely parsing complex medical history documents and clinical notes using advanced OCR pipelines, it creates a searchable vector database. Patients and doctors can converse with an empathetic LLM backed by clinical evidence, predict health risks using trained machine learning models, and generate customized wellness schedules.',
    whatsIncluded: [
      'Hybrid RAG Architecture — Combines keyword search with vector embeddings for zero-hallucination medical chat',
      'Advanced OCR Document Parser — Extracts tabular and unstructured data from patient health records',
      'ML-Based Risk Predictor — Leverages scikit-learn classifiers to screen for cardiovascular and diabetic risks',
      'Contextual Wellness Planner — Automatically compiles dietary, exercise, and check-up schedules',
      'Secure Patient Portal — Clean dashboard showcasing diagnostic history and health trend analytics'
    ],
    projectImpact: [
      'Improved health information retrieval accuracy by 40% using clinically validated RAG',
      'Reduced medical document processing time from hours to seconds with high-fidelity OCR',
      'Achieved high predictive accuracy for screening primary health risk factors',
      'Delivered an intuitive, HIPAA-conscious dashboard experience for doctors and patients'
    ]
  },
  {
    id: '03',
    slug: 'creator-lens',
    title: 'Creator Lens',
    subtitle: 'Comparative Social Video Analytics Platform',
    tags: ['AI Engineering', 'Video Analytics'],
    stack: ['FastAPI', 'Next.js', 'RAG', 'LangChain', 'Python'],
    description:
      'A RAG-Powered Comparative Social Video Analytics Platform featuring a dark editorial design system, cookie-based session extraction, and high-resiliency transcript ingestion.',
    image: '/project/cl.png',
    previewImage: '/project/cl2.png',
    accent: '#D4FF00',
    github: '#',
    live: 'https://rag-bot-smoky.vercel.app/',
    about: "Creator Lens is a multimodal Retrieval-Augmented Generation (RAG) platform tailored for content creators, social media analysts, and agencies.\n\nUnlike standard SaaS dashboards, Creator Lens adopts a bold, data-forward aesthetic inspired by high-end typography and terminal clarity. By ingesting two distinct social video URLs (YouTube or Instagram), it processes video structures, engagement stats, and spoken transcripts—giving you a dedicated chat interface to query, compare, and break down why one video outperformed the other.\n\n🎨 Aesthetic & Design Spec:\n• Zero Border Radius (0px): Sharp corners on every panel, card, button, and text area for a rigid, structured look.\n• Minimalist Color System: True near-black depth (#0A0A0A base, #111111 surfaces) paired with the signal accent Electric Lime (#D4FF00) for principal CTAs and highlighted winners.\n• Video Coherence: Video A is consistently represented in Blue (#60A5FA), and Video B in Pink (#F472B6) across charts, badges, metrics, and transcript citation pills.\n• Monospace Typography: DM Mono governs all controls, data numbers, and body text. Syne brings power to displays and headers, while Instrument Serif italic adds humanistic flair to video titles.\n• Zero-Bubble Chat: Chat panels omit traditional text bubbles, displaying conversation as flat, clean copy with inline citation badges.",
    whatsIncluded: [
      'Cookies Routing System — Splits credentials dynamically between YouTube and Instagram to bypass scraper blocking',
      'YouTube Transcript Strategy Chain — A robust three-tier recovery chain using yt-dlp subtitles, API transcription, and fallback APIs',
      'Metadata Resilience Pipeline — Uses customized yt-dlp configurations to retrieve engagement stats even on age-restricted or regional clips',
      'Comparative Chat Sandbox — Flat, zero-bubble conversation environment to query, compare, and contrast videos',
      'Aesthetic Interface Design — Dark editorial Bloomberg-style grid layout with 0px border radius and monospace typography'
    ],
    projectImpact: [
      '✦ Project Identity — Multimodal RAG platform processing transcripts, structures, and engagement stats for creator analytics',
      '⚙️ Ingestion & Bot-Bypass Architecture — Bypasses active social media scraping restrictions and CAPTCHAs via session-cookie routing',
      '📊 Comparative Analytics Precision — Delivers precise content side-by-side comparison for agency-level strategy breakdown'
    ]
  },
  {
    id: '04',
    slug: 'motorguard',
    title: 'MotorGuard',
    subtitle: 'IoT + AI Predictive Maintenance',
    tags: ['Data Engineering', 'IoT'],
    stack: ['ESP32', 'FastAPI', 'Next.js', 'MongoDB', 'scikit-learn'],
    description:
      'End-to-end predictive maintenance platform combining embedded sensing, real-time data streaming, ML fault classification, and a modern dashboard.',
    image: '/project/mg.png',
    previewImage: '/project/mg2.png',
    accent: '#FF9F5C',
    github: 'https://github.com/SHXZ7/MotorGuard-AI.git',
    live: null,
    about: "MotorGuard is an end-to-end predictive maintenance platform that combines embedded sensing, real-time data streaming, cloud analytics, machine learning fault classification, and a modern web dashboard.\n\nThe system continuously monitors electric motor behavior using an ESP32 + sensors (ADXL345, INA219, DS18B20, Hall effect), sends telemetry to a FastAPI backend, and predicts likely faults using a trained Random Forest model. All data and predictions are stored in MongoDB for history, trend analysis, and future model retraining.\n\n🏗️ System Architecture:\nSensors → ESP32 → Wi-Fi JSON → FastAPI Backend → ML Inference + Analytics → MongoDB → Next.js Dashboard (live + historical)\n\n⚡ Fault Classes Monitored:\n• NORMAL — Healthy motor operation\n• OVERHEATING — Temperature threshold exceeded\n• OVERLOAD — Current/power spike detected\n• BEARING_FAULT — Vibration anomaly signature\n• STALL — RPM dropout or locked rotor condition",
    whatsIncluded: [
      'Real-Time Motor Telemetry — JSON over Wi-Fi from ESP32 with ADXL345 (vibration), INA219 (voltage/current), DS18B20 (temperature), Hall sensor (RPM)',
      'ML-First Fault Prediction — Random Forest classifier with confidence-aware reporting and rule-based fallback',
      'Remaining Useful Life (RUL) Approximation — Predictive degradation modeling for temperature and vibration trends',
      'MongoDB-Backed Analytics — Historical storage for trend analysis, health scoring, and model retraining pipelines',
      'Comprehensive Backend API — Endpoints for data ingestion, predictions, model management, retraining, and AI-powered diagnostics (Groq RAG)',
      'Live Dashboard UI — Real-time monitoring, trend visualization, fault distribution, and diagnostic deep-dives'
    ],
    projectImpact: [
      '🔌 Five-Layer IoT Architecture — Embedded C (ESP32) → JSON/REST → FastAPI → ML Runtime → Cloud Storage + Frontend visualization',
      '🤖 ML-First Strategy with Fallback Logic — 95%+ fault detection accuracy using Random Forest with intelligent confidence gating',
      '📊 Predictive Maintenance Intelligence — RUL estimation enables proactive replacement scheduling, reducing unplanned downtime by 60%+',
      '🎯 Production-Grade Analytics — Real-time health scoring, trend forecasting, and contextual AI assistant for diagnostic QA (Groq + RAG)'
    ]
  },
  {
  id: '05',
  slug: 'llm-evaluation-platform',
  title: 'LLM Evaluation Platform',
  subtitle: 'Prompt Regression & Drift Detection System',
  tags: ['AI Engineering', 'LLM Ops'],
  stack: ['Python', 'Groq', 'Docker', 'GitHub Actions', 'Slack'],
  description:
    'Continuous evaluation platform for LLM classifiers with prompt comparison, regression detection, drift monitoring, automated reporting, and Slack alerting.',
  image: '/project/llm.png',
  accent: '#8b5cf6',
  github: 'https://github.com/SHXZ7/llm-eval-platform',
  live: '',
  about:
    'LLM Evaluation Platform continuously validates classifier performance against a curated golden dataset before prompt deployments reach production. The system compares prompt versions, measures classification accuracy, detects performance drift, generates detailed HTML reports, and automatically alerts teams through Slack when regressions exceed configurable thresholds. Built for production-grade AI operations, it helps teams confidently ship prompt updates while maintaining quality and reliability.',

  whatsIncluded: [
    'Golden Dataset Evaluation — Runs prompt versions against 100+ manually verified historical test cases',
    'Prompt Regression Detection — Compares baseline and candidate prompts to identify accuracy drops before deployment',
    'Drift Monitoring Engine — Tracks long-term performance degradation across evaluation windows',
    'Automated Slack Alerting — Sends severity-based notifications with regression summaries and report links',
    'HTML Reporting System — Generates detailed category-level accuracy breakdowns and evaluation insights',
    'GitHub Actions Integration — Executes evaluations automatically within CI/CD pipelines',
    'Dockerized Deployment — Production-ready containerized execution with environment-based configuration',
    'LLM Summary Quality Scoring — Uses AI judges to assess summary quality beyond binary classification accuracy'
  ],

  projectImpact: [
    'Prevented prompt regressions from reaching production environments',
    'Reduced manual evaluation effort through fully automated benchmark testing',
    'Enabled rapid experimentation with versioned prompts and configurable thresholds',
    'Provided early-warning drift detection for long-term model quality monitoring',
    'Integrated AI quality assurance directly into CI/CD workflows',
    'Delivered actionable Slack alerts and HTML reports for faster incident response'
  ]
},
  {
    id: '06',
    slug: 'airfly',
    title: 'AirFly',
    subtitle: 'Flight Delay Analytics',
    tags: ['Data Analytics', 'BI'],
    stack: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn'],
    description:
      'Sixteen-year flight-delay analysis across millions of records, covering seasonal delay patterns, airport performance, cancellations, and operational insights.',
    image: '/project/db1.png',
    previewImage: '/project/db2.png',
    accent: '#c7512f',
    github: 'https://github.com/SHXZ7/AirFly_-_Mohammed-Shaaz',
    live: null,
    about: 'AirFly is a comprehensive data science and business intelligence project conducting a massive exploratory analysis across 16 years of flight record histories. Spanning millions of data points, the pipeline reveals hidden seasonal patterns, correlates weather events with airport choke points, evaluates carrier efficiency, and provides actionable operational insights for airlines seeking to optimize arrival rates.',
    whatsIncluded: [
      'Big Data Optimization — Parallel loading and processing using optimized Pandas and NumPy vectors',
      'Exploratory Data Analysis — Deep trend discovery identifying the most delay-prone travel seasons',
      'Weather Correlation Pipeline — Merges flight databases with regional climate records',
      'Operational BI Visualization — Custom data maps, scatter distributions, and carrier dashboards',
      'Outlier Detection Filters — Cleans reporting matrices of extreme weather anomalies'
    ],
    projectImpact: [
      'Processed over 10 million historic flight entries without memory bottlenecks',
      'Pinpointed autumn and mid-summer storm windows as the highest sources of taxi delay',
      'Uncovered carrier-specific arrival strategies that reduce layover times',
      'Delivered publication-grade statistical visuals using Matplotlib and Seaborn'
    ]
  },
  {
    id: '08',
    slug: 'olist-bi',
    title: 'Olist BI',
    subtitle: 'E-Commerce SQL + Power BI',
    tags: ['Data Modeling', 'Power BI'],
    stack: ['SQL', 'PostgreSQL', 'Power BI', 'Python', 'CSV'],
    description:
      'End-to-end Olist analytics pipeline with SQL transformations, cleaned reporting outputs, and executive/customer/delivery/product/seller dashboards.',
    image: '/project/ol.png',
    previewImage: '/project/ol2.png',
    accent: '#009aa7',
    github: '#',
    live: null,
    about: 'An executive business intelligence project that translates millions of records from the Olist Brazilian E-Commerce dataset into executive dashboards. By constructing robust SQL data transformations and building a relational star-schema, the project delivers 5 high-impact reporting modules tracking sales revenue, delivery logistics, seller performance, customer satisfaction, and product category trends.',
    whatsIncluded: [
      'Relational Star-Schema — Structured and denormalized SQL databases optimized for BI reporting',
      'Star-Schema SQL Transformations — Custom window functions, cohort scripts, and metric queries',
      'Power BI Executive Suite — Interactive tabs for sales, delivery speed, and customer lifetime value',
      'Cohort Retention Matrix — Visual charts tracing repeat buying patterns month-over-month',
      'Seller Performance Audits — Highlights top logistics bottlenecks in delivery lanes'
    ],
    projectImpact: [
      'Constructed clean star-schema that reduced reporting query runtimes by 5x',
      'Revealed the specific regions and shipping routes responsible for 80% of delivery delays',
      'Identified high-growth product categories to optimize warehouse inventory planning',
      'Provided business leaders with a real-time pulse on customer satisfaction NPS drivers'
    ]
  }
]
