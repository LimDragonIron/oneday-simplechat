
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { ChatRoom } from "@/schema/chatSchema"
import { DataTableColumnHeader } from "./DataColumnHeader"
import { DataTableRowAction } from "./DataRowAction"

import { statuses, titleLabels, participants } from "@/constants"

export const columns: ColumnDef<ChatRoom>[] = [
  {
    accessorKey: "ord",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="No" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("ord")}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      const label = titleLabels.find((label) => label.value === row.original.label)

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("title")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      )

      if (!status) {
        return null
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, status, value) => {
      return value.includes(row.getValue(status))
    },
  },
  {
    accessorKey: "participant",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Participant" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("participant")}{participants.label}
          </span>
          {participants.icon && (<participants.icon className="ml-2 h-4 w-4 text-muted-foreground" />) }
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowAction row={row} />,
  },
]
