import { DragEvent, useState } from "react";
import { Board, Item } from "../types/data";
import { dragEndHandlerFunction, dragLeaveHandlerFunction, dragOverHandlerFunction, dragStartHandlerFunction, dropCardHandlerFunction, dropHandlerFunction } from "../types/funcs";
import ItemComponent from "./ItemComponent";

const WorkingArea: React.FC = () => {

    const [boards, setBoards] = useState<Board[]>([
        {id: 1, title: "Сделать", items: [{id: 1, title: "Learn 1"}, {id: 2, title: "Learn 2"}]},
        {id: 2, title: "Проверить", items: [{id: 3, title: "Learn 1"}, {id: 4, title: "Learn 2"}]},
        {id: 3, title: "Сделано", items: [{id: 5, title: "Learn 1"}, {id: 6, title: "Learn 2"}]},
    ]);

    const [currentBoard, setCurrentBoard] = useState<Board>({id: 0, title: "", items: [{id: 1, title: "Learn 1"}, {id: 2, title: "Learn 2"}]});
    
    const [currentItem, setCurrentItem] = useState<Item>({id: 0, title: ""});
    


    const dragOverHandler: dragOverHandlerFunction = (e) => {
        e.preventDefault();
    };
    
    const dragLeaveHandler: dragLeaveHandlerFunction = (e) => {
        // remove shadow
    };
    
    const dragStartHandler: dragStartHandlerFunction = (e, board, item) => {
        setCurrentBoard(board);
        setCurrentItem(item);
    };
    
    const dragEndHandler: dragEndHandlerFunction = (e) => {
        // remove shadow 
    };
    
    const dropHandler: dropHandlerFunction = (e, board, item) => {
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
    
    const dropCardHandler: dropCardHandlerFunction = (e, board) => {
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
                    <div 
                        key={board.id} 
                        className={"border-2 p-3 pt-0"}
                        onDragOver={(e: DragEvent<HTMLDivElement>) => dragOverHandler(e)}
                        onDrop={(e: DragEvent<HTMLDivElement>) => dropCardHandler(e, board)}
                    >
                        <p className="font-bold text-2xl mb-10">
                            {board.title}
                        </p>

                        <div className="flex flex-col gap-2">
                            {board.items.map(item => {
                        
                            return (
                                // <div 
                                //     onDragOver={(e: React.DragEvent<HTMLDivElement>) => dragOverHandler(e)}
                                //     onDragLeave={(e: React.DragEvent<HTMLDivElement>) => dragLeaveHandler(e)}
                                //     onDragStart={(e: React.DragEvent<HTMLDivElement>) => dragStartHandler(e, board, item)}
                                //     onDragEnd={(e: React.DragEvent<HTMLDivElement>) => dragEndHandler(e)}
                                //     onDrop={(e: React.DragEvent<HTMLDivElement>) => dropHandler(e, board, item)}
                                //     className="text-xl border-[1px] flex justify-center cursor-grabbing" 
                                //     key={item.id}
                                //     draggable={true}
                                // >
                                //     {item.title}
                                // </div>

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
                            )
                            })}
                        </div>
                    </div>
                )
            })}
        </section>
    );
};

export default WorkingArea;