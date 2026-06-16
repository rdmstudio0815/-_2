import React from 'react';
import { Mail, ShieldCheck, ArrowUpRight, ArrowRight } from 'lucide-react';

interface FooterProps {
  onChangeTab: (tab: 'home' | 'about' | 'works' | 'case-study' | 'contact' | 'admin') => void;
}

export const Footer: React.FC<FooterProps> = ({ onChangeTab }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-900 text-primary-200 border-t border-primary-800">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20 lg:py-24">
        
        {/* Main upper split */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 border-b border-primary-800 pb-12 md:pb-16 mb-12">
          
          {/* Column 1: Core message */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-white text-primary-900 flex items-center justify-center font-display font-black text-sm">
                둥
              </div>
              <span className="font-display font-extrabold text-white tracking-widest text-sm uppercase">둥근달스튜디오</span>
            </div>
            <p className="text-primary-300 font-sans text-sm font-medium leading-relaxed max-w-sm">
              보여주기식 포트폴리오를 넘어, 클라이언트의 비즈니스적 가치와 브랜드의 성과를 이끌어내도록 치밀하게 설계된 둥근달스튜디오의 제안서 플랫폼입니다.
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-white font-sans text-xs font-bold uppercase tracking-widest text-primary-100">NAVIGATE</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onChangeTab('home')} className="hover:text-white transition-colors duration-150 flex items-center gap-1 group">
                  Home <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
              <li>
                <button onClick={() => onChangeTab('about')} className="hover:text-white transition-colors duration-150 flex items-center gap-1 group">
                  About <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
              <li>
                <button onClick={() => onChangeTab('works')} className="hover:text-white transition-colors duration-150 flex items-center gap-1 group">
                  Works <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
              <li>
                <button onClick={() => onChangeTab('case-study')} className="hover:text-white transition-colors duration-150 flex items-center gap-1 group">
                  Case Study <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Scope overview */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-white font-sans text-xs font-bold uppercase tracking-widest text-primary-100">CAPABILITIES</h4>
            <div className="flex flex-wrap gap-2">
              <span className="text-[11px] px-2.5 py-1 rounded bg-primary-800 text-primary-300 font-medium">SNS 콘텐츠 제작</span>
              <span className="text-[11px] px-2.5 py-1 rounded bg-primary-800 text-primary-300 font-medium">브랜딩 제지 디자인</span>
              <span className="text-[11px] px-2.5 py-1 rounded bg-primary-800 text-primary-300 font-medium">홍보 및 기획 영상 편집</span>
            </div>
            
            <div className="pt-2 text-sm text-primary-400 space-y-1.5 font-medium">
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary-400" />
                <span>rdmstudio0815@gmail.com</span>
              </p>
            </div>
          </div>

        </div>

        {/* Lower split */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-primary-400 font-medium">
          <p>© {currentYear} 둥근달스튜디오. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => onChangeTab('admin')} 
              className="hover:text-white transition-colors flex items-center gap-1 text-[11px]"
              id="footer-admin-link"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-accent" />
              <span>admin</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
