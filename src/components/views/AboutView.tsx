import React from 'react';
import { Compass, Sparkles, TrendingUp, Quote } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

interface AboutViewProps {
  onChangeTab: (tab: 'home' | 'about' | 'works' | 'case-study' | 'contact' | 'admin') => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onChangeTab }) => {
  const { siteText } = usePortfolio();

  return (
    <div className="space-y-24 py-12 md:py-20 max-w-5xl mx-auto px-6 fade-in">
      
      {/* 1. ROLE-FOCUSED HEADER (이력보다 "역할 중심" 소개) */}
      <section className="space-y-6">
        <span className="text-[11px] font-sans font-bold text-accent tracking-widest uppercase block">
          {siteText.aboutBadge || "DESIGN STATEMENT"}
        </span>
        <h1 className="font-serif font-extrabold text-3xl sm:text-4xl md:text-5xl text-primary-900 tracking-tight leading-[1.2] whitespace-pre-line">
          {siteText.aboutHeading || '"디자인으로 브랜드 메시지를 구조화하고, \n비즈니스에 기여하는 시각적 시스템을 설계합니다."'}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4">
          <div className="md:col-span-8">
            <p className="text-xs sm:text-sm text-primary-500 font-medium leading-relaxed text-justify text-primary-600">
              {siteText.aboutDesc || "디자이너의 감각은 기본 소양일 뿐, 비즈니스의 성공 요건이 아닙니다. 저는 예쁜 시안 뒤에 숨겨진 구조와 기획의 맥락을 설계합니다. 클라이언트의 타깃 유저가 인스타그램 피드를 볼 때 혹은 프로모션 비디오를 감상할 때 느낄 인지적 부하(Cognitive Load)를 최소화하고, 행동 유도(CTA Click)에 정확히 마침표를 찍도록 돕는 것이 저의 근원적인 역할입니다."}
            </p>
          </div>
          <div className="md:col-span-4 border-l border-primary-100 pl-6 space-y-4 font-sans text-xs font-semibold text-primary-400">
            <div>
              <span className="text-primary-800 font-bold block">{siteText.aboutRoleLabel || "ROLE"}</span>
              <p className="mt-1">{siteText.aboutRoleVal || "Brand & Content Experience Planner"}</p>
            </div>
            <div>
              <span className="text-primary-800 font-bold block">{siteText.aboutPhilosophyLabel || "PHILOSOPHY"}</span>
              <p className="mt-1">{siteText.aboutPhilosophyVal || '"의도되지 않은 장식은 소음과 같습니다"'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. RIGOROUS WORK METHODOLOGY (기획 → 디자인 → 결과 분석 흐름) */}
      <section className="space-y-12">
        <div className="space-y-2">
          <span className="text-[11px] font-sans font-bold text-primary-450 uppercase tracking-widest block">
            {siteText.aboutMethodBadge || "HOW I WORK"}
          </span>
          <h2 className="font-sans font-extrabold text-2xl sm:text-3xl text-primary-900 tracking-tight">
            {siteText.aboutMethodTitle || "성과를 도출해내는 3단계 작업 방식"}
          </h2>
          <p className="text-xs text-primary-400 font-medium">
            {siteText.aboutMethodDesc || "단순히 시방서대로 제작하지 않고, 사전에 타깃 조사와 사후 분석까지 하나의 루프로 운영합니다."}
          </p>
        </div>

        {/* 3-Step Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Step 1 */}
          <div className="bg-white rounded-2xl border border-primary-100 p-8 space-y-4 premium-shadow relative overflow-hidden">
            <div className="text-5xl font-display font-black text-primary-100 absolute top-4 right-6 pointer-events-none">
              01
            </div>
            <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-sans font-bold text-base text-primary-900 pt-2">
              {siteText.aboutStep1Title || "문제 진단 및 제품 기획"}
            </h3>
            <p className="text-xs text-primary-500 font-medium leading-relaxed whitespace-pre-line">
              {siteText.aboutStep1Desc || "기획 단계에서 타깃 브랜드의 기존 피드나 웹사이트 이탈 요인을 정의합니다. 왜 시청 유지율이 떨어졌는지, 로고가 주는 권위가 왜 낮았는지 데이터를 토대로 논리를 정지합니다."}
            </p>
            <span className="text-[10px] text-orange-600 font-bold bg-orange-50 px-2 py-0.5 rounded inline-block">
              {siteText.aboutStep1Tag || "기획 분석 및 프론팅 셋팅"}
            </span>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-2xl border border-primary-100 p-8 space-y-4 premium-shadow relative overflow-hidden">
            <div className="text-5xl font-display font-black text-primary-100 absolute top-4 right-6 pointer-events-none">
              02
            </div>
            <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-sans font-bold text-base text-primary-900 pt-2">
              {siteText.aboutStep2Title || "비주얼 솔루션 디자인"}
            </h3>
            <p className="text-xs text-primary-500 font-medium leading-relaxed whitespace-pre-line">
              {siteText.aboutStep2Desc || "도출된 기획에 맞춤형 가이드라인과 템플릿을 빌드합니다. 가독성 높은 여백 비율, 상황 변형에 용이한 격자 그리드 시스템, 감성적 대비 폰트 배합을 구현하여 브랜드에 완성형 영혼을 불어넣습니다."}
            </p>
            <span className="text-[10px] text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded inline-block">
              {siteText.aboutStep2Tag || "프리미엄 템플릿 설계"}
            </span>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-2xl border border-primary-100 p-8 space-y-4 premium-shadow relative overflow-hidden">
            <div className="text-5xl font-display font-black text-primary-100 absolute top-4 right-6 pointer-events-none">
              03
            </div>
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="font-sans font-bold text-base text-primary-900 pt-2">
              {siteText.aboutStep3Title || "실질 전환율 및 가독 분석"}
            </h3>
            <p className="text-xs text-primary-500 font-medium leading-relaxed whitespace-pre-line">
              {siteText.aboutStep3Desc || "배포 이후 인스타그램 ER 지수나 광고 클릭 전환율(CVR)의 피드백을 수합합니다. 수집된 전환 분석을 기반으로 향후 마케터가 템플릿을 확장 재생산할 때 기준점이 될 보완 가이드라인을 보완 배포합니다."}
            </p>
            <span className="text-[10px] text-emerald-650 font-bold bg-emerald-50 px-2 py-0.5 rounded inline-block">
              {siteText.aboutStep3Tag || "정량적 결과 개방 및 보강"}
            </span>
          </div>

        </div>
      </section>

      {/* 3. CORE STRENGTHS (강점 3가지) */}
      <section className="bg-primary-50/50 rounded-3xl p-8 sm:p-12 border border-primary-100 space-y-12">
        <div className="text-center space-y-2">
          <span className="text-[11px] font-sans font-bold text-accent tracking-widest uppercase block">
            {siteText.aboutCompBadge || "CORE COMPETENCIES"}
          </span>
          <h2 className="font-sans font-extrabold text-2xl text-primary-900">
            {siteText.aboutCompTitle || "신뢰를 증명하는 포트폴리오 3요소"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="space-y-2.5">
            <span className="font-sans font-bold text-sm text-primary-800 block">
              {siteText.aboutCompCard1Title || "1. 브랜드 이해력 및 에센스 도출"}
            </span>
            <p className="text-xs text-primary-500 font-medium leading-relaxed text-justify">
              {siteText.aboutCompCard1Desc || "디자인 이전에 클라이언트 사업 구조를 파악합니다. 무엇이 마케팅 강점이고 핵심 차별점인지 사전에 스터디하여, 제품 본질을 궤찌르는 카피라인과 톤앤매너 프레셔를 정립합니다."}
            </p>
          </div>

          <div className="space-y-2.5">
            <span className="font-sans font-bold text-sm text-primary-800 block">
              {siteText.aboutCompCard2Title || "2. 콘텐츠 최적화 템플릿 빌드"}
            </span>
            <p className="text-xs text-primary-500 font-medium leading-relaxed text-justify">
              {siteText.aboutCompCard2Desc || "단발성 제작에 머무르지 않습니다. 클라이언트사의 사내 브랜드 담당자 및 마케터가 디자이너 부재 하에서도 고도의 퀄리티와 일관성을 영위하도록 Figma 컴포넌트 마크와 에셋 템플릿을 체계적으로 구조화합니다."}
            </p>
          </div>

          <div className="space-y-2.5">
            <span className="font-sans font-bold text-sm text-primary-800 block">
              {siteText.aboutCompCard3Title || "3. 기동력 있는 긴밀한 소통 대응"}
            </span>
            <p className="text-xs text-primary-500 font-medium leading-relaxed text-justify">
              {siteText.aboutCompCard3Desc || "신생 핀테크 이탈 등 빠른 마켓 대응력을 요하는 사안에 맞추어, 기획 가설을 신속하게 시각 가공하여 피드에 로드합니다. 마일스톤에 맞춘 주차별 투명한 프로세스 관리를 최우선으로 합니다."}
            </p>
          </div>

        </div>
      </section>

      {/* 4. EXP & POWER TOOLS (협업 경험 & 툴) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-5">
          <h3 className="font-sans font-extrabold text-xl text-primary-900 tracking-tight">
            {siteText.aboutToolTitle || "전문 설계에 투입되는 도구들"}
          </h3>
          <p className="text-xs text-primary-500 font-medium leading-relaxed max-w-md">
            {siteText.aboutToolDesc || "생산적인 작업 관리와 산출물의 무결성을 위해 산업 표준 툴셋을 적극 운용하며 마케팅 분석 도구와 연계해 레이아웃을 지속 보완합니다."}
          </p>
          
          <div className="flex flex-wrap gap-2.5 pt-2">
            {['Figma', 'Adobe Creative Cloud', 'Premiere Pro', 'After Effects', 'Notion Workspace', 'Google Analytics', 'Hotjar', 'Framer Motion'].map((tool) => (
              <span key={tool} className="text-xs px-3.5 py-1.5 rounded-lg border border-primary-100 bg-white text-primary-600 font-bold shadow-xs">
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Philosophy quote card */}
        <div className="bg-primary-900 text-white rounded-3xl p-8 space-y-4 shadow-xl flex flex-col justify-between aspect-video">
          <Quote className="w-10 h-10 text-accent/40" />
          <blockquote className="font-serif text-sm sm:text-base italic leading-relaxed text-primary-200">
            {siteText.aboutPromoQuote || '"완벽함이란 더 이상 무언가를 더할 수 없을 때가 아니라, 단 한 가지 형태도 덜어낼 것이 없을 때 성취됩니다. 가치 있는 의뢰는 오목한 질감의 여백 속에서 더욱 두드러집니다."'}
          </blockquote>
          <div className="text-xs font-bold text-accent tracking-widest font-display">
            {siteText.aboutPromoRef || "- COMPOSITION FIRST"}
          </div>
        </div>
      </section>

      {/* CTA Anchor button */}
      <div className="text-center pt-8">
        <button
          onClick={() => onChangeTab('contact')}
          id="btn-about-view-cta"
          className="px-8 py-4 bg-primary-900 hover:bg-primary-800 text-white text-xs font-extrabold rounded-xl transition-all shadow-md cursor-pointer"
        >
          {siteText.aboutCtaText || "기획 철학이 맞는 파트너로 협업 설계하기"}
        </button>
      </div>

    </div>
  );
};
