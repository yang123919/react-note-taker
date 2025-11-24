import { useState, useEffect } from "react";
import { Box, Card, CardContent, Typography, TextField, IconButton, Button, Divider } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

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
        <Box sx={{ maxWidth: 800, mx: "auto", mt: 7 }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                Manage Categories
            </Typography>

            <Card elevation={3}>
                <CardContent>
                    <Typography sx={{ fontWeight: 600, mb: 1 }}>Add New Category</Typography>

                    <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
                        <TextField fullWidth label="Category Name" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
                        <Button variant="contained" onClick={handleAdd}>
                            Add
                        </Button>
                    </Box>

                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                        Existing Categories ({categories.length})
                    </Typography>

                    {categories.map((cat, i) => (
                        <Box key={i}>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    py: 1.5,
                                }}
                            >
                                <Typography>{cat}</Typography>

                                <Box>
                                    <IconButton>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(cat)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                            {i < categories.length - 1 && <Divider />}
                        </Box>
                    ))}
                </CardContent>
            </Card>
        </Box>
    );
};

export default CategoriesPage;
