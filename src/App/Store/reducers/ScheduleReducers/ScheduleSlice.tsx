import { createSlice } from "@reduxjs/toolkit";
import { ItemHour, TaskItem } from "../../../Library/_types/ScheduleTypes";

interface InitialStateProps {
   prevRowHour: Array<ItemHour>;
   taskInHour: TaskItem[];
}

const task: TaskItem[] = [
   {
      from: "01:00",
      to: "02:00",
      taskId: "12412",
      items: {
         taskKey: "TASK-2",
         title: "Title gan",
         desc: "test 01:00",
      },
   },
   {
      from: "01:00",
      to: "03:00",
      taskId: "12232",
      items: {
         taskKey: "TASK-2",
         title: "Title gan",
         desc: "test 01:00 - test 03:00 ",
      },
   },
   {
      from: "02:00",
      to: "03:00",
      taskId: "12122",

      items: {
         taskKey: "TASK-2",
         title: "Title gan",
         desc: "02:00 - 03:00",
      },
   },
   {
      from: "03:00",
      to: "04:00",
      taskId: "19832",

      items: {
         taskKey: "TASK-2",
         title: "Title gan",
         desc: "03:00 - 04:00",
      },
   },
   {
      from: "04:00",
      to: "05:00",
      taskId: "19832",

      items: {
         taskKey: "TASK-2",
         title: "Title gan",
         desc: "04:00 - 05:00",
      },
   },
   {
      from: "03:00",
      to: "05:00",
      taskId: "36232",
      items: {
         taskKey: "TASK-2",
         title: "Title gan",
         desc: "03:00 - 05:00",
      },
   },
   {
      from: "05:00",
      to: "06:00",
      taskId: "36232",
      items: {
         taskKey: "TASK-2",
         title: "Title gan",
         desc: "05:00 - 06:00",
      },
   },
   {
      from: "06:00",
      to: "07:00",
      taskId: "3623322",
      items: {
         taskKey: "TASK-2",
         title: "Title gan",
         desc: "06:00 - 07:00",
      },
   },
   {
      from: "04:00",
      to: "06:00",
      taskId: "3623212",
      items: {
         taskKey: "TASK-2",
         title: "Title gan",
         desc: "04:00 - 06:00",
      },
   },
   {
      from: "07:00",
      to: "10:00",
      taskId: "3623212",
      items: {
         taskKey: "TASK-2",
         title: "Title gan",
         desc: "04:00 - 10:00",
      },
   },
   {
      from: "07:00",
      to: "12:00",
      taskId: "3623212",
      items: {
         taskKey: "TASK-2",
         title: "Title gan",
         desc: "04:00 - 12:00",
      },
   },
];

let initialState: InitialStateProps = {
   prevRowHour: [],
   taskInHour: task,
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
