import { useContext, useEffect, useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import { TodoContext } from "../contexts/TodoContext";
import { useNavigate } from "react-router-dom";

export default function TodoCard({ todo }) {
    const completed = todo.completed;
    const border = completed ? "success" : "danger";
    const [timer, setTimer] = useState(0);
    const [timerInterval, setTimerInterval] = useState(null);
    const setTodos = useContext(TodoContext).setTodos;
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const startTimer = () => {
        if (timerInterval === null) {
            const intervalID = setInterval(() => {
                setTimer((prevTimer) => prevTimer + 1);
            }, 1000);
            setTimerInterval(intervalID);
        }
    };

    const pauseTimer = () => {
        clearInterval(timerInterval);
        setTimerInterval(null);
    };

    const resetTimer = () => {
        clearInterval(timerInterval);
        setTimer(0);
        setTimerInterval(null);
    };

    const handleDelete = () => {
        setTodos((prevTodos) => prevTodos.filter((t) => t.id !== todo.id));
        setShowModal(false);
    };
    const handleEdit = () => {
        navigate(`todo/${todo.id}`);
    };

    useEffect(() => {
        return () => {
            clearInterval(timerInterval);
        };
    }, [timerInterval]);

    return (
        <>
            <Card border={border} className="my-3">
                <Card.Header>{!completed && "Not"} Completed</Card.Header>
                <Card.Body>
                    <Card.Title>{todo.title}</Card.Title>
                    <Card.Text>{todo.description}</Card.Text>
                    <p>Timer: {timer} seconds</p>
                    <Button onClick={startTimer}>
                        <i className="bi bi-play"></i>
                    </Button>
                    <Button onClick={pauseTimer} className="ms-2">
                        <i className="bi bi-pause-fill"></i>
                    </Button>
                    <Button onClick={resetTimer} className="ms-2">
                        <i className="bi bi-arrow-clockwise"></i>
                    </Button>
                    <Button variant="secondary" href={`/todo/${todo.id}`} className="ms-2">
                    <i className="bi bi-pencil"></i>
                    </Button>
                    <Button variant="danger" onClick={() => setShowModal(true)} className="ms-2">
                        <i className="bi bi-trash3"></i>
                    </Button>
                </Card.Body>
            </Card>

            {/* Modal for confirmation */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete the to-do <strong>{todo.title}</strong>?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
