import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import Editor from "react-simple-wysiwyg";

const EditNote = ({ notes, setNotes, categories }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [content, setContent] = useState("");

    // Load the note values when page opens
    useEffect(() => {
        const noteToEdit = notes.find((n) => n.id.toString() === id);

        if (noteToEdit) {
            setTitle(noteToEdit.title);
            setCategory(noteToEdit.category);
            setContent(noteToEdit.content);
        }
    }, [notes, id]);

    const handleSave = (e) => {
        e.preventDefault();

        const updatedNotes = notes.map((note) => (note.id === Number(id) ? { ...note, title, category, content, updated: new Date() } : note));

        setNotes(updatedNotes);
        localStorage.setItem("notes", JSON.stringify(updatedNotes));
        navigate("/");
    };

    return (
        <div className="container mt-5">
            <form onSubmit={handleSave}>
                <h3 className="mb-4">Edit Note</h3>

                <div className="card p-4 shadow-sm">
                    {/* Title */}
                    <TextField label="Title" variant="outlined" className="form-control mb-3" value={title} onChange={(e) => setTitle(e.target.value)} required />

                    {/* Category */}
                    <FormControl fullWidth className="mb-3">
                        <InputLabel id="category-label">Category</InputLabel>
                        <Select labelId="category-label" value={category} label="Category" onChange={(e) => setCategory(e.target.value)} required>
                            {categories.map((cat, i) => (
                                <MenuItem key={i} value={cat}>
                                    {cat}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Content */}
                    <label className="fw-semibold">Content</label>
                    <Editor containerProps={{ style: { resize: "vertical", height: "300px" } }} value={content} onChange={(e) => setContent(e.target.value)} />

                    <div className="d-flex gap-3 mt-3">
                        <button type="submit" className="btn btn-primary">
                            Save Changes
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

export default EditNote;

// import { useParams, Link, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";

// const EditNote = ({ notes, setNotes }) => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [categories, setCategories] = useState(["Ideas", "Personal", "Work"]);
//     const [title, setTitle] = useState("");
//     const [category, setCategory] = useState("");
//     const [content, setContent] = useState("");

//     useEffect(() => {
//         const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
//         const storedCategories = JSON.parse(localStorage.getItem("categories")) || [];

//         setCategories(storedCategories);

//         const noteToEdit = storedNotes.find((n) => n.id.toString() === id);
//         if (noteToEdit) {
//             setTitle(noteToEdit.title);
//             setCategory(noteToEdit.category);
//             setContent(noteToEdit.content);
//         }
//     }, [id]);

//     const handleSave = (e) => {
//         e.preventDefault();
//         const updatedNotes = notes.map((note) => (note.id === Number(id) ? { ...note, title, category, content, updated: new Date() } : note));
//         setNotes(updatedNotes);
//         localStorage.setItem("notes", JSON.stringify(updatedNotes));
//         navigate("/");
//     };

//     return (
//         <div className="container mt-5">
//             <form onSubmit={handleSave}>
//                 <h3 className="mb-4">Edit Note</h3>

//                 <div className="card p-4 shadow-sm">
//                     <label className="fw-semibold">Title</label>
//                     <input className="form-control mb-3" value={title} onChange={(e) => setTitle(e.target.value)} required />

//                     <label className="fw-semibold">Category</label>
//                     <select className="form-select mb-3" value={category} onChange={(e) => setCategory(e.target.value)} required>
//                         {categories.map((cat) => (
//                             <option key={cat} value={cat}>
//                                 {cat}
//                             </option>
//                         ))}
//                     </select>

//                     <label className="fw-semibold">Content</label>
//                     <textarea className="form-control mb-4" rows="6" value={content} onChange={(e) => setContent(e.target.value)} required />

//                     <div className="d-flex gap-3">
//                         <button type="submit" className="btn btn-primary">
//                             Save Changes
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

// export default EditNote;
