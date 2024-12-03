import type { Symbol } from '../types/symbol';

export function isColor(cell: Symbol) {
  return cell !== '#' && cell !== '.';
}
