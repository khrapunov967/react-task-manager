import { useState } from "react";
import { Board, Item } from "../types/data";
import * as funcs from "../types/funcs";
import BoardComponent from "./BoardComponent";
import ItemComponent from "./ItemComponent";

const WorkingArea: React.FC = () => {

    const [boards, setBoards] = useState<Board[]>([
        {id: 1, title: "Сделать", items: [{id: 1, title: "Learn 1"}, {id: 2, title: "Learn 2"}]},
        {id: 2, title: "Проверить", items: [{id: 3, title: "Learn 1"}, {id: 4, title: "Learn 2"}]},
        {id: 3, title: "Сделано", items: [{id: 5, title: "Learn 1"}, {id: 6, title: "Learn 2"}]},
    ]);

    const [currentBoard, setCurrentBoard] = useState<Board>({id: 0, title: "", items: [{id: 1, title: "Learn 1"}, {id: 2, title: "Learn 2"}]});
    
    const [currentItem, setCurrentItem] = useState<Item>({id: 0, title: ""});
    


    const dragOverHandler: funcs.dragOverHandlerFunction = (e) => {
        e.preventDefault();
    };
    
    const dragLeaveHandler: funcs.dragLeaveHandlerFunction = (e) => {
        // remove shadow
    };
    
    const dragStartHandler: funcs.dragStartHandlerFunction = (e, board, item) => {
        setCurrentBoard(board);
        setCurrentItem(item);
    };
    
    const dragEndHandler: funcs.dragEndHandlerFunction = (e) => {
        // remove shadow 
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
        <section className="w-full flex justify-center gap-3">
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
                                    />
                                );
                            })
                        }
                    </BoardComponent>
                )
            })}
        </section>
    );
};

export default WorkingArea;