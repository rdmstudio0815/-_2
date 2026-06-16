import React, { useState } from 'react';
import { Project } from '../types';
import { Sparkles, ArrowRight, TrendingUp, Compass, Play, X } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onViewDetails: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onViewDetails }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'visual': return '시각디자인';
      case 'sns': return 'SNS 콘텐츠';
      case 'video': return '영상편집';
      default: return '디자인';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'visual': return 'text-blue-600 bg-blue-50 border-blue-100/60';
      case 'sns': return 'text-violet-600 bg-violet-50 border-violet-100/60';
      case 'video': return 'text-amber-600 bg-amber-50 border-amber-100/60';
      default: return 'text-primary-600 bg-primary-50 border-primary-100';
    }
  };

  return (
    <article 
      onClick={() => onViewDetails(project)}
      className="bg-white rounded-3xl border border-primary-100 overflow-hidden premium-shadow premium-shadow-hover transition-all duration-300 transform cursor-pointer group flex flex-col h-full"
    >
      {/* Visual Header / Image Container */}
      <div 
        onClick={(e) => {
          if (project.videoUrl) {
            e.stopPropagation(); // Prevent opening full page modal on play tap
            setIsPlaying(true);
          }
        }}
        className="relative aspect-[16/10] overflow-hidden bg-primary-900 group/thumbnail cursor-pointer"
      >
        {isPlaying && project.videoUrl ? (
          <div className="w-full h-full relative" onClick={(e) => e.stopPropagation()}>
            <video 
              src={project.videoUrl} 
              controls 
              autoPlay 
              className="w-full h-full object-cover"
              playsInline
            />
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setIsPlaying(false);
              }}
              className="absolute top-3 right-3 bg-black/75 hover:bg-black/90 text-white p-1.5 rounded-full z-20 cursor-pointer shadow-md border border-white/20 transition-all"
              title="동영상 종료"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <>
            <img 
              src={project.imageUrl || 'https://images.unsplash.com/photo-1541462608141-2f528d72e271?auto=format&fit=crop&w=800&q=80'} 
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Category Badge overlay */}
            <div className="absolute top-4 left-4 z-10 pointer-events-none">
              <span className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-bold tracking-tight border ${getCategoryColor(project.category)} shadow-xs`}>
                {getCategoryLabel(project.category)}
              </span>
            </div>

            {/* Play indicator overlay for video category or project with video link */}
            {project.videoUrl ? (
              <div className="absolute inset-0 bg-primary-900/15 group-hover/thumbnail:bg-primary-900/40 transition-colors duration-300 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-white/95 backdrop-blur-xs text-primary-900 flex items-center justify-center shadow-lg transition-transform duration-300 scale-95 group-hover/thumbnail:scale-100 ring-4 ring-amber-500/20">
                  <Play className="w-6 h-6 fill-amber-500 ml-0.5 text-amber-500" />
                </div>
              </div>
            ) : (
              project.category === 'video' && (
                <div className="absolute inset-0 bg-primary-900/15 group-hover/thumbnail:bg-primary-900/40 transition-colors duration-300 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-xs text-primary-900 flex items-center justify-center shadow-lg transition-transform duration-300 scale-95 group-hover/thumbnail:scale-100">
                    <Play className="w-6 h-6 fill-current ml-0.5 text-amber-600" />
                  </div>
                </div>
              )
            )}
          </>
        )}
      </div>

      {/* Structured Content Area */}
      <div className="p-8 flex flex-col flex-grow space-y-5">
        
        {/* Title and Short Description */}
        <div className="space-y-2">
          {project.client && (
            <span className="text-[11px] font-semibold text-primary-400 tracking-wider block uppercase">
              {project.client}
            </span>
          )}
          <h3 className="font-sans font-bold text-lg text-primary-900 tracking-tight leading-snug group-hover:text-accent transition-colors duration-150 line-clamp-2">
            {project.title}
          </h3>
          <p className="text-xs text-primary-500 font-medium leading-relaxed line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-100 my-1 pointer-events-none" />

        {/* About: replacing before & result */}
        <div className="space-y-2 flex-grow justify-start">
          <div className="flex gap-2 items-center text-[10px] font-bold text-primary-400 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span>디자인 스토리 (ABOUT)</span>
          </div>
          <p className="text-xs text-primary-600 font-medium leading-relaxed line-clamp-3">
            {project.about}
          </p>
        </div>

        {/* Card CTA Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-primary-50">
          <span className="text-[11px] text-primary-400 font-bold tracking-tight">
            Role: {project.role.split(',')[0]}
          </span>
          <div className="flex items-center gap-1.5 text-xs font-bold text-primary-900 group-hover:text-accent transition-all">
            <span>제안 분석서 보기</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </div>
        </div>

      </div>
    </article>
  );
};
