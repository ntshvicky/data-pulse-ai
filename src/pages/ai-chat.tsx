// src/pages/ai-chat.tsx
import { FormEvent, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function AIChat() {
  const [message, setMessage] = useState('')
  // Static example conversation; replace with your chat state/logic later
  const conversation = [
    {
      sender: 'ME',
      text: 'I have a “Network Revamp RFP” in PDF. Let’s use a Word Template for the final output.',
    },
    {
      sender: 'AI',
      text: 'Clarifications needed:\n• Budget range?\n• Deadline for final proposals?\n• Technical requirements on the new network capacity?',
    },
  ]

  const handleSend = (e: FormEvent) => {
    e.preventDefault()
    // TODO: wire up sending `message` to your AI endpoint
    setMessage('')
  }

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>AI Chat (RFP Mode) | Data Pulse AI - Sata Group</title>
      </Head>

      <div className="bg-blue-50 text-gray-800 flex flex-col min-h-screen">
        {/* HEADER */}
        <header className="bg-blue-700 text-white compact-header px-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold">Sata Group</h1>
            <p className="text-xs">Data Pulse AI - RFP Chat</p>
          </div>
          <nav className="text-xs">
            <ul className="flex space-x-3">
              <li>
                <Link href="/dashboard" className="hover:underline">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/document-analysis" className="hover:underline">
                  Document Analysis
                </Link>
              </li>
              <li>
                <Link href="/skill-analysis" className="hover:underline">
                  Skill Analysis
                </Link>
              </li>
              <li>
                <Link href="/ai-chat" className="font-semibold underline">
                  AI Chat
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* SIDEBAR */}
          <aside className="w-1/4 bg-white border-r border-gray-200 flex flex-col text-xs">
            <div className="border-b border-gray-200 p-2 bg-blue-100">
              <p className="font-bold text-blue-700 mb-1">RFP Workflow</p>
              <button className="bg-blue-600 text-white w-full py-1 rounded hover:bg-blue-700 mb-2">
                Upload RFP
              </button>
              <label className="block mb-2">
                <span className="font-semibold">Output Template:</span>
                <select className="border border-gray-300 rounded w-full mt-1 py-1">
                  <option>Word Template</option>
                  <option>PDF Template</option>
                  <option>JSON Data</option>
                  <option>Custom Company Format</option>
                </select>
              </label>
              <button className="bg-green-600 text-white w-full py-1 rounded hover:bg-green-700">
                Export Final RFP
              </button>
            </div>
            <div className="p-2 flex-1 overflow-y-auto bg-blue-50">
              <p className="font-semibold text-blue-700 mb-1">Previous RFP Sessions</p>
              <div className="border border-blue-200 rounded p-2 mb-2">
                <p>RFP for Cloud Services (2023-04-10)</p>
                <p className="text-gray-500">Exported as PDF</p>
              </div>
              <div className="border border-blue-200 rounded p-2">
                <p>Infrastructure Upgrade RFP (2023-03-22)</p>
                <p className="text-gray-500">Used JSON template</p>
              </div>
            </div>
          </aside>

          {/* CHAT AREA */}
          <main className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto p-4">
              {conversation.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex items-start space-x-2 mb-1 ${
                    msg.sender === 'ME' ? 'flex-row-reverse text-right' : ''
                  }`}
                >
                  <div
                    className={`p-2 rounded shadow-sm ${
                      msg.sender === 'ME' ? 'bg-blue-200' : 'bg-white'
                    }`}
                  >
                    {msg.sender === 'AI' ? (
                      <div>
                        <strong>Clarifications needed:</strong>
                        <ul className="list-disc ml-4">
                          {msg.text
                            .split('\n')
                            .slice(1)
                            .map((line, i) => (
                              <li key={i}>{line.replace('• ', '')}</li>
                            ))}
                        </ul>
                      </div>
                    ) : (
                      <p>{msg.text}</p>
                    )}
                  </div>
                  <div className="bg-blue-600 text-white w-6 h-6 flex items-center justify-center rounded-full font-bold">
                    {msg.sender}
                  </div>
                </div>
              ))}
            </div>

            {/* INPUT */}
            <div className="bg-white border-t border-gray-200 p-2">
              <form onSubmit={handleSend} className="flex space-x-1">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1 border border-gray-300 rounded px-2 py-1 focus:outline-none text-xxs"
                  placeholder="Answer clarifications..."
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-3 py-1 rounded text-xxs hover:bg-blue-700"
                >
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
