/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, ChevronRight, MessageSquare } from 'lucide-react';
import { LIFE_CASES } from '../constants';

interface Props {
  onComplete: (score: number) => void;
}

const CATEGORIES = [
  { id: 'unconditional', label: 'Безумовний рефлекс', color: 'green' },
  { id: 'conditional', label: 'Умовний рефлекс', color: 'blue' },
  { id: 'external_inhibition', label: 'Зовнішнє гальмування', color: 'rose' },
  { id: 'internal_inhibition', label: 'Внутрішнє гальмування', color: 'amber' },
];

export default function Level5_LifeCases({ onComplete }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; show: boolean } | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const scenario = LIFE_CASES[currentIndex];

  const handleChoice = (categoryId: string) => {
    if (feedback?.show) return;
    const isCorrect = scenario.type === categoryId;
    if (isCorrect) setScore(s => s + 1);
    setFeedback({ isCorrect, show: true });
  };

  const nextScenario = () => {
    if (currentIndex < LIFE_CASES.length - 1) {
      setCurrentIndex(c => c + 1);
      setFeedback(null);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12 space-y-6">
        <h2 className="text-3xl font-bold">Усі життєві кейси розібрано!</h2>
        <div className="text-5xl font-black text-indigo-600">{score}/{LIFE_CASES.length}</div>
        <p className="text-gray-600">Ти готовий до фінального іспиту на знання рефлексів!</p>
        <button
          onClick={() => onComplete(score)}
          className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold flex items-center space-x-2 mx-auto"
        >
          <span>Фінальний Тест</span>
          <ChevronRight size={20} />
        </button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-brand-slate-900 tracking-tight">Життєві Ситуації</h2>
        <p className="text-brand-slate-500 font-medium">Проаналізуй реальні випадки та визнач тип рефлекторної активності.</p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bento-card !p-10 space-y-10 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-2 h-full bg-brand-blue/10" />
          
          <div className="flex items-start gap-6 p-8 bg-brand-slate-50 rounded-3xl border border-brand-slate-100">
             <MessageSquare className="text-brand-blue/30 mt-1 shrink-0" size={32} />
             <p className="text-2xl font-bold text-brand-slate-800 leading-normal italic">
               «{scenario.text}»
             </p>
          </div>

          {!feedback?.show ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => handleChoice(cat.id)}
                  className="p-5 bg-white border-2 border-brand-slate-100 rounded-2xl font-bold text-brand-slate-700 hover:border-brand-blue hover:bg-blue-50/30 transition-all text-left flex items-center justify-between group"
                >
                  <span className="group-hover:text-brand-blue transition-colors">{cat.label}</span>
                  <div className={`w-3 h-3 rounded-full opacity-30 shadow-[0_0_8px_currentColor]`} style={{ color: `var(--color-brand-${cat.color})` }} />
                </button>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`p-8 rounded-3xl border ${feedback.isCorrect ? 'bg-brand-green/5 border-brand-green/20' : 'bg-red-50 border-red-100'}`}
            >
              <div className="flex items-center justify-center space-x-3 mb-4">
                {feedback.isCorrect ? <CheckCircle2 className="text-brand-green" size={28} /> : <XCircle className="text-red-500" size={28} />}
                <span className={`text-xl font-bold ${feedback.isCorrect ? 'text-brand-green' : 'text-red-600'}`}>
                   {feedback.isCorrect ? 'Чудово!' : 'Не зовсім так...'}
                </span>
              </div>
              <div className="text-center space-y-6">
                <div className="space-y-1">
                  <p className="bento-label">Правильна відповідь:</p>
                  <p className="font-bold text-brand-slate-800 uppercase tracking-tight">{CATEGORIES.find(c => c.id === scenario.type)?.label}</p>
                </div>
                <p className="text-brand-slate-600 text-sm leading-relaxed max-w-lg mx-auto">{scenario.explanation}</p>
                <button 
                  onClick={nextScenario} 
                  className="bento-button-primary w-full !max-w-xs mx-auto"
                >
                  <span>Наступний кейс</span>
                  <ChevronRight size={18} />
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex flex-col items-center gap-4">
        <div className="w-64 bento-progress-track">
           <motion.div 
             animate={{ width: `${((currentIndex + 1) / LIFE_CASES.length) * 100}%` }}
             className="h-full bg-brand-slate-400"
           />
        </div>
        <p className="bento-label">Ситуація {currentIndex + 1} з {LIFE_CASES.length}</p>
      </div>
    </div>
  );
}
