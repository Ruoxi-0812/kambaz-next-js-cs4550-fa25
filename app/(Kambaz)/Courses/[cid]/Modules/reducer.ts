"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { modules } from "../../../Database";
import { v4 as uuidv4 } from "uuid";

export interface Lesson {
  _id: string;
  name: string;
}

export interface Module {
  _id: string;
  name: string;
  course: string;
  lessons: Lesson[];
  editing?: boolean;
}

interface ModulesState {
  modules: Module[];
}

const initialState: ModulesState = {
  modules: modules as Module[],
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    addModule: (state, action: PayloadAction<{ name: string; course: string }>) => {
      const newModule: Module = {
        _id: uuidv4(),
        lessons: [],
        name: action.payload.name,
        course: action.payload.course,
      };
      state.modules = [...state.modules, newModule];
    },
    deleteModule: (state, action: PayloadAction<string>) => {
      state.modules = state.modules.filter((m) => m._id !== action.payload);
    },
    updateModule: (state, action: PayloadAction<Module>) => {
      state.modules = state.modules.map((m) =>
        m._id === action.payload._id ? action.payload : m
      );
    },
    editModule: (state, action: PayloadAction<string>) => {
      state.modules = state.modules.map((m) =>
        m._id === action.payload ? { ...m, editing: true } : m
      );
    },
  },
});

export const { addModule, deleteModule, updateModule, editModule } = modulesSlice.actions;
export default modulesSlice.reducer;