/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Brain, Target, Star, ChevronLeft } from 'lucide-react';
import Introduction from './components/Introduction';
import Level1_Recognize from './components/Level1_Recognize';
import Level2_Pavlov from './components/Level2_Pavlov';
import Level3_Inhibition from './components/Level3_Inhibition';
import Level4_Constructor from './components/Level4_Constructor';
import Level5_LifeCases from './components/Level5_LifeCases';
import FinalTest from './components/FinalTest';
import Summary from './components/Summary';
import { Achievement } from './types';

const INITIAL_ACHIEVEMENTS: Achievement[] = [
  { id: '1', title: 'Новачок', description: 'Завершив перший рівень розпізнавання', unlocked: false, icon: '🌱' },
  { id: '2', title: 'Експериментатор', description: 'Успішно провів дослід Павлова', unlocked: false, icon: '🔬' },
  { id: '3', title: 'Дослідник', description: 'Розібрався в процесах гальмування', unlocked: false, icon: '🕵️' },
  { id: '4', title: 'Творець', description: 'Сконструював власну рефлекторну дугу', unlocked: false, icon: '🛠️' },
  { id: '5', title: 'Експерт', description: 'Проаналізував життєві ситуації', unlocked: false, icon: '💡' },
  { id: '6', title: 'Павлов 2.0', description: 'Склав фінальний тест на відмінно', unlocked: false, icon: '🎖️' },
];

export default function App() {
  const [level, setLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [achievements, setAchievements] = useState<Achievement[]>(INITIAL_ACHIEVEMENTS);

  const unlockAchievement = (id: string) => {
    setAchievements(prev => prev.map(a => a.id === id ? { ...a, unlocked: true } : a));
  };

  const nextLevel = () => setLevel(l => l + 1);

  const handleLevelComplete = (points: number, achievementId?: string) => {
    setScore(s => s + points);
    if (achievementId) unlockAchievement(achievementId);
    
    // Custom check for Pavlov 2.0
    if (level === 6 && points >= 13) unlockAchievement('6');
    
    nextLevel();
  };

  const renderLevel = () => {
    switch (level) {
      case 0: return <Introduction onStart={nextLevel} />;
      case 1: return <Level1_Recognize onComplete={(s) => handleLevelComplete(s, '1')} />;
      case 2: return <Level2_Pavlov onComplete={(s) => handleLevelComplete(s, '2')} />;
      case 3: return <Level3_Inhibition onComplete={(s) => handleLevelComplete(s, '3')} />;
      case 4: return <Level4_Constructor onComplete={(s) => handleLevelComplete(s, '4')} />;
      case 5: return <Level5_LifeCases onComplete={(s) => handleLevelComplete(s, '5')} />;
      case 6: return <FinalTest onComplete={(s) => handleLevelComplete(s)} />;
      case 7: return <Summary totalScore={score} achievements={achievements} onRestart={() => { 
        setLevel(0); 
        setScore(0); 
        setAchievements(INITIAL_ACHIEVEMENTS); 
      }} />;
      default: return <Introduction onStart={nextLevel} />;
    }
  };

  return (
    <div className="fixed inset-0 bg-brand-slate-50 font-sans text-brand-slate-900 overflow-hidden flex flex-col">
      {/* Header */}
      <header className="h-16 bg-white border-b border-brand-slate-200 flex items-center justify-between px-8 shrink-0">
        <div className="flex items-center space-x-3">
          <div className="bg-brand-blue p-2 rounded-lg text-white">
            <Brain size={24} />
          </div>
          <div>
            <h1 className="text-lg font-bold leading-none">НейроЛаб 8.0</h1>
            <p className="text-[10px] text-brand-slate-500 uppercase tracking-widest font-black">Рефлекси: Умовні та безумовні</p>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <span className="text-xs font-bold text-brand-slate-500 uppercase">Прогрес:</span>
            <div className="w-48 bento-progress-track">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(level / 7) * 100}%` }}
                className="bento-progress-fill"
              />
            </div>
            <span className="text-xs font-bold text-brand-blue uppercase">Рівень {level}/7</span>
          </div>
          <div className="flex items-center bg-brand-amber/10 px-3 py-1 rounded-full border border-brand-amber/20">
            <Star size={14} className="text-brand-amber mr-1.5 fill-brand-amber" />
            <span className="text-brand-amber font-bold text-sm">{score} XP</span>
          </div>
        </div>

        {level > 0 && level < 7 && (
          <button 
            onClick={() => setLevel(l => l - 1)}
            className="p-2 hover:bg-brand-slate-100 rounded-full transition-colors"
            title="Назад"
          >
            <ChevronLeft size={20} className="text-brand-slate-400" />
          </button>
        )}
      </header>

      {/* Main Content Area - Bento Layout Center */}
      <main className="flex-1 overflow-y-auto bg-brand-slate-50 relative custom-scrollbar">
        {/* Decorative background elements consistent with Bento design */}
        <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -z-10 w-96 h-96 bg-brand-green/5 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto p-6 md:p-8">
           <AnimatePresence mode="wait">
             <motion.div
               key={level}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               transition={{ duration: 0.3 }}
             >
               {renderLevel()}
             </motion.div>
           </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="h-10 bg-brand-slate-100 border-t border-brand-slate-200 flex items-center px-8 justify-between shrink-0">
        <div className="text-[10px] font-bold text-brand-slate-400 uppercase tracking-widest">Версія 2.0.1 | Симуляція НВД</div>
        <div className="flex space-x-6">
          <div className="text-[10px] font-bold text-brand-slate-500 uppercase tracking-widest cursor-default">8 Клас</div>
          <div className="text-[10px] font-bold text-brand-slate-500 uppercase tracking-widest cursor-default">Біологія</div>
        </div>
      </footer>

      {/* Mobile Stats Bar */}
      <div className="md:hidden sticky bottom-0 w-full bg-white border-t border-brand-slate-200 px-6 py-3 flex justify-between items-center z-50">
         <div className="flex items-center gap-2">
            <Target size={16} className="text-brand-blue" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Level {level}</span>
         </div>
         <div className="flex items-center gap-2">
            <Star size={16} className="text-brand-amber fill-brand-amber" />
            <span className="text-[10px] font-bold uppercase tracking-wider">{score} XP</span>
         </div>
      </div>
    </div>
  );
}
