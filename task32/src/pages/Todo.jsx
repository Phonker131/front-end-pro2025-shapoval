import React, { useEffect, useMemo, useState } from "react";
import { Container, Card, CardContent, Stack, TextField, Button, Typography, List, ListItem, ListItemText, ListItemIcon, IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function useLocalStorage(key, initialValue) {
    const [state, setState] = useState(() => {
        try {
            const raw = localStorage.getItem(key);
            return raw ? JSON.parse(raw) : initialValue;
        } catch {
            return initialValue;
        }
    });
    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(state));
        } catch {}
    }, [key, state]);
    return [state, setState];
}

export default function TodoPage() {
    const [items, setItems] = useLocalStorage("todos", []);
    const [text, setText] = useState("");

    const add = () => {
        if (!text.trim()) return;
        setItems([{ id: crypto.randomUUID(), text: text.trim(), done: false }, ...items]);
        setText("");
    };

    const toggle = (id) => setItems(items.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
    const remove = (id) => setItems(items.filter((t) => t.id !== id));
    const doneCount = useMemo(() => items.filter((t) => t.done).length, [items]);

    return (
        <Container sx={{ py: 4 }}>
            <Card>
                <CardContent>
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                        <TextField fullWidth label="New task" value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && add()} />
                        <Button onClick={add} startIcon={<AddCircleOutlineIcon />}>
                            Add
                        </Button>
                    </Stack>

                    <Typography sx={{ mt: 2 }} color="text.secondary">
                        Done: {doneCount}/{items.length}
                    </Typography>

                    <List>
                        {items.map((t) => (
                            <ListItem
                                key={t.id}
                                secondaryAction={
                                    <IconButton edge="end" onClick={() => remove(t.id)} aria-label="delete">
                                        <DeleteOutlineIcon />
                                    </IconButton>
                                }
                            >
                                <ListItemIcon>
                                    <IconButton color={t.done ? "secondary" : "default"} onClick={() => toggle(t.id)}>
                                        <CheckCircleIcon />
                                    </IconButton>
                                </ListItemIcon>
                                <ListItemText primary={t.text} sx={{ ".MuiListItemText-primary": { textDecoration: t.done ? "line-through" : "none", opacity: t.done ? 0.6 : 1 } }} />
                            </ListItem>
                        ))}
                    </List>
                </CardContent>
            </Card>
        </Container>
    );
}
