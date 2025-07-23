"use client";

import { useEffect, useState } from 'react';
import { Video, AlertTriangle, UserCheck, ShieldQuestion, TrafficCone, Clock, Calendar } from 'lucide-react';

export interface Incident {
  id: string;
  type: string;
  tsStart: string;
  tsEnd: string;
  thumbnailUrl: string;
  resolved: boolean;
  camera: {
    id: string;
    name: string;
    location: string;
  };
}

const getTypeColor = (type: string) => {
  const colors = {
    'Unauthorized Access': 'bg-orange-500',
    'Gun Threat': 'bg-red-600',
    'Face Recognised': 'bg-blue-500',
    'Multiple Events': 'bg-purple-500',
    'Traffic Congestion': 'bg-teal-500',
    'Road Rating': 'bg-amber-500',
    'Quantitized Access': 'bg-indigo-500',
    'Compositional Access': 'bg-pink-500'
  };
  return colors[type] || 'bg-gray-500';
};

const getTypeIcon = (type: string) => {
  const size = 14;
  const icons = {
    'Unauthorized Access': <AlertTriangle size={size} />,
    'Gun Threat': <ShieldQuestion size={size} />,
    'Face Recognised': <UserCheck size={size} />,
    'Traffic Congestion': <TrafficCone size={size} />,
    'Road Rating': <TrafficCone size={size} />,
    'Quantitized Access': <ShieldQuestion size={size} />,
    'Compositional Access': <AlertTriangle size={size} />
  };
  return icons[type] || <Video size={size} />;
};

export default function IncidentTimeline() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [currentTime] = useState('03:12:37');
  const [currentDate] = useState('05-Jun-2025');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  useEffect(() => {
    // Mock data - replace with your API call
    const mockIncidents: Incident[] = [
      {
        id: '1',
        type: 'Unauthorized Access',
        tsStart: '2025-06-05T09:30:00',
        tsEnd: '2025-06-05T09:45:00',
        thumbnailUrl: '',
        resolved: false,
        camera: { id: '1', name: 'Camera-01', location: 'Main Entrance' }
      },
      {
        id: '2',
        type: 'Road Rating',
        tsStart: '2025-06-05T11:15:00',
        tsEnd: '2025-06-05T11:30:00',
        thumbnailUrl: '',
        resolved: false,
        camera: { id: '2', name: 'Camera-02', location: 'Parking Lot' }
      },
      {
        id: '3',
        type: 'Compositional Access',
        tsStart: '2025-06-05T14:20:00',
        tsEnd: '2025-06-05T14:35:00',
        thumbnailUrl: '',
        resolved: false,
        camera: { id: '3', name: 'Camera-03', location: 'Back Entrance' }
      }
    ];
    setIncidents(mockIncidents);
  }, []);

  const incidentsByCamera = incidents.reduce((acc, incident) => {
    const cameraName = incident.camera.name;
    if (!acc[cameraName]) acc[cameraName] = [];
    acc[cameraName].push(incident);
    return acc;
  }, {} as Record<string, Incident[]>);

  const cameraNames = Object.keys(incidentsByCamera).sort();
  const incidentTypes = [...new Set(incidents.map(i => i.type))];
  const scrubberPosition = ((3 * 60 + 12) / (16 * 60)) * 100;

  return (
    <div className="bg-gray-900 p-4 rounded-xl text-white border border-gray-700 shadow-lg">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Video size={20} className="text-blue-400" />
            Incident Timeline
          </h2>
          
          {/* Time Display */}
          <div className="flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-lg">
            <Clock size={16} className="text-blue-400" />
            <span className="font-mono">{currentTime}</span>
            <Calendar size={16} className="text-blue-400 ml-2" />
            <span className="font-mono">{currentDate}</span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => setActiveFilter(null)}
            className={`px-3 py-1 rounded-full text-sm ${!activeFilter ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
          >
            All Events
          </button>
          {incidentTypes.map(type => (
            <button
              key={type}
              onClick={() => setActiveFilter(type)}
              className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${activeFilter === type ? getTypeColor(type) : 'bg-gray-700 hover:bg-gray-600'}`}
            >
              {getTypeIcon(type)}
              {type.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Grid */}
      <div className="overflow-x-auto pb-4">
        <div className="min-w-[800px]">
          {/* Time Ruler */}
          <div className="flex items-center h-12 sticky left-0 z-20 bg-gray-900 border-b border-gray-700">
            <div className="w-40 flex-shrink-0 pl-3 font-semibold text-gray-400">CAMERAS</div>
            <div className="flex-1 grid grid-cols-16 text-xs text-gray-400">
              {Array.from({ length: 16 }, (_, i) => (
                <div 
                  key={i} 
                  className="text-center border-l border-gray-700 py-2 flex items-center justify-center"
                >
                  {String(i + 8).padStart(2, '0')}:00
                </div>
              ))}
            </div>
          </div>

          {/* Camera Rows */}
          <div className="relative">
            {cameraNames.map((cameraName) => (
              <div 
                key={cameraName} 
                className="flex items-center h-14 border-b border-gray-800 hover:bg-gray-850 transition-colors"
              >
                <div className="w-40 flex-shrink-0 px-3 flex items-center gap-3 sticky left-0 bg-gray-900 z-10">
                  <div className="w-6 h-6 rounded-full bg-blue-900 flex items-center justify-center">
                    <Video size={14} className="text-blue-400" />
                  </div>
                  <div>
                    <div className="font-medium">{cameraName}</div>
                    <div className="text-xs text-gray-400 truncate">
                      {incidentsByCamera[cameraName][0].camera.location}
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 h-full grid grid-cols-16 relative">
                  {Array.from({ length: 16 }, (_, i) => (
                    <div 
                      key={i} 
                      className="border-l border-gray-800 h-full"
                    ></div>
                  ))}
                  
                  {/* Incident Markers */}
                  <div className="absolute inset-0">
                    {incidentsByCamera[cameraName]
                      .filter(incident => !activeFilter || incident.type === activeFilter)
                      .map(incident => {
                        const incidentDate = new Date(incident.tsStart);
                        const hours = incidentDate.getHours();
                        const minutes = incidentDate.getMinutes();
                        const startPercent = ((hours - 8) * 60 + minutes) / (16 * 60) * 100;
                        const durationMinutes = (new Date(incident.tsEnd).getMinutes() - minutes);
                        const widthPercent = Math.max(5, (durationMinutes / 60) * 100);

                        return (
                          <div
                            key={incident.id}
                            className={`absolute top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-md text-xs flex items-center gap-2 ${getTypeColor(incident.type)}`}
                            style={{ 
                              left: `${startPercent}%`,
                              width: `${widthPercent}%`,
                              minWidth: '80px'
                            }}
                            title={`${incident.type}\n${incidentDate.toLocaleTimeString()} - ${new Date(incident.tsEnd).toLocaleTimeString()}`}
                          >
                            {getTypeIcon(incident.type)}
                            <span className="truncate font-medium">{incident.type}</span>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            ))}

            {/* Scrubber Line */}
            <div 
              className="absolute top-0 bottom-0 w-0.5 bg-yellow-400 z-30 pointer-events-none"
              style={{ 
                left: `calc(10rem + ${scrubberPosition}%)`,
              }}
            >
              <div className="absolute -top-6 -left-1 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-md">
                <Clock size={12} />
                {currentTime}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-gray-800">
        <h3 className="text-sm font-semibold text-gray-400 mb-2">LEGEND</h3>
        <div className="flex flex-wrap gap-3">
          {incidentTypes.map(type => (
            <div key={type} className="flex items-center gap-2 text-sm">
              <div className={`w-4 h-4 rounded-sm ${getTypeColor(type)}`}></div>
              {type}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}