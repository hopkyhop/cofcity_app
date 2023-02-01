export interface CoffeeSliceState {
  items: CoffeeItem[];
  status: Status;
}

export type CoffeeItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  types: number[];
  sizes: number[];
  rating: number;
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export type SearchCoffeeParams = {
  category: string;
  sortBy: string;
  order: string;
  search: string;
  currentPage: string;
};
