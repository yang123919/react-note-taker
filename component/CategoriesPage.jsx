import { useState, useEffect } from "react";

const CategoriesPage = () => {
    const [categories, setCategories] = useState(["Ideas", "Personal", "Work"]);
    const [newCategory, setNewCategory] = useState("");
    
    useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("categories"));
    if (stored && stored.length > 0) {
        setCategories(stored);
    }
}, []);



    const handleAdd = () => {
        const trimmed = newCategory.trim();
        if (!trimmed || categories.includes(trimmed)) return;
        const updated = [...categories, trimmed];
        setCategories(updated);
        localStorage.setItem("categories", JSON.stringify(updated));
        setNewCategory("");
    };

    const handleDelete = (cat) => {
        const updated = categories.filter((c) => c !== cat);
        setCategories(updated);
        localStorage.setItem("categories", JSON.stringify(updated));
    };

    return (
        <div className="container mt-5">
            <h3 className="mb-4">Manage Categories</h3>
            <div className="card p-4 shadow-sm">
                <label className="fw-semibold">Add New Category</label>
                <div className="input-group mb-4">
                    <input className="form-control" placeholder="Category Name" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
                    <button className="btn btn-primary" type="button" onClick={handleAdd}>
                        ADD
                    </button>
                </div>
                <h6 className="fw-semibold mb-3">Existing Categories ({categories.length})</h6>
                {categories.map((cat, i) => (
                    <div key={i} className="d-flex justify-content-between align-items-center border-bottom py-2">
                        <span>{cat}</span>
                        <div className="d-flex gap-3">
                            <i className="bi bi-pencil" style={{ cursor: "pointer" }}></i>
                            <i className="bi bi-trash" style={{ cursor: "pointer" }} onClick={() => handleDelete(cat)}></i>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default CategoriesPage;