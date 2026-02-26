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
  const firstLine = note.content.split("\n")[0] || ""
  const truncatedLine = firstLine.length > 80 ? firstLine.slice(0, 80) + "..." : firstLine

  return (
    <button
      onClick={onClick}
      className="group w-full text-left bg-card rounded-sm shadow-sm hover:shadow-md transition-shadow duration-300 flex overflow-hidden border border-border/40"
      aria-label={`Open note: ${note.title}`}
    >
      {/* Left accent line */}
      <div className="w-1 bg-primary shrink-0 group-hover:w-1.5 transition-all duration-300" />

      <div className="flex-1 px-5 py-5 flex flex-col gap-2.5">
        <h3 className="font-serif text-lg font-bold text-foreground leading-tight tracking-wide">
          {note.title || "Untitled"}
        </h3>

        {truncatedLine && (
          <p className="font-sans text-sm italic text-muted-foreground leading-relaxed line-clamp-2">
            {truncatedLine}
          </p>
        )}

        <time className="text-xs text-muted-foreground/70 self-end mt-auto pt-1 tracking-wider uppercase">
          {format(note.createdAt, "dd MMM yyyy")}
        </time>
      </div>
    </button>
  )
}
