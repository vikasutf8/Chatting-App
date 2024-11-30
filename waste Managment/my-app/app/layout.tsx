'use client'


import { useState ,useEffect } from "react"

import {Inter} from 'next/font/google'

import  './globals.css'

import {Toaster} from 'react-hot-toast'

const inter =Inter({subsets :['latin']})

export default function RootLayout({
  children
}:{
  children:React.ReactNode
}) {
  
const [sidebarOpen, setSidebarOpen] = useState(false)
const [totalEearnings, setTotalEarnings] = useState(0)


  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          html {
            font-family: 'Inter', sans-serif;
          }
          body {
            margin: 0;
            padding: 0;
          }
        `}</style>
      </head>
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50 flex-col flex">
          {/* header */}
          <div className="flex flex-1">
            {/* sidebar */}
              
          </div>
        </div>
      </body>
    </html>
  )   
}
