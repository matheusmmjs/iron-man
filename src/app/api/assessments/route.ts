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

export async function GET(request: Request) {
  try {
    // Em produção, filtrar por tenantId do usuário autenticado
    const { searchParams } = new URL(request.url)
    const tenantId = searchParams.get("tenantId") || "1"
    const clientId = searchParams.get("clientId")

    let filteredAssessments = assessments.filter(
      (assessment) => assessment.tenantId === tenantId && assessment.isActive,
    )

    if (clientId) {
      filteredAssessments = filteredAssessments.filter((assessment) => assessment.clientId === clientId)
    }

    return NextResponse.json(filteredAssessments)
  } catch (error) {
    console.error("Erro ao buscar avaliações:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validação básica
    if (!body.clientId || !body.userId) {
      return NextResponse.json({ error: "Cliente e profissional são obrigatórios" }, { status: 400 })
    }

    // Em produção, isso seria salvo no banco de dados
    const newAssessment = {
      id: Date.now().toString(),
      date: body.date || new Date().toISOString(),
      type: body.type || "INITIAL",
      posturalAnalysis: body.posturalAnalysis || "",
      painAreas: body.painAreas || "",
      movementRestrictions: body.movementRestrictions || "",
      strengthTests: body.strengthTests || "",
      flexibilityTests: body.flexibilityTests || "",
      recommendations: body.recommendations || "",
      goals: body.goals || "",
      clientId: body.clientId,
      userId: body.userId,
      tenantId: body.tenantId || "1",
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: body.userId,
      updatedBy: body.userId,
    }

    assessments.push(newAssessment)

    return NextResponse.json(newAssessment, { status: 201 })
  } catch (error) {
    console.error("Erro ao criar avaliação:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
