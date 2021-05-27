import React, { useState, useEffect } from 'react';
import { Badge, Button, Modal, Table } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import moment from 'moment';

import './tasks.css';


interface ITask {
    id: number;
    title: string;
    description: string;
    finished: boolean;
    created_at: Date;
    update_at: Date;

}

const Tasks: React.FC = () => {
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [modal, setModal] = useState({ show: false, id: 0 });

    const history = useHistory();

    useEffect(() => {
        loadTasks()
    }, []);

    async function loadTasks() {
        const response = await api.get('/tasks');
        setTasks(response.data);
    }

    function formateDate(date: Date) {
        return moment(date).format("MM/DD/YYYY");
    }

    function newTask() {
        history.push('/newTask');
    }

    function editTask(id: number) {
        history.push(`/newTask/${id}`);
    }

    function viewTask(id: number) {
        history.push(`/tasks/${id}`);
    }

    async function finishedTask(id: number) {
        await api.patch(`/tasks/${id}`);
        loadTasks();
    }


    async function removeTask(id: number) {
        await api.delete(`/tasks/${id}`);
        loadTasks();
    }

    function handleCloseModal() {
        setModal(prevState => ({ show: false, id: 0 }))
    }

    function handleShowModal(id: number) {
        setModal({ show: true, id })
    }


    function costumeModal(task: ITask) {
        if (modal.id === task.id) {
            return (
                <Modal show={modal.show} onHide={handleCloseModal} >
                    <Modal.Header closeButton>
                        <Modal.Title>{task.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Button onClick={() => editTask(task.id)} disabled={task.finished} size="sm" className="actionButtonModal"> Edit </Button> {' '}
                        <Button onClick={() => finishedTask(task.id)} disabled={task.finished} size="sm" variant="success" className="actionButtonModal"> Finish </Button> {' '}
                        <Button onClick={() => viewTask(task.id)} size="sm" variant="info" className="actionButtonModal"> View </Button> {' '}
                        <Button onClick={() => removeTask(task.id)} size="sm" variant="danger" className="actionButtonModal"> Remove </Button> {' '}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Close
                             </Button>
                    </Modal.Footer>
                </Modal>
            );
        }
    }

    return (
        <div className="container">
            <div className="task-header" >
                <h1>Yours Tasks</h1>
                <Button variant="dark" size="lg" onClick={newTask}>New Task</Button>
            </div>
            <hr />

            <div className="tableDiv">
                <Table striped bordered hover variant="dark" className="text-center">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Last Update</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map(task => (
                            <tr key={task.id}>
                                <td>{task.id}</td>
                                <td>{task.title}</td>
                                <td>{formateDate(task.update_at)}</td>
                                <td>
                                    <Badge variant={task.finished ? "success" : "warning"}>
                                        {task.finished ? "FINISHED" : "IN PROGRESS"}
                                    </Badge>
                                </td>
                                <td>
                                    <Button onClick={() => handleShowModal(task.id)} size="sm" className="buttonModal"> ... </Button> {' '}
                                    {costumeModal(task)}
                                    <Button onClick={() => editTask(task.id)} disabled={task.finished} size="sm" className="actionButton"> Edit </Button> {' '}
                                    <Button onClick={() => finishedTask(task.id)} disabled={task.finished} size="sm" variant="success" className="actionButton"> Finish </Button> {' '}
                                    <Button onClick={() => viewTask(task.id)} size="sm" variant="info" className="actionButton"> View </Button> {' '}
                                    <Button onClick={() => removeTask(task.id)} size="sm" variant="danger" className="actionButton"> Remove </Button> {' '}
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </Table>

            </div>

        </div>
    )
}
export default Tasks;