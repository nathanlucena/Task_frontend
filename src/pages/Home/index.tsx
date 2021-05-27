import React, { useState, ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

import './style.css';
import api from '../../services/api';

interface ITask {
    title: string;
    description: string;
}



const Home: React.FC = () => {
    const [model, setModel] = useState<ITask>({
        title: '',
        description: ''
    });
    const history = useHistory();

    function updatedModel(e: ChangeEvent<HTMLInputElement>) {
        setModel({
            ...model,
            [e.target.name]: e.target.value
        });
    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();


        const response = await api.post('/tasks', model);

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
        <div className="homeDiv">
            <div className="titleDiv">
                <h1 className="title">TASKS</h1>
                <p>Create a new Task:</p>
            </div>
            <div className="newTaskDiv">
                <Form onSubmit={onSubmit} className="form">
                    <Form.Group>
                        <Form.Label>Title:</Form.Label>
                        <Form.Control
                            name="title"
                            type="text"
                            value={model.title}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description:</Form.Label>
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

export default Home;