export interface Project {
  id: string;
  category: 'visual' | 'sns' | 'video';
  title: string;
  description: string;
  client: string;
  duration: string;
  // About, goals and process
  about: string;        // 프로젝트 소개 및 기획 의도와 설명 (About)
  goal: string;         // 목표 (Goal)
  process: string;      // 작업 과정 (기획/디자인/영상 편집)
  role: string;         // 본인의 명확한 역할 (Role)
  imageUrl: string;     // 결과 이미지 URL (대표 이미지)
  imageUrls?: string[]; // 추가 업로드 이미지들 (여러장)
  videoUrl?: string;    // 첨부 동영상 URL/DataURL (1분 이내)
  // Options for Case Study
  isCaseStudy: boolean;
  detailedStrategy?: string;  // Detailed client problem analysis & strategy
  detailedDecision?: string;  // Explicit design decisions (Why this visual direction)
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
  date: string;
  status: 'new' | 'read' | 'replied';
}

export interface SiteText {
  heroBadge: string;
  heroTitle: string;
  heroTitleHighlight: string;
  heroSubtitle: string;
  heroCtaText: string;
  heroSecondaryCtaText: string;
  metric1Label: string;
  metric1Value: number;
  metric1Suffix: string;
  metric1Subtext: string;
  metric2Label: string;
  metric2Value: number;
  metric2Suffix: string;
  metric2Subtext: string;
  metric3Label: string;
  metric3Value: number;
  metric3Suffix: string;
  metric3Subtext: string;
  capBadge: string;
  capTitle: string;
  capDesc: string;
  capCard1Title: string;
  capCard1Desc: string;
  capCard2Title: string;
  capCard2Desc: string;
  capCard3Title: string;
  capCard3Desc: string;
  featBadge: string;
  featTitle: string;
  featDesc: string;
  featCtaText: string;
  
  // Custom expandable menu and sub-pages text fields for CMS full-range edit
  menuLogo?: string;
  menuTitle?: string;
  menuSubTitle?: string;
  menuHome?: string;
  menuAbout?: string;
  menuWorks?: string;
  menuCaseStudy?: string;
  menuContact?: string;
  
  aboutBadge?: string;
  aboutHeading?: string;
  aboutDesc?: string;
  aboutRoleLabel?: string;
  aboutRoleVal?: string;
  aboutPhilosophyLabel?: string;
  aboutPhilosophyVal?: string;
  aboutMethodBadge?: string;
  aboutMethodTitle?: string;
  aboutMethodDesc?: string;
  aboutStep1Title?: string;
  aboutStep1Desc?: string;
  aboutStep1Tag?: string;
  aboutStep2Title?: string;
  aboutStep2Desc?: string;
  aboutStep2Tag?: string;
  aboutStep3Title?: string;
  aboutStep3Desc?: string;
  aboutStep3Tag?: string;
  aboutCompBadge?: string;
  aboutCompTitle?: string;
  aboutCompCard1Title?: string;
  aboutCompCard1Desc?: string;
  aboutCompCard2Title?: string;
  aboutCompCard2Desc?: string;
  aboutCompCard3Title?: string;
  aboutCompCard3Desc?: string;
  aboutToolTitle?: string;
  aboutToolDesc?: string;
  aboutPromoQuote?: string;
  aboutPromoRef?: string;
  aboutCtaText?: string;

  worksBadge?: string;
  worksTitle?: string;
  worksDesc?: string;
  worksPromoBadge?: string;
  worksPromoTitle?: string;
  worksPromoDesc?: string;
  worksPromoCta?: string;

  caseStudyBadge?: string;
  caseStudyTitle?: string;
  caseStudyDesc?: string;

  contactBadge?: string;
  contactTitle?: string;
  contactDesc?: string;
  contactScopeTitle?: string;
  contactScopeLabel1?: string;
  contactScopeDesc1?: string;
  contactScopeLabel2?: string;
  contactScopeDesc2?: string;
  contactScopeLabel3?: string;
  contactScopeDesc3?: string;
  contactQuickTitle?: string;
  heroMainTitle?: string;
  heroMainTitleSub?: string;

  // Work Process CMS fields
  processBadge?: string;
  processTitle?: string;
  processDesc?: string;
  processStep1Title?: string;
  processStep1Eng?: string;
  processStep1Desc?: string;
  processStep2Title?: string;
  processStep2Eng?: string;
  processStep2Desc?: string;
  processStep3Title?: string;
  processStep3Eng?: string;
  processStep3Desc?: string;
  processStep4Title?: string;
  processStep4Eng?: string;
  processStep4Desc?: string;
  processStep5Title?: string;
  processStep5Eng?: string;
  processStep5Desc?: string;
}

