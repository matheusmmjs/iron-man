"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Plus, Trash2, Copy, Edit, Bot, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { apiClient } from "@/lib/api-client"

interface Agent {
  id: string
  name: string
  description?: string
  model: string
  context: string
  tone?: string
  language: string
  apiKey?: string
  isActive: boolean
  createdAt: string
}

export default function AgentsPage() {
  const [isNewAgentDialogOpen, setIsNewAgentDialogOpen] = useState(false)
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)
  const [agents, setAgents] = useState<Agent[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchAgents()
  }, [])

  const fetchAgents = async () => {
    setIsLoading(true)
    try {
      const data = await apiClient.get<Agent[]>("/api/agents")
      setAgents(data)
    } catch (error) {
      console.error("Erro ao buscar agentes:", error)
      // Dados de exemplo para desenvolvimento
      setAgents([
        {
          id: "1",
          name: "Assistente de Pilates",
          description: "Especialista em exercícios de pilates e reabilitação",
          model: "gpt-4o",
          context:
            "Você é um assistente especializado em pilates, com conhecimento profundo em anatomia, biomecânica e exercícios terapêuticos.",
          tone: "Profissional e educativo",
          language: "Português",
          isActive: true,
          createdAt: new Date().toISOString(),
        },
        {
          id: "2",
          name: "Nutricionista",
          description: "Especialista em nutrição esportiva e bem-estar",
          model: "gpt-4o",
          context:
            "Você é um assistente especializado em nutrição, com foco em alimentação para praticantes de atividades físicas.",
          tone: "Amigável e motivador",
          language: "Português",
          isActive: true,
          createdAt: new Date().toISOString(),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateAgent = () => {
    setSelectedAgent(null)
    setIsNewAgentDialogOpen(true)
  }

  const handleEditAgent = (agent: Agent) => {
    setSelectedAgent(agent)
    setIsNewAgentDialogOpen(true)
  }

  const handleDeleteAgent = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este agente?")) return

    try {
      await apiClient.delete(`/api/agents/${id}`)
      setAgents(agents.filter((agent) => agent.id !== id))
    } catch (error) {
      console.error("Erro ao excluir agente:", error)
    }
  }

  const handleSaveAgent = async (formData: FormData) => {
    const agentData = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      model: formData.get("model") as string,
      context: formData.get("context") as string,
      tone: formData.get("tone") as string,
      language: formData.get("language") as string,
      apiKey: formData.get("apiKey") as string,
      isActive: formData.get("isActive") === "on",
    }

    try {
      if (selectedAgent) {
        // Atualizar agente existente
        const updatedAgent = await apiClient.put<Agent>(`/api/agents/${selectedAgent.id}`, agentData)
        setAgents(agents.map((agent) => (agent.id === selectedAgent.id ? updatedAgent : agent)))
      } else {
        // Criar novo agente
        const newAgent = await apiClient.post<Agent>("/api/agents", agentData)
        setAgents([...agents, newAgent])
      }

      setIsNewAgentDialogOpen(false)
    } catch (error) {
      console.error("Erro ao salvar agente:", error)
    }
  }

  const filteredAgents = agents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (agent.description && agent.description.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <div className="flex-1 p-4 md:p-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Agentes de IA</h1>
          <p className="text-muted-foreground">Gerencie seus assistentes virtuais personalizados</p>
        </div>
        <Button onClick={handleCreateAgent} className="mt-4 md:mt-0">
          <Plus className="mr-2 h-4 w-4" />
          Novo Agente
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <CardTitle>Agentes Disponíveis</CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar agente..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <CardDescription>Gerencie seus assistentes virtuais personalizados</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">Carregando agentes...</div>
          ) : filteredAgents.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead className="hidden md:table-cell">Descrição</TableHead>
                    <TableHead className="hidden md:table-cell">Modelo</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAgents.map((agent) => (
                    <TableRow key={agent.id}>
                      <TableCell className="font-medium">{agent.name}</TableCell>
                      <TableCell className="hidden md:table-cell">{agent.description || "-"}</TableCell>
                      <TableCell className="hidden md:table-cell">{agent.model}</TableCell>
                      <TableCell>
                        {agent.isActive ? (
                          <Badge className="bg-green-500">Ativo</Badge>
                        ) : (
                          <Badge variant="secondary">Inativo</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleEditAgent(agent)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive"
                            onClick={() => handleDeleteAgent(agent.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-8">
              <Bot className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">Nenhum agente encontrado</h3>
              <p className="mt-1 text-muted-foreground">Crie seu primeiro agente para começar a usar a IA</p>
              <Button onClick={handleCreateAgent} className="mt-4">
                <Plus className="mr-2 h-4 w-4" />
                Criar Agente
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isNewAgentDialogOpen} onOpenChange={setIsNewAgentDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedAgent ? "Editar Agente" : "Novo Agente"}</DialogTitle>
            <DialogDescription>
              {selectedAgent
                ? "Modifique as configurações do seu agente de IA"
                : "Configure um novo assistente virtual personalizado"}
            </DialogDescription>
          </DialogHeader>

          <form action={handleSaveAgent}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome do Agente</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Ex: Assistente de Pilates"
                    defaultValue={selectedAgent?.name}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Input
                    id="description"
                    name="description"
                    placeholder="Breve descrição do agente"
                    defaultValue={selectedAgent?.description}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="model">Modelo de IA</Label>
                  <Select defaultValue={selectedAgent?.model || "gpt-4o"} name="model">
                    <SelectTrigger id="model">
                      <SelectValue placeholder="Selecione um modelo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                      <SelectItem value="gpt-4">GPT-4</SelectItem>
                      <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                      <SelectItem value="claude-3-opus">Claude 3 Opus</SelectItem>
                      <SelectItem value="claude-3-sonnet">Claude 3 Sonnet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Idioma Principal</Label>
                  <Select defaultValue={selectedAgent?.language || "Português"} name="language">
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Selecione um idioma" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Português">Português</SelectItem>
                      <SelectItem value="Inglês">Inglês</SelectItem>
                      <SelectItem value="Espanhol">Espanhol</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tone">Tom de Voz</Label>
                  <Input
                    id="tone"
                    name="tone"
                    placeholder="Ex: Profissional e educativo"
                    defaultValue={selectedAgent?.tone}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="apiKey">Chave de API (opcional)</Label>
                  <Input
                    id="apiKey"
                    name="apiKey"
                    type="password"
                    placeholder="Deixe em branco para usar a chave padrão"
                    defaultValue={selectedAgent?.apiKey}
                  />
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  <Switch id="isActive" name="isActive" defaultChecked={selectedAgent?.isActive ?? true} />
                  <Label htmlFor="isActive">Agente Ativo</Label>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="context">Contexto e Instruções</Label>
                  <Textarea
                    id="context"
                    name="context"
                    placeholder="Descreva em detalhes o papel, conhecimentos e comportamento esperado do agente..."
                    className="min-h-[250px]"
                    defaultValue={selectedAgent?.context}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Forneça instruções detalhadas sobre como o agente deve se comportar, que conhecimentos deve ter e
                    como deve responder às perguntas.
                  </p>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setIsNewAgentDialogOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">{selectedAgent ? "Salvar Alterações" : "Criar Agente"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
