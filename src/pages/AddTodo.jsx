import { useContext, useState } from "react";
import { TodoContext } from "../contexts/TodoContext";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form } from "react-bootstrap";

export default function AddTodo() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [completed, setCompleted] = useState(false);
    const { todos, setTodos, user } = useContext(TodoContext);
    const navigate = useNavigate();

    const handleAddTodo = (event) => {
        event.preventDefault();
        setTodos([...todos, { id: Date.now(), userId: user.id, title, description, completed }]);
        navigate("/");
    };

    return (
        <Container>
            <h1 className="my-3">Add Todo</h1>
            <Form onSubmit={handleAddTodo}>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        placeholder="Enter title"
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        as="textarea"
                        rows={3}
                        placeholder="Enter description"
                        required
                    />
                </Form.Group>
                <Form.Check
                    type="checkbox"
                    label="Mark as completed"
                    checked={completed}
                    onChange={(e) => setCompleted(e.target.checked)}
                    className="mb-3"
                />
                <Button type="submit" variant="primary">
                    Add Todo
                </Button>
            </Form>
        </Container>
    );
}
