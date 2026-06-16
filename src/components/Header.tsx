import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Monitor, Cpu, LogOut, ArrowRight, Layers } from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  onChangeTab: (tab: 'home' | 'about' | 'works' | 'process' | 'case-study' | 'contact' | 'admin') => void;
  isAdminOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, onChangeTab, isAdminOpen }) => {
  const { isAdmin, logoutAdmin, siteText } = usePortfolio();

  const menuItems = [
    { id: 'home', label: siteText.menuHome || 'Home' },
    { id: 'about', label: siteText.menuAbout || 'About' },
    { id: 'works', label: siteText.menuWorks || 'Works' },
    { id: 'process', label: '작업 프로세스' },
    { id: 'case-study', label: siteText.menuCaseStudy || 'Case Study' },
  ] as const;

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-primary-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo and Brand Title */}
        <button 
          onClick={() => onChangeTab('home')}
          className="flex items-center gap-2.5 text-left group transition-all"
          id="btn-logo"
        >
          <div className="w-10 h-10 rounded-lg bg-primary-900 flex items-center justify-center text-white font-display font-bold tracking-tight transition-all duration-300 group-hover:scale-105 group-hover:bg-accent">
            {siteText.menuLogo || '둥'}
          </div>
          <div>
            <span className="block font-sans font-bold text-lg text-primary-900 tracking-tight leading-none">
              {siteText.menuTitle || '둥근달스튜디오'}
            </span>
            <span className="block font-sans text-[9px] text-primary-400 font-medium tracking-widest mt-1 uppercase">
              {siteText.menuSubTitle || 'Round Moon Design Studio'}
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onChangeTab(item.id)}
              id={`nav-${item.id}`}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium tracking-tight transition-all duration-200 ${
                currentTab === item.id 
                  ? 'text-primary-900 bg-primary-50 font-semibold' 
                  : 'text-primary-500 hover:text-primary-800 hover:bg-primary-50/50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          {isAdmin && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onChangeTab('admin')}
                id="btn-admin-indicator"
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                  isAdminOpen
                    ? 'bg-accent/15 text-accent border border-accent/30 ring-2 ring-accent/20 font-bold'
                    : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                관리자모드 On
              </button>
              <button
                onClick={() => {
                  logoutAdmin();
                  onChangeTab('home');
                }}
                id="btn-admin-logout"
                title="로그아웃"
                className="p-2 rounded-lg text-primary-400 hover:text-red-500 hover:bg-red-50 transition-all"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}

          <button
            onClick={() => {
              onChangeTab('home');
              setTimeout(() => {
                const element = document.getElementById('home-contact-section');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }, 100);
            }}
            id="btn-header-cta"
            className="hidden sm:flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-primary-900 hover:bg-primary-800 text-white text-xs font-bold tracking-tight transition-all duration-200 ease-out active:scale-98 premium-shadow hover:translate-y-[-1px]"
          >
            {siteText.menuContact || '프로젝트 문의하기'}
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          
          {/* Mobile hamburger equivalent just for view switching */}
          <div className="md:hidden flex items-center gap-1">
            <select
              value={isAdminOpen ? 'admin' : currentTab}
              onChange={(e) => onChangeTab(e.target.value as any)}
              id="mobile-nav-select"
              className="px-3 py-1.5 bg-primary-50 border border-primary-200 rounded-lg text-xs font-semibold text-primary-800"
            >
              <option value="home">{siteText.menuHome || 'Home'}</option>
              <option value="about">{siteText.menuAbout || 'About'}</option>
              <option value="works">{siteText.menuWorks || 'Works'}</option>
              <option value="process">작업 프로세스</option>
              <option value="case-study">{siteText.menuCaseStudy || 'Case Study'}</option>
              {isAdmin && <option value="admin">관리자모드</option>}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};
