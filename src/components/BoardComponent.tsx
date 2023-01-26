import { BoardComponentProps } from "../types/props";

const BoardComponent: React.FC<BoardComponentProps> = ({title, onDragOver, onDrop, children, board}) => {
    return (
        <div
            className="border-[1px] rounded-lg w-[250px] h-[400px] flex flex-col items-center py-3 overflow-y-auto"
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, board)}
        >
            <p className="font-bold text-2xl mb-10">
                {title}
            </p>

            <div className="flex flex-col items-center gap-2 w-full">
                {children.length ? children : <p className="text-stone-600">Нет задач</p>}
            </div>
        </div>
    );
};

export default BoardComponent;