"use client"

import { format } from "date-fns"

interface Note {
  id: string
  title: string
  content: string
  createdAt: Date
}

interface NoteCardProps {
  note: Note
  onClick: () => void
}

export function NoteCard({ note, onClick }: NoteCardProps) {
  return (
    <button
      onClick={onClick}
      className="group w-full text-left bg-card rounded-sm shadow-sm hover:shadow-md transition-shadow duration-300 flex overflow-hidden border border-border/40"
      aria-label={`Open note: ${note.title}`}
    >
      {/* Left accent line */}
      <div className="w-1 bg-primary shrink-0 group-hover:w-1.5 transition-all duration-300" />

      <div className="flex-1 px-5 py-4 flex items-center justify-between gap-4">
        <h3 className="font-serif text-lg font-bold text-foreground leading-tight tracking-wide">
          {note.title || "Untitled"}
        </h3>

        <time className="text-xs text-muted-foreground/70 shrink-0 tracking-wider uppercase">
          {format(note.createdAt, "dd MMM yyyy")}
        </time>
      </div>
    </button>
  )
}
