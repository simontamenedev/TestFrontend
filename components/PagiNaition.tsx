"use client"

import { useState } from "react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const [jumpPage, setJumpPage] = useState("")
  const [isJumpFocused, setIsJumpFocused] = useState(false)

  const handleJump = (e: React.FormEvent) => {
    e.preventDefault()
    const pageNum = parseInt(jumpPage)
    if (pageNum >= 1 && pageNum <= totalPages) {
      onPageChange(pageNum)
      setJumpPage("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleJump(e)
    }
  }

  if (totalPages <= 1) return null

  const renderPageNumbers = () => {
    const pages = []
    
    // Always show page 1
    pages.push(
      <button
        key={1}
        onClick={() => onPageChange(1)}
        className={`px-3 py-1 rounded-full transition-all ${
          1 === currentPage
            ? "bg-blue-600 text-white"
            : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        }`}
      >
        1
      </button>
    )

    // Determine what pages to show
    let pagesToShow: number[] = []
    
    if (totalPages <= 5) {
      // Show all pages for small total
      for (let i = 2; i <= totalPages; i++) {
        if (i > 1 && i < totalPages) {
          pagesToShow.push(i)
        }
      }
    } else {
      if (currentPage <= 3) {
        // When near the beginning: show 2, 3, 4
        pagesToShow = [2, 3, 4].filter(p => p < totalPages)
      } else if (currentPage >= totalPages - 2) {
        // When near the end: show total-3, total-2, total-1
        pagesToShow = [totalPages - 3, totalPages - 2, totalPages - 1].filter(p => p > 1)
      } else {
        // When in the middle: show current-1, current, current+1
        pagesToShow = [currentPage - 1, currentPage, currentPage + 1]
      }
    }

    // Add ellipsis after page 1 if needed
    if (currentPage > 4 && totalPages > 5) {
      pages.push(
        <span key="ellipsis1" className="px-1 text-gray-500">
          ...
        </span>
      )
    }

    // Show the calculated pages
    pagesToShow.forEach(page => {
      if (page > 1 && page < totalPages) {
        pages.push(
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded-full transition-all ${
              page === currentPage
                ? "bg-blue-600 text-white"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            {page}
          </button>
        )
      }
    })

    // Add ellipsis before last page if needed
    if (currentPage < totalPages - 3 && totalPages > 5) {
      pages.push(
        <span key="ellipsis2" className="px-1 text-gray-500">
          ...
        </span>
      )
    }

    // Always show last page if it's not page 1
    if (totalPages > 1) {
      pages.push(
        <button
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          className={`px-3 py-1 rounded-full transition-all ${
            totalPages === currentPage
              ? "bg-blue-600 text-white"
              : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
        >
          {totalPages}
        </button>
      )
    }

    return pages
  }

  return (
    <div className="flex items-center justify-center gap-2 p-4">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={`flex items-center justify-center w-9 h-9 rounded-md border ${
          currentPage === 1
            ? "border-gray-200 text-gray-400 cursor-not-allowed"
            : "border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {renderPageNumbers()}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={`flex items-center justify-center w-9 h-9 rounded-md border ${
          currentPage === totalPages
            ? "border-gray-200 text-gray-400 cursor-not-allowed"
            : "border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Jump to page input - optional, you can keep or remove this */}
      {totalPages > 10 && (
        <div className="flex items-center ml-4">
          <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">Go to:</span>
          <div className="relative">
            <input
              type="text"
              value={jumpPage}
              onChange={(e) => setJumpPage(e.target.value.replace(/[^0-9]/g, ''))}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsJumpFocused(true)}
              onBlur={() => setIsJumpFocused(false)}
              placeholder={`1-${totalPages}`}
              className="w-16 px-2 py-1 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {isJumpFocused && (
              <button
                onClick={handleJump}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 text-sm text-blue-600 hover:text-blue-800"
              >
                Go
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}