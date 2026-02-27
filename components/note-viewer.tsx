"use client"

import { ArrowLeft, Pencil, Trash2 } from "lucide-react"
import { format } from "date-fns"

interface Note {
  id: string
  title: string
  content: string
  createdAt: Date
}

interface NoteViewerProps {
  note: Note
  onEdit: () => void
  onDelete: () => void
  onBack: () => void
}

export function NoteViewer({ note, onEdit, onDelete, onBack }: NoteViewerProps) {
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

        <div className="flex items-center gap-4">
          <button
            onClick={onEdit}
            className="flex items-center gap-1.5 bg-primary text-primary-foreground font-sans text-sm uppercase tracking-[0.2em] px-5 py-2 hover:opacity-90 transition-opacity"
            aria-label="Edit note"
          >
            <Pencil className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span>Edit</span>
          </button>

          <button
            onClick={onDelete}
            className="flex items-center gap-1.5 border border-primary text-primary font-sans text-sm uppercase tracking-[0.2em] px-5 py-2 hover:bg-primary hover:text-primary-foreground transition-all"
            aria-label="Delete note"
          >
            <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span>Delete</span>
          </button>
        </div>
      </header>

      {/* Note content */}
      <div className="flex-1 flex flex-col px-6 py-6 md:px-12 md:py-8 max-w-3xl w-full mx-auto">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground pb-4">
          {note.title || "Untitled"}
        </h1>

        <time className="text-xs text-muted-foreground/70 tracking-wider uppercase mb-4">
          {format(note.createdAt, "dd MMM yyyy")}
        </time>

        <div className="w-16 h-px bg-primary/30 mb-6" />

        <p className="font-sans text-base text-foreground leading-relaxed whitespace-pre-wrap">
          {note.content}
        </p>
      </div>
    </div>
  )
}
