import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';

const Analytics = () => {
    const [tasks, setTasks] = useState([]);
    const [goals, setGoals] = useState([]);

    const fetchTasks = async () => {
        const tasksCollection = collection(db, 'tasks');
        const taskSnapshot = await getDocs(tasksCollection);
        const taskList = taskSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTasks(taskList);
    };

    const fetchGoals = async () => {
        const goalsCollection = collection(db, 'goals');
        const goalSnapshot = await getDocs(goalsCollection);
        const goalList = goalSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setGoals(goalList);
    };

    useEffect(() => {
        fetchTasks();
        fetchGoals();
    }, []);

    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const completedGoals = goals.filter(goal => goal.completed).length;
    const totalGoals = goals.length;

    return (
        <div>
            <h2 className="text-2xl">Analytics Dashboard</h2>
            <div>
                <h3>Tasks</h3>
                <p>Completed Tasks: {completedTasks} / {totalTasks}</p>
            </div>
            <div>
                <h3>Goals</h3>
                <p>Completed Goals: {completedGoals} / {totalGoals}</p>
            </div>
        </div>
    );
};

export default Analytics; 