import { MonthsId } from "../_types/General";
import { ItemHour, ToRenderItem } from "../_types/ScheduleTypes";

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


export function getUnavailableIndex(
   currentHour: number,
   prevEl: ItemHour[],
   currentIndex: number
 ) {
   if (prevEl.length > 0) {
     let notAvailableIndex: number[] = [];
     let prevIndex = currentIndex - 1;
     for (let i = prevIndex; i >= 0; i--) {
       if (prevEl[i]) {
         prevEl[i].toRender.filter((items: ToRenderItem, j) => {
           const startTask = items.props?.dataFrom
             ? parseInt(items.props.dataFrom.substring(0, 2))
             : 0;
           const endTask = items.props?.dataTo
             ? parseInt(items.props.dataTo.substring(0, 2))
             : 0;
           const notAvailableHour = [];

           for (let k = startTask; k <= endTask; k++) {
             notAvailableHour.push(k);
           }
           if (notAvailableHour.includes(currentHour)) {
             notAvailableIndex.push(j);
           }
         });
       }
     }

     return notAvailableIndex;
   }
   return [];
 }
