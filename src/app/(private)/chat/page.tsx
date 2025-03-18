"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mic, Send, MicOff, Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { apiClient } from "@/lib/api-client"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

interface Agent {
  id: string
  name: string
  description?: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)
  const [agents, setAgents] = useState<Agent[]>([])
  const [isLoadingAgents, setIsLoadingAgents] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Carregar agentes do backend
    const fetchAgents = async () => {
      setIsLoadingAgents(true)
      try {
        const data = await apiClient.get<Agent[]>("/api/agents")
        setAgents(data)

        // Selecionar o primeiro agente por padrão
        if (data.length > 0 && !selectedAgent) {
          setSelectedAgent(data[0].id)
          // Adicionar mensagem de boas-vindas do agente selecionado
          setMessages([
            {
              id: "1",
              content: `Olá! Sou o assistente ${data[0].name}. Como posso ajudar você hoje?`,
              role: "assistant",
              timestamp: new Date(),
            },
          ])
        }
      } catch (error) {
        console.error("Erro ao carregar agentes:", error)
        // Dados de exemplo para desenvolvimento
        const mockAgents = [
          {
            id: "1",
            name: "Assistente de Pilates",
            description: "Especialista em exercícios de pilates e reabilitação",
          },
          { id: "2", name: "Nutricionista", description: "Especialista em nutrição esportiva e bem-estar" },
        ]
        setAgents(mockAgents)

        if (mockAgents.length > 0 && !selectedAgent) {
          setSelectedAgent(mockAgents[0].id)
          setMessages([
            {
              id: "1",
              content: `Olá! Sou o assistente ${mockAgents[0].name}. Como posso ajudar você hoje?`,
              role: "assistant",
              timestamp: new Date(),
            },
          ])
        }
      } finally {
        setIsLoadingAgents(false)
      }
    }

    fetchAgents()
  }, [])

  const handleAgentChange = (agentId: string) => {
    setSelectedAgent(agentId)
    const agent = agents.find((a) => a.id === agentId)

    // Limpar mensagens e adicionar mensagem de boas-vindas do novo agente
    setMessages([
      {
        id: Date.now().toString(),
        content: `Olá! Sou o assistente ${agent?.name}. Como posso ajudar você hoje?`,
        role: "assistant",
        timestamp: new Date(),
      },
    ])
  }

  // Simula a resposta do assistente
  const handleSendMessage = async () => {
    if (!input.trim() || !selectedAgent) return

    // Adiciona a mensagem do usuário
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Aqui seria a chamada para a API do agente selecionado
      // Por enquanto, vamos simular uma resposta após um delay
      setTimeout(() => {
        const agent = agents.find((a) => a.id === selectedAgent)

        const assistantMessage: Message = {
          id: Date.now().toString(),
          content: `Como ${agent?.name}, posso responder que: ${
            input.length > 20
              ? "Entendi sua pergunta. Baseado no contexto, posso sugerir exercícios específicos que atendam às necessidades do cliente. Gostaria que eu detalhasse algum aspecto específico?"
              : "Preciso de mais informações para poder ajudar adequadamente. Pode me fornecer mais detalhes?"
          }`,
          role: "assistant",
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, assistantMessage])
        setIsLoading(false)
      }, 1500)
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error)
      setIsLoading(false)
    }
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    // Aqui seria implementada a lógica de gravação de voz
    if (isRecording) {
      // Parar gravação
    } else {
      // Iniciar gravação
    }
  }

  // Rola para a última mensagem quando novas mensagens são adicionadas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  if (isLoadingAgents) {
    return (
      <div className="flex-1 p-4 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Carregando agentes...</p>
        </div>
      </div>
    )
  }

  if (agents.length === 0) {
    return (
      <div className="flex-1 p-4 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Nenhum agente disponível</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-4">Você ainda não tem nenhum agente configurado.</p>
            <Button onClick={() => (window.location.href = "/agents")}>Criar um agente</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex-1 p-4 flex flex-col h-[calc(100vh-4rem)]">
      <Card className="flex-1 flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle>Chat com IA</CardTitle>
          <Select value={selectedAgent || ""} onValueChange={handleAgentChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione um agente" />
            </SelectTrigger>
            <SelectContent>
              {agents.map((agent) => (
                <SelectItem key={agent.id} value={agent.id}>
                  {agent.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col p-0">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`flex items-start gap-2 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}
                  >
                    <Avatar className="h-8 w-8">
                      {message.role === "assistant" ? (
                        <>
                          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI" />
                          <AvatarFallback>AI</AvatarFallback>
                        </>
                      ) : (
                        <>
                          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="You" />
                          <AvatarFallback>You</AvatarFallback>
                        </>
                      )}
                    </Avatar>
                    <div
                      className={`rounded-lg p-3 ${
                        message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs mt-1 opacity-70">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <div className="p-4 border-t">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSendMessage()
              }}
              className="flex items-center gap-2"
            >
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={toggleRecording}
                className={isRecording ? "text-red-500" : ""}
              >
                {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </Button>
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Digite sua mensagem..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button type="submit" size="icon" disabled={!input.trim() || isLoading}>
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
