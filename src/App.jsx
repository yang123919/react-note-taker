import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "../component/HomePage";
import AddNote from "../component/AddNote";
import EditNote from "../component/EditNotePage";
import Navigation from "../component/Navigation";
import CategoriesPage from "../component/CategoriesPage";

export default function App() {
    const defaultNotes = [
        {
            id: 1,
            title: "Which theme should we pick?",
            category: "Ideas",
            content: "Some content here",
            updated: new Date(),
        },
        {
            id: 2,
            title: "Project Making Week",
            category: "Personal",
            content: "Some content here",
            updated: new Date(),
        },
        {
            id: 3,
            title: "Assignment Sheets",
            category: "Work",
            content: "Some content here",
            updated: new Date(),
        },
    ];

    const defaultCategories = ["Ideas", "Personal", "Work"];

    const [notes, setNotes] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const savedNotes = JSON.parse(localStorage.getItem("notes"));
        const savedCategories = JSON.parse(localStorage.getItem("categories"));

        if (!savedNotes || savedNotes.length === 0) {
            setNotes(defaultNotes);
            localStorage.setItem("notes", JSON.stringify(defaultNotes));
        } else {
            setNotes(savedNotes);
        }

        if (!savedCategories || savedCategories.length === 0) {
            setCategories(defaultCategories);
            localStorage.setItem("categories", JSON.stringify(defaultCategories));
        } else {
            setCategories(savedCategories);
        }
    }, []);

    useEffect(() => {
        if (notes.length > 0) {
            localStorage.setItem("notes", JSON.stringify(notes));
        }
    }, [notes]);

    return (
        <BrowserRouter>
            <Navigation />
            <Routes>
                <Route path="/" element={<HomePage notes={notes} setNotes={setNotes} categories={categories} />} />

                <Route path="/add" element={<AddNote notes={notes} setNotes={setNotes} categories={categories} />} />

                <Route path="/n/:id" element={<EditNote notes={notes} setNotes={setNotes} categories={categories} />} />
                <Route path="/categories" element={<CategoriesPage />} />
            </Routes>
        </BrowserRouter>
    );
}

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useState } from "react";
// import HomePage from "../component/HomePage";
// import Navigation from "../component/Navigation";
// import AddNote from "../component/AddNote";
// import EditNote from "../component/EditNotePage";
// import "bootstrap/dist/css/bootstrap.min.css";
// import CategoriesPage from "../component/CategoriesPage";

// function App() {
//     const [notes, setNotes] = useState([
//         { id: 1, title: "Which theme should we pick?", category: "Ideas", content: "Some idea content", updated: new Date("2025-11-01") },
//         { id: 2, title: "Project making week", category: "Personal", content: "Personal project content", updated: new Date("2025-11-03") },
//         { id: 3, title: "Assignment Sheets", category: "Work", content: "Assignment content", updated: new Date("2025-11-02") },
//     ]);

//     const [categories, setCategories] = useState(["All Categories", "Personal", "Work", "Ideas"]);

//     const addNote = (note) => {
//         setNotes([...notes, note]);
//         if (!categories.includes(note.category)) {
//             setCategories([...categories, note.category]);
//         }
//     };

//     return (
//         <Router>
//             <Navigation />
//             <Routes>
//                 <Route path="/" element={<HomePage notes={notes} setNotes={setNotes} categories={categories} />} />
//                 <Route path="/add" element={<AddNote addNote={addNote} categories={categories} />} />
//                 <Route path="/n/:id" element={<EditNote notes={notes} setNotes={setNotes} />} />
//                 <Route path="/categories" element={<CategoriesPage/>} />
//             </Routes>
//         </Router>
//     );
// }

// export default App;
