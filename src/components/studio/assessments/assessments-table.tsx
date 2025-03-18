"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, MoreHorizontal, Eye, Pencil, FileText } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Assessment {
  id: string
  client: string
  clientId: string
  date: string
  type: string
  professional: string
}

interface AssessmentsTableProps {
  assessments: Assessment[]
}

export function AssessmentsTable({ assessments }: AssessmentsTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  const filteredAssessments = assessments.filter(
    (assessment) =>
      assessment.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assessment.professional.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "INITIAL":
        return <Badge className="bg-blue-500">Inicial</Badge>
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

  const handleViewClient = (clientId: string) => {
    router.push(`/studio/clients/${clientId}`)
  }

  const handleViewAssessment = (id: string) => {
    router.push(`/studio/assessments/${id}`)
  }

  const handleEditAssessment = (id: string) => {
    router.push(`/studio/assessments/${id}/edit`)
  }

  return (
    <div>
      <div className="flex items-center space-x-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar avaliação..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead className="hidden md:table-cell">Profissional</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAssessments.length > 0 ? (
              filteredAssessments.map((assessment) => (
                <TableRow key={assessment.id}>
                  <TableCell className="font-medium">{assessment.client}</TableCell>
                  <TableCell>{assessment.date}</TableCell>
                  <TableCell>{getTypeBadge(assessment.type)}</TableCell>
                  <TableCell className="hidden md:table-cell">{assessment.professional}</TableCell>
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
                        <DropdownMenuItem onClick={() => handleViewAssessment(assessment.id)}>
                          <FileText className="mr-2 h-4 w-4" />
                          Ver avaliação
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleViewClient(assessment.clientId)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Ver cliente
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditAssessment(assessment.id)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  Nenhuma avaliação encontrada.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
