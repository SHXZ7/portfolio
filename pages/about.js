export default function About() {
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
      title: 'Soft Skills',
      icon: '💡',
      count: '3 skills',
      skills: ['Team Collaboration', 'Proactive Mindset', 'Adaptability']
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
    <div className="bg-gradient-to-b from-[#1a1a1a] via-[#0f0f0f] to-black min-h-screen text-white py-24">
      <div className="container mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-[#C8FF5C] to-white bg-clip-text text-transparent">
            About Me
          </h1>
          <div className="w-20 h-1 bg-[#C8FF5C] rounded-full"></div>
        </div>
        
        {/* About Content - Same as index.js */}
        <div className="grid md:grid-cols-2 gap-12 mb-20 max-w-6xl">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-[#C8FF5C]">Who I Am</h3>
            <p className="text-lg text-white/80 leading-relaxed mb-4">
              I'm an Electronics and Communication Engineering student with hands-on experience in data analytics, machine learning, and full-stack development
            </p>
            <p className="text-lg text-white/80 leading-relaxed">
              I enjoy uncovering meaningful insights from complex datasets and transforming them into real-world solutions. My background includes building AI-driven applications, health prediction systems, and intelligent resume tools, backed by strong problem-solving and communication skills
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4 text-[#C8FF5C]">What I Do</h3>
            <p className="text-lg text-white/80 leading-relaxed mb-4">
              I turn raw data into actionable insights using Python, advanced analytics, and machine learning techniques.
            </p>
            <p className="text-lg text-white/80 leading-relaxed">
              I design and develop full-stack applications with frameworks like Next.js and FastAPI, integrating AI models, dashboards, and automation workflows. From predictive modeling to intuitive web interfaces, I help create data-driven solutions that improve decision-making and user experience.
            </p>
          </div>
        </div>

        {/* Technical Skills - Card Layout */}
        <h2 className="text-3xl font-bold mb-8 text-center">Technical Skills</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {skillCategories.map((category) => (
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
  )
}
