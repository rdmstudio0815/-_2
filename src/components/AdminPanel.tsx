import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Project, Inquiry, SiteText } from '../types';
import { 
  KeyRound, ShieldCheck, Database, FileText, Mail, Trash2, 
  CheckCircle, Plus, Edit, X, Save, AlertCircle, TrendingUp, BarChart2, Eye
} from 'lucide-react';

export interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const { 
    projects, inquiries, isAdmin, loginAdmin, logoutAdmin,
    addProject, updateProject, deleteProject, updateInquiryStatus, deleteInquiry,
    siteText, updateSiteText
  } = usePortfolio();

  // Authentication state
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Clear password when panel is toggled or opened to ensure it stays blank
  useEffect(() => {
    setPassword('');
    setLoginError(false);
  }, [isOpen]);

  // Deletion confirmation states to prevent native confirm blocks inside iframes
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const [inquiryToDelete, setInquiryToDelete] = useState<string | null>(null);

  // Nav inside Admin Panel
  const [subTab, setSubTab] = useState<'stats' | 'projects' | 'inquiries' | 'texts'>('stats');

  // Local site text editor state
  const [localTexts, setLocalTexts] = useState<SiteText | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [textCategory, setTextCategory] = useState<'all' | 'common' | 'home' | 'about' | 'works' | 'caseStudy' | 'contact' | 'process'>('all');

  // Sync state on tab change
  useEffect(() => {
    if (subTab === 'texts' && siteText) {
      setLocalTexts(siteText);
    }
  }, [subTab, siteText]);

  // Form states for creating & editing projects
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Project Form data
  const [formData, setFormData] = useState<Omit<Project, 'id'>>({
    category: 'visual',
    title: '',
    description: '',
    client: '',
    duration: '',
    about: '',
    goal: '',
    process: '',
    role: '',
    imageUrl: '',
    imageUrls: [],
    videoUrl: '',
    isCaseStudy: false,
    detailedStrategy: '',
    detailedDecision: ''
  });

  const [formError, setFormError] = useState('');

  // Handle Login submission
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(password)) {
      setLoginError(false);
      setPassword('');
    } else {
      setLoginError(true);
    }
  };

  // Turn on edit/create mode
  const startCreate = () => {
    setFormData({
      category: 'visual',
      title: '',
      description: '',
      client: '',
      duration: '',
      about: '',
      goal: '',
      process: '',
      role: '',
      imageUrl: '',
      imageUrls: [],
      videoUrl: '',
      isCaseStudy: false,
      detailedStrategy: '',
      detailedDecision: ''
    });
    setEditingId(null);
    setIsEditing(true);
    setFormError('');
  };

  const startEdit = (project: Project) => {
    setFormData({
      category: project.category,
      title: project.title,
      description: project.description,
      client: project.client || '',
      duration: project.duration || '',
      about: project.about || '',
      goal: project.goal,
      process: project.process,
      role: project.role,
      imageUrl: project.imageUrl,
      imageUrls: project.imageUrls || (project.imageUrl ? [project.imageUrl] : []),
      videoUrl: project.videoUrl || '',
      isCaseStudy: project.isCaseStudy,
      detailedStrategy: project.detailedStrategy || '',
      detailedDecision: project.detailedDecision || ''
    });
    setEditingId(project.id);
    setIsEditing(true);
    setFormError('');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.about || !formData.goal || !formData.role) {
      setFormError('제목, 기획 소개스토리(ABOUT), 목표, 핵심 역할은 필수 항목입니다.');
      return;
    }

    if (editingId) {
      updateProject(editingId, formData);
    } else {
      addProject(formData);
    }
    setIsEditing(false);
    setEditingId(null);
    setSubTab('projects');
  };

  // Loaded Category Splits calculation
  const projectSplits = {
    visual: projects.filter(p => p.category === 'visual').length,
    sns: projects.filter(p => p.category === 'sns').length,
    video: projects.filter(p => p.category === 'video').length,
  };

  const getBudgetText = (budget: string) => {
    switch(budget) {
      case 'under_1m': return '100만 원 이하';
      case '1m_to_3m': return '100 ~ 300만 원';
      case '3m_to_5m': return '300 ~ 500만 원';
      case 'over_5m': return '500만 원 이상';
      default: return budget;
    }
  };

  const getProjectTypeLabel = (type: string) => {
    switch(type) {
      case 'visual': return '시각디자인';
      case 'sns': return 'SNS 콘텐츠';
      case 'video': return '영상편집';
      case 'mixed': return '종합 패키지 문의';
      default: return type;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop overlay */}
      <div 
        className="absolute inset-0 bg-neutral-900/60 backdrop-blur-xs transition-opacity duration-300 cursor-pointer pointer-events-auto"
        onClick={onClose}
      />
      
      {/* Drawer Overlay Card Panel */}
      <div className="relative w-full max-w-4xl bg-slate-50 h-full shadow-2xl flex flex-col z-10 drawer-slide-in overflow-hidden border-l border-primary-100">
        
        {/* Sticky Header */}
        <div className="px-6 py-5 bg-primary-900 text-white flex items-center justify-between shrink-0 border-b border-primary-850 shadow-md">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-accent animate-pulse" />
            <div>
              <span className="block font-sans font-extrabold text-[13px] uppercase tracking-wider text-accent leading-none">둥근달스튜디오</span>
              <span className="block text-[10px] text-primary-300 font-medium mt-1">실시간 성과/포트폴리오 백오피스</span>
            </div>
          </div>
          <button 
            type="button" 
            onClick={onClose} 
            className="p-1 px-3 rounded-xl bg-white/10 hover:bg-white/20 hover:text-accent font-bold text-xs flex items-center gap-1.5 transition-all text-primary-100"
          >
            <X className="w-4 h-4" />
            <span>닫기</span>
          </button>
        </div>

        {/* Scrollable Container Body */}
        <div className="flex-grow overflow-y-auto p-6 bg-slate-50/50">
          
          {!isAdmin ? (
            /* SECURE ACCESS CONTROL CARD */
            <div className="max-w-md mx-auto py-12 px-2 fade-in">
              <div className="bg-white rounded-3xl border border-primary-100 p-8 premium-shadow space-y-6">
                <div className="text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mx-auto animate-bounce">
                    <KeyRound className="w-6 h-6" />
                  </div>
                  <h2 className="font-sans font-extrabold text-xl text-primary-900 tracking-tight">
                    관리 시스템 접속인증
                  </h2>
                  <p className="text-xs text-primary-400 font-semibold leading-relaxed leading-normal">
                    성공 분석 수정 및 문의서 열람을 위해 비밀번호를 입력해 주세요.
                  </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-primary-700 block">관리자 비밀번호</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="비밀번호를 입력하세요"
                      id="admin-passwd-input"
                      autoComplete="new-password"
                      className="w-full px-4 py-3 rounded-xl bg-primary-100 border border-primary-200 focus:outline-none focus:border-accent text-sm"
                    />
                    {loginError && (
                      <p className="text-red-500 text-xs font-bold flex items-center gap-1.5 pt-1 animate-pulse">
                        <AlertCircle className="w-3.5 h-3.5" />
                        올바르지 않은 비밀번호입니다.
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    id="admin-login-submit"
                    className="w-full py-3.5 bg-primary-900 hover:bg-primary-800 text-white font-bold text-sm rounded-xl transition-all shadow-md active:scale-98 cursor-pointer"
                  >
                    접속 인증 완료
                  </button>
                </form>
              </div>
            </div>
          ) : (
            /* CONTROL PANEL PANEL */
            <div className="space-y-6 fade-in">
              
              {/* Shrunk subtabs for compact space */}
              <div className="flex flex-col gap-4 border-b border-primary-120 pb-5">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-accent tracking-widest uppercase flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" /> Backoffice Console
                  </span>
                  <button
                    type="button"
                    onClick={logoutAdmin}
                    className="text-[10px] font-bold text-red-600 bg-red-50 hover:bg-red-100 px-2.5 py-1 rounded transition-all cursor-pointer"
                  >
                    접속 종료
                  </button>
                </div>
                
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => { setSubTab('stats'); setIsEditing(false); }}
                    className={`px-3 py-2 rounded-lg text-xs font-bold tracking-tight transition-all cursor-pointer ${subTab === 'stats' && !isEditing ? 'bg-primary-900 text-white' : 'bg-primary-100/60 text-primary-600 hover:bg-primary-100'}`}
                  >
                    대시보드
                  </button>
                  <button
                    onClick={() => { setSubTab('projects'); setIsEditing(false); }}
                    className={`px-3 py-2 rounded-lg text-xs font-bold tracking-tight transition-all cursor-pointer ${subTab === 'projects' && !isEditing ? 'bg-primary-900 text-white' : 'bg-primary-100/60 text-primary-600 hover:bg-primary-100'}`}
                  >
                    포트폴리오 ({projects.length})
                  </button>
                  <button
                    onClick={() => { setSubTab('inquiries'); setIsEditing(false); }}
                    className={`px-3 py-2 rounded-lg text-xs font-bold tracking-tight transition-all cursor-pointer ${subTab === 'inquiries' && !isEditing ? 'bg-primary-900 text-white' : 'bg-primary-100/60 text-primary-600 hover:bg-primary-100'}`}
                  >
                    의뢰 ({inquiries.length})
                  </button>
                  <button
                    onClick={() => { setSubTab('texts'); setIsEditing(false); }}
                    className={`px-3 py-2 rounded-lg text-xs font-bold tracking-tight transition-all cursor-pointer ${subTab === 'texts' && !isEditing ? 'bg-primary-900 text-white' : 'bg-primary-100/60 text-primary-600 hover:bg-primary-100'}`}
                  >
                    문구 수정
                  </button>
                  <button
                    type="button"
                    onClick={startCreate}
                    className="flex items-center gap-1 px-3 py-2 rounded-lg bg-accent hover:bg-accent/90 text-white text-xs font-bold transition-all cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> 작업 추가
                  </button>
                </div>
              </div>

      {/* 2. CREATING / EDITING FORM VIEW */}
      {isEditing ? (
        <div className="bg-white rounded-3xl border border-primary-100 p-8 sm:p-10 premium-shadow">
          <div className="flex justify-between items-center mb-8 border-b border-primary-100 pb-4">
            <h2 className="font-sans font-bold text-xl text-primary-900">
              {editingId ? '포트폴리오 작업 수정 공정' : '신규 포트폴리오 제안서 등록'}
            </h2>
            <button
              onClick={() => setIsEditing(false)}
              className="p-1 px-3 border border-primary-200 hover:bg-primary-50 rounded-lg text-xs font-semibold text-primary-600"
            >
              취소
            </button>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Category */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-primary-700 block">카테고리</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                  className="w-full px-4 py-3 rounded-xl bg-primary-50 border border-primary-100 text-xs font-medium focus:outline-none"
                >
                  <option value="visual">시각디자인</option>
                  <option value="sns">SNS 콘텐츠</option>
                  <option value="video">영상편집</option>
                </select>
              </div>

              {/* Client */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-primary-700 block">클라이언트 사명</label>
                <input
                  type="text"
                  value={formData.client}
                  onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                  placeholder="예: 주식회사 브랜드랩"
                  className="w-full px-4 py-3 rounded-xl bg-primary-50 border-primary-100 focus:outline-none text-xs text-primary-800"
                />
              </div>

              {/* Duration */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-primary-700 block">작업 기간</label>
                <input
                  type="text"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="예: 2026.04 (1개월)"
                  className="w-full px-4 py-3 rounded-xl bg-primary-50 border-primary-100 focus:outline-none text-xs text-primary-800"
                />
              </div>

            </div>

            {/* Title */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-primary-700 block">프로젝트 한글 타이틀 (제안서 제목)</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="예: 뷰티 브랜드 '로지엔' 인스타그램 오가닉 브랜딩 전개"
                className="w-full px-4 py-3 rounded-xl bg-primary-50 border-primary-100 focus:outline-none text-xs text-primary-800 font-bold"
              />
            </div>

            {/* Simple Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-primary-700 block">한 줄 대표 포지셔닝 설명</label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="어려운 채용 브랜딩을 누름직한 일러스트와 질문 레이아웃으로 기획"
                className="w-full px-4 py-3 rounded-xl bg-primary-50 border-primary-100 focus:outline-none text-xs text-primary-800"
              />
            </div>

            {/* About / Goal / Process */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* About */}
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold text-neutral-900 block flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-accent inline-block" />
                  프로젝트 기획 및 소개 스토리 (ABOUT) <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.about}
                  onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                  placeholder="디자인 기획 스토리 및 비즈니스 배경, 제품 기획 의도를 상세히 서술해주세요..."
                  rows={3}
                  className="w-full p-4 rounded-xl bg-primary-50 border-primary-100 focus:outline-none text-xs font-medium text-primary-800 leading-relaxed"
                />
              </div>

              {/* Goal */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-accent block">설정한 목표 (Goal) <span className="text-red-500">*</span></label>
                <textarea
                  value={formData.goal}
                  onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                  placeholder="여백 기반의 구조화, 정보 가치 피칭, 3초 컷 분할 및 수치 시선 고정 등의 전략 설정..."
                  rows={4}
                  className="w-full p-4 rounded-xl bg-primary-50 border-primary-100 focus:outline-none text-xs font-medium text-primary-800 leading-relaxed"
                />
              </div>

              {/* Process */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-primary-700 block">구체적 수행 기법 (Process 단계) <span className="text-red-500">*</span></label>
                <textarea
                  value={formData.process}
                  onChange={(e) => setFormData({ ...formData, process: e.target.value })}
                  placeholder="디자인 시스템 가이드 에셋 배포, 템플릿 20종 빌더, 오디오 싱크 ASMR 가공..."
                  rows={4}
                  className="w-full p-4 rounded-xl bg-primary-50 border-primary-100 focus:outline-none text-xs font-medium text-primary-800 leading-relaxed"
                />
              </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Role */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-primary-700 block">나의 명확한 기여도 (Role)</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="예: 콘텐츠 기획 총괄 100%, 비주얼 디자인 제작 100%"
                  className="w-full px-4 py-3 rounded-xl bg-primary-50 border-primary-100 focus:outline-none text-xs text-primary-800 font-semibold"
                />
              </div>

              {/* Image URL & Local Upload */}
              <div className="space-y-3 col-span-1 md:col-span-2 bg-primary-50/40 p-5 rounded-2xl border border-primary-100">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <label className="text-xs font-bold text-primary-900 block">
                      포트폴리오 비주얼 이미지 (컴퓨터 이미지 업로드 / 여러장 추가 가능)
                    </label>
                    <p className="text-[10px] text-primary-400 font-medium">내 컴퓨터에 저장되어 있는 여러 개의 이미지를 함께 등록할 수 있습니다.</p>
                  </div>
                  <label className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary-950 hover:bg-primary-900 text-white rounded-lg text-xs font-bold cursor-pointer transition-all shrink-0">
                    <span>이미지 업로드</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => {
                        const files = e.target.files;
                        if (!files) return;

                        const loadedImages: string[] = [];
                        let processedCount = 0;

                        for (let i = 0; i < files.length; i++) {
                          const file = files[i];
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            if (typeof reader.result === 'string') {
                              loadedImages.push(reader.result);
                            }
                            processedCount++;
                            if (processedCount === files.length) {
                              setFormData(prev => {
                                const newUrls = [...(prev.imageUrls || []), ...loadedImages];
                                return {
                                  ...prev,
                                  imageUrl: prev.imageUrl || newUrls[0] || '',
                                  imageUrls: newUrls
                                };
                              });
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Optional Representative Cover Image URL input */}
                <div className="space-y-1.5 pt-1.5 border-t border-primary-100">
                  <span className="text-[10px] text-primary-500 font-bold block">또는 커버 이미지 외부 URL 입력 (Unsplash 등 주소 직접 입력 가능)</span>
                  <input
                    type="text"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full px-4 py-2 bg-white border border-primary-150 rounded-xl focus:outline-none text-xs text-primary-800 font-mono"
                  />
                </div>

                {/* Image gallery listing */}
                {formData.imageUrls && formData.imageUrls.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-primary-100">
                    <span className="text-[10px] text-primary-500 font-bold block">등록된 포트폴리오 이미지 ({formData.imageUrls.length}장) (삭제하려면 휴지통 버튼 클릭)</span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                      {formData.imageUrls.map((url, idx) => (
                        <div key={idx} className="relative aspect-video sm:aspect-square rounded-xl overflow-hidden border border-primary-200 group">
                          <img src={url} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
                          <div className="absolute inset-0 bg-primary-950/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                            <button
                              type="button"
                              onClick={() => {
                                setFormData(prev => {
                                  const updated = (prev.imageUrls || []).filter((_, i) => i !== idx);
                                  return {
                                    ...prev,
                                    imageUrl: prev.imageUrl === url ? (updated[0] || '') : prev.imageUrl,
                                    imageUrls: updated
                                  };
                                });
                              }}
                              className="p-1.5 rounded-full bg-red-600 hover:bg-red-700 hover:scale-105 text-white font-bold text-[10px] transition-all"
                            >
                              삭제
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Optional Video Upload or Link (Max 1 minute) */}
              <div className="space-y-3 col-span-1 md:col-span-2 bg-amber-50/10 p-5 rounded-2xl border border-amber-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <label className="text-xs font-bold text-amber-800 block flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      포트폴리오 첨부 동영상 (최대 1분 이내 동영상 업로드)
                    </label>
                    <p className="text-[10px] text-amber-600 font-medium">
                      영상 기반 포트폴리오를 위해 1분 이내의 동영상 파일(.mp4, .mov, .webm)을 선택 업로드할 수 있습니다.
                    </p>
                  </div>
                  <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold cursor-pointer transition-all shrink-0">
                    <span>비디오 파일 선택</span>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;

                        // Create video element to check play duration
                        const video = document.createElement('video');
                        video.preload = 'metadata';
                        video.onloadedmetadata = () => {
                          window.URL.revokeObjectURL(video.src);
                          if (video.duration > 60) {
                            alert("동영상의 길이는 최대 1분(60초) 이내여야 합니다.\n현재 선택하신 비디오 길이: " + Math.round(video.duration) + "초");
                            return;
                          }
                          
                          // Reader to read standard Base64
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            if (typeof reader.result === 'string') {
                              setFormData(prev => ({
                                ...prev,
                                videoUrl: reader.result as string
                              }));
                            }
                          };
                          reader.readAsDataURL(file);
                        };
                        video.src = URL.createObjectURL(file);
                      }}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* External Video Link url option */}
                <div className="space-y-1.5 pt-1.5 border-t border-amber-200/50">
                  <span className="text-[10px] text-amber-700 font-bold block">또는 외부 동영상 URL 직접 입력 (mp4, webm 주소 직접 입력 가능)</span>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formData.videoUrl || ''}
                      onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                      placeholder="예: https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
                      className="w-full px-4 py-2 bg-white border border-amber-200 rounded-xl focus:outline-none text-xs text-primary-800 font-mono"
                    />
                    {formData.videoUrl && (
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, videoUrl: '' })}
                        className="px-3 bg-red-50 hover:bg-red-100 text-red-500 rounded-lg text-xs font-bold transition-all cursor-pointer"
                      >
                        삭제
                      </button>
                    )}
                  </div>
                </div>

                {/* Preview active loaded video */}
                {formData.videoUrl && (
                  <div className="pt-3 border-t border-amber-200/40">
                    <span className="text-[10px] text-amber-700 font-bold block mb-1.5">첨부 영상 미리보기:</span>
                    <div className="aspect-video leading-none rounded-xl overflow-hidden max-w-sm bg-neutral-950 border border-amber-200">
                      <video src={formData.videoUrl} controls className="w-full h-full object-contain" />
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Checkbox for Case Study deep dive */}
            <div className="bg-primary-50/50 p-4 rounded-xl border border-primary-100 flex items-start gap-3">
              <input
                type="checkbox"
                id="isCaseStudy-checkbox"
                checked={formData.isCaseStudy}
                onChange={(e) => setFormData({ ...formData, isCaseStudy: e.target.checked })}
                className="w-4.5 h-4.5 text-accent rounded border-primary-300 mt-0.5 focus:ring-0"
              />
              <div className="space-y-1">
                <label htmlFor="isCaseStudy-checkbox" className="text-xs font-bold text-primary-800 cursor-pointer">
                  [핵심 분석서] 별도 Case Study 심층 기획 분석 페이지로 선정
                </label>
                <p className="text-[11px] text-primary-400 font-medium">
                  체크할 시, 해당 프로젝트 브랜딩 배경을 2단 상세 분석 레이아웃을 통해 깊게 설명합니다.
                </p>
              </div>
            </div>

            {/* Only rendering detailed fields if case study selected */}
            {formData.isCaseStudy && (
              <div className="border border-dashed border-primary-200 rounded-2xl p-6 space-y-6">
                <span className="text-xs font-bold text-accent tracking-wider uppercase block">
                  ★ 심도 분석 섹션 콘텐츠 (Case Study Only)
                </span>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Detailed Strategy */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-primary-700 block">디자인 결정 이론 및 전개 방향 (Solution Taxonomy)</label>
                    <textarea
                      value={formData.detailedStrategy}
                      onChange={(e) => setFormData({ ...formData, detailedStrategy: e.target.value })}
                      placeholder="사용한 보조 테라코타 색채 배리에이션, 자간 마진 설정, 광고 이질감을 걷어내고 보존적 질감을 지향한 배경 서술..."
                      rows={5}
                      className="w-full p-4 rounded-xl bg-primary-50 border-primary-100 focus:outline-none text-xs font-medium text-primary-800 leading-relaxed"
                    />
                  </div>

                  {/* Detailed Decisions */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-primary-700 block">그리드 템플릿 배포 및 최적화 메커니즘</label>
                    <textarea
                      value={formData.detailedDecision}
                      onChange={(e) => setFormData({ ...formData, detailedDecision: e.target.value })}
                      placeholder="디자이너 협업 없이 마켓 담당자가 직접 수정 가능한 템플릿 빌드 목적 및 유지 방식..."
                      rows={5}
                      className="w-full p-4 rounded-xl bg-primary-50 border-primary-100 focus:outline-none text-xs font-medium text-primary-800 leading-relaxed"
                    />
                  </div>

                </div>
              </div>
            )}

            {formError && (
              <p className="text-red-500 text-xs font-bold flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" />
                {formError}
              </p>
            )}

            <div className="pt-4 flex gap-3 border-t border-primary-100">
              <button
                type="submit"
                id="btn-admin-save"
                className="flex items-center gap-1.5 px-6 py-3.5 rounded-xl bg-primary-900 hover:bg-primary-800 text-white text-xs font-bold"
              >
                <Save className="w-4 h-4" /> 포트폴리오 저장 및 라이브 적용
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-5 py-3.5 rounded-xl border border-primary-200 text-primary-600 text-xs font-bold hover:bg-primary-50"
              >
                기록 취소
              </button>
            </div>
          </form>
        </div>
      ) : (
        <>
          {/* STATS VIEW */}
          {subTab === 'stats' && (
            <div className="space-y-8">
              
              {/* Dynamic stats cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                
                <div className="bg-white rounded-2xl border border-primary-100 p-6 premium-shadow">
                  <span className="text-xs text-primary-400 font-bold block uppercase mb-1">총 제안 포트폴리오</span>
                  <div className="text-3xl font-display font-extrabold text-primary-900">{projects.length}개</div>
                  <p className="text-[11px] text-primary-400 font-medium mt-1">지속 수정 및 론칭 진행 데이터</p>
                </div>

                <div className="bg-white rounded-2xl border border-primary-100 p-6 premium-shadow">
                  <span className="text-xs text-primary-400 font-bold block uppercase mb-1">접수된 프로젝트 의뢰</span>
                  <div className="text-3xl font-display font-extrabold text-accent">{inquiries.length}건</div>
                  <p className="text-[11px] text-accent font-bold mt-1">문의 폼 연동 완료 (상담 진행)</p>
                </div>

                <div className="bg-white rounded-2xl border border-primary-100 p-6 premium-shadow">
                  <span className="text-xs text-primary-400 font-bold block uppercase mb-1">신규 의뢰 확인 필요</span>
                  <div className="text-3xl font-display font-extrabold text-amber-500">
                    {inquiries.filter(i => i.status === 'new').length}건
                  </div>
                  <p className="text-[11px] text-amber-600 font-bold mt-1">전환 피칭이 필요한 의뢰</p>
                </div>

                <div className="bg-white rounded-2xl border border-primary-100 p-6 premium-shadow">
                  <span className="text-xs text-primary-400 font-bold block uppercase mb-1">카테고리 구성비</span>
                  <div className="text-sm font-semibold text-primary-800 space-y-1 mt-1">
                    <p className="flex justify-between"><span>시각디자인:</span> <strong>{projectSplits.visual}개</strong></p>
                    <p className="flex justify-between"><span>SNS 콘텐츠:</span> <strong>{projectSplits.sns}개</strong></p>
                    <p className="flex justify-between"><span>영상편집:</span> <strong>{projectSplits.video}개</strong></p>
                  </div>
                </div>

              </div>

              {/* Help Tips */}
              <div className="bg-primary-900 text-primary-200 rounded-3xl p-8 border border-primary-100 space-y-4">
                <div className="flex items-center gap-2 text-white">
                  <BarChart2 className="w-5 h-5 text-accent" />
                  <h3 className="font-sans font-bold text-base">제안서 관리 콘솔 전략 수칙</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs leading-relaxed font-medium text-primary-300">
                  <p>
                    <strong>1. Before 데이터 명세화:</strong> <br />
                    디자인을 맡기기 부끄러운 실질 단계를 적나라하게 수치형으로 적을수록, 클라이언트는 "이 디자이너가 나의 본질 고충을 이해하고 있다"는 강한 동질감을 느낍니다.
                  </p>
                  <p>
                    <strong>2. 명확한 Result 각인:</strong> <br />
                    예쁘다 뒤에 붙는 숫자가 중요합니다. 가입 전환율 상승치나 누적 조회수를 프로젝트마다 빠짐없이 기입하여 신뢰에 쐐기를 박으세요.
                  </p>
                  <p>
                    <strong>3. 실시간 문의 대응:</strong> <br />
                    오른쪽 클라이언트 문의서 클릭 시, 방문 고객이 남긴 예산, 일정, 메시지가 그대로 쌓입니다. 이메일 주소를 확인하여 빠른 역제안 메일을 회신하세요.
                  </p>
                </div>
              </div>

            </div>
          )}

          {/* PROJECTS ADMIN LIST (EDIT / DELETE) */}
          {subTab === 'projects' && (
            <div className="bg-white rounded-3xl border border-primary-100 overflow-hidden premium-shadow">
              <div className="px-6 py-4 bg-primary-50/60 border-b border-primary-100 flex justify-between items-center">
                <span className="text-xs font-bold text-primary-700 tracking-wider">포트폴리오 제안서 리스트</span>
                <span className="text-xs text-primary-400 font-medium">관리자 전용 삭제/수정 공정</span>
              </div>
              
              <div className="divide-y divide-primary-100">
                {projects.map((project, index) => (
                  <div key={project.id} className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:bg-primary-50/20 transition-all">
                    
                    <div className="flex items-center gap-4 max-w-2xl">
                      <div className="w-16 h-12 rounded bg-primary-100 overflow-hidden shrink-0">
                        <img src={project.imageUrl} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] uppercase font-bold text-accent bg-accent/5.5 px-2 py-0.5 rounded border border-accent/10">
                            {project.category === 'visual' ? '시각디자인' : project.category === 'sns' ? 'SNS 콘텐츠' : '영상편집'}
                          </span>
                          {project.isCaseStudy && (
                            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                              ★ Case Study 지명됨
                            </span>
                          )}
                        </div>
                        <h4 className="text-xs font-bold text-primary-800 line-clamp-1">{project.title}</h4>
                        <p className="text-[11px] text-primary-400 font-medium">{project.client} | {project.duration}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => startEdit(project)}
                        className="p-2 rounded bg-primary-100 text-primary-700 hover:bg-primary-200 hover:text-accent transition-all duration-200 cursor-pointer"
                        title="수정"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      
                      {projectToDelete === project.id ? (
                        <div className="flex items-center gap-1 bg-red-100 p-1 rounded-lg border border-red-200 animate-pulse shrink-0">
                          <span className="text-[9px] font-extrabold text-red-700 px-1">진짜 삭제할까요?</span>
                          <button
                            type="button"
                            onClick={() => {
                              deleteProject(project.id);
                              setProjectToDelete(null);
                            }}
                            className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-[10px] font-bold cursor-pointer transition-all"
                          >
                            예
                          </button>
                          <button
                            type="button"
                            onClick={() => setProjectToDelete(null)}
                            className="px-2 py-1 bg-primary-350 hover:bg-primary-400 text-primary-850 rounded text-[10px] font-bold cursor-pointer transition-all"
                          >
                            취소
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setProjectToDelete(project.id)}
                          className="p-2 rounded bg-red-50 text-red-600 hover:bg-red-100 transition-all duration-200 cursor-pointer"
                          title="삭제"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                  </div>
                ))}

                {projects.length === 0 && (
                  <div className="p-12 text-center text-primary-400 text-xs font-medium space-y-4">
                    <p>등록된 포트폴리오가 없습니다.</p>
                    <button
                      type="button"
                      onClick={startCreate}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-accent hover:bg-accent/90 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
                    >
                      <Plus className="w-4 h-4" /> 첫 포트폴리오 작업 추가하기
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* INQUIRIES VIEWER */}
          {subTab === 'inquiries' && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl border border-primary-100 overflow-hidden premium-shadow">
                
                <div className="px-6 py-4 bg-primary-50/60 border-b border-primary-100 flex justify-between items-center">
                  <span className="text-xs font-bold text-primary-700 tracking-wider">신규 유입 고객 의뢰서 함</span>
                  <span className="text-[11px] text-primary-400 font-medium">실시간 상담 설계 분석</span>
                </div>

                <div className="divide-y divide-primary-100">
                  {inquiries.map((inq) => (
                    <div key={inq.id} className="p-8 space-y-4 hover:bg-primary-50/25 transition-all">
                      
                      {/* Top bar info */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-extrabold text-primary-900 text-sm">
                            {inq.name} 대표님 / 담당자님
                          </span>
                          <span className="text-primary-300">|</span>
                          <span className="text-primary-400 font-medium">{inq.email}</span>
                          {inq.phone && (
                            <>
                              <span className="text-primary-300">|</span>
                              <span className="text-accent font-bold">연락처: {inq.phone}</span>
                            </>
                          )}
                          <span className="text-primary-300">|</span>
                          <span className="text-primary-400 font-medium">접수일: {inq.date}</span>
                        </div>
                        
                        {/* Status elements */}
                        <div className="flex items-center gap-2">
                          <select
                            value={inq.status}
                            onChange={(e) => updateInquiryStatus(inq.id, e.target.value as any)}
                            className={`px-2 py-1 rounded text-[10px] font-bold border ${
                              inq.status === 'new' ? 'bg-amber-50 text-amber-600 border-amber-200' :
                              inq.status === 'read' ? 'bg-blue-50 text-blue-600 border-blue-200' :
                              'bg-emerald-50 text-emerald-600 border-emerald-200'
                            }`}
                          >
                            <option value="new">신규 접수</option>
                            <option value="read">검토중</option>
                            <option value="replied">제안 메일 회신 완료</option>
                          </select>

                          {inquiryToDelete === inq.id ? (
                            <div className="flex items-center gap-1 bg-red-100 p-1 border border-red-200 rounded animate-pulse">
                              <span className="text-[9px] font-extrabold text-red-700 px-1">진짜 제거?</span>
                              <button
                                type="button"
                                onClick={() => {
                                  deleteInquiry(inq.id);
                                  setInquiryToDelete(null);
                                }}
                                className="px-2 py-0.5 bg-red-650 hover:bg-red-750 text-white rounded text-[9px] font-bold cursor-pointer transition-all"
                              >
                                예
                              </button>
                              <button
                                type="button"
                                onClick={() => setInquiryToDelete(null)}
                                className="px-2 py-0.5 bg-primary-200 hover:bg-primary-300 text-primary-750 rounded text-[9px] font-bold cursor-pointer transition-all"
                              >
                                취소
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setInquiryToDelete(inq.id)}
                              className="p-1 px-2.5 text-[10px] bg-red-50 text-red-600 hover:bg-red-100 rounded transition-all cursor-pointer font-bold"
                              title="의뢰 삭제"
                            >
                              제거
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Summary Tags */}
                      <div className="flex flex-wrap gap-2 text-[11px] font-medium pt-1">
                        <span className="px-2.5 py-1 rounded-md bg-primary-100 text-primary-700">
                          의뢰 유형: {getProjectTypeLabel(inq.projectType)}
                        </span>
                        <span className="px-2.5 py-1 rounded-md bg-accent/5 text-accent">
                          희망 예산: {getBudgetText(inq.budget)}
                        </span>
                        <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700">
                          희망 일정: {inq.timeline}
                        </span>
                      </div>

                      {/* Actual Client text message */}
                      <div className="bg-primary-50 rounded-xl p-4 text-xs font-medium text-primary-700 leading-relaxed max-w-4xl text-justify border border-primary-100">
                        "{inq.message}"
                      </div>

                    </div>
                  ))}

                  {inquiries.length === 0 && (
                    <div className="p-16 text-center text-primary-400 text-xs font-medium">
                      현재 등록되어 도달한 고객의 신규 의뢰서가 없습니다.
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}

          {/* HOMEPAGE SITE TEXTS MANAGEMENT PANEL */}
          {subTab === 'texts' && localTexts && (
            <div className="space-y-8">
              <div className="bg-white rounded-3xl border border-primary-100 p-8 sm:p-10 premium-shadow space-y-8">
                
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-primary-100 pb-5">
                  <div>
                    <h2 className="font-sans font-bold text-xl text-primary-900">홈페이지 텍스트 실시간 커스터마이징</h2>
                    <p className="text-xs text-primary-400 font-medium mt-1">
                      메인 화면에 배치되어 있는 모든 텍스트 및 레이블 문구를 직접 즉시 수정할 수 있습니다.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      updateSiteText(localTexts);
                      setIsSaved(true);
                      setTimeout(() => setIsSaved(false), 3000);
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-accent hover:bg-yellow-500 font-bold text-xs text-neutral-950 rounded-xl transition-all shadow-md shrink-0 cursor-pointer"
                  >
                    <Save className="w-4 h-4" /> 설정 저장 및 홈페이지 반영
                  </button>
                </div>

                {/* Save complete notification */}
                {isSaved && (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold flex items-center gap-2 animate-fade-in">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    홈페이지 구성 문구가 성공적으로 로컬 스토리지에 영구 저장 및 반영되었습니다! 메인 화면에서 확인하실 수 있습니다.
                  </div>
                )}

                {/* 페이지별 분할 카테고리 탭 선택기 */}
                <div className="space-y-3 bg-primary-50/50 p-4 rounded-2xl border border-primary-100">
                  <span className="text-xs font-extrabold text-primary-900 block font-sans">
                    📂 수정할 메뉴 페이지 선택
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'all', label: '전체보기' },
                      { id: 'common', label: '네비게이션 / 풋터 (공통)' },
                      { id: 'home', label: '홈 화면 (배너/지표/역량)' },
                      { id: 'about', label: '브랜드 소개 (About)' },
                      { id: 'works', label: '작품/포트폴리오 (Works)' },
                      { id: 'caseStudy', label: '사례연구 (Case Study)' },
                      { id: 'process', label: '작업 프로세스' },
                      { id: 'contact', label: '의뢰 및 문의 (Contact)' },
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setTextCategory(cat.id as any)}
                        className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          textCategory === cat.id
                            ? 'bg-primary-900 text-white shadow-sm'
                            : 'bg-white hover:bg-primary-100/50 text-primary-700 border border-primary-100/60'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Section 1: Hero Section */}
                {(textCategory === 'all' || textCategory === 'home') && (
                  <div className="space-y-6">
                    <div className="border-l-4 border-accent pl-3">
                      <h3 className="text-sm font-bold text-primary-900 block">1. 상단 블랙 히어로 배너</h3>
                      <p className="text-[10px] text-primary-400 font-medium">홈페이지 가장 첫 화면에 등장하는 메인 홍보 문구를 설정합니다.</p>
                    </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-primary-700 block">메인 텍스트 (가장 크고 굵게 표시)</label>
                      <input
                        type="text"
                        value={localTexts.heroMainTitle || ''}
                        onChange={(e) => setLocalTexts({ ...localTexts, heroMainTitle: e.target.value })}
                        placeholder="예: 둥근달스튜디오"
                        className="w-full px-4 py-3 bg-primary-50 rounded-xl border border-primary-100 focus:outline-none text-xs font-medium text-primary-800"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-primary-700 block">메인 텍스트 아래 영문 텍스트 (작은 크기)</label>
                      <input
                        type="text"
                        value={localTexts.heroMainTitleSub || ''}
                        onChange={(e) => setLocalTexts({ ...localTexts, heroMainTitleSub: e.target.value })}
                        placeholder="예: RDMOON STUDIO"
                        className="w-full px-4 py-3 bg-primary-50 rounded-xl border border-primary-100 focus:outline-none text-xs font-medium text-primary-800"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-primary-700 block">보름달 옆 메인 장식 배지</label>
                      <input
                        type="text"
                        value={localTexts.heroBadge}
                        onChange={(e) => setLocalTexts({ ...localTexts, heroBadge: e.target.value })}
                        className="w-full px-4 py-3 bg-primary-50 rounded-xl border border-primary-100 focus:outline-none text-xs font-medium text-primary-800"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-primary-700 block">메인 타이틀 글씨 (형광펜은 [HIGHLIGHT]로 표시)</label>
                      <input
                        type="text"
                        value={localTexts.heroTitle}
                        onChange={(e) => setLocalTexts({ ...localTexts, heroTitle: e.target.value })}
                        placeholder="예: 브랜드의 [HIGHLIGHT]를 시각과 콘텐츠로 설계하는 디자이너"
                        className="w-full px-4 py-3 bg-primary-50 rounded-xl border border-primary-100 focus:outline-none text-xs font-medium text-primary-800"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-primary-700 block">메인 타이틀 속 형광펜 하이라이트 글귀</label>
                      <input
                        type="text"
                        value={localTexts.heroTitleHighlight}
                        onChange={(e) => setLocalTexts({ ...localTexts, heroTitleHighlight: e.target.value })}
                        className="w-full px-4 py-3 bg-primary-50 rounded-xl border border-primary-100 focus:outline-none text-xs font-medium text-primary-800"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-primary-700 block">배너 하단 상세 설명 소개문</label>
                      <textarea
                        rows={3}
                        value={localTexts.heroSubtitle}
                        onChange={(e) => setLocalTexts({ ...localTexts, heroSubtitle: e.target.value })}
                        className="w-full px-4 py-3 bg-primary-50 rounded-xl border border-primary-100 focus:outline-none text-xs font-medium text-primary-800 leading-relaxed"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-primary-700 block">주요 핵심 전환 문의 버튼 문구 (CTA)</label>
                      <input
                        type="text"
                        value={localTexts.heroCtaText}
                        onChange={(e) => setLocalTexts({ ...localTexts, heroCtaText: e.target.value })}
                        className="w-full px-4 py-3 bg-primary-50 rounded-xl border border-primary-100 focus:outline-none text-xs font-medium text-primary-800"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-primary-700 block">보조 포트폴리오 유도 버튼 문구</label>
                      <input
                        type="text"
                        value={localTexts.heroSecondaryCtaText}
                        onChange={(e) => setLocalTexts({ ...localTexts, heroSecondaryCtaText: e.target.value })}
                        className="w-full px-4 py-3 bg-primary-50 rounded-xl border border-primary-100 focus:outline-none text-xs font-medium text-primary-800"
                      />
                    </div>
                  </div>
                </div>
                )}

                {/* Section 2: Metrics */}
                {(textCategory === 'all' || textCategory === 'home') && (
                  <div className="space-y-6 pt-6 border-t border-primary-100">
                  <div className="border-l-4 border-accent pl-3">
                    <h3 className="text-sm font-bold text-primary-900 block">2. 정량 성과 지표 카드 (3종 개별 데이터)</h3>
                    <p className="text-[10px] text-primary-400 font-medium">홈페이지 지표를 실시간 카운트하게 만드는 성과 데이터값과 부가설명입니다.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Metric 1 */}
                    <div className="bg-primary-50/50 p-5 rounded-2xl border border-primary-100 space-y-3">
                      <span className="text-[10px] uppercase tracking-wider text-accent font-bold">지표 카드 #1</span>
                      
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-primary-600 block">영문 카테고리 레이블</label>
                        <input
                          type="text"
                          value={localTexts.metric1Label}
                          onChange={(e) => setLocalTexts({ ...localTexts, metric1Label: e.target.value })}
                          className="w-full px-3 py-2 bg-white rounded-lg border border-primary-150 focus:outline-none text-xs font-medium text-primary-800"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-primary-600 block font-mono">정량적 수치값 (숫자만)</label>
                        <input
                          type="number"
                          value={localTexts.metric1Value}
                          onChange={(e) => setLocalTexts({ ...localTexts, metric1Value: Number(e.target.value) })}
                          className="w-full px-3 py-2 bg-white rounded-lg border border-primary-150 focus:outline-none text-xs font-medium text-primary-800"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-primary-600 block">접미사 (예: 개사, %, 건+)</label>
                        <input
                          type="text"
                          value={localTexts.metric1Suffix}
                          onChange={(e) => setLocalTexts({ ...localTexts, metric1Suffix: e.target.value })}
                          className="w-full px-3 py-2 bg-white rounded-lg border border-primary-150 focus:outline-none text-xs font-medium text-primary-800"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-primary-600 block">하단 수치 입증 상세 설명글</label>
                        <input
                          type="text"
                          value={localTexts.metric1Subtext}
                          onChange={(e) => setLocalTexts({ ...localTexts, metric1Subtext: e.target.value })}
                          className="w-full px-3 py-2 bg-white rounded-lg border border-primary-150 focus:outline-none text-xs font-medium text-primary-800"
                        />
                      </div>
                    </div>

                    {/* Metric 2 */}
                    <div className="bg-primary-50/50 p-5 rounded-2xl border border-primary-100 space-y-3">
                      <span className="text-[10px] uppercase tracking-wider text-accent font-bold">지표 카드 #2</span>
                      
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-primary-600 block">영문 카테고리 레이블</label>
                        <input
                          type="text"
                          value={localTexts.metric2Label}
                          onChange={(e) => setLocalTexts({ ...localTexts, metric2Label: e.target.value })}
                          className="w-full px-3 py-2 bg-white rounded-lg border border-primary-150 focus:outline-none text-xs font-medium text-primary-800"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-primary-600 block font-mono">정량적 수치값 (숫자만)</label>
                        <input
                          type="number"
                          value={localTexts.metric2Value}
                          onChange={(e) => setLocalTexts({ ...localTexts, metric2Value: Number(e.target.value) })}
                          className="w-full px-3 py-2 bg-white rounded-lg border border-primary-150 focus:outline-none text-xs font-medium text-primary-800"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-primary-600 block">접미사</label>
                        <input
                          type="text"
                          value={localTexts.metric2Suffix}
                          onChange={(e) => setLocalTexts({ ...localTexts, metric2Suffix: e.target.value })}
                          className="w-full px-3 py-2 bg-white rounded-lg border border-primary-150 focus:outline-none text-xs font-medium text-primary-800"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-primary-600 block">하단 수치 입증 상세 설명글</label>
                        <input
                          type="text"
                          value={localTexts.metric2Subtext}
                          onChange={(e) => setLocalTexts({ ...localTexts, metric2Subtext: e.target.value })}
                          className="w-full px-3 py-2 bg-white rounded-lg border border-primary-150 focus:outline-none text-xs font-medium text-primary-800"
                        />
                      </div>
                    </div>

                    {/* Metric 3 */}
                    <div className="bg-primary-50/50 p-5 rounded-2xl border border-primary-100 space-y-3">
                      <span className="text-[10px] uppercase tracking-wider text-accent font-bold">지표 카드 #3</span>
                      
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-primary-600 block">영문 카테고리 레이블</label>
                        <input
                          type="text"
                          value={localTexts.metric3Label}
                          onChange={(e) => setLocalTexts({ ...localTexts, metric3Label: e.target.value })}
                          className="w-full px-3 py-2 bg-white rounded-lg border border-primary-150 focus:outline-none text-xs font-medium text-primary-800"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-primary-600 block font-mono">정량적 수치값 (숫자만)</label>
                        <input
                          type="number"
                          value={localTexts.metric3Value}
                          onChange={(e) => setLocalTexts({ ...localTexts, metric3Value: Number(e.target.value) })}
                          className="w-full px-3 py-2 bg-white rounded-lg border border-primary-150 focus:outline-none text-xs font-medium text-primary-800"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-primary-600 block">접미사</label>
                        <input
                          type="text"
                          value={localTexts.metric3Suffix}
                          onChange={(e) => setLocalTexts({ ...localTexts, metric3Suffix: e.target.value })}
                          className="w-full px-3 py-2 bg-white rounded-lg border border-primary-150 focus:outline-none text-xs font-medium text-primary-800"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-primary-600 block">하단 수치 입증 상세 설명글</label>
                        <input
                          type="text"
                          value={localTexts.metric3Subtext}
                          onChange={(e) => setLocalTexts({ ...localTexts, metric3Subtext: e.target.value })}
                          className="w-full px-3 py-2 bg-white rounded-lg border border-primary-150 focus:outline-none text-xs font-medium text-primary-800"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                )}

                {/* Section 3: Capabilities */}
                {(textCategory === 'all' || textCategory === 'home') && (
                  <div className="space-y-6 pt-6 border-t border-primary-100">
                  <div className="border-l-4 border-accent pl-3">
                    <h3 className="text-sm font-bold text-primary-900 block">3. 전문 해결 영역 분류 타이틀 & 카드뉴스</h3>
                    <p className="text-[10px] text-primary-400 font-medium">메인 홈페이지의 세 종류 역량 구분 카드(시각디자인, SNS 콘텐츠, 영상편집)의 설명글을 맞춤화합니다.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-primary-700 block">능력 영역 상단 배지 레이블</label>
                      <input
                        type="text"
                        value={localTexts.capBadge}
                        onChange={(e) => setLocalTexts({ ...localTexts, capBadge: e.target.value })}
                        className="w-full px-4 py-3 bg-primary-50 rounded-xl border border-primary-100 focus:outline-none text-xs font-medium text-primary-800"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-primary-700 block">능력 영역 전체 제목</label>
                      <input
                        type="text"
                        value={localTexts.capTitle}
                        onChange={(e) => setLocalTexts({ ...localTexts, capTitle: e.target.value })}
                        className="w-full px-4 py-3 bg-primary-50 rounded-xl border border-primary-100 focus:outline-none text-xs font-medium text-primary-800"
                      />
                    </div>

                    <div className="space-y-1.5 md:col-span-3">
                      <label className="text-xs font-bold text-primary-700 block">능력 영역 전체 안내 보조글</label>
                      <input
                        type="text"
                        value={localTexts.capDesc}
                        onChange={(e) => setLocalTexts({ ...localTexts, capDesc: e.target.value })}
                        className="w-full px-4 py-3 bg-primary-50 rounded-xl border border-primary-100 focus:outline-none text-xs font-medium text-primary-800"
                      />
                    </div>

                    {/* Column Card 1 */}
                    <div className="p-4 rounded-xl bg-blue-50/40 border border-blue-100 space-y-3">
                      <span className="text-[10px] font-bold text-blue-600 block">카드 #1 (시각디자인)</span>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-primary-600 block">기능 제목</label>
                        <input
                          type="text"
                          value={localTexts.capCard1Title}
                          onChange={(e) => setLocalTexts({ ...localTexts, capCard1Title: e.target.value })}
                          className="w-full px-3 py-2 bg-white rounded-lg border border-primary-150 focus:outline-none text-xs text-primary-800 font-bold"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-primary-600 block">설명 문장</label>
                        <textarea
                          rows={2}
                          value={localTexts.capCard1Desc}
                          onChange={(e) => setLocalTexts({ ...localTexts, capCard1Desc: e.target.value })}
                          className="w-full px-3 py-2 bg-white rounded-lg border border-primary-150 focus:outline-none text-xs text-primary-800 font-medium leading-relaxed"
                        />
                      </div>
                    </div>

                    {/* Column Card 2 */}
                    <div className="p-4 rounded-xl bg-violet-50/40 border border-violet-100 space-y-3">
                      <span className="text-[10px] font-bold text-violet-600 block">카드 #2 (SNS 콘텐츠)</span>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-primary-600 block">기능 제목</label>
                        <input
                          type="text"
                          value={localTexts.capCard2Title}
                          onChange={(e) => setLocalTexts({ ...localTexts, capCard2Title: e.target.value })}
                          className="w-full px-3 py-2 bg-white rounded-lg border border-primary-150 focus:outline-none text-xs text-primary-800 font-bold"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-primary-600 block">설명 문장</label>
                        <textarea
                          rows={2}
                          value={localTexts.capCard2Desc}
                          onChange={(e) => setLocalTexts({ ...localTexts, capCard2Desc: e.target.value })}
                          className="w-full px-3 py-2 bg-white rounded-lg border border-primary-150 focus:outline-none text-xs text-primary-800 font-medium leading-relaxed"
                        />
                      </div>
                    </div>

                    {/* Column Card 3 */}
                    <div className="p-4 rounded-xl bg-amber-50/40 border border-amber-100 space-y-3">
                      <span className="text-[10px] font-bold text-amber-600 block">카드 #3 (영상편집)</span>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-primary-600 block">기능 제목</label>
                        <input
                          type="text"
                          value={localTexts.capCard3Title}
                          onChange={(e) => setLocalTexts({ ...localTexts, capCard3Title: e.target.value })}
                          className="w-full px-3 py-2 bg-white rounded-lg border border-primary-150 focus:outline-none text-xs text-primary-800 font-bold"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-primary-600 block">설명 문장</label>
                        <textarea
                          rows={2}
                          value={localTexts.capCard3Desc}
                          onChange={(e) => setLocalTexts({ ...localTexts, capCard3Desc: e.target.value })}
                          className="w-full px-3 py-2 bg-white rounded-lg border border-primary-150 focus:outline-none text-xs text-primary-800 font-medium leading-relaxed"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                )}

                {/* Section 4: Highlights Show */}
                {(textCategory === 'all' || textCategory === 'home') && (
                  <div className="space-y-6 pt-6 border-t border-primary-100">
                  <div className="border-l-4 border-accent pl-3">
                    <h3 className="text-sm font-bold text-primary-900 block">4. 대표 해결 성과물 리스트 헤더</h3>
                    <p className="text-[10px] text-primary-400 font-medium">클라이언트 사례 요약 및 대표 프로젝트 그리드 바로 직전 문구를 설정합니다.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-primary-700 block">전시 쇼케이스 배지 레이블</label>
                      <input
                        type="text"
                        value={localTexts.featBadge}
                        onChange={(e) => setLocalTexts({ ...localTexts, featBadge: e.target.value })}
                        className="w-full px-4 py-3 bg-primary-50 rounded-xl border border-primary-100 focus:outline-none text-xs font-medium text-primary-800"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-primary-700 block">전시 메인 타이틀</label>
                      <input
                        type="text"
                        value={localTexts.featTitle}
                        onChange={(e) => setLocalTexts({ ...localTexts, featTitle: e.target.value })}
                        className="w-full px-4 py-3 bg-primary-50 rounded-xl border border-primary-100 focus:outline-none text-xs font-medium text-primary-800"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-primary-700 block">전시 하단 가이드 보조글</label>
                      <input
                        type="text"
                        value={localTexts.featDesc}
                        onChange={(e) => setLocalTexts({ ...localTexts, featDesc: e.target.value })}
                        className="w-full px-4 py-3 bg-primary-50 rounded-xl border border-primary-100 focus:outline-none text-xs font-medium text-primary-800"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-primary-700 block">전체 작품 이동 바로가기 링크 명</label>
                      <input
                        type="text"
                        value={localTexts.featCtaText || ''}
                        onChange={(e) => setLocalTexts({ ...localTexts, featCtaText: e.target.value })}
                        className="w-full px-4 py-3 bg-primary-50 rounded-xl border border-primary-100 focus:outline-none text-xs font-medium text-primary-800"
                      />
                    </div>
                  </div>
                </div>
                )}

                {/* Section 5: Menu & Header Brand info */}
                {(textCategory === 'all' || textCategory === 'common') && (
                  <div className="space-y-6 pt-6 border-t border-primary-100">
                  <div className="border-l-4 border-accent pl-3">
                    <h3 className="text-sm font-bold text-primary-900 block">5. 헤더 상단 네비게이션 메뉴 및 브랜드 로고 명칭</h3>
                    <p className="text-[10px] text-primary-400 font-medium font-sans">웹사이트 구석구석 퍼져있는 탭 이름과 로고 텍스트를 커스터마이징합니다.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-primary-700 block">로고 요약 캐릭터 (예: 둥)</label>
                      <input
                        type="text"
                        value={localTexts.menuLogo || ''}
                        onChange={(e) => setLocalTexts({ ...localTexts, menuLogo: e.target.value })}
                        className="w-full px-4 py-3 bg-primary-50 rounded-xl border border-primary-100 focus:outline-none text-xs font-medium text-primary-800"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-primary-700 block">로고 메인 브랜드명 (예: 둥근달스튜디오)</label>
                      <input
                        type="text"
                        value={localTexts.menuTitle || ''}
                        onChange={(e) => setLocalTexts({ ...localTexts, menuTitle: e.target.value })}
                        className="w-full px-4 py-3 bg-primary-50 rounded-xl border border-primary-100 focus:outline-none text-xs font-medium text-primary-800"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-primary-700 block">로고 영문서브 타이틀 (예: Round Moon Design Studio)</label>
                      <input
                        type="text"
                        value={localTexts.menuSubTitle || ''}
                        onChange={(e) => setLocalTexts({ ...localTexts, menuSubTitle: e.target.value })}
                        className="w-full px-4 py-3 bg-primary-50 rounded-xl border border-primary-100 focus:outline-none text-xs font-medium text-primary-800"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-primary-700 block">헤더 핵심 문의하기 버튼 문구 (예: 프로젝트 문의하기)</label>
                      <input
                        type="text"
                        value={localTexts.menuContact || ''}
                        onChange={(e) => setLocalTexts({ ...localTexts, menuContact: e.target.value })}
                        className="w-full px-4 py-3 bg-primary-50 rounded-xl border border-primary-100 focus:outline-none text-xs font-medium text-primary-800"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-primary-700 block">메뉴 #1 (Home)</label>
                      <input
                        type="text"
                        value={localTexts.menuHome || ''}
                        onChange={(e) => setLocalTexts({ ...localTexts, menuHome: e.target.value })}
                        className="w-full px-4 py-3 bg-primary-50 rounded-xl border border-primary-100 focus:outline-none text-xs font-medium text-primary-800"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-primary-700 block">메뉴 #2 (About)</label>
                      <input
                        type="text"
                        value={localTexts.menuAbout || ''}
                        onChange={(e) => setLocalTexts({ ...localTexts, menuAbout: e.target.value })}
                        className="w-full px-4 py-3 bg-primary-50 rounded-xl border border-primary-100 focus:outline-none text-xs font-medium text-primary-800"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-primary-700 block">메뉴 #3 (Works)</label>
                      <input
                        type="text"
                        value={localTexts.menuWorks || ''}
                        onChange={(e) => setLocalTexts({ ...localTexts, menuWorks: e.target.value })}
                        className="w-full px-4 py-3 bg-primary-50 rounded-xl border border-primary-100 focus:outline-none text-xs font-medium text-primary-800"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-primary-700 block">메뉴 #4 (Case Study)</label>
                      <input
                        type="text"
                        value={localTexts.menuCaseStudy || ''}
                        onChange={(e) => setLocalTexts({ ...localTexts, menuCaseStudy: e.target.value })}
                        className="w-full px-4 py-3 bg-primary-50 rounded-xl border border-primary-100 focus:outline-none text-xs font-medium text-primary-800"
                      />
                    </div>
                  </div>
                </div>
                )}

                {/* Section 6: About Sub-page text blocks */}
                {(textCategory === 'all' || textCategory === 'about') && (
                  <div className="space-y-6 pt-6 border-t border-primary-100">
                  <div className="border-l-4 border-accent pl-3">
                    <h3 className="text-sm font-bold text-primary-900 block">6. "About" 소개 페이지 상세 텍스트</h3>
                    <p className="text-[10px] text-primary-400 font-medium">소개 페이지의 선언 헤드라인, 3단계 작업공정, 핵심역량 문장을 편집합니다.</p>
                  </div>

                  <div className="grid grid-cols-1 gap-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-primary-700 block">상단 선언 장식 배지</label>
                        <input
                          type="text"
                          value={localTexts.aboutBadge || ''}
                          onChange={(e) => setLocalTexts({ ...localTexts, aboutBadge: e.target.value })}
                          className="w-full px-4 py-3 bg-primary-50 rounded-xl border border-primary-100 focus:outline-none text-xs font-medium text-primary-800"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-primary-700 block">소개 메인 큰 헤딩 (줄바꿈 가능, 따옴표 포함)</label>
                        <input
                          type="text"
                          value={localTexts.aboutHeading || ''}
                          onChange={(e) => setLocalTexts({ ...localTexts, aboutHeading: e.target.value })}
                          className="w-full px-4 py-3 bg-primary-50 rounded-xl border border-primary-100 focus:outline-none text-xs font-medium text-primary-800"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-primary-700 block">소개 본문 전체 문단</label>
                      <textarea
                        rows={4}
                        value={localTexts.aboutDesc || ''}
                        onChange={(e) => setLocalTexts({ ...localTexts, aboutDesc: e.target.value })}
                        className="w-full px-4 py-3 bg-primary-50 rounded-xl border border-primary-100 focus:outline-none text-xs font-medium text-primary-800 leading-relaxed text-justify"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-primary-700 block">우측 역할(ROLE) 설명 헤더</label>
                        <input
                          type="text"
                          value={localTexts.aboutRoleLabel || ''}
                          onChange={(e) => setLocalTexts({ ...localTexts, aboutRoleLabel: e.target.value })}
                          className="w-full px-4 py-3 bg-primary-50 rounded-xl border border-primary-100 focus:outline-none text-xs font-medium text-primary-800"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-primary-700 block">우측 역할(ROLE) 구체 기재 값</label>
                        <input
                          type="text"
                          value={localTexts.aboutRoleVal || ''}
                          onChange={(e) => setLocalTexts({ ...localTexts, aboutRoleVal: e.target.value })}
                          className="w-full px-4 py-3 bg-primary-50 rounded-xl border border-primary-100 focus:outline-none text-xs font-medium text-primary-800"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-primary-700 block">우측 철학(PHILOSOPHY) 설명 헤더</label>
                        <input
                          type="text"
                          value={localTexts.aboutPhilosophyLabel || ''}
                          onChange={(e) => setLocalTexts({ ...localTexts, aboutPhilosophyLabel: e.target.value })}
                          className="w-full px-4 py-3 bg-primary-50 rounded-xl border border-primary-100 focus:outline-none text-xs font-medium text-primary-800"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-primary-700 block">우측 철학(PHILOSOPHY) 구체 기재 값</label>
                        <input
                          type="text"
                          value={localTexts.aboutPhilosophyVal || ''}
                          onChange={(e) => setLocalTexts({ ...localTexts, aboutPhilosophyVal: e.target.value })}
                          className="w-full px-4 py-3 bg-primary-50 rounded-xl border border-primary-100 focus:outline-none text-xs font-medium text-primary-800"
                        />
                      </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-dashed border-primary-150">
                      <span className="text-xs font-bold text-primary-850 block">▼ [HOW I WORK] 3단계 설계 공정</span>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-primary-600 block">공정 영역 배지</label>
                          <input
                            type="text"
                            value={localTexts.aboutMethodBadge || ''}
                            onChange={(e) => setLocalTexts({ ...localTexts, aboutMethodBadge: e.target.value })}
                            className="w-full px-3 py-2 bg-primary-50 rounded-xl border border-primary-100 text-xs text-primary-800"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-primary-600 block">공정 전체 타이틀</label>
                          <input
                            type="text"
                            value={localTexts.aboutMethodTitle || ''}
                            onChange={(e) => setLocalTexts({ ...localTexts, aboutMethodTitle: e.target.value })}
                            className="w-full px-3 py-2 bg-primary-50 rounded-xl border border-primary-100 text-xs text-primary-800"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-primary-600 block">공정 가이드 보조설명</label>
                          <input
                            type="text"
                            value={localTexts.aboutMethodDesc || ''}
                            onChange={(e) => setLocalTexts({ ...localTexts, aboutMethodDesc: e.target.value })}
                            className="w-full px-3 py-2 bg-primary-50 rounded-xl border border-primary-100 text-xs text-primary-800"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
                        {/* Process Step 1 */}
                        <div className="p-4 rounded-xl bg-orange-50/40 border border-orange-100 space-y-3">
                          <span className="text-[10px] font-bold text-orange-600 block">01 단계</span>
                          <div className="space-y-1">
                            <label className="text-[9px] font-bold text-primary-500">단계 제목</label>
                            <input
                              type="text"
                              value={localTexts.aboutStep1Title || ''}
                              onChange={(e) => setLocalTexts({ ...localTexts, aboutStep1Title: e.target.value })}
                              className="w-full px-2 py-1.5 bg-white border border-primary-150 rounded text-xs text-primary-800 font-bold"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[9px] font-bold text-primary-500">단계 요약태그 명</label>
                            <input
                              type="text"
                              value={localTexts.aboutStep1Tag || ''}
                              onChange={(e) => setLocalTexts({ ...localTexts, aboutStep1Tag: e.target.value })}
                              className="w-full px-2 py-1.5 bg-white border border-primary-150 rounded text-xs text-primary-850"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[9px] font-bold text-primary-500">상세 설명</label>
                            <textarea
                              rows={3}
                              value={localTexts.aboutStep1Desc || ''}
                              onChange={(e) => setLocalTexts({ ...localTexts, aboutStep1Desc: e.target.value })}
                              className="w-full px-2 py-1.5 bg-white border border-primary-150 rounded text-xs text-primary-700 font-medium leading-relaxed"
                            />
                          </div>
                        </div>

                        {/* Process Step 2 */}
                        <div className="p-4 rounded-xl bg-indigo-50/40 border border-indigo-100 space-y-3">
                          <span className="text-[10px] font-bold text-indigo-600 block">02 단계</span>
                          <div className="space-y-1">
                            <label className="text-[9px] font-bold text-primary-500">단계 제목</label>
                            <input
                              type="text"
                              value={localTexts.aboutStep2Title || ''}
                              onChange={(e) => setLocalTexts({ ...localTexts, aboutStep2Title: e.target.value })}
                              className="w-full px-2 py-1.5 bg-white border border-primary-150 rounded text-xs text-primary-800 font-bold"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[9px] font-bold text-primary-500">단계 요약태그 명</label>
                            <input
                              type="text"
                              value={localTexts.aboutStep2Tag || ''}
                              onChange={(e) => setLocalTexts({ ...localTexts, aboutStep2Tag: e.target.value })}
                              className="w-full px-2 py-1.5 bg-white border border-primary-150 rounded text-xs text-primary-850"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[9px] font-bold text-primary-500">상세 설명</label>
                            <textarea
                              rows={3}
                              value={localTexts.aboutStep2Desc || ''}
                              onChange={(e) => setLocalTexts({ ...localTexts, aboutStep2Desc: e.target.value })}
                              className="w-full px-2 py-1.5 bg-white border border-primary-150 rounded text-xs text-primary-700 font-medium leading-relaxed"
                            />
                          </div>
                        </div>

                        {/* Process Step 3 */}
                        <div className="p-4 rounded-xl bg-emerald-50/40 border border-emerald-100 space-y-3">
                          <span className="text-[10px] font-bold text-emerald-600 block">03 단계</span>
                          <div className="space-y-1">
                            <label className="text-[9px] font-bold text-primary-500">단계 제목</label>
                            <input
                              type="text"
                              value={localTexts.aboutStep3Title || ''}
                              onChange={(e) => setLocalTexts({ ...localTexts, aboutStep3Title: e.target.value })}
                              className="w-full px-2 py-1.5 bg-white border border-primary-150 rounded text-xs text-primary-800 font-bold"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[9px] font-bold text-primary-500">단계 요약태그 명</label>
                            <input
                              type="text"
                              value={localTexts.aboutStep3Tag || ''}
                              onChange={(e) => setLocalTexts({ ...localTexts, aboutStep3Tag: e.target.value })}
                              className="w-full px-2 py-1.5 bg-white border border-primary-150 rounded text-xs text-primary-850"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[9px] font-bold text-primary-500">상세 설명</label>
                            <textarea
                              rows={3}
                              value={localTexts.aboutStep3Desc || ''}
                              onChange={(e) => setLocalTexts({ ...localTexts, aboutStep3Desc: e.target.value })}
                              className="w-full px-2 py-1.5 bg-white border border-primary-150 rounded text-xs text-primary-700 font-medium leading-relaxed"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-dashed border-primary-150">
                      <span className="text-xs font-bold text-primary-850 block">▼ [CORE COMPETENCIES] 핵심 역량 3요소</span>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-primary-600 block">역량 섹션 배지</label>
                          <input
                            type="text"
                            value={localTexts.aboutCompBadge || ''}
                            onChange={(e) => setLocalTexts({ ...localTexts, aboutCompBadge: e.target.value })}
                            className="w-full px-3 py-2 bg-primary-50 rounded-xl border border-primary-100 text-xs text-primary-800 font-bold"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-primary-600 block">역량 섹션 메인제목</label>
                          <input
                            type="text"
                            value={localTexts.aboutCompTitle || ''}
                            onChange={(e) => setLocalTexts({ ...localTexts, aboutCompTitle: e.target.value })}
                            className="w-full px-3 py-2 bg-primary-50 rounded-xl border border-primary-100 text-xs text-primary-800 font-bold"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
                        {/* Competency 1 */}
                        <div className="p-4 rounded-xl bg-primary-50/50 border border-primary-150 space-y-3">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-primary-650">첫 번째 역량 타이틀</label>
                            <input
                              type="text"
                              value={localTexts.aboutCompCard1Title || ''}
                              onChange={(e) => setLocalTexts({ ...localTexts, aboutCompCard1Title: e.target.value })}
                              className="w-full px-2.5 py-1.5 bg-white border border-primary-150 rounded text-xs text-primary-800 font-bold"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-primary-650">상세 설명글</label>
                            <textarea
                              rows={3}
                              value={localTexts.aboutCompCard1Desc || ''}
                              onChange={(e) => setLocalTexts({ ...localTexts, aboutCompCard1Desc: e.target.value })}
                              className="w-full px-2.5 py-1.5 bg-white border border-primary-150 rounded text-xs text-primary-700 font-medium"
                            />
                          </div>
                        </div>

                        {/* Competency 2 */}
                        <div className="p-4 rounded-xl bg-primary-50/50 border border-primary-150 space-y-3">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-primary-650">두 번째 역량 타이틀</label>
                            <input
                              type="text"
                              value={localTexts.aboutCompCard2Title || ''}
                              onChange={(e) => setLocalTexts({ ...localTexts, aboutCompCard2Title: e.target.value })}
                              className="w-full px-2.5 py-1.5 bg-white border border-primary-150 rounded text-xs text-primary-800 font-bold"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-primary-650">상세 설명글</label>
                            <textarea
                              rows={3}
                              value={localTexts.aboutCompCard2Desc || ''}
                              onChange={(e) => setLocalTexts({ ...localTexts, aboutCompCard2Desc: e.target.value })}
                              className="w-full px-2.5 py-1.5 bg-white border border-primary-150 rounded text-xs text-primary-700 font-medium"
                            />
                          </div>
                        </div>

                        {/* Competency 3 */}
                        <div className="p-4 rounded-xl bg-primary-50/50 border border-primary-150 space-y-3">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-primary-650">세 번째 역량 타이틀</label>
                            <input
                              type="text"
                              value={localTexts.aboutCompCard3Title || ''}
                              onChange={(e) => setLocalTexts({ ...localTexts, aboutCompCard3Title: e.target.value })}
                              className="w-full px-2.5 py-1.5 bg-white border border-primary-150 rounded text-xs text-primary-800 font-bold"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-primary-650">상세 설명글</label>
                            <textarea
                              rows={3}
                              value={localTexts.aboutCompCard3Desc || ''}
                              onChange={(e) => setLocalTexts({ ...localTexts, aboutCompCard3Desc: e.target.value })}
                              className="w-full px-2.5 py-1.5 bg-white border border-primary-150 rounded text-xs text-primary-700 font-medium"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-dashed border-primary-150 grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-primary-700 block">전문 도구 영역 타이틀 (예: 전문 설계에 투입되는 도구들)</label>
                        <input
                          type="text"
                          value={localTexts.aboutToolTitle || ''}
                          onChange={(e) => setLocalTexts({ ...localTexts, aboutToolTitle: e.target.value })}
                          className="w-full px-4 py-3 bg-primary-50 rounded-xl border border-primary-100 focus:outline-none text-xs font-medium text-primary-800"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-primary-700 block">전문 도구 영역 보조 가이드 설명글</label>
                        <input
                          type="text"
                          value={localTexts.aboutToolDesc || ''}
                          onChange={(e) => setLocalTexts({ ...localTexts, aboutToolDesc: e.target.value })}
                          className="w-full px-4 py-3 bg-primary-50 rounded-xl border border-primary-100 focus:outline-none text-xs font-medium text-primary-800"
                        />
                      </div>

                      <div className="space-y-1.5 md:col-span-2">
                        <label className="text-xs font-bold text-primary-700 block">하단 블랙 슬로건 격언 문단</label>
                        <textarea
                          rows={2}
                          value={localTexts.aboutPromoQuote || ''}
                          onChange={(e) => setLocalTexts({ ...localTexts, aboutPromoQuote: e.target.value })}
                          className="w-full px-4 py-3 bg-primary-50 rounded-xl border border-primary-100 focus:outline-none text-xs font-medium text-primary-800 leading-relaxed"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-primary-700 block">격언 하단 출처 표시명 (예: - COMPOSITION FIRST)</label>
                        <input
                          type="text"
                          value={localTexts.aboutPromoRef || ''}
                          onChange={(e) => setLocalTexts({ ...localTexts, aboutPromoRef: e.target.value })}
                          className="w-full px-4 py-3 bg-primary-50 rounded-xl border border-primary-100 focus:outline-none text-xs font-medium text-primary-800"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-primary-700 block">About 최하단 문의 행동 유도 버튼 글씨</label>
                        <input
                          type="text"
                          value={localTexts.aboutCtaText || ''}
                          onChange={(e) => setLocalTexts({ ...localTexts, aboutCtaText: e.target.value })}
                          className="w-full px-4 py-3 bg-primary-50 rounded-xl border border-primary-100 focus:outline-none text-xs font-medium text-primary-800"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                )}

                {/* Section 7: Works Sub-page text blocks */}
                {(textCategory === 'all' || textCategory === 'works') && (
                  <div className="space-y-6 pt-6 border-t border-primary-100">
                  <div className="border-l-4 border-accent pl-3">
                    <h3 className="text-sm font-bold text-primary-900 block">7. "Works" 포트폴리오 리스트 페이지 텍스트</h3>
                    <p className="text-[10px] text-primary-400 font-medium">작업 모음 페이지 상단의 소개 및 하단의 정량 진단 제안 무료 보고서 CTA 카드를 편집합니다.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-primary-700 block">페이지 헤더 배지 (예: RESULT PORTFOLIOS)</label>
                      <input
                        type="text"
                        value={localTexts.worksBadge || ''}
                        onChange={(e) => setLocalTexts({ ...localTexts, worksBadge: e.target.value })}
                        className="w-full px-4 py-3 bg-primary-50 rounded-xl border border-primary-100 focus:outline-none text-xs font-medium text-primary-800"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-primary-700 block">페이지 대제목 (예: 기획으로 극복한 성공 프로젝트)</label>
                      <input
                        type="text"
                        value={localTexts.worksTitle || ''}
                        onChange={(e) => setLocalTexts({ ...localTexts, worksTitle: e.target.value })}
                        className="w-full px-4 py-3 bg-primary-50 rounded-xl border border-primary-100 focus:outline-none text-xs font-medium text-primary-800"
                      />
                    </div>

                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs font-bold text-primary-700 block">페이지 상세 설명문</label>
                      <input
                        type="text"
                        value={localTexts.worksDesc || ''}
                        onChange={(e) => setLocalTexts({ ...localTexts, worksDesc: e.target.value })}
                        className="w-full px-4 py-3 bg-primary-50 rounded-xl border border-primary-100 focus:outline-none text-xs font-medium text-primary-800"
                      />
                    </div>

                    <div className="space-y-1.5 pt-4 border-t border-primary-100 md:col-span-2">
                      <span className="text-xs font-bold text-primary-800 block">▼ 하단 성공 제안 무료 지원 CTA 배너 문구</span>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-primary-700 block">제안 배너 상단 배지 명칭</label>
                      <input
                        type="text"
                        value={localTexts.worksPromoBadge || ''}
                        onChange={(e) => setLocalTexts({ ...localTexts, worksPromoBadge: e.target.value })}
                        className="w-full px-4 py-3 bg-primary-50 rounded-xl border border-primary-100 focus:outline-none text-xs font-medium text-primary-800"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-primary-700 block">제안 배너 큰 제목</label>
                      <input
                        type="text"
                        value={localTexts.worksPromoTitle || ''}
                        onChange={(e) => setLocalTexts({ ...localTexts, worksPromoTitle: e.target.value })}
                        className="w-full px-4 py-3 bg-primary-50 rounded-xl border border-primary-100 focus:outline-none text-xs font-medium text-primary-800"
                      />
                    </div>

                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs font-bold text-primary-700 block">제안 배너 본문 설명글</label>
                      <textarea
                        rows={2}
                        value={localTexts.worksPromoDesc || ''}
                        onChange={(e) => setLocalTexts({ ...localTexts, worksPromoDesc: e.target.value })}
                        className="w-full px-4 py-3 bg-primary-50 rounded-xl border border-primary-100 focus:outline-none text-xs font-medium text-primary-800 leading-relaxed"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-primary-700 block">제안 배너 우측 바로가기 상담 버튼</label>
                      <input
                        type="text"
                        value={localTexts.worksPromoCta || ''}
                        onChange={(e) => setLocalTexts({ ...localTexts, worksPromoCta: e.target.value })}
                        className="w-full px-4 py-3 bg-primary-50 rounded-xl border border-primary-100 focus:outline-none text-xs font-medium text-primary-800"
                      />
                    </div>
                  </div>
                </div>
                )}

                {/* Section 8: Case Study Sub-page text blocks */}
                {(textCategory === 'all' || textCategory === 'caseStudy') && (
                  <div className="space-y-6 pt-6 border-t border-primary-100">
                  <div className="border-l-4 border-accent pl-3">
                    <h3 className="text-sm font-bold text-primary-900 block">8. "Case Study" 심층 분석실 페이지 텍스트</h3>
                    <p className="text-[10px] text-primary-400 font-medium">사례 연구실 상단 배지, 메인 설명의 제목과 글들을 자유자재로 설정합니다.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-primary-700 block">연구실 배지 (예: CURATED DEEP DIVES)</label>
                      <input
                        type="text"
                        value={localTexts.caseStudyBadge || ''}
                        onChange={(e) => setLocalTexts({ ...localTexts, caseStudyBadge: e.target.value })}
                        className="w-full px-4 py-3 bg-primary-50 rounded-xl border border-primary-100 focus:outline-none text-xs font-medium text-primary-800"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-primary-700 block">연구실 전용 명칭 타이틀 (예: 심층 해결 사례 분석)</label>
                      <input
                        type="text"
                        value={localTexts.caseStudyTitle || ''}
                        onChange={(e) => setLocalTexts({ ...localTexts, caseStudyTitle: e.target.value })}
                        className="w-full px-4 py-3 bg-primary-50 rounded-xl border border-primary-100 focus:outline-none text-xs font-medium text-primary-800"
                      />
                    </div>

                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs font-bold text-primary-700 block">연구실 전용 해설 가이드글</label>
                      <textarea
                        rows={2}
                        value={localTexts.caseStudyDesc || ''}
                        onChange={(e) => setLocalTexts({ ...localTexts, caseStudyDesc: e.target.value })}
                        className="w-full px-4 py-3 bg-primary-50 rounded-xl border border-primary-100 focus:outline-none text-xs font-medium text-primary-800 leading-relaxed"
                      />
                    </div>
                  </div>
                </div>
                )}

                {/* Section 9: Contact Sub-page text blocks */}
                {(textCategory === 'all' || textCategory === 'contact') && (
                  <div className="space-y-6 pt-6 border-t border-primary-100">
                  <div className="border-l-4 border-accent pl-3">
                    <h3 className="text-sm font-bold text-primary-900 block">9. "Contact" 협업 문의실 상세 텍스트</h3>
                    <p className="text-[10px] text-primary-400 font-medium font-sans">고객이 의뢰를 기입하는 우측 영역에 전시되는 작업 가능 바운더리 박스 내용들을 맞춤화합니다.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 font-sans">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-primary-700 block">의뢰 페이지 배지 (예: INQUIRY & COLLABORATE)</label>
                      <input
                        type="text"
                        value={localTexts.contactBadge || ''}
                        onChange={(e) => setLocalTexts({ ...localTexts, contactBadge: e.target.value })}
                        className="w-full px-4 py-3 bg-primary-50 rounded-xl border border-primary-100 focus:outline-none text-xs font-medium text-primary-800"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-primary-700 block">의뢰 페이지 핵심 타이틀 (줄바꿈 \n 지원)</label>
                      <input
                        type="text"
                        value={localTexts.contactTitle || ''}
                        onChange={(e) => setLocalTexts({ ...localTexts, contactTitle: e.target.value })}
                        className="w-full px-4 py-3 bg-primary-50 rounded-xl border border-primary-100 focus:outline-none text-xs font-medium text-primary-800"
                      />
                    </div>

                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs font-bold text-primary-700 block">의뢰 페이지 가이드 본문</label>
                      <textarea
                        rows={2}
                        value={localTexts.contactDesc || ''}
                        onChange={(e) => setLocalTexts({ ...localTexts, contactDesc: e.target.value })}
                        className="w-full px-4 py-3 bg-primary-50 rounded-xl border border-primary-100 focus:outline-none text-xs font-medium text-primary-800 leading-relaxed"
                      />
                    </div>

                    <div className="space-y-1.5 md:col-span-2 pt-4 border-t border-primary-100">
                      <span className="text-xs font-bold text-primary-800 block">▼ 우측 사이드바 - 작업 범위 정보 상세란</span>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-primary-700 block">작업 범위 설명 박스 헤더 Title (예: 제안 가능한 최적의 작업 범위)</label>
                      <input
                        type="text"
                        value={localTexts.contactScopeTitle || ''}
                        onChange={(e) => setLocalTexts({ ...localTexts, contactScopeTitle: e.target.value })}
                        className="w-full px-4 py-3 bg-primary-50 rounded-xl border border-primary-100 focus:outline-none text-xs font-medium text-primary-800"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-primary-700 block">작업 범위 #1 항목 명칭</label>
                      <input
                        type="text"
                        value={localTexts.contactScopeLabel1 || ''}
                        onChange={(e) => setLocalTexts({ ...localTexts, contactScopeLabel1: e.target.value })}
                        className="w-full px-4 py-3 bg-primary-50 rounded-xl border border-primary-100 focus:outline-none text-xs font-medium text-primary-800"
                      />
                    </div>

                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs font-bold text-primary-700 block">작업 범위 #1 메인상세 설명</label>
                      <input
                        type="text"
                        value={localTexts.contactScopeDesc1 || ''}
                        onChange={(e) => setLocalTexts({ ...localTexts, contactScopeDesc1: e.target.value })}
                        className="w-full px-4 py-3 bg-primary-50 rounded-xl border border-primary-100 focus:outline-none text-xs font-medium text-primary-800"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-primary-700 block">작업 범위 #2 항목 명칭</label>
                      <input
                        type="text"
                        value={localTexts.contactScopeLabel2 || ''}
                        onChange={(e) => setLocalTexts({ ...localTexts, contactScopeLabel2: e.target.value })}
                        className="w-full px-4 py-3 bg-primary-50 rounded-xl border border-primary-100 focus:outline-none text-xs font-medium text-primary-800"
                      />
                    </div>

                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs font-bold text-primary-700 block">작업 범위 #2 메인상세 설명</label>
                      <input
                        type="text"
                        value={localTexts.contactScopeDesc2 || ''}
                        onChange={(e) => setLocalTexts({ ...localTexts, contactScopeDesc2: e.target.value })}
                        className="w-full px-4 py-3 bg-primary-50 rounded-xl border border-primary-100 focus:outline-none text-xs font-medium text-primary-800"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-primary-700 block">작업 범위 #3 항목 명칭</label>
                      <input
                        type="text"
                        value={localTexts.contactScopeLabel3 || ''}
                        onChange={(e) => setLocalTexts({ ...localTexts, contactScopeLabel3: e.target.value })}
                        className="w-full px-4 py-3 bg-primary-50 rounded-xl border border-primary-100 focus:outline-none text-xs font-medium text-primary-800"
                      />
                    </div>

                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs font-bold text-primary-700 block">작업 범위 #3 메인상세 설명</label>
                      <input
                        type="text"
                        value={localTexts.contactScopeDesc3 || ''}
                        onChange={(e) => setLocalTexts({ ...localTexts, contactScopeDesc3: e.target.value })}
                        className="w-full px-4 py-3 bg-primary-50 rounded-xl border border-primary-100 focus:outline-none text-xs font-medium text-primary-800"
                      />
                    </div>

                    <div className="space-y-1.5 pt-4 border-t border-primary-100 md:col-span-2">
                      <span className="text-xs font-bold text-primary-800 block">▼ 하단 우측 메신저 회신 박스 타이틀</span>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-primary-700 block">메신저 박스 타이틀 (예: 직접 상담하기)</label>
                      <input
                        type="text"
                        value={localTexts.contactQuickTitle || ''}
                        onChange={(e) => setLocalTexts({ ...localTexts, contactQuickTitle: e.target.value })}
                        className="w-full px-4 py-3 bg-primary-50 rounded-xl border border-primary-100 focus:outline-none text-xs font-medium text-primary-800"
                      />
                    </div>
                  </div>
                </div>
                )}

                {/* Section 10: Work Process text blocks */}
                {(textCategory === 'all' || textCategory === 'process') && (
                  <div className="space-y-6 pt-6 border-t border-primary-100">
                  <div className="border-l-4 border-accent pl-3">
                    <h3 className="text-sm font-bold text-primary-900 block">10. "Work Process" 작업 프로세스 단계별 텍스트</h3>
                    <p className="text-[10px] text-primary-400 font-medium">체계적인 5단계 디자인 작업 프로세스의 배지, 대제목, 소제목 및 각 단계별 명칭, 영문명, 상세 설명을 커스텀 설정합니다.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 font-sans">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-primary-700 block">프로세스 배지 (예: Work Process)</label>
                      <input
                        type="text"
                        value={localTexts.processBadge || ''}
                        onChange={(e) => setLocalTexts({ ...localTexts, processBadge: e.target.value })}
                        className="w-full px-4 py-3 bg-primary-50 rounded-xl border border-primary-100 focus:outline-none text-xs font-medium text-primary-800"
                      />
                    </div>

                    <div className="space-y-1.5 font-sans">
                      <label className="text-xs font-bold text-primary-700 block">프로세스 메인 제목 (예: 체계적이고 정밀한 디자인 작업 프로세스)</label>
                      <input
                        type="text"
                        value={localTexts.processTitle || ''}
                        onChange={(e) => setLocalTexts({ ...localTexts, processTitle: e.target.value })}
                        className="w-full px-4 py-3 bg-primary-50 rounded-xl border border-primary-100 focus:outline-none text-xs font-medium text-primary-800"
                      />
                    </div>

                    <div className="space-y-1.5 md:col-span-2 font-sans">
                      <label className="text-xs font-bold text-primary-700 block">프로세스 상세 설명</label>
                      <textarea
                        rows={2}
                        value={localTexts.processDesc || ''}
                        onChange={(e) => setLocalTexts({ ...localTexts, processDesc: e.target.value })}
                        className="w-full px-4 py-3 bg-primary-50 rounded-xl border border-primary-100 focus:outline-none text-xs font-medium text-primary-800 leading-relaxed"
                      />
                    </div>

                    {/* Step 1 */}
                    <div className="space-y-1.5 pt-4 border-t border-primary-100 md:col-span-2">
                      <span className="text-xs font-bold text-accent block">※ 1단계 (Step 01)</span>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-primary-700 block">1단계 타이틀 (예: 제안)</label>
                      <input
                        type="text"
                        value={localTexts.processStep1Title || ''}
                        onChange={(e) => setLocalTexts({ ...localTexts, processStep1Title: e.target.value })}
                        className="w-full px-4 py-3 bg-primary-50 rounded-xl border border-primary-100 focus:outline-none text-xs font-medium text-primary-800"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-primary-700 block">1단계 영문 구분명 (예: Proposal)</label>
                      <input
                        type="text"
                        value={localTexts.processStep1Eng || ''}
                        onChange={(e) => setLocalTexts({ ...localTexts, processStep1Eng: e.target.value })}
                        className="w-full px-4 py-3 bg-primary-50 rounded-xl border border-primary-100 focus:outline-none text-xs font-medium text-primary-800"
                      />
                    </div>
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs font-bold text-primary-700 block">1단계 상세 설명</label>
                      <textarea
                        rows={2}
                        value={localTexts.processStep1Desc || ''}
                        onChange={(e) => setLocalTexts({ ...localTexts, processStep1Desc: e.target.value })}
                        className="w-full px-4 py-3 bg-primary-50 rounded-xl border border-primary-100 focus:outline-none text-xs font-medium text-primary-800 leading-relaxed"
                      />
                    </div>

                    {/* Step 2 */}
                    <div className="space-y-1.5 pt-4 border-t border-primary-100 md:col-span-2">
                      <span className="text-xs font-bold text-accent block">※ 2단계 (Step 02)</span>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-primary-700 block">2단계 타이틀 (예: 상담)</label>
                      <input
                        type="text"
                        value={localTexts.processStep2Title || ''}
                        onChange={(e) => setLocalTexts({ ...localTexts, processStep2Title: e.target.value })}
                        className="w-full px-4 py-3 bg-primary-50 rounded-xl border border-primary-100 focus:outline-none text-xs font-medium text-primary-800"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-primary-700 block">2단계 영문 구분명 (예: Consultation)</label>
                      <input
                        type="text"
                        value={localTexts.processStep2Eng || ''}
                        onChange={(e) => setLocalTexts({ ...localTexts, processStep2Eng: e.target.value })}
                        className="w-full px-4 py-3 bg-primary-50 rounded-xl border border-primary-100 focus:outline-none text-xs font-medium text-primary-800"
                      />
                    </div>
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs font-bold text-primary-700 block">2단계 상세 설명</label>
                      <textarea
                        rows={2}
                        value={localTexts.processStep2Desc || ''}
                        onChange={(e) => setLocalTexts({ ...localTexts, processStep2Desc: e.target.value })}
                        className="w-full px-4 py-3 bg-primary-50 rounded-xl border border-primary-100 focus:outline-none text-xs font-medium text-primary-800 leading-relaxed"
                      />
                    </div>

                    {/* Step 3 */}
                    <div className="space-y-1.5 pt-4 border-t border-primary-100 md:col-span-2">
                      <span className="text-xs font-bold text-accent block">※ 3단계 (Step 03)</span>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-primary-700 block">3단계 타이틀 (예: 작업)</label>
                      <input
                        type="text"
                        value={localTexts.processStep3Title || ''}
                        onChange={(e) => setLocalTexts({ ...localTexts, processStep3Title: e.target.value })}
                        className="w-full px-4 py-3 bg-primary-50 rounded-xl border border-primary-100 focus:outline-none text-xs font-medium text-primary-800"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-primary-700 block">3단계 영문 구분명 (예: Design / Work)</label>
                      <input
                        type="text"
                        value={localTexts.processStep3Eng || ''}
                        onChange={(e) => setLocalTexts({ ...localTexts, processStep3Eng: e.target.value })}
                        className="w-full px-4 py-3 bg-primary-50 rounded-xl border border-primary-100 focus:outline-none text-xs font-medium text-primary-800"
                      />
                    </div>
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs font-bold text-primary-700 block">3단계 상세 설명</label>
                      <textarea
                        rows={2}
                        value={localTexts.processStep3Desc || ''}
                        onChange={(e) => setLocalTexts({ ...localTexts, processStep3Desc: e.target.value })}
                        className="w-full px-4 py-3 bg-primary-50 rounded-xl border border-primary-100 focus:outline-none text-xs font-medium text-primary-800 leading-relaxed"
                      />
                    </div>

                    {/* Step 4 */}
                    <div className="space-y-1.5 pt-4 border-t border-primary-100 md:col-span-2">
                      <span className="text-xs font-bold text-accent block">※ 4단계 (Step 04)</span>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-primary-700 block">4단계 타이틀 (예: 수정)</label>
                      <input
                        type="text"
                        value={localTexts.processStep4Title || ''}
                        onChange={(e) => setLocalTexts({ ...localTexts, processStep4Title: e.target.value })}
                        className="w-full px-4 py-3 bg-primary-50 rounded-xl border border-primary-100 focus:outline-none text-xs font-medium text-primary-800"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-primary-700 block">4단계 영문 구분명 (예: Revision)</label>
                      <input
                        type="text"
                        value={localTexts.processStep4Eng || ''}
                        onChange={(e) => setLocalTexts({ ...localTexts, processStep4Eng: e.target.value })}
                        className="w-full px-4 py-3 bg-primary-50 rounded-xl border border-primary-100 focus:outline-none text-xs font-medium text-primary-800"
                      />
                    </div>
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs font-bold text-primary-700 block">4단계 상세 설명</label>
                      <textarea
                        rows={2}
                        value={localTexts.processStep4Desc || ''}
                        onChange={(e) => setLocalTexts({ ...localTexts, processStep4Desc: e.target.value })}
                        className="w-full px-4 py-3 bg-primary-50 rounded-xl border border-primary-100 focus:outline-none text-xs font-medium text-primary-800 leading-relaxed"
                      />
                    </div>

                    {/* Step 5 */}
                    <div className="space-y-1.5 pt-4 border-t border-primary-100 md:col-span-2">
                      <span className="text-xs font-bold text-accent block">※ 5단계 (Step 05)</span>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-primary-700 block">5단계 타이틀 (예: 전달)</label>
                      <input
                        type="text"
                        value={localTexts.processStep5Title || ''}
                        onChange={(e) => setLocalTexts({ ...localTexts, processStep5Title: e.target.value })}
                        className="w-full px-4 py-3 bg-primary-50 rounded-xl border border-primary-100 focus:outline-none text-xs font-medium text-primary-800"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-primary-700 block">5단계 영문 구분명 (예: Delivery)</label>
                      <input
                        type="text"
                        value={localTexts.processStep5Eng || ''}
                        onChange={(e) => setLocalTexts({ ...localTexts, processStep5Eng: e.target.value })}
                        className="w-full px-4 py-3 bg-primary-50 rounded-xl border border-primary-100 focus:outline-none text-xs font-medium text-primary-800"
                      />
                    </div>
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs font-bold text-primary-700 block">5단계 상세 설명</label>
                      <textarea
                        rows={2}
                        value={localTexts.processStep5Desc || ''}
                        onChange={(e) => setLocalTexts({ ...localTexts, processStep5Desc: e.target.value })}
                        className="w-full px-4 py-3 bg-primary-50 rounded-xl border border-primary-100 focus:outline-none text-xs font-medium text-primary-800 leading-relaxed"
                      />
                    </div>
                  </div>
                </div>
                )}

                {/* Bottom Bar Controls */}
                <div className="pt-8 border-t border-primary-100 flex justify-end">
                  <button
                    onClick={() => {
                      updateSiteText(localTexts);
                      setIsSaved(true);
                      setTimeout(() => setIsSaved(false), 3000);
                      window.scrollTo({ top: 300, behavior: 'smooth' });
                    }}
                    className="flex items-center gap-2 px-8 py-4 bg-accent hover:bg-yellow-500 font-bold text-xs text-neutral-950 rounded-xl transition-all shadow-md cursor-pointer"
                  >
                    <Save className="w-4.5 h-4.5" /> 홈페이지 구조 설정 저장후 배포반영하기
                  </button>
                </div>

              </div>
            </div>
          )}

        </>
      )}

            </div>
          )}
        </div>
      </div>
    </div>
  );
};
