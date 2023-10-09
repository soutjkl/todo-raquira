import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/cotizations/productSlice";
import cotizationDataReducer from "../features/cotizations/cotizationDataSlice";
import productCreateSlice from "../features/product/productCreateSlice"
import categoriesSlice from "../features/categories/categoriesSlice";

export const store = configureStore({
    reducer: {
        products: productsReducer,
        cotizationData: cotizationDataReducer,
        productCreateSlice : productCreateSlice,
        categories: categoriesSlice
    }
})
