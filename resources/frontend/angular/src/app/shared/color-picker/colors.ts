import { getContrastingColor } from 'ngx-color';

export interface ColorCollectionItem {
  name: string;
  color: string;
  text?: string;
}

export const colorCollection: ColorCollectionItem[][] = [
  [
    { name: 'bg-red-50', color: '#FEF2F2' },
    { name: 'bg-red-100', color: '#FEE2E2' },
    { name: 'bg-red-200', color: '#FECACA' },
    { name: 'bg-red-300', color: '#FCA5A5' },
    { name: 'bg-red-400', color: '#F87171' },
    { name: 'bg-red-500', color: '#EF4444' },
    { name: 'bg-red-600', color: '#DC2626' },
    { name: 'bg-red-700', color: '#B91C1C' },
    { name: 'bg-red-800', color: '#991B1B' },
    { name: 'bg-red-900', color: '#7F1D1D' },
  ],
  [
    { name: 'bg-yellow-50', color: '#FFFBEB' },
    { name: 'bg-yellow-100', color: '#FEF3C7' },
    { name: 'bg-yellow-200', color: '#FDE68A' },
    { name: 'bg-yellow-300', color: '#FCD34D' },
    { name: 'bg-yellow-400', color: '#FBBF24' },
    { name: 'bg-yellow-500', color: '#F59E0B' },
    { name: 'bg-yellow-600', color: '#D97706' },
    { name: 'bg-yellow-700', color: '#B45309' },
    { name: 'bg-yellow-800', color: '#92400E' },
    { name: 'bg-yellow-900', color: '#78350F' },
  ],
  [
    { name: 'bg-green-50', color: '#ECFDF5' },
    { name: 'bg-green-100', color: '#D1FAE5' },
    { name: 'bg-green-200', color: '#A7F3D0' },
    { name: 'bg-green-300', color: '#6EE7B7' },
    { name: 'bg-green-400', color: '#34D399' },
    { name: 'bg-green-500', color: '#10B981' },
    { name: 'bg-green-600', color: '#059669' },
    { name: 'bg-green-700', color: '#047857' },
    { name: 'bg-green-800', color: '#065F46' },
    { name: 'bg-green-900', color: '#064E3B' },
  ],
  [
    { name: 'bg-blue-50', color: '#EFF6FF' },
    { name: 'bg-blue-100', color: '#DBEAFE' },
    { name: 'bg-blue-200', color: '#BFDBFE' },
    { name: 'bg-blue-300', color: '#93C5FD' },
    { name: 'bg-blue-400', color: '#60A5FA' },
    { name: 'bg-blue-500', color: '#3B82F6' },
    { name: 'bg-blue-600', color: '#2563EB' },
    { name: 'bg-blue-700', color: '#1D4ED8' },
    { name: 'bg-blue-800', color: '#1E40AF' },
    { name: 'bg-blue-900', color: '#1E3A8A' },
  ],
  [
    { name: 'bg-indigo-50', color: '#EEF2FF' },
    { name: 'bg-indigo-100', color: '#E0E7FF' },
    { name: 'bg-indigo-200', color: '#C7D2FE' },
    { name: 'bg-indigo-300', color: '#A5B4FC' },
    { name: 'bg-indigo-400', color: '#818CF8' },
    { name: 'bg-indigo-500', color: '#6366F1' },
    { name: 'bg-indigo-600', color: '#4F46E5' },
    { name: 'bg-indigo-700', color: '#4338CA' },
    { name: 'bg-indigo-800', color: '#3730A3' },
    { name: 'bg-indigo-900', color: '#312E81' },
  ],
  [
    { name: 'bg-purple-50', color: '#F5F3FF' },
    { name: 'bg-purple-100', color: '#EDE9FE' },
    { name: 'bg-purple-200', color: '#DDD6FE' },
    { name: 'bg-purple-300', color: '#C4B5FD' },
    { name: 'bg-purple-400', color: '#A78BFA' },
    { name: 'bg-purple-500', color: '#8B5CF6' },
    { name: 'bg-purple-600', color: '#7C3AED' },
    { name: 'bg-purple-700', color: '#6D28D9' },
    { name: 'bg-purple-800', color: '#5B21B6' },
    { name: 'bg-purple-900', color: '#4C1D95' },
  ],
  [
    { name: 'bg-pink-50', color: '#FDF2F8' },
    { name: 'bg-pink-100', color: '#FCE7F3' },
    { name: 'bg-pink-200', color: '#FBCFE8' },
    { name: 'bg-pink-300', color: '#F9A8D4' },
    { name: 'bg-pink-400', color: '#F472B6' },
    { name: 'bg-pink-500', color: '#EC4899' },
    { name: 'bg-pink-600', color: '#DB2777' },
    { name: 'bg-pink-700', color: '#BE185D' },
    { name: 'bg-pink-800', color: '#9D174D' },
    { name: 'bg-pink-900', color: '#831843' },
  ],
  [
    { name: 'bg-gray-50', color: '#F9FAFB' },
    { name: 'bg-gray-100', color: '#F3F4F6' },
    { name: 'bg-gray-200', color: '#E5E7EB' },
    { name: 'bg-gray-300', color: '#D1D5DB' },
    { name: 'bg-gray-400', color: '#9CA3AF' },
    { name: 'bg-gray-500', color: '#6B7280' },
    { name: 'bg-gray-600', color: '#4B5563' },
    { name: 'bg-gray-700', color: '#374151' },
    { name: 'bg-gray-800', color: '#1F2937' },
    { name: 'bg-gray-900', color: '#111827' },
  ],
];

export function getFromName(name: string): ColorCollectionItem {
  return colorCollection
    .filter((group: ColorCollectionItem[]) =>
      group.some((item: ColorCollectionItem) => item.name === name)
    )[0]
    .filter((item: ColorCollectionItem) => item.name === name)[0];
}

export function getFromColor(color: string): ColorCollectionItem {
  return colorCollection
    .filter((group: ColorCollectionItem[]) =>
      group.some((item: ColorCollectionItem) => item.color === color)
    )[0]
    .filter((item: ColorCollectionItem) => item.color === color)[0];
}

export function getTextColor(color: string) {
  let ckColor = getContrastingColor(color);
  if (ckColor === '#fff') {
    return 'text-white';
  }
  return 'text-black';
}

export function getTextColorFromName(name: string) {
  return getTextColor(getFromName(name).color);
}
