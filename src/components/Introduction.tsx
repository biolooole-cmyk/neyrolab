/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Play, BookOpen, Brain, Zap } from 'lucide-react';

interface Props {
  onStart: () => void;
}

export default function Introduction({ onStart }: Props) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-10 py-12 px-4"
    >
      <div className="relative">
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="w-40 h-40 bg-brand-blue/10 rounded-3xl flex items-center justify-center text-brand-blue mb-4 border border-brand-blue/20"
        >
          <Brain size={80} />
        </motion.div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-3 -right-3 w-12 h-12 bg-brand-amber/10 rounded-2xl flex items-center justify-center text-brand-amber border border-brand-amber/20"
        >
          <Zap size={28} />
        </motion.div>
      </div>

      <div className="space-y-6">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-brand-slate-900 leading-tight">
          Світ <span className="text-brand-blue">Рефлексів</span>
        </h1>
        <p className="text-xl text-brand-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
          Привіт, досліднику! Сьогодні ти дізнаєшся, чому ми чхаємо від пилу, чому собака Павлова слинить на дзвінок і як наш мозок формує звички. 
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full text-left">
        <div className="bento-card">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-brand-green/10 text-brand-green rounded-xl border border-brand-green/20">
              <Zap size={24} />
            </div>
            <div>
              <p className="bento-label mb-1">Основи</p>
              <h3 className="font-bold text-lg text-brand-slate-800">Безумовні рефлекси</h3>
              <p className="text-sm text-brand-slate-500 mt-1">Вроджені, захищають нас від народження.</p>
            </div>
          </div>
        </div>
        <div className="bento-card">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-brand-blue/10 text-brand-blue rounded-xl border border-brand-blue/20">
              <BookOpen size={24} />
            </div>
            <div>
              <p className="bento-label mb-1">Навички</p>
              <h3 className="font-bold text-lg text-brand-slate-800">Умовні рефлекси</h3>
              <p className="text-sm text-brand-slate-500 mt-1">Набуті, допомагають адаптуватися до змін.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="bento-button-primary scale-110 !px-12 !py-5 shadow-xl"
        >
          <span>Розпочати Дослідження</span>
          <Play size={20} className="fill-current" />
        </motion.button>
        <p className="bento-label !text-brand-slate-300 pointer-events-none mt-4">Навчальний модуль для 8 класу</p>
      </div>
    </motion.div>
  );
}
