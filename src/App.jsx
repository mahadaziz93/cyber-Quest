import React, { useState } from 'react';
import Header from './components/Header';
import WelcomeDashboard from './components/WelcomeDashboard';
import EmailChallenge from './components/EmailChallenge';
import AnswerFeedback from './components/AnswerFeedback';
import ResultsDashboard from './components/ResultsDashboard';
import HowToPlayModal from './components/HowToPlayModal';
import { CHALLENGES } from './data/challenges';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome'); // 'welcome' | 'challenge' | 'feedback' | 'results'
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [history, setHistory] = useState([]);
  const [inspectedClues, setInspectedClues] = useState([]);
  const [lastFeedback, setLastFeedback] = useState(null);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const currentChallenge = CHALLENGES[currentChallengeIndex];

  // Start training
  const handleStart = () => {
    // If user has already finished all, restart; otherwise resume at first incomplete
    if (history.length >= CHALLENGES.length) {
      setCurrentChallengeIndex(0);
      setHistory([]);
      setStreak(0);
    }
    setInspectedClues([]);
    setCurrentScreen('challenge');
  };

  // Inspect clue in challenge
  const handleClueInspected = (clueId) => {
    if (!inspectedClues.includes(clueId)) {
      setInspectedClues(prev => [...prev, clueId]);
      // Award small bonus for active clue investigation
      setXp(prev => prev + 10);
    }
  };

  // User submits Genuine or Suspicious decision
  const handleSelectOption = (selection) => {
    const isCorrect = selection === currentChallenge.type;
    const baseScore = isCorrect ? 100 : 25; // 100 for correct, 25 consolation learning points
    const clueBonus = inspectedClues.length * 5;
    const totalEarned = baseScore + clueBonus;

    setXp(prev => prev + totalEarned);

    if (isCorrect) {
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }

    const newRecord = {
      challengeId: currentChallenge.id,
      userSelection: selection,
      isCorrect,
      earnedXp: totalEarned,
      timestamp: new Date().toISOString()
    };

    setHistory(prev => {
      // Replace existing entry if redoing or append
      const filtered = prev.filter(h => h.challengeId !== currentChallenge.id);
      return [...filtered, newRecord];
    });

    setLastFeedback({
      userSelection: selection,
      isCorrect,
      earnedXp: totalEarned
    });

    setCurrentScreen('feedback');
  };

  // Continue to next challenge or results
  const handleContinue = () => {
    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex(prev => prev + 1);
      setInspectedClues([]);
      setCurrentScreen('challenge');
    } else {
      setCurrentScreen('results');
    }
  };

  // Restart training completely
  const handleRestart = () => {
    setCurrentChallengeIndex(0);
    setHistory([]);
    setStreak(0);
    setXp(0);
    setInspectedClues([]);
    setLastFeedback(null);
    setCurrentScreen('challenge');
  };

  // Return to welcome dashboard without losing progress
  const handleReturnToDashboard = () => {
    setCurrentScreen('welcome');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Top Application Header */}
      <Header
        currentScreen={currentScreen}
        xp={xp}
        streak={streak}
        currentChallengeIndex={currentChallengeIndex}
        totalChallenges={CHALLENGES.length}
        onReset={handleReturnToDashboard}
        onOpenHelp={() => setIsHelpOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-4">
        {currentScreen === 'welcome' && (
          <WelcomeDashboard
            xp={xp}
            completedCount={history.length}
            totalChallenges={CHALLENGES.length}
            challenges={CHALLENGES}
            history={history}
            onStart={handleStart}
            onOpenHelp={() => setIsHelpOpen(true)}
          />
        )}

        {currentScreen === 'challenge' && currentChallenge && (
          <EmailChallenge
            challenge={currentChallenge}
            challengeIndex={currentChallengeIndex}
            totalChallenges={CHALLENGES.length}
            inspectedClues={inspectedClues}
            onClueInspected={handleClueInspected}
            onSelectOption={handleSelectOption}
          />
        )}

        {currentScreen === 'feedback' && currentChallenge && lastFeedback && (
          <AnswerFeedback
            challenge={currentChallenge}
            userSelection={lastFeedback.userSelection}
            isCorrect={lastFeedback.isCorrect}
            earnedXp={lastFeedback.earnedXp}
            onContinue={handleContinue}
            isLastChallenge={currentChallengeIndex === CHALLENGES.length - 1}
          />
        )}

        {currentScreen === 'results' && (
          <ResultsDashboard
            xp={xp}
            history={history}
            challenges={CHALLENGES}
            onRestart={handleRestart}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200/80 bg-white py-6 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">CyberQuest V2</span>
            <span>•</span>
            <span>University Cybersecurity Learning Prototype</span>
          </div>
          <div className="text-slate-400">
            Educational Prototype • Fictional scenarios designed for cybersecurity awareness
          </div>
        </div>
      </footer>

      {/* Help Modal */}
      <HowToPlayModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />
    </div>
  );
}
