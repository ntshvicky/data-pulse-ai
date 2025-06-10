// src/pages/document-analysis.tsx
import { FormEvent } from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function DocumentAnalysis() {
  const handleUpload = (e: FormEvent) => {
    e.preventDefault()
    // TODO: implement document upload logic
  }

  const handleChat = (e: FormEvent) => {
    e.preventDefault()
    // TODO: implement doc-chat send logic
  }

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Document Analysis | Data Pulse AI - Sata Group</title>
      </Head>

      <div className="bg-purple-50 text-gray-800 flex flex-col min-h-screen">
        {/* HEADER */}
        <header className="bg-purple-700 text-white compact-header px-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold">Sata Group</h1>
            <p className="text-xs">Data Pulse AI - Document Analysis</p>
          </div>
          <nav className="text-xs">
            <ul className="flex space-x-3">
              <li>
                <Link href="/dashboard" className="hover:underline">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/document-analysis"
                  className="font-semibold underline"
                >
                  Document Analysis
                </Link>
              </li>
              <li>
                <Link href="/skill-analysis" className="hover:underline">
                  Skill Analysis
                </Link>
              </li>
              <li>
                <Link href="/ai-chat" className="hover:underline">
                  AI Chat
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* LEFT SIDEBAR: Document Tools + Past Queries */}
          <aside className="w-1/4 bg-white border-r border-gray-200 flex flex-col text-xs">
            {/* Tools */}
            <div className="border-b border-gray-200 p-2 bg-purple-100">
              <p className="font-bold text-purple-700 mb-1">Doc Tools</p>
              <div className="flex flex-col space-y-1">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox text-purple-600 mr-2"
                  />
                  <span>Enable Web Search</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox text-purple-600 mr-2"
                  />
                  <span>Drafting Mode</span>
                </label>
                <button className="bg-purple-600 text-white rounded mt-1 px-2 py-1 small-btn hover:bg-purple-700">
                  One-Click Insights
                </button>
              </div>
            </div>
            {/* Past Queries */}
            <div className="p-2 flex-1 overflow-y-auto bg-purple-50">
              <p className="font-semibold text-purple-700 mb-1">
                Previous Queries
              </p>
              <div className="border border-purple-200 rounded p-2 mb-2">
                <p>“Summarize case1.pdf”</p>
                <p className="text-gray-500">
                  Found timeline + budget insights
                </p>
              </div>
              <div className="border border-purple-200 rounded p-2 mb-2">
                <p>
                  “Cross-check compliance_report.doc with vendor_contract.doc”
                </p>
                <p className="text-gray-500">
                  2 potential conflicts found
                </p>
              </div>
            </div>
          </aside>

          {/* MAIN: Documents list & Chat */}
          <main className="w-3/4 flex flex-col">
            {/* Top: Upload button */}
            <div className="border-b border-gray-200 p-2 bg-white flex items-center space-x-2">
              <button
                onClick={handleUpload}
                className="bg-purple-600 text-white px-2 py-1 rounded small-btn hover:bg-purple-700"
              >
                Upload Document(s)
              </button>
            </div>

            {/* Middle: Document Summaries */}
            <div className="flex-1 p-2 overflow-y-auto bg-purple-100 text-xs">
              {/* Document Card: Analyzed */}
              <div className="bg-white p-2 rounded mb-2 shadow-sm">
                <div className="flex justify-between">
                  <span className="font-semibold">case1.pdf</span>
                  <span className="text-green-600">Analyzed</span>
                </div>
                <p className="text-gray-700">Entities: Budget, Timeline</p>
                <p className="text-gray-700">Action Items: 3</p>
                <button className="text-purple-700 underline mt-1">
                  View Insights
                </button>
              </div>
              {/* Document Card: Processing */}
              <div className="bg-white p-2 rounded mb-2 shadow-sm">
                <div className="flex justify-between">
                  <span className="font-semibold">case2.pdf</span>
                  <span className="text-yellow-600">Processing...</span>
                </div>
                <p className="text-gray-700">Entities: -</p>
                <p className="text-gray-700">Action Items: -</p>
                <button disabled className="text-gray-400 mt-1">
                  View Insights
                </button>
              </div>
              {/* Cross-Doc Summary */}
              <div className="bg-white p-2 rounded shadow-sm">
                <p className="font-semibold">Cross-Doc Summary</p>
                <ul className="list-disc ml-4 text-gray-700">
                  <li>Overlap in budget constraints</li>
                  <li>Timeline references in all docs</li>
                  <li>Potential conflicting roles (Doc1 vs Doc2)</li>
                </ul>
              </div>
            </div>

            {/* Bottom: Compact Chat */}
            <div className="bg-white border-t border-gray-200 p-2">
              {/* Mock conversation */}
              <div className="max-h-32 overflow-y-auto mb-2">
                {/* AI message */}
                <div className="flex items-start space-x-2 mb-1">
                  <div className="bg-purple-600 text-white w-5 h-5 flex items-center justify-center rounded-full text-xxs font-bold">
                    AI
                  </div>
                  <div className="bg-purple-100 p-1 rounded text-xxs">
                    <p>
                      Hi! Ask me anything about your documents, or run a
                      one-click insight.
                    </p>
                  </div>
                </div>
                {/* User message */}
                <div className="flex items-start space-x-2 flex-row-reverse text-right mb-1">
                  <div className="bg-purple-200 p-1 rounded text-xxs">
                    <p>Show me the summary of case1.pdf</p>
                  </div>
                  <div className="bg-purple-600 text-white w-5 h-5 flex items-center justify-center rounded-full text-xxs font-bold">
                    ME
                  </div>
                </div>
              </div>
              {/* Chat input */}
              <form onSubmit={handleChat} className="flex space-x-1">
                <input
                  type="text"
                  className="flex-1 border border-gray-300 rounded px-2 py-1 text-xxs focus:outline-none"
                  placeholder="Ask about docs..."
                />
                <button className="bg-purple-600 text-white px-2 py-1 rounded text-xxs hover:bg-purple-700">
                  Send
                </button>
              </form>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
