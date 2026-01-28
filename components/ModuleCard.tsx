
import React from 'react';
import { LatinModule } from '../types';

interface ModuleCardProps {
  module: LatinModule;
  isCompleted: boolean;
  onClick: () => void;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({ module, isCompleted, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="group relative bg-white rounded-2xl p-6 shadow-sm border-2 border-transparent hover:border-red-400 transition-all text-left w-full overflow-hidden"
    >
      <div className="flex items-start gap-4">
        <div className="text-4xl bg-orange-50 p-3 rounded-xl group-hover:scale-110 transition-transform">
          {module.icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
              {module.category}
            </span>
            {isCompleted && (
              <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full font-bold">
                ABGESCHLOSSEN
              </span>
            )}
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2 roman-title">
            {module.title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {module.description}
          </p>
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <span className="text-red-500 font-bold group-hover:translate-x-1 transition-transform">
          Lernen →
        </span>
      </div>
    </button>
  );
};
