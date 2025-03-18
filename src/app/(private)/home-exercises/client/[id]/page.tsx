"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Video, FileText, ExternalLink, Clock, Award, CheckCircle, AlertCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"

// Tipos
interface ClientExercise {
  id: string
  assignedDate: string
  expirationDate?: string
  completedDate?: string
  viewCount: number
  lastViewed?: string
  status: "ASSIGNED" | "VIEWED" | "COMPLETED" | "EXPIRED"
  feedback?: string
  points: number
  exercise: {
    id: string
    title: string
    description?: string
    type: "VIDEO" | "PDF" | "LINK"
    url: string
    thumbnail?: string
    difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED"
    duration?: number
    bodyArea?: string
  }
}

interface Client {
  id: string
  name: string
  email: string
}

export default function ClientExercisesPage() {
  const params = useParams()
  const router = useRouter()
  const clientId = params.id as string

  const [activeTab, setActiveTab] = useState("active")
  const [client, setClient] = useState<Client | null>(null)
  const [exercises, setExercises] = useState<ClientExercise[]>([])
  const [loading, setLoading] = useState(true)

  // Dados de exemplo para visualização inicial
  const dummyClient: Client = {
    id: "1",
    name: "Ana Silva",
    email: "ana@example.com",
  }

  const dummyExercises: ClientExercise[] = [
    {
      id: "1",
      assignedDate: "2023-05-10T00:00:00.000Z",
      expirationDate: "2023-05-17T00:00:00.000Z",
      viewCount: 3,
      lastViewed: "2023-05-12T00:00:00.000Z",
      status: "VIEWED",
      points: 5,
      exercise: {
        id: "1",
        title: "Alongamento para Coluna",
        description: "Série de alongamentos para aliviar tensão na coluna após o dia de trabalho",
        type: "VIDEO",
        url: "https://www.youtube.com/watch?v=example1",
        thumbnail: "/placeholder.svg?height=200&width=300",
        difficulty: "BEGINNER",
        duration: 15,
        bodyArea: "Coluna",
      },
    },
    {
      id: "2",
      assignedDate: "2023-05-15T00:00:00.000Z",
      expirationDate: "2023-05-22T00:00:00.000Z",
      completedDate: "2023-05-16T00:00:00.000Z",
      viewCount: 2,
      lastViewed: "2023-05-16T00:00:00.000Z",
      status: "COMPLETED",
      feedback: "Exercício muito bom, senti alívio imediato na coluna.",
      points: 10,
      exercise: {
        id: "2",
        title: "Fortalecimento de Core",
        description: "Exercícios para fortalecer a musculatura abdominal e lombar",
        type: "VIDEO",
        url: "https://www.youtube.com/watch?v=example2",
        thumbnail: "/placeholder.svg?height=200&width=300",
        difficulty: "INTERMEDIATE",
        duration: 20,
        bodyArea: "Abdômen",
      },
    },
    {
      id: "3",
      assignedDate: "2023-04-20T00:00:00.000Z",
      expirationDate: "2023-04-27T00:00:00.000Z",
      viewCount: 0,
      status: "EXPIRED",
      points: 0,
      exercise: {
        id: "3",
        title: "Guia de Mobilidade Articular",
        description: "PDF com guia completo de exercícios de mobilidade para praticar em casa",
        type: "PDF",
        url: "https://example.com/mobilidade.pdf",
        thumbnail: "/placeholder.svg?height=200&width=300",
        difficulty: "BEGINNER",
        bodyArea: "Articulações",
      },
    },
    {
      id: "4",
      assignedDate: new Date().toISOString(),
      expirationDate: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString(),
      viewCount: 0,
      status: "ASSIGNED",
      points: 0,
      exercise: {
        id: "4",
        title: "Exercícios para Postura",
        description: "Série de exercícios para melhorar a postura e prevenir dores",
        type: "VIDEO",
        url: "https://www.youtube.com/watch?v=example4",
        thumbnail: "/placeholder.svg?height=200&width=300",
        difficulty: "BEGINNER",
        duration: 10,
        bodyArea: "Postura",
      },
    },
  ]

  // Carregar dados
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Em produção, substituir por chamadas reais à API
        // const clientResponse = await apiClient.get(`/api/clients/${clientId}`)
        // const exercisesResponse = await apiClient.get(`/api/client-exercises?clientId=${clientId}`)

        // Usando dados de exemplo por enquanto
        setClient(dummyClient)
        setExercises(dummyExercises)
        setLoading(false)
      } catch (error) {
        console.error("Erro ao carregar dados:", error)
        toast.error("Não foi possível carregar os dados. Tente novamente mais tarde.")
        setLoading(false)
      }
    }

    fetchData()
  }, [clientId])

  const handleMarkAsCompleted = async (exerciseId: string) => {
    try {
      // Em produção, substituir por chamada real à API
      // await apiClient.put(`/api/client-exercises/${exerciseId}/complete`)

      // Atualizar estado local
      setExercises(
        exercises.map((ex) => {
          if (ex.id === exerciseId) {
            return {
              ...ex,
              status: "COMPLETED" as const,
              completedDate: new Date().toISOString(),
              points: ex.points + 5, // Adiciona pontos por completar
            }
          }
          return ex
        }),
      )

      toast.success("Exercício marcado como concluído")
    } catch (error) {
      console.error("Erro ao marcar exercício como concluído:", error)
      toast.error("Não foi possível atualizar o status do exercício. Tente novamente mais tarde.")
    }
  }

  const handleTrackView = async (exerciseId: string) => {
    try {
      // Em produção, substituir por chamada real à API
      // await apiClient.put(`/api/client-exercises/${exerciseId}/view`)

      // Atualizar estado local
      setExercises(
        exercises.map((ex) => {
          if (ex.id === exerciseId) {
            const newStatus = ex.status === "ASSIGNED" ? ("VIEWED" as const) : ex.status
            return {
              ...ex,
              status: newStatus,
              viewCount: ex.viewCount + 1,
              lastViewed: new Date().toISOString(),
              points: ex.points + 1, // Adiciona pontos por visualizar
            }
          }
          return ex
        }),
      )
    } catch (error) {
      console.error("Erro ao registrar visualização:", error)
    }
  }

  const handleSubmitFeedback = async (exerciseId: string, feedback: string) => {
    try {
      // Em produção, substituir por chamada real à API
      // await apiClient.put(`/api/client-exercises/${exerciseId}/feedback`, { feedback })

      // Atualizar estado local
      setExercises(
        exercises.map((ex) => {
          if (ex.id === exerciseId) {
            return {
              ...ex,
              feedback,
              points: ex.points + 2, // Adiciona pontos por dar feedback
            }
          }
          return ex
        }),
      )

      toast.success("Feedback enviado com sucesso")
    } catch (error) {
      console.error("Erro ao enviar feedback:", error)
      toast.error("Não foi possível enviar o feedback. Tente novamente mais tarde.")
    }
  }

  const filteredExercises = exercises.filter((ex) => {
    if (activeTab === "active") {
      return ex.status === "ASSIGNED" || ex.status === "VIEWED"
    }
    if (activeTab === "completed") {
      return ex.status === "COMPLETED"
    }
    if (activeTab === "expired") {
      return ex.status === "EXPIRED"
    }
    return true
  })

  const totalPoints = exercises.reduce((sum, ex) => sum + ex.points, 0)
  const completedCount = exercises.filter((ex) => ex.status === "COMPLETED").length
  const expiredCount = exercises.filter((ex) => ex.status === "EXPIRED").length
  const activeCount = exercises.filter((ex) => ex.status === "ASSIGNED" || ex.status === "VIEWED").length

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case "BEGINNER":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
            Iniciante
          </Badge>
        )
      case "INTERMEDIATE":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
            Intermediário
          </Badge>
        )
      case "ADVANCED":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
            Avançado
          </Badge>
        )
      default:
        return <Badge variant="outline">Não definido</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ASSIGNED":
        return <Badge variant="outline">Atribuído</Badge>
      case "VIEWED":
        return <Badge variant="secondary">Visualizado</Badge>
      case "COMPLETED":
        return <Badge className="bg-green-500">Concluído</Badge>
      case "EXPIRED":
        return <Badge variant="destructive">Expirado</Badge>
      default:
        return <Badge variant="outline">Desconhecido</Badge>
    }
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString("pt-BR")
  }

  const isExpired = (expirationDate?: string) => {
    if (!expirationDate) return false
    return new Date(expirationDate) < new Date()
  }

  const getDaysRemaining = (expirationDate?: string) => {
    if (!expirationDate) return 0
    const expDate = new Date(expirationDate)
    const today = new Date()
    const diffTime = expDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 0
  }

  if (loading) {
    return (
      <div className="flex-1 p-4 md:p-8 flex justify-center items-center">
        <p>Carregando dados do aluno...</p>
      </div>
    )
  }

  if (!client) {
    return (
      <div className="flex-1 p-4 md:p-8">
        <h1 className="text-2xl font-bold mb-4">Aluno não encontrado</h1>
        <Button onClick={() => router.back()}>Voltar</Button>
      </div>
    )
  }

  return (
    <div className="flex-1 p-4 md:p-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => router.back()}>
              Voltar
            </Button>
            <h1 className="text-2xl font-bold">Exercícios de {client.name}</h1>
          </div>
          <p className="text-muted-foreground">{client.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total de Pontos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Award className="mr-2 h-4 w-4 text-yellow-500" />
              <div className="text-2xl font-bold">{totalPoints}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Progresso</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Progress
                value={(completedCount / (completedCount + activeCount + expiredCount)) * 100 || 0}
                className="h-2"
              />
              <div className="text-xs text-muted-foreground">
                {completedCount} concluídos de {completedCount + activeCount + expiredCount} exercícios
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="text-lg font-bold">{activeCount}</div>
                <div className="text-xs text-muted-foreground">Ativos</div>
              </div>
              <div>
                <div className="text-lg font-bold">{completedCount}</div>
                <div className="text-xs text-muted-foreground">Concluídos</div>
              </div>
              <div>
                <div className="text-lg font-bold">{expiredCount}</div>
                <div className="text-xs text-muted-foreground">Expirados</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Ativos ({activeCount})</TabsTrigger>
          <TabsTrigger value="completed">Concluídos ({completedCount})</TabsTrigger>
          <TabsTrigger value="expired">Expirados ({expiredCount})</TabsTrigger>
          <TabsTrigger value="all">Todos ({exercises.length})</TabsTrigger>
        </TabsList>

        {["active", "completed", "expired", "all"].map((tab) => (
          <TabsContent key={tab} value={tab} className="space-y-4">
            {filteredExercises.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredExercises.map((clientExercise) => (
                  <Card key={clientExercise.id} className="overflow-hidden">
                    {clientExercise.exercise.type === "VIDEO" && (
                      <div className="aspect-video relative">
                        <img
                          src={clientExercise.exercise.thumbnail || "/placeholder.svg?height=200&width=300"}
                          alt={clientExercise.exercise.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <Button variant="secondary" asChild onClick={() => handleTrackView(clientExercise.id)}>
                            <a href={clientExercise.exercise.url} target="_blank" rel="noopener noreferrer">
                              <Video className="mr-2 h-4 w-4" />
                              Assistir
                            </a>
                          </Button>
                        </div>
                      </div>
                    )}

                    <CardHeader className="p-4">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{clientExercise.exercise.title}</CardTitle>
                        <div className="flex items-center gap-1">
                          <Award className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm">{clientExercise.points}</span>
                        </div>
                      </div>
                      <CardDescription className="line-clamp-2 mt-1">
                        {clientExercise.exercise.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="p-4 pt-0 space-y-3">
                      {clientExercise.exercise.type !== "VIDEO" && (
                        <div className="flex justify-center p-4">
                          {clientExercise.exercise.type === "PDF" ? (
                            <FileText className="h-16 w-16 text-muted-foreground" />
                          ) : (
                            <ExternalLink className="h-16 w-16 text-muted-foreground" />
                          )}
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2">
                        {getStatusBadge(clientExercise.status)}
                        {getDifficultyBadge(clientExercise.exercise.difficulty)}
                        {clientExercise.exercise.duration && (
                          <Badge variant="outline" className="flex items-center">
                            <Clock className="mr-1 h-3 w-3" />
                            {clientExercise.exercise.duration} min
                          </Badge>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">Atribuído:</span>
                          <div>{formatDate(clientExercise.assignedDate)}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Expira:</span>
                          <div className={isExpired(clientExercise.expirationDate) ? "text-destructive" : ""}>
                            {formatDate(clientExercise.expirationDate)}
                          </div>
                        </div>
                      </div>

                      {clientExercise.status === "ASSIGNED" || clientExercise.status === "VIEWED" ? (
                        <div className="text-sm">
                          <span className="text-muted-foreground">Tempo restante:</span>
                          <div
                            className={
                              getDaysRemaining(clientExercise.expirationDate) <= 2 ? "text-destructive font-medium" : ""
                            }
                          >
                            {getDaysRemaining(clientExercise.expirationDate)} dias
                          </div>
                        </div>
                      ) : null}

                      {clientExercise.viewCount > 0 && (
                        <div className="text-sm">
                          <span className="text-muted-foreground">Visualizações:</span>
                          <div>
                            {clientExercise.viewCount}x (última: {formatDate(clientExercise.lastViewed)})
                          </div>
                        </div>
                      )}

                      {clientExercise.feedback && (
                        <div className="text-sm border-t pt-2 mt-2">
                          <span className="text-muted-foreground">Feedback:</span>
                          <div className="italic">{clientExercise.feedback}</div>
                        </div>
                      )}
                    </CardContent>

                    <CardFooter className="p-4 pt-0 flex justify-between">
                      {(clientExercise.status === "ASSIGNED" || clientExercise.status === "VIEWED") && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleMarkAsCompleted(clientExercise.id)}
                          className="w-full"
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Marcar como Concluído
                        </Button>
                      )}

                      {clientExercise.status === "COMPLETED" && !clientExercise.feedback && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const feedback = prompt("Compartilhe sua experiência com este exercício:")
                            if (feedback) handleSubmitFeedback(clientExercise.id, feedback)
                          }}
                          className="w-full"
                        >
                          Enviar Feedback
                        </Button>
                      )}

                      {clientExercise.status === "EXPIRED" && (
                        <div className="w-full text-center text-sm text-muted-foreground flex items-center justify-center">
                          <AlertCircle className="mr-2 h-4 w-4 text-destructive" />
                          Exercício expirado
                        </div>
                      )}

                      {clientExercise.exercise.type !== "VIDEO" && (
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          onClick={() => handleTrackView(clientExercise.id)}
                          className={
                            clientExercise.status === "COMPLETED" || clientExercise.status === "EXPIRED" ? "w-full" : ""
                          }
                        >
                          <a href={clientExercise.exercise.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Abrir
                          </a>
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="py-8">
                    <FileText className="h-12 w-12 mx-auto text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-semibold">Nenhum exercício encontrado</h3>
                    <p className="mt-1 text-muted-foreground">
                      {tab === "active" && "Não há exercícios ativos para este aluno"}
                      {tab === "completed" && "Este aluno ainda não concluiu nenhum exercício"}
                      {tab === "expired" && "Não há exercícios expirados para este aluno"}
                      {tab === "all" && "Nenhum exercício foi atribuído a este aluno ainda"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
