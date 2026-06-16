import React, { useState, useEffect } from 'react';

interface MetricCardProps {
  label: string;
  targetValue: number;
  suffix: string;
  subtext: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({ label, targetValue, suffix, subtext }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = targetValue;
    if (end === 0) return;

    const duration = 1200; // ms
    const increment = Math.ceil(end / (duration / 16)); // Target ~60fps
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [targetValue]);

  return (
    <div className="bg-white rounded-2xl border border-primary-100 p-8 text-center premium-shadow transition-all duration-300 hover:translate-y-[-2px] hover:border-primary-200">
      <span className="text-[11px] font-sans font-bold text-accent tracking-widest uppercase block mb-1">
        {label}
      </span>
      <div className="font-display font-extrabold text-4xl sm:text-5xl text-primary-900 tracking-tight my-2">
        {count.toLocaleString()}
        <span className="text-xl sm:text-2xl font-sans font-medium text-primary-600 ml-0.5">{suffix}</span>
      </div>
      <p className="text-xs text-primary-400 font-medium tracking-tight">
        {subtext}
      </p>
    </div>
  );
};
