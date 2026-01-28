
import React from 'react';
import { LatinModule } from './types';

export const LATIN_MODULES: LatinModule[] = [
  // KLASSE 6 (Wiederholung / Basis)
  {
    id: 'basis-deklination',
    title: 'Die O- und A-Deklination',
    description: 'Lektion 1-5: Der Grundstein. Wer ist Subjekt (Nom.) und wer Objekt (Akk.)?',
    icon: '🏛️',
    category: 'Grammar'
  },
  {
    id: 'praesens-baukasten',
    title: 'Das Präsens-System',
    description: 'Lektion 1-8: o-s-t-mus-tis-nt. Wie man Handlungen in der Gegenwart beschreibt.',
    icon: '⚔️',
    category: 'Grammar'
  },
  {
    id: 'dritte-deklination',
    title: 'Die 3. Deklination',
    description: 'Lektion 11+: Die "Misch-Gruppe". Wörter wie "rex" oder "nomen" verstehen.',
    icon: '👑',
    category: 'Grammar'
  },
  
  // KLASSE 7 (Der aktuelle Stoff)
  {
    id: 'perfekt-system',
    title: 'Perfekt & Imperfekt',
    description: 'Lektion 10-12: Die Vergangenheit. v-Perfekt, u-Perfekt und das "ba"-Zeichen.',
    icon: '📜',
    category: 'Grammar'
  },
  {
    id: 'aci-verstehen',
    title: 'Der AcI (Satzbau-Geheimnis)',
    description: 'Lektion 9/14: "Ich sehe, dass...". Der wichtigste Satzbau im Lateinischen.',
    icon: '👁️',
    category: 'Translation'
  },
  {
    id: 'pronomina-check',
    title: 'is, ea, id & Co.',
    description: 'Lektion 13-16: Er, sie, es. Wer bezieht sich auf wen? Verweise im Text.',
    icon: '🔗',
    category: 'Grammar'
  },
  {
    id: 'passiv-transformation',
    title: 'Das Passiv',
    description: 'Lektion 18-20: -r, -ris, -tur. Wenn mit jemandem etwas gemacht wird.',
    icon: '🛡️',
    category: 'Grammar'
  },
  {
    id: 'pc-partizipien',
    title: 'Das PC (Participium Coniunctum)',
    description: 'Lektion 19-21: Das "Schweizer Taschenmesser". Sätze elegant verkürzen.',
    icon: '🖇️',
    category: 'Translation'
  },
  {
    id: 'abl-abs',
    title: 'Ablativus Absolutus',
    description: 'Lektion 28+: Die Königsdisziplin. Losgelöste Sätze richtig übersetzen.',
    icon: '🎓',
    category: 'Translation'
  },
  
  // VOKABELN & KULTUR
  {
    id: 'vokabel-survival-800',
    title: 'Wortschatz-Meister',
    description: 'Die wichtigsten 800 Wörter aus CURSUS Lektion 1-30 im Griff haben.',
    icon: '🏺',
    category: 'Vocabulary'
  },
  {
    id: 'mythos-goetter',
    title: 'Götter & Mythen',
    description: 'Wer ist Jupiter? Wer ist Venus? Hintergrundwissen für die Texte.',
    icon: '⚡',
    category: 'Vocabulary'
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
  const index = Math.min(Math.floor(xp / 800), RANKS.length - 1);
  return RANKS[index];
};
