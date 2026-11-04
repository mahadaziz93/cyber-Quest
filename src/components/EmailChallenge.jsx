import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  ExternalLink, 
  Eye, 
  HelpCircle, 
  CheckCircle2, 
  Info, 
  Calendar, 
  ShieldAlert, 
  Sparkles,
  Search
} from 'lucide-react';

export default function EmailChallenge({ 
  challenge, 
  challengeIndex, 
  totalChallenges, 
  onSelectOption, 
  onClueInspected,
  inspectedClues = [] 
}) {
  const [showLinkPreview, setShowLinkPreview] = useState(false);
  const [activeClueDetail, setActiveClueDetail] = useState(null);
  const [showHint, setShowHint] = useState(false);

  const { email, clues, learningObjective, category } = challenge;

  const handleClueClick = (clue) => {
    setActiveClueDetail(prev => prev?.id === clue.id ? null : clue);
    onClueInspected(clue.id);
  };

  const handleLinkHover = (state) => {
    setShowLinkPreview(state);
    // Mark link clue inspected across all scenarios
    const linkClue = clues.find(c => 
      c.id.includes('link') || 
      c.id.includes('url') || 
      c.id.includes('handshake') ||
      c.id.includes('gift-cards')
    );
    if (linkClue) {
      onClueInspected(linkClue.id);
    }
  };

  const handleSenderClick = () => {
    // Find sender clue across all scenarios (sender, domain, gmail, From:)
    const senderClue = clues.find(c => 
      c.location?.toLowerCase().includes('from:') || 
      c.id.includes('sender') || 
      c.id.includes('domain') || 
      c.id.includes('gmail')
    );
    if (senderClue) {
      handleClueClick(senderClue);
    }
  };

  return (
    <div className="space-y-6 py-4 animate-fadeIn">
      {/* Top Scenario Context & Objective Banner */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200/60 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Challenge {challengeIndex + 1} of {totalChallenges}
            </span>
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
              {category}
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            {challenge.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-blue-500 shrink-0" />
            <span><strong className="text-slate-800">Objective:</strong> {learningObjective}</span>
          </p>
        </div>

        {/* Interactive Clue Finder Counter */}
        <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 shrink-0 self-start md:self-auto">
          <div className="text-right">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1 justify-end">
              <Eye className="w-3.5 h-3.5 text-blue-600" />
              <span>Clues Found</span>
            </div>
            <div className="text-sm font-extrabold text-slate-800">
              {inspectedClues.length} / {clues.length}
            </div>
          </div>
          <button
            onClick={() => setShowHint(!showHint)}
            className="px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-100/70 hover:bg-blue-100 focus:ring-2 focus:ring-blue-500 rounded-lg transition-colors flex items-center gap-1 outline-none"
            title="Toggle Clue Hints"
            aria-label="Toggle Clue Hints"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{showHint ? "Hide Hint" : "Need Hint?"}</span>
          </button>
        </div>
      </div>

      {/* Optional Hint Banner */}
      {showHint && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 flex items-start gap-3 animate-fadeIn">
          <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold">Investigator Tip for this email:</p>
            <p className="text-amber-800 leading-relaxed">
              Check the exact domain in the <strong>"From:"</strong> address (after the @ symbol). Hover your cursor or tap the verification link to inspect its true destination before deciding!
            </p>
          </div>
        </div>
      )}

      {/* Fictional Email Client Simulation */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        {/* Email Client Window Chrome */}
        <div className="bg-slate-900 px-5 py-3 border-b border-slate-800 flex items-center justify-between text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <span className="font-semibold text-slate-200 ml-2 hidden sm:inline">
              Campus Webmail Client (Simulated Student Inbox)
            </span>
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <span className="bg-slate-800 px-2.5 py-1 rounded-md text-[11px] font-mono text-slate-300">
              alex.morgan@stateuni.edu
            </span>
          </div>
        </div>

        {/* External Sender Security Warning Banner (if present) */}
        {email.externalBanner && (
          <div className="bg-amber-500/10 border-b border-amber-500/20 px-5 py-2.5 text-xs text-amber-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                <strong>External Sender Warning:</strong> This message originated from outside the university server network.
              </span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-200/70 text-amber-900 px-2 py-0.5 rounded shrink-0 ml-2">
              External Gateway
            </span>
          </div>
        )}

        {/* Email Header Info */}
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {email.subject}
            </h1>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 shrink-0">
              <Calendar className="w-3.5 h-3.5" />
              <span>{email.date}</span>
            </div>
          </div>

          {/* Sender & Recipient Box */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm shrink-0 border border-blue-200">
                {email.senderName.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center flex-wrap gap-2">
                  <span className="font-bold text-slate-900 text-sm sm:text-base">
                    {email.senderName}
                  </span>
                  
                  {/* Clickable Sender Inspector Clue */}
                  <button
                    onClick={handleSenderClick}
                    className="inline-flex items-center gap-1 text-xs font-mono px-2 py-0.5 rounded-md bg-white border border-slate-300 text-slate-700 hover:border-blue-500 hover:text-blue-600 focus:ring-2 focus:ring-blue-500 transition-colors shadow-2xs group outline-none"
                    title="Click to inspect sender address"
                    aria-label="Inspect sender address"
                  >
                    <span>&lt;{email.senderEmail}&gt;</span>
                    <Eye className="w-3 h-3 text-slate-400 group-hover:text-blue-500" />
                  </button>
                </div>

                <div className="text-xs text-slate-500 mt-0.5">
                  <span>To: </span>
                  <span className="font-medium text-slate-700">{email.recipient}</span>
                </div>
              </div>
            </div>

            {/* Clue Inspector Mini Button */}
            <div className="flex items-center gap-2 self-start sm:self-center">
              <span className="text-[11px] text-slate-400 italic hidden lg:inline">
                Click sender address or clue badges to examine evidence
              </span>
            </div>
          </div>
        </div>

        {/* Email Body Content */}
        <div className="p-6 sm:p-8 space-y-6 text-slate-800 font-sans text-sm sm:text-base leading-relaxed">
          {/* Salutation */}
          <p className="font-medium text-slate-900">
            {email.body.salutation}
          </p>

          {/* Paragraphs */}
          <div className="space-y-4 text-slate-700">
            {email.body.paragraphs.map((p, idx) => (
              <p key={idx} className="whitespace-pre-line leading-relaxed">
                {p}
              </p>
            ))}
          </div>

          {/* Interactive Call to Action Link / Button Box */}
          {email.body.callToAction && (
            <div className="py-4">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span>Simulated Action Link</span>
                  <span className="text-[11px] font-normal text-blue-600">
                    Hover or tap below to reveal true destination
                  </span>
                </div>

                <div className="relative inline-block w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => handleLinkHover(!showLinkPreview)}
                    onMouseEnter={() => handleLinkHover(true)}
                    onMouseLeave={() => handleLinkHover(false)}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 shadow-md transition-all active:scale-95 w-full sm:w-auto text-center outline-none"
                    aria-label={`Inspect link: ${email.body.callToAction.label}`}
                  >
                    <span>{email.body.callToAction.label}</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>

                  {/* High Tech Hover / Inspection Tooltip */}
                  {showLinkPreview && (
                    <div className="absolute left-0 bottom-full mb-3 z-30 max-w-[calc(100vw-2.5rem)] sm:max-w-md w-80 sm:w-96 p-4 rounded-xl bg-slate-950 text-white shadow-2xl border border-slate-700 text-xs animate-fadeIn">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
                        <span className="font-bold text-blue-400 flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5" />
                          Link Destination Inspector
                        </span>
                        <span className="text-[10px] text-slate-400">Browser Status Bar</span>
                      </div>
                      
                      <div className="space-y-1.5 font-mono text-[11px]">
                        <div>
                          <span className="text-slate-400 block text-[10px] font-sans">Displayed Anchor Text:</span>
                          <span className="text-slate-300 break-all">{email.body.callToAction.displayText}</span>
                        </div>
                        <div className="pt-1 border-t border-slate-800">
                          <span className="text-slate-400 block text-[10px] font-sans">Actual Target URL:</span>
                          <span className={`break-all font-bold ${
                            email.body.callToAction.actualUrl.includes('phishing') || email.body.callToAction.actualUrl.includes('.xyz') || email.body.callToAction.actualUrl.includes('gmail')
                              ? 'text-rose-400'
                              : 'text-emerald-400'
                          }`}>
                            {email.body.callToAction.actualUrl}
                          </span>
                        </div>
                      </div>

                      <p className="mt-2.5 pt-2 border-t border-slate-800 text-[11px] text-slate-300 leading-snug">
                        {email.body.callToAction.previewWarning}
                      </p>
                    </div>
                  )}
                </div>

                <div className="text-xs text-slate-500 font-mono break-all">
                  Visible link text: <span className="text-slate-700 font-semibold">{email.body.callToAction.displayText}</span>
                </div>
              </div>
            </div>
          )}

          {/* Email Signoff */}
          <div className="pt-4 border-t border-slate-100 text-xs sm:text-sm text-slate-600 whitespace-pre-line font-medium">
            {email.body.signoff}
          </div>

          {/* Automated Disclaimer */}
          <div className="text-[11px] text-slate-400 italic">
            {email.body.disclaimer}
          </div>
        </div>

        {/* Clue Inspector Pop-Up Bar if user clicked a clue */}
        {activeClueDetail && (
          <div className="bg-blue-50/90 border-t border-blue-200 p-4 px-6 flex items-start justify-between gap-4 animate-fadeIn">
            <div className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                activeClueDetail.isRedFlag ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
              }`}>
                {activeClueDetail.isRedFlag ? <AlertTriangle className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
              </div>
              <div className="text-xs">
                <span className="font-bold text-slate-900 block text-sm">
                  Investigator Clue: {activeClueDetail.label}
                </span>
                <span className="text-slate-500 font-mono text-[11px] block mt-0.5">
                  Location: {activeClueDetail.location}
                </span>
                <p className="text-slate-700 mt-1 leading-relaxed">
                  {activeClueDetail.description}
                </p>
              </div>
            </div>
            <button
              onClick={() => setActiveClueDetail(null)}
              className="text-xs text-slate-500 hover:text-slate-800 font-bold px-2 py-1 rounded hover:bg-blue-100/60 transition-colors"
            >
              Close
            </button>
          </div>
        )}

        {/* Clue Badges Row (Encouraging students to inspect before answering) */}
        <div className="bg-slate-50 p-4 sm:px-6 border-t border-slate-200/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              Click clues to inspect evidence (+10 bonus XP each):
            </span>
            <div className="flex flex-wrap gap-2">
              {clues.map((clue) => {
                const isInspected = inspectedClues.includes(clue.id);
                const isSelected = activeClueDetail?.id === clue.id;
                return (
                  <button
                    key={clue.id}
                    onClick={() => handleClueClick(clue)}
                    className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all flex items-center gap-1.5 outline-none focus:ring-2 focus:ring-blue-500 ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : isInspected 
                        ? 'bg-blue-50 border-blue-300 text-blue-800 shadow-2xs' 
                        : 'bg-white border-slate-300 text-slate-700 hover:border-blue-400'
                    }`}
                  >
                    {isInspected ? (
                      <CheckCircle2 className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-blue-600'}`} />
                    ) : (
                      <Search className="w-3 h-3 text-slate-400" />
                    )}
                    <span>{clue.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Decision Panel (Genuine vs Suspicious) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl space-y-4">
        <div className="text-center max-w-xl mx-auto mb-2">
          <span className="text-xs font-extrabold text-blue-600 uppercase tracking-widest block mb-1">
            Make Your Evaluation
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Is this email Genuine or Suspicious?
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Carefully review the evidence above. Select your answer to receive immediate educational feedback.
          </p>
        </div>

        {/* Two Clear Primary Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto pt-2">
          {/* Genuine Option */}
          <button
            onClick={() => onSelectOption('genuine')}
            className="group relative flex items-center p-5 rounded-2xl bg-white border-2 border-emerald-500/30 hover:border-emerald-500 hover:bg-emerald-50/40 focus:ring-2 focus:ring-emerald-500 focus:outline-none active:scale-[0.98] transition-all shadow-md hover:shadow-emerald-500/10 text-left"
            aria-label="Mark email as Genuine"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mr-4 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="text-lg font-bold text-slate-900 group-hover:text-emerald-900 flex items-center gap-1.5">
                <span>Genuine</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  Safe
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Authentic university communication with legitimate links and verified sender.
              </p>
            </div>
          </button>

          {/* Suspicious Option */}
          <button
            onClick={() => onSelectOption('suspicious')}
            className="group relative flex items-center p-5 rounded-2xl bg-white border-2 border-rose-500/30 hover:border-rose-500 hover:bg-rose-50/40 focus:ring-2 focus:ring-rose-500 focus:outline-none active:scale-[0.98] transition-all shadow-md hover:shadow-rose-500/10 text-left"
            aria-label="Mark email as Suspicious"
          >
            <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 mr-4 group-hover:scale-105 transition-transform">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <div>
              <div className="text-lg font-bold text-slate-900 group-hover:text-rose-900 flex items-center gap-1.5">
                <span>Suspicious</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-rose-100 text-rose-800">
                  Phishing / Scam
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Deceptive social engineering lure, lookalike domain, or credential risk.
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
