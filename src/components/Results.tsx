import { motion } from 'motion/react';
import { AnswerRecord } from '../types';
import { RefreshCcw, CheckCircle2, XCircle } from 'lucide-react';

interface ResultsProps {
  answers: AnswerRecord[];
  onRestart: () => void;
}

export function Results({ answers, onRestart }: ResultsProps) {
  const correctCount = answers.filter(a => a.isCorrect).length;
  const totalCount = answers.length;
  const percentage = Math.round((correctCount / totalCount) * 100);

  let ratingMessage = "";
  let badgeColor = "";

  if (percentage === 100) {
    ratingMessage = "Гуру географии! Идеально!";
    badgeColor = "text-yellow-600 bg-yellow-50 border-yellow-200";
  } else if (percentage >= 80) {
    ratingMessage = "Отличный знаток географии!";
    badgeColor = "text-emerald-700 bg-emerald-50 border-emerald-200";
  } else if (percentage >= 50) {
    ratingMessage = "Хороший результат, но есть куда расти.";
    badgeColor = "text-indigo-600 bg-indigo-50 border-indigo-200";
  } else {
    ratingMessage = "Нужно больше путешествовать и изучать карту!";
    badgeColor = "text-rose-600 bg-rose-50 border-rose-200";
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl mx-auto pb-12"
    >
      <div className="bg-white rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-white p-8 sm:p-12 text-center mb-8">
        <motion.div 
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }} 
          transition={{ type: "spring", delay: 0.2 }}
          className="w-32 h-32 mx-auto bg-indigo-50 rounded-full flex items-center justify-center mb-6 border-4 border-indigo-100 shadow-inner"
        >
          <span className="text-4xl font-display font-black text-indigo-600">
            {correctCount}/{totalCount}
          </span>
        </motion.div>
        
        <h2 className="text-3xl font-display font-extrabold text-slate-800 mb-4">Тест завершён!</h2>
        <div className={`inline-block px-4 py-2 rounded-full border ${badgeColor} mb-8 font-medium`}>
          {ratingMessage}
        </div>

        <button
          onClick={onRestart}
          className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all mx-auto w-full sm:w-auto"
        >
          <RefreshCcw className="w-5 h-5" />
          Пройти тест заново
        </button>
      </div>

      <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/40 border border-slate-100 p-6 sm:p-10">
        <h3 className="text-2xl font-display font-extrabold text-slate-800 mb-6">Сводка ответов</h3>
        
        <div className="flex flex-col gap-4">
          {answers.map((record, idx) => (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * idx }}
              key={idx} 
              className={`p-4 rounded-2xl border ${record.isCorrect ? 'bg-emerald-50 border-emerald-100 text-slate-700' : 'bg-rose-50 border-rose-100 text-slate-700'} flex flex-col sm:flex-row sm:items-center justify-between gap-4`}
            >
              <div>
                <h4 className="text-lg font-bold text-slate-800">{record.question.country}</h4>
                <div className="text-sm mt-1 flex flex-col gap-1">
                  <span className="text-slate-500">
                    Правильный ответ: <span className="text-emerald-700 font-semibold">{record.question.correctCapital}</span>
                  </span>
                  {!record.isCorrect && (
                    <span className="text-slate-500">
                      Ваш ответ: <span className="text-rose-600 font-semibold line-through">{record.selectedAnswer}</span>
                    </span>
                  )}
                </div>
              </div>
              <div className="shrink-0">
                {record.isCorrect ? (
                  <div className="flex items-center gap-2 text-emerald-700 bg-emerald-100/50 px-3 py-1.5 rounded-full text-sm font-bold">
                    <CheckCircle2 className="w-4 h-4" /> Верно
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-rose-700 bg-rose-100/50 px-3 py-1.5 rounded-full text-sm font-bold">
                    <XCircle className="w-4 h-4" /> Ошибка
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
