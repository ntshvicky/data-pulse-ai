// src/pages/dashboard.tsx
import Head from 'next/head'
import Link from 'next/link'

export default function Dashboard() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Dashboard | Data Pulse AI - Sata Group</title>
      </Head>

      <div className="flex min-h-screen bg-gray-50 text-gray-700">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-xl font-bold text-indigo-600">Sata Group</h1>
            <p className="text-sm text-gray-500">Data Pulse AI</p>
          </div>
          <nav className="mt-6">
            <ul className="space-y-2">
              <li>
                <Link
                  href="/dashboard"
                  className="flex items-center px-6 py-3 text-sm font-semibold bg-gray-100 text-indigo-600"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h18v18H3V3z"
                    />
                  </svg>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/document-analysis"
                  className="flex items-center px-6 py-3 text-sm text-gray-600 hover:bg-gray-100 hover:text-indigo-600"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 8a6 6 0 00-12 0c0 1.98.98 3.73 2.44 4.74A5.993 5.993 0 001 16v2h17v-2a6 6 0 00-2-4.58"
                    />
                  </svg>
                  Document Analysis
                </Link>
              </li>
              <li>
                <Link
                  href="/skill-analysis"
                  className="flex items-center px-6 py-3 text-sm text-gray-600 hover:bg-gray-100 hover:text-indigo-600"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  Skill Analysis
                </Link>
              </li>
              <li>
                <Link
                  href="/ai-chat"
                  className="flex items-center px-6 py-3 text-sm text-gray-600 hover:bg-gray-100 hover:text-indigo-600"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8h2a2 2 0 012 2v10a2 2 0 01-2 2h-2M7 8H5a2 2 0 00-2 2v10a2 2 0 002 2h2m10-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v3m10 0H7"
                    />
                  </svg>
                  AI Chat
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Top Section */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Dashboard Overview</h2>
            <p className="text-sm text-gray-500">
              Quick glance at document analysis, skill extraction, and AI chat usage.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-md shadow">
              <p className="text-gray-500 text-sm">Internal Documents</p>
              <p className="text-2xl font-semibold mt-2">48</p>
              <p className="text-xs text-green-500 mt-1">+5 since yesterday</p>
            </div>
            <div className="bg-white p-4 rounded-md shadow">
              <p className="text-gray-500 text-sm">External Documents</p>
              <p className="text-2xl font-semibold mt-2">32</p>
              <p className="text-xs text-blue-500 mt-1">on track</p>
            </div>
            <div className="bg-white p-4 rounded-md shadow">
              <p className="text-gray-500 text-sm">Skills Extracted</p>
              <p className="text-2xl font-semibold mt-2">120</p>
              <p className="text-xs text-green-500 mt-1">+3 new skills found</p>
            </div>
            <div className="bg-white p-4 rounded-md shadow">
              <p className="text-gray-500 text-sm">Active AI Chats</p>
              <p className="text-2xl font-semibold mt-2">5</p>
              <p className="text-xs text-red-500 mt-1">2 pending clarifications</p>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-white rounded-md shadow p-4">
              <h3 className="text-lg font-bold mb-2">Documents Analyzed Over Time</h3>
              <p className="text-sm text-gray-500 mb-3">Last 6 weeks</p>
              <div className="relative h-40 bg-gray-50 flex items-center justify-center text-gray-400">
                <svg width="100%" height="100%" viewBox="0 0 200 80">
                  <polyline
                    fill="none"
                    stroke="#6366F1"
                    strokeWidth={3}
                    points="10,60 40,50 70,30 100,45 130,25 160,35 190,20"
                  />
                </svg>
                <span className="absolute">[Line Chart Mock]</span>
              </div>
            </div>

            <div className="bg-white rounded-md shadow p-4">
              <h3 className="text-lg font-bold mb-2">Top 5 Skills Extracted</h3>
              <p className="text-sm text-gray-500 mb-3">Across All Documents</p>
              <div className="space-y-2">
                {[
                  { name: 'Python', pct: 85 },
                  { name: 'AWS', pct: 75 },
                  { name: 'Machine Learning', pct: 60 },
                  { name: 'React', pct: 45 },
                  { name: 'SQL', pct: 30 },
                ].map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-xs">
                      <span>{skill.name}</span>
                      <span>{skill.pct}%</span>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded">
                      <div
                        className="bg-indigo-500 h-2 rounded"
                        style={{ width: `${skill.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tables Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
            <div className="bg-white p-4 rounded-md shadow">
              <h3 className="text-lg font-bold mb-2">Open Action Items</h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left bg-gray-100">
                    <th className="p-2">Document</th>
                    <th className="p-2">Action</th>
                    <th className="p-2">Owner</th>
                    <th className="p-2">Due</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-2">Project_Plan.pdf</td>
                    <td className="p-2">Clarify budget</td>
                    <td className="p-2">IT Manager</td>
                    <td className="p-2">Jun 10</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2">HR_Policy.docx</td>
                    <td className="p-2">Gather feedback</td>
                    <td className="p-2">HR Lead</td>
                    <td className="p-2">Jun 15</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-white p-4 rounded-md shadow">
              <h3 className="text-lg font-bold mb-2">Recent Chat Sessions</h3>
              <ul className="space-y-2 text-sm">
                {[
                  { id: 'A1', topic: 'Summarize Cloud Migration RFP' },
                  { id: 'B2', topic: 'Compare data from 2 resumes' },
                  { id: 'C3', topic: 'Generate bullet-point summary' },
                ].map((sess) => (
                  <li key={sess.id} className="border-b pb-2">
                    <strong className="block">Session #{sess.id}</strong>
                    <span className="text-gray-500">Topic: {sess.topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
