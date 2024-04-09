import { createSlice } from "@reduxjs/toolkit";
import { ItemHour, TaskItem } from "../../../Library/_types/ScheduleTypes";
import { BaseColor } from "../../../Library/_types/General";

interface InitialStateProps {
  prevRowHour: Array<ItemHour>;
  taskInHour: TaskItem[];
  taskInDay: Array<{
    taskInHour: TaskItem[];
    date: string;
  }>;
}

const task: TaskItem[] = [
  {
    from: "01:00",
    to: "02:00",
    taskId: "12412",
    baseColor: "danger",
    items: {
      taskKey: "TA-223",
      title: "Title gan",
      desc: "test 01:00",
    },
  },
  {
    from: "01:00",
    to: "03:00",
    taskId: "12232",
    baseColor: "primary",
    items: {
      taskKey: "TA-223",
      title: "Title gan",
      desc: "test 01:00 - test 03:00 ",
    },
  },
  {
    from: "02:00",
    to: "03:00",
    taskId: "12122",
    baseColor: "success",
    items: {
      taskKey: "TA-223",
      title: "Title gan",
      desc: "02:00 - 03:00",
    },
  },
  // {
  //   from: "03:00",
  //   to: "04:00",
  //   taskId: "19832",
  //   baseColor: "warning",
  //   items: {
  //     taskKey: "TA-223",
  //     title: "Title gan",
  //     desc: "03:00 - 04:00",
  //   },
  // },
  // {
  //   from: "04:00",
  //   to: "05:00",
  //   taskId: "19832",
  //   baseColor: "default",
  //   items: {
  //     taskKey: "TA-223",
  //     title: "Title gan",
  //     desc: "04:00 - 05:00",
  //   },
  // },
  // {
  //   from: "03:00",
  //   to: "05:00",
  //   taskId: "36232",
  //   baseColor: "danger",
  //   items: {
  //     taskKey: "TA-223",
  //     title: "Title gan",
  //     desc: "03:00 - 05:00",
  //   },
  // },
  // {
  //   from: "05:00",
  //   to: "06:00",
  //   taskId: "36232",
  //   baseColor: "danger",
  //   items: {
  //     taskKey: "TA-223",
  //     title: "Title gan",
  //     desc: "05:00 - 06:00",
  //   },
  // },
  // {
  //   from: "06:00",
  //   to: "07:00",
  //   taskId: "3623322",
  //   baseColor: "success",
  //   items: {
  //     taskKey: "TA-223",
  //     title: "Title gan",
  //     desc: "06:00 - 07:00",
  //   },
  // },
  // {
  //   from: "04:00",
  //   to: "06:00",
  //   taskId: "3623212",
  //   baseColor: "danger",
  //   items: {
  //     taskKey: "TA-223",
  //     title: "Title gan",
  //     desc: "04:00 - 06:00",
  //   },
  // },
  // {
  //   from: "07:00",
  //   to: "10:00",
  //   taskId: "3623212",
  //   baseColor: "primary",
  //   items: {
  //     taskKey: "TA-223",
  //     title: "Title gan",
  //     desc: "04:00 - 10:00",
  //   },
  // },
  // {
  //   from: "07:00",
  //   to: "12:00",
  //   taskId: "3623212",
  //   baseColor: "success",
  //   items: {
  //     taskKey: "TA-223",
  //     title: "Title gan",
  //     desc: "04:00 - 12:00",
  //   },
  // },
];

let initialState: InitialStateProps = {
  prevRowHour: [],
  taskInHour: task,
  taskInDay: [
    {
      date: "08-04-2024",
      taskInHour: task,
    },
    {
      date: "19-04-2024",
      taskInHour: task,
    },
  ],
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

    addNew: (state, action) => {
      state.taskInHour = [
        ...task,
        ...[
          {
            from: "06:00",
            to: "08:00",
            taskId: "28392",
            baseColor: "danger" as BaseColor,
            items: {
              taskKey: "TA-223",
              title: "new",
              desc: "06:00 - 08:00",
            },
          },
          {
            from: "10:00",
            to: "11:00",
            taskId: "28392",
            baseColor: "primary" as BaseColor,
            items: {
              taskKey: "TA-223",
              title: "new",
              desc: "10:00 - 11:00",
            },
          },
        ],
      ];
    },
  },
  extraReducers: (builder) => {},
});

export const { setPrevRowHour, addNew } = ScheduleSlice.actions;
export default ScheduleSlice.reducer;
