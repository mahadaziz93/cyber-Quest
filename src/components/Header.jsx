import React from 'react';
import { Shield, Award, Flame, HelpCircle, RotateCcw } from 'lucide-react';

export default function Header({ 
  currentScreen, 
  xp, 
  streak, 
  currentChallengeIndex, 
  totalChallenges, 
  onReset,
  onOpenHelp 
}) {
  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={onReset}
          className="flex items-center gap-3 cursor-pointer group select-none transition-transform active:scale-95"
          title="Return to Welcome Dashboard"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-all">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white">
                Cyber<span className="text-blue-400">Quest</span>
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 rounded border border-blue-400/30">
                v2.0
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              University Cybersecurity Training Lab
            </p>
          </div>
        </div>

        {/* Challenge Progress (when playing) */}
        {currentScreen === 'challenge' && (
          <div className="hidden md:flex items-center gap-3 bg-slate-800/80 px-4 py-1.5 rounded-full border border-slate-700/60">
            <span className="text-xs text-slate-300 font-medium">
              Challenge <strong className="text-white">{currentChallengeIndex + 1}</strong> of {totalChallenges}
            </span>
            <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${((currentChallengeIndex + 1) / totalChallenges) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Right Stats & Action Bar */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* XP Counter */}
          <div className="flex items-center gap-1.5 bg-slate-800/90 hover:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 text-xs sm:text-sm font-semibold transition-colors">
            <Award className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="text-amber-400">{xp}</span>
            <span className="text-slate-400 text-xs">XP</span>
          </div>

          {/* Streak Counter */}
          {streak > 0 && (
            <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/30 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-amber-300">
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>{streak}</span>
            </div>
          )}

          {/* Help Button */}
          <button
            onClick={onOpenHelp}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            title="How to Play & Scoring Guide"
            aria-label="Help Guide"
          >
            <HelpCircle className="w-5 h-5" />
          </button>

          {/* Home/Reset button if in challenge or results */}
          {currentScreen !== 'welcome' && (
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors"
              title="Return to Welcome Screen"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Dashboard</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
