// src/pages/skill-analysis.tsx
import React, { useRef, useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'

import {
  uploadJD,
  listJDs,
  getJDById,
  JDListItem,
  JDResponse,
} from './api/jd'
import {
  uploadCV,
  listCVs,
  CVResponse,
  CVListItem,
} from './api/cv'
import {
  createAnalysis,
  AnalysisRequest,
  AnalysisResult,
} from './api/analysis'

type CVEntry = {
  cvId: string
  fileName: string
  level: 'jr' | 'mid' | 'sr'
}

export default function SkillAnalysis() {
  const jdInputRef = useRef<HTMLInputElement | null>(null)
  const cvInputRef = useRef<HTMLInputElement | null>(null)

  // JD & CV State
  const [jdMode, setJdMode] = useState<'database' | 'upload'>('upload')
  const [jdList, setJdList] = useState<JDListItem[]>([])
  const [loadingJdList, setLoadingJdList] = useState(false)
  const [jdListError, setJdListError] = useState<string | null>(null)

  const [jdId, setJdId] = useState<string | null>(null)
  const [jdFileName, setJdFileName] = useState<string | null>(null)
  const [uploadingJD, setUploadingJD] = useState(false)
  const [jdError, setJdError] = useState<string | null>(null)

  const [cvList, setCvList] = useState<CVEntry[]>([])
  const [uploadingCVs, setUploadingCVs] = useState(false)
  const [cvError, setCvError] = useState<string | null>(null)
  const [selectedCvLevel, setSelectedCvLevel] = useState<'jr' | 'mid' | 'sr'>('jr')

  // Analysis State
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([])
  const [analysisReport, setAnalysisReport] = useState<string | null>(null)
  const [runningAnalysis, setRunningAnalysis] = useState(false)
  const [analysisError, setAnalysisError] = useState<string | null>(null)

  // Load JD list when entering "database" mode
  useEffect(() => {
    if (jdMode !== 'database') return
    setLoadingJdList(true)
    setJdListError(null)
    listJDs()
      .then(setJdList)
      .catch(err => setJdListError(err.message))
      .finally(() => setLoadingJdList(false))
  }, [jdMode])

  // Load existing CVs on mount
  useEffect(() => {
    listCVs()
      .then((items: CVListItem[]) => {
        const entries = items.map(i => ({
          cvId: i.cvId,
          fileName: i.fileName,
          level: i.level as 'jr' | 'mid' | 'sr',
        }))
        setCvList(entries)
      })
      .catch(err => setCvError(err.message))
  }, [])

  // JD handlers
  const handleJdSelect = async (id: string) => {
    setJdError(null)
    setJdId(id || null)
    setJdFileName(null)
    if (!id) return
    setUploadingJD(true)
    try {
      const meta = await getJDById(id)
      setJdFileName(meta.title)
    } catch (err: any) {
      setJdError(err.message || 'Failed to load JD')
      setJdId(null)
    } finally {
      setUploadingJD(false)
    }
  }

  const handleUploadJDClick = () => jdInputRef.current?.click()
  const handleJdFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setJdError(null)
    const files = e.target.files
    if (!files?.length) return

    setUploadingJD(true)
    try {
      const resp: JDResponse = await uploadJD(files[0])
      // select the new JD immediately
      setJdId(resp.jdId)
      setJdFileName(resp.title || files[0].name)

      // append it to the dropdown list
      setJdList(prev => [
        ...prev,
        { jdId: resp.jdId, title: resp.title, uploadedAt: resp.uploadedAt },
      ])
    } catch (err: any) {
      setJdError(err.message || 'JD upload failed')
      setJdId(null)
      setJdFileName(null)
    } finally {
      setUploadingJD(false)
      if (jdInputRef.current) jdInputRef.current.value = ''
    }
  }


  // CV handlers
  const handleBulkUploadClick = () => cvInputRef.current?.click()
  const handleCvFilesSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setCvError(null)
    const files = e.target.files
    if (!files?.length) return
    setUploadingCVs(true)
    const newEntries: CVEntry[] = []
    const errors: string[] = []
    for (let i = 0; i < files.length; i++) {
      try {
        const resp: CVResponse = await uploadCV(files[i], selectedCvLevel)
        const entry = {
          cvId: resp.cvId,
          fileName: resp.fileName,
          level: selectedCvLevel,
        }
        newEntries.push(entry)
        // also append to dropdown list
        setCvList(prev => [...prev, entry])
      } catch (err: any) {
        errors.push(`${files[i].name}: ${err.message || 'Upload failed'}`)
      }
    }
    if (errors.length) setCvError(errors.join('; '))
    setUploadingCVs(false)
    if (cvInputRef.current) cvInputRef.current.value = ''
  }

  // Start analysis
  const startAnalysis = async () => {
    if (!jdId || cvList.length === 0) return
    setAnalysisError(null)
    setRunningAnalysis(true)
    setAnalysisResults([])
    setAnalysisReport(null)
    try {
      const req: AnalysisRequest = {
        jdId,
        cvIds: cvList.map(c => c.cvId),
        options: { includeScores: true, language: 'en' },
      }
      const resp = await createAnalysis(req)
      if (Array.isArray(resp.results)) {
        setAnalysisResults(resp.results)
      } else {
        setAnalysisReport(resp.results as string)
      }
    } catch (err: any) {
      setAnalysisError(err.message || 'Analysis request failed')
    } finally {
      setRunningAnalysis(false)
    }
  }

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Skill Analysis | Data Pulse AI - Sata Group</title>
      </Head>

      <div className="bg-gray-50 text-gray-800 flex flex-col min-h-screen">
        {/* HEADER */}
        <header className="bg-green-700 text-white py-2 px-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold">Sata Group</h1>
            <p className="text-xs">Data Pulse AI - Skill Analysis</p>
          </div>
          <nav className="text-sm">
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
                <Link href="/skill-analysis" className="underline font-semibold">
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
          {/* LEFT SIDEBAR */}
          <aside className="w-1/3 border-r border-gray-300 flex flex-col">
            <div className="bg-white border-b border-gray-200 p-2">
              <div className="flex items-center space-x-2 mb-2">
                <button
                  onClick={handleUploadJDClick}
                  disabled={uploadingJD || jdMode === 'database'}
                  className="bg-green-600 text-white px-2 py-1 rounded text-xs hover:bg-green-700 disabled:opacity-50"
                >
                  {uploadingJD ? 'Uploading JD…' : 'Upload JD'}
                </button>
                <select
                  value={jdMode}
                  onChange={e => setJdMode(e.target.value as any)}
                  className="border border-gray-300 rounded px-1 py-1 text-xs"
                >
                  <option value="database">Search in Database</option>
                  <option value="upload">Fresh Upload</option>
                </select>
              </div>

              {jdMode === 'database' && (
                <div className="mb-2">
                  {loadingJdList ? (
                    <p className="text-xs">Loading JDs…</p>
                  ) : jdListError ? (
                    <p className="text-xs text-red-600">{jdListError}</p>
                  ) : (
                    <select
                      value={jdId || ''}
                      onChange={e => handleJdSelect(e.target.value)}
                      className="…"
                    >
                      <option value="">Select JD…</option>
                      {jdList.map(j => (
                        <option key={j.jdId} value={j.jdId}>
                          {j.title}
                        </option>
                      ))}
                    </select>

                  )}
                </div>
              )}

              {jdFileName && (
                <p className="text-xs italic text-gray-600">
                  Selected JD: {jdFileName}
                </p>
              )}
              {jdError && <p className="text-xs text-red-600 mt-1">{jdError}</p>}

              <div className="flex items-center space-x-2 mt-3">
                <button
                  onClick={handleBulkUploadClick}
                  disabled={uploadingCVs}
                  className="bg-green-600 text-white px-2 py-1 rounded text-xs hover:bg-green-700 disabled:opacity-50"
                >
                  {uploadingCVs ? 'Uploading CVs…' : 'Bulk Upload Resumes'}
                </button>
                <select
                  value={selectedCvLevel}
                  onChange={e => setSelectedCvLevel(e.target.value as any)}
                  className="border border-gray-300 rounded px-1 py-1 text-xs"
                  disabled={uploadingCVs}
                >
                  <option value="jr">Junior</option>
                  <option value="mid">Mid</option>
                  <option value="sr">Senior</option>
                </select>
              </div>
              {cvError && <p className="text-xs text-red-600 mt-1">{cvError}</p>}
            </div>

            {/* Chat & History */}
            <div className="flex-1 flex flex-col">
              <div className="bg-green-100 px-2 py-1 text-xs cursor-pointer hover:bg-green-200">
                <span className="font-semibold">Previous Chats</span>
              </div>
              <div className="p-2 flex-1 overflow-y-auto bg-green-50 text-xs">
                <div className="bg-white p-2 rounded shadow-sm mb-2">
                  <p className="text-xs">
                    Hello! Upload your JD or pick from existing database.
                  </p>
                </div>
                <div className="flex items-start space-x-2 flex-row-reverse text-right">
                  <div className="bg-green-200 p-2 rounded shadow-sm">
                    <p className="text-xs">
                      I have a Full-Stack JD. Show me top matches from DB.
                    </p>
                  </div>
                  <div className="bg-green-600 text-white w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold">
                    ME
                  </div>
                </div>
              </div>
              <div className="bg-white border-t border-gray-200 p-2">
                <form
                  onSubmit={e => e.preventDefault()}
                  className="flex space-x-1"
                >
                  <input
                    type="text"
                    className="flex-1 border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none"
                    placeholder="Type your message..."
                    disabled
                  />
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-2 py-1 rounded text-xs hover:bg-green-700 disabled:opacity-50"
                    disabled
                  >
                    Send
                  </button>
                </form>
              </div>
            </div>
          </aside>

          {/* RIGHT: Matches & Stats */}
          <main className="w-2/3 flex flex-col">
            <div className="p-4 flex flex-col space-y-2">
              <div className="flex justify-between items-center">
                <div className="bg-white rounded shadow p-3 text-xs w-2/3">
                  <p className="font-semibold">Quick Stats</p>
                  <p>Total Resumes: {cvList.length}</p>
                  <p>Matches Found: {analysisResults.length}</p>
                </div>
                {jdId && cvList.length > 0 && (
                  <button
                    onClick={startAnalysis}
                    disabled={runningAnalysis}
                    className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 disabled:opacity-50"
                  >
                    {runningAnalysis ? 'Analyzing…' : 'Start Analysis'}
                  </button>
                )}
              </div>
              {analysisError && (
                <p className="text-xs text-red-600">{analysisError}</p>
              )}
            </div>

            <div className="flex-1 p-2 overflow-y-auto">
              {analysisReport ? (
                <pre className="whitespace-pre-wrap text-xs bg-gray-100 p-3 rounded">
                  {analysisReport}
                </pre>
              ) : analysisResults.length > 0 ? (
                analysisResults.map(res => {
                  const cvEntry = cvList.find(c => c.cvId === res.cvId)
                  return (
                    <div
                      key={res.cvId}
                      className="bg-white shadow-sm border border-gray-100 p-3 rounded mb-2 text-xs"
                    >
                      <div className="flex justify-between items-center">
                        <p className="font-semibold">
                          {cvEntry?.fileName || res.cvId}
                        </p>
                        <span className="bg-green-600 text-white px-1 py-0.5 rounded">
                          {res.matchScore !== null
                            ? `${Math.round(res.matchScore * 100)}%`
                            : '—'}
                        </span>
                      </div>
                      <p className="text-gray-700 mt-1">
                        Skills Found: {res.skillsFound.join(', ') || 'None'}
                      </p>
                      <p className="text-gray-700 mt-1">
                        Missing Skills: {res.missingSkills.join(', ') || 'None'}
                      </p>
                      <div className="flex space-x-1 mt-2">
                        <button className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600">
                          View
                        </button>
                        <button className="bg-purple-500 text-white px-2 py-1 rounded hover:bg-purple-600">
                          Email
                        </button>
                        <button className="bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300">
                          Download CV
                        </button>
                      </div>
                    </div>
                  )
                })
              ) : (
                <p className="text-xs text-gray-500 mt-2">
                  No analysis results yet.
                </p>
              )}
            </div>
          </main>
        </div>

        {/* Hidden File Inputs */}
        <input
          type="file"
          accept=".pdf,.docx,.txt"
          style={{ display: 'none' }}
          ref={jdInputRef}
          onChange={handleJdFileSelected}
        />
        <input
          type="file"
          accept=".pdf,.docx,.txt"
          multiple
          style={{ display: 'none' }}
          ref={cvInputRef}
          onChange={handleCvFilesSelected}
        />
      </div>
    </>
  )
}
