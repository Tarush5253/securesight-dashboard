"use client"

import { useEffect, useState } from "react"
import { Bell, ShieldCheck } from "lucide-react"
import IncidentItem from "./incident-item"

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



export default function IncidentList() {
  const [incidents, setIncidents] = useState<Incident[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        setLoading(true)
        const res = await fetch("/api/incidents?resolved=false")

        if (!res.ok) {
          throw new Error("Failed to fetch incidents")
        }

        const data = await res.json()
        setIncidents(data)
      } catch (err) {
        console.error("Error fetching incidents:", err)
        setError("Failed to load incidents")
      } finally {
        setLoading(false)
      }
    }

    fetchIncidents()
  }, [])

  const handleResolve = (id: string) => {
    setIncidents((prev) => prev.filter((incident) => incident.id !== id))
  }

  if (loading) {
    return (
      <div className="w-[450px] flex-shrink-0 bg-brand-surface rounded-lg p-4 flex flex-col">
        <div className="flex items-center justify-center h-64">
          <div className="text-brand-text-secondary">Loading incidents...</div>
        </div>
       
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-[450px] flex-shrink-0 bg-brand-surface rounded-lg p-4 flex flex-col">
        <div className="flex items-center justify-center h-64">
          <div className="text-brand-red">{error}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="lg:max-w-[450px] w-full flex-shrink-0 bg-brand-surface rounded-lg p-4 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 px-2">
        <h2 className="font-semibold text-lg flex items-center gap-2 text-brand-text-primary">
          <div className="relative">
            <Bell size={20} className="text-brand-red" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-brand-red rounded-full animate-pulse"></div>
          </div>
          {incidents.length} Unresolved Incidents
        </h2>
        <a
          href="#"
          className="text-sm text-brand-text-secondary hover:text-brand-text-primary flex items-center gap-1 transition-colors"
        >
          <ShieldCheck size={16} />
          <span>Resolved Incidents</span>
        </a>
      </div>

       <div className="flex-1 overflow-y-auto pr-1 space-y-2">
          {incidents.length === 0 ? (
            <div className="text-center p-8 text-brand-text-secondary">No unresolved incidents</div>
          ) : (
            // Pass the onIncidentSelect function to each item
            incidents.map((incident) => (
              <IncidentItem
                key={incident.id}
                incident={incident}
                onResolve={handleResolve}
              />
            ))
          )}
        </div>

    </div>
  )
}
