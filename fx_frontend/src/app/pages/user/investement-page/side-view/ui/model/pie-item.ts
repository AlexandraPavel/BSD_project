export interface PieItem {
  displayName: string;
  disabled?: boolean;
  currency: string,
  value: number,
  coins: object[],
  route?: string;
  children?: PieItem[];
}
