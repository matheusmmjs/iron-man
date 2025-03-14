"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

// Dados de exemplo
const evolutionData = {
  "1": [
    {
      id: 1,
      date: "10/03/2025",
      notes:
        "Cliente apresentou melhora significativa na postura. Exercícios de fortalecimento da cadeia posterior estão mostrando resultados positivos.",
      professional: "Dra. Juliana Mendes",
    },
    {
      id: 2,
      date: "24/02/2025",
      notes:
        "Iniciamos trabalho específico para escoliose. Cliente relatou desconforto leve após a sessão anterior, ajustamos a intensidade dos exercícios.",
      professional: "Dra. Juliana Mendes",
    },
  ],
  "2": [
    {
      id: 1,
      date: "12/03/2025",
      notes: "Progresso na recuperação do joelho. Aumentamos a carga nos exercícios de fortalecimento do quadríceps.",
      professional: "Dr. Ricardo Santos",
    },
  ],
  "3": [
    {
      id: 1,
      date: "05/01/2025",
      notes: "Última sessão antes da pausa. Cliente relatou satisfação com os resultados obtidos até o momento.",
      professional: "Dra. Juliana Mendes",
    },
  ],
}

export function EvolutionTab() {
  const [selectedClient, setSelectedClient] = useState("")
  const [newNote, setNewNote] = useState("")
  const evolutions = selectedClient ? evolutionData[selectedClient] || [] : []

  const handleAddNote = () => {
    if (newNote.trim() && selectedClient) {
      // Aqui seria implementada a lógica para salvar a nova nota
      alert("Nota adicionada com sucesso!")
      setNewNote("")
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Evolução dos Clientes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/3">
              <Label htmlFor="client-select">Selecione um cliente</Label>
              <Select value={selectedClient} onValueChange={setSelectedClient}>
                <SelectTrigger id="client-select">
                  <SelectValue placeholder="Selecione um cliente" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Ana Silva</SelectItem>
                  <SelectItem value="2">Carlos Oliveira</SelectItem>
                  <SelectItem value="3">Mariana Santos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {selectedClient && (
            <>
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

              <div className="border rounded-md p-4">
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
            </>
          )}

          {!selectedClient && (
            <div className="text-center py-8 text-muted-foreground border rounded-md">
              Selecione um cliente para visualizar e registrar a evolução.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
