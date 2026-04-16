import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { questions } from '../data/questions';
import { DimensionScore } from '../types';

type TestProps = {
  onComplete: (scores: DimensionScore, answers: string[]) => void;
  onBack: () => void;
};

const dimensionLabels: Record<string, string> = {
  WD: '知识广度',
  GC: '学习状态',
  RF: '思维模式',
  EI: '社交模式',
};

const dimensionColors: Record<string, string> = {
  WD: 'from-cyan-500 to-blue-500',
  GC: 'from-amber-500 to-orange-500',
  RF: 'from-emerald-500 to-teal-500',
  EI: 'from-rose-500 to-pink-500',
};

export default function Test({ onComplete, onBack }: TestProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>(new Array(questions.length).fill(''));
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<'forward' | 'back'>('forward');
  const [visible, setVisible] = useState(true);

  const current = questions[currentIndex];
  const progress = ((currentIndex) / questions.length) * 100;
  const answeredCount = answers.filter((a) => a !== '').length;

  useEffect(() => {
    setSelectedOption(answers[currentIndex] || '');
  }, [currentIndex, answers]);

  const navigate = (dir: 'forward' | 'back') => {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    setVisible(false);
    setTimeout(() => {
      if (dir === 'forward') {
        setCurrentIndex((i) => Math.min(i + 1, questions.length - 1));
      } else {
        setCurrentIndex((i) => Math.max(i - 1, 0));
      }
      setVisible(true);
      setAnimating(false);
    }, 220);
  };

  const handleSelect = (value: string) => {
    if (animating) return;
    const newAnswers = [...answers];
    newAnswers[currentIndex] = value;
    setAnswers(newAnswers);
    setSelectedOption(value);

    if (currentIndex < questions.length - 1) {
      setTimeout(() => navigate('forward'), 350);
    }
  };

  const handleFinish = () => {
    const scores: DimensionScore = { W: 0, D: 0, G: 0, C: 0, R: 0, F: 0, E: 0, I: 0 };
    answers.forEach((ans) => {
      if (ans && ans in scores) {
        scores[ans as keyof DimensionScore]++;
      }
    });
    onComplete(scores, answers);
  };

  const allAnswered = answers.every((a) => a !== '');

  return (
    <div className="min-h-screen bg-[#060d1a] text-white flex flex-col">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-cyan-500/5 to-transparent" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col max-w-2xl mx-auto w-full px-6 py-8">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm text-white/40 hover:text-white/70 transition-colors"
          >
            <ChevronLeft size={16} />
            返回
          </button>
          <div className="flex-1" />
          <span className="text-sm text-white/40 font-mono">
            {currentIndex + 1} / {questions.length}
          </span>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-white/30 font-medium">
              已完成 {answeredCount}/{questions.length}
            </span>
            <span className="text-xs text-white/30 font-medium">
              {Math.round(((currentIndex) / questions.length) * 100)}%
            </span>
          </div>
          <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex mt-2 gap-1">
            {questions.map((q, i) => (
              <div
                key={q.id}
                className={`flex-1 h-0.5 rounded-full transition-all duration-300 ${
                  answers[i] !== ''
                    ? 'bg-cyan-400'
                    : i === currentIndex
                    ? 'bg-white/30'
                    : 'bg-white/[0.06]'
                }`}
              />
            ))}
          </div>
        </div>

        <div
          className="flex-1 flex flex-col"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible
              ? 'translateX(0)'
              : direction === 'forward'
              ? 'translateX(-30px)'
              : 'translateX(30px)',
            transition: 'opacity 0.22s ease, transform 0.22s ease',
          }}
        >
          <div className="mb-2">
            <span
              className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r ${dimensionColors[current.dimension]} bg-opacity-20 text-white/60`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${dimensionColors[current.dimension]}`}
              />
              {dimensionLabels[current.dimension]}
            </span>
          </div>

          {current.scenario && (
            <p className="text-sm text-white/40 mb-2 font-medium">{current.scenario}</p>
          )}

          <h2 className="text-2xl font-bold text-white mb-8 leading-snug">
            {current.text}
          </h2>

          <div className="flex flex-col gap-4">
            {[
              { option: current.optionA, label: 'A' },
              { option: current.optionB, label: 'B' },
            ].map(({ option, label }) => {
              const isSelected = selectedOption === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className={`group relative w-full text-left p-5 rounded-2xl border transition-all duration-200 ${
                    isSelected
                      ? 'bg-cyan-500/15 border-cyan-500/50 shadow-lg shadow-cyan-500/10'
                      : 'bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.06] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-200 ${
                        isSelected
                          ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white'
                          : 'bg-white/[0.06] text-white/40 group-hover:bg-white/10 group-hover:text-white/60'
                      }`}
                    >
                      {label}
                    </span>
                    <p
                      className={`text-base leading-relaxed transition-colors duration-200 ${
                        isSelected ? 'text-white' : 'text-white/60 group-hover:text-white/80'
                      }`}
                    >
                      {option.text}
                    </p>
                  </div>
                  {isSelected && (
                    <div className="absolute right-5 top-1/2 -translate-y-1/2">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path
                            d="M1 4L3.5 6.5L9 1"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between mt-8 pt-4">
            <button
              onClick={() => navigate('back')}
              disabled={currentIndex === 0}
              className="flex items-center gap-1.5 text-sm text-white/30 hover:text-white/60 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={16} />
              上一题
            </button>

            {currentIndex === questions.length - 1 && allAnswered ? (
              <button
                onClick={handleFinish}
                className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all duration-200 shadow-lg shadow-cyan-500/20 hover:scale-105"
              >
                查看我的人格
                <ChevronRight size={16} />
              </button>
            ) : (
              <button
                onClick={() => navigate('forward')}
                disabled={currentIndex === questions.length - 1 || selectedOption === ''}
                className="flex items-center gap-1.5 text-sm text-white/30 hover:text-white/60 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
              >
                下一题
                <ChevronRight size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
