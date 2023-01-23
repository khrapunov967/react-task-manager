import { DragEvent, useState } from "react";
import Header from "./components/Header";
import RootLayout from "./components/RootLayout";

const App: React.FC = () => {

  const [boards, setBoards] = useState([
    {id: 1, title: "Сделать", items: [{id: 1, title: "Learn 1"}, {id: 2, title: "Learn 2"}]},
    {id: 2, title: "Проверить", items: [{id: 3, title: "Learn 1"}, {id: 4, title: "Learn 2"}]},
    {id: 3, title: "Сделано", items: [{id: 5, title: "Learn 1"}, {id: 6, title: "Learn 2"}]},
  ]);

  const [currentBoard, setCurrentBoard] = useState({id: 0, title: "", items: [{id: 1, title: "Learn 1"}, {id: 2, title: "Learn 2"}]});
  const [currentTask, setCurrentTask] = useState({id: 0, title: ""});

  const dragOverHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const dragLeaveHandler = (e: DragEvent<HTMLDivElement>) => {};

  const dragStartHandler = (e: DragEvent<HTMLDivElement>, board: { id: number; title: string; items: { id: number; title: string; }[]; }, item: { id: number; title: string; }) => {
    setCurrentBoard(board);
    setCurrentTask(item);
  };

  const dragEndHandler = (e: DragEvent<HTMLDivElement>) => {};

  const dropHandler = (e: DragEvent<HTMLDivElement>, board: { id: number; title: string; items: { id: number; title: string; }[]; }, item: { id: number; title: string; }) => {
    e.preventDefault();
    e.stopPropagation();
    
    const currentIndex = currentBoard.items.indexOf(currentTask);
    currentBoard.items.splice(currentIndex, 1);

    const dropIndex = board.items.indexOf(item);
    board.items.splice(dropIndex + 1, 0, currentTask);

    setBoards(boards.map(b => {
      if (b.id === board.id) {
        return board;
      }

      if (b.id === currentBoard.id) {
        return currentBoard;
      }

      return b;
    }))
  };

  const dropCardHandler = (e: DragEvent<HTMLDivElement>, board: { id: number; title: string; items: { id: number; title: string; }[]; }) => {
    board.items.push(currentTask);
    const currentIndex = currentBoard.items.indexOf(currentTask);
    currentBoard.items.splice(currentIndex, 1);

    setBoards(boards.map(b => {
      if (b.id === board.id) {
        return board;
      }

      if (b.id === currentBoard.id) {
        return currentBoard;
      }

      return b;
    }))
  };

  return (
    <RootLayout>
      <Header />

      <section className="w-full flex justify-center gap-3">
        {boards.map(board => {
          return (
            <div 
              key={board.id} 
              className={"border-2 p-3 pt-0"}
              onDragOver={(e: DragEvent<HTMLDivElement>) => dragOverHandler(e)}
              onDrop={(e: DragEvent<HTMLDivElement>) => dropCardHandler(e, board)}
            >
              <p className="font-bold text-2xl mb-10">{board.title}</p>

              <div className="flex flex-col gap-2">
                {board.items.map(item => {
                  
                  return (
                    <div 
                      onDragOver={(e: React.DragEvent<HTMLDivElement>) => dragOverHandler(e)}
                      onDragLeave={(e: React.DragEvent<HTMLDivElement>) => dragLeaveHandler(e)}
                      onDragStart={(e: React.DragEvent<HTMLDivElement>) => dragStartHandler(e, board, item)}
                      onDragEnd={(e: React.DragEvent<HTMLDivElement>) => dragEndHandler(e)}
                      onDrop={(e: React.DragEvent<HTMLDivElement>) => dropHandler(e, board, item)}
                      className="text-xl border-[1px] flex justify-center cursor-grabbing" 
                      key={item.id}
                      draggable={true}
                    >
                      {item.title}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </section>
    </RootLayout>
  );
};

export default App;