/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, RefreshCw, CheckCircle2, XCircle, ChevronRight } from 'lucide-react';
import { INHIBITION_SCENARIOS } from '../constants';

interface Props {
  onComplete: (score: number) => void;
}

export default function Level3_Inhibition({ onComplete }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; show: boolean } | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const scenario = INHIBITION_SCENARIOS[currentIndex];

  const handleChoice = (type: 'external' | 'internal') => {
    if (feedback?.show) return;
    const isCorrect = scenario.type === type;
    if (isCorrect) setScore(s => s + 1);
    setFeedback({ isCorrect, show: true });
  };

  const nextScenario = () => {
    if (currentIndex < INHIBITION_SCENARIOS.length - 1) {
      setCurrentIndex(c => c + 1);
      setFeedback(null);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12 space-y-6">
        <h2 className="text-3xl font-bold">Рівень 3 Завершено!</h2>
        <div className="text-5xl font-black text-rose-500">{score}/{INHIBITION_SCENARIOS.length}</div>
        <p className="text-gray-600">Ти вмієш передбачати, як зупиняються рефлекси!</p>
        <button
          onClick={() => onComplete(score)}
          className="px-8 py-3 bg-rose-500 text-white rounded-xl font-bold flex items-center space-x-2 mx-auto"
        >
          <span>Конструктор Рефлексів</span>
          <ChevronRight size={20} />
        </button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-10">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-brand-slate-900 tracking-tight">Гальмування Рефлексів</h2>
        <p className="text-brand-slate-500 font-medium">Визнач, який механізм стримування спрацює в цій ситуації.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mx-auto">
        <div className="p-5 bg-brand-slate-800 rounded-2xl flex items-center gap-4 border border-brand-slate-700 shadow-md">
           <div className="w-10 h-10 bg-rose-500 rounded-xl flex items-center justify-center text-white">
             <ShieldAlert size={20} />
           </div>
           <div>
             <span className="block font-bold text-white text-sm">Зовнішнє</span>
             <span className="text-[10px] text-rose-300 uppercase font-black tracking-widest">Безумовне</span>
           </div>
        </div>
        <div className="p-5 bg-brand-slate-800 rounded-2xl flex items-center gap-4 border border-brand-slate-700 shadow-md">
           <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-white">
             <RefreshCw size={20} />
           </div>
           <div>
             <span className="block font-bold text-white text-sm">Внутрішнє</span>
             <span className="text-[10px] text-amber-300 uppercase font-black tracking-widest">Умовне / Згасання</span>
           </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          className="bento-card !p-10 space-y-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-slate-50 rounded-bl-[100px] -z-10" />
          
          <div className="space-y-4">
            <p className="bento-label pr-10">Ситуація {currentIndex + 1}:</p>
            <p className="text-2xl font-bold text-brand-slate-800 leading-snug">{scenario.situation}</p>
            <div className="p-4 bg-brand-slate-50 rounded-2xl border border-brand-slate-200">
              <p className="bento-label !text-brand-slate-400 mb-1">Очікуваний результат:</p>
              <p className="text-brand-slate-600 italic font-medium">"{scenario.prediction}"</p>
            </div>
          </div>

          {!feedback?.show ? (
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleChoice('external')}
                className="bento-button-primary !bg-brand-slate-800 !text-rose-400 hover:!bg-brand-slate-900 border border-brand-slate-700 shadow-xl"
              >
                Зовнішнє
              </button>
              <button
                onClick={() => handleChoice('internal')}
                className="bento-button-primary !bg-brand-slate-800 !text-amber-400 hover:!bg-brand-slate-900 border border-brand-slate-700 shadow-xl"
              >
                Внутрішнє
              </button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-8 rounded-2xl border-2 ${feedback.isCorrect ? 'bg-brand-green/5 border-brand-green/20' : 'bg-red-50 border-red-100'}`}
            >
              <div className="flex items-center justify-center space-x-3 mb-4">
                {feedback.isCorrect ? <CheckCircle2 className="text-brand-green" size={28} /> : <XCircle className="text-red-500" size={28} />}
                <span className={`text-xl font-bold ${feedback.isCorrect ? 'text-brand-green' : 'text-red-600'}`}>
                  {feedback.isCorrect ? 'Точно!' : 'Спробуй ще порівняти...'}
                </span>
              </div>
              <p className="text-brand-slate-600 text-sm mb-6 text-center">{scenario.explanation}</p>
              <button onClick={nextScenario} className="bento-button-primary w-full !bg-brand-slate-900">
                <span>Продовжити</span>
                <ChevronRight size={18} />
              </button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-center gap-4">
        <span className="bento-label">Сценарій {currentIndex + 1} / {INHIBITION_SCENARIOS.length}</span>
        <div className="w-40 bento-progress-track">
           <motion.div 
             animate={{ width: `${((currentIndex + 1) / INHIBITION_SCENARIOS.length) * 100}%` }}
             className="h-full bg-brand-slate-400"
           />
        </div>
      </div>
    </div>
  );
}
