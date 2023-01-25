import { Board, Item } from "./data";
import { 
    dragEndHandlerFunction,
    dragLeaveHandlerFunction, 
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
    onDragLeave: dragLeaveHandlerFunction;
    onDragStart: dragStartHandlerFunction;
    onDragEnd: dragEndHandlerFunction;
    onDrop: dropHandlerFunction;
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