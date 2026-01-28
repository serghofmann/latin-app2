
import React, { useState } from 'react';
import { QuizQuestion } from '../types';

interface QuizViewProps {
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
  onCancel: () => void;
}

export const QuizView: React.FC<QuizViewProps> = ({ questions, onComplete, onCancel }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = questions[currentIndex];

  const handleSelect = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);
    if (option === currentQuestion.correctAnswer) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(c => c + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      onComplete(score);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 shadow-xl">
      <div className="flex justify-between items-center mb-8">
        <span className="text-sm font-bold text-gray-400">
          Frage {currentIndex + 1} von {questions.length}
        </span>
        <button onClick={onCancel} className="text-gray-400 hover:text-red-500">
          Abbrechen
        </button>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {currentQuestion.question}
        </h2>

        <div className="space-y-3">
          {currentQuestion.options.map((option) => {
            let bgColor = 'bg-gray-50 border-gray-100';
            if (isAnswered) {
              if (option === currentQuestion.correctAnswer) {
                bgColor = 'bg-green-100 border-green-500 text-green-700';
              } else if (option === selectedOption) {
                bgColor = 'bg-red-100 border-red-500 text-red-700';
              }
            } else if (selectedOption === option) {
              bgColor = 'bg-blue-50 border-blue-400';
            }

            return (
              <button
                key={option}
                onClick={() => handleSelect(option)}
                disabled={isAnswered}
                className={`w-full p-4 text-left rounded-xl border-2 transition-all font-medium ${bgColor}`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>

      {isAnswered && (
        <div className="animate-fade-in mb-8">
          <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
            <p className="text-orange-800 text-sm italic">
              <span className="font-bold">Erklärung:</span> {currentQuestion.explanation}
            </p>
          </div>
          <button
            onClick={nextQuestion}
            className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl shadow-lg transition-transform active:scale-95"
          >
            {currentIndex === questions.length - 1 ? 'Ergebnis sehen' : 'Nächste Frage'}
          </button>
        </div>
      )}
    </div>
  );
};
