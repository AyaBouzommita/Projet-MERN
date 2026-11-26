import { createSlice } from "@reduxjs/toolkit";

const initialCart = localStorage.getItem("shein_cart")
  ? JSON.parse(localStorage.getItem("shein_cart"))
  : [];

const initialWishlist = localStorage.getItem("shein_wishlist")
  ? JSON.parse(localStorage.getItem("shein_wishlist"))
  : [];

const initialState = {
  items: initialCart,
  wishlist: initialWishlist,
  isOpen: false,
  promoCode: "",
  discountPercent: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existing = state.items.find(
        (i) => i._id === item._id && i.size === item.size && i.color === item.color
      );

      if (existing) {
        existing.qty += item.qty || 1;
      } else {
        state.items.push({
          ...item,
          qty: item.qty || 1,
          size: item.size || "M",
          color: item.color || (item.colors && item.colors[0]) || "#000000",
        });
      }

      state.isOpen = true; // Auto open cart drawer when adding item
      localStorage.setItem("shein_cart", JSON.stringify(state.items));
    },

    removeFromCart: (state, action) => {
      const { _id, size, color } = action.payload;
      state.items = state.items.filter(
        (i) => !(i._id === _id && i.size === size && i.color === color)
      );
      localStorage.setItem("shein_cart", JSON.stringify(state.items));
    },

    updateQty: (state, action) => {
      const { _id, size, color, qty } = action.payload;
      const item = state.items.find(
        (i) => i._id === _id && i.size === size && i.color === color
      );
      if (item) {
        if (qty <= 0) {
          state.items = state.items.filter(
            (i) => !(i._id === _id && i.size === size && i.color === color)
          );
        } else {
          item.qty = qty;
        }
      }
      localStorage.setItem("shein_cart", JSON.stringify(state.items));
    },

    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    openCart: (state) => {
      state.isOpen = true;
    },
    closeCart: (state) => {
      state.isOpen = false;
    },

    applyPromoCode: (state, action) => {
      const code = action.payload.trim().toUpperCase();
      state.promoCode = code;
      if (code === "SHEIN20" || code === "PROMO20") {
        state.discountPercent = 20;
      } else if (code === "BIENVENUE" || code === "SHEIN15") {
        state.discountPercent = 15;
      } else {
        state.discountPercent = 0;
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.promoCode = "";
      state.discountPercent = 0;
      localStorage.removeItem("shein_cart");
    },

    toggleWishlist: (state, action) => {
      const id = action.payload;
      if (state.wishlist.includes(id)) {
        state.wishlist = state.wishlist.filter((item) => item !== id);
      } else {
        state.wishlist.push(id);
      }
      localStorage.setItem("shein_wishlist", JSON.stringify(state.wishlist));
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQty,
  toggleCart,
  openCart,
  closeCart,
  applyPromoCode,
  clearCart,
  toggleWishlist,
} = cartSlice.actions;

export default cartSlice.reducer;
