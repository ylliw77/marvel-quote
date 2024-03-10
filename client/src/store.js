import { configureStore } from "@reduxjs/toolkit";
import  charSlice  from "./features/marvelSlice";

export const store = configureStore({
    reducer : {
        char : charSlice
    }
})