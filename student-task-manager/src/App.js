import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import HomePage from './HomePage';
import Login from './Login';
import SignUp from './SignUp';
import TaskList from './TaskList';
import TaskCalendar from './Calendar';
import Goals from './Goals';
import Analytics from './Analytics';
import SharedChecklists from './SharedChecklists';

const App = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/tasks" element={<TaskList />} />
                <Route path="/calendar" element={<TaskCalendar tasks={tasks} />} />
                <Route path="/goals" element={<Goals />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/checklists" element={<SharedChecklists />} />
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;
