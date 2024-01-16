// import { FormControl } from "@angular/forms";

export interface ProcentItem {
  name: string;
  disabled?: boolean;
  price: string;
  // currency: string,
  // value: number,
  // coins: object[],
  return: number;
  children?:  ProcentItem[];
}
