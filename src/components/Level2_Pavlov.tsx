/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, Utensils, Zap, Info, RotateCcw, ChevronRight } from 'lucide-react';

interface Props {
  onComplete: (score: number) => void;
}

export default function Level2_Pavlov({ onComplete }: Props) {
  const [bellActive, setBellActive] = useState(false);
  const [foodActive, setFoodActive] = useState(false);
  const [salivation, setSalivation] = useState(false);
  const [strength, setStrength] = useState(0);
  const [history, setHistory] = useState<string[]>([]);
  const [isConditioning, setIsConditioning] = useState(false);
  const [showExplanation, setShowExplanation] = useState(true);

  const handleBell = () => {
    setBellActive(true);
    setTimeout(() => setBellActive(false), 1000);

    if (strength > 30) {
      setSalivation(true);
      setTimeout(() => setSalivation(false), 2000);
    }
    
    setHistory(h => ["Дзвінок", ...h].slice(0, 5));
    
    // Check for logical conditioning: Bell then Food
    setIsConditioning(true);
    setTimeout(() => setIsConditioning(false), 2000);
  };

  const handleFood = () => {
    setFoodActive(true);
    setSalivation(true);
    setTimeout(() => {
      setFoodActive(false);
      setSalivation(false);
    }, 1500);

    if (isConditioning) {
      setStrength(s => Math.min(100, s + 20));
      setHistory(h => ["Дзвінок + Їжа! (Зв'язок +)", ...h].slice(0, 5));
    } else {
      setHistory(h => ["Просто їжа (Безумовний)", ...h].slice(0, 5));
    }
  };

  const reset = () => {
    setStrength(0);
    setHistory([]);
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-brand-slate-900 tracking-tight">Експеримент Павлова</h2>
        <p className="text-brand-slate-500 font-medium max-w-lg mx-auto">Сформуй умовний рефлекс, поєднуючи звук дзвіночка з подачею їжі.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Lab Controls - Side Bento Block */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bento-card !p-8">
            <p className="bento-label mb-6">Пульт управління</p>
            
            <div className="space-y-4">
              <button
                onClick={handleBell}
                className={`w-full p-5 rounded-2xl flex items-center justify-between font-bold transition-all border-2 ${bellActive ? 'bg-brand-blue text-white shadow-lg border-brand-blue' : 'bg-brand-blue/5 text-brand-blue border-brand-blue/10 hover:border-brand-blue/30'}`}
              >
                <span>Дзвінок</span>
                <Bell size={24} className={bellActive ? 'animate-ring' : ''} />
              </button>

              <button
                onClick={handleFood}
                className={`w-full p-5 rounded-2xl flex items-center justify-between font-bold transition-all border-2 ${foodActive ? 'bg-brand-green text-white shadow-lg border-brand-green' : 'bg-brand-green/5 text-brand-green border-brand-green/10 hover:border-brand-green/30'}`}
              >
                <span>Їжа</span>
                <Utensils size={24} />
              </button>
            </div>

            <div className="pt-10">
              <div className="flex justify-between text-[11px] font-bold text-brand-slate-400 uppercase mb-3">
                <span>Сила рефлексу</span>
                <span>{Math.round(strength)}%</span>
              </div>
              <div className="bento-progress-track">
                <motion.div 
                  animate={{ width: `${strength}%`, backgroundColor: strength > 70 ? '#10b981' : '#2563eb' }}
                  className="h-full transition-all duration-300"
                />
              </div>
            </div>

            <button onClick={reset} className="mt-8 flex items-center gap-2 text-[10px] font-bold text-brand-slate-300 hover:text-brand-slate-500 mx-auto uppercase tracking-tighter transition-colors">
              <RotateCcw size={14} /> Скинути прогрес
            </button>
          </div>
        </div>

        {/* Simulation Area - Large Bento Block */}
        <div className="lg:col-span-8 bento-card !p-0 !bg-brand-slate-900 relative overflow-hidden flex flex-col items-center justify-center min-h-[450px]">
          <div className="absolute top-6 left-6 bento-label !text-brand-slate-500">Дослідна зона 02</div>
          
          {/* Neural Sync Visualization */}
          <div className="absolute top-12 left-1/2 -translate-x-1/2 w-80 h-3 bg-brand-slate-800 rounded-full flex justify-between px-3 items-center border border-brand-slate-700/50">
             <div className={`w-5 h-5 rounded-full transition-all duration-300 ${bellActive ? 'bg-brand-blue shadow-[0_0_20px_#2563eb]' : 'bg-brand-slate-950'}`} />
             <div className="flex-1 mx-3 relative h-1.5 rounded-full overflow-hidden">
               <motion.div 
                 animate={{ opacity: strength / 100, width: `${strength}%` }}
                 className="absolute inset-0 bg-brand-amber/80 blur-[2px]"
               />
               <motion.div 
                 animate={{ opacity: strength / 100, width: `${strength}%` }}
                 className="absolute inset-0 bg-brand-amber"
               />
             </div>
             <div className={`w-5 h-5 rounded-full transition-all duration-300 ${foodActive ? 'bg-brand-green shadow-[0_0_20px_#10b981]' : 'bg-brand-slate-950'}`} />
          </div>

          {/* Character */}
          <div className="relative mt-8">
            <motion.div
              animate={{ 
                scale: salivation ? [1, 1.05, 1] : 1,
                rotate: bellActive ? [-2, 2, -2] : 0
              }}
              className="text-[140px] drop-shadow-2xl"
            >
              🐕
            </motion.div>
            
            {/* Salivation Bubbles */}
            <AnimatePresence>
              {salivation && (
                <motion.div
                  initial={{ opacity: 0, y: 0, scale: 0 }}
                  animate={{ opacity: 1, y: 20, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute bottom-6 right-10 flex flex-col items-center"
                >
                  <div className="w-5 h-5 bg-blue-100/40 rounded-full blur-[1px]" />
                  <div className="w-3 h-3 bg-blue-50/30 rounded-full blur-[1px] mt-2" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Thought bubble */}
            <AnimatePresence>
               {(strength > 50 && bellActive && !foodActive) && (
                 <motion.div
                  initial={{ opacity: 0, scale: 0.5, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute -top-16 -right-12 p-4 bg-white rounded-3xl border-2 border-brand-blue/20 shadow-2xl text-3xl"
                 >
                   🥩❓
                 </motion.div>
               )}
            </AnimatePresence>
          </div>

          <div className="absolute bottom-8 left-10">
            <p className="bento-label !text-brand-slate-500 mb-2">Лог нейронної мережі: {strength}%</p>
            <div className="space-y-1">
              {history.map((item, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-xs text-brand-slate-400 font-mono flex items-center gap-2">
                  <span className="text-brand-blue">»</span> {item}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {strength === 100 && (
          <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             className="bento-card !p-10 !bg-brand-green/5 !border-brand-green/20 text-center space-y-6"
          >
            <h4 className="text-3xl font-bold text-brand-green">Рефлекс активовано!</h4>
            <p className="text-brand-slate-600 max-w-xl mx-auto">Ти навчив мозок встановлювати новий зв'язок. Тепер умовний подразник (звук) самостійно запускає біологічну відповідь.</p>
            <button
              onClick={() => onComplete(100)}
              className="bento-button-primary !bg-brand-green hover:!bg-green-700 mx-auto"
            >
              <span>Наступний модуль: Гальмування</span>
              <ChevronRight size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes ring {
          0% { transform: rotate(0); }
          25% { transform: rotate(15deg); }
          50% { transform: rotate(-15deg); }
          75% { transform: rotate(15deg); }
          100% { transform: rotate(0); }
        }
        .animate-ring {
          animation: ring 0.2s infinite;
        }
      `}</style>
    </div>
  );
}
