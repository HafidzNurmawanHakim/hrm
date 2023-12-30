// Menggunakan TypeScript untuk menentukan tipe argumen dan nilai kembali
export function capitalize(str: string): string {
   return str.charAt(0).toUpperCase() + str.slice(1);
}
