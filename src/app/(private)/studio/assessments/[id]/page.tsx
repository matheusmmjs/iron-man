"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Pencil, FileText, Download, Upload, Image, Trash2 } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Dados de exemplo
const assessments = {
  "1": {
    id: "1",
    date: "10/03/2025",
    type: "INITIAL",
    posturalAnalysis:
      "Cliente apresenta escoliose leve na região torácica. Ombro direito mais elevado que o esquerdo. Anteriorização da cabeça.",
    painAreas: "Dor lombar ocasional, principalmente após longos períodos sentada.",
    movementRestrictions:
      "Limitação na rotação do tronco para o lado esquerdo. Flexibilidade reduzida nos isquiotibiais.",
    strengthTests: "Fraqueza nos músculos abdominais profundos e glúteos.",
    flexibilityTests: "Teste de sentar e alcançar: 5cm abaixo da linha dos pés. Rotação de tronco limitada à esquerda.",
    recommendations:
      "Iniciar com exercícios de fortalecimento do core e alongamento da cadeia posterior. Foco em correção postural.",
    goals: "Melhorar postura, reduzir dor lombar, aumentar flexibilidade da cadeia posterior.",
    clientId: "1",
    clientName: "Ana Silva",
    professional: "Dra. Juliana Mendes",
    attachments: [
      {
        id: "1",
        name: "postura-frontal.jpg",
        type: "image/jpeg",
        size: "1.2 MB",
        url: "/placeholder.svg?height=200&width=150",
      },
      {
        id: "2",
        name: "postura-lateral.jpg",
        type: "image/jpeg",
        size: "1.1 MB",
        url: "/placeholder.svg?height=200&width=150",
      },
      { id: "3", name: "exame-coluna.pdf", type: "application/pdf", size: "2.5 MB", url: "#" },
    ],
  },
  "2": {
    id: "2",
    date: "15/02/2025",
    type: "FOLLOW_UP",
    posturalAnalysis: "Melhora no alinhamento dos ombros. Joelho direito ainda apresenta ligeira rotação medial.",
    painAreas: "Dor no joelho direito ao realizar agachamentos profundos.",
    movementRestrictions:
      "Amplitude de movimento do joelho direito melhorou, mas ainda apresenta limitação nos últimos graus de flexão.",
    strengthTests: "Melhora na força do quadríceps. Ainda apresenta desequilíbrio entre lado direito e esquerdo.",
    flexibilityTests: "Melhora na flexibilidade dos isquiotibiais.",
    recommendations: "Continuar com exercícios de fortalecimento do quadríceps e trabalhar propriocepção do joelho.",
    goals: "Recuperação completa da função do joelho, retorno às atividades esportivas.",
    clientId: "2",
    clientName: "Carlos Oliveira",
    professional: "Dr. Ricardo Santos",
    attachments: [
      {
        id: "1",
        name: "joelho-anterior.jpg",
        type: "image/jpeg",
        size: "1.3 MB",
        url: "/placeholder.svg?height=200&width=150",
      },
      {
        id: "2",
        name: "joelho-posterior.jpg",
        type: "image/jpeg",
        size: "1.2 MB",
        url: "/placeholder.svg?height=200&width=150",
      },
    ],
  },
  "3": {
    id: "3",
    date: "05/01/2025",
    type: "REASSESSMENT",
    posturalAnalysis: "Melhora significativa na postura global. Alinhamento dos ombros mais simétrico.",
    painAreas: "Sem queixas de dor.",
    movementRestrictions: "Sem restrições significativas de movimento.",
    strengthTests: "Força muscular adequada em todos os grupos testados.",
    flexibilityTests: "Flexibilidade dentro dos padrões esperados para a idade.",
    recommendations: "Manter programa de exercícios atual com foco em condicionamento geral.",
    goals: "Manutenção da condição física atual, prevenção de lesões.",
    clientId: "3",
    clientName: "Mariana Santos",
    professional: "Dra. Juliana Mendes",
    attachments: [],
  },
}

export default function AssessmentPage({ params }: { params: { id: string } }) {
  const assessment = assessments[params.id]
  const [activeTab, setActiveTab] = useState("details")
  const [uploadingFiles, setUploadingFiles] = useState(false)
  const [generatingPdf, setGeneratingPdf] = useState(false)

  if (!assessment) {
    return (
      <Card className="p-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Avaliação não encontrada</h2>
          <p className="text-muted-foreground mb-4">A avaliação solicitada não existe ou foi removida.</p>
          <Link href="/studio/assessments">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para lista de avaliações
            </Button>
          </Link>
        </div>
      </Card>
    )
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "INITIAL":
        return <Badge className="bg-blue-500">Avaliação Inicial</Badge>
      case "FOLLOW_UP":
        return (
          <Badge variant="outline" className="bg-green-500 text-primary-foreground">
            Acompanhamento
          </Badge>
        )
      case "REASSESSMENT":
        return <Badge variant="secondary">Reavaliação</Badge>
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadingFiles(true)

      // Simulando upload
      setTimeout(() => {
        setUploadingFiles(false)
        // Aqui seria implementada a lógica para fazer upload dos arquivos
        alert("Arquivos enviados com sucesso!")
      }, 1500)
    }
  }

  const handleGeneratePdf = () => {
    setGeneratingPdf(true)

    // Simulando geração de PDF
    setTimeout(() => {
      setGeneratingPdf(false)
      // Aqui seria implementada a lógica para gerar o PDF
      alert("PDF gerado com sucesso!")
    }, 2000)
  }

  const handleSendToClient = () => {
    // Aqui seria implementada a lógica para enviar o PDF para o cliente via WhatsApp
    alert("Relatório enviado para o cliente via WhatsApp!")
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Link href="/studio/assessments">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
        </Link>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleGeneratePdf} disabled={generatingPdf}>
            {generatingPdf ? (
              <>Gerando...</>
            ) : (
              <>
                <FileText className="mr-2 h-4 w-4" />
                Gerar PDF
              </>
            )}
          </Button>
          <Link href={`/studio/assessments/${params.id}/edit`}>
            <Button size="sm">
              <Pencil className="mr-2 h-4 w-4" />
              Editar
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <CardTitle className="text-2xl">{assessment.clientName}</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                {getTypeBadge(assessment.type)}
                <span className="text-sm text-muted-foreground">
                  {assessment.date} • {assessment.professional}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Link href={`/studio/clients/${assessment.clientId}`}>
                <Button variant="outline" size="sm">
                  Ver Perfil do Cliente
                </Button>
              </Link>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="details">Detalhes</TabsTrigger>
              <TabsTrigger value="attachments">Anexos</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Análise Postural</h3>
                  <p className="text-sm">{assessment.posturalAnalysis}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Áreas de Dor</h3>
                  <p className="text-sm">{assessment.painAreas}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Restrições de Movimento</h3>
                  <p className="text-sm">{assessment.movementRestrictions}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Testes de Força</h3>
                  <p className="text-sm">{assessment.strengthTests}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Testes de Flexibilidade</h3>
                  <p className="text-sm">{assessment.flexibilityTests}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Objetivos</h3>
                  <p className="text-sm">{assessment.goals}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Recomendações</h3>
                <p className="text-sm">{assessment.recommendations}</p>
              </div>
            </TabsContent>

            <TabsContent value="attachments" className="space-y-6 mt-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Arquivos Anexados</h3>
                <div className="flex gap-2">
                  <Label htmlFor="file-upload" className="cursor-pointer">
                    <div className="flex items-center gap-1">
                      <Button variant="outline" size="sm" disabled={uploadingFiles} onClick={(e) => e.preventDefault()}>
                        {uploadingFiles ? (
                          <>Enviando...</>
                        ) : (
                          <>
                            <Upload className="mr-2 h-4 w-4" />
                            Adicionar Arquivos
                          </>
                        )}
                      </Button>
                    </div>
                    <Input id="file-upload" type="file" multiple className="hidden" onChange={handleFileUpload} />
                  </Label>
                </div>
              </div>

              {assessment.attachments.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {assessment.attachments.map((attachment) => (
                    <Card key={attachment.id} className="overflow-hidden">
                      <div className="relative">
                        {attachment.type.startsWith("image/") ? (
                          <div className="aspect-[4/3] bg-muted flex items-center justify-center">
                            <img
                              src={attachment.url || "/placeholder.svg"}
                              alt={attachment.name}
                              className="object-cover w-full h-full"
                            />
                          </div>
                        ) : (
                          <div className="aspect-[4/3] bg-muted flex items-center justify-center">
                            <FileText className="h-16 w-16 text-muted-foreground" />
                          </div>
                        )}
                        <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-6 w-6">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <CardContent className="p-3">
                        <div className="text-sm font-medium truncate">{attachment.name}</div>
                        <div className="text-xs text-muted-foreground mt-1">{attachment.size}</div>
                        <Button variant="ghost" size="sm" className="w-full mt-2 h-8">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border rounded-md">
                  <Image className="h-12 w-12 mx-auto text-muted-foreground" />
                  <h3 className="mt-4 text-sm font-semibold">Nenhum arquivo anexado</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Adicione fotos ou documentos relacionados à avaliação
                  </p>
                  <Label htmlFor="file-upload-empty" className="cursor-pointer">
                    <Button variant="outline" className="mt-4" onClick={(e) => e.preventDefault()}>
                      <Upload className="mr-2 h-4 w-4" />
                      Adicionar Arquivos
                    </Button>
                    <Input id="file-upload-empty" type="file" multiple className="hidden" onChange={handleFileUpload} />
                  </Label>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Compartilhar Avaliação</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <Button onClick={handleSendToClient} className="flex-1">
              <Download className="mr-2 h-4 w-4" />
              Enviar para Cliente via WhatsApp
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
