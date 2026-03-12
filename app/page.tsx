"use client"

import PageSizeSelector from "@/components/PageSize"
import { Pagination } from "@/components/PagiNaition"
import useUsersQuery from "@/hooks/useAllQuery"
import { useDebounce } from "@/hooks/useDebounce"
import { useState } from "react"

export default function Home() {
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")

  // debounce search
  const debouncedSearch = useDebounce(search, 500)

  const skip = (page - 1) * limit

  const { data, isLoading, error } = useUsersQuery("users/search",limit, skip, debouncedSearch)

  const totalPages = Math.ceil((data?.total || 0) / limit)

  if (isLoading) return <p className='p-10'>Loading...</p>
  if (error) return <p className='p-10 text-red-500'>Error loading users</p>

  return (
    <div className='p-10 max-w-6xl mx-auto'>
      <div className='mb-8'>
        <h1 className='text-2xl font-bold text-gray-800'>Users Management</h1>
        <p className='text-sm text-gray-500 mt-1'>
          Browse, search, and manage user information.
        </p>
      </div>
      {/* Search + Page Size */}
      <div className='flex justify-between items-center mb-6'>
        <input
          placeholder='Search users...'
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setPage(1)
          }}
          className='border px-3 py-2 rounded'
        />

        <PageSizeSelector
          value={limit}
          onChange={(size) => {
            setLimit(size)
            setPage(1)
          }}
        />
      </div>

      {/* Table */}
      <table className='w-full border'>
        <thead className='bg-gray-100'>
          <tr>
            <th className='p-2'>User Id</th>
            <th className='p-2'>First Name</th>
            <th className='p-2'>Last Name</th>
            <th className='p-2'>Maiden Name</th>
            <th className='p-2'>Age</th>
            <th className='p-2'>Gender</th>
            <th className='p-2'>Email</th>
            <th className='p-2'>Phone</th>
            <th className='p-2'>Username</th>
          </tr>
        </thead>

        <tbody>
          {data?.users.map((user: any) => (
            <tr key={user.id} className='border-t'>
              <td className='p-2'>{user.id}</td>
              <td className='p-2'>{user.firstName}</td>
              <td className='p-2'>{user.lastName}</td>
              <td className='p-2'>{user.maidenName}</td>
              <td className='p-2'>{user.age}</td>
              <td className='p-2'>{user.gender}</td>
              <td className='p-2'>{user.email}</td>
              <td className='p-2'>{user.phone}</td>
              <td className='p-2'>{user.username}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Footer Controls */}
      <div className='flex justify-between items-center mt-6'>
        <PageSizeSelector
          value={limit}
          onChange={(size) => {
            setLimit(size)
            setPage(1)
          }}
        />

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </div>
    </div>
  )
}
