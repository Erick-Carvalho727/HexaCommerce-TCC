import { GripVertical } from 'lucide-react'

interface RowHeaderIconProps {
  nameColumn: string
}

export default function RowHeaderIcon({ nameColumn }: RowHeaderIconProps) {
  return (
    <div className="cursor-grab active:cursor-grabbing flex items-center">
      {nameColumn}
      <GripVertical height={12} className="ml-2 h-4 w-4" />
    </div>
  )
}
