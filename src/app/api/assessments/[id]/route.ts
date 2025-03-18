import { NextResponse } from "next/server"

// Em produção, isso seria conectado ao Prisma
const assessments = [
  {
    id: "1",
    date: "2025-03-10T00:00:00.000Z",
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
    userId: "2", // Profissional que realizou a avaliação
    tenantId: "1",
    isActive: true,
    createdAt: "2025-03-10T00:00:00.000Z",
    updatedAt: "2025-03-10T00:00:00.000Z",
    createdBy: "2",
    updatedBy: "2",
  },
  {
    id: "2",
    date: "2025-02-15T00:00:00.000Z",
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
    userId: "3", // Profissional que realizou a avaliação
    tenantId: "1",
    isActive: true,
    createdAt: "2025-02-15T00:00:00.000Z",
    updatedAt: "2025-02-15T00:00:00.000Z",
    createdBy: "3",
    updatedBy: "3",
  },
  {
    id: "3",
    date: "2025-01-05T00:00:00.000Z",
    type: "REASSESSMENT",
    posturalAnalysis: "Melhora significativa na postura global. Alinhamento dos ombros mais simétrico.",
    painAreas: "Sem queixas de dor.",
    movementRestrictions: "Sem restrições significativas de movimento.",
    strengthTests: "Força muscular adequada em todos os grupos testados.",
    flexibilityTests: "Flexibilidade dentro dos padrões esperados para a idade.",
    recommendations: "Manter programa de exercícios atual com foco em condicionamento geral.",
    goals: "Manutenção da condição física atual, prevenção de lesões.",
    clientId: "3",
    userId: "2", // Profissional que realizou a avaliação
    tenantId: "1",
    isActive: true,
    createdAt: "2025-01-05T00:00:00.000Z",
    updatedAt: "2025-01-05T00:00:00.000Z",
    createdBy: "2",
    updatedBy: "2",
  },
]

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const assessment = assessments.find((a) => a.id === params.id && a.isActive)

    if (!assessment) {
      return NextResponse.json({ error: "Avaliação não encontrada" }, { status: 404 })
    }

    return NextResponse.json(assessment)
  } catch (error) {
    console.error("Erro ao buscar avaliação:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const assessmentIndex = assessments.findIndex((a) => a.id === params.id && a.isActive)

    if (assessmentIndex === -1) {
      return NextResponse.json({ error: "Avaliação não encontrada" }, { status: 404 })
    }

    // Validação básica
    if (!body.clientId || !body.userId) {
      return NextResponse.json({ error: "Cliente e profissional são obrigatórios" }, { status: 400 })
    }

    // Atualizar avaliação
    const updatedAssessment = {
      ...assessments[assessmentIndex],
      date: body.date || assessments[assessmentIndex].date,
      type: body.type || assessments[assessmentIndex].type,
      posturalAnalysis: body.posturalAnalysis || assessments[assessmentIndex].posturalAnalysis,
      painAreas: body.painAreas || assessments[assessmentIndex].painAreas,
      movementRestrictions: body.movementRestrictions || assessments[assessmentIndex].movementRestrictions,
      strengthTests: body.strengthTests || assessments[assessmentIndex].strengthTests,
      flexibilityTests: body.flexibilityTests || assessments[assessmentIndex].flexibilityTests,
      recommendations: body.recommendations || assessments[assessmentIndex].recommendations,
      goals: body.goals || assessments[assessmentIndex].goals,
      clientId: body.clientId,
      userId: body.userId,
      updatedAt: new Date().toISOString(),
      updatedBy: body.updatedBy || body.userId,
    }

    assessments[assessmentIndex] = updatedAssessment

    return NextResponse.json(updatedAssessment)
  } catch (error) {
    console.error("Erro ao atualizar avaliação:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const assessmentIndex = assessments.findIndex((a) => a.id === params.id && a.isActive)

    if (assessmentIndex === -1) {
      return NextResponse.json({ error: "Avaliação não encontrada" }, { status: 404 })
    }

    // Soft delete - apenas marca como inativo
    assessments[assessmentIndex] = {
      ...assessments[assessmentIndex],
      isActive: false,
      updatedAt: new Date().toISOString(),
      updatedBy: body.updatedBy || "1",
    }

    return NextResponse.json({ message: "Avaliação removida com sucesso" }, { status: 200 })
  } catch (error) {
    console.error("Erro ao remover avaliação:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
