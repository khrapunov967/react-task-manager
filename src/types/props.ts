import { Board, Item } from "./data";
import { 
    dragOverHandlerFunction,
    dragStartHandlerFunction,
    dropCardHandlerFunction,
    dropHandlerFunction

} from "./funcs";

export interface RootLayoutProps {
    children: React.ReactNode;
};

export interface ItemComponentProps {
    title: string;
    board: Board;
    item: Item;
    onDragOver: dragOverHandlerFunction;
    onDragStart: dragStartHandlerFunction;
    onDrop: dropHandlerFunction;
    removeItem: (id: number) => void;
};

export interface BoardComponentProps {
    title: string;
    onDragOver: dragOverHandlerFunction;
    onDrop: dropCardHandlerFunction;
    children: React.ReactNode[];
    board: Board;
};

export interface CreateItemComponentProps {
    addNewItem: (title: string) => void;
};