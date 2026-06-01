import { motion } from 'motion/react';
import { Globe2 } from 'lucide-react';
import { regionsList } from '../data';

interface StartScreenProps {
  onStart: (region: string | 'ALL') => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto text-center px-4 w-full"
    >
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        transition={{ delay: 0.2, type: "spring" }}
        className="mb-6 flex justify-center"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-indigo-200 blur-3xl opacity-50 rounded-full"></div>
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-2xl shadow-slate-200/50 relative">
            <Globe2 className="w-16 h-16 text-indigo-600" />
          </div>
        </div>
      </motion.div>

      <h1 className="text-4xl md:text-5xl font-display font-extrabold text-slate-800 mb-4 tracking-tight">
        Географический <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">Квиз</span>
      </h1>
      
      <p className="text-lg text-slate-500 mb-8 leading-relaxed max-w-lg mx-auto">
        Проверьте свои знания столиц. Выберите интересующий вас регион или проверьте себя по всем странам.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onStart('ALL')}
          className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all col-span-1 sm:col-span-2"
        >
          Все страны
        </motion.button>
        {regionsList.map(region => (
          <motion.button
            key={region}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onStart(region)}
            className="bg-white text-slate-700 border-2 border-slate-100 px-6 py-4 rounded-xl font-semibold hover:border-indigo-300 hover:text-indigo-700 transition-all"
          >
            {region}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

