import { createSlice } from '@reduxjs/toolkit';
import { faThumbsUp, faHeart, faFaceSadTear, faFaceAngry } from "@fortawesome/free-solid-svg-icons";

const initialState = {
    icon: faThumbsUp,   
    color: 'gray',
    text : "like"     
};

const reactionSlice = createSlice({
    name: 'reaction',
    initialState,
    reducers: {
        likeChoice(state) {
            state.icon = faThumbsUp;
            state.color = 'blue';
            state.text = "LIKE";
        },
        heartChoice(state) {
            state.icon = faHeart;
            state.color = 'red';
            state.text = "LOVE";
        },
        sadChoice(state) {
            state.icon = faFaceSadTear;
            state.color = 'yellow';
            state.text = "SAD";
        },
        angryChoice(state) {
            state.icon = faFaceAngry;
            state.color = 'orange';
            state.text = "ANGRY";
        }
    }
});

export const { likeChoice, heartChoice, sadChoice, angryChoice } = reactionSlice.actions;
export default reactionSlice.reducer;
