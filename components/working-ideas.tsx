"use client"

import { useState, useCallback } from "react"
import { ArrowLeft, Plus } from "lucide-react"
import { NoteCard } from "@/components/note-card"
import { NoteEditor } from "@/components/note-editor"
import { AiMuse } from "@/components/ai-muse"

interface Note {
  id: string
  title: string
  content: string
  createdAt: Date
}

const SAMPLE_NOTES: Note[] = [
  {
    id: "1",
    title: "Autumn/Winter Silhouette Study",
    content:
      "Oversized cocoon shapes with structured shoulders. Think Balenciaga meets Dior couture — exaggerated volumes balanced by precise tailoring at the waist. Explore double-faced wool and felted cashmere.",
    createdAt: new Date(2026, 1, 20),
  },
  {
    id: "2",
    title: "Textile Sourcing — Como Visit",
    content:
      "Hand-dyed silk jacquards from Ratti mill. The iridescent burgundy swatch is extraordinary — shifts between deep wine and copper depending on the light. Perfect for the evening capsule.",
    createdAt: new Date(2026, 1, 18),
  },
  {
    id: "3",
    title: "Resort 27 Mood",
    content:
      "Mediterranean afternoon, faded frescoes, terracotta and chalk white. Linen suiting with raw hems. Embroidery inspired by ancient mosaic fragments — abstract, imperfect, beautiful.",
    createdAt: new Date(2026, 1, 14),
  },
  {
    id: "4",
    title: "Draping Experiments — Bias Cut",
    content:
      "The 1930s bias technique revisited with modern jersey knits. Three test cuts on the mannequin today — the asymmetric neckline works best when cut at a 42-degree angle.",
    createdAt: new Date(2026, 1, 10),
  },
  {
    id: "5",
    title: "Colour Palette — Faded Grandeur",
    content:
      "Dusty rose, oxidized gold, aged ivory, storm grey, and a deep oxblood as the anchor. This palette evokes old Parisian apartments and inherited jewellery boxes.",
    createdAt: new Date(2026, 1, 7),
  },
]

export function WorkingIdeas() {
  const [notes, setNotes] = useState<Note[]>(SAMPLE_NOTES)
  const [activeView, setActiveView] = useState<"list" | "editor">("list")
  const [editingNote, setEditingNote] = useState<Note | null>(null)

  const handleNewNote = useCallback(() => {
    setEditingNote(null)
    setActiveView("editor")
  }, [])

  const handleOpenNote = useCallback((note: Note) => {
    setEditingNote(note)
    setActiveView("editor")
  }, [])

  const handleAddMuseIdea = useCallback((idea: string) => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: "AI Muse Idea",
      content: idea,
      createdAt: new Date(),
    }
    setNotes((prev) => [newNote, ...prev])
  }, [])

  const handleSave = useCallback(
    (title: string, content: string) => {
      if (editingNote) {
        setNotes((prev) =>
          prev.map((n) =>
            n.id === editingNote.id ? { ...n, title, content } : n
          )
        )
      } else {
        const newNote: Note = {
          id: Date.now().toString(),
          title,
          content,
          createdAt: new Date(),
        }
        setNotes((prev) => [newNote, ...prev])
      }
      setActiveView("list")
      setEditingNote(null)
    },
    [editingNote]
  )

  const handleBack = useCallback(() => {
    setActiveView("list")
    setEditingNote(null)
  }, [])

  if (activeView === "editor") {
    return (
      <NoteEditor note={editingNote} onSave={handleSave} onBack={handleBack} />
    )
  }

  return (
    <div className="min-h-dvh flex flex-col bg-background">
      {/* Header */}
      <header className="px-5 py-5 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <button
            className="flex items-center gap-1.5 text-primary font-sans text-xs uppercase tracking-[0.2em] hover:opacity-70 transition-opacity"
            aria-label="Go back to tools"
          >
            <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span>Tools</span>
          </button>

          <button
            onClick={handleNewNote}
            className="flex items-center gap-1 text-primary font-sans text-xs uppercase tracking-[0.2em] hover:opacity-70 transition-opacity"
            aria-label="Add a new note"
          >
            <span>Add</span>
            <Plus className="w-3.5 h-3.5" strokeWidth={1.5} />
          </button>
        </div>

        <div className="text-center">
          <h1 className="font-serif text-3xl md:text-4xl text-primary tracking-wide">
            Working Ideas
          </h1>
          <div className="w-24 h-px bg-primary mx-auto mt-3" />
        </div>
      </header>

      {/* Notes list */}
      <main className="flex-1 px-5 pb-8 pt-2">
        <div className="max-w-2xl mx-auto flex flex-col gap-3.5">
          {/* Blank new note card */}
          <button
            onClick={handleNewNote}
            className="group w-full text-left bg-card rounded-sm border border-dashed border-primary/25 hover:border-primary/50 transition-all duration-300 flex overflow-hidden"
            aria-label="Start a new idea"
          >
            <div className="w-1 bg-primary/20 shrink-0 group-hover:bg-primary/40 transition-all duration-300" />
            <div className="flex-1 px-5 py-5">
              <p className="font-sans text-base italic text-muted-foreground/50">
                {"Start a new idea..."}
              </p>
            </div>
          </button>

          {/* User notes */}
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onClick={() => handleOpenNote(note)}
            />
          ))}

          {notes.length === 0 && (
            <div className="text-center py-16">
              <p className="font-serif text-xl text-muted-foreground italic">
                {"No ideas yet"}
              </p>
              <p className="font-sans text-sm text-muted-foreground/60 mt-2">
                {"Tap the card above to begin"}
              </p>
            </div>
          )}

          {/* AI Muse section */}
          <div className="mt-6">
            <AiMuse onAddToNotes={handleAddMuseIdea} />
          </div>
        </div>
      </main>
    </div>
  )
}
