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

  // Start / Resume training
  const handleStart = () => {
    if (history.length >= CHALLENGES.length) {
      // Completed all: restart from first
      setCurrentChallengeIndex(0);
      setHistory([]);
      setStreak(0);
      setXp(0);
    } else if (history.length > 0) {
      // Resume at first incomplete challenge
      setCurrentChallengeIndex(history.length);
    } else {
      setCurrentChallengeIndex(0);
    }
    setInspectedClues([]);
    setCurrentScreen('challenge');
  };

  // Jump directly to a chosen scenario
  const handleSelectChallenge = (index) => {
    if (index >= 0 && index < CHALLENGES.length) {
      setCurrentChallengeIndex(index);
      setInspectedClues([]);
      setCurrentScreen('challenge');
    }
  };

  // Mark clue inspected in the current challenge
  const handleClueInspected = (clueId) => {
    if (!inspectedClues.includes(clueId)) {
      setInspectedClues(prev => [...prev, clueId]);
    }
  };

  // User submits Genuine or Suspicious decision
  const handleSelectOption = (selection) => {
    const isCorrect = selection === currentChallenge.type;
    const baseScore = isCorrect ? 100 : 25; // 100 for correct, 25 consolation points for learning effort
    const clueBonus = inspectedClues.length * 10; // +10 XP per unique clue investigated
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
      baseScore,
      clueBonus,
      inspectedCluesCount: inspectedClues.length,
      timestamp: new Date().toISOString()
    };

    setHistory(prev => {
      // Replace existing entry if replaying or append
      const filtered = prev.filter(h => h.challengeId !== currentChallenge.id);
      return [...filtered, newRecord];
    });

    setLastFeedback({
      userSelection: selection,
      isCorrect,
      earnedXp: totalEarned,
      baseScore,
      clueBonus,
      inspectedCluesCount: inspectedClues.length
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

  // Return to welcome dashboard without losing session progress
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
            onSelectChallenge={handleSelectChallenge}
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
            challengeIndex={currentChallengeIndex}
            totalChallenges={CHALLENGES.length}
            userSelection={lastFeedback.userSelection}
            isCorrect={lastFeedback.isCorrect}
            earnedXp={lastFeedback.earnedXp}
            baseScore={lastFeedback.baseScore}
            clueBonus={lastFeedback.clueBonus}
            inspectedCluesCount={lastFeedback.inspectedCluesCount}
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
            onReplayScenario={handleSelectChallenge}
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
