import { useEffect, useState } from 'react';
import { ChevronLeft, TrendingUp, Users, Zap } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { personalities } from '../data/personalities';
import { PersonalityCode } from '../types';

type CommunityProps = {
  currentType?: string;
  onBack: () => void;
  onTakeTest: () => void;
};

type TypeCount = {
  personality_type: string;
  count: number;
};

export default function Community({ currentType, onBack, onTakeTest }: CommunityProps) {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<PersonalityCode | null>(
    currentType as PersonalityCode | null
  );

  useEffect(() => {
    const fetchCounts = async () => {
      const { data, error } = await supabase
        .from('test_results')
        .select('personality_type');

      if (!error && data) {
        const map: Record<string, number> = {};
        data.forEach((row: { personality_type: string }) => {
          map[row.personality_type] = (map[row.personality_type] || 0) + 1;
        });
        setCounts(map);
        setTotal(data.length);
      }
      setLoading(false);
    };

    fetchCounts();
  }, []);

  const sortedTypes = Object.entries(personalities).sort(
    ([a], [b]) => (counts[b] || 0) - (counts[a] || 0)
  );

  const maxCount = Math.max(...Object.values(counts), 1);

  const selectedPersonality = selectedType ? personalities[selectedType] : null;

  return (
    <div className="min-h-screen bg-[#060d1a] text-white">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-10">
        <div className="flex items-center gap-4 mb-10">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm text-white/40 hover:text-white/70 transition-colors"
          >
            <ChevronLeft size={16} />
            返回
          </button>
          <div className="flex-1" />
          {!currentType && (
            <button
              onClick={onTakeTest}
              className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm px-5 py-2.5 rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/20"
            >
              <Zap size={14} />
              开始测试
            </button>
          )}
        </div>

        <div className="mb-10">
          <div className="flex items-center gap-2 text-xs text-white/30 font-semibold tracking-widest uppercase mb-3">
            <TrendingUp size={14} />
            科广人格图谱
          </div>
          <h1 className="text-4xl font-black text-white mb-2">
            科广人都是什么人格？
          </h1>
          <p className="text-white/40 text-base">
            实时数据 · 看看你和哪些同学是同一类人
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { icon: <Users size={18} />, value: loading ? '...' : total.toString(), label: '已参与测试' },
            {
              icon: <TrendingUp size={18} />,
              value: loading ? '...' : sortedTypes[0]?.[0] || '--',
              label: '最常见人格',
            },
            {
              icon: <Zap size={18} />,
              value: '16',
              label: '种人格类型',
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-4 text-center"
            >
              <div className="flex justify-center text-cyan-400 mb-2">{stat.icon}</div>
              <div className="text-2xl font-black text-white mb-0.5">{stat.value}</div>
              <div className="text-xs text-white/30">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
          {sortedTypes.map(([code, personality], index) => {
            const count = counts[code] || 0;
            const pct = total > 0 ? Math.round((count / total) * 100) : 0;
            const barWidth = total > 0 ? (count / maxCount) * 100 : 0;
            const isCurrentType = code === currentType;
            const isSelected = selectedType === code;

            return (
              <button
                key={code}
                onClick={() =>
                  setSelectedType(isSelected ? null : (code as PersonalityCode))
                }
                className={`relative text-left p-4 rounded-2xl border transition-all duration-200 ${
                  isSelected
                    ? 'border-white/20 bg-white/[0.06]'
                    : isCurrentType
                    ? 'border-white/15 bg-white/[0.04]'
                    : 'border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/15'
                }`}
              >
                {isCurrentType && (
                  <div
                    className="absolute top-3 right-3 text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{
                      background: `${personality.accentColor}25`,
                      color: personality.accentColor,
                      border: `1px solid ${personality.accentColor}40`,
                    }}
                  >
                    你
                  </div>
                )}

                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${personality.accentColor}20, ${personality.accentColor}08)`,
                      border: `1px solid ${personality.accentColor}25`,
                    }}
                  >
                    {personality.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white truncate">
                        {personality.chineseName}
                      </span>
                      {index === 0 && total > 0 && (
                        <span className="text-xs text-amber-400 font-bold">👑</span>
                      )}
                    </div>
                    <span
                      className="text-xs font-mono font-bold"
                      style={{ color: personality.accentColor }}
                    >
                      {code}
                    </span>
                  </div>
                </div>

                <div className="mb-1">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-white/30">{count} 人</span>
                    <span className="text-xs font-bold text-white/50">{pct}%</span>
                  </div>
                  <div className="h-1 bg-white/[0.05] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${barWidth}%`,
                        background: `linear-gradient(90deg, ${personality.accentColor}, ${personality.accentColor}80)`,
                        transitionDelay: `${index * 30}ms`,
                      }}
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {selectedPersonality && (
          <div
            className="rounded-2xl border border-white/10 p-6 mb-8 transition-all duration-300"
            style={{
              background: `linear-gradient(135deg, ${selectedPersonality.accentColor}08, rgba(6,13,26,0.95))`,
              borderColor: `${selectedPersonality.accentColor}30`,
            }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
                style={{
                  background: `${selectedPersonality.accentColor}20`,
                  border: `1px solid ${selectedPersonality.accentColor}40`,
                }}
              >
                {selectedPersonality.icon}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-black text-white">{selectedPersonality.chineseName}</h3>
                  <span
                    className="font-mono text-sm font-bold"
                    style={{ color: selectedPersonality.accentColor }}
                  >
                    {selectedPersonality.code}
                  </span>
                </div>
                <p
                  className="text-sm italic"
                  style={{ color: selectedPersonality.accentColor + 'aa' }}
                >
                  "{selectedPersonality.tagline}"
                </p>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">{selectedPersonality.description}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {selectedPersonality.traits.map((t) => (
                <span
                  key={t}
                  className="text-xs font-semibold px-3 py-1 rounded-full"
                  style={{
                    background: `${selectedPersonality.accentColor}15`,
                    border: `1px solid ${selectedPersonality.accentColor}30`,
                    color: selectedPersonality.accentColor,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        <p className="text-center text-xs text-white/15 mt-8">
          数据实时更新 · 仅供娱乐参考 · HKUST(GZ) KGTI Project
        </p>
      </div>
    </div>
  );
}
