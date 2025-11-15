"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Assignment {
  _id: string;
  course: string;
  title: string;
  description: string;
  points: number;

  group?: string;
  displayGradeAs?: string;
  submissionType?: string;
  onlineEntryOptions?: string[];
  assignTo?: string;

  due?: string;
  dueDate?: string;         
  availableFrom?: string;
  availableUntil?: string;
}

interface AssignmentsState {
  assignments: Assignment[];
}

const initialState: AssignmentsState = {
  assignments: [],
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setAssignments: (state, action: PayloadAction<Assignment[]>) => {
      state.assignments = action.payload;
    },
    addAssignmentInState: (state, action: PayloadAction<Assignment>) => {
      state.assignments = [...state.assignments, action.payload];
    },
    deleteAssignmentInState: (state, action: PayloadAction<string>) => {
      state.assignments = state.assignments.filter(
        (a) => a._id !== action.payload
      );
    },
    updateAssignmentInState: (state, action: PayloadAction<Assignment>) => {
      state.assignments = state.assignments.map((a) =>
        a._id === action.payload._id ? { ...a, ...action.payload } : a
      );
    },
  },
});

export const {
  setAssignments,
  addAssignmentInState,
  deleteAssignmentInState,
  updateAssignmentInState,
} = assignmentsSlice.actions;

export default assignmentsSlice.reducer;
