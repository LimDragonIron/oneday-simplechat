"use client"

import { Row } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"

interface DataTableRowActionProps<TData> {
    row: Row<TData>
}

export function DataTableRowAction<TData>({
    row,
  }: DataTableRowActionProps<TData>) {
  
    return (<Button
        className="flex h-12 w-16 p-0 bg-blue-300"
      >
        <span className=" text-white">Join</span>
      </Button>)
}