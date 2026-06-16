import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, Inquiry, SiteText } from '../types';
import { initialProjects } from '../data/initialProjects';

const defaultSiteText: SiteText = {
  heroBadge: "Premium Brand & Content Architect",
  heroTitle: "브랜드의 [HIGHLIGHT]를 시각과 콘텐츠로 설계하는 디자이너",
  heroTitleHighlight: "메시지",
  heroSubtitle: "단순히 예쁜 포트폴리오의 나열에 그치지 않습니다. 클라이언트가 마주한 실제의 유입/매출/이탈 문제를 정확히 정의하고 시각적 설득으로 성과를 증명합니다.",
  heroCtaText: "프로젝트 제안 상담 바로가기",
  heroSecondaryCtaText: "모든 성과 프로젝트 탐색",
  heroMainTitle: "둥근달스튜디오",
  heroMainTitleSub: "RDMOON STUDIO",
  metric1Label: "COLLABORATING BRANDS",
  metric1Value: 24,
  metric1Suffix: "개사",
  metric1Subtext: "금융 핀테크, 뷰티, IT 테크, 리빙 등 다분야 스타트업 협업",
  metric2Label: "TOTAL COMPLETED",
  metric2Value: 142,
  metric2Suffix: "건+",
  metric2Subtext: "기획부터 최종 디자인, 비주얼 가이드라인 배포까지 완결",
  metric3Label: "CLIENT RE-ORDER RATE",
  metric3Value: 92,
  metric3Suffix: "%",
  metric3Subtext: "디자인 프로젝트 완료 후 의뢰 기업의 재주문 및 지속 협업률",
  capBadge: "CORE CAPABILITIES",
  capTitle: "전문 영역 바로가기",
  capDesc: "원하시는 해결 전략을 선택하시면 해당 프로젝트 가이드 분류로 즉시 이동합니다.",
  capCard1Title: "시각디자인 제품",
  capCard1Desc: "브랜드 CI/BI 리디자인, 인쇄 패키지, 서비스 고유 타이포그래피 시스템 및 가이드 배포.",
  capCard2Title: "SNS 콘텐츠 기획",
  capCard2Desc: "오가닉 노출 및 인게이지먼트를 자극하고 저장율을 도출하는 템플릿 중심의 카드뉴스 마케팅 디자인.",
  capCard3Title: "영상편집 및 연출",
  capCard3Desc: "시청 지속 최대화를 목적으로 3초 초반 완편 및 컷 배치를 고려한 숏츠, 인트로 모션, 브랜드 전용 필름.",
  featBadge: "FEATURED DISCIPLINE",
  featTitle: "대표 해결 성과 모음집",
  featDesc: "문제 정의와 정량 비지니스로 검증된 디자이너 대표 사례를 분석 보고서 형태로 확인해 보세요.",
  featCtaText: "전체 작품 및 상세 구조 둘러보기",

  // Expansion Defaults
  menuLogo: "둥",
  menuTitle: "둥근달스튜디오",
  menuSubTitle: "Round Moon Design Studio",
  menuHome: "Home",
  menuAbout: "About",
  menuWorks: "Works",
  menuCaseStudy: "Case Study",
  menuContact: "프로젝트 문의하기",

  aboutBadge: "DESIGN STATEMENT",
  aboutHeading: "디자인으로 브랜드 메시지를 구조화하고, 비즈니스에 기여하는 시각적 시스템을 설계합니다.",
  aboutDesc: "디자이너의 감각은 기본 소양일 뿐, 비즈니스의 성공 요건이 아닙니다. 저는 예쁜 시안 뒤에 숨겨진 구조와 기획의 맥락을 설계합니다. 클라이언트의 타깃 유저가 인스타그램 피드를 볼 때 혹은 프로모션 비디오를 감상할 때 느낄 인지적 부하(Cognitive Load)를 최소화하고, 행동 유도(CTA Click)에 정확히 마침표를 찍도록 돕는 것이 저의 근원적인 역할입니다.",
  aboutRoleLabel: "ROLE",
  aboutRoleVal: "Brand & Content Experience Planner",
  aboutPhilosophyLabel: "PHILOSOPHY",
  aboutPhilosophyVal: "의도되지 않은 장식은 소음과 같습니다",
  aboutMethodBadge: "HOW I WORK",
  aboutMethodTitle: "성과를 도출해내는 3단계 작업 방식",
  aboutMethodDesc: "단순히 시방서대로 제작하지 않고, 사전에 타깃 조사와 사후 분석까지 하나의 루프로 운영합니다.",
  aboutStep1Title: "문제 진단 및 제품 기획",
  aboutStep1Desc: "기획 단계에서 타깃 브랜드의 기존 피드나 웹사이트 이탈 요인을 정의합니다. 왜 시청 유지율이 떨어졌는지, 로고가 주는 권위가 왜 낮았는지 데이터를 토대로 논리를 정지합니다.",
  aboutStep1Tag: "기획 분석 및 프론팅 셋팅",
  aboutStep2Title: "비주얼 솔루션 디자인",
  aboutStep2Desc: "도출된 기획에 맞춤형 가이드라인과 템플릿을 빌드합니다. 가독성 높은 여백 비율, 상황 변형에 용이한 격자 그리드 시스템, 감성적 대비 폰트 배합을 구현하여 브랜드에 완성형 영혼을 불어넣습니다.",
  aboutStep2Tag: "프리미엄 템플릿 설계",
  aboutStep3Title: "실질 전환율 및 가독 분석",
  aboutStep3Desc: "배포 이후 인스타그램 ER 지수나 광고 클릭 전환율(CVR)의 피드백을 수합합니다. 수집된 전환 분석을 기반으로 향후 마케터가 템플릿을 확장 재생산할 때 기준점이 될 보완 가이드라인을 보완 배포합니다.",
  aboutStep3Tag: "정량적 결과 개방 및 보강",
  aboutCompBadge: "CORE COMPETENCIES",
  aboutCompTitle: "신뢰를 증명하는 포트폴리오 3요소",
  aboutCompCard1Title: "1. 브랜드 이해력 및 에센스 도출",
  aboutCompCard1Desc: "디자인 이전에 클라이언트 사업 구조를 파악합니다. 무엇이 마케팅 강점이고 핵심 차별점인지 사전에 스터디하여, 제품 본질을 궤찌르는 카피라인과 톤앤매너 프레셔를 정립합니다.",
  aboutCompCard2Title: "2. 콘텐츠 최적화 템플릿 빌드",
  aboutCompCard2Desc: "단발성 제작에 머무르지 않습니다. 클라이언트사의 사내 브랜드 담당자 및 마케터가 디자이너 부재 하에서도 고도의 퀄리티와 일관성을 영위하도록 Figma 컴포넌트 마크와 에셋 템플릿을 체계적으로 구조화합니다.",
  aboutCompCard3Title: "3. 기동력 있는 긴밀한 소통 대응",
  aboutCompCard3Desc: "신생 핀테크 이탈 등 빠른 마켓 대응력을 요하는 사안에 맞추어, 기획 가설을 신속하게 시각 가공하여 피드에 로드합니다. 마일스톤에 맞춘 주차별 투명한 프로세스 관리를 최우선으로 합니다.",
  aboutToolTitle: "전문 설계에 투입되는 도구들",
  aboutToolDesc: "생산적인 작업 관리와 산출물의 무결성을 위해 산업 표준 툴셋을 적극 운용하며 마케팅 분석 도구와 연계해 레이아웃을 지속 보완합니다.",
  aboutPromoQuote: "완벽함이란 더 이상 무언가를 더할 수 없을 때가 아니라, 단 한 가지 형태도 덜어낼 것이 없을 때 성취됩니다. 가치 있는 의뢰는 오목한 질감의 여백 속에서 더욱 두드러집니다.",
  aboutPromoRef: "- COMPOSITION FIRST",
  aboutCtaText: "기획 철학이 맞는 파트너로 협업 설계하기",

  worksBadge: "RESULT PORTFOLIOS",
  worksTitle: "기획으로 극복한 성공 프로젝트",
  worksDesc: "예쁩니다만으로 끝나지 않는, \"구체적 문제에서 정제된 마케팅 성과로 연결시킨\" 실증 중심의 포트폴리오 아카이브입니다.",
  worksPromoBadge: "Custom Client Diagnostic Proposal",
  worksPromoTitle: "비슷한 마케팅 난제를 겪고 계신가요?",
  worksPromoDesc: "귀사의 타깃 고객 군에 딱 맞춘 인스타그램 톤앤매너 피드 분석 보고서와 BI 초안 제안서를 정성껏 수립하여 무료 피드백해 드립니다. 선택을 고민할 시간에 먼저 의뢰해 보세요.",
  worksPromoCta: "맞춤 디자인 상담하기",

  caseStudyBadge: "CURATED DEEP DIVES",
  caseStudyTitle: "심층 해결 사례 분석 (Case Study)",
  caseStudyDesc: "단순 이미지 자랑이 아닙니다. 실제 클라이언트로부터 출발된 상이한 고충, 이를 타개하기 위한 비주얼 설계 방향, 그리고 전환으로 치환된 정밀한 성과 데이터를 기록합니다.",

  contactBadge: "INQUIRY & COLLABORATE",
  contactTitle: "프로젝트는 명확할수록, 결과는 좋아집니다.",
  contactDesc: "귀사의 문제점과 요건을 적어주시면, 불필요한 인사치레 대신 즉각 투입 가능한 시각 제안서와 견적 분석서를 회신해 드립니다.",
  contactScopeTitle: "제안 가능한 최적의 작업 범위",
  contactScopeLabel1: "SNS 콘텐츠 정기 제작",
  contactScopeDesc1: "인스타그램 오가닉 피드 가이드라인 빌딩, 공유자극형 정보 카드뉴스 템플릿 개발, 일관된 정렬 매칭 가이딩.",
  contactScopeLabel2: "브랜드 비주얼 아이덴티티 디자인",
  contactScopeDesc2: "기하학 기틀 모던 로고 BI 제작, 회사소개용 그래픽 에셋 서식 지원, 가치 정합용 브랜드 북 시디롬 배포.",
  contactScopeLabel3: "광고 전개용 숏폼 및 하이라이트 영상",
  contactScopeDesc3: "페이스 3초 컷 정렬 도입 컷편집, ASMR 기반 청각 결합, 제품 가동 비주얼 자막 트래킹 및 시네마 보정.",
  contactQuickTitle: "직접 상담하기",

  processBadge: "Work Process",
  processTitle: "체계적이고 정밀한 디자인 작업 프로세스",
  processDesc: "무질서한 직관 대신 명확하게 설계된 5단계 협업 절차를 통해 최적의 기획과 최상의 마케팅 비주얼 성과를 일관되게 인도합니다.",
  processStep1Title: "제안",
  processStep1Eng: "Proposal",
  processStep1Desc: "문의 배경과 기초 예산, 요건을 접수해주시면 귀사의 상황을 고려한 맞춤 비즈니스 제안서와 상세 견적 분석을 기획 회신해 드립니다.",
  processStep2Title: "상담",
  processStep2Eng: "Consultation",
  processStep2Desc: "전보 메일이나 전용 채널을 기반으로 긴밀한 1:1 상담과 진단을 이어나가며 실효성 높은 마케팅 연출 방향과 스펙 사양을 교감 확립합니다.",
  processStep3Title: "작업",
  processStep3Eng: "Design / Work",
  processStep3Desc: "확정 방향에 따라 전담 실무 디자이너가 세련된 타이포그래피 그리드와 정체성을 담보한 고품격 디자인 에셋을 성실하게 제작 돌입합니다.",
  processStep4Title: "수정",
  processStep4Eng: "Revision",
  processStep4Desc: "전체적인 피드백을 투명하게 수렴하고 조율하여 한층 더 빈틈없고 완결도 높은 비주얼 결과물을 위해 세부 조정 보완을 정교하게 다듬어 냅니다.",
  processStep5Title: "전달",
  processStep5Eng: "Delivery",
  processStep5Desc: "최종 선택을 통해 무결히 마감된 마스터 디자인 리소스와 가이드라인을 규격 일정에 맞추어 가장 신속하고 견고한 채널로 인도합니다."
};

interface PortfolioContextType {
  projects: Project[];
  inquiries: Inquiry[];
  isAdmin: boolean;
  siteText: SiteText;
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, updated: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  addInquiry: (inquiry: Omit<Inquiry, 'id' | 'date' | 'status'>) => void;
  updateInquiryStatus: (id: string, status: 'new' | 'read' | 'replied') => void;
  deleteInquiry: (id: string) => void;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
  updateSiteText: (updated: Partial<SiteText>) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [siteText, setSiteText] = useState<SiteText>(defaultSiteText);

  // Initial load
  useEffect(() => {
    const savedProjects = localStorage.getItem('portfolio_projects');
    if (savedProjects) {
      try {
        const parsed = JSON.parse(savedProjects);
        // Integrate migration from before/result format to about format
        if (parsed.some((p: any) => p.hasOwnProperty('before') || p.hasOwnProperty('result') || !p.hasOwnProperty('about'))) {
          const migrated = parsed.map((p: any) => {
            const aboutVal = p.about || `${p.before || ''} ${p.result || ''}`.trim() || '프로젝트 상세 소개 및 기획 설계안입니다.';
            const { before, result, ...rest } = p;
            return {
              ...rest,
              about: aboutVal
            };
          });
          // For original sample counts, overwrite to default list with fresh structures
          if (parsed.length <= 5) {
            setProjects(initialProjects);
            localStorage.setItem('portfolio_projects', JSON.stringify(initialProjects));
          } else {
            setProjects(migrated);
            localStorage.setItem('portfolio_projects', JSON.stringify(migrated));
          }
        } else {
          setProjects(parsed);
        }
      } catch (e) {
        setProjects(initialProjects);
      }
    } else {
      setProjects(initialProjects);
      localStorage.setItem('portfolio_projects', JSON.stringify(initialProjects));
    }

    const savedInquiries = localStorage.getItem('portfolio_inquiries');
    if (savedInquiries) {
      try {
        setInquiries(JSON.parse(savedInquiries));
      } catch (e) {
        setInquiries(getSampleInquiries());
      }
    } else {
      const sampleInquiries = getSampleInquiries();
      setInquiries(sampleInquiries);
      localStorage.setItem('portfolio_inquiries', JSON.stringify(sampleInquiries));
    }

    const savedSiteText = localStorage.getItem('portfolio_site_text');
    if (savedSiteText) {
      try {
        const parsed = JSON.parse(savedSiteText);
        let migrated = false;
        // Clean migration of old metric key
        if (parsed.metric3Label === "MAX CAMPAIGN METRIC") {
          parsed.metric3Label = "CLIENT RE-ORDER RATE";
          parsed.metric3Value = 92;
          parsed.metric3Suffix = "%";
          parsed.metric3Subtext = "디자인 프로젝트 완료 후 의뢰 기업의 재주문 및 지속 협업률";
          migrated = true;
        }
        // Clean migration of contactQuickTitle
        if (parsed.contactQuickTitle === "빠른 인스턴트 회신 채널" || !parsed.contactQuickTitle) {
          parsed.contactQuickTitle = "직접 상담하기";
          migrated = true;
        }
        if (!parsed.heroMainTitle) {
          parsed.heroMainTitle = "둥근달스튜디오";
          migrated = true;
        }
        if (!parsed.heroMainTitleSub) {
          parsed.heroMainTitleSub = "RDMOON STUDIO";
          migrated = true;
        }
        if (parsed.worksPromoCta === "간단 사양 적수하고 맞춤 상담하기" || parsed.worksPromoCta === "간단 사양 적수하고 맞춤상담하기" || !parsed.worksPromoCta) {
          parsed.worksPromoCta = "맞춤 디자인 상담하기";
          migrated = true;
        }
        if (migrated) {
          localStorage.setItem('portfolio_site_text', JSON.stringify(parsed));
        }
        setSiteText({ ...defaultSiteText, ...parsed });
      } catch (e) {
        setSiteText(defaultSiteText);
      }
    } else {
      setSiteText(defaultSiteText);
      localStorage.setItem('portfolio_site_text', JSON.stringify(defaultSiteText));
    }

    const savedAdmin = sessionStorage.getItem('portfolio_admin_logged');
    if (savedAdmin === 'true') {
      setIsAdmin(true);
    }
  }, []);

  // Save changes
  const saveProjects = (newProjects: Project[]) => {
    setProjects(newProjects);
    localStorage.setItem('portfolio_projects', JSON.stringify(newProjects));
  };

  const saveInquiries = (newInquiries: Inquiry[]) => {
    setInquiries(newInquiries);
    localStorage.setItem('portfolio_inquiries', JSON.stringify(newInquiries));
  };

  const updateSiteText = (updated: Partial<SiteText>) => {
    const nextSiteText = { ...siteText, ...updated };
    setSiteText(nextSiteText);
    localStorage.setItem('portfolio_site_text', JSON.stringify(nextSiteText));
  };

  // Actions
  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject: Project = {
      ...project,
      id: `project-${Date.now()}`
    };
    const updated = [newProject, ...projects];
    saveProjects(updated);
  };

  const updateProject = (id: string, updated: Partial<Project>) => {
    const updatedProjects = projects.map(p => p.id === id ? { ...p, ...updated } : p);
    saveProjects(updatedProjects);
  };

  const deleteProject = (id: string) => {
    const updatedProjects = projects.filter(p => p.id !== id);
    saveProjects(updatedProjects);
  };

  const addInquiry = (inquiry: Omit<Inquiry, 'id' | 'date' | 'status'>) => {
    const newInquiry: Inquiry = {
      ...inquiry,
      id: `inq-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      status: 'new'
    };
    const updated = [newInquiry, ...inquiries];
    saveInquiries(updated);
  };

  const updateInquiryStatus = (id: string, status: 'new' | 'read' | 'replied') => {
    const updatedInquiries = inquiries.map(i => i.id === id ? { ...i, status } : i);
    saveInquiries(updatedInquiries);
  };

  const deleteInquiry = (id: string) => {
    const updatedInquiries = inquiries.filter(i => i.id !== id);
    saveInquiries(updatedInquiries);
  };

  const loginAdmin = (password: string): boolean => {
    if (password === 'wldls0815!!!') {
      setIsAdmin(true);
      sessionStorage.setItem('portfolio_admin_logged', 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('portfolio_admin_logged');
  };

  return (
    <PortfolioContext.Provider value={{
      projects,
      inquiries,
      isAdmin,
      siteText,
      addProject,
      updateProject,
      deleteProject,
      addInquiry,
      updateInquiryStatus,
      deleteInquiry,
      loginAdmin,
      logoutAdmin,
      updateSiteText
    }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};

// Initial sample inquiries for a realistic, premium Admin Dashboard
const getSampleInquiries = (): Inquiry[] => [
  {
    id: 'inq-1',
    name: '김서현 팀장',
    email: 'sh.kim@beautybrand.co.kr',
    projectType: 'sns',
    budget: '3m_to_5m',
    timeline: '1개월 이내',
    message: '인스타그램 화장품 브랜드 공식 채널 정기 콘텐츠 그래픽 수정 및 정렬 작업을 의뢰드리고자 합니다. 현재 피드 감도를 대대적으로 올려줄 디자이너를 찾고 있습니다. 미니멀하면서 고급화된 톤앤매너 구현을 희망합니다.',
    date: '2026-06-14',
    status: 'new'
  },
  {
    id: 'inq-2',
    name: '박준혁 이사',
    email: 'jh.park@nextmobility.io',
    projectType: 'visual',
    budget: 'over_5m',
    timeline: '2개월 이내',
    message: '새롭게 런칭 예정인 자율주행 모빌리티 스타트업의 신규 BI 가이드와 전반적인 브랜딩 시스템 설계가 필요합니다. 단순 로고만 예쁘게 만드는 곳보다 결과 분석 및 설득 가능한 비주얼 논리를 가진 포트폴리오를 보고 연락드립니다.',
    date: '2026-06-12',
    status: 'read'
  }
];
