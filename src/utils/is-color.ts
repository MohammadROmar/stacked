import type { Symbol } from '../models/symbol';

export function isColor(cell: Symbol) {
  return cell !== '#' && cell !== '.';
}
