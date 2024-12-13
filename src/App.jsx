import { Container, Nav, Navbar, Button, Form } from "react-bootstrap";
import { BrowserRouter, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import { TodoContext } from "./contexts/TodoContext";
import AddTodo from "./pages/AddTodo";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import EditTodo from "./pages/EditTodo";
import { useState } from "react";

function Layout({ user, handleLogout }) {
    return (
        <>
            <Navbar bg="light" variant="light">
                <Container>
                    <Navbar.Brand href="/">Todos</Navbar.Brand>
                    <Nav className="me-auto">
                        {user && <Nav.Link href="/">Home</Nav.Link>}
                        {user && <Nav.Link href="/add">Add Todo</Nav.Link>}
                    </Nav>
                    {user && (
                        <Button variant="danger" onClick={handleLogout}>
                            Logout
                        </Button>
                    )}
                </Container>
            </Navbar>
            <Outlet />
        </>
    );
}

export default function App() {
    const users = [
        { id: 1, username: "Wallace" },
        { id: 2, username: "Calvin" },
    ];

    const [user, setUser] = useLocalStorage("user", null);
    const [todos, setTodos] = useLocalStorage("todos", []);

    const navigate = useNavigate();

    // Handle user login
    const handleLogin = (event) => {
        event.preventDefault();
        const { username } = event.target.elements;
        const foundUser = users.find((u) => u.username.toLowerCase() === username.value.toLowerCase());
        if (foundUser) {
            setUser(foundUser);
            navigate("/");
        } else {
            alert("User not found!");
        }
    };

    // Handle logout
    const handleLogout = () => {
        setUser(null);
        navigate("/");
    };

    const filteredTodos = todos.filter((todo) => todo.userId === user?.id);

    return (
        <TodoContext.Provider value={{ todos, setTodos, user }}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout user={user} handleLogout={handleLogout} />}>
                        <Route
                            index
                            element={
                                user ? (
                                    <Home todos={filteredTodos} />
                                ) : (
                                    <Container className="my-4">
                                        <Form onSubmit={handleLogin}>
                                            <Form.Group>
                                                <Form.Label>Username</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="username"
                                                    placeholder="Username: Wallace or Calvin"
                                                    required
                                                />
                                            </Form.Group>
                                            <Button type="submit" className="mt-2">
                                                Login
                                            </Button>
                                        </Form>
                                    </Container>
                                )
                            }
                        />
                        <Route path="add" element={user ? <AddTodo /> : <ErrorPage />} />
                        <Route path="todo/:id" element={user ? <EditTodo /> : <ErrorPage />} />
                        <Route path="*" element={<ErrorPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </TodoContext.Provider>
    );
}
