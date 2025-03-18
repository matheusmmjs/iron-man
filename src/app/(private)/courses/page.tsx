"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Video, FileText, ExternalLink, MoreHorizontal, Edit, Trash2 } from "lucide-react"
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

// Dados de exemplo
const courses = [
  {
    id: "1",
    title: "Fundamentos de Pilates",
    description: "Curso introdutório sobre os princípios e fundamentos do método Pilates",
    type: "video",
    url: "https://www.youtube.com/watch?v=dnP71v2hWbo",
    thumbnail: "/placeholder.svg?height=200&width=300",
    status: "published",
    createdAt: "2023-05-10T00:00:00.000Z",
  },
  {
    id: "2",
    title: "Exercícios para Escoliose",
    description: "Série de exercícios específicos para tratamento de escoliose",
    type: "video",
    url: "https://www.youtube.com/watch?v=dLheZmdjMiY",
    thumbnail: "/placeholder.svg?height=200&width=300",
    status: "published",
    createdAt: "2023-06-15T00:00:00.000Z",
  },
  {
    id: "3",
    title: "Guia de Alongamentos",
    description: "PDF com guia completo de alongamentos para praticar em casa",
    type: "pdf",
    url: "https://example.com/alongamentos.pdf",
    thumbnail: "/placeholder.svg?height=200&width=300",
    status: "draft",
    createdAt: "2023-07-20T00:00:00.000Z",
  },
]

export default function CoursesPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [isNewCourseDialogOpen, setIsNewCourseDialogOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<any>(null)

  const handleCreateCourse = () => {
    setSelectedCourse(null)
    setIsNewCourseDialogOpen(true)
  }

  const handleEditCourse = (course: any) => {
    setSelectedCourse(course)
    setIsNewCourseDialogOpen(true)
  }

  const handleDeleteCourse = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este conteúdo?")) {
      // Lógica para excluir o curso
      console.log("Excluindo curso:", id)
    }
  }

  const handleSaveCourse = (formData: FormData) => {
    // Lógica para salvar o curso
    console.log("Salvando curso:", Object.fromEntries(formData.entries()))
    setIsNewCourseDialogOpen(false)
  }

  const filteredCourses = courses
    .filter(
      (course) =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .filter((course) => {
      if (activeTab === "all") return true
      if (activeTab === "videos") return course.type === "video"
      if (activeTab === "documents") return course.type === "pdf"
      if (activeTab === "drafts") return course.status === "draft"
      return true
    })

  return (
    <div className="flex-1 p-4 md:p-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Conteúdos e Aulas</h1>
          <p className="text-muted-foreground">Gerencie vídeos, documentos e materiais para seus alunos</p>
        </div>
        <Button onClick={handleCreateCourse} className="mt-4 md:mt-0">
          <Plus className="mr-2 h-4 w-4" />
          Novo Conteúdo
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <TabsList>
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="videos">Vídeos</TabsTrigger>
            <TabsTrigger value="documents">Documentos</TabsTrigger>
            <TabsTrigger value="drafts">Rascunhos</TabsTrigger>
          </TabsList>

          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar conteúdo..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              {filteredCourses.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Título</TableHead>
                        <TableHead className="hidden md:table-cell">Tipo</TableHead>
                        <TableHead className="hidden md:table-cell">Status</TableHead>
                        <TableHead className="hidden md:table-cell">Data de Criação</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCourses.map((course) => (
                        <TableRow key={course.id}>
                          <TableCell>
                            <div className="font-medium">{course.title}</div>
                            <div className="text-sm text-muted-foreground hidden md:block">{course.description}</div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {course.type === "video" ? (
                              <Badge
                                variant="outline"
                                className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                              >
                                <Video className="mr-1 h-3 w-3" />
                                Vídeo
                              </Badge>
                            ) : (
                              <Badge
                                variant="outline"
                                className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                              >
                                <FileText className="mr-1 h-3 w-3" />
                                PDF
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {course.status === "published" ? (
                              <Badge className="bg-green-500">Publicado</Badge>
                            ) : (
                              <Badge variant="secondary">Rascunho</Badge>
                            )}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {new Date(course.createdAt).toLocaleDateString("pt-BR")}
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
                                    href={course.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center"
                                  >
                                    <ExternalLink className="mr-2 h-4 w-4" />
                                    Abrir
                                  </a>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleEditCourse(course)}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Editar
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-destructive"
                                  onClick={() => handleDeleteCourse(course.id)}
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
                  <h3 className="mt-4 text-lg font-semibold">Nenhum conteúdo encontrado</h3>
                  <p className="mt-1 text-muted-foreground">
                    {searchTerm
                      ? "Tente ajustar sua busca para encontrar o que procura"
                      : "Adicione seu primeiro conteúdo para compartilhar com seus alunos"}
                  </p>
                  {!searchTerm && (
                    <Button onClick={handleCreateCourse} className="mt-4">
                      <Plus className="mr-2 h-4 w-4" />
                      Adicionar Conteúdo
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="videos" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src={course.thumbnail || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Button variant="secondary" asChild>
                      <a href={course.url} target="_blank" rel="noopener noreferrer">
                        <Video className="mr-2 h-4 w-4" />
                        Assistir
                      </a>
                    </Button>
                  </div>
                </div>
                <CardHeader className="p-4">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditCourse(course)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteCourse(course.id)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardDescription className="line-clamp-2 mt-1">{course.description}</CardDescription>
                </CardHeader>
                <CardFooter className="p-4 pt-0 flex justify-between">
                  <Badge variant={course.status === "published" ? "default" : "secondary"}>
                    {course.status === "published" ? "Publicado" : "Rascunho"}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {new Date(course.createdAt).toLocaleDateString("pt-BR")}
                  </span>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCourses.map((course) => (
              <Card key={course.id}>
                <CardHeader className="p-4">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditCourse(course)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteCourse(course.id)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardDescription className="line-clamp-2 mt-1">{course.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex justify-center p-4">
                    <FileText className="h-16 w-16 text-muted-foreground" />
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between">
                  <Badge variant={course.status === "published" ? "default" : "secondary"}>
                    {course.status === "published" ? "Publicado" : "Rascunho"}
                  </Badge>
                  <Button variant="outline" size="sm" asChild>
                    <a href={course.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Abrir
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="drafts" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              {filteredCourses.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Título</TableHead>
                        <TableHead className="hidden md:table-cell">Tipo</TableHead>
                        <TableHead className="hidden md:table-cell">Data de Criação</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCourses.map((course) => (
                        <TableRow key={course.id}>
                          <TableCell>
                            <div className="font-medium">{course.title}</div>
                            <div className="text-sm text-muted-foreground hidden md:block">{course.description}</div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {course.type === "video" ? (
                              <Badge
                                variant="outline"
                                className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                              >
                                <Video className="mr-1 h-3 w-3" />
                                Vídeo
                              </Badge>
                            ) : (
                              <Badge
                                variant="outline"
                                className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                              >
                                <FileText className="mr-1 h-3 w-3" />
                                PDF
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {new Date(course.createdAt).toLocaleDateString("pt-BR")}
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
                                <DropdownMenuItem onClick={() => handleEditCourse(course)}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Editar
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-destructive"
                                  onClick={() => handleDeleteCourse(course.id)}
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
                  <h3 className="mt-4 text-lg font-semibold">Nenhum rascunho encontrado</h3>
                  <p className="mt-1 text-muted-foreground">
                    Todos os seus conteúdos estão publicados ou você ainda não criou nenhum rascunho
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isNewCourseDialogOpen} onOpenChange={setIsNewCourseDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>{selectedCourse ? "Editar Conteúdo" : "Novo Conteúdo"}</DialogTitle>
            <DialogDescription>
              {selectedCourse
                ? "Modifique as informações do conteúdo existente"
                : "Preencha os dados para criar um novo conteúdo"}
            </DialogDescription>
          </DialogHeader>
          <form action={handleSaveCourse}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Ex: Fundamentos de Pilates"
                  defaultValue={selectedCourse?.title}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Breve descrição do conteúdo"
                  defaultValue={selectedCourse?.description}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Tipo de Conteúdo</Label>
                  <Select defaultValue={selectedCourse?.type || "video"} name="type">
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="video">Vídeo</SelectItem>
                      <SelectItem value="pdf">Documento PDF</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select defaultValue={selectedCourse?.status || "draft"} name="status">
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Rascunho</SelectItem>
                      <SelectItem value="published">Publicado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="url">URL do Conteúdo</Label>
                <Input
                  id="url"
                  name="url"
                  placeholder="Ex: https://www.youtube.com/watch?v=example"
                  defaultValue={selectedCourse?.url}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Insira o link do vídeo no YouTube ou o link para o documento PDF
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="thumbnail">URL da Miniatura (opcional)</Label>
                <Input
                  id="thumbnail"
                  name="thumbnail"
                  placeholder="Ex: https://example.com/thumbnail.jpg"
                  defaultValue={selectedCourse?.thumbnail}
                />
                <p className="text-xs text-muted-foreground">Deixe em branco para usar a miniatura padrão do vídeo</p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setIsNewCourseDialogOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">{selectedCourse ? "Salvar Alterações" : "Criar Conteúdo"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
