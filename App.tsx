
import React, { useState, useEffect } from 'react';
import { UserStats, LatinModule, AIExplanation, QuizQuestion } from './types';
import { LATIN_MODULES, getRank } from './constants';
import { ModuleCard } from './components/ModuleCard';
import { QuizView } from './components/QuizView';
import { OracleChat } from './components/OracleChat';
import { getAIExplanation, generateQuiz } from './services/geminiService';

const App: React.FC = () => {
  const [user, setUser] = useState<UserStats>(() => {
    const saved = localStorage.getItem('legio_latina_user');
    return saved ? JSON.parse(saved) : {
      xp: 0,
      level: 1,
      completedModules: [],
      rank: 'Rekrut (Tiro)'
    };
  });

  const [activeModule, setActiveModule] = useState<LatinModule | null>(null);
  const [explanation, setExplanation] = useState<AIExplanation | null>(null);
  const [quiz, setQuiz] = useState<QuizQuestion[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<'dashboard' | 'learning' | 'quiz'>('dashboard');

  useEffect(() => {
    localStorage.setItem('legio_latina_user', JSON.stringify(user));
  }, [user]);

  const startModule = async (module: LatinModule) => {
    setLoading(true);
    setActiveModule(module);
    try {
      const expl = await getAIExplanation(module.title);
      setExplanation(expl);
      setView('learning');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const startQuiz = async () => {
    if (!activeModule) return;
    setLoading(true);
    try {
      const q = await generateQuiz(activeModule.title);
      setQuiz(q);
      setView('quiz');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleQuizComplete = (score: number) => {
    const xpGained = score * 100; // Increased XP for motivation
    setUser(prev => {
      const newXp = prev.xp + xpGained;
      const newModules = activeModule && !prev.completedModules.includes(activeModule.id) 
        ? [...prev.completedModules, activeModule.id] 
        : prev.completedModules;
      return {
        ...prev,
        xp: newXp,
        completedModules: newModules,
        rank: getRank(newXp)
      };
    });
    alert(`Magnificum! Du hast ${score}00 XP gesammelt. Dein Wissen wächst!`);
    resetToDashboard();
  };

  const resetToDashboard = () => {
    setView('dashboard');
    setActiveModule(null);
    setExplanation(null);
    setQuiz(null);
  };

  return (
    <div className="min-h-screen pb-20 bg-[#fbf8f3]">
      <header className="bg-white border-b border-red-100 sticky top-0 z-40 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-red-700 text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xl shadow-inner roman-title">L</div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 roman-title leading-none">Legio Latina</h1>
              <p className="text-[10px] text-red-600 font-bold tracking-widest uppercase">CURSUS Edition BW</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 bg-red-50 px-4 py-2 rounded-2xl border border-red-100">
            <div className="text-right">
              <p className="text-[10px] font-black text-red-800 uppercase leading-none">{user.rank}</p>
              <p className="text-sm font-bold text-gray-800">{user.xp} XP</p>
            </div>
            <div className="text-2xl">🎖️</div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {loading && (
          <div className="fixed inset-0 bg-white/90 z-50 flex flex-col items-center justify-center">
            <div className="relative w-24 h-24 mb-6">
              <div className="absolute inset-0 border-4 border-red-100 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center text-3xl">🏺</div>
            </div>
            <p className="text-red-900 font-bold text-xl roman-title animate-pulse">Das Orakel wertet den CURSUS aus...</p>
          </div>
        )}

        {view === 'dashboard' && (
          <div className="animate-fade-in">
            <div className="mb-12 text-center max-w-2xl mx-auto">
              <h2 className="text-4xl font-black text-gray-900 mb-4 roman-title tracking-tight">Dein Weg zum Imperator</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Wir holen jetzt alles nach. Von Lektion 1 bis zu den schweren Brocken der 7. Klasse. Schritt für Schritt, ohne Stress.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {LATIN_MODULES.map((module, idx) => (
                <div key={module.id} className="relative">
                  {idx > 0 && !user.completedModules.includes(LATIN_MODULES[idx-1].id) && (
                    <div className="absolute inset-0 bg-gray-100/40 backdrop-blur-[1px] z-10 rounded-2xl flex items-center justify-center">
                      <span className="bg-white px-4 py-2 rounded-full shadow-md text-xs font-bold text-gray-500 border border-gray-200">🔒 Schließe das vorherige Modul ab</span>
                    </div>
                  )}
                  <ModuleCard
                    module={module}
                    isCompleted={user.completedModules.includes(module.id)}
                    onClick={() => startModule(module)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {view === 'learning' && explanation && (
          <div className="max-w-3xl mx-auto animate-fade-in pb-12">
            <button 
              onClick={resetToDashboard}
              className="mb-8 text-red-700 font-black flex items-center gap-2 hover:bg-red-50 px-4 py-2 rounded-xl transition-all"
            >
              ← ZURÜCK ZUR ÜBERSICHT
            </button>

            <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-red-100">
              <div className="bg-red-700 p-10 text-white relative">
                <div className="absolute top-0 right-0 p-8 opacity-10 text-8xl">📜</div>
                <h2 className="text-4xl font-bold roman-title mb-2">
                  {explanation.concept}
                </h2>
                <p className="text-red-100 font-medium">CURSUS Lektions-Fokus</p>
              </div>
              
              <div className="p-10">
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6 mb-12">
                  {explanation.explanation.split('\n').map((line, i) => (
                    <p key={i} className="text-xl">{line}</p>
                  ))}
                </div>

                <div className="space-y-6 mb-12">
                  <h4 className="font-black text-red-800 uppercase tracking-widest text-sm border-l-4 border-red-600 pl-4">Wichtige Beispiele</h4>
                  <div className="space-y-4">
                    {explanation.examples.map((ex, i) => (
                      <div key={i} className="group bg-gray-50 hover:bg-red-50 p-6 rounded-3xl border border-gray-100 transition-colors">
                        <div className="text-2xl font-black text-red-700 italic mb-2">"{ex.latin}"</div>
                        <div className="text-lg font-bold text-gray-900 mb-2">→ {ex.german}</div>
                        <p className="text-sm text-gray-500 bg-white/50 p-3 rounded-xl">{ex.note}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-orange-50 p-8 rounded-[2rem] border-2 border-orange-100 relative overflow-hidden">
                  <div className="absolute top-0 right-0 text-6xl opacity-10 -mr-4 -mt-4">💡</div>
                  <h4 className="font-black text-orange-900 mb-4 flex items-center gap-3">
                    Der ultimative Merksatz
                  </h4>
                  <ul className="space-y-3">
                    {explanation.mnemonics.map((m, i) => (
                      <li key={i} className="text-orange-950 text-xl font-medium italic list-none">
                        ✨ "{m}"
                      </li>
                    ))}
                  </ul>
                </div>

                <button 
                  onClick={startQuiz}
                  className="w-full mt-12 bg-red-700 hover:bg-red-800 text-white font-black py-6 rounded-3xl shadow-xl transition-all hover:scale-[1.02] active:scale-95 text-xl tracking-tight"
                >
                  PRÜFUNG STARTEN ⚔️
                </button>
              </div>
            </div>
          </div>
        )}

        {view === 'quiz' && quiz && (
          <QuizView 
            questions={quiz} 
            onComplete={handleQuizComplete}
            onCancel={resetToDashboard}
          />
        )}
      </main>

      <OracleChat />
    </div>
  );
};

export default App;
