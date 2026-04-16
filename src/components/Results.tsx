import { useEffect, useState } from 'react';
import { ChevronRight, RotateCcw, Users, MapPin } from 'lucide-react';
import { DimensionScore, PersonalityCode } from '../types';
import { getPersonality, personalities } from '../data/personalities';
import PersonalityCard from './PersonalityCard';

type ResultsProps = {
  scores: DimensionScore;
  onRetake: () => void;
  onCommunity: () => void;
};

function computePersonalityCode(scores: DimensionScore): PersonalityCode {
  const dim1 = scores.W >= scores.D ? 'W' : 'D';
  const dim2 = scores.G >= scores.C ? 'G' : 'C';
  const dim3 = scores.R >= scores.F ? 'R' : 'F';
  const dim4 = scores.E >= scores.I ? 'E' : 'I';
  return `${dim1}${dim2}${dim3}${dim4}` as PersonalityCode;
}

export default function Results({ scores, onRetake, onCommunity }: ResultsProps) {
  const [revealed, setRevealed] = useState(false);
  const [showDesc, setShowDesc] = useState(false);

  const code = computePersonalityCode(scores);
  const personality = getPersonality(code);

  useEffect(() => {
    const t1 = setTimeout(() => setRevealed(true), 400);
    const t2 = setTimeout(() => setShowDesc(true), 900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const compatiblePersonalities = personality.compatibleWith.map((c) => personalities[c]);

  return (
    <div className="min-h-screen bg-[#060d1a] text-white overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-[-30%] left-[-20%] w-[700px] h-[700px] rounded-full blur-3xl transition-opacity duration-1000"
          style={{
            background: `radial-gradient(circle, ${personality.accentColor}15, transparent 70%)`,
            opacity: revealed ? 1 : 0,
          }}
        />
        <div
          className="absolute bottom-[-20%] right-[-15%] w-[500px] h-[500px] rounded-full blur-3xl transition-opacity duration-1000 delay-300"
          style={{
            background: `radial-gradient(circle, ${personality.accentColor}10, transparent 70%)`,
            opacity: revealed ? 1 : 0,
          }}
        />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-12">
        <div
          className="text-center mb-10 transition-all duration-700"
          style={{ opacity: revealed ? 1 : 0, transform: revealed ? 'translateY(0)' : 'translateY(20px)' }}
        >
          <div className="flex items-center justify-center gap-2 text-xs text-white/30 font-semibold tracking-widest uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            测试完成
          </div>
          <p className="text-white/50 text-base mb-1">你的科广专属人格是</p>
          <h1 className="text-5xl font-black text-white">
            <span
              className={`bg-gradient-to-r ${personality.gradient} bg-clip-text text-transparent`}
            >
              {personality.chineseName}
            </span>
          </h1>
        </div>

        <div
          className="mb-8 transition-all duration-700 delay-200"
          style={{ opacity: revealed ? 1 : 0, transform: revealed ? 'translateY(0)' : 'translateY(30px)' }}
        >
          <PersonalityCard personality={personality} scores={scores} />
        </div>

        <div
          className="mb-8 transition-all duration-700 delay-500"
          style={{ opacity: showDesc ? 1 : 0, transform: showDesc ? 'translateY(0)' : 'translateY(20px)' }}
        >
          <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-3">
              人格解读
            </h3>
            <p className="text-white/70 leading-relaxed text-base">{personality.description}</p>
          </div>
        </div>

        <div
          className="mb-8 transition-all duration-700 delay-700"
          style={{ opacity: showDesc ? 1 : 0, transform: showDesc ? 'translateY(0)' : 'translateY(20px)' }}
        >
          <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-4">
              科广 Vibe
            </h3>
            <div className="flex items-center gap-3">
              <MapPin size={16} style={{ color: personality.accentColor }} />
              <p className="text-white/70 text-sm">{personality.campusVibe}</p>
            </div>
          </div>
        </div>

        <div
          className="mb-10 transition-all duration-700 delay-[900ms]"
          style={{ opacity: showDesc ? 1 : 0, transform: showDesc ? 'translateY(0)' : 'translateY(20px)' }}
        >
          <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-4">
              同类型兼容人格
            </h3>
            <div className="flex flex-col gap-3">
              {compatiblePersonalities.map((cp) => (
                <div
                  key={cp.code}
                  className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${cp.accentColor}20, ${cp.accentColor}10)`,
                      border: `1px solid ${cp.accentColor}30`,
                    }}
                  >
                    {cp.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{cp.chineseName}</span>
                      <span
                        className="text-xs font-bold font-mono"
                        style={{ color: cp.accentColor }}
                      >
                        {cp.code}
                      </span>
                    </div>
                    <p className="text-xs text-white/40">{cp.tagline}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className="flex flex-col sm:flex-row gap-3 transition-all duration-700 delay-[1100ms]"
          style={{ opacity: showDesc ? 1 : 0, transform: showDesc ? 'translateY(0)' : 'translateY(20px)' }}
        >
          <button
            onClick={onCommunity}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold px-6 py-3.5 rounded-2xl text-sm transition-all duration-200 shadow-lg shadow-cyan-500/20 hover:scale-[1.02]"
          >
            <Users size={16} />
            查看科广人格图谱
            <ChevronRight size={16} />
          </button>
          <button
            onClick={onRetake}
            className="flex items-center justify-center gap-2 bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-white/20 text-white/60 hover:text-white font-medium px-6 py-3.5 rounded-2xl text-sm transition-all duration-200"
          >
            <RotateCcw size={14} />
            重新测试
          </button>
        </div>
      </div>
    </div>
  );
}

export { computePersonalityCode };
