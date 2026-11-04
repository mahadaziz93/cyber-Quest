import React from 'react';
import { 
  Shield, 
  Sparkles, 
  ArrowRight, 
  Award, 
  CheckCircle2, 
  AlertCircle, 
  Mail, 
  Lock, 
  BookOpen, 
  TrendingUp,
  Play
} from 'lucide-react';

export default function WelcomeDashboard({ 
  xp, 
  completedCount, 
  totalChallenges, 
  challenges, 
  onStart, 
  onSelectChallenge,
  onOpenHelp, 
  history 
}) {
  const percentComplete = Math.round((completedCount / totalChallenges) * 100);

  return (
    <div className="space-y-10 py-6 animate-fadeIn">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white p-8 sm:p-12 shadow-2xl border border-slate-800">
        {/* Subtle background tech glow */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-blue-600/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-20 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-xs font-semibold mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Interactive Cybersecurity Learning for University Students</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight mb-4">
            Master the art of spotting <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400">
              Phishing & Campus Scams.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-2xl font-normal">
            College students are top targets for bursar refund scams, fake faculty requests, and account suspensions. Step into our simulated inbox, inspect real-world clues, and build lifelong cybersecurity defenses.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={onStart}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-base font-bold text-white bg-blue-600 hover:bg-blue-500 focus:ring-2 focus:ring-blue-400 active:scale-[0.98] shadow-lg shadow-blue-600/30 transition-all group outline-none"
            >
              <span>{completedCount > 0 && completedCount < totalChallenges ? "Resume Training" : completedCount === totalChallenges ? "Retake All Challenges" : "Start Your First Challenge"}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onOpenHelp}
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-base font-semibold text-slate-300 bg-slate-800/80 hover:bg-slate-800 hover:text-white border border-slate-700/80 transition-all outline-none focus:ring-2 focus:ring-blue-500"
            >
              <BookOpen className="w-5 h-5 text-slate-400" />
              <span>How It Works</span>
            </button>
          </div>
        </div>
      </section>

      {/* Gamification Stats Bar */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* XP Points */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Total XP Earned
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{xp}</span>
            <span className="text-xs font-bold text-amber-600">XP</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">100 XP per correct + clue bonuses</p>
        </div>

        {/* Progress Tracker */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Learning Progress
            </span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {completedCount} <span className="text-lg text-slate-400 font-semibold">/ {totalChallenges}</span>
            </span>
            <span className="text-xs font-semibold text-blue-600 ml-auto">{percentComplete}%</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full mt-2.5 overflow-hidden">
            <div 
              className="bg-blue-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${percentComplete}%` }}
            />
          </div>
        </div>

        {/* Defense Rating */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Current Rank
            </span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Shield className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-slate-900 truncate">
            {completedCount === 0 ? "Cyber Cadet" : completedCount === totalChallenges ? "Sentinel" : "Investigator"}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {completedCount === totalChallenges ? "Challenge Completed" : `Scenario ${completedCount + 1} Ready`}
          </p>
        </div>

        {/* Accuracy */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Accuracy
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {history.length > 0 
              ? `${Math.round((history.filter(h => h.isCorrect).length / history.length) * 100)}%`
              : "—"}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {history.length > 0 ? `${history.filter(h => h.isCorrect).length} correct of ${history.length}` : "No attempts yet"}
          </p>
        </div>
      </section>

      {/* Curriculum / Scenario Preview Grid (Interactive) */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-5">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Interactive Training Scenarios
            </h2>
            <p className="text-sm text-slate-500 mt-0.5">
              Click any scenario below to start or replay that challenge directly.
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full w-fit">
            5 Practical Scenarios
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {challenges.map((challenge, index) => {
            const isCompleted = history.some(h => h.challengeId === challenge.id);
            const userHistory = history.find(h => h.challengeId === challenge.id);

            return (
              <div 
                key={challenge.id}
                onClick={() => onSelectChallenge && onSelectChallenge(index)}
                className={`relative rounded-2xl p-5 border transition-all cursor-pointer group text-left ${
                  isCompleted 
                    ? "bg-slate-50/70 border-slate-200 hover:border-blue-400 hover:bg-white" 
                    : "bg-white border-slate-200/80 hover:border-blue-500 hover:shadow-md"
                }`}
              >
                {/* Status indicator badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                    Scenario 0{index + 1}
                  </span>
                  {isCompleted ? (
                    <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-md ${
                      userHistory?.isCorrect 
                        ? "bg-emerald-100 text-emerald-800" 
                        : "bg-amber-100 text-amber-800"
                    }`}>
                      {userHistory?.isCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                      {userHistory?.isCorrect ? "Mastered" : "Reviewed"}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 group-hover:translate-x-0.5 transition-transform">
                      <Play className="w-3 h-3 fill-blue-600" />
                      <span>Start</span>
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-slate-900 text-base mb-1.5 line-clamp-1 group-hover:text-blue-600 transition-colors">
                  {challenge.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-2">
                  {challenge.learningObjective}
                </p>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    {challenge.category}
                  </span>
                  <span className="font-semibold text-slate-700">
                    {challenge.difficulty}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Cyber Defense Best Practice Tips Card */}
      <section className="bg-slate-900 text-slate-200 rounded-3xl p-6 sm:p-8 border border-slate-800">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
            <Lock className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">The University Student Defense Core</h3>
            <p className="text-xs text-slate-400">Remember these 4 rules before clicking any email link</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
            <strong className="block text-white font-semibold mb-1">1. Check the Sender Domain</strong>
            <p className="text-slate-400 leading-relaxed">
              Real university emails end in <code className="text-blue-300">@stateuni.edu</code>. Watch out for lookalikes like <code className="text-amber-300">stateuni-support.com</code>.
            </p>
          </div>

          <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
            <strong className="block text-white font-semibold mb-1">2. Hover Before Clicking</strong>
            <p className="text-slate-400 leading-relaxed">
              Always inspect the previewed URL at the bottom of your browser before clicking. Display text can easily be spoofed.
            </p>
          </div>

          <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
            <strong className="block text-white font-semibold mb-1">3. Beware Urgent Deadlines</strong>
            <p className="text-slate-400 leading-relaxed">
              "Action required in 24 hours or account suspended" is designed to create panic. Take a breath and verify independently.
            </p>
          </div>

          <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
            <strong className="block text-white font-semibold mb-1">4. Never Buy Gift Cards</strong>
            <p className="text-slate-400 leading-relaxed">
              No professor, dean, or campus supervisor will ever ask you to buy Apple/Google gift cards or send codes by email.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
