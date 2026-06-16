import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ProjectDetailModal } from '../Modal';
import { ProjectCard } from '../ProjectCard';
import { MetricCard } from '../MetricCounter';
import { ArrowRight, Compass, MousePointerClick, ShieldCheck, Moon, FileText, MessageSquare, Palette, RotateCcw, CheckCircle } from 'lucide-react';
import { ContactView } from './ContactView';
import { motion } from 'motion/react';

interface HomeViewProps {
  onChangeTab: (tab: 'home' | 'about' | 'works' | 'process' | 'case-study' | 'contact' | 'admin') => void;
  setSelectedCategory: (category: 'all' | 'visual' | 'sns' | 'video') => void;
  onViewProject: (project: any) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onChangeTab, setSelectedCategory, onViewProject }) => {
  const { projects, siteText } = usePortfolio();

  // Highlight 4 representational projects (the case studies)
  const highlightedProjects = projects.slice(0, 4);

  const handleCategoryGo = (cat: 'visual' | 'sns' | 'video') => {
    setSelectedCategory(cat);
    onChangeTab('works');
  };

  const scrollToContact = () => {
    const element = document.getElementById('home-contact-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const renderHeroTitle = () => {
    const parts = siteText.heroTitle.split('[HIGHLIGHT]');
    if (parts.length > 1) {
      return (
        <>
          {parts[0]}
          <span className="text-accent underline decoration-accent/40 underline-offset-8 font-sans font-extrabold">
            {siteText.heroTitleHighlight}
          </span>
          {parts[1]}
        </>
      );
    }
    return siteText.heroTitle;
  };

  return (
    <div className="space-y-24 py-12 md:py-20 fade-in">
      
      {/* 1. HERO SECTION (한 줄 포지셔닝 문장 - 프리미엄 블랙 배경 디자인) */}
      <div className="px-6 md:px-8">
        <section className="bg-neutral-950 text-white rounded-[2rem] p-8 sm:p-12 md:p-16 max-w-6xl mx-auto space-y-8 relative overflow-hidden shadow-2xl border border-neutral-900 text-center">
          {/* Subtle warm golden ambient glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-accent/15 rounded-full blur-[110px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="space-y-5 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent/10 border border-accent/20 text-accent rounded-full text-xs font-bold font-sans uppercase tracking-wider">
              <Moon className="w-3.5 h-3.5 fill-current text-accent" /> {siteText.heroBadge}
            </div>
            
            <div className="space-y-1">
              <h1 className="font-sans font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight max-w-4xl mx-auto">
                {siteText.heroMainTitle || "둥근달스튜디오"}
              </h1>
              <span className="block text-[11px] sm:text-xs text-accent font-sans font-extrabold tracking-widest uppercase">
                {siteText.heroMainTitleSub || "RDMOON STUDIO"}
              </span>
            </div>

            <p className="text-sm sm:text-base md:text-lg text-neutral-200 font-sans font-semibold max-w-3xl mx-auto leading-relaxed pt-2">
              {renderHeroTitle()}
            </p>

            {siteText.heroSubtitle && (
              <p className="text-xs sm:text-sm text-neutral-400 font-medium max-w-2xl mx-auto leading-relaxed pt-1">
                {siteText.heroSubtitle}
              </p>
            )}
          </div>

          {/* Home key Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs font-bold pt-4 relative z-10">
            <button
              onClick={scrollToContact}
              id="hero-btn-cta-contact"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-accent text-neutral-950 hover:bg-yellow-500 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 shadow-lg cursor-pointer"
            >
              {siteText.heroCtaText}
            </button>
            
            <button
              onClick={() => onChangeTab('works')}
              id="hero-btn-view-works"
              className="w-full sm:w-auto px-8 py-4 rounded-xl border border-neutral-850 text-neutral-300 hover:bg-neutral-900 hover:text-white transition-all duration-200 cursor-pointer"
            >
              {siteText.heroSecondaryCtaText}
            </button>
          </div>
        </section>
      </div>

      {/* 2. TRUST HIGH-METRIC CARDS (신뢰 요소 3종) */}
      <section className="bg-primary-50/55 py-12 border-y border-primary-100">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-center text-[10px] font-bold text-primary-400 tracking-widest uppercase mb-8">
            계측된 정량적 성과 지표
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricCard 
              label={siteText.metric1Label} 
              targetValue={siteText.metric1Value} 
              suffix={siteText.metric1Suffix} 
              subtext={siteText.metric1Subtext} 
            />
            <MetricCard 
              label={siteText.metric2Label} 
              targetValue={siteText.metric2Value} 
              suffix={siteText.metric2Suffix} 
              subtext={siteText.metric2Subtext} 
            />
            <MetricCard 
              label={siteText.metric3Label} 
              targetValue={siteText.metric3Value} 
              suffix={siteText.metric3Suffix} 
              subtext={siteText.metric3Subtext} 
            />
          </div>
        </div>
      </section>

      {/* 3. CATEGORY MAP BUTTONS (작업 카테고리 3개 진입 버튼) */}
      <section className="max-w-6xl mx-auto px-6 space-y-10">
        <div className="text-center space-y-2">
          <span className="text-[11px] font-sans font-bold text-primary-400 uppercase tracking-widest">
            {siteText.capBadge}
          </span>
          <h2 className="font-sans font-extrabold text-2xl sm:text-3xl text-primary-900 tracking-tight">
            {siteText.capTitle}
          </h2>
          <p className="text-xs text-primary-400 font-medium">
            {siteText.capDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <button 
            onClick={() => handleCategoryGo('visual')}
            id="cat-card-visual"
            className="group bg-white p-8 rounded-3xl border border-primary-100 font-left relative overflow-hidden transition-all duration-300 hover:translate-y-[-4px] hover:border-primary-200 text-left cursor-pointer premium-shadow"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-display font-black text-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
              VI
            </div>
            <h3 className="font-sans font-bold text-lg text-primary-900 mt-6 group-hover:text-accent transition-colors">
              {siteText.capCard1Title}
            </h3>
            <p className="text-xs text-primary-400 font-medium leading-relaxed mt-2">
              {siteText.capCard1Desc}
            </p>
            <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-primary-900 group-hover:text-accent transition-colors">
              <span>사례 템플릿 보기</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </div>
          </button>

          <button 
            onClick={() => handleCategoryGo('sns')}
            id="cat-card-sns"
            className="group bg-white p-8 rounded-3xl border border-primary-100 font-left relative overflow-hidden transition-all duration-300 hover:translate-y-[-4px] hover:border-primary-200 text-left cursor-pointer premium-shadow"
          >
            <div className="w-12 h-12 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center font-display font-black text-lg group-hover:bg-violet-600 group-hover:text-white transition-colors">
              SN
            </div>
            <h3 className="font-sans font-bold text-lg text-primary-900 mt-6 group-hover:text-accent transition-colors">
              {siteText.capCard2Title}
            </h3>
            <p className="text-xs text-primary-400 font-medium leading-relaxed mt-2">
              {siteText.capCard2Desc}
            </p>
            <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-primary-900 group-hover:text-accent transition-colors">
              <span>사례 템플릿 보기</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </div>
          </button>

          <button 
            onClick={() => handleCategoryGo('video')}
            id="cat-card-video"
            className="group bg-white p-8 rounded-3xl border border-primary-100 font-left relative overflow-hidden transition-all duration-300 hover:translate-y-[-4px] hover:border-primary-200 text-left cursor-pointer premium-shadow"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-display font-black text-lg group-hover:bg-amber-600 group-hover:text-white transition-colors">
              VD
            </div>
            <h3 className="font-sans font-bold text-lg text-primary-900 mt-6 group-hover:text-accent transition-colors">
              {siteText.capCard3Title}
            </h3>
            <p className="text-xs text-primary-400 font-medium leading-relaxed mt-2">
              {siteText.capCard3Desc}
            </p>
            <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-primary-900 group-hover:text-accent transition-colors">
              <span>사례 템플릿 보기</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </div>
          </button>

        </div>
      </section>

      {/* 4. COMPOSING HIGHLIGHTS (대표 작업 3~6개 하이라이트) */}
      <section className="max-w-6xl mx-auto px-6 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-[11px] font-sans font-bold text-primary-400 uppercase tracking-widest">
              {siteText.featBadge}
            </span>
            <h2 className="font-sans font-extrabold text-2xl sm:text-3xl text-primary-900 tracking-tight">
              {siteText.featTitle}
            </h2>
            <p className="text-xs text-primary-300 font-medium">
              {siteText.featDesc}
            </p>
          </div>

          <button
            onClick={() => onChangeTab('works')}
            id="featured-btn-view-all"
            className="flex items-center gap-2 text-xs font-bold text-primary-800 hover:text-accent font-sans shrink-0 border-b border-primary-200 pb-1"
          >
            <span>{siteText.featCtaText}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlightedProjects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onViewDetails={onViewProject} 
            />
          ))}
        </div>
      </section>

      {/* 5. WORK PROCESS SECTION (작업 프로세스 - 제안, 상담, 작업, 수정, 전달) */}
      <section id="home-process-section" className="scroll-mt-24 max-w-6xl mx-auto px-6 space-y-12 border-t border-primary-100 pt-16">
        <div className="text-center space-y-2">
          <span className="text-[11px] font-sans font-bold text-accent uppercase tracking-widest bg-accent/10 border border-accent/20 px-3 py-1 rounded-full inline-block">
            {siteText.processBadge || "Work Process"}
          </span>
          <h2 className="font-sans font-extrabold text-2xl sm:text-3xl text-primary-900 tracking-tight">
            {siteText.processTitle || "체계적이고 정밀한 디자인 작업 프로세스"}
          </h2>
          <p className="text-xs text-primary-450 font-medium max-w-lg mx-auto leading-relaxed">
            {siteText.processDesc || "무질서한 직관 대신 명확하게 설계된 5단계 협업 절차를 통해 최적의 기획과 최상의 마케팅 비주얼 성과를 일관되게 인도합니다."}
          </p>
        </div>

        {/* 5-step grid timeline */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
          {[
            {
              step: '01',
              title: siteText.processStep1Title || '제안',
              eng: siteText.processStep1Eng || 'Proposal',
              icon: FileText,
              desc: siteText.processStep1Desc || '문의 배경과 기초 예산, 요건을 접수해주시면 귀사의 상황을 고려한 맞춤 비즈니스 제안서와 상세 견적 분석을 기획 회신해 드립니다.',
              colorClass: 'bg-blue-50/70 border-blue-100 text-blue-600',
              accentBg: 'bg-blue-500/10 text-blue-600 font-bold'
            },
            {
              step: '02',
              title: siteText.processStep2Title || '상담',
              eng: siteText.processStep2Eng || 'Consultation',
              icon: MessageSquare,
              desc: siteText.processStep2Desc || '전보 메일이나 전용 채널을 기반으로 긴밀한 1:1 상담과 진단을 이어나가며 실효성 높은 마케팅 연출 방향과 스펙 사양을 교감 확립합니다.',
              colorClass: 'bg-violet-50/70 border-violet-100 text-violet-600',
              accentBg: 'bg-violet-500/10 text-violet-600 font-bold'
            },
            {
              step: '03',
              title: siteText.processStep3Title || '작업',
              eng: siteText.processStep3Eng || 'Design / Work',
              icon: Palette,
              desc: siteText.processStep3Desc || '확정 방향에 따라 전담 실무 디자이너가 세련된 타이포그래피 그리드와 정체성을 담보한 고품격 디자인 에셋을 성실하게 제작 돌입합니다.',
              colorClass: 'bg-amber-50/70 border-amber-100 text-amber-600',
              accentBg: 'bg-amber-500/10 text-amber-600 font-bold'
            },
            {
              step: '04',
              title: siteText.processStep4Title || '수정',
              eng: siteText.processStep4Eng || 'Revision',
              icon: RotateCcw,
              desc: siteText.processStep4Desc || '전체적인 피드백을 투명하게 수렴하고 조율하여 한층 더 빈틈없고 완결도 높은 비주얼 결과물을 위해 세부 조정 보완을 정교하게 다듬어 냅니다.',
              colorClass: 'bg-emerald-50/70 border-emerald-100 text-emerald-600',
              accentBg: 'bg-emerald-500/10 text-emerald-600 font-bold'
            },
            {
              step: '05',
              title: siteText.processStep5Title || '전달',
              eng: siteText.processStep5Eng || 'Delivery',
              icon: CheckCircle,
              desc: siteText.processStep5Desc || '최종 선택을 통해 무결히 마감된 마스터 디자인 리소스와 가이드라인을 규격 일정에 맞추어 가장 신속하고 견고한 채널로 인도합니다.',
              colorClass: 'bg-rose-50/70 border-rose-100 text-rose-600',
              accentBg: 'bg-rose-500/10 text-rose-600 font-bold'
            }
          ].map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-white rounded-[1.751rem] p-6 border border-primary-100 flex flex-col items-center text-center relative z-10 hover:border-primary-200 transition-all duration-300 premium-shadow group"
              >
                {/* Step badge */}
                <div className="absolute top-4 right-4 text-[10px] font-mono font-bold tracking-widest text-primary-300 group-hover:text-accent transition-colors">
                  PROCESS {item.step}
                </div>

                {/* Icon block */}
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${item.colorClass} transition-transform duration-300 group-hover:scale-105 mt-2`}>
                  <IconComponent className="w-5 h-5 stroke-[2]" />
                </div>

                {/* Title */}
                <div className="mt-5 space-y-0.5">
                  <h3 className="font-sans font-extrabold text-base text-primary-900 group-hover:text-accent transition-colors flex items-center justify-center gap-1.5">
                    {item.title}
                  </h3>
                  <span className="block text-[9px] font-sans font-bold text-primary-400 uppercase tracking-widest">
                    {item.eng}
                  </span>
                </div>

                {/* Description */}
                <p className="text-[11px] text-primary-500 leading-relaxed font-medium mt-4 text-justify sm:text-center w-full">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 6. EMBEDDED CONTACT FORM (Replacing old WORK WITH ME section) */}
      <section id="home-contact-section" className="scroll-mt-24 max-w-7xl mx-auto border-t border-primary-100 pt-16">
        <ContactView />
      </section>

    </div>
  );
};
