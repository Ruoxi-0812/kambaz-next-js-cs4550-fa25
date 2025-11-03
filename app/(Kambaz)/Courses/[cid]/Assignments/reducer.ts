"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { assignments as dbAssignments } from "../../../Database";
import { v4 as uuidv4 } from "uuid";

export interface Assignment {
  _id: string;
  course: string;
  title: string;
  description: string;
  points: number;
  available?: string;
  due?: string;
  availableISO?: string;
  dueISO?: string;
  untilISO?: string;
}

interface AssignmentsState {
  assignments: Assignment[];
}

const initialState: AssignmentsState = {
  assignments: dbAssignments as Assignment[],
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (
      state,
      action: PayloadAction<
        Omit<Assignment, "_id"> & Partial<Pick<Assignment, "available" | "due">>
      >
    ) => {
      const a: Assignment = { _id: uuidv4(), ...action.payload };
      state.assignments = [...state.assignments, a];
    },
    updateAssignment: (state, action: PayloadAction<Assignment>) => {
      state.assignments = state.assignments.map((x) =>
        x._id === action.payload._id ? action.payload : x
      );
    },
    deleteAssignment: (state, action: PayloadAction<string>) => {
      state.assignments = state.assignments.filter((x) => x._id !== action.payload);
    },
  },
});

export const { addAssignment, updateAssignment, deleteAssignment } =
  assignmentsSlice.actions;
export default assignmentsSlice.reducer;
export type { AssignmentsState };
