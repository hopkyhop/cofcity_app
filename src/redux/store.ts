import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import filterSlice from './filter/slice'
import coffeesSlice from './coffees/slice';
import cartSlice from './cart/slice';


export const store = configureStore({
  reducer: {
    filter: filterSlice,
    cart: cartSlice,
    coffees: coffeesSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
