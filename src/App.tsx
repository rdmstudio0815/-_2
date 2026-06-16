import React, { useState, useEffect } from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/views/HomeView';
import { AboutView } from './components/views/AboutView';
import { WorksView } from './components/views/WorksView';
import { CaseStudyView } from './components/views/CaseStudyView';
import { ContactView } from './components/views/ContactView';
import { AdminPanel } from './components/AdminPanel';
import { ProjectDetailModal } from './components/Modal';
import { Project } from './types';

function MainAppShell() {
  const [currentTab, setCurrentTab] = useState<'home' | 'about' | 'works' | 'process' | 'case-study' | 'contact'>('home');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'visual' | 'sns' | 'video'>('all');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Intercept tab changes to redirect 'contact' or 'process' to Home with scroll or handle 'admin' panel toggle
  const handleTabChange = (tab: 'home' | 'about' | 'works' | 'process' | 'case-study' | 'contact' | 'admin') => {
    if (tab === 'admin') {
      setIsAdminOpen(prev => !prev);
    } else if (tab === 'contact') {
      setCurrentTab('home');
      setTimeout(() => {
        const element = document.getElementById('home-contact-section');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else if (tab === 'process') {
      setCurrentTab('home');
      setTimeout(() => {
        const element = document.getElementById('home-process-section');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      setCurrentTab(tab);
    }
  };

  // Auto-scroll to top when tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  }, [currentTab]);

  const viewProjectDetails = (project: Project) => {
    setActiveProject(project);
  };

  const handleCtaInquirySubmit = () => {
    handleTabChange('contact');
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/20 text-primary-900 font-sans antialiased">
      
      {/* 1. Header Bar */}
      <Header currentTab={currentTab} onChangeTab={handleTabChange} isAdminOpen={isAdminOpen} />

      {/* 2. Scrollable Body Views */}
      <main className="flex-grow">
        {currentTab === 'home' && (
          <HomeView 
            onChangeTab={handleTabChange} 
            setSelectedCategory={setSelectedCategory} 
            onViewProject={viewProjectDetails} 
          />
        )}
        
        {currentTab === 'about' && (
          <AboutView onChangeTab={handleTabChange} />
        )}
        
        {currentTab === 'works' && (
          <WorksView 
            onViewProject={viewProjectDetails} 
            selectedCategory={selectedCategory} 
            setSelectedCategory={setSelectedCategory}
            onChangeTab={handleTabChange}
          />
        )}
        
        {currentTab === 'case-study' && (
          <CaseStudyView 
            onViewProject={viewProjectDetails} 
            onChangeTab={handleTabChange} 
          />
        )}
      </main>

      {/* Admin Panel Drawer Slide-over */}
      <AdminPanel isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />

      {/* 3. Global Project Case-Study Slideover / Details Modal */}
      <ProjectDetailModal 
        isOpen={activeProject !== null} 
        project={activeProject} 
        onClose={() => setActiveProject(null)} 
        onCtaClick={handleCtaInquirySubmit}
      />

      {/* 4. Footer Bar */}
      <Footer onChangeTab={handleTabChange} />

    </div>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <MainAppShell />
    </PortfolioProvider>
  );
}
