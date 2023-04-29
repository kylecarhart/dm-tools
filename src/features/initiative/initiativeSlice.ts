import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { Initiative } from "../../types";

interface InitiativeState {
  initiatives: Initiative[];
  currRound: number;
  currInitiative: number;
}

function newEmptyInitiative() {
  const emptyInitiative: Initiative = {
    playerName: "",
    characterName: "",
    currentHp: "0",
    maxHp: "0",
  };
  return Object.assign({}, emptyInitiative);
}

// Define the initial state using that type
const initialState: InitiativeState = {
  initiatives: [newEmptyInitiative()],
  currRound: 0,
  currInitiative: 0,
};

export const initiativeSlice = createSlice({
  name: "initiative",
  initialState,
  reducers: {
    addInitiative: (state) => {
      state.initiatives.push(newEmptyInitiative());
    },
    updateInitiative: (
      state,
      action: PayloadAction<{ initiative: Initiative; index: number }>
    ) => {
      const { index, initiative } = action.payload;
      state.initiatives = state.initiatives.map((_initiative, _index) => {
        if (_index === index) {
          return { ..._initiative, ...initiative };
        }
        return _initiative;
      });
    },
    removeInitiative: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      state.initiatives.splice(index, 1);

      if (state.currInitiative > index) {
        state.currInitiative = state.currInitiative - 1;
      }
    },
    resetAll: (state) => {
      return Object.assign({}, initialState);
    },
    incRound: (state) => {
      state.currRound = state.currRound + 1;
    },
    decRound: (state) => {
      if (state.currRound <= 0) {
        state.currRound = 0;
      } else {
        state.currRound = state.currRound - 1;
      }
    },
    incInitiative: (state) => {
      if (state.currInitiative === state.initiatives.length - 1) {
        state.currInitiative = 0;
        state.currRound = state.currRound + 1;
      } else {
        state.currInitiative = state.currInitiative + 1;
      }
    },
    decInitiative: (state) => {
      if (state.currInitiative <= 0) {
        if (state.currRound <= 0) {
          return;
        } else {
          state.currInitiative = state.initiatives.length - 1;
          state.currRound = state.currRound - 1;
        }
      } else {
        state.currInitiative = state.currInitiative - 1;
      }
    },
  },
});

export const {
  addInitiative,
  resetAll,
  updateInitiative,
  removeInitiative,
  incInitiative,
  decInitiative,
  incRound,
  decRound,
} = initiativeSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectInitiatives = (state: RootState) =>
  state.initiative.initiatives;
export const counterReducer = initiativeSlice.reducer;
