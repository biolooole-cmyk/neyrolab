/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Trophy, Award, RotateCcw, Zap, Brain, Target, Beaker, Play } from 'lucide-react';
import { Achievement } from '../types';

interface Props {
  totalScore: number;
  achievements: Achievement[];
  onRestart: () => void;
}

export default function Summary({ totalScore, achievements, onRestart }: Props) {
  const unlockedAchievements = achievements.filter(a => a.unlocked);

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 space-y-12">
      <div className="text-center space-y-4">
        <motion.div
           initial={{ scale: 0 }}
           animate={{ scale: 1 }}
           className="w-24 h-24 bg-brand-amber/10 rounded-3xl flex items-center justify-center text-brand-amber border border-brand-amber/20 mx-auto mb-6"
        >
          <Trophy size={48} className="drop-shadow-[0_0_10px_rgba(245,158,11,0.3)]" />
        </motion.div>
        <h2 className="text-5xl font-black text-brand-slate-900 tracking-tight">Експедиція <span className="text-brand-blue">Завершена!</span></h2>
        <p className="text-xl text-brand-slate-500 font-medium">Ти успішно опанував основи нервової діяльності.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bento-card text-center !p-10 space-y-3">
          <p className="bento-label">Твій результат</p>
          <p className="text-6xl font-black text-brand-blue">{totalScore}</p>
          <p className="text-xs font-bold text-brand-slate-300 uppercase tracking-widest">XP Накопичено</p>
        </div>
        <div className="bento-card text-center !p-10 space-y-3">
          <p className="bento-label">Досягнення</p>
          <p className="text-6xl font-black text-brand-green">{unlockedAchievements.length}</p>
          <p className="text-xs font-bold text-brand-slate-300 uppercase tracking-widest">Відкрито з {achievements.length}</p>
        </div>
        <div className="bento-card text-center !p-10 space-y-3">
          <p className="bento-label">Статус</p>
          <p className="text-4xl font-black text-brand-amber pt-2 leading-tight">МАЙСТЕР НВД</p>
          <p className="text-[10px] font-bold text-brand-slate-300 uppercase tracking-widest">Ранг 8 Клас</p>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-bold text-brand-slate-800 flex items-center gap-3">
          <Award className="text-brand-blue" />
          Відкриті досягнення:
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {unlockedAchievements.map((achievement, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bento-card !p-6 flex items-center gap-5 border-l-4 border-l-brand-blue bg-white shadow-sm"
            >
              <div className="text-3xl shrink-0 grayscale hover:grayscale-0 transition-all duration-300">
                {achievement.icon}
              </div>
              <div className="text-left">
                <p className="font-bold text-brand-slate-800 text-lg">{achievement.title}</p>
                <p className="text-xs text-brand-slate-500 font-medium">{achievement.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-center pt-8">
        <button
          onClick={onRestart}
          className="bento-button-secondary !px-10 !py-4"
        >
          <RotateCcw size={20} />
          <span>Пройти ще раз</span>
        </button>
        <button
          onClick={() => window.print()}
          className="bento-button-primary !px-10 !py-4 !bg-brand-slate-900"
        >
          <span>Зберегти звіт</span>
          <RotateCcw size={18} className="rotate-90" />
        </button>
      </div>
    </div>
  );
}
