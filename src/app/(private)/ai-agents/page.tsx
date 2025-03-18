"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { MessageSquareText, Plus, Trash2, Copy, Edit } from "lucide-react"
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

// Dados de exemplo
const agents = [
  {
    id: "1",
    name: "Assistente de Pilates",
    description: "Especialista em exercícios de pilates e reabilitação",
    model: "gpt-4o",
    active: true,
    createdAt: "10/03/2025",
    context:
      "Você é um assistente especializado em pilates, com conhecimento profundo em anatomia, biomecânica e exercícios terapêuticos. Ajude os instrutores a criar planos de aula personalizados e responda dúvidas sobre exercícios específicos para diferentes condições.",
    tone: "Profissional e educativo",
    language: "Português",
    apiKey: "sk-*************************************",
  },
  {
    id: "2",
    name: "Nutricionista",
    description: "Especialista em nutrição esportiva e bem-estar",
    model: "gpt-4o",
    active: true,
    createdAt: "15/02/2025",
    context:
      "Você é um assistente especializado em nutrição, com foco em alimentação para praticantes de atividades físicas. Forneça orientações sobre alimentação saudável, hidratação e suplementação adequada para diferentes objetivos.",
    tone: "Amigável e motivador",
    language: "Português",
    apiKey: "sk-*************************************",
  },
  {
    id: "3",
    name: "Recepcionista Virtual",
    description: "Atendimento inicial e agendamentos",
    model: "gpt-3.5-turbo",
    active: false,
    createdAt: "05/01/2025",
    context:
      "Você é um assistente de recepção virtual para um estúdio de pilates. Ajude os clientes com informações sobre horários, preços, agendamentos e responda perguntas frequentes sobre as aulas e modalidades oferecidas.",
    tone: "Cordial e prestativo",
    language: "Português",
    apiKey: "sk-*************************************",
  },
]

export default function AIAgentsPage() {
  const [activeTab, setActiveTab] = useState("agents")
  const [isNewAgentDialogOpen, setIsNewAgentDialogOpen] = useState(false)
  const [selectedAgent, setSelectedAgent] = useState<any>(null)

  const handleEditAgent = (agent: any) => {
    setSelectedAgent(agent)
    setIsNewAgentDialogOpen(true)
  }

  const handleCreateAgent = () => {
    setSelectedAgent(null)
    setIsNewAgentDialogOpen(true)
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 md:pt-12">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Agentes de IA</h2>
        <Button onClick={handleCreateAgent}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Agente
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="agents">Meus Agentes</TabsTrigger>
          <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
          <TabsTrigger value="settings">Configurações</TabsTrigger>
        </TabsList>

        <TabsContent value="agents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Agentes Disponíveis</CardTitle>
              <CardDescription>Gerencie seus assistentes virtuais personalizados</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Modelo</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Criado em</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {agents.map((agent) => (
                    <TableRow key={agent.id}>
                      <TableCell className="font-medium">{agent.name}</TableCell>
                      <TableCell>{agent.description}</TableCell>
                      <TableCell>{agent.model}</TableCell>
                      <TableCell>
                        {agent.active ? (
                          <Badge className="bg-green-500">Ativo</Badge>
                        ) : (
                          <Badge variant="secondary">Inativo</Badge>
                        )}
                      </TableCell>
                      <TableCell>{agent.createdAt}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleEditAgent(agent)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="marketplace" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Marketplace de Agentes</CardTitle>
              <CardDescription>Explore e adquira agentes especializados para seu estúdio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Especialista em Reabilitação</CardTitle>
                    <CardDescription>Focado em exercícios terapêuticos e reabilitação</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Assistente especializado em reabilitação física, com conhecimento em lesões comuns, protocolos de
                      recuperação e progressão de exercícios.
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold">R$ 99,90/mês</span>
                      <Badge>Novo</Badge>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Adquirir</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Consultor de Marketing</CardTitle>
                    <CardDescription>Estratégias de marketing para estúdios de pilates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Assistente especializado em marketing digital para estúdios de pilates, com foco em estratégias de
                      captação e retenção de clientes.
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold">R$ 129,90/mês</span>
                      <Badge variant="outline">Popular</Badge>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Adquirir</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Gerente Financeiro</CardTitle>
                    <CardDescription>Análise financeira e gestão de negócios</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Assistente especializado em gestão financeira para estúdios de pilates, com foco em análise de
                      custos, precificação e planejamento financeiro.
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold">R$ 149,90/mês</span>
                      <Badge className="bg-amber-500">Premium</Badge>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Adquirir</Button>
                  </CardFooter>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de IA</CardTitle>
              <CardDescription>Gerencie as configurações globais dos seus agentes de IA</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-key">Chave de API Padrão</Label>
                <Input id="api-key" type="password" placeholder="sk-..." />
                <p className="text-sm text-muted-foreground">
                  Esta chave será usada como padrão para todos os agentes, a menos que uma chave específica seja
                  definida.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="default-model">Modelo Padrão</Label>
                <Select defaultValue="gpt-4o">
                  <SelectTrigger id="default-model">
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

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="logging">Registro de Conversas</Label>
                  <p className="text-sm text-muted-foreground">
                    Armazenar histórico de conversas para melhorar os agentes
                  </p>
                </div>
                <Switch id="logging" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="analytics">Analytics</Label>
                  <p className="text-sm text-muted-foreground">Coletar dados de uso para análise de desempenho</p>
                </div>
                <Switch id="analytics" defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Salvar Configurações</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="agent-name">Nome do Agente</Label>
                <Input id="agent-name" placeholder="Ex: Assistente de Pilates" defaultValue={selectedAgent?.name} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="agent-description">Descrição</Label>
                <Input
                  id="agent-description"
                  placeholder="Breve descrição do agente"
                  defaultValue={selectedAgent?.description}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="agent-model">Modelo de IA</Label>
                <Select defaultValue={selectedAgent?.model || "gpt-4o"}>
                  <SelectTrigger id="agent-model">
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
                <Label htmlFor="agent-language">Idioma Principal</Label>
                <Select defaultValue={selectedAgent?.language || "Português"}>
                  <SelectTrigger id="agent-language">
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
                <Label htmlFor="agent-tone">Tom de Voz</Label>
                <Input id="agent-tone" placeholder="Ex: Profissional e educativo" defaultValue={selectedAgent?.tone} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="agent-api-key">Chave de API (opcional)</Label>
                <Input
                  id="agent-api-key"
                  type="password"
                  placeholder="Deixe em branco para usar a chave padrão"
                  defaultValue={selectedAgent?.apiKey}
                />
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Switch id="agent-active" defaultChecked={selectedAgent?.active ?? true} />
                <Label htmlFor="agent-active">Agente Ativo</Label>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="agent-context">Contexto e Instruções</Label>
                <Textarea
                  id="agent-context"
                  placeholder="Descreva em detalhes o papel, conhecimentos e comportamento esperado do agente..."
                  className="min-h-[250px]"
                  defaultValue={selectedAgent?.context}
                />
                <p className="text-xs text-muted-foreground">
                  Forneça instruções detalhadas sobre como o agente deve se comportar, que conhecimentos deve ter e como
                  deve responder às perguntas.
                </p>
              </div>

              <div className="pt-4">
                <Button variant="outline" className="w-full">
                  <MessageSquareText className="mr-2 h-4 w-4" />
                  Testar Agente
                </Button>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewAgentDialogOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">{selectedAgent ? "Salvar Alterações" : "Criar Agente"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
