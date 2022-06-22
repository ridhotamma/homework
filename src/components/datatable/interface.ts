import { HOVER, TABLETYPES } from "./constant";

export interface HeaderDetail {
  text?: string;
  value?: string;
  align?: string;
  rowStyles?: string;
  sortable?: boolean;
  type?: TABLETYPES;
}

export interface OrderState {
  prev: string | null;
  current: string | null;
}

export interface DataTableProps {
  headers?: HeaderDetail[];
  dataSource?: any[];
  setDataSource?: any;
  showFilterIcon?: boolean;
}

export interface HoverState {
  position: HOVER;
  value: string;
}
