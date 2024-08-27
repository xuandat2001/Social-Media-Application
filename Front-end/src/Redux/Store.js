import { configureStore } from '@reduxjs/toolkit';
import ChangeReaction from './ReactionSlice'
export const store = configureStore({
    reducer: {
        reaction : ChangeReaction,
    }
})