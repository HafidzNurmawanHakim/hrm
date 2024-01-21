import { MonthsId } from "../_types/General";

// Menggunakan TypeScript untuk menentukan tipe argumen dan nilai kembali
export function capitalize(str: string): string {
   return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getCurrentDateIndonesianFormat(): string {
   const months = MonthsId;

   const currentDate = new Date();
   const day = String(currentDate.getDate());
   const month = months[currentDate.getMonth()];
   const year = String(currentDate.getFullYear());

   const formattedDate = `${day} ${month} ${year}`;

   return formattedDate;
}

export function toCamelCase(input: string): string {
   if (input) {
      return input.replace(/\s\w|^\w/g, (match) => match.trim().toUpperCase());
   } else {
      return "";
   }
}
