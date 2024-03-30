import React from 'react'
import '@/assets/styles/globals.css'

export const metadata = {
    title: 'Property Pulse | Find The Perfect Rental',
    description: 'Find Yor Dream Rental Property',
    keywords: 'rental, find retals, find properties'
}

const MainLayout = ({children}) => {
  return (
    <html lang="en">
        <body>
            <div>{children}</div>
        </body>
    </html>
  )
}

export default MainLayout