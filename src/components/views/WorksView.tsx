import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ProjectCard } from '../ProjectCard';
import { Project } from '../../types';
import { AlertCircle, Eye, SlidersHorizontal, BrainCircuit } from 'lucide-react';

interface WorksViewProps {
  onViewProject: (project: Project) => void;
  selectedCategory: 'all' | 'visual' | 'sns' | 'video';
  setSelectedCategory: (category: 'all' | 'visual' | 'sns' | 'video') => void;
  onChangeTab: (tab: 'home' | 'about' | 'works' | 'case-study' | 'contact' | 'admin') => void;
}

export const WorksView: React.FC<WorksViewProps> = ({ 
  onViewProject, 
  selectedCategory, 
  setSelectedCategory,
  onChangeTab
}) => {
  const { projects, siteText } = usePortfolio();

  // Filter projects based on the active tab
  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  const categories = [
    { id: 'all', label: '전체 성과 모음' },
    { id: 'visual', label: '시각디자인' },
    { id: 'sns', label: 'SNS 콘텐츠 디자인' },
    { id: 'video', label: '영상편집 및 기획' },
  ] as const;

  return (
    <div className="space-y-16 py-12 md:py-20 max-w-6xl mx-auto px-6 fade-in">
      
      {/* Page Header */}
      <div className="space-y-3 max-w-xl">
        <span className="text-[10px] font-sans font-extrabold text-accent tracking-widest uppercase block">
          {siteText.worksBadge || "RESULT PORTFOLIOS"}
        </span>
        <h1 className="font-sans font-extrabold text-3xl sm:text-4xl text-primary-900 tracking-tight">
          {siteText.worksTitle || "기획으로 극복한 성공 프로젝트"}
        </h1>
        <p className="text-xs text-primary-500 font-medium leading-relaxed">
          {siteText.worksDesc || "예쁩니다만으로 끝나지 않는, \"구체적 문제에서 정제된 마케팅 성과로 연결시킨\" 실증 중심의 포트폴리오 아카이브입니다."}
        </p>
      </div>

      {/* Category filter UI */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-primary-100 pb-5">
        <div className="flex flex-wrap gap-1.5">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              id={`filter-btn-${cat.id}`}
              className={`px-4.5 py-2 rounded-xl text-xs font-bold tracking-tight transition-all duration-150 ${
                selectedCategory === cat.id 
                  ? 'bg-primary-900 text-white shadow-md' 
                  : 'bg-primary-50 text-primary-600 hover:bg-primary-100/70 hover:text-primary-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-primary-450 font-sans">
          <SlidersHorizontal className="w-4 h-4 text-primary-300" />
          <span>총 {filteredProjects.length}개의 정제된 의제</span>
        </div>
      </div>

      {/* Works Portfolio Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            onViewDetails={onViewProject} 
          />
        ))}

        {filteredProjects.length === 0 && (
          <div className="col-span-full py-20 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mx-auto text-sm">
              <AlertCircle className="w-5 h-5" />
            </div>
            <p className="text-xs text-primary-400 font-bold">
              현재 분류에 부합하는 해결 성과 프로젝트가 비어 있습니다.
            </p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="text-xs text-accent font-bold underline"
            >
              전체 목록으로 목록 초기화하기
            </button>
          </div>
        )}
      </div>

      {/* Repeating CTA Conversion card */}
      <div className="bg-primary-50 rounded-3xl p-8 sm:p-12 border border-primary-100 flex flex-col md:flex-row items-center justify-between gap-8 mt-12">
        <div className="space-y-2 max-w-xl text-left">
          <div className="flex items-center gap-1 text-accent font-display text-[10px] font-bold tracking-widest uppercase">
            <BrainCircuit className="w-4 h-4 text-accent" /> {siteText.worksPromoBadge || "Custom Client Diagnostic Proposal"}
          </div>
          <h3 className="font-sans font-bold text-lg text-primary-900">
            {siteText.worksPromoTitle || "비슷한 마케팅 난제를 겪고 계신가요?"}
          </h3>
          <p className="text-xs text-primary-500 font-medium leading-relaxed">
            {siteText.worksPromoDesc || "귀사의 타깃 고객 군에 딱 맞춘 인스타그램 톤앤매너 피드 분석 보고서와 BI 초안 제안서를 정성껏 수립하여 무료 피드백해 드립니다. 선택을 고민할 시간에 먼저 의뢰해 보세요."}
          </p>
        </div>
        
        <button
          onClick={() => onChangeTab('contact')}
          id="works-btn-cta-contact"
          className="px-6 py-3.5 bg-primary-900 hover:bg-primary-800 text-white rounded-xl text-xs font-bold font-sans tracking-tight shrink-0 shadow-md cursor-pointer"
        >
          {siteText.worksPromoCta || "맞춤 디자인 상담하기"}
        </button>
      </div>

    </div>
  );
};
