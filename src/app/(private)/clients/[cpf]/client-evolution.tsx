"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus } from "lucide-react"

// Dados de exemplo
const evolutionData = {
  "client-1": [
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
    {
      id: 3,
      date: "10/02/2025",
      notes:
        "Avaliação inicial. Cliente com escoliose leve, desequilíbrio muscular entre lado direito e esquerdo. Definido plano de tratamento com foco em correção postural.",
      professional: "Dra. Juliana Mendes",
    },
  ],
  "client-2": [
    {
      id: 1,
      date: "12/03/2025",
      notes: "Progresso na recuperação do joelho. Aumentamos a carga nos exercícios de fortalecimento do quadríceps.",
      professional: "Dr. Ricardo Santos",
    },
    {
      id: 2,
      date: "26/02/2025",
      notes: "Cliente relatou redução significativa da dor. Amplitude de movimento melhorando gradualmente.",
      professional: "Dr. Ricardo Santos",
    },
  ],
  "client-3": [
    {
      id: 1,
      date: "05/01/2025",
      notes: "Última sessão antes da pausa. Cliente relatou satisfação com os resultados obtidos até o momento.",
      professional: "Dra. Juliana Mendes",
    },
  ],
}

export function ClientEvolution({ clientId }) {
  const [newNote, setNewNote] = useState("")
  const evolutions = evolutionData[clientId] || []

  const handleAddNote = () => {
    if (newNote.trim()) {
      // Aqui seria implementada a lógica para salvar a nova nota
      alert("Nota adicionada com sucesso!")
      setNewNote("")
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Nova Anotação de Evolução</CardTitle>
          <CardDescription>Registre observações sobre o progresso do cliente</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Descreva a evolução do cliente, observações importantes, exercícios realizados..."
            className="min-h-[120px]"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
          />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => setNewNote("")}>
            Cancelar
          </Button>
          <Button onClick={handleAddNote}>
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Anotação
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Histórico de Evolução</CardTitle>
          <CardDescription>Registro cronológico do progresso do cliente</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] pr-4">
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
        </CardContent>
      </Card>
    </div>
  )
}

