import { createSlice } from "@reduxjs/toolkit";
import { ItemHour } from "../../../Library/_types/ScheduleTypes";

interface InitialStateProps {
   prevRowHour: Array<ItemHour>;
}

let initialState: InitialStateProps = {
   prevRowHour: [],
};

export const ScheduleSlice = createSlice({
   name: "ScheduleSlice",
   initialState,
   reducers: {
      setPrevRowHour: (state, action) => {
         action.payload.forEach((payloadItem: ItemHour) => {
            const index = state.prevRowHour.findIndex(
               (prevItem) => prevItem.hour === payloadItem.hour
            );
            if (index !== -1) {
               // Jika indeks sudah ada, ganti objek tersebut dengan yang baru
               state.prevRowHour[index] = payloadItem;
            } else {
               // Jika indeks tidak ditemukan, tambahkan objek baru
               let newArr = [payloadItem];
               state.prevRowHour = [...state.prevRowHour, ...newArr];
            }
         });
      },
   },
   extraReducers: (builder) => {},
});

export const { setPrevRowHour } = ScheduleSlice.actions;
export default ScheduleSlice.reducer;
