export default function Projects() {
  const projects = [
    { id: 1, title: 'Project 1', description: 'A description of project 1' },
    { id: 2, title: 'Project 2', description: 'A description of project 2' },
    { id: 3, title: 'Project 3', description: 'A description of project 3' },
  ]

  return (
    <div className="container mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">My Projects</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">{project.title}</h3>
            <p className="text-gray-600 mb-4">{project.description}</p>
            <button className="text-blue-600 hover:text-blue-800 font-medium">
              View Details →
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
