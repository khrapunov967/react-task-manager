import { useEffect, useState } from "react";
import { Board, Item } from "../types/data";
import * as funcs from "../types/funcs";
import BoardComponent from "./BoardComponent";
import CreateItemComponent from "./CreateItemComponent";
import ItemComponent from "./ItemComponent";

const WorkingArea: React.FC = () => {

    const [boards, setBoards] = useState<Board[]>(
        localStorage.getItem("boards") ? JSON.parse(localStorage.getItem("boards") || "") : 
        [{id: 1, title: "Сделать", items: []},
        {id: 2, title: "Проверить", items: []},
        {id: 3, title: "Сделано", items: []}]
    );

    const [currentBoard, setCurrentBoard] = useState<Board>({id: 0, title: "", items: []});
    
    const [currentItem, setCurrentItem] = useState<Item>({id: 0, title: ""});

    useEffect(() => {
        localStorage.setItem("boards", JSON.stringify(boards));
    }, [boards]);
    
    const addNewItem = (title: string) => {
        const newItem: Item = {
            id: Date.now(),
            title
        };

        boards[0].items.push(newItem);

        setBoards(boards.map(b => b));
    };

    const removeItem = (id: number) => {
        setBoards(boards.map(board => {
            return {
                ...board,
                items: board.items.filter(item => item.id !== id)
            }
        }));
    };

    const dragOverHandler: funcs.dragOverHandlerFunction = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };
    
    const dragLeaveHandler: funcs.dragLeaveHandlerFunction = (e) => {
        // e.currentTarget.style.boxShadow = "none";
    };
    
    const dragStartHandler: funcs.dragStartHandlerFunction = (e, board, item) => {
        setCurrentBoard(board);
        setCurrentItem(item);
    };
    
    const dragEndHandler: funcs.dragEndHandlerFunction = (e) => {
        // e.currentTarget.style.boxShadow = "none"; 
    };
    
    const dropHandler: funcs.dropHandlerFunction = (e, board, item) => {
        e.preventDefault();
        e.stopPropagation();
        
        const currentIndex = currentBoard.items.indexOf(currentItem);
        currentBoard.items.splice(currentIndex, 1);
    
        const dropIndex = board.items.indexOf(item);
        board.items.splice(dropIndex + 1, 0, currentItem);
    
        setBoards(boards.map(b => {
            if (b.id === board.id) {
                return board;
            }
    
            if (b.id === currentBoard.id) {
                return currentBoard;
            }
    
            return b;
        }));
    };
    
    const dropCardHandler: funcs.dropCardHandlerFunction = (e, board) => {
        board.items.push(currentItem);

        const currentIndex = currentBoard.items.indexOf(currentItem);
        currentBoard.items.splice(currentIndex, 1);
    
        setBoards(boards.map(b => {
            if (b.id === board.id) {
                return board;
            }
    
            if (b.id === currentBoard.id) {
                return currentBoard;
            }
    
            return b;
        }));
    };

    return (
        <section className="w-full flex flex-col items-center justify-center gap-3">
            <CreateItemComponent 
                addNewItem={addNewItem}
            />

            <div className="flex gap-8">
                {boards.map(board => {
                    return (
                        <BoardComponent
                            key={board.id}
                            board={board}
                            title={board.title}
                            onDragOver={dragOverHandler}
                            onDrop={dropCardHandler}
                        >
                            {
                                board.items.map(item => {
                                    return (
                                        <ItemComponent
                                            onDragOver={dragOverHandler}
                                            onDragLeave={dragLeaveHandler}
                                            onDragStart={dragStartHandler}
                                            onDragEnd={dragEndHandler}
                                            onDrop={dropHandler}
                                            board={board}
                                            item={item}
                                            title={item.title}
                                            key={item.id}
                                            removeItem={removeItem}
                                        />
                                    );
                                })
                            }
                        </BoardComponent>
                    );
                })}
            </div>
        </section>
    );
};

export default WorkingArea;