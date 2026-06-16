import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ProjectDetailModal } from '../Modal';
import { Project } from '../../types';
import { Sparkles, ArrowRight, BookOpen, AlertCircle, TrendingUp, CheckCircle, Trophy, Layers } from 'lucide-react';

interface CaseStudyViewProps {
  onViewProject: (project: Project) => void;
  onChangeTab: (tab: 'home' | 'about' | 'works' | 'case-study' | 'contact' | 'admin') => void;
}

export const CaseStudyView: React.FC<CaseStudyViewProps> = ({ onViewProject, onChangeTab }) => {
  const { projects, siteText } = usePortfolio();
  
  // Filter for deep-dive case studies
  const caseStudies = projects.filter(p => p.isCaseStudy);

  const [activeCase, setActiveCase] = useState<Project | null>(caseStudies[0] || null);

  // Sync active case study if states are modified
  React.useEffect(() => {
    if (caseStudies.length > 0 && (!activeCase || !caseStudies.some(c => c.id === activeCase.id))) {
      setActiveCase(caseStudies[0]);
    }
  }, [projects]);

  return (
    <div className="space-y-16 py-12 md:py-20 max-w-6xl mx-auto px-6 fade-in">
      
      {/* Editorial Header */}
      <div className="space-y-3 max-w-xl">
        <span className="text-[10px] font-sans font-extrabold text-accent tracking-widest uppercase block">
          {siteText.caseStudyBadge || "CURATED DEEP DIVES"}
        </span>
        <h1 className="font-sans font-extrabold text-3xl sm:text-4xl text-primary-900 tracking-tight">
          {siteText.caseStudyTitle || "심층 해결 사례 분석 (Case Study)"}
        </h1>
        <p className="text-xs text-primary-500 font-medium leading-relaxed">
          {siteText.caseStudyDesc || "단순 이미지 자랑이 아닙니다. 실제 클라이언트로부터 출발된 상이한 고충, 이를 타개하기 위한 비주얼 설계 방향, 그리고 전환으로 치환된 정밀한 성과 데이터를 기록합니다."}
        </p>
      </div>

      {caseStudies.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left panel: Quick tab switcher for curated cases */}
          <div className="lg:col-span-4 space-y-3.5">
            <span className="text-[10px] font-bold text-primary-400 uppercase tracking-wider block mb-2">
              SELECT STUDY CASE
            </span>
            {caseStudies.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveCase(item)}
                id={`btn-case-switcher-${item.id}`}
                className={`w-full text-left p-6 rounded-2xl border transition-all duration-200 block ${
                  activeCase?.id === item.id 
                    ? 'border-primary-900 bg-white shadow-md ring-1 ring-primary-900/10' 
                    : 'border-primary-100 bg-primary-50/50 hover:bg-white/80 hover:border-primary-200'
                }`}
              >
                <div className="flex items-center gap-2 mb-2 text-[10px] font-bold uppercase tracking-wider text-accent">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{item.category === 'visual' ? '시각디자인 BI' : item.category === 'sns' ? 'SNS 콘텐츠 기획' : '비디오 모이션'}</span>
                </div>
                <h4 className="font-sans font-extrabold text-sm text-primary-900 mb-1 line-clamp-1">
                  {item.client} 리브랜딩
                </h4>
                <p className="text-[11px] text-primary-405 font-medium line-clamp-2 leading-relaxed">
                  {item.title}
                </p>
              </button>
            ))}

            {/* Hint alert */}
            <div className="bg-primary-50/55 p-4 rounded-xl border border-primary-100 text-[11px] leading-relaxed font-medium text-primary-500">
              💡 <strong>관리자 팁:</strong> 로그인 후 관리자모드에서 작업을 추가할 때 "Case Study 지정" 체크박스를 체크해 주시면 실시간으로 이 리스트에 자동 편입됩니다.
            </div>
          </div>

          {/* Right panel: Active Editorial Presentation Container */}
          {activeCase && (
            <div className="lg:col-span-8 bg-white border border-primary-100 rounded-3xl overflow-hidden premium-shadow p-8 sm:p-10 space-y-8 fade-in">
              
              {/* Cover Banner */}
              <div className="relative rounded-2xl overflow-hidden aspect-[16/7] bg-primary-900">
                <img 
                  src={activeCase.imageUrl} 
                  alt={activeCase.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <span className="text-[10px] font-bold text-accent uppercase tracking-wider">PRECISE SYSTEM LAYOUT</span>
                  <h3 className="font-sans font-black text-base sm:text-lg tracking-tight leading-snug">{activeCase.title}</h3>
                </div>
              </div>

              {/* Problem vs Strategy Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs font-medium">
                
                {/* 1. About / Project Introduction */}
                <div className="space-y-3">
                  <h5 className="font-extrabold font-sans text-[13px] text-blue-600 uppercase tracking-wider border-b border-primary-100 pb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" /> 1. 프로젝트 목적 및 배경 (ABOUT)
                  </h5>
                  <p className="text-primary-650 leading-relaxed text-justify">
                    {activeCase.about}
                  </p>
                </div>

                {/* 2. Solutions / Strategy */}
                <div className="space-y-3">
                  <h5 className="font-extrabold font-sans text-[13px] text-accent uppercase tracking-wider border-b border-primary-100 pb-2 flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-accent" /> 2. 비즈니스 개입 전략 (STRATEGY)
                  </h5>
                  <p className="text-primary-650 leading-relaxed text-justify">
                    {activeCase.goal}
                  </p>
                </div>

              </div>

              {/* Design decisions (WHY) \& Process */}
              <div className="space-y-6 pt-4 border-t border-primary-100">
                
                {/* 3. DESIGN DECISIONS */}
                {activeCase.detailedStrategy && (
                  <div className="space-y-3 bg-primary-50/50 p-6 rounded-2xl border border-primary-100 text-xs">
                    <h5 className="font-extrabold font-sans text-[13px] text-primary-800 uppercase tracking-wider flex items-center gap-2">
                      <Layers className="w-4 h-4 text-primary-600" /> 3. 핵심 디자인 의사결정 (DESIGN DECISION)
                    </h5>
                    <p className="text-primary-600 leading-relaxed text-justify">
                      {activeCase.detailedStrategy}
                    </p>
                  </div>
                )}

                {/* 4. EXECUTION PROCESS */}
                <div className="bg-primary-50/35 p-6 rounded-2xl border border-primary-100 space-y-3 text-xs">
                  <h5 className="font-extrabold font-sans text-[13px] text-primary-800 uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-accent" /> 4. 세부 디자인 수행 과정 (PROCESS)
                  </h5>
                  <p className="text-primary-700 leading-relaxed text-justify">
                    {activeCase.process}
                  </p>
                </div>

              </div>

              {/* Case-specific Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-primary-50">
                <span className="text-[11px] text-primary-450 font-bold tracking-tight">수행 역할: {activeCase.role}</span>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => onViewProject(activeCase)}
                    id="btn-case-detail-modal"
                    className="px-4 py-2 bg-primary-900 hover:bg-primary-800 text-white text-xs font-bold rounded-lg transition-all"
                  >
                    이 프로젝트 세부 분석서 보기
                  </button>
                  <button
                    onClick={() => onChangeTab('contact')}
                    id="btn-case-cta"
                    className="px-4 py-2 border border-primary-200 hover:bg-primary-50 text-primary-700 text-xs font-bold rounded-lg transition-all"
                  >
                    이 방식대로 의뢰 상담하기
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>
      ) : (
        <div className="text-center py-20 bg-white border border-primary-100 rounded-3xl space-y-3">
          <p className="text-xs text-primary-400 font-medium">Curated Case Study 데이터를 빌드하는 중입니다.</p>
          <button onClick={() => onChangeTab('home')} className="text-xs text-accent font-bold">홈으로 이동</button>
        </div>
      )}

    </div>
  );
};
