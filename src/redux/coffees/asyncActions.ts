import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CoffeeItem, SearchCoffeeParams } from "./types";

export const fetchCoffees = createAsyncThunk<CoffeeItem[], SearchCoffeeParams>(
    "coffees/fetchCoffeesStatus",
    async (params, thunkAPI) => {
      const { category, sortBy, order, search, currentPage } = params;
      const { data } = await axios.get<CoffeeItem[]>(
        `https://6396ee4877359127a026d8f5.mockapi.io/items/?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`
      );
      return data;
    }
  );