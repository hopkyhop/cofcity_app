import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCoffees } from "./asyncActions";
import { CoffeeItem, CoffeeSliceState, Status } from "./types";

const initialState: CoffeeSliceState = {
  items: [],
  status: Status.LOADING, //loading || success || error
};

const coffeesSlice = createSlice({
  name: "coffees",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<CoffeeItem[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCoffees.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchCoffees.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.items = action.payload;
    });
    builder.addCase(fetchCoffees.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const { setItems } = coffeesSlice.actions;

export default coffeesSlice.reducer;
