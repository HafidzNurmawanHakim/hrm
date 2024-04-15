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


 export function getLocalStorageItem<T>(
	key: string,
	defaultValue?: T
): T | null {
	try {
		const item = localStorage.getItem(key); // Mencoba untuk mengambil item dari local storage
		return item ? JSON.parse(item) : defaultValue ?? null; // Jika item ditemukan, parse dari JSON (jika diperlukan); jika tidak, kembalikan nilai default
	} catch (error) {
		console.error("Error retrieving item from local storage:", error);
		return defaultValue ?? null; // Mengembalikan nilai default jika terjadi kesalahan
	}
}

// Contoh penggunaan:
//   const userData = getLocalStorageItem<UserData>('user', {} as UserData); // Mendapatkan item 'user' dari local storage dengan tipe UserData dan nilai default objek kosong jika tidak ditemukan
//   console.log('Data pengguna:', userData); // Jika tidak ditemukan, userData akan menjadi objek kosong {}


export const generateTimestamps = (time: string | number) => {
	let currentTime = new Date();
	let postTime = new Date(time);

	const timeDifference = Math.floor(
		(currentTime.getTime() - postTime.getTime()) / 1000
	);

	if (timeDifference < 60) {
		return `${timeDifference} detik yang lalu`;
	} else if (timeDifference < 3600) {
		const minutes = Math.floor(timeDifference / 60);
		return `${minutes} menit yang lalu`;
	} else if (timeDifference < 86400) {
		const hours = Math.floor(timeDifference / 3600);
		return `${hours} jam yang lalu`;
	} else {
		const days = Math.floor(timeDifference / 86400);
		return `${days} hari yang lalu`;
	}
};