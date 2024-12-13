import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';

const Goals = () => {
    const [goals, setGoals] = useState([]);
    const [goalInput, setGoalInput] = useState('');

    const fetchGoals = async () => {
        const goalsCollection = collection(db, 'goals');
        const goalSnapshot = await getDocs(goalsCollection);
        const goalList = goalSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setGoals(goalList);
    };

    const addGoal = async (e) => {
        e.preventDefault();
        if (goalInput) {
            await addDoc(collection(db, 'goals'), { title: goalInput, completed: false });
            setGoalInput('');
            fetchGoals(); // Refresh goal list
        }
    };

    useEffect(() => {
        fetchGoals();
    }, []);

    return (
        <div>
            <h2 className="text-2xl">Goals</h2>
            <form onSubmit={addGoal}>
                <input
                    type="text"
                    value={goalInput}
                    onChange={(e) => setGoalInput(e.target.value)}
                    placeholder="Add a new goal"
                    className="border p-2"
                />
                <button type="submit" className="bg-blue-500 text-white p-2">Add Goal</button>
            </form>
            <ul>
                {goals.map(goal => (
                    <li key={goal.id}>{goal.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default Goals; 