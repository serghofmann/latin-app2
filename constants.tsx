
import React from 'react';
import { LatinModule } from './types';

export const LATIN_MODULES: LatinModule[] = [
  // BASICS (Lektion 1-10)
  {
    id: 'deklination-a-o',
    title: 'A- & O-Deklination',
    description: 'Lektion 1-5: Wer macht was? Nominativ & Akkusativ (Subjekt/Objekt) meistern.',
    icon: '🏛️',
    category: 'Grammar'
  },
  {
    id: 'konjugation-praesens',
    title: 'Das Präsens-System',
    description: 'Lektion 1-8: Alle Konjugationen (a-, e-, i-, kons-). Der Motor der Sätze.',
    icon: '⚔️',
    category: 'Grammar'
  },
  {
    id: 'wortschatz-basics-300',
    title: 'Wortschatz-Sprint 1',
    description: 'Die ersten 300 Vokabeln aus CURSUS. Alltagsbegriffe & Verben.',
    icon: '🏺',
    category: 'Vocabulary'
  },

  // MITTELSTUFE (Lektion 11-20)
  {
    id: 'perfekt-imperfekt',
    title: 'Vergangenheit lesen',
    description: 'Lektion 10-12: Perfekt (Handlung abgeschlossen) vs. Imperfekt (Zustand).',
    icon: '📜',
    category: 'Grammar'
  },
  {
    id: 'aci-infinitiv',
    title: 'AcI: Das "Dass"-Satz Geheimnis',
    description: 'Lektion 9/14: Die wichtigste Konstruktion. "Video te venire" = Ich sehe, dass du kommst.',
    icon: '👁️',
    category: 'Translation'
  },
  {
    id: 'dritte-deklination-komplex',
    title: 'Die 3. Deklination',
    description: 'Lektion 11/17: Konsonantische & i-Stämme. Wörter wie miles, corpus, vis.',
    icon: '🛡️',
    category: 'Grammar'
  },
  {
    id: 'passiv-formen',
    title: 'Aktiv vs. Passiv',
    description: 'Lektion 18/20: Werden oder tun? -r, -ris, -tur Endungen sicher erkennen.',
    icon: '⛓️',
    category: 'Grammar'
  },

  // FORTGESCHRITTEN (Lektion 21-36)
  {
    id: 'partizipien-pc',
    title: 'PC (Partizip-Klammern)',
    description: 'Lektion 19-21: PPP & PPA. Wie man lange Sätze elegant übersetzt.',
    icon: '🖇️',
    category: 'Translation'
  },
  {
    id: 'ablativus-absolutus',
    title: 'Ablativus Absolutus (Abl.abs.)',
    description: 'Lektion 28-30: Die Endstufe der 7. Klasse. Zeitverhältnisse verstehen.',
    icon: '🎓',
    category: 'Translation'
  },
  {
    id: 'vokabel-profi-800',
    title: 'Wortschatz-Meister 800',
    description: 'Lektion 1-36: Alle Stammformen & Wortfelder (Politik, Krieg, Liebe).',
    icon: '👑',
    category: 'Vocabulary'
  },
  {
    id: 'konjunktiv-system',
    title: 'Konjunktiv & Gliedsätze',
    description: 'Lektion 22-35: ut, cum, quod. Wünsche, Befehle und Möglichkeiten.',
    icon: '🔮',
    category: 'Grammar'
  }
];

export const RANKS = [
  'Rekrut (Tiro)',
  'Legionär',
  'Optio',
  'Centurio',
  'Legat',
  'Imperator'
];

export const getRank = (xp: number) => {
  const index = Math.min(Math.floor(xp / 1000), RANKS.length - 1);
  return RANKS[index];
};
