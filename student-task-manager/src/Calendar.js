import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const TaskCalendar = ({ tasks }) => {
    const [date, setDate] = useState(new Date());

    const handleDateChange = (newDate) => {
        setDate(newDate);
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl">Task Calendar</h2>
            <Calendar
                onChange={handleDateChange}
                value={date}
            />
            <h3 className="mt-4">Tasks for {date.toDateString()}:</h3>
            <ul>
                {tasks
                    .filter(task => task.dueDate && new Date(task.dueDate).toDateString() === date.toDateString())
                    .map(task => (
                        <li key={task.id}>{task.title}</li>
                    ))}
            </ul>
        </div>
    );
};

export default TaskCalendar;
