import { BoardComponentProps } from "../types/props";

const BoardComponent: React.FC<BoardComponentProps> = ({title, onDragOver, onDrop, children, board}) => {
    return (
        <div
            className="border-2 p-3 pt-0"
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, board)}
        >
            <p className="font-bold text-2xl mb-10">
                {title}
            </p>

            <div className="flex flex-col gap-2">
                {children}
            </div>
        </div>
    );
};

export default BoardComponent;