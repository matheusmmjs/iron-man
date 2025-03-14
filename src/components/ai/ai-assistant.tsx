"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mic, Send, MicOff, Loader2 } from "lucide-react"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

export function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Olá! Sou o assistente de Pilates. Como posso ajudar você hoje?",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Simula a resposta do assistente
  const handleSendMessage = async () => {
    if (!input.trim()) return

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

    // Simula o tempo de resposta da IA
    setTimeout(() => {
      // Exemplos de respostas baseadas em palavras-chave
      let response = ""
      const lowerInput = input.toLowerCase()

      if (lowerInput.includes("exercício") || lowerInput.includes("exercicios")) {
        response =
          "Para o seu cliente com escoliose, recomendo exercícios de alongamento da cadeia lateral e fortalecimento do core. Alguns exercícios específicos seriam: 1) Mermaid sentado no reformer, 2) Side kicks na cadeira, e 3) Spine twist no mat. Esses exercícios ajudam a equilibrar os músculos ao redor da coluna."
      } else if (lowerInput.includes("joelho") || lowerInput.includes("lesão")) {
        response =
          "Para recuperação de lesão no joelho, sugiro começar com exercícios de baixo impacto como footwork no reformer com mola leve, progredindo gradualmente para exercícios como leg press e knee stretches. É importante manter o alinhamento correto do joelho com o pé e evitar sobrecarga."
      } else if (lowerInput.includes("idoso") || lowerInput.includes("terceira idade")) {
        response =
          "Para clientes idosos, recomendo focar em exercícios de equilíbrio, mobilidade articular e fortalecimento suave. O trabalho no Cadillac é excelente por oferecer maior suporte. Exercícios como arm springs sentado e leg springs com baixa resistência são ótimos para iniciar."
      } else if (lowerInput.includes("gestante") || lowerInput.includes("grávida")) {
        response =
          "Para gestantes, adapte os exercícios conforme o trimestre. Evite posições pronadas após o primeiro trimestre, foque em exercícios que fortaleçam o assoalho pélvico e trabalhe a postura para compensar as mudanças no centro de gravidade. O trabalho na bola e exercícios sentados no reformer são excelentes opções."
      } else {
        response =
          "Entendi sua pergunta. Com base no histórico do cliente, posso sugerir uma sequência personalizada de exercícios que atendam às necessidades específicas. Gostaria que eu detalhasse algum aspecto específico do programa de Pilates para este caso?"
      }

      const assistantMessage: Message = {
        id: Date.now().toString(),
        content: response,
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
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

  return (
    <div className="flex flex-col h-full">
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
    </div>
  )
}
