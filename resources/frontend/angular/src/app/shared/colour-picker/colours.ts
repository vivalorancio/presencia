import { getContrastingColor } from 'ngx-color';

export interface ColourCollectionItem {
  name: string;
  colour: string;
  text?: string;
}

export const colourCollection: ColourCollectionItem[][] = [
  [
    { name: 'bg-red-50', colour: '#FEF2F2' },
    { name: 'bg-red-100', colour: '#FEE2E2' },
    { name: 'bg-red-200', colour: '#FECACA' },
    { name: 'bg-red-300', colour: '#FCA5A5' },
    { name: 'bg-red-400', colour: '#F87171' },
    { name: 'bg-red-500', colour: '#EF4444' },
    { name: 'bg-red-600', colour: '#DC2626' },
    { name: 'bg-red-700', colour: '#B91C1C' },
    { name: 'bg-red-800', colour: '#991B1B' },
    { name: 'bg-red-900', colour: '#7F1D1D' },
  ],
  [
    { name: 'bg-yellow-50', colour: '#FFFBEB' },
    { name: 'bg-yellow-100', colour: '#FEF3C7' },
    { name: 'bg-yellow-200', colour: '#FDE68A' },
    { name: 'bg-yellow-300', colour: '#FCD34D' },
    { name: 'bg-yellow-400', colour: '#FBBF24' },
    { name: 'bg-yellow-500', colour: '#F59E0B' },
    { name: 'bg-yellow-600', colour: '#D97706' },
    { name: 'bg-yellow-700', colour: '#B45309' },
    { name: 'bg-yellow-800', colour: '#92400E' },
    { name: 'bg-yellow-900', colour: '#78350F' },
  ],
  [
    { name: 'bg-green-50', colour: '#ECFDF5' },
    { name: 'bg-green-100', colour: '#D1FAE5' },
    { name: 'bg-green-200', colour: '#A7F3D0' },
    { name: 'bg-green-300', colour: '#6EE7B7' },
    { name: 'bg-green-400', colour: '#34D399' },
    { name: 'bg-green-500', colour: '#10B981' },
    { name: 'bg-green-600', colour: '#059669' },
    { name: 'bg-green-700', colour: '#047857' },
    { name: 'bg-green-800', colour: '#065F46' },
    { name: 'bg-green-900', colour: '#064E3B' },
  ],
  [
    { name: 'bg-blue-50', colour: '#EFF6FF' },
    { name: 'bg-blue-100', colour: '#DBEAFE' },
    { name: 'bg-blue-200', colour: '#BFDBFE' },
    { name: 'bg-blue-300', colour: '#93C5FD' },
    { name: 'bg-blue-400', colour: '#60A5FA' },
    { name: 'bg-blue-500', colour: '#3B82F6' },
    { name: 'bg-blue-600', colour: '#2563EB' },
    { name: 'bg-blue-700', colour: '#1D4ED8' },
    { name: 'bg-blue-800', colour: '#1E40AF' },
    { name: 'bg-blue-900', colour: '#1E3A8A' },
  ],
  [
    { name: 'bg-indigo-50', colour: '#EEF2FF' },
    { name: 'bg-indigo-100', colour: '#E0E7FF' },
    { name: 'bg-indigo-200', colour: '#C7D2FE' },
    { name: 'bg-indigo-300', colour: '#A5B4FC' },
    { name: 'bg-indigo-400', colour: '#818CF8' },
    { name: 'bg-indigo-500', colour: '#6366F1' },
    { name: 'bg-indigo-600', colour: '#4F46E5' },
    { name: 'bg-indigo-700', colour: '#4338CA' },
    { name: 'bg-indigo-800', colour: '#3730A3' },
    { name: 'bg-indigo-900', colour: '#312E81' },
  ],
  [
    { name: 'bg-purple-50', colour: '#F5F3FF' },
    { name: 'bg-purple-100', colour: '#EDE9FE' },
    { name: 'bg-purple-200', colour: '#DDD6FE' },
    { name: 'bg-purple-300', colour: '#C4B5FD' },
    { name: 'bg-purple-400', colour: '#A78BFA' },
    { name: 'bg-purple-500', colour: '#8B5CF6' },
    { name: 'bg-purple-600', colour: '#7C3AED' },
    { name: 'bg-purple-700', colour: '#6D28D9' },
    { name: 'bg-purple-800', colour: '#5B21B6' },
    { name: 'bg-purple-900', colour: '#4C1D95' },
  ],
  [
    { name: 'bg-pink-50', colour: '#FDF2F8' },
    { name: 'bg-pink-100', colour: '#FCE7F3' },
    { name: 'bg-pink-200', colour: '#FBCFE8' },
    { name: 'bg-pink-300', colour: '#F9A8D4' },
    { name: 'bg-pink-400', colour: '#F472B6' },
    { name: 'bg-pink-500', colour: '#EC4899' },
    { name: 'bg-pink-600', colour: '#DB2777' },
    { name: 'bg-pink-700', colour: '#BE185D' },
    { name: 'bg-pink-800', colour: '#9D174D' },
    { name: 'bg-pink-900', colour: '#831843' },
  ],
  [
    { name: 'bg-gray-50', colour: '#F9FAFB' },
    { name: 'bg-gray-100', colour: '#F3F4F6' },
    { name: 'bg-gray-200', colour: '#E5E7EB' },
    { name: 'bg-gray-300', colour: '#D1D5DB' },
    { name: 'bg-gray-400', colour: '#9CA3AF' },
    { name: 'bg-gray-500', colour: '#6B7280' },
    { name: 'bg-gray-600', colour: '#4B5563' },
    { name: 'bg-gray-700', colour: '#374151' },
    { name: 'bg-gray-800', colour: '#1F2937' },
    { name: 'bg-gray-900', colour: '#111827' },
  ],
];

export function getFromName(name: string): ColourCollectionItem {
  return colourCollection
    .filter((group: ColourCollectionItem[]) =>
      group.some((item: ColourCollectionItem) => item.name === name)
    )[0]
    .filter((item: ColourCollectionItem) => item.name === name)[0];
}

export function getFromColour(colour: string): ColourCollectionItem {
  return colourCollection
    .filter((group: ColourCollectionItem[]) =>
      group.some((item: ColourCollectionItem) => item.colour === colour)
    )[0]
    .filter((item: ColourCollectionItem) => item.colour === colour)[0];
}

export function getTextColour(colour: string) {
  let ckColour = getContrastingColor(colour);
  if (ckColour === '#fff') {
    return 'text-white';
  }
  return 'text-black';
}

export function getTextColourFromName(name: string) {
  if (name === 'bg-white') return 'text-black';
  if (name === 'bg-black') return 'text-white';
  return getTextColour(getFromName(name).colour);
}
