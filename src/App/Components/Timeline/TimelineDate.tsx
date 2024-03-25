import React, { FC } from "react";

interface TimelineDateProps {
  date?: string | Date;
}

const TimelineDate: FC<TimelineDateProps> = ({ date }) => {
  let dateString: string = "";
  let month = null;
  let day = null;
  let year = null;
  let isToday: boolean = false;

  if (date) {
    // Mengonversi date menjadi objek Date jika diberikan dalam bentuk string
    const dateObj = typeof date === "string" ? new Date(date) : date;

    // Mendapatkan tanggal hari ini
    const today = new Date();
    // Mengonversi tanggal menjadi string dengan format YYYY-MM-DD untuk membandingkan
    const formattedToday = today.toISOString().slice(0, 10);
    // Mengonversi tanggal menjadi string dengan format YYYY-MM-DD untuk membandingkan
    const formattedDate = dateObj.toISOString().slice(0, 10);

    // Memeriksa apakah tanggal sama dengan hari ini
    isToday = formattedDate === formattedToday;

    // Format tanggal sesuai dengan kebutuhan
    const getDay = dateObj.getDate();
    const getMonth = dateObj.toLocaleString("en-us", { month: "short" });
    const getYear = dateObj.getFullYear();

    month = getMonth.substring(0, 3);
    day = getDay;
    year = getYear;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      {day && <span className="text-fontHeader">{day}</span>}
      <p className="text-sm text-gray-400">{`${month}, ${year}`}</p>
    </div>
  );
};

export default TimelineDate;
