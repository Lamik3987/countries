import { motion } from 'motion/react';
import { useState } from 'react';
import { Question, AnswerRecord } from '../types';
import { CheckCircle2, XCircle, ArrowRight, X } from 'lucide-react';

interface QuizProps {
  questions: Question[];
  onFinish: (answers: AnswerRecord[]) => void;
  onQuit: () => void;
}

export function Quiz({ questions, onFinish, onQuit }: QuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);

  const currentQuestion = questions[currentIndex];

  const handleOptionSelect = (option: string) => {
    if (isAnswered) return;
    
    setSelectedOption(option);
    setIsAnswered(true);
    
    const isCorrect = option === currentQuestion.correctCapital;
    
    setAnswers(prev => [
      ...prev,
      {
        question: currentQuestion,
        selectedAnswer: option,
        isCorrect
      }
    ]);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      onFinish(answers);
    }
  };

  const getOptionStyles = (option: string) => {
    const base = "py-5 px-6 rounded-2xl border-2 text-left flex items-center justify-between font-semibold text-lg transition-all ";
    if (!isAnswered) {
      return base + "border-slate-100 bg-slate-50 text-slate-600 hover:border-indigo-300 group";
    }
    
    if (option === currentQuestion.correctCapital) {
      return base + "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm";
    }
    
    if (option === selectedOption && option !== currentQuestion.correctCapital) {
      return base + "border-rose-500 bg-rose-50 text-rose-700 shadow-sm";
    }
    
    return base + "border-slate-100 bg-slate-50/50 text-slate-400 opacity-60";
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="bg-white rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-white p-6 sm:p-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onQuit}
              title="Завершить тест"
              className="text-slate-400 hover:text-rose-600 bg-slate-50 hover:bg-rose-50 border border-slate-200 p-2 rounded-full transition-all"
            >
              <X className="w-5 h-5" />
            </button>
            <span className="text-slate-500 font-medium text-sm">
              Вопрос {currentIndex + 1} из {questions.length}
            </span>
          </div>
          <div className="h-3 w-48 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
            <motion.div 
              className="h-full bg-indigo-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentIndex) / questions.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <div className="min-h-[280px]">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800 leading-tight mb-2">Назовите столицу:</h2>
            <h1 className="text-4xl sm:text-6xl font-black text-indigo-600 mb-10 tracking-tight">
              {currentQuestion.country}
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentQuestion.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(option)}
                  disabled={isAnswered}
                  className={getOptionStyles(option)}
                >
                  <span className="truncate mr-4">{option}</span>
                  
                  {isAnswered && option === currentQuestion.correctCapital && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                      <div className="h-6 w-6 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-md">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                      </div>
                    </motion.div>
                  )}
                  {isAnswered && option === selectedOption && option !== currentQuestion.correctCapital && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                       <div className="h-6 w-6 bg-rose-500 rounded-full flex items-center justify-center text-white shadow-md">
                        <XCircle className="w-4 h-4 shrink-0" />
                      </div>
                    </motion.div>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {isAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 flex justify-end"
          >
            <button
              onClick={handleNext}
              className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 flex items-center gap-2 transition-all"
            >
              {currentIndex < questions.length - 1 ? 'Следующий вопрос' : 'Показать результаты'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
