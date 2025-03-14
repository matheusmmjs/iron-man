import { AIAssistant } from "@/components/ai/ai-assistant"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AIAssistantPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 md:pt-12">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Assistente IA</h2>
      </div>

      <Card className="h-[calc(100vh-12rem)]">
        <CardHeader>
          <CardTitle>Assistente de Pilates</CardTitle>
          <CardDescription>
            Converse com o assistente para obter ajuda na montagem de aulas, exercícios recomendados e mais.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0 h-[calc(100%-5rem)]">
          <AIAssistant />
        </CardContent>
      </Card>
    </div>
  )
}
