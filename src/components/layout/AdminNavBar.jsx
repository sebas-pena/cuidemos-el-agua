'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const routes = [
  {
    name: 'Nuevos Reportes',
    path: '/admin'
  },
  {
    name: 'Equipos',
    path: '/admin/teams'
  },
  {
    name: 'Reportes',
    path: '/admin/reports'
  }
]

const AdminNavBar = () => {
  const actualPath = usePathname()
  console.log(actualPath)
  return (
    <div className="grid grid-cols-3 w-full">
      {
        routes.map((route) => (
          actualPath === route.path ?
            <p
              key={route.name}
              className='h-8 flex items-center justify-center text-blue-500 font-semibold bg-neutral-100'
            >
              {
                route.name
              }
            </p>
            : (
              <Link
                key={route.name}
                href={route.path}
                className='h-8 flex items-center justify-center text-white font-semibold bg-blue-500'
              >
                {route.name}
              </Link>
            ))
        )
      }
    </div>
  )
}

export default AdminNavBar