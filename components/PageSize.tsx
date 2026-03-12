"use client"

import React from "react"

type PageSizeSelectorProps = {
  value: number
  onChange: (size: number) => void
  options?: number[]
}

const PageSizeSelector: React.FC<PageSizeSelectorProps> = ({
  value,
  onChange,
  options = [5, 10, 20, 50],
}) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600">Rows per page:</span>
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="border rounded px-2 py-1 text-sm focus:outline-none dark:bg-gray-800"
      >
        {options.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
    </div>
  )
}

export default PageSizeSelector
