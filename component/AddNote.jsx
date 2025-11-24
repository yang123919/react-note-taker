import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const AddNote = ({ notes, setNotes, categories }) => {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState(categories[0] || "");
    const [content, setContent] = useState("");

    const newId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) + 1 : 1;

    const handleSave = (e) => {
        e.preventDefault();

        const newNote = {
            id: newId,
            title,
            category,
            content,
            updated: new Date(),
        };

        const updatedNotes = [...notes, newNote];
        setNotes(updatedNotes);
        localStorage.setItem("notes", JSON.stringify(updatedNotes));
        navigate("/");
    };

    return (
        <div className="container mt-5">
            <form onSubmit={handleSave}>
                <h3 className="mb-4">Add Note</h3>

                <div className="card p-4 shadow-sm">
                    <label className="fw-semibold">Title</label>
                    <input className="form-control mb-3" placeholder="Give your note a title" value={title} onChange={(e) => setTitle(e.target.value)} required />

                    <label className="fw-semibold">Category</label>
                    <select className="form-select mb-3" value={category} onChange={(e) => setCategory(e.target.value)} required>
                        {categories.length > 0 ? (
                            categories.map((cat, index) => (
                                <option key={index} value={cat}>
                                    {cat}
                                </option>
                            ))
                        ) : (
                            <option>No categories found</option>
                        )}
                    </select>

                    <label className="fw-semibold">Content</label>
                    <textarea className="form-control mb-4" rows="6" placeholder="Add your note content" value={content} onChange={(e) => setContent(e.target.value)} required />

                    <div className="d-flex gap-3">
                        <button type="submit" className="btn btn-primary">
                            Save Note
                        </button>
                        <Link to="/" className="btn btn-outline-secondary">
                            Cancel
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddNote;

// import { Link, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";

// const AddNote = () => {
//     const navigate = useNavigate();

//     const [notes, setNotes] = useState([]);
//     const [categories, setCategories] = useState(["Ideas", "Personal", "Work"]);

//     const [title, setTitle] = useState("");
//     const [category, setCategory] = useState("");
//     const [content, setContent] = useState("");
//     const newId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) + 1 : 1;

//     useEffect(() => {
//         const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
//         const stored = JSON.parse(localStorage.getItem("categories"));

//         setNotes(storedNotes);

//         if (stored && stored.length > 0) {
//             setCategories(stored);
//         }
//     }, []);

//     const handleSave = (e) => {
//         e.preventDefault();

//         const newNote = {
//             id:newId,
//             title,
//             category,
//             content,
//             updated: new Date(),
//         };

//         const updatedNotes = [...notes, newNote];
//         setNotes(updatedNotes);
//         localStorage.setItem("notes", JSON.stringify(updatedNotes));
//         navigate("/");
//     };

//     return (
//         <div className="container mt-5">
//             <form onSubmit={handleSave}>
//                 <h3 className="mb-4">Add Note</h3>

//                 <div className="card p-4 shadow-sm">
//                     <label className="fw-semibold">Title</label>
//                     <input className="form-control mb-3" placeholder="Give your note a title" value={title} onChange={(e) => setTitle(e.target.value)} required />

//                     <label className="fw-semibold">Category</label>
//                     <select className="form-select mb-3" value={category} onChange={(e) => setCategory(e.target.value)} required>
//                         {categories.length > 0 ? (
//                             categories.map((cat, index) => (
//                                 <option key={index} value={cat}>
//                                     {cat}
//                                 </option>
//                             ))
//                         ) : (
//                             <option>No categories found</option>
//                         )}
//                     </select>

//                     <label className="fw-semibold">Content</label>
//                     <textarea className="form-control mb-4" rows="6" placeholder="Add your note content" value={content} onChange={(e) => setContent(e.target.value)} required />

//                     <div className="d-flex gap-3">
//                         <button type="submit" className="btn btn-primary">
//                             Save Note
//                         </button>
//                         <Link to="/" className="btn btn-outline-secondary">
//                             Cancel
//                         </Link>
//                     </div>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default AddNote;
