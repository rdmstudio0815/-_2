import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Mail, Instagram, MessageSquare, ShieldCheck, CheckSquare, Sparkles, Send, Calendar } from 'lucide-react';

export const ContactView: React.FC = () => {
  const { addInquiry, siteText } = usePortfolio();
  
  const mainCategoryLabels: Record<string, string> = {
    visual: '시각디자인',
    sns: 'SNS 콘텐츠',
    video: '영상편집',
    mixed: '종합 패키지',
    etc: '기타 분야'
  };

  // Form submission state
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    mainCategory: 'visual',
    budget: '',
    timeline: '1개월 이내',
    message: ''
  });

  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.budget || !formData.message) {
      setError('성함, 이메일 주소, 연락처, 희망 편성 예산, 문의 구체 사항은 필수 기입 항목입니다.');
      return;
    }

    const compiledProjectType = mainCategoryLabels[formData.mainCategory] || formData.mainCategory;

    addInquiry({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      projectType: compiledProjectType,
      budget: formData.budget,
      timeline: formData.timeline,
      message: formData.message
    });

    setSubmitted(true);
    setError('');
  };

  return (
    <div className="space-y-20 py-12 md:py-20 max-w-6xl mx-auto px-6 fade-in">
      
      {/* Editorial Header */}
      <div className="text-center space-y-3 max-w-xl mx-auto">
        <span className="text-[10px] font-sans font-extrabold text-accent tracking-widest uppercase block">
          {siteText.contactBadge || "INQUIRY & COLLABORATE"}
        </span>
        <h1 className="font-sans font-extrabold text-3xl text-primary-900 tracking-tight whitespace-pre-line">
          {siteText.contactTitle || "프로젝트는 명확할수록, \n결과는 좋아집니다."}
        </h1>
        <p className="text-xs text-primary-500 font-medium leading-relaxed">
          {siteText.contactDesc || "귀사의 문제점과 요건을 적어주시면, 불필요한 인사치레 대신 즉각 투입 가능한 시각 제안서와 견적 분석서를 회신해 드립니다."}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Side: Interactive Contact Form */}
        <div className="lg:col-span-7">
          {submitted ? (
            <div className="bg-white rounded-3xl border border-primary-100 p-10 text-center space-y-6 premium-shadow fade-in">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="font-sans font-bold text-lg text-primary-900">의뢰 제안서가 안전하게 접수되었습니다!</h3>
                <p className="text-xs text-primary-500 font-medium max-w-sm mx-auto leading-relaxed">
                  작성해 주신 성함({formData.name}) 및 이메일({formData.email}), 연락처({formData.phone})를 확인하여, 영업일 기준 24시간 내외로 정밀 기획 프리뷰 제안 메일을 회신해 드리겠습니다.
                </p>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      mainCategory: 'visual',
                      budget: '',
                      timeline: '1개월 이내',
                      message: ''
                    });
                  }}
                  id="btn-new-inquiry"
                  className="px-5 py-2.5 bg-primary-900 hover:bg-primary-800 text-white rounded-lg text-xs font-bold font-sans transition-all"
                >
                  새로운 문의 추가 작성하기
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-primary-100 p-8 sm:p-10 premium-shadow">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Name & Contact Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-primary-700 block">성함 / 기업 사명 *</label>
                    <input
                      type="text"
                      placeholder="김서현 팀장 / 주식회사 브랜드"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      id="contact-name"
                      className="w-full px-4 py-3 rounded-xl bg-primary-50/50 border border-primary-100 focus:outline-none focus:border-accent text-xs font-medium"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-primary-700 block">연락처 *</label>
                    <input
                      type="text"
                      placeholder="010-1234-5678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      id="contact-phone"
                      className="w-full px-4 py-3 rounded-xl bg-primary-50/50 border border-primary-100 focus:outline-none focus:border-accent text-xs font-medium"
                    />
                  </div>

                </div>

                {/* Return Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-primary-700 block">회신 가능한 이메일 주소 *</label>
                  <input
                    type="email"
                    placeholder="sh.kim@brand.co.kr"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    id="contact-email"
                    className="w-full px-4 py-3 rounded-xl bg-primary-50/50 border border-primary-100 focus:outline-none focus:border-accent text-xs font-medium"
                  />
                </div>

                {/* Project Category Selection */}
                <div className="pt-2 border-t border-dashed border-primary-100">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-primary-700 block">의뢰 희망 프로젝트 분야 *</label>
                    <select
                      value={formData.mainCategory}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          mainCategory: e.target.value
                        });
                      }}
                      id="contact-main-category"
                      className="w-full px-4 py-3 rounded-xl bg-primary-50/50 border border-primary-100 focus:outline-none text-xs font-semibold text-primary-750"
                    >
                      <option value="visual">시각디자인 제품 (Visual)</option>
                      <option value="sns">SNS 콘텐츠 기획 (SNS)</option>
                      <option value="video">영상편집 및 연출 (Video)</option>
                      <option value="mixed">종합 패키징 (Mixed Package)</option>
                      <option value="etc">기타 분야 (Etc)</option>
                    </select>
                  </div>
                </div>

                {/* Budget & Timeline */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-primary-700 block">희망 편성 예산 (직접 기입) *</label>
                    <input
                      type="text"
                      placeholder="예시: 250만 원 내외 / 협의 희망"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      id="contact-budget"
                      className="w-full px-4 py-3 rounded-xl bg-primary-50/50 border border-primary-100 focus:outline-none focus:border-accent text-xs font-medium"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-primary-700 block">원하시는 최종 마감 일정</label>
                    <input
                      type="text"
                      placeholder="예: 2026.07 내외 협의 희망"
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      id="contact-timeline"
                      className="w-full px-4 py-3 rounded-xl bg-primary-50/50 border border-primary-100 focus:outline-none focus:border-accent text-xs font-medium"
                    />
                  </div>

                </div>

                {/* Message / Core background questions */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-primary-700 block">문의 배경 및 구체 요건 설명 *</label>
                    <span className="text-[10px] text-primary-400 font-bold">최대 가설 적기 가능</span>
                  </div>
                  <textarea
                    rows={6}
                    placeholder="현재 해결하고 싶으신 비지니스 문제(예: 인스타그램 피드 유입 저조, 신생 런칭 로고 전문성 취약 등)와 참고하시는 벤치마킹 주소 등을 자세히 적어주실수록 분석의 밀도가 올라갑니다."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    id="contact-message"
                    className="w-full p-4 rounded-xl bg-primary-50/50 border border-primary-100 focus:outline-none focus:border-accent text-xs font-medium leading-relaxed text-justify"
                  />
                </div>

                {error && (
                  <p className="text-red-500 font-bold text-xs">
                    ⚠️ {error}
                  </p>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  id="contact-form-submit"
                  className="w-full py-4 bg-primary-900 hover:bg-primary-800 text-white font-extrabold text-xs tracking-widest uppercase rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  프로젝트 상담 접수하기
                </button>

              </form>
            </div>
          )}
        </div>

        {/* Right Side: Quick communication */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Quick Instant channels */}
          <div className="bg-white rounded-3xl p-8 border border-primary-100 space-y-6 premium-shadow">
            <h3 className="font-sans font-bold text-sm text-primary-900 border-l-4 border-accent pl-3">
              {siteText.contactQuickTitle || "직접 상담하기"}
            </h3>
            
            <div className="space-y-3.5 text-xs font-bold text-primary-800">
              
              <a 
                href="mailto:rdmstudio0815@gmail.com"
                className="flex items-center gap-3 p-3.5 rounded-xl bg-primary-50/40 border border-primary-100 hover:bg-primary-50 transition-colors"
                id="link-instant-email"
              >
                <Mail className="w-4 h-4 text-accent" />
                <span>Email: rdmstudio0815@gmail.com</span>
              </a>

              <a 
                href="http://pf.kakao.com/_fgken/chat"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-xl bg-orange-50/30 border border-orange-100 hover:bg-orange-50/60 transition-colors cursor-pointer"
                id="link-instant-kakao"
              >
                <MessageSquare className="w-4 h-4 text-orange-500" />
                <span>둥근달스튜디오 카카오채널 1:1 상담 바로가기</span>
              </a>

              <a 
                href="https://www.instagram.com/rdmoon_studio?igsh=dnM1aXZhbHMwOGlt&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-xl bg-violet-50/20 border border-violet-100 hover:bg-violet-50/40 transition-colors cursor-pointer"
                id="link-instant-insta"
              >
                <Instagram className="w-4 h-4 text-violet-500" />
                <span>Instagram: @rdmoon_studio</span>
              </a>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
