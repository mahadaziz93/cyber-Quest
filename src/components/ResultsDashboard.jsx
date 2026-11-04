import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  ShieldCheck, 
  RotateCcw, 
  Award, 
  CheckCircle2, 
  XCircle, 
  BookOpen, 
  Sparkles,
  Eye
} from 'lucide-react';
import { BADGE_TIERS } from '../data/challenges';

export default function ResultsDashboard({ 
  xp, 
  history, 
  challenges, 
  onRestart,
  onReplayScenario 
}) {
  const totalQuestions = challenges.length;
  const correctCount = history.filter(h => h.isCorrect).length;
  const accuracy = Math.round((correctCount / totalQuestions) * 100);

  // Determine earned badge
  const earnedBadge = BADGE_TIERS.find(b => correctCount >= b.minScore) || BADGE_TIERS[BADGE_TIERS.length - 1];

  // Trigger celebration confetti
  useEffect(() => {
    if (correctCount >= 3) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        console.error("Confetti error", e);
      }
    }
  }, [correctCount]);

  return (
    <div className="space-y-8 py-6 animate-fadeIn">
      {/* Hero Celebration Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white p-8 sm:p-12 border border-slate-800 shadow-2xl text-center">
        {/* Tech Glows */}
        <div className="absolute top-0 right-1/4 -mt-20 w-80 h-80 rounded-full bg-blue-600/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 -mb-20 w-80 h-80 rounded-full bg-indigo-500/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>CyberQuest V2 Training Completed</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Challenge Report Card
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            You evaluated {totalQuestions} real-world university email simulations. Here is your defense readiness profile.
          </p>

          {/* Badge Showcase Card */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col items-center justify-center">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-xl shadow-blue-500/30 mb-3 border-2 border-white/20">
              <ShieldCheck className="w-10 h-10 text-white" />
            </div>

            <div className="space-y-1">
              <div className="text-xs uppercase font-extrabold tracking-widest text-blue-400">
                Official Certification Title
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {earnedBadge.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto mt-2 leading-relaxed">
                {earnedBadge.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Score Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm text-center">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Total Score
          </span>
          <div className="text-3xl sm:text-4xl font-black text-slate-900">
            {correctCount} <span className="text-xl text-slate-400 font-bold">/ {totalQuestions}</span>
          </div>
          <p className="text-xs font-semibold text-emerald-600 mt-1">
            {accuracy}% Accuracy Rate
          </p>
        </div>

        {/* Total XP Earned */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm text-center">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Total XP Earned
          </span>
          <div className="text-3xl sm:text-4xl font-black text-amber-500 flex items-center justify-center gap-1.5">
            <Award className="w-7 h-7 text-amber-500" />
            <span>{xp}</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Includes clue investigation bonuses
          </p>
        </div>

        {/* Defense Evaluation */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm text-center">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Readiness Status
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-blue-600">
            {accuracy >= 80 ? "Phish-Resistant" : accuracy >= 60 ? "Defensive" : "Vulnerable"}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {accuracy >= 80 ? "Campus Safe Instinct" : "Review Recommended"}
          </p>
        </div>
      </div>

      {/* Scenario-by-Scenario Review */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-5">
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              Scenario Decision Breakdown
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Review your choices against the verified security facts
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full w-fit">
            {correctCount} of {totalQuestions} Correct
          </span>
        </div>

        <div className="space-y-4">
          {challenges.map((challenge, index) => {
            const result = history.find(h => h.challengeId === challenge.id);
            const userPick = result?.userSelection;
            const isCorrect = result?.isCorrect;
            const isPhishing = challenge.type === 'suspicious';

            return (
              <div 
                key={challenge.id}
                className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                      isCorrect ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                    }`}>
                      {isCorrect ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                        Scenario {index + 1} • {challenge.category}
                      </span>
                      <h4 className="text-base font-bold text-slate-900">
                        {challenge.title}
                      </h4>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 self-start sm:self-center">
                    <span className="text-xs text-slate-500">
                      Your choice: <strong className="capitalize text-slate-800">{userPick || "—"}</strong>
                    </span>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                      isPhishing ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      Actual: {isPhishing ? "Suspicious" : "Genuine"}
                    </span>
                    {onReplayScenario && (
                      <button
                        onClick={() => onReplayScenario(index)}
                        className="text-xs font-medium text-blue-600 hover:text-blue-800 bg-white border border-slate-300 hover:border-blue-400 px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 ml-1"
                        title="Re-examine this email"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Inspect</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200/70 text-xs text-slate-600 space-y-1">
                  <div className="font-semibold text-slate-800">
                    💡 Key Learning:
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    {challenge.feedback.summary} {challenge.feedback.keyLessons[0]}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* University Student Safety Cheat Sheet */}
      <div className="bg-slate-900 text-slate-200 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-white text-lg">
              Takeaway Cheat Sheet for Real College Life
            </h3>
            <p className="text-xs text-slate-400">
              Save these mental shortcuts whenever reviewing campus emails
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-1.5">
            <h5 className="font-bold text-white">Rule 1: Domain Anatomy</h5>
            <p className="text-slate-400 leading-relaxed">
              Read the domain starting from the right: <span className="text-blue-300 font-mono">support-stateuni.com</span> is a commercial .com site, NOT the university's official <span className="text-emerald-300 font-mono">stateuni.edu</span>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-1.5">
            <h5 className="font-bold text-white">Rule 2: Out-of-Band Verification</h5>
            <p className="text-slate-400 leading-relaxed">
              If an email mentions overdue fines or tuition refunds, don't use their links. Manually open a new browser tab and navigate to <span className="text-blue-300 font-mono">my.stateuni.edu</span>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-1.5">
            <h5 className="font-bold text-white">Rule 3: Report, Don't Ignore</h5>
            <p className="text-slate-400 leading-relaxed">
              Use your student email client's "Report Phishing" button. This automatically updates campus spam filters and shields fellow classmates.
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <button
          onClick={onRestart}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-base font-bold text-white bg-blue-600 hover:bg-blue-500 active:scale-[0.98] shadow-lg shadow-blue-600/30 transition-all group outline-none focus:ring-2 focus:ring-blue-500"
        >
          <RotateCcw className="w-5 h-5 group-hover:-rotate-90 transition-transform duration-300" />
          <span>Restart Challenge (Try for 100%)</span>
        </button>
      </div>
    </div>
  );
}
