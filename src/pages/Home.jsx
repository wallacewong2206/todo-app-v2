import { Container, Row, Col } from "react-bootstrap";
import TodoCard from "../components/TodoCard";

export default function Home({ todos }) {
    return (
        <Container>
            <h1 className="my-3">Your Todos</h1>
            <Row>
                {todos.length > 0 ? (
                    todos.map((todo) => (
                        <Col md={4} key={todo.id}>
                            <TodoCard todo={todo} />
                        </Col>
                    ))
                ) : (
                    <p className="text-muted">No todos available. Add some!</p>
                )}
            </Row>
        </Container>
    );
}
