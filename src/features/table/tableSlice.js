import { createSlice } from "@reduxjs/toolkit";
import { dummyData } from "../../data/dummyData";

const tableSlice = createSlice({
  name: "table",
  initialState: {
    data: dummyData,
  },
  reducers: {
    addRow: (state, action) => {
      state.data.push({ id: Date.now(), ...action.payload });
    },
  },
});

export const { addRow } = tableSlice.actions;
export default tableSlice.reducer;
