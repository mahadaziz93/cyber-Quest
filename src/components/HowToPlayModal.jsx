import React from 'react';
import { X, ShieldCheck, AlertTriangle, Eye, Award } from 'lucide-react';

export default function HowToPlayModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600/30 border border-blue-400/30 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">How CyberQuest Works</h3>
              <p className="text-xs text-slate-400">Rules & Interactive Clue Guide</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-sm text-slate-600">
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 font-bold text-sm">
              1
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-0.5">Inspect the Simulated Email</h4>
              <p className="text-xs leading-relaxed">
                Review the sender address, subject line, message text, and hyperlinks. Look for subtle spoofing indicators like extra words in the domain or mismatched URLs.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 font-bold text-sm">
              <Eye className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-0.5">Click Clues & Hover Links (+XP Bonus)</h4>
              <p className="text-xs leading-relaxed">
                Click on the interactive clue badges in the email or hover over the fictional action links to preview where they truly lead. Inspecting clues gives you bonus investigator XP!
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold text-sm">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-0.5">Make Your Decision</h4>
              <p className="text-xs leading-relaxed">
                Decide whether the email is <strong className="text-emerald-700">Genuine</strong> (safe campus communication) or <strong className="text-red-700">Suspicious</strong> (phishing or scam).
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 font-bold text-sm">
              <Award className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-0.5">Learn & Earn Badges</h4>
              <p className="text-xs leading-relaxed">
                Read the instant feedback to understand why it was safe or risky, along with practical safety rules for college life. Complete all scenarios to earn your Cyber Sentinel rank!
              </p>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
            <h5 className="font-semibold text-slate-900 text-xs mb-1 flex items-center gap-1.5">
              💡 Scoring System:
            </h5>
            <ul className="text-xs space-y-1 text-slate-600 list-disc list-inside">
              <li><strong className="text-slate-800">+100 XP</strong> for every correct decision</li>
              <li><strong className="text-slate-800">+25 XP</strong> for inspecting red flag clues before answering</li>
              <li><strong className="text-slate-800">Streak bonus</strong> multiplies your defense achievements</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-sm"
          >
            Got it, Let's Play!
          </button>
        </div>
      </div>
    </div>
  );
}
