"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type Client = {
  cpf: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  birthDate: string;
  isActive?: boolean;
}

export const columns: ColumnDef<Client>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Selecionar tudo"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Selecione a linha"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "cpf",
    header: "CPF",
    cell: ({ row }) => {
      const cpf = row.getValue("cpf") as string
 
      return <div>{cpf}</div>
    }
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const email = row.getValue("email") as string
 
      return <div className="lowercase">{email}</div>
    }
  },
  {
    accessorKey: "phone",
    header: "Telefone",
    cell: ({ row }) => {
      const phone = row.getValue("phone") as string
 
      return <div>{phone}</div>
    }
  },
  {
    accessorKey: "address",
    header: "Endereço",
    cell: ({ row }) => {
      const address = row.getValue("address") as string
 
      return <div>{address}</div>
    }
  },
  {
    accessorKey: "birthDate",
    header: "Data de Nascimento",
    cell: ({ row }) => {
      const birthDate = row.getValue("birthDate") as string
 
      const formatted = new Intl.DateTimeFormat("pt-BR").format(
        new Date(birthDate)
      )
 
      return <div>{formatted}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const client = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(client.cpf)}
            >
              Copiar CPF
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Ver detalhes do cliente</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
