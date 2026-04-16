import { useState } from 'react';
import Landing from './components/Landing';
import Test from './components/Test';
import Results from './components/Results';
import Community from './components/Community';
import { AppPage, DimensionScore } from './types';
import { supabase, getOrCreateSessionId } from './lib/supabase';
import { computePersonalityCode } from './components/Results';

export default function App() {
  const [page, setPage] = useState<AppPage>('landing');
  const [scores, setScores] = useState<DimensionScore | null>(null);
  const [resultType, setResultType] = useState<string | undefined>(undefined);

  const handleTestComplete = async (finalScores: DimensionScore, answers: string[]) => {
    const code = computePersonalityCode(finalScores);
    setScores(finalScores);
    setResultType(code);
    setPage('results');

    try {
      await supabase.from('test_results').insert({
        session_id: getOrCreateSessionId(),
        personality_type: code,
        scores: finalScores,
        answers: answers,
      });
    } catch {
    }
  };

  const handleRetake = () => {
    setScores(null);
    setResultType(undefined);
    setPage('test');
  };

  return (
    <>
      {page === 'landing' && (
        <Landing
          onStart={() => setPage('test')}
          onCommunity={() => setPage('community')}
        />
      )}
      {page === 'test' && (
        <Test
          onComplete={handleTestComplete}
          onBack={() => setPage('landing')}
        />
      )}
      {page === 'results' && scores && (
        <Results
          scores={scores}
          onRetake={handleRetake}
          onCommunity={() => setPage('community')}
        />
      )}
      {page === 'community' && (
        <Community
          currentType={resultType}
          onBack={() => setPage(resultType ? 'results' : 'landing')}
          onTakeTest={() => setPage('test')}
        />
      )}
    </>
  );
}
