import { ItemComponentProps } from "../types/props";
import RemoveIcon from "../assets/icons/remove-icon.svg";

const ItemComponent: React.FC<ItemComponentProps> = (props) => {
    return (
        <div
            onDragOver={props.onDragOver}
            onDragStart={(e: React.DragEvent<HTMLDivElement>) => props.onDragStart(e, props.board, props.item)}
            onDrop={(e: React.DragEvent<HTMLDivElement>) => props.onDrop(e, props.board, props.item)}
            className="text-xl border-[1px] flex justify-between items-center p-1 rounded-lg cursor-grabbing w-full max-w-[90%] transition-shadow duration-300 hover:shadow-sm"
            draggable={true}
        >
            <p>
                {props.title}
            </p>

            <img 
                src={RemoveIcon}
                alt="Del." 
                className="w-[27px] h-[27px] cursor-pointer"
                onClick={() => props.removeItem(props.item.id)}
            />
        </div>
    );
};

export default ItemComponent;