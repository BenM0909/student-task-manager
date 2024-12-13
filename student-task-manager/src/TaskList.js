// src/TaskList.js
import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [taskInput, setTaskInput] = useState('');
    const [dueDate, setDueDate] = useState(new Date());
    const [comments, setComments] = useState({});

    const fetchTasks = async () => {
        const tasksCollection = collection(db, 'tasks');
        const taskSnapshot = await getDocs(tasksCollection);
        const taskList = taskSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTasks(taskList);
    };

    const addTask = async (e) => {
        e.preventDefault();
        if (taskInput) {
            await addDoc(collection(db, 'tasks'), { title: taskInput, completed: false, dueDate: dueDate });
            setTaskInput('');
            setDueDate(new Date());
            fetchTasks();
        }
    };

    const addComment = async (taskId, comment) => {
        const taskRef = doc(db, 'tasks', taskId);
        const taskComments = comments[taskId] || [];
        taskComments.push(comment);
        setComments({ ...comments, [taskId]: taskComments });
        await updateDoc(taskRef, { comments: taskComments });
    };

    const onDragEnd = async (result) => {
        if (!result.destination) return;

        const reorderedTasks = Array.from(tasks);
        const [movedTask] = reorderedTasks.splice(result.source.index, 1);
        reorderedTasks.splice(result.destination.index, 0, movedTask);

        setTasks(reorderedTasks);

        // Update Firestore with new order (optional)
        for (let i = 0; i < reorderedTasks.length; i++) {
            const taskRef = doc(db, 'tasks', reorderedTasks[i].id);
            await updateDoc(taskRef, { order: i });
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div>
            <h2 className="text-2xl">Task List</h2>
            <form onSubmit={addTask}>
                <input
                    type="text"
                    value={taskInput}
                    onChange={(e) => setTaskInput(e.target.value)}
                    placeholder="Add a new task"
                    className="border p-2"
                />
                <Calendar
                    onChange={setDueDate}
                    value={dueDate}
                    className="my-2"
                />
                <button type="submit" className="bg-blue-500 text-white p-2">Add Task</button>
            </form>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="taskList">
                    {(provided) => (
                        <ul {...provided.droppableProps} ref={provided.innerRef}>
                            {tasks.map((task, index) => (
                                <Draggable key={task.id} draggableId={task.id} index={index}>
                                    {(provided) => (
                                        <li
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className="border p-2 my-2 bg-gray-100"
                                        >
                                            {task.title} - Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}
                                            <div>
                                                <input
                                                    type="text"
                                                    placeholder="Add a comment"
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            addComment(task.id, e.target.value);
                                                            e.target.value = '';
                                                        }
                                                    }}
                                                    className="border p-1"
                                                />
                                            </div>
                                            <div>
                                                {comments[task.id] && comments[task.id].map((comment, idx) => (
                                                    <p key={idx} className="text-gray-600">{comment}</p>
                                                ))}
                                            </div>
                                        </li>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};

export default TaskList;