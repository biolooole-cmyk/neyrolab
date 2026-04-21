/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, ChevronRight, HelpCircle } from 'lucide-react';
import { LEVEL1_SCENARIOS } from '../constants';
import { ReflexType } from '../types';

interface Props {
  onComplete: (score: number) => void;
}

export default function Level1_Recognize({ onComplete }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; show: boolean } | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const scenario = LEVEL1_SCENARIOS[currentIndex];

  const handleChoice = (type: ReflexType) => {
    if (feedback?.show) return;

    const isCorrect = scenario.type === type;
    if (isCorrect) setScore(s => s + 1);
    
    setFeedback({ isCorrect, show: true });
  };

  const nextScenario = () => {
    if (currentIndex < LEVEL1_SCENARIOS.length - 1) {
      setCurrentIndex(c => c + 1);
      setFeedback(null);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-6 py-12"
      >
        <h2 className="text-3xl font-bold">Рівень 1 Завершено!</h2>
        <div className="text-6xl font-black text-indigo-600">{score}/{LEVEL1_SCENARIOS.length}</div>
        <p className="text-gray-600">Ти чудово розбираєшся в типах рефлексів!</p>
        <button
          onClick={() => onComplete(score)}
          className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold flex items-center space-x-2 mx-auto"
        >
          <span>До експериментів Павлова</span>
          <ChevronRight size={20} />
        </button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-8 px-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2 text-brand-slate-800">
          <HelpCircle className="text-brand-blue" />
          Розпізнай рефлекс
        </h2>
        <span className="bento-label px-3 py-1 bg-brand-slate-100 border border-brand-slate-200 rounded-lg">
          Завдання {currentIndex + 1} / {LEVEL1_SCENARIOS.length}
        </span>
      </div>

      <div className="bento-progress-track overflow-visible relative">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${((currentIndex + 1) / LEVEL1_SCENARIOS.length) * 100}%` }}
          className="bento-progress-fill rounded-full shadow-[0_0_10px_rgba(37,99,235,0.3)]"
        />
        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-brand-blue rounded-full pulse-animation" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          className="bento-card !p-12 space-y-10 min-h-[350px] flex flex-col justify-center text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-brand-blue/10" />
          
          <div className="space-y-4">
            <p className="bento-label text-brand-slate-300">Проаналізуй ситуацію:</p>
            <h3 className="text-3xl font-bold text-brand-slate-800 leading-tight">
              {scenario.text}
            </h3>
          </div>

          {!feedback?.show ? (
            <div className="grid grid-cols-2 gap-4">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleChoice('unconditional')}
                className="p-5 bg-white border-2 border-brand-green/20 text-brand-green rounded-2xl font-bold hover:bg-brand-green hover:text-white transition-all shadow-sm"
              >
                Безумовний
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleChoice('conditional')}
                className="p-5 bg-white border-2 border-brand-blue/20 text-brand-blue rounded-2xl font-bold hover:bg-brand-blue hover:text-white transition-all shadow-sm"
              >
                Умовний
              </motion.button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-8 rounded-2xl border ${feedback.isCorrect ? 'bg-brand-green/5 border-brand-green/20' : 'bg-red-50 border-red-100'}`}
            >
              <div className="flex items-center justify-center space-x-3 mb-4">
                {feedback.isCorrect ? (
                  <CheckCircle2 className="text-brand-green" size={28} />
                ) : (
                  <XCircle className="text-red-500" size={28} />
                )}
                <span className={`text-xl font-bold ${feedback.isCorrect ? 'text-brand-green' : 'text-red-600'}`}>
                  {feedback.isCorrect ? 'Правильно!' : 'Помилка'}
                </span>
              </div>
              <p className="text-brand-slate-600 text-sm leading-relaxed mb-6">
                {scenario.explanation}
              </p>
              <button
                onClick={nextScenario}
                className="bento-button-primary w-full !py-4"
              >
                <span>Далі</span>
                <ChevronRight size={18} />
              </button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
