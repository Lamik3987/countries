import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { StartScreen } from './components/StartScreen';
import { Quiz } from './components/Quiz';
import { Results } from './components/Results';
import { generateQuestions } from './data';
import { AppState, Question, AnswerRecord } from './types';

export default function App() {
  const [appState, setAppState] = useState<AppState>('START');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);

  const handleStart = (region: string | 'ALL') => {
    setQuestions(generateQuestions(region));
    setAnswers([]);
    setAppState('PLAYING');
  };

  const handleFinish = (finalAnswers: AnswerRecord[]) => {
    setAnswers(finalAnswers);
    setAppState('RESULTS');
  };

  const handleRestart = () => {
    setAppState('START');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-indigo-500/30">
      {/* Background gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-violet-100 rounded-full blur-3xl opacity-50"></div>
      </div>

      <main className="relative flex-grow flex items-center justify-center p-4 sm:p-12 z-10 w-full">
        <AnimatePresence mode="wait">
          {appState === 'START' && (
             <StartScreen key="start" onStart={handleStart} />
          )}
          {appState === 'PLAYING' && (
             <Quiz key="quiz" questions={questions} onFinish={handleFinish} onQuit={handleRestart} />
          )}
          {appState === 'RESULTS' && (
             <Results key="results" answers={answers} onRestart={handleRestart} />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
