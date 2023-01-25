import { useState } from "react";
import { CreateItemComponentProps } from "../types/props";
import AddIcon from "../assets/icons/add-icon.svg";

const CreateItemComponent: React.FC<CreateItemComponentProps> = ({addNewItem}) => {

    const [title, setTitle] = useState("");

    const addItem = () => {
        if (title.trim()) {
            addNewItem(title);
            setTitle("");
        };
    };

    return (
        <div className="flex gap-3">
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)} 
                type="text"
                placeholder="Название задачи" 
                className="border-[1px] p-2 text-lg outline-none rounded-2xl focus:shadow-md transition-all duration-300"
            />

            <button
                className="w-[45px] h-[45px] flex justify-center items-center rounded-full bg-blue-400 transition-all duration-300 shadow-md shadow-blue-300 active:scale-90"
                onClick={addItem}
            >
                <img 
                    src={AddIcon} 
                    alt="Add" 
                    className="w-[35px] h-[35px]"
                />
            </button>
        </div>
    );
};

export default CreateItemComponent;