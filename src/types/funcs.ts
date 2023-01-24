import { DragEvent } from "react";
import { Board, Item } from "./data";

export type dragOverHandlerFunction = (e: DragEvent<HTMLDivElement>) => void;

export type dragLeaveHandlerFunction = (e: DragEvent<HTMLDivElement>) => void;

export type dragStartHandlerFunction = (e: DragEvent<HTMLDivElement>, board: Board, item: Item) => void;

export type dragEndHandlerFunction = (e: DragEvent<HTMLDivElement>) => void;

export type dropHandlerFunction = (e: DragEvent<HTMLDivElement>, board: Board, item: Item) => void;

export type dropCardHandlerFunction = (e: DragEvent<HTMLDivElement>, board: Board) => void;