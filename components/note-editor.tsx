"use client"

import { useState, useRef, useEffect } from "react"
import { ArrowLeft } from "lucide-react"

interface Note {
  id: string
  title: string
  content: string
  createdAt: Date
}

interface NoteEditorProps {
  note: Note | null
  onSave: (title: string, content: string) => void
  onBack: () => void
}

export function NoteEditor({ note, onSave, onBack }: NoteEditorProps) {
  const [title, setTitle] = useState(note?.title || "")
  const [content, setContent] = useState(note?.content || "")
  const titleRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (!note?.title) {
      titleRef.current?.focus()
    }
  }, [note?.title])

  const handleSave = () => {
    if (title.trim() || content.trim()) {
      onSave(title, content)
    }
  }

  return (
    <div className="min-h-dvh flex flex-col bg-background">
      {/* Header */}
      <header className="px-5 py-4 flex items-center justify-between border-b border-border/50">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-primary font-sans text-sm uppercase tracking-[0.15em] hover:opacity-70 transition-opacity"
          aria-label="Go back to ideas list"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
          <span>Ideas</span>
        </button>

        <button
          onClick={handleSave}
          className="bg-primary text-primary-foreground font-sans text-sm uppercase tracking-[0.2em] px-6 py-2 hover:opacity-90 transition-opacity"
          aria-label="Save note"
        >
          Save
        </button>
      </header>

      {/* Editor area */}
      <div className="flex-1 flex flex-col px-6 py-6 md:px-12 md:py-8 max-w-3xl w-full mx-auto">
        <input
          ref={titleRef}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="font-serif text-3xl md:text-4xl font-bold text-foreground bg-transparent border-none outline-none placeholder:text-muted-foreground/40 pb-4 w-full"
          aria-label="Note title"
        />

        <div className="w-16 h-px bg-primary/30 mb-6" />

        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Begin writing..."
          className="flex-1 font-sans text-base text-foreground bg-transparent border-none outline-none resize-none placeholder:text-muted-foreground/40 leading-relaxed min-h-[60vh]"
          aria-label="Note content"
        />
      </div>
    </div>
  )
}
