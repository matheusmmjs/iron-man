"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Video, FileText, ExternalLink, MoreHorizontal, Edit, Trash2, Clock, Users } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

// Tipos
interface HomeExercise {
  id: string
  title: string
  description?: string
  type: "VIDEO" | "PDF" | "LINK"
  url: string
  thumbnail?: string
  difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED"
  duration?: number
  bodyArea?: string
  status: "DRAFT" | "PUBLISHED"
  createdAt: string
  updatedAt: string
}

interface Client {
  id: string
  name: string
  email: string
}

export default function HomeExercisesPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [isExerciseDialogOpen, setIsExerciseDialogOpen] = useState(false)
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false)
  const [selectedExercise, setSelectedExercise] = useState<HomeExercise | null>(null)
  const [exercises, setExercises] = useState<HomeExercise[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedClients, setSelectedClients] = useState<string[]>([])
  const [expirationDays, setExpirationDays] = useState(7)

  // Dados de exemplo para visualização inicial
  const dummyExercises: HomeExercise[] = [
    {
      id: "1",
      title: "Alongamento para Coluna",
      description: "Série de alongamentos para aliviar tensão na coluna após o dia de trabalho",
      type: "VIDEO",
      url: "https://www.youtube.com/watch?v=example1",
      thumbnail: "/placeholder.svg?height=200&width=300",
      difficulty: "BEGINNER",
      duration: 15,
      bodyArea: "Coluna",
      status: "PUBLISHED",
      createdAt: "2023-05-10T00:00:00.000Z",
      updatedAt: "2023-05-10T00:00:00.000Z",
    },
    {
      id: "2",
      title: "Fortalecimento de Core",
      description: "Exercícios para fortalecer a musculatura abdominal e lombar",
      type: "VIDEO",
      url: "https://www.youtube.com/watch?v=example2",
      thumbnail: "/placeholder.svg?height=200&width=300",
      difficulty: "INTERMEDIATE",
      duration: 20,
      bodyArea: "Abdômen",
      status: "PUBLISHED",
      createdAt: "2023-06-15T00:00:00.000Z",
      updatedAt: "2023-06-15T00:00:00.000Z",
    },
    {
      id: "3",
      title: "Guia de Mobilidade Articular",
      description: "PDF com guia completo de exercícios de mobilidade para praticar em casa",
      type: "PDF",
      url: "https://example.com/mobilidade.pdf",
      thumbnail: "/placeholder.svg?height=200&width=300",
      difficulty: "BEGINNER",
      bodyArea: "Articulações",
      status: "DRAFT",
      createdAt: "2023-07-20T00:00:00.000Z",
      updatedAt: "2023-07-20T00:00:00.000Z",
    },
  ]

  const dummyClients: Client[] = [
    { id: "1", name: "Ana Silva", email: "ana@example.com" },
    { id: "2", name: "Carlos Oliveira", email: "carlos@example.com" },
    { id: "3", name: "Mariana Santos", email: "mariana@example.com" },
  ]

  // Carregar dados
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Em produção, substituir por chamadas reais à API
        // const exercisesResponse = await apiClient.get('/api/home-exercises')
        // const clientsResponse = await apiClient.get('/api/clients')

        // Usando dados de exemplo por enquanto
        setExercises(dummyExercises)
        setClients(dummyClients)
        setLoading(false)
      } catch (error) {
        console.error("Erro ao carregar dados:", error)
        toast.error("Não foi possível carregar os dados. Tente novamente mais tarde.")
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleCreateExercise = () => {
    setSelectedExercise(null)
    setIsExerciseDialogOpen(true)
  }

  const handleEditExercise = (exercise: HomeExercise) => {
    setSelectedExercise(exercise)
    setIsExerciseDialogOpen(true)
  }

  const handleDeleteExercise = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir este exercício?")) {
      try {
        // Em produção, substituir por chamada real à API
        // await apiClient.delete(`/api/home-exercises/${id}`)

        // Atualizar estado local
        setExercises(exercises.filter((exercise) => exercise.id !== id))
        toast.success("Exercício excluído com sucesso")
      } catch (error) {
        console.error("Erro ao excluir exercício:", error)
        toast.error("Não foi possível excluir o exercício. Tente novamente mais tarde.")
      }
    }
  }

  const handleSaveExercise = async (formData: FormData) => {
    try {
      const exerciseData = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        type: formData.get("type") as "VIDEO" | "PDF" | "LINK",
        url: formData.get("url") as string,
        thumbnail: (formData.get("thumbnail") as string) || undefined,
        difficulty: formData.get("difficulty") as "BEGINNER" | "INTERMEDIATE" | "ADVANCED",
        duration: formData.get("duration") ? Number.parseInt(formData.get("duration") as string) : undefined,
        bodyArea: (formData.get("bodyArea") as string) || undefined,
        status: formData.get("status") as "DRAFT" | "PUBLISHED",
      }

      if (selectedExercise) {
        // Atualizar exercício existente
        // Em produção, substituir por chamada real à API
        // const response = await apiClient.put(`/api/home-exercises/${selectedExercise.id}`, exerciseData)

        // Atualizar estado local
        const updatedExercise = { ...selectedExercise, ...exerciseData }
        setExercises(exercises.map((ex) => (ex.id === selectedExercise.id ? updatedExercise : ex)))
        toast.success("Exercício atualizado com sucesso")
      } else {
        // Criar novo exercício
        // Em produção, substituir por chamada real à API
        // const response = await apiClient.post('/api/home-exercises', exerciseData)

        // Atualizar estado local
        const newExercise: HomeExercise = {
          id: Date.now().toString(), // Temporário, a API retornaria o ID real
          ...exerciseData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        setExercises([...exercises, newExercise])
        toast.success("Exercício criado com sucesso")
      }

      setIsExerciseDialogOpen(false)
    } catch (error) {
      console.error("Erro ao salvar exercício:", error)
      toast.error("Não foi possível salvar o exercício. Tente novamente mais tarde.")
    }
  }

  const handleAssignExercise = (exercise: HomeExercise) => {
    setSelectedExercise(exercise)
    setSelectedClients([])
    setExpirationDays(7)
    setIsAssignDialogOpen(true)
  }

  const handleSaveAssignment = async () => {
    try {
      if (!selectedExercise || selectedClients.length === 0) {
        toast.error("Selecione pelo menos um aluno para atribuir o exercício")
        return
      }

      // Calcular data de expiração
      const expirationDate = new Date()
      expirationDate.setDate(expirationDate.getDate() + expirationDays)

      // Preparar dados para envio
      const assignmentData = {
        exerciseId: selectedExercise.id,
        clientIds: selectedClients,
        expirationDate: expirationDate.toISOString(),
      }

      // Em produção, substituir por chamada real à API
      // const response = await apiClient.post('/api/client-exercises/assign', assignmentData)

      toast.success(`Exercício atribuído com sucesso para ${selectedClients.length} aluno(s)`)

      setIsAssignDialogOpen(false)
    } catch (error) {
      console.error("Erro ao atribuir exercício:", error)
      toast.error("Não foi possível atribuir o exercício. Tente novamente mais tarde.")
    }
  }

  const toggleClientSelection = (clientId: string) => {
    if (selectedClients.includes(clientId)) {
      setSelectedClients(selectedClients.filter((id) => id !== clientId))
    } else {
      setSelectedClients([...selectedClients, clientId])
    }
  }

  const filteredExercises = exercises
    .filter(
      (exercise) =>
        exercise.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (exercise.description && exercise.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (exercise.bodyArea && exercise.bodyArea.toLowerCase().includes(searchTerm.toLowerCase())),
    )
    .filter((exercise) => {
      if (activeTab === "all") return true
      if (activeTab === "videos") return exercise.type === "VIDEO"
      if (activeTab === "documents") return exercise.type === "PDF" || exercise.type === "LINK"
      if (activeTab === "drafts") return exercise.status === "DRAFT"
      if (activeTab === "beginner") return exercise.difficulty === "BEGINNER"
      if (activeTab === "intermediate") return exercise.difficulty === "INTERMEDIATE"
      if (activeTab === "advanced") return exercise.difficulty === "ADVANCED"
      return true
    })

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

  return (
    <div className="flex-1 p-4 md:p-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Aulas para Casa</h1>
          <p className="text-muted-foreground">
            Gerencie exercícios e aulas complementares para seus alunos praticarem em casa
          </p>
        </div>
        <Button onClick={handleCreateExercise} className="mt-4 md:mt-0">
          <Plus className="mr-2 h-4 w-4" />
          Novo Exercício
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <TabsList className="flex-wrap">
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="videos">Vídeos</TabsTrigger>
            <TabsTrigger value="documents">Documentos</TabsTrigger>
            <TabsTrigger value="beginner">Iniciante</TabsTrigger>
            <TabsTrigger value="intermediate">Intermediário</TabsTrigger>
            <TabsTrigger value="advanced">Avançado</TabsTrigger>
            <TabsTrigger value="drafts">Rascunhos</TabsTrigger>
          </TabsList>

          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar exercício..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              {loading ? (
                <div className="flex justify-center items-center h-40">
                  <p>Carregando exercícios...</p>
                </div>
              ) : filteredExercises.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Título</TableHead>
                        <TableHead className="hidden md:table-cell">Tipo</TableHead>
                        <TableHead className="hidden md:table-cell">Dificuldade</TableHead>
                        <TableHead className="hidden md:table-cell">Duração</TableHead>
                        <TableHead className="hidden md:table-cell">Status</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredExercises.map((exercise) => (
                        <TableRow key={exercise.id}>
                          <TableCell>
                            <div className="font-medium">{exercise.title}</div>
                            <div className="text-sm text-muted-foreground hidden md:block">{exercise.description}</div>
                            {exercise.bodyArea && (
                              <div className="text-xs text-muted-foreground mt-1">Área: {exercise.bodyArea}</div>
                            )}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {exercise.type === "VIDEO" ? (
                              <Badge
                                variant="outline"
                                className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                              >
                                <Video className="mr-1 h-3 w-3" />
                                Vídeo
                              </Badge>
                            ) : exercise.type === "PDF" ? (
                              <Badge
                                variant="outline"
                                className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                              >
                                <FileText className="mr-1 h-3 w-3" />
                                PDF
                              </Badge>
                            ) : (
                              <Badge
                                variant="outline"
                                className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
                              >
                                <ExternalLink className="mr-1 h-3 w-3" />
                                Link
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {getDifficultyBadge(exercise.difficulty)}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {exercise.duration ? `${exercise.duration} min` : "N/A"}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {exercise.status === "PUBLISHED" ? (
                              <Badge className="bg-green-500">Publicado</Badge>
                            ) : (
                              <Badge variant="secondary">Rascunho</Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <span className="sr-only">Abrir menu</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                  <a
                                    href={exercise.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center"
                                  >
                                    <ExternalLink className="mr-2 h-4 w-4" />
                                    Abrir
                                  </a>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleEditExercise(exercise)}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Editar
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleAssignExercise(exercise)}>
                                  <Users className="mr-2 h-4 w-4" />
                                  Atribuir a Alunos
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="text-destructive"
                                  onClick={() => handleDeleteExercise(exercise.id)}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Excluir
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-semibold">Nenhum exercício encontrado</h3>
                  <p className="mt-1 text-muted-foreground">
                    {searchTerm
                      ? "Tente ajustar sua busca para encontrar o que procura"
                      : "Adicione seu primeiro exercício para compartilhar com seus alunos"}
                  </p>
                  {!searchTerm && (
                    <Button onClick={handleCreateExercise} className="mt-4">
                      <Plus className="mr-2 h-4 w-4" />
                      Adicionar Exercício
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="videos" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredExercises.map((exercise) => (
              <Card key={exercise.id} className="overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src={exercise.thumbnail || "/placeholder.svg?height=200&width=300"}
                    alt={exercise.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Button variant="secondary" asChild>
                      <a href={exercise.url} target="_blank" rel="noopener noreferrer">
                        <Video className="mr-2 h-4 w-4" />
                        Assistir
                      </a>
                    </Button>
                  </div>
                </div>
                <CardHeader className="p-4">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{exercise.title}</CardTitle>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditExercise(exercise)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAssignExercise(exercise)}>
                          <Users className="mr-2 h-4 w-4" />
                          Atribuir a Alunos
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => handleDeleteExercise(exercise.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardDescription className="line-clamp-2 mt-1">{exercise.description}</CardDescription>
                </CardHeader>
                <CardFooter className="p-4 pt-0 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    {getDifficultyBadge(exercise.difficulty)}
                    {exercise.duration && (
                      <Badge variant="outline" className="flex items-center">
                        <Clock className="mr-1 h-3 w-3" />
                        {exercise.duration} min
                      </Badge>
                    )}
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleAssignExercise(exercise)}>
                    <Users className="mr-2 h-3 w-3" />
                    Atribuir
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredExercises.map((exercise) => (
              <Card key={exercise.id}>
                <CardHeader className="p-4">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{exercise.title}</CardTitle>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditExercise(exercise)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAssignExercise(exercise)}>
                          <Users className="mr-2 h-4 w-4" />
                          Atribuir a Alunos
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => handleDeleteExercise(exercise.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardDescription className="line-clamp-2 mt-1">{exercise.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex justify-center p-4">
                    {exercise.type === "PDF" ? (
                      <FileText className="h-16 w-16 text-muted-foreground" />
                    ) : (
                      <ExternalLink className="h-16 w-16 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex justify-center gap-2">
                    {getDifficultyBadge(exercise.difficulty)}
                    {exercise.bodyArea && <Badge variant="outline">{exercise.bodyArea}</Badge>}
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between">
                  <Button variant="outline" size="sm" onClick={() => handleAssignExercise(exercise)}>
                    <Users className="mr-2 h-3 w-3" />
                    Atribuir
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href={exercise.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Abrir
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Conteúdo para as outras abas (beginner, intermediate, advanced, drafts) */}
        {["beginner", "intermediate", "advanced", "drafts"].map((tab) => (
          <TabsContent key={tab} value={tab} className="space-y-4">
            <Card>
              <CardContent className="p-6">
                {filteredExercises.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Título</TableHead>
                          <TableHead className="hidden md:table-cell">Tipo</TableHead>
                          <TableHead className="hidden md:table-cell">Duração</TableHead>
                          <TableHead className="hidden md:table-cell">Área</TableHead>
                          <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredExercises.map((exercise) => (
                          <TableRow key={exercise.id}>
                            <TableCell>
                              <div className="font-medium">{exercise.title}</div>
                              <div className="text-sm text-muted-foreground hidden md:block">
                                {exercise.description}
                              </div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {exercise.type === "VIDEO" ? (
                                <Badge
                                  variant="outline"
                                  className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                                >
                                  <Video className="mr-1 h-3 w-3" />
                                  Vídeo
                                </Badge>
                              ) : exercise.type === "PDF" ? (
                                <Badge
                                  variant="outline"
                                  className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                                >
                                  <FileText className="mr-1 h-3 w-3" />
                                  PDF
                                </Badge>
                              ) : (
                                <Badge
                                  variant="outline"
                                  className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
                                >
                                  <ExternalLink className="mr-1 h-3 w-3" />
                                  Link
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {exercise.duration ? `${exercise.duration} min` : "N/A"}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">{exercise.bodyArea || "N/A"}</TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Abrir menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem onClick={() => handleEditExercise(exercise)}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Editar
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleAssignExercise(exercise)}>
                                    <Users className="mr-2 h-4 w-4" />
                                    Atribuir a Alunos
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="text-destructive"
                                    onClick={() => handleDeleteExercise(exercise.id)}
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Excluir
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 mx-auto text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-semibold">Nenhum exercício encontrado</h3>
                    <p className="mt-1 text-muted-foreground">
                      Adicione exercícios com esta classificação ou ajuste seus filtros de busca
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Dialog para criar/editar exercício */}
      <Dialog open={isExerciseDialogOpen} onOpenChange={setIsExerciseDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedExercise ? "Editar Exercício" : "Novo Exercício"}</DialogTitle>
            <DialogDescription>
              {selectedExercise
                ? "Modifique as informações do exercício existente"
                : "Preencha os dados para criar um novo exercício para casa"}
            </DialogDescription>
          </DialogHeader>
          <form action={handleSaveExercise}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Ex: Alongamento para Coluna"
                  defaultValue={selectedExercise?.title}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Breve descrição do exercício"
                  defaultValue={selectedExercise?.description}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Tipo de Conteúdo</Label>
                  <Select defaultValue={selectedExercise?.type || "VIDEO"} name="type">
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="VIDEO">Vídeo</SelectItem>
                      <SelectItem value="PDF">Documento PDF</SelectItem>
                      <SelectItem value="LINK">Link Externo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="difficulty">Nível de Dificuldade</Label>
                  <Select defaultValue={selectedExercise?.difficulty || "BEGINNER"} name="difficulty">
                    <SelectTrigger id="difficulty">
                      <SelectValue placeholder="Selecione a dificuldade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BEGINNER">Iniciante</SelectItem>
                      <SelectItem value="INTERMEDIATE">Intermediário</SelectItem>
                      <SelectItem value="ADVANCED">Avançado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duração (minutos)</Label>
                  <Input
                    id="duration"
                    name="duration"
                    type="number"
                    min="1"
                    placeholder="Ex: 15"
                    defaultValue={selectedExercise?.duration}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bodyArea">Área do Corpo</Label>
                  <Input
                    id="bodyArea"
                    name="bodyArea"
                    placeholder="Ex: Coluna, Abdômen, Pernas"
                    defaultValue={selectedExercise?.bodyArea}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="url">URL do Conteúdo</Label>
                <Input
                  id="url"
                  name="url"
                  placeholder="Ex: https://www.youtube.com/watch?v=example"
                  defaultValue={selectedExercise?.url}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Insira o link do vídeo no YouTube, o link para o documento PDF ou qualquer outro link externo
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="thumbnail">URL da Miniatura (opcional)</Label>
                <Input
                  id="thumbnail"
                  name="thumbnail"
                  placeholder="Ex: https://example.com/thumbnail.jpg"
                  defaultValue={selectedExercise?.thumbnail}
                />
                <p className="text-xs text-muted-foreground">Deixe em branco para usar a miniatura padrão do vídeo</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select defaultValue={selectedExercise?.status || "DRAFT"} name="status">
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DRAFT">Rascunho</SelectItem>
                    <SelectItem value="PUBLISHED">Publicado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setIsExerciseDialogOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">{selectedExercise ? "Salvar Alterações" : "Criar Exercício"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dialog para atribuir exercício a alunos */}
      <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Atribuir Exercício a Alunos</DialogTitle>
            <DialogDescription>Selecione os alunos que devem realizar este exercício em casa</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {selectedExercise && (
              <div className="mb-4 p-3 bg-muted rounded-md">
                <div className="font-medium">{selectedExercise.title}</div>
                <div className="text-sm text-muted-foreground mt-1">{selectedExercise.description}</div>
                <div className="flex items-center gap-2 mt-2">
                  {getDifficultyBadge(selectedExercise.difficulty)}
                  {selectedExercise.duration && (
                    <Badge variant="outline" className="flex items-center">
                      <Clock className="mr-1 h-3 w-3" />
                      {selectedExercise.duration} min
                    </Badge>
                  )}
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="expirationDays">Dias para Expiração</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="expirationDays"
                    type="number"
                    min="1"
                    value={expirationDays}
                    onChange={(e) => setExpirationDays(Number.parseInt(e.target.value) || 7)}
                  />
                  <span className="text-sm text-muted-foreground whitespace-nowrap">dias</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  O exercício ficará disponível por este período após a atribuição
                </p>
              </div>

              <div className="space-y-2">
                <Label>Selecione os Alunos</Label>
                <div className="border rounded-md max-h-60 overflow-y-auto">
                  {clients.length > 0 ? (
                    <div className="divide-y">
                      {clients.map((client) => (
                        <div key={client.id} className="p-2 flex items-center">
                          <input
                            type="checkbox"
                            id={`client-${client.id}`}
                            checked={selectedClients.includes(client.id)}
                            onChange={() => toggleClientSelection(client.id)}
                            className="mr-2"
                          />
                          <Label htmlFor={`client-${client.id}`} className="flex-1 cursor-pointer">
                            <div>{client.name}</div>
                            <div className="text-xs text-muted-foreground">{client.email}</div>
                          </Label>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-muted-foreground">Nenhum aluno encontrado</div>
                  )}
                </div>
                <div className="flex justify-between text-sm">
                  <span>{selectedClients.length} aluno(s) selecionado(s)</span>
                  <Button
                    variant="link"
                    className="p-0 h-auto"
                    onClick={() =>
                      setSelectedClients(selectedClients.length === clients.length ? [] : clients.map((c) => c.id))
                    }
                  >
                    {selectedClients.length === clients.length ? "Desmarcar todos" : "Selecionar todos"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAssignDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveAssignment} disabled={selectedClients.length === 0}>
              Atribuir Exercício
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
