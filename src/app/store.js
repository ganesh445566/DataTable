import { configureStore } from "@reduxjs/toolkit";
import tableReducer from "../features/table/tableSlice";

export default configureStore({   //Redux store configure
  reducer: {
    table: tableReducer,
  },
});
