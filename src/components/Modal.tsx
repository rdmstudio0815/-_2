import React, { useState, useEffect } from 'react';
import { Project } from '../types';
import { X, Target, Sparkles, ArrowRight, UserCheck, CalendarDays, Play, Image as ImageIcon, Layers } from 'lucide-react';

interface ModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onCtaClick: () => void;
}

export const ProjectDetailModal: React.FC<ModalProps> = ({ project, isOpen, onClose, onCtaClick }) => {
  if (!isOpen || !project) return null;

  const images = project.imageUrls && project.imageUrls.length > 0 
    ? project.imageUrls 
    : [project.imageUrl].filter(Boolean);

  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    setActiveImgIdx(0);
    // Auto-activate video view if videoUrl is present
    if (project.videoUrl) {
      setShowVideo(true);
    } else {
      setShowVideo(false);
    }
  }, [project.id, project.videoUrl]);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-primary-900/40 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 md:p-10">
      <div className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh] fade-in">
        
        {/* Header Ribbon / Navigation */}
        <div className="bg-primary-900 text-white px-8 py-5 flex justify-between items-center shrink-0">
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold text-accent uppercase tracking-widest block font-display">
              {project.category === 'visual' ? '시각디자인 포트폴리오' : project.category === 'sns' ? 'SNS 콘텐츠 디렉션' : '비디오 모션 그래픽'}
            </span>
            <h2 className="font-sans font-extrabold text-base sm:text-lg tracking-tight truncate max-w-lg">
              {project.title}
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
            id="modal-btn-close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Contents */}
        <div className="p-8 overflow-y-auto space-y-8">
          
          {/* Main Hero Shot / Slider or Video Player */}
          <div className="relative rounded-2xl overflow-hidden aspect-[16/8] bg-primary-900 group">
            {showVideo && project.videoUrl ? (
              <div className="w-full h-full bg-black relative">
                <video 
                  src={project.videoUrl} 
                  controls 
                  autoPlay 
                  className="w-full h-full object-contain"
                  playsInline
                />
              </div>
            ) : (
              <>
                {images.length > 0 ? (
                  <img 
                    src={images[activeImgIdx]} 
                    alt={`${project.title} - ${activeImgIdx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-all duration-300"
                  />
                ) : (
                  <img 
                    src="https://images.unsplash.com/photo-1541462608141-2f528d72e271?auto=format&fit=crop&w=800&q=80" 
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 via-transparent to-transparent pointer-events-none" />

                {/* Slider arrows if multiple images */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveImgIdx(prev => (prev - 1 + images.length) % images.length)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white border border-white/10 transition-all cursor-pointer opacity-0 group-hover:opacity-100"
                      title="이전 이미지"
                    >
                      &larr;
                    </button>
                    <button
                      onClick={() => setActiveImgIdx(prev => (prev + 1) % images.length)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white border border-white/10 transition-all cursor-pointer opacity-0 group-hover:opacity-100"
                      title="다음 이미지"
                    >
                      &rarr;
                    </button>

                    {/* Slider indicators / Dot dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 bg-black/30 backdrop-blur-xs px-3 py-1.5 rounded-full">
                      {images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImgIdx(idx)}
                          className={`w-1.5 h-1.5 rounded-full transition-all ${
                            idx === activeImgIdx ? 'bg-accent w-3' : 'bg-white/50 hover:bg-white'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            )}

            {/* Media type toggle controls if video is available */}
            {project.videoUrl && (
              <div className="absolute top-4 right-4 z-10 flex gap-1.5 bg-black/50 backdrop-blur-md px-2 py-1 rounded-xl border border-white/10">
                <button
                  onClick={() => setShowVideo(false)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${!showVideo ? 'bg-white text-primary-900' : 'text-white/80 hover:text-white hover:bg-white/10'}`}
                >
                  <ImageIcon className="w-3.5 h-3.5" /> 이미지
                </button>
                <button
                  onClick={() => setShowVideo(true)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${showVideo ? 'bg-amber-500 text-white' : 'text-white/80 hover:text-white hover:bg-white/10'}`}
                >
                  <Play className="w-3.5 h-3.5 fill-current" /> 비디오 (1분 이내)
                </button>
              </div>
            )}
            
            {/* Quick overview floats */}
            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-4 text-white pointer-events-none">
              <div className="bg-black/40 backdrop-blur-md rounded-lg px-4 py-2 flex items-center gap-2 border border-white/10 text-xs">
                <UserCheck className="w-4 h-4 text-accent" />
                <span><strong>Role: </strong> {project.role}</span>
              </div>
              <div className="bg-black/40 backdrop-blur-md rounded-lg px-4 py-2 flex items-center gap-2 border border-white/10 text-xs">
                <CalendarDays className="w-4 h-4 text-emerald-400" />
                <span><strong>Duration: </strong> {project.duration}</span>
              </div>
            </div>
          </div>

          {/* Quick Client Summary Info Card */}
          <div className="bg-primary-50 rounded-2xl p-6 border border-primary-100 flex flex-col sm:flex-row justify-between gap-6">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-widest text-primary-400 block">CLIENT</span>
              <p className="font-bold text-primary-800 text-sm">{project.client}</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-widest text-primary-400 block">CORE OBJECTIVE</span>
              <p className="font-bold text-primary-800 text-sm">기획 기반 고밀도 비주얼 브랜딩</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-widest text-primary-400 block">STATUS</span>
              <p className="font-bold text-emerald-600 text-sm">성공적으로 완성 및 가이드 배포</p>
            </div>
          </div>

          {/* Result-Driven Columns Grid (Before/Result replaced by About) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
            
            {/* Left side: Strategic Analysis (About & Goals) */}
            <div className="space-y-6">
              
              {/* About Section */}
              <div className="border border-primary-100 bg-primary-50/20 rounded-2xl p-6 space-y-2">
                <div className="flex items-center gap-2 text-primary-900">
                  <Sparkles className="w-4 h-4 text-accent" />
                  <h4 className="font-sans font-extrabold text-sm uppercase tracking-wider">기획의도 및 설계 (ABOUT)</h4>
                </div>
                <p className="text-xs text-primary-700 font-medium leading-relaxed">
                  {project.about}
                </p>
              </div>

              {/* Goal Setting */}
              <div className="border border-blue-105 bg-blue-50/20 rounded-2xl p-6 space-y-2">
                <div className="flex items-center gap-2 text-blue-600">
                  <Target className="w-4 h-4" />
                  <h4 className="font-sans font-extrabold text-sm uppercase tracking-wider">비즈니스 목표 (Goal)</h4>
                </div>
                <p className="text-xs text-primary-700 font-medium leading-relaxed">
                  {project.goal}
                </p>
              </div>

            </div>

            {/* Right side: Execution Process */}
            <div className="space-y-6 flex flex-col justify-between">
              
              {/* Process / Solution */}
              <div className="border border-primary-100 bg-primary-50/40 rounded-2xl p-6 space-y-2 flex-grow">
                <div className="flex items-center gap-2 text-primary-800">
                  <Layers className="w-4 h-4 text-primary-600" />
                  <h4 className="font-sans font-extrabold text-sm uppercase tracking-wider">수행 방법과 과정 (Process)</h4>
                </div>
                <p className="text-xs text-primary-700 font-medium leading-relaxed">
                  {project.process}
                </p>
              </div>

            </div>

          </div>

          {/* Deep Case-Study Detail (if populated) */}
          {(project.detailedStrategy || project.detailedDecision) && (
            <div className="border-t border-primary-100 pt-8 space-y-8">
              <h3 className="font-sans font-bold text-base text-primary-900 border-l-4 border-primary-900 pl-3">
                전문가 비평 및 자산화 방향 결정 사유 (Design Taxonomy)
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs font-medium">
                {project.detailedStrategy && (
                  <div className="space-y-2">
                    <h5 className="font-bold text-primary-800 text-[13px]">1. 비즈니스 개입 및 해결전략 (Strategic Blueprint)</h5>
                    <p className="text-primary-600 leading-relaxed text-justify">{project.detailedStrategy}</p>
                  </div>
                )}
                {project.detailedDecision && (
                  <div className="space-y-2">
                    <h5 className="font-bold text-primary-800 text-[13px]">2. 시각 논리화 설계 가이드 (Creative Framework)</h5>
                    <p className="text-primary-600 leading-relaxed text-justify">{project.detailedDecision}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Prompt CTA to lock conversion */}
          <div className="bg-primary-900 rounded-2xl p-8 text-center text-white space-y-4 premium-shadow">
            <h4 className="font-sans font-bold text-base">
              유사한 비즈니스 문제를 겪고 계신가요?
            </h4>
            <p className="text-xs text-primary-300 max-w-lg mx-auto font-medium">
              상세 기획과 비주얼 분석을 비롯한 브랜딩 가이드라인 수립부터 함께 시작합니다. 전문 상담과 견적 제안을 즉시 무료로 전송해 드립니다.
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  onCtaClick();
                  onClose();
                }}
                id="btn-modal-cta"
                className="inline-flex items-center gap-1.5 px-6 py-3 rounded-lg bg-white text-primary-900 hover:bg-primary-100 text-xs font-bold transition-all duration-200 cursor-pointer"
              >
                <span>이 프로젝트 디자인 의뢰 제안 상담하기</span>
                <ArrowRight className="w-4 h-4 text-primary-900" />
              </button>
            </div>
          </div>

        </div>

        {/* Footer actions */}
        <div className="bg-primary-50 px-8 py-4 border-t border-primary-100 flex justify-end gap-3 shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg border border-primary-200 hover:bg-white text-primary-700 text-xs font-semibold tracking-tight transition-all cursor-pointer"
            id="modal-btn-bottom-close"
          >
            닫기
          </button>
        </div>

      </div>
    </div>
  );
};
