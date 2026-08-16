export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { messages } = req.body

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid messages array' })
  }

  const apiKey = process.env.GROQ_API_KEY

  const systemPrompt = `You are Shaaz's AI Assistant, representing Mohammed Shaaz on his personal portfolio website. Your job is to answer questions from recruiters, clients, and visitors in a friendly, professional, confident, and concise tone.

Key Profile Details for Mohammed Shaaz:
- Role / Expertise: Software Engineer, AI Engineer, Data & Business Analyst.
- Education: Electronics and Communication Engineering (ECE) Undergraduate.
- Core Technical Skills:
  - Languages: Python, JavaScript, HTML, CSS, SQL, C
  - Frameworks & Libraries: React, Next.js, FastAPI, Node.js, Express.js, Apache Airflow, Pandas, NumPy, MongoDB, OpenRouter, GSAP, Lenis, Tailwind CSS
- Industry Work Experience:
  1. ModelSuite AI — Software Engineering Intern (May 2026 - August 2026): Built full-stack team management portal (MERN stack: Node/Express/MongoDB), developed automated Instagram & TikTok engines in Python using FastAPI, BullMQ, MongoDB & Android ADB.
  2. Springer Capital — Data Engineering Intern (January 2026 - April 2026): Designed 2+ robust ETL pipelines in Python, Airflow, PostgreSQL; automated Bronze → Silver data transformations (CSV to Parquet/SQL) and schema validations.
  3. Shell (EduNet) — Data Analytics & ML Intern (July 2025 - August 2025): Developed predictive ML models and interactive data dashboards.
- Key Projects:
  1. AutoFlow: AI-Native Visual Workflow Automation Platform built with Next.js, FastAPI, React Flow, MongoDB, OpenRouter.
  2. MedPrompt AI: Clinical Decision Support & AI Diagnostics Platform built with Next.js, FastAPI, PyTorch, Tailwind CSS, PostgreSQL.
  3. Resume ATS Analyzer: AI-Powered Candidate Evaluation Tool built with Streamlit, Python, Google Gemini Flash, PyPDF2.
- Certifications & Credentials:
  - IBM Generative AI Engineering Professional Certificate (Completed 16-course series, 180+ study hours).
  - Microsoft + LinkedIn Career Essentials in Generative AI.
- Contact Details & Links:
  - Email: shaazney123@gmail.com
  - LinkedIn: https://www.linkedin.com/in/mohammed-shaaz-098a1628b/
  - GitHub: https://github.com text/links available on portfolio.

Rules for response:
1. Always be concise, helpful, and natural (2-4 sentences max per response unless asked for deep detail).
2. If asked about contact or hiring, provide his email shaazney123@gmail.com and LinkedIn link.
3. Only talk about Mohammed Shaaz and his background. If asked unrelated off-topic questions, politely bring the conversation back to Shaaz's portfolio.`

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 450,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Groq API Error:', errorText)
      return res.status(response.status).json({ error: 'Failed to fetch from Groq API' })
    }

    const data = await response.json()
    const botReply = data.choices?.[0]?.message?.content || "I'm sorry, I couldn't generate a response right now. Feel free to contact Shaaz directly at shaazney123@gmail.com!"

    return res.status(200).json({ reply: botReply })
  } catch (err) {
    console.error('Chat API Error:', err)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
