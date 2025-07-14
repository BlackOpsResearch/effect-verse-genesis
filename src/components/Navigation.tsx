import { ElectricButton } from "./ElectricButton";
import { Search, Menu, Zap, Palette, Download, User } from "lucide-react";

export function Navigation() {
  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-electric-cyan/20">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full gradient-electric flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-electric">
              EffectLab
            </span>
          </div>

          {/* Center Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-foreground hover:text-electric-cyan transition-colors">
              Explore
            </a>
            <a href="#" className="text-foreground hover:text-electric-cyan transition-colors">
              Categories
            </a>
            <a href="#" className="text-foreground hover:text-electric-cyan transition-colors">
              Marketplace
            </a>
            <a href="#" className="text-foreground hover:text-electric-cyan transition-colors">
              Studio
            </a>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search effects..."
                className="glass px-4 py-2 pl-10 rounded-lg bg-background/50 border border-electric-cyan/30 focus:border-electric-cyan focus:outline-none transition-colors w-64"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>
            
            <ElectricButton variant="cyber" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Downloads
            </ElectricButton>
            
            <ElectricButton variant="electric" size="sm">
              <User className="w-4 h-4 mr-2" />
              Account
            </ElectricButton>

            <button className="md:hidden">
              <Menu className="w-6 h-6 text-foreground" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}