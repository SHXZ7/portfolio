import { useEffect, useState } from 'react'

export default function Home() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const skillCategories = [
    {
      title: 'Programming Languages',
      icon: '🌐',
      count: '7 technologies',
      skills: ['Python', 'JavaScript', 'C', 'HTML', 'CSS', 'SQL', 'Node.js']
    },
    {
      title: 'Frameworks & Libraries',
      icon: '⚡',
      count: '6 technologies',
      skills: ['React', 'Next.js', 'FastAPI', 'Scikit-learn', 'Pandas', 'NumPy']
    },
    {
      title: 'Tools & Platforms',
      icon: '⚙️',
      count: '6 technologies',
      skills: ['GitHub', 'VS Code', 'Power BI', 'Microsoft Excel', 'Arduino IDE', 'Figma']
    },
    {
      title: 'Machine Learning',
      icon: '🤖',
      count: '3 technologies',
      skills: ['Supervised Learning', 'Model Evaluation', 'XGBoost']
    },
    {
      title: 'Data Visualization',
      icon: '📊',
      count: '3 technologies',
      skills: ['Matplotlib', 'Power BI', 'Excel Charts']
    },
    {
      title: 'Languages',
      icon: '🗣️',
      count: '3 languages',
      skills: ['English', 'Malayalam', 'Hindi']
    }
  ]

const stats = [
  { label: 'Projects Completed', value: '10+' },
  { label: 'Internships Completed', value: '3' },
  { label: 'Technologies Used', value: '20+' },
  { label: 'Hackathons / Events', value: '3+' }
];

  return (
    <>
      {/* Hero Section */}
      <div className="bg-[#1a1a1a] min-h-screen text-white relative overflow-hidden">
        {/* Grainy texture overlay */}
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '300px 300px',
          }}
        />

        <div className="container mx-auto px-4 md:px-6 relative z-10 min-h-screen pt-24 pb-20 flex items-center">
          {/* Main Typography Layout */}
          <div className="w-full relative">
            {/* Left Side - NAME & DATA */}
            <div 
              className="absolute left-[0%] md:left-[-4%] top-1/2 -translate-y-1/2 z-10 transition-all duration-700"
              style={{ 
                opacity: 1 - scrollY / 500,
                transform: `translate(-${scrollY / 5}px, -50%)`
              }}
            >
              <p className="text-white/60 text-[9px] md:text-[13px] uppercase tracking-[0.25em] md:tracking-[0.3em] mb-3 md:mb-4 font-bold animate-fadeIn">
                MOHAMMED SHAAZ SHARAFUDDIN
              </p>
              <h1 className="text-[clamp(30px,10vw,160px)] md:text-[clamp(70px,10vw,160px)] font-black leading-[0.85] tracking-[-0.03em] animate-slideInLeft">
                DATA 
              </h1>
            </div>

            {/* Right Side - SCIENCE */}
            <div 
              className="absolute right-[-4%] md:right-[-8%] top-1/2 -translate-y-1/2 z-10 transition-all duration-700"
              style={{ 
                opacity: 1 - scrollY / 500,
                transform: `translate(${scrollY / 5}px, -50%)`
              }}
            >
              <h1 className="text-[clamp(60px,10vw,180px)] md:text-[clamp(70px,10vw,160px)] font-black leading-[0.85] tracking-[-0.03em] text-right animate-slideInRight">
                SCIENCE
              </h1>
              <p className="text-white/80 text-xs md:text-sm mt-4 md:mt-6 max-w-[250px] md:max-w-md text-right ml-auto font-light leading-relaxed animate-fadeIn opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
                I'm an Indian-based Data Analyst and Machine Learning enthusiast
              </p>
            </div>

            {/* Center Portrait */}
            <div 
              className="absolute left-[45%] top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-700"
              style={{ 
                opacity: 1 - scrollY / 400,
                transform: `translate(-50%, calc(-50% - ${scrollY / 3}px)) scale(${1 - scrollY / 2000})`
              }}
            >
              <div className="w-[240px] h-[320px] sm:w-[280px] sm:h-[380px] md:w-[320px] md:h-[430px] rounded-[20px] overflow-hidden shadow-2xl bg-[#f5f5f5] animate-scaleIn transition-transform hover:scale-105 duration-300">
                <img
                  src="/shaaz-portrait.jpg"
                  alt="Mohammed Shaaz Sharafuddin"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.backgroundColor = '#f5f5f5'
                    e.target.src = 'https://via.placeholder.com/320x430/f5f5f5/333333?text=MS'
                  }}
                />
              </div>

              {/* Speech Bubble "Hi" */}
              <div className="absolute -bottom-8 -left-8 md:-bottom-10 md:-left-10 z-40 animate-bounceIn" style={{ animationDelay: '0.5s' }}>
                <div className="relative group cursor-pointer">
                  {/* Bubble */}
                  <div className="w-[110px] h-[110px] md:w-[150px] md:h-[150px] bg-[#C8FF5C] rounded-full flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110 duration-300">
                    <span className="text-[#1a1a1a] text-[40px] md:text-[52px] font-semibold">Hi</span>
                  </div>

                  {/* Tail */}
                  <div className="absolute -bottom-2 left-12 md:left-16 w-0 h-0 
                    border-l-[14px] md:border-l-[18px] border-l-transparent 
                    border-r-[14px] md:border-r-[18px] border-r-transparent 
                    border-t-[18px] md:border-t-[22px] border-t-[#C8FF5C] 
                    rotate-[20deg]">
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* About Section - Appears on Scroll */}
      <div className="bg-gradient-to-b from-[#1a1a1a] via-[#0f0f0f] to-black text-white relative overflow-hidden">
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
              <h2 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-[#C8FF5C] to-white bg-clip-text text-transparent">
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
                <p className="text-lg text-white/80 leading-relaxed mb-4">
                  I'm an Electronics and Communication Engineering student with hands-on experience in data analytics, machine learning, and full-stack development
                </p>
                <p className="text-lg text-white/80 leading-relaxed">
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
                <p className="text-lg text-white/80 leading-relaxed mb-4">
                  I turn raw data into actionable insights using Python, advanced analytics, and machine learning techniques.
                </p>
                <p className="text-lg text-white/80 leading-relaxed">
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
              <h3 className="text-3xl font-bold mb-8 text-center">Technical Skills</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skillCategories.map((category, index) => (
                  <div 
                    key={category.title}
                    className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-[#C8FF5C]/50 transition-all duration-300 group"
                  >
                    {/* Header with Icon */}
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-12 h-12 bg-[#C8FF5C]/10 rounded-lg flex items-center justify-center text-2xl group-hover:bg-[#C8FF5C]/20 transition-all">
                        {category.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-white mb-1">{category.title}</h4>
                        <p className="text-xs text-white/50">{category.count}</p>
                      </div>
                    </div>

                    {/* Skills Pills */}
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <span 
                          key={skill}
                          className="px-3 py-1.5 bg-white/5 rounded-lg text-xs text-white/70 border border-white/10 hover:border-[#C8FF5C]/50 hover:text-[#C8FF5C] transition-all duration-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Section */}
            <div 
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 transition-all duration-1000 ease-out"
              style={{
                opacity: scrollY > 700 ? 1 : 0,
                transform: scrollY > 700 ? 'translateY(0)' : 'translateY(50px)'
              }}
            >
              {stats.map((stat, index) => (
                <div 
                  key={stat.label}
                  className="text-center p-6 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 hover:border-[#C8FF5C]/50 transition-all duration-300"
                >
                  <div className="text-4xl font-black text-[#C8FF5C] mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/70">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}