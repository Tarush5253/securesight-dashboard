import type React from "react"
import { Shield, Video, Layers, Bell, Users, UserCircle, Menu } from "lucide-react"
import { useState } from "react"

interface NavItemProps {
  icon: React.ReactNode
  label: string
  active?: boolean
  onClick?: () => void
}

const NavItem = ({ icon, label, active = false, onClick }: NavItemProps) => (
  <a
    href="#"
    onClick={onClick}
    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
      active
        ? "bg-brand-accent/20 text-brand-accent font-semibold"
        : "text-brand-text-secondary hover:bg-brand-surface hover:text-brand-text-primary"
    }`}
  >
    {icon}
    <span>{label}</span>
  </a>
)

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <div className="bg-brand-bg">
      <nav className="flex items-center justify-between px-4 py-3 border-b border-brand-outline md:px-6">
        <div className="flex items-center gap-4 md:gap-8">
          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-md text-brand-text-secondary hover:bg-brand-surface"
          >
            <Menu size={20} />
          </button>

          <h1 className="text-xl font-bold tracking-wider text-brand-text-primary">MANDLACX</h1>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center gap-4">
            <NavItem icon={<Shield size={18} />} label="Dashboard" active />
            <NavItem icon={<Video size={18} />} label="Cameras" />
            <NavItem icon={<Layers size={18} />} label="Scenes" />
            <NavItem icon={<Bell size={18} />} label="Incidents" />
            <NavItem icon={<Users size={18} />} label="Users" />
          </div>
        </div>

        {/* User profile - always visible */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:block text-right">
            <p className="font-semibold text-sm text-brand-text-primary">Mohammed Ajhas</p>
            <p className="text-xs text-brand-text-secondary">ajhas@mandlac.com</p>
          </div>
          <div className="w-10 h-10 bg-brand-text-secondary rounded-full border-2 border-brand-outline flex items-center justify-center">
            <UserCircle size={24} className="text-brand-text-primary" />
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-brand-bg border-b border-brand-outline px-4 py-2 absolute z-20">
          <NavItem 
            icon={<Shield size={18} />} 
            label="Dashboard" 
            active 
            onClick={toggleMobileMenu}
          />
          <NavItem 
            icon={<Video size={18} />} 
            label="Cameras" 
            onClick={toggleMobileMenu}
          />
          <NavItem 
            icon={<Layers size={18} />} 
            label="Scenes" 
            onClick={toggleMobileMenu}
          />
          <NavItem 
            icon={<Bell size={18} />} 
            label="Incidents" 
            onClick={toggleMobileMenu}
          />
          <NavItem 
            icon={<Users size={18} />} 
            label="Users" 
            onClick={toggleMobileMenu}
          />
        </div>
      )}
    </div>
  )
}