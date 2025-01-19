import { useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import EditTask from "./EditTask";

const ToDo = ({ task, index, taskList, setTaskList }) => {
    const [time, setTime] = useState(task.duration);
    const [running, setRunning] = useState(false);

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "todo",
        item: {
            id: task.id,
            projectName: task.projectName,
            taskDescription: task.taskDescription,
            timestamp: task.timestamp,
            duration: task.duration,
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    useEffect(() => {
        let interval;
        if (running) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [running]);

    const handleStop = () => {
        setRunning(false);
        const taskIndex = taskList.indexOf(task);
        taskList.splice(taskIndex, 1, {
            ...task,
            duration: time,
        });
        setTaskList([...taskList]);
        localStorage.setItem("taskList", JSON.stringify(taskList));
        window.location.reload();
    };

    const handleDelete = () => {
        const updatedTaskList = taskList.filter((t) => t.id !== task.id);
        setTaskList(updatedTaskList);
        localStorage.setItem("taskList", JSON.stringify(updatedTaskList));
    };

    return (
        <div
            className={`flex flex-col items-start justify-start bg-white my-4  py-4 px-6 w-3/4 max-w-lg ${
                isDragging ? "opacity-50" : ""
            }`}
            ref={drag}
        >
            <div className="w-full flex flex-row justify-between">
                <p className="font-semibold text-xl">{task.projectName}</p>
                <EditTask task={task} index={index} taskList={taskList} setTaskList={setTaskList} />
            </div>
            <p className="text-lg py-2">{task.taskDescription}</p>
            <div className="w-full flex flex-row items-center justify-evenly">
                <div className="w-1/4 text-xl font-semibold py-4">
                    <span>{("0" + Math.floor((time / 3600000) % 24)).slice(-2)}:</span>
                    <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
                    <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
                    <span className="text-sm">{("0" + ((time / 10) % 100)).slice(-2)}</span>
                </div>
                <div className="flex flex-row justify-evenly gap-4">
                    {running ? (
                        <button className="border rounded-lg py-1 px-3" onClick={handleStop}>
                            Stop
                        </button>
                    ) : (
                        <button className="border rounded-lg py-1 px-3" onClick={() => setRunning(true)}>
                            Start
                        </button>
                    )}
                    <button className="border rounded-lg py-1 px-3" onClick={() => setTime(0)}>
                        Reset
                    </button>
                </div>
            </div>
            <div className="w-full flex justify-center">
                <button
                    className="bg-red-500 text-white text-sm uppercase font-semibold py-1.5 px-3 mt-6 mb-1 rounded-lg"
                    onClick={handleDelete}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default ToDo;
