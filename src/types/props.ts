import { Board, Item } from "./data";
import { 
    dragEndHandlerFunction,
    dragLeaveHandlerFunction, 
    dragOverHandlerFunction,
    dragStartHandlerFunction,
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