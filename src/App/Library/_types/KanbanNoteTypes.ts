export type Note = {
    id: string;
    title: string;
    note?: string; 
    timestamp: number
  };

export type NoteColumn = {
    id: string;
    desc?: string;
    list: Note[];
    title: string
  };
  
export type KanbanNoteList = {
    [key: string]: NoteColumn;
};