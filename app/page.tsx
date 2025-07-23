"use client" 

import { useState } from "react"
import Navbar from "@/app/components/navbar"
import IncidentPlayer from "@/app/components/incident-player"
import IncidentList from "@/app/components/incident-list"
import IncidentTimeline from "@/app/components/incident-timeline" 

export default function Home() {

  return (
    <div className="flex flex-col h-screen bg-brand-bg">
      <Navbar />
      <main className="flex-1 flex flex-col gap-4 p-4 overflow-y-auto ">
        <div className="flex flex-col lg:flex-row gap-4">
          <IncidentPlayer  />

          <IncidentList />
        </div>
        
        <IncidentTimeline />

      </main>
    </div>
  )
}