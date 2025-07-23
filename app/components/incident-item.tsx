"use client"

import { useState } from "react"
import { format } from "date-fns"

interface Incident {
  id: string
  type: string
  tsStart: string
  tsEnd: string
  thumbnailUrl: string
  resolved: boolean
  camera: {
    id: string
    name: string
    location: string
  }
}

interface IncidentItemProps {
  incident: Incident
  onResolve: (id: string) => void
}

const IncidentIcon = ({ type }: { type: string }) => {
  let color = "bg-yellow-400"
  if (type === "Gun Threat") color = "bg-brand-red"
  if (type === "Unauthorised Access") color = "bg-orange-400"
  if (type === "Face Recognised") color = "bg-blue-400"

  return <div className={`w-2 h-2 rounded-full ${color}`} />
}




export default function IncidentItem({ incident, onResolve } :IncidentItemProps ) {
  const [isFading, setIsFading] = useState(false)
  const [isResolving, setIsResolving] = useState(false)

  const handleResolve = async () => {
    if (isResolving) return

    setIsResolving(true)
    setIsFading(true)

    try {
      const res = await fetch(`/api/incidents/${incident.id}/resolve`, {
        method: "PATCH",
      })

      if (!res.ok) throw new Error("Failed to resolve incident")

      // Wait for fade animation before removing from list
      setTimeout(() => {
        onResolve(incident.id)
      }, 300)
    } catch (error) {
      console.error("Error resolving incident:", error)
      setIsFading(false)
      setIsResolving(false)
    }
  }

  const time = format(new Date(incident.tsStart), "HH:mm:ss")
  const date = format(new Date(incident.tsStart), "dd-MMM-yyyy")

  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-lg hover:bg-black/20 transition-all duration-300 ${isFading ? "opacity-0 transform scale-95" : "opacity-100"
        }`}
    >
      <img
        src={incident.thumbnailUrl || "/placeholder.svg"}
        alt={incident.type}
        className="w-24 h-14 object-cover rounded-md bg-brand-outline"
      />

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <IncidentIcon type={incident.type} />
          <p className="font-semibold text-sm text-brand-text-primary truncate">{incident.type}</p>
        </div>
        <p className="text-sm text-brand-text-secondary truncate">{incident.camera.location}</p>
        <p className="text-xs text-brand-text-secondary">
          {time} on {date}
        </p>
      </div>

      <button
         onClick={(e) => {
            e.stopPropagation(); 
            handleResolve();
          }}
        disabled={isResolving}
        className="text-sm text-brand-accent hover:text-brand-accent/80 hover:underline pr-2 transition-colors disabled:opacity-50"
      >
        {isResolving ? "Resolving..." : "Resolve >"}
      </button>
    </div>
  )
}
