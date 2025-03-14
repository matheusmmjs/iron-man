"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Mic, MicOff, Loader2 } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

interface Message {
  id: number
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const newMessage: Message = { id: Date.now(), role: "user", content: input, timestamp: new Date() }
    setMessages(prev => [...prev, newMessage])
    setInput("")
    setIsLoading(true)

    // Simula resposta da IA (substitua pela sua lógica de API)
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now(),
        role: "assistant",
        content: "Esta é uma resposta simulada do assistente.",
        timestamp: new Date()
      }])
      setIsLoading(false)
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 1000)
  }

  const toggleRecording = () => {
    setIsRecording(prev => !prev)
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="border-b px-4 py-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <h2 className="text-lg font-semibold">Assistente de Pilates</h2>
        <p className="text-sm text-muted-foreground">
          Converse sobre exercícios, planejamento de aulas e mais
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`flex items-start gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}>
              <Avatar className="h-8 w-8 shrink-0">
                {message.role === "assistant" ? (
                  <>
                    <AvatarImage src="/ai-assistant.png" alt="Assistente" />
                    <AvatarFallback>AI</AvatarFallback>
                  </>
                ) : (
                  <>
                    <AvatarImage src="/instructor.png" alt="Instrutor" />
                    <AvatarFallback>IN</AvatarFallback>
                  </>
                )}
              </Avatar>
              <div
                className={`rounded-lg p-4 ${
                  message.role === "user" 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted/50 border"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
                <time className="text-[10px] opacity-70 mt-2 block">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </time>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSendMessage()
          }}
          className="flex items-center gap-2 max-w-3xl mx-auto"
        >
          <Button
            type="button"
            size="icon"
            variant="ghost"
            onClick={toggleRecording}
            className={isRecording ? "text-destructive" : ""}
          >
            {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </Button>
          
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="min-h-[2.5rem] max-h-[10rem] resize-none flex-1"
            onKeyDown={e => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSendMessage()
              }
            }}
            disabled={isLoading}
          />
          
          <Button 
            type="submit" 
            size="icon" 
            disabled={!input.trim() || isLoading}
            className="shrink-0"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}