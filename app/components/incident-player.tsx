import { useState, useRef } from "react";

export default function IncidentPlayer() {
  const [activeCamera, setActiveCamera] = useState(1);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const cameras = [
    { id: 1, name: "Camera - 01", videoUrl: "/normal-feed.mp4", thumbnail: "/thumb5.png" },
    { id: 2, name: "Camera - 02", videoUrl: "/face-recognised.mp4", thumbnail: "/camera2.jpg" },
    { id: 3, name: "Camera - 03", videoUrl: "/unauthorized-access.mp4", thumbnail: "/camera3.jpg" },
  ];

  const handleCameraClick = (cameraId: number) => {
    if (cameraId === activeCamera) return;
    setActiveCamera(cameraId);
    
    // Play the newly selected video
    const newVideo = videoRefs.current[cameraId - 1];
    if (newVideo) {
      newVideo.currentTime = 0;
      newVideo.play().catch(e => console.log("Autoplay prevented", e));
    }
  };

  const mainCamera = cameras.find(cam => cam.id === activeCamera);
  const thumbnailCameras = cameras.filter(cam => cam.id !== activeCamera);

  return (
    <div className="flex-1 flex flex-col bg-brand-surface rounded-lg p-1 relative overflow-hidden shadow-lg">
      {/* Main video player */}
      <div className="relative aspect-video bg-black rounded-md overflow-hidden group transition-all duration-300">
        {cameras.map(camera => (
          <video
            key={camera.id}
            ref={el => videoRefs.current[camera.id - 1] = el}
            src={camera.videoUrl}
            autoPlay={camera.id === activeCamera}
            loop
            muted
            className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-500 ${
              camera.id === activeCamera ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          />
        ))}

        {/* Overlay information */}
        <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/70 to-transparent z-20">
          <div className="bg-black/70 text-white px-3 py-1 rounded-md text-sm font-mono inline-block">
            11/7/2025 - 03:12:37
          </div>
        </div>

        {/* Camera status */}
        <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2 backdrop-blur-sm z-20">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          {mainCamera?.name}
        </div>
      </div>

      {/* Camera thumbnails row */}
      <div className="flex h-20 mt-2 gap-2">
        {thumbnailCameras.map(camera => (
          <div
            key={camera.id}
            onClick={() => handleCameraClick(camera.id)}
            className="flex-1 bg-black rounded-md relative overflow-hidden cursor-pointer transition-all duration-300 hover:opacity-100 opacity-90"
          >
            <img
              src={camera.thumbnail}
              className="object-cover w-full h-full"
            />
            <span className="absolute bottom-1 left-2 text-xs text-white bg-black/70 px-2 py-0.5 rounded backdrop-blur-sm">
              {camera.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}