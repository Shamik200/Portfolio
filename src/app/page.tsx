import { HeroSection } from "../../components/sections/hero";
import { AboutSection } from "../../components/sections/about";
import { ProjectsSection } from "../../components/sections/projects";
import { CompetitiveProgrammingSection } from "../../components/sections/competitive-programming";
import { ContactSection } from "../../components/sections/contact";

export default function HomePage() {
  return (
    <div className="min-h-screen relative">
      {/* Global animated background overlay */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-10 animate-pulse"></div>
        
        {/* Moving light orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-3/4 left-1/2 w-96 h-96 bg-cyan-500/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-pink-500/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <CompetitiveProgrammingSection />
        <ContactSection />
      </div>
    </div>
  );
}
