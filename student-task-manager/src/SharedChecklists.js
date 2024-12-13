import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';

const SharedChecklists = () => {
    const [checklists, setChecklists] = useState([]);
    const [checklistInput, setChecklistInput] = useState('');

    const fetchChecklists = async () => {
        const checklistsCollection = collection(db, 'checklists');
        const checklistSnapshot = await getDocs(checklistsCollection);
        const checklistList = checklistSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setChecklists(checklistList);
    };

    const addChecklist = async (e) => {
        e.preventDefault();
        if (checklistInput) {
            await addDoc(collection(db, 'checklists'), { title: checklistInput, items: [] });
            setChecklistInput('');
            fetchChecklists(); // Refresh checklist list
        }
    };

    useEffect(() => {
        fetchChecklists();
    }, []);

    return (
        <div>
            <h2 className="text-2xl">Shared Checklists</h2>
            <form onSubmit={addChecklist}>
                <input
                    type="text"
                    value={checklistInput}
                    onChange={(e) => setChecklistInput(e.target.value)}
                    placeholder="Add a new checklist"
                    className="border p-2"
                />
                <button type="submit" className="bg-blue-500 text-white p-2">Add Checklist</button>
            </form>
            <ul>
                {checklists.map(checklist => (
                    <li key={checklist.id}>{checklist.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default SharedChecklists; 