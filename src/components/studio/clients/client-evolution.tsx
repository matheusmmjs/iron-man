"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus } from "lucide-react"
import { Label } from "@/components/ui/label"

interface Evolution {
  id: number
  date: string
  notes: string
  professional: string
}

interface ClientEvolutionProps {
  evolutions: Evolution[]
  clientId: string
}

export function ClientEvolution({ evolutions, clientId }: ClientEvolutionProps) {
  const [newNote, setNewNote] = useState("")

  const handleAddNote = () => {
    if (newNote.trim()) {
      // Aqui seria implementada a lógica para salvar a nova nota
      alert("Nota adicionada com sucesso!")
      setNewNote("")
    }
  }

  return (
    <div className="space-y-4">
      <div className="border p-4 rounded-md">
        <Label htmlFor="evolution-note">Nova anotação</Label>
        <Textarea
          id="evolution-note"
          placeholder="Descreva a evolução do cliente, observações importantes, exercícios realizados..."
          className="min-h-[120px] mt-2"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <div className="flex justify-end mt-4">
          <Button onClick={handleAddNote} disabled={!newNote.trim()}>
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Anotação
          </Button>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-4">Histórico de Evolução</h3>
        <ScrollArea className="h-[300px]">
          {evolutions.length > 0 ? (
            <div className="space-y-6">
              {evolutions.map((evolution) => (
                <div key={evolution.id} className="border-l-2 border-primary pl-4 pb-2">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-semibold">{evolution.date}</div>
                    <div className="text-sm text-muted-foreground">{evolution.professional}</div>
                  </div>
                  <p className="text-sm">{evolution.notes}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Nenhum registro de evolução encontrado para este cliente.
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  )
}
