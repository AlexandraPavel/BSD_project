// import { FormControl } from "@angular/forms";

export interface ProcentItem {
  displayName: string;
  disabled?: boolean;
  value: string;
  // currency: string,
  // value: number,
  // coins: object[],
  route?: string;
  children?:  ProcentItem[];
}
