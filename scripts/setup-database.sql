-- This file is for reference only
-- Prisma handles database creation automatically

-- Create cameras table
CREATE TABLE IF NOT EXISTS Camera (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    location TEXT NOT NULL
);

-- Create incidents table  
CREATE TABLE IF NOT EXISTS Incident (
    id TEXT PRIMARY KEY,
    type TEXT NOT NULL,
    tsStart DATETIME NOT NULL,
    tsEnd DATETIME NOT NULL,
    thumbnailUrl TEXT NOT NULL,
    resolved BOOLEAN NOT NULL DEFAULT 0,
    cameraId TEXT NOT NULL,
    FOREIGN KEY (cameraId) REFERENCES Camera(id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_incident_resolved ON Incident(resolved);
CREATE INDEX IF NOT EXISTS idx_incident_tsStart ON Incident(tsStart);
CREATE INDEX IF NOT EXISTS idx_incident_camera ON Incident(cameraId);
