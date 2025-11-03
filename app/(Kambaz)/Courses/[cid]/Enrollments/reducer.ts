"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as db from "../../../Database";

export type Enrollment = { user: string; course: string };

interface EnrollmentsState {
  enrollments: Enrollment[];
}

const initialState: EnrollmentsState = {
  enrollments: (db.enrollments as Enrollment[]) ?? [],
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enroll(state, action: PayloadAction<Enrollment>) {
      const { user, course } = action.payload;
      const exists = state.enrollments.some((e) => e.user === user && e.course === course);
      if (!exists) state.enrollments.push({ user, course });
    },
    unenroll(state, action: PayloadAction<Enrollment>) {
      const { user, course } = action.payload;
      state.enrollments = state.enrollments.filter(
        (e) => !(e.user === user && e.course === course)
      );
    },
    toggle(state, action: PayloadAction<Enrollment>) {
      const { user, course } = action.payload;
      const exists = state.enrollments.some((e) => e.user === user && e.course === course);
      if (exists) {
        state.enrollments = state.enrollments.filter(
          (e) => !(e.user === user && e.course === course)
        );
      } else {
        state.enrollments.push({ user, course });
      }
    },
  },
});

export const { enroll, unenroll, toggle } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
