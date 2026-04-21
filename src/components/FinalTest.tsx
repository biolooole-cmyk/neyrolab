/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, ChevronRight, HelpCircle, Trophy, Brain } from 'lucide-react';
import { FINAL_TEST } from '../constants';

interface Props {
  onComplete: (score: number) => void;
}

export default function FinalTest({ onComplete }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const question = FINAL_TEST[currentIndex];

  const handleSelect = (idx: number) => {
    if (showExplanation) return;
    setSelectedOption(idx);
    setShowExplanation(true);
    if (idx === question.answer) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < FINAL_TEST.length - 1) {
      setCurrentIndex(c => c + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
     return (
       <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-2xl mx-auto text-center py-12 space-y-10">
          <div className="relative inline-block">
            <div className="w-24 h-24 bg-brand-amber/10 text-brand-amber rounded-3xl flex items-center justify-center border border-brand-amber/20 mx-auto">
               <Trophy size={48} className="drop-shadow-[0_0_10px_rgba(245,158,11,0.2)]" />
            </div>
            <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute -inset-2 bg-brand-amber/10 rounded-full blur-xl -z-10" />
          </div>

          <div className="space-y-4">
             <h2 className="text-4xl font-black text-brand-slate-900 tracking-tight">Тест завершено!</h2>
             <div className="flex items-center justify-center gap-4">
                <span className="text-6xl font-black text-brand-blue">{score}</span>
                <span className="text-2xl font-bold text-brand-slate-300">/ {FINAL_TEST.length}</span>
             </div>
             <p className="bento-label !text-brand-slate-400">Твій нейронний показник</p>
          </div>

          <p className="text-xl text-brand-slate-500 font-medium leading-relaxed max-w-md mx-auto">
             {score === FINAL_TEST.length ? 'Неймовірно! Ти справжній майстер нейробіології!' : 
              score > 10 ? 'Чудовий результат! Ти впевнено володієш матералом.' : 
              'Це добрий початок. Рекомендуємо переглянути складні моменти ще раз.'}
          </p>

          <button
            onClick={() => onComplete(score)}
            className="bento-button-primary !px-12 !py-5 mx-auto shadow-2xl"
          >
            <span>Отримати Підсумок</span>
            <ChevronRight size={20} />
          </button>
       </motion.div>
     );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 space-y-10">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-3 text-brand-slate-800">
          <HelpCircle className="text-brand-blue" />
          Підсумковий Тест
        </h2>
        <span className="bento-label px-3 py-1 bg-brand-slate-100 border border-brand-slate-200 rounded-lg">
          {currentIndex + 1} / {FINAL_TEST.length}
        </span>
      </div>

      <div className="bento-progress-track">
        <motion.div animate={{ width: `${((currentIndex + 1) / FINAL_TEST.length) * 100}%` }} className="h-full bg-brand-blue" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
           key={currentIndex}
           initial={{ opacity: 0, scale: 0.98 }}
           animate={{ opacity: 1, scale: 1 }}
           exit={{ opacity: 0, scale: 1.02 }}
           className="bento-card !p-12 space-y-10 min-h-[450px] flex flex-col justify-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-slate-50 rounded-bl-[100px] -z-10 opacity-50" />
          
          <h3 className="text-2xl font-bold text-brand-slate-800 leading-snug">
            {question.question}
          </h3>

          <div className="grid grid-cols-1 gap-3">
            {question.options.map((option, idx) => {
              let status = 'default';
              if (showExplanation) {
                if (idx === question.answer) status = 'correct';
                else if (idx === selectedOption) status = 'wrong';
              }

              return (
                <button
                  key={idx}
                  disabled={showExplanation}
                  onClick={() => handleSelect(idx)}
                  className={`p-5 rounded-2xl text-left font-bold transition-all flex items-center justify-between border-2 group
                    ${status === 'default' ? 'border-brand-slate-100 bg-white hover:border-brand-blue/30 hover:bg-brand-slate-50' : ''}
                    ${status === 'correct' ? 'border-brand-green bg-brand-green/5 text-brand-green' : ''}
                    ${status === 'wrong' ? 'border-rose-200 bg-rose-50 text-rose-600' : ''}
                  `}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black font-mono text-xs ${
                      status === 'correct' ? 'bg-brand-green text-white' : 'bg-brand-slate-100 text-brand-slate-400 group-hover:bg-brand-blue/10 group-hover:text-brand-blue'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span>{option}</span>
                  </div>
                  {status === 'correct' && <CheckCircle2 size={24} className="text-brand-green" />}
                  {status === 'wrong' && <XCircle size={24} className="text-rose-500" />}
                </button>
              );
            })}
          </div>

          <AnimatePresence>
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-6 rounded-2xl border ${selectedOption === question.answer ? 'bg-brand-green/5 border-brand-green/20' : 'bg-brand-slate-50 border-brand-slate-200'}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${selectedOption === question.answer ? 'bg-brand-green/10 text-brand-green' : 'bg-brand-slate-200 text-brand-slate-500'}`}>
                    <Brain size={20} />
                  </div>
                  <div className="space-y-4 flex-1">
                    <p className="text-sm leading-relaxed text-brand-slate-600">
                      <span className="font-bold underline decoration-brand-blue/30">Аналіз:</span> {question.explanation}
                    </p>
                    <button
                      onClick={handleNext}
                      className="bento-button-primary w-full !bg-brand-slate-900 group"
                    >
                      <span className="font-black text-xs uppercase tracking-widest">{currentIndex === FINAL_TEST.length - 1 ? 'Фінальний результат' : 'Наступне питання'}</span>
                      <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
