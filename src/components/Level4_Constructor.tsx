/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, Lightbulb, Fingerprint, Utensils, Shield, Trophy, ChevronRight, Zap } from 'lucide-react';

interface Props {
  onComplete: (score: number) => void;
}

const STIMULI = [
  { id: 'sound', label: 'Звук дзвінка', icon: Bell, color: 'blue' },
  { id: 'light', label: 'Світло лампи', icon: Lightbulb, color: 'yellow' },
  { id: 'vibration', label: 'Дотик (вібрація)', icon: Fingerprint, color: 'purple' },
];

const REINFORCEMENTS = [
  { id: 'food', label: 'Смачна їжа', icon: Utensils, color: 'orange', description: 'Харчовий рефлекс' },
  { id: 'safety', label: 'Безпечне місце', icon: Shield, color: 'green', description: 'Захисний рефлекс' },
  { id: 'prize', label: 'Винагорода (оцінка)', icon: Trophy, color: 'indigo', description: 'Соціальний рефлекс' },
];

export default function Level4_Constructor({ onComplete }: Props) {
  const [stimulus, setStimulus] = useState<string | null>(null);
  const [reinforcement, setReinforcement] = useState<string | null>(null);
  const [trainingLevel, setTrainingLevel] = useState(0);
  const [isTraining, setIsTraining] = useState(false);
  const [isTested, setIsTested] = useState(false);

  const handleTrain = () => {
    setIsTraining(true);
    setTimeout(() => {
      setTrainingLevel(l => Math.min(100, l + 25));
      setIsTraining(false);
    }, 800);
  };

  const handleTest = () => {
    setIsTested(true);
  };

  const StimulusIcon = STIMULI.find(s => s.id === stimulus)?.icon;
  const ReinforcementIcon = REINFORCEMENTS.find(r => r.id === reinforcement)?.icon;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-10">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-brand-slate-900 tracking-tight">Конструктор Рефлексу</h2>
        <p className="text-brand-slate-500 font-medium max-w-lg mx-auto">Спроектуй власну рефлекторну дугу, вибравши сигнал та підкріплення.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Step 1: Stimulus */}
        <div className="space-y-4">
          <p className="bento-label px-2">Етап 1: Умовний сигнал</p>
          <div className="grid grid-cols-1 gap-3">
            {STIMULI.map(s => (
              <button
                key={s.id}
                onClick={() => setStimulus(s.id)}
                className={`p-5 rounded-2xl border-2 flex items-center gap-4 transition-all ${stimulus === s.id ? 'border-brand-blue bg-blue-50/50 shadow-sm' : 'border-brand-slate-100 bg-white hover:border-brand-slate-200'}`}
              >
                <div className={`p-3 rounded-xl transition-colors ${stimulus === s.id ? 'bg-brand-blue text-white' : 'bg-brand-slate-100 text-brand-slate-400'}`}>
                  <s.icon size={24} />
                </div>
                <span className={`font-bold text-lg ${stimulus === s.id ? 'text-brand-blue' : 'text-brand-slate-700'}`}>{s.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Reinforcement */}
        <div className="space-y-4">
          <p className="bento-label px-2">Етап 2: Підкріплення</p>
          <div className="grid grid-cols-1 gap-3">
            {REINFORCEMENTS.map(r => (
              <button
                key={r.id}
                onClick={() => setReinforcement(r.id)}
                className={`p-5 rounded-2xl border-2 flex items-center gap-4 transition-all ${reinforcement === r.id ? 'border-brand-blue bg-blue-50/50 shadow-sm' : 'border-brand-slate-100 bg-white hover:border-brand-slate-200'}`}
              >
                <div className={`p-3 rounded-xl transition-colors ${reinforcement === r.id ? 'bg-brand-blue text-white' : 'bg-brand-slate-100 text-brand-slate-400'}`}>
                  <r.icon size={24} />
                </div>
                <div className="text-left">
                  <div className={`font-bold text-lg ${reinforcement === r.id ? 'text-brand-blue' : 'text-brand-slate-700'}`}>{r.label}</div>
                  <div className="text-xs font-bold text-brand-slate-400 uppercase tracking-tighter">{r.description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {stimulus && reinforcement && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bento-card !p-10 space-y-10 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-brand-blue/10" />
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-10">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-brand-blue/5 rounded-3xl flex items-center justify-center text-brand-blue border border-brand-blue/10">
                  {StimulusIcon && <StimulusIcon size={40} />}
                </div>
                <div className="text-4xl text-brand-slate-200">→</div>
                <div className="w-20 h-20 bg-brand-amber/5 rounded-3xl flex items-center justify-center text-brand-amber border border-brand-amber/10">
                  {ReinforcementIcon && <ReinforcementIcon size={40} />}
                </div>
              </div>
            </div>

            <div className="max-w-xs mx-auto space-y-3">
              <div className="flex justify-between text-[11px] font-bold text-brand-slate-400 uppercase tracking-widest">
                <span>Прогрес навчання</span>
                <span>{trainingLevel}%</span>
              </div>
              <div className="bento-progress-track">
                <motion.div animate={{ width: `${trainingLevel}%` }} className="h-full bg-brand-blue shadow-[0_0_10px_#2563eb44]" />
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-center gap-4">
              <button
                onClick={handleTrain}
                disabled={trainingLevel >= 100 || isTraining}
                className="bento-button-primary disabled:bg-brand-slate-200"
              >
                {isTraining ? <Zap className="animate-pulse" /> : <span>Запустити цикли навчання</span>}
              </button>
              
              <button
                disabled={trainingLevel < 100}
                onClick={handleTest}
                className="bento-button-secondary disabled:opacity-50"
              >
                Тестувати рефлекс
              </button>
            </div>

            {isTested && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="pt-8 border-t border-brand-slate-100 space-y-6">
                <div className="p-6 bg-brand-green/5 text-brand-green rounded-2xl border border-brand-green/20">
                  <p className="font-bold text-lg mb-1">Успішна фіксація!</p>
                  <p className="text-sm opacity-80 leading-relaxed font-medium">Нова рефлекторна дуга в корі великих півкуль сформована. Організм тепер реагує на новий сигнал як на значущий.</p>
                </div>
                <button
                  onClick={() => onComplete(100)}
                  className="bento-button-primary !bg-brand-slate-900 mx-auto"
                >
                  <span>До життєвих кейсів</span>
                  <ChevronRight size={20} />
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
