import { Personality, DimensionScore } from '../types';

type PersonalityCardProps = {
  personality: Personality;
  scores: DimensionScore;
};

const dimensionPairs = [
  { leftKey: 'W' as const, rightKey: 'D' as const, leftLabel: '博览', rightLabel: '深耕' },
  { leftKey: 'G' as const, rightKey: 'C' as const, leftLabel: '冲刺', rightLabel: '佛系' },
  { leftKey: 'R' as const, rightKey: 'F' as const, leftLabel: '理性', rightLabel: '感性' },
  { leftKey: 'E' as const, rightKey: 'I' as const, leftLabel: '外向', rightLabel: '内敛' },
];

export default function PersonalityCard({ personality, scores }: PersonalityCardProps) {
  return (
    <div
      className="relative overflow-hidden rounded-3xl border border-white/10"
      style={{
        background: 'linear-gradient(135deg, rgba(6,13,26,0.95) 0%, rgba(10,20,40,0.98) 100%)',
        boxShadow: '0 0 80px rgba(6,182,212,0.08), 0 40px 80px rgba(0,0,0,0.5)',
      }}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${personality.gradient} opacity-[0.08]`}
      />
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-50"
        style={{
          background: `linear-gradient(90deg, transparent, ${personality.accentColor}, transparent)`,
        }}
      />

      <div className="relative z-10 p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-white/30 tracking-[0.25em] uppercase">
                KGTI
              </span>
              <span className="text-xs text-white/20">·</span>
              <span className="text-xs text-white/30">港科广专属人格</span>
            </div>
            <div
              className="text-5xl font-black tracking-wider"
              style={{ color: personality.accentColor }}
            >
              {personality.code}
            </div>
          </div>
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
            style={{
              background: `linear-gradient(135deg, ${personality.accentColor}20, ${personality.accentColor}10)`,
              border: `1px solid ${personality.accentColor}30`,
            }}
          >
            {personality.icon}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-black text-white mb-0.5">{personality.chineseName}</h2>
          <p className="text-sm text-white/40 font-medium mb-2">{personality.englishName}</p>
          <p
            className="text-sm font-semibold italic"
            style={{ color: personality.accentColor + 'cc' }}
          >
            "{personality.tagline}"
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {personality.traits.map((trait) => (
            <span
              key={trait}
              className="text-xs font-semibold px-3 py-1 rounded-full"
              style={{
                background: `${personality.accentColor}18`,
                border: `1px solid ${personality.accentColor}35`,
                color: personality.accentColor,
              }}
            >
              {trait}
            </span>
          ))}
        </div>

        <div className="space-y-3 mb-6">
          {dimensionPairs.map(({ leftKey, rightKey, leftLabel, rightLabel }) => {
            const total = (scores[leftKey] || 0) + (scores[rightKey] || 0) || 1;
            const leftPct = Math.round(((scores[leftKey] || 0) / total) * 100);
            const rightPct = 100 - leftPct;
            const dominant = leftPct >= 50 ? leftLabel : rightLabel;
            const pct = leftPct >= 50 ? leftPct : rightPct;
            return (
              <div key={leftKey}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-white/50">{leftLabel}</span>
                    <span className="text-white/20 text-xs">vs</span>
                    <span className="text-xs text-white/50">{rightLabel}</span>
                  </div>
                  <span className="text-xs font-bold" style={{ color: personality.accentColor }}>
                    {dominant} {pct}%
                  </span>
                </div>
                <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${leftPct}%`,
                      background: `linear-gradient(90deg, ${personality.accentColor}, ${personality.accentColor}80)`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div
          className="text-xs text-white/25 font-mono text-right pt-4 border-t border-white/[0.06]"
        >
          HKUST(GZ) · {new Date().getFullYear()} · kgti.hkustgz
        </div>
      </div>
    </div>
  );
}
