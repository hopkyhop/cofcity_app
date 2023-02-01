import { RootState } from "../store";

export const selectCoffeesData = (state: RootState) => state.coffees;
