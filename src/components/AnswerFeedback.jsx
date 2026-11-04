import React from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  ShieldCheck, 
  AlertTriangle, 
  ArrowRight, 
  Award, 
  Lightbulb, 
  Check, 
  Sparkles
} from 'lucide-react';

export default function AnswerFeedback({ 
  challenge, 
  challengeIndex = 0,
  totalChallenges = 5,
  userSelection, 
  isCorrect, 
  earnedXp, 
  baseScore = 100,
  clueBonus = 0,
  inspectedCluesCount = 0,
  onContinue, 
  isLastChallenge 
}) {
  const { feedback, clues, type } = challenge;
  const isPhishing = type === 'suspicious';

  return (
    <div className="space-y-6 py-4 animate-fadeIn">
      {/* Top Scenario Context & Feedback Verdict Banner */}
      <div className={`rounded-3xl p-6 sm:p-8 border shadow-xl ${
        isCorrect 
          ? 'bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 text-white border-emerald-500/30'
          : 'bg-gradient-to-br from-rose-950 via-slate-900 to-slate-950 text-white border-rose-500/30'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${
              isCorrect ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
            }`}>
              {isCorrect ? (
                <CheckCircle2 className="w-8 h-8" />
              ) : (
                <XCircle className="w-8 h-8" />
              )}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                  isCorrect 
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30' 
                    : 'bg-rose-500/20 text-rose-300 border border-rose-400/30'
                }`}>
                  {isCorrect ? "Correct Decision" : "Educational Opportunity"}
                </span>

                <span className="text-xs text-slate-400 font-medium">
                  Challenge {challengeIndex + 1} of {totalChallenges}
                </span>

                <span className="text-xs text-slate-400">
                  • You selected: <strong className="text-white capitalize">{userSelection}</strong>
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                {isCorrect ? "Spot On! Defense Instinct Verified" : "Not Quite – Good Learning Moment"}
              </h2>

              <p className="text-sm sm:text-base text-slate-300 mt-1 max-w-2xl leading-relaxed">
                This email was actually <strong className={isPhishing ? "text-rose-400 font-bold" : "text-emerald-400 font-bold"}>
                  {isPhishing ? "SUSPICIOUS (Phishing Scam)" : "GENUINE (Safe & Authentic)"}
                </strong>.
              </p>
            </div>
          </div>

          {/* XP Earned Card with Transparent Breakdown */}
          <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-4 text-center shrink-0 min-w-44 shadow-inner">
            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 font-semibold mb-1">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Score Earned</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 flex items-center justify-center gap-1">
              <span>+{earnedXp}</span>
              <span className="text-xs text-amber-300">XP</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1 border-t border-slate-700/60 pt-1 space-y-0.5">
              <div>Base: <span className="text-slate-200 font-semibold">+{baseScore} XP</span></div>
              {clueBonus > 0 && (
                <div className="text-blue-300">
                  Clues ({inspectedCluesCount}): <span className="font-semibold">+{clueBonus} XP</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Educational Breakdown Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Warning Signs / Clues Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-lg space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isPhishing ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'
            }`}>
              {isPhishing ? <AlertTriangle className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">
                {isPhishing ? "Warning Signs & Red Flags" : "Safety Markers & Genuine Indicators"}
              </h3>
              <p className="text-xs text-slate-500">
                Key evidence found inside this sample email
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {feedback.detailedExplanation}
          </p>

          <div className="space-y-3 pt-2">
            {clues.map((clue) => (
              <div 
                key={clue.id}
                className={`p-3.5 rounded-xl border text-xs space-y-1 ${
                  clue.isRedFlag 
                    ? 'bg-rose-50/50 border-rose-200 text-rose-950'
                    : 'bg-emerald-50/50 border-emerald-200 text-emerald-950'
                }`}
              >
                <div className="flex items-center justify-between font-bold">
                  <span className="flex items-center gap-1.5">
                    {clue.isRedFlag ? (
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                    ) : (
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    )}
                    <span>{clue.label}</span>
                  </span>
                  <span className={`text-[10px] font-mono uppercase px-1.5 py-0.5 rounded shrink-0 ml-2 ${
                    clue.isRedFlag ? 'bg-rose-200/60 text-rose-800' : 'bg-emerald-200/60 text-emerald-800'
                  }`}>
                    {clue.isRedFlag ? 'Red Flag' : 'Safe Indicator'}
                  </span>
                </div>
                <div className="font-mono text-[11px] opacity-75">
                  {clue.location}
                </div>
                <p className="opacity-90 leading-relaxed pt-0.5">
                  {clue.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Student Action Plan Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-lg space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Lightbulb className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">
                  What a Student Should Do to Stay Safe
                </h3>
                <p className="text-xs text-slate-500">
                  Real-world protocol for your university account
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {feedback.safeActionSteps.map((step, idx) => (
                <div 
                  key={idx}
                  className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200/80 rounded-xl text-xs sm:text-sm text-slate-700"
                >
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <span className="leading-relaxed">
                    {step}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-4 bg-slate-900 text-slate-200 rounded-2xl text-xs space-y-1.5 border border-slate-800 mt-2">
              <div className="font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>Golden Rule of Cybersecurity:</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                When an email asks for money, banking credentials, or logins—<strong>never click the provided link</strong>. Always navigate independently through your university's official homepage.
              </p>
            </div>
          </div>

          {/* Continue Button */}
          <div className="pt-6 border-t border-slate-100 mt-4">
            <button
              onClick={onContinue}
              className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl font-bold text-base text-white bg-blue-600 hover:bg-blue-500 active:scale-[0.98] shadow-lg shadow-blue-600/25 transition-all group outline-none focus:ring-2 focus:ring-blue-500"
            >
              <span>{isLastChallenge ? "View Final Results & Badge" : "Continue to Next Challenge"}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
