export default function Blogs() {
  const blogs = [
    { id: 1, title: 'Getting Started with Next.js', date: '2024-01-15' },
    { id: 2, title: 'Tailwind CSS Best Practices', date: '2024-01-10' },
    { id: 3, title: 'React Hooks Deep Dive', date: '2024-01-05' },
  ]

  return (
    <div className="container mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Blog Posts</h1>
      <div className="space-y-6">
        {blogs.map((blog) => (
          <div key={blog.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">{blog.title}</h3>
            <p className="text-gray-500 mb-4">{blog.date}</p>
            <button className="text-blue-600 hover:text-blue-800 font-medium">
              Read More →
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
