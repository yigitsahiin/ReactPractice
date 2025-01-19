import { useState } from "react";

const Input = ({ taskList, setTaskList }) => {
    const [input, setInput] = useState("");

    const handleAddTask = (e) => {
        e.preventDefault();
        
        if (input.trim() === "") {
            return;
        }
        setTaskList([...taskList, input]);
        setInput("");
    };

    return (
        <>
            <form className="flex flex-row items-center gap-3">
                <input
                    className="border rounded px-lg py-1.5 px-2.5 text-lg"
                    type="text"
                    placeholder="Add a Task"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button
                    className="bg-violet-400 text-white py-2 px-4 rounded-lg hover:opacity-90"
                    onClick={handleAddTask}
                >
                    Add
                </button>
            </form>
        </>
    );
};

export default Input;
