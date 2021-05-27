import React, { useState, useEffect } from 'react';
import { ChangeEvent } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import api from '../../../services/api';
import '../tasks.css';

interface ITask {
    title: string;
    description: string;
}

interface IParamsProps {
    id: string;
}


const Tasks: React.FC = () => {
    const [model, setModel] = useState<ITask>({
        title: '',
        description: ''
    });
    const history = useHistory();
    const { id } = useParams<IParamsProps>();

    useEffect(() => {
        if (id !== undefined) {
            findTask(id);
        }
    }, [id])

    function updatedModel(e: ChangeEvent<HTMLInputElement>) {
        setModel({
            ...model,
            [e.target.name]: e.target.value
        });
    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();

        if (id !== undefined) {
            const response = await api.put(`/tasks/${id}`, model);
        } else {
            const response = await api.post('/tasks', model);
        }
        back()
    }

    async function findTask(id: string) {
        const response = await api.get(`tasks/${id}`);
        setModel({
            title: response.data.title,
            description: response.data.description
        })
    }

    function back() {
        history.push('/tasks');
    }


    return (
        <div className="container">

            <div className="task-header" >
                <h1>{id ? "Edit Task" : "New Task"}</h1>
                <Button onClick={back} variant="dark" size="lg">Back to taks</Button>
            </div>
            <hr />
            <div className="container">
                <Form onSubmit={onSubmit}>
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            name="title"
                            type="text"
                            value={model.title}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            name="description"
                            as="textarea"
                            value={model.description}
                            rows={3}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                        />
                    </Form.Group>
                    <br />
                    <Button variant="dark" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    )
}
export default Tasks;