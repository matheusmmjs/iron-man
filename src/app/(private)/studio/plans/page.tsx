"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Edit, Trash2, MoreHorizontal } from "lucide-react"
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
import { apiClient } from "@/lib/api-client"

interface Plan {
  id: string
  name: string
  description?: string
  sessions: number
  price: number
  duration: number
  isActive: boolean
}

export default function PlansPage() {
  const [plans, setPlans] = useState<Plan[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)

  useEffect(() => {
    fetchPlans()
  }, [])

  const fetchPlans = async () => {
    setIsLoading(true)
    try {
      const data = await apiClient.get<Plan[]>("/api/plans")
      setPlans(data)
    } catch (error) {
      console.error("Erro ao buscar planos:", error)
      // Dados de exemplo para desenvolvimento
      setPlans([
        {
          id: "1",
          name: "Plano Mensal - 2x por semana",
          description: "Plano mensal com 2 sessões por semana",
          sessions: 8,
          price: 450,
          duration: 30,
          isActive: true,
        },
        {
          id: "2",
          name: "Plano Trimestral - 3x por semana",
          description: "Plano trimestral com 3 sessões por semana",
          sessions: 36,
          price: 1800,
          duration: 90,
          isActive: true,
        },
        {
          id: "3",
          name: "Plano Mensal - 1x por semana",
          description: "Plano mensal com 1 sessão por semana",
          sessions: 4,
          price: 250,
          duration: 30,
          isActive: true,
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreatePlan = () => {
    setSelectedPlan(null)
    setIsDialogOpen(true)
  }

  const handleEditPlan = (plan: Plan) => {
    setSelectedPlan(plan)
    setIsDialogOpen(true)
  }

  const handleDeletePlan = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este plano?")) return

    try {
      await apiClient.delete(`/api/plans/${id}`)
      setPlans(plans.filter((plan) => plan.id !== id))
    } catch (error) {
      console.error("Erro ao excluir plano:", error)
    }
  }

  const handleSavePlan = async (formData: FormData) => {
    const planData = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      sessions: Number(formData.get("sessions")),
      price: Number(formData.get("price")),
      duration: Number(formData.get("duration")),
    }

    try {
      if (selectedPlan) {
        // Atualizar plano existente
        const updatedPlan = await apiClient.put<Plan>(`/api/plans/${selectedPlan.id}`, planData)
        setPlans(plans.map((plan) => (plan.id === selectedPlan.id ? updatedPlan : plan)))
      } else {
        // Criar novo plano
        const newPlan = await apiClient.post<Plan>("/api/plans", planData)
        setPlans([...plans, newPlan])
      }

      setIsDialogOpen(false)
    } catch (error) {
      console.error("Erro ao salvar plano:", error)
    }
  }

  const filteredPlans = plans.filter(
    (plan) =>
      plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (plan.description && plan.description.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)
  }

  const formatDuration = (days: number) => {
    if (days % 30 === 0) {
      const months = days / 30
      return `${months} ${months === 1 ? "mês" : "meses"}`
    }
    return `${days} dias`
  }

  return (
    <Card className="mt-2">
      <CardHeader className="flex flex-row items-center justify-between flex-wrap gap-4">
        <CardTitle>Planos</CardTitle>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar plano..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button size="sm" onClick={handleCreatePlan}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Plano
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center py-8">Carregando planos...</div>
        ) : filteredPlans.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Sessões</TableHead>
                  <TableHead>Preço</TableHead>
                  <TableHead className="hidden md:table-cell">Duração</TableHead>
                  <TableHead className="hidden md:table-cell">Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPlans.map((plan) => (
                  <TableRow key={plan.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{plan.name}</div>
                        {plan.description && (
                          <div className="text-sm text-muted-foreground hidden md:block">{plan.description}</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{plan.sessions}</TableCell>
                    <TableCell>{formatCurrency(plan.price)}</TableCell>
                    <TableCell className="hidden md:table-cell">{formatDuration(plan.duration)}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {plan.isActive ? (
                        <Badge className="bg-green-500">Ativo</Badge>
                      ) : (
                        <Badge variant="secondary">Inativo</Badge>
                      )}
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
                          <DropdownMenuItem onClick={() => handleEditPlan(plan)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive" onClick={() => handleDeletePlan(plan.id)}>
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
            <h3 className="text-lg font-semibold">Nenhum plano encontrado</h3>
            <p className="mt-1 text-muted-foreground">Crie seu primeiro plano para começar a oferecer aos clientes</p>
            <Button onClick={handleCreatePlan} className="mt-4">
              <Plus className="mr-2 h-4 w-4" />
              Criar Plano
            </Button>
          </div>
        )}
      </CardContent>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedPlan ? "Editar Plano" : "Novo Plano"}</DialogTitle>
            <DialogDescription>
              {selectedPlan
                ? "Modifique as informações do plano existente"
                : "Preencha os dados para criar um novo plano"}
            </DialogDescription>
          </DialogHeader>

          <form action={handleSavePlan}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome do Plano</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Ex: Plano Mensal - 2x por semana"
                  defaultValue={selectedPlan?.name}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição (opcional)</Label>
                <Input
                  id="description"
                  name="description"
                  placeholder="Breve descrição do plano"
                  defaultValue={selectedPlan?.description}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sessions">Número de Sessões</Label>
                  <Input
                    id="sessions"
                    name="sessions"
                    type="number"
                    min="1"
                    placeholder="Ex: 8"
                    defaultValue={selectedPlan?.sessions}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Preço (R$)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="Ex: 450.00"
                    defaultValue={selectedPlan?.price}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Duração (dias)</Label>
                <Input
                  id="duration"
                  name="duration"
                  type="number"
                  min="1"
                  placeholder="Ex: 30 para um mês"
                  defaultValue={selectedPlan?.duration}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Informe a duração em dias. Ex: 30 para um mês, 90 para três meses.
                </p>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">{selectedPlan ? "Salvar Alterações" : "Criar Plano"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
