import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CartItem } from '../types/CartItem';
import { RootState } from '../store';
import { Product } from '../types/Product';

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product | CartItem>) => {
      const cartItem = state.items.find((item) => {
        return item.id === action.payload.id;
      });

      if (cartItem) {
        state.items = state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, amount: cartItem.amount + 1 }
            : item
        );
      } else {
        const newItem = { ...action.payload, amount: 1 };
        state.items.push(newItem);
      }
    },
    removeFromCart: (state, action: PayloadAction<Product['id']>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    decreaseAmount: (state, action: PayloadAction<Product['id']>) => {
      const product = state.items.find((item) => item.id === action.payload);
      if (!product) {
        throw 'No such a product in cart :O';
      }
      if (product.amount === 1) {
        state.items = state.items.filter((item) => item.id !== action.payload);
      } else {
        state.items = state.items.map((item) =>
          item.id === product.id
            ? { ...item, amount: product.amount - 1 }
            : item
        );
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, clearCart, removeFromCart, decreaseAmount } =
  cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectItemAmount = (state: RootState) =>
  state.cart.items.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.amount;
  }, 0);

export const selectTotal = (state: RootState) =>
  state.cart.items.reduce((result, item) => result + item.amount * item.price, 0);

export default cartSlice.reducer;
