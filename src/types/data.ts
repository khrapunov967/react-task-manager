export type Item = {
    id: number;
    title: string;
};

export type Board = {
    id: number;
    title: string;
    items: Item[];
};