import { ItemComponentProps } from "../types/props";

const ItemComponent: React.FC<ItemComponentProps> = (props) => {
    return (
        <div
            onDragOver={props.onDragOver}
            onDragLeave={props.onDragLeave}
            onDragStart={(e: React.DragEvent<HTMLDivElement>) => props.onDragStart(e, props.board, props.item)}
            onDragEnd={props.onDragEnd}
            onDrop={(e: React.DragEvent<HTMLDivElement>) => props.onDrop(e, props.board, props.item)}
            className="text-xl border-[1px] flex justify-center cursor-grabbing"
            draggable={true}
        >
            {props.title}
        </div>
    );
};

export default ItemComponent;