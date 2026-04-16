import { ChevronRight, Compass, Zap, Brain, Users } from 'lucide-react';

type LandingProps = {
  onStart: () => void;
  onCommunity: () => void;
};

const dimensions = [
  {
    icon: <Compass size={20} />,
    label: '知识广度',
    left: '博览群书',
    right: '专注深耕',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    icon: <Zap size={20} />,
    label: '学习状态',
    left: '拼命冲刺',
    right: '佛系自在',
    color: 'from-amber-500 to-orange-500',
  },
  {
    icon: <Brain size={20} />,
    label: '思维模式',
    left: '理性逻辑',
    right: '感性直觉',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    icon: <Users size={20} />,
    label: '社交模式',
    left: '热爱连接',
    right: '享受独处',
    color: 'from-rose-500 to-pink-500',
  },
];

export default function Landing({ onStart, onCommunity }: LandingProps) {
  return (
    <div className="min-h-screen bg-[#060d1a] text-white overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] bg-teal-500/5 rounded-full blur-2xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(6,182,212,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-16">
        <nav className="flex items-center justify-between mb-20">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-sm font-black">
              KG
            </div>
            <span className="text-sm font-semibold text-white/60 tracking-widest uppercase">
              KGTI
            </span>
          </div>
          <button
            onClick={onCommunity}
            className="text-sm text-white/50 hover:text-white/80 transition-colors flex items-center gap-1.5"
          >
            <Users size={15} />
            科广人格图谱
          </button>
        </nav>

        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold px-4 py-2 rounded-full mb-8 tracking-wider uppercase">
            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
            港科广专属测试 · Beta
          </div>

          <h1 className="text-6xl md:text-7xl font-black mb-6 leading-tight tracking-tight">
            <span className="text-white">你是哪种</span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400 bg-clip-text text-transparent">
              科广人？
            </span>
          </h1>

          <p className="text-lg text-white/50 max-w-xl mx-auto mb-4 leading-relaxed">
            KGTI 是专属于香港科技大学（广州）学生的趣味人格测试。
            <br />
            16道题，4个维度，生成你的科广专属人格身份名片。
          </p>
          <p className="text-sm text-white/30 mb-12">
            找到你的同好，看看科广人格分布图谱
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onStart}
              className="group flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold px-8 py-4 rounded-2xl text-base transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105"
            >
              开始测试
              <ChevronRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
            <button
              onClick={onCommunity}
              className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/70 hover:text-white font-medium px-8 py-4 rounded-2xl text-base transition-all duration-300"
            >
              查看人格图谱
            </button>
          </div>
        </div>

        <div className="mb-20">
          <p className="text-center text-xs text-white/30 uppercase tracking-widest mb-8 font-semibold">
            KGTI 的四个维度
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {dimensions.map((dim) => (
              <div
                key={dim.label}
                className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5 hover:border-white/15 transition-colors"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className={`w-7 h-7 rounded-lg bg-gradient-to-br ${dim.color} flex items-center justify-center opacity-90`}
                  >
                    {dim.icon}
                  </div>
                  <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">
                    {dim.label}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-white/80">
                    {dim.left}
                  </span>
                  <div className="flex-1 h-px bg-gradient-to-r from-white/20 via-white/40 to-white/20" />
                  <span className="text-sm font-semibold text-white/80">
                    {dim.right}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 text-center">
          {[
            { num: '16', label: '独特人格类型' },
            { num: '16', label: '道专属题目' },
            { num: '4', label: '核心维度测量' },
          ].map((stat) => (
            <div key={stat.label} className="group">
              <div className="text-3xl font-black text-white mb-1 group-hover:text-cyan-400 transition-colors">
                {stat.num}
              </div>
              <div className="text-xs text-white/30 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-white/15 mt-16">
          仅供娱乐，不代表任何专业心理测评 · HKUST(GZ) KGTI Project
        </p>
      </div>
    </div>
  );
}
