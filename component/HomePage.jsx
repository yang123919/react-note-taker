import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const HomePage = ({ notes, setNotes, categories }) => {
    const [filter, setFilter] = useState("All");
    const [sortBy, setSortBy] = useState("updated");

    const handleDelete = (id) => {
        const updatedNotes = notes.filter((note) => note.id !== id);
        setNotes(updatedNotes);
        localStorage.setItem("notes", JSON.stringify(updatedNotes));
    };

    const filteredNotes = filter === "All" ? notes : notes.filter((note) => note.category === filter);

    const sortedNotes = [...filteredNotes].sort((a, b) => {
        if (sortBy === "updated") return new Date(b.updated) - new Date(a.updated);
        if (sortBy === "title") return a.title.localeCompare(b.title);
        return 0;
    });

    return (
        <div className="container mt-5">
            <div className="row mb-4">
                <div className="col-12 d-flex justify-content-between align-items-end gap-3">
                    <h1>All Notes ({sortedNotes.length})</h1>

                    <div className="d-flex gap-3">
                        <div>
                            <label className="fw-bold small">Category</label>
                            <select className="form-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
                                <option>All</option>
                                {categories.map((cat, i) => (
                                    <option key={i}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="fw-bold small">Sort By</label>
                            <select className="form-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                                <option value="updated">Last Updated</option>
                                <option value="title">Title (A → Z)</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                {sortedNotes.length === 0 ? (
                    <p className="text-muted text-center">No notes found.</p>
                ) : (
                    sortedNotes.map((note) => (
                        <div className="col-md-4 mb-3" key={note.id}>
                            <div className="card p-3 shadow-sm h-100">
                                <h5 className="fw-bold mb-1">{note.title}</h5>
                                <span className="text-center text-white bg-secondary mb-2">{note.category}</span>

                                <p className="text-muted small mb-2">{new Date(note.updated).toLocaleString()}</p>

                                <p className="mb-3">{note.content}</p>

                                <div className="d-flex gap-3 mt-auto">
                                    <Link to={`/n/${note.id}`} className="text-decoration-none btn btn-primary text-white small">
                                        <i className="bi bi-pencil"></i> Edit
                                    </Link>

                                    <button
                                        className="text-white btn btn-danger small"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                            if (window.confirm("Delete this note?")) {
                                                handleDelete(note.id);
                                            }
                                        }}
                                    >
                                        <i className="bi bi-trash"></i> Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default HomePage;

// import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";

// const HomePage = () => {
//     const [notes, setNotes] = useState([
//         {
//             id: 1,
//             title: "Which theme should we pick?",
//             category: "Ideas",
//             content: "Some content here",
//             updated: new Date()
//         },
//         {
//             id: 2,
//             title: "Project Making Week",
//             category: "Personal",
//             content: "Some content here",
//             updated: new Date()
//         },
//         {
//             id: 3,
//             title: "Assignment Sheets",
//             category: "Work",
//             content: "Some content here",
//             updated: new Date()
//         },
//     ]);

//     const [categories, setCategories] = useState(["Ideas", "Personal", "Work"]);

//     const [filter, setFilter] = useState("All");
//     const [sortBy, setSortBy] = useState("updated");

//     useEffect(() => {
//         const storedNotes = JSON.parse(localStorage.getItem("notes"));
//         const storedCategories = JSON.parse(localStorage.getItem("categories"));
//         if (!storedNotes || storedNotes.length === 0) {
//             localStorage.setItem("notes", JSON.stringify(notes));
//         } else {
//             setNotes(storedNotes);
//         }

//         if (!storedCategories || storedCategories.length === 0) {
//             localStorage.setItem("categories", JSON.stringify(categories));
//         } else {
//             setCategories(storedCategories);
//         }
//     }, []);

//     const handleDelete = (id) => {
//         const updatedNotes = notes.filter((note) => note.id !== id);
//         setNotes(updatedNotes);
//         localStorage.setItem("notes", JSON.stringify(updatedNotes));
//     };

//     const filteredNotes = filter === "All" ? notes : notes.filter((note) => note.category === filter);

//     const sortedNotes = [...filteredNotes].sort((a, b) => {
//         if (sortBy === "updated") {
//             return new Date(b.updated) - new Date(a.updated);
//         }
//         if (sortBy === "title") {
//             return a.title.localeCompare(b.title);
//         }
//         return 0;
//     });

//     return (
//         <div className="container mt-5">
//             <h1>All Notes ({sortedNotes.length})</h1>{" "}
//             <div className="d-flex justify-content-end gap-3 mb-4 flex-wrap">
//                 <div>
//                     <label className="fw-bold small">Category</label>
//                     <select className="form-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
//                         <option>All</option>
//                         {categories.map((cat, i) => (
//                             <option key={i}>{cat}</option>
//                         ))}
//                     </select>
//                 </div>

//                 <div>
//                     <label className="fw-bold small">Sort By</label>
//                     <select className="form-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
//                         <option value="updated">Last Updated</option>
//                         <option value="title">Title (A → Z)</option>
//                     </select>
//                 </div>
//             </div>
//             <div className="row">
//                 {sortedNotes.length === 0 ? (
//                     <p className="text-muted text-center">No notes found.</p>
//                 ) : (
//                     sortedNotes.map((note) => (
//                         <div className="col-md-4 mb-3" key={note.id}>
//                             <div className="card p-3 shadow-sm h-100">
//                                 <h5 className="fw-bold mb-1">{note.title}</h5>
//                                 <span className="text-center text-white bg-secondary mb-2">{note.category}</span>

//                                 <p className="text-muted small mb-2">{new Date(note.updated).toLocaleString()}</p>

//                                 <p className="mb-3">{note.content}</p>

//                                 <div className="d-flex gap-3 mt-auto">
//                                     <Link to={`/n/${note.id}`} className="text-decoration-none btn btn-primary text-white small">
//                                         <i className="bi bi-pencil"></i> Edit
//                                     </Link>

//                                     <button
//                                         className="text-white btn btn-danger small"
//                                         style={{ cursor: "pointer" }}
//                                         onClick={() => {
//                                             if (window.confirm("Delete this note?")) {
//                                                 handleDelete(note.id);
//                                             }
//                                         }}
//                                     >
//                                         <i className="bi bi-trash"></i> Delete
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     ))
//                 )}
//             </div>
//         </div>
//     );
// };

// export default HomePage;
