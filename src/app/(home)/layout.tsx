import Header from "@/components/layout/Header"
import React from "react"


const FrontLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <main>
        <Header/>
        {children}
    </main>
  )
}

export default FrontLayout