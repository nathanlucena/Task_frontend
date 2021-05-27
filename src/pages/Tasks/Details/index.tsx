import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import moment from 'moment';
import api from '../../../services/api';

interface IParamsProps {
  id: string;
}

interface ITask {
  id: number;
  title: string;
  description: string;
  finished: boolean;
  created_at: Date;
  update_at: Date;
}

const Details: React.FC = () => {

  const history = useHistory();
  const { id } = useParams<IParamsProps>();
  const [task, setTask] = useState<ITask>();

  useEffect(() => {
    findTask();
  }, [id])

  function back() {
    history.push('/tasks/');
  }

  async function findTask() {
    const response = await api.get<ITask>(`/tasks/${id}`);
    setTask(response.data)
  }

  function formateDate(date: Date | undefined) {
    return moment(date).format("MM/DD/YYYY");
  }


  return (
    <div className="container">
      <br />
      <div className="task-header" >
        <h1>{task?.title}</h1>

        <Button variant="dark" size="lg" onClick={back}>Back to tasks</Button>
      </div>
      <div className="taskInfo">
        <div>
          <span className="spanFinished" style={task?.finished ? { backgroundColor: "#50c878" } : { backgroundColor: "#ff8b3d" }}>{task?.finished ? "Finished " : "In Progess "}</span>
        </div>
        <div>
          <span className="spanStrong">Register in: </span>
          <span>{formateDate(task?.created_at)}</span>
        </div>
        <div>
          <span className="spanStrong">Last update: </span>
          <span>{formateDate(task?.created_at)}</span>
        </div>
      </div>
      <hr />
      <div className="description">
        <p>{task?.description}</p>
      </div>
    </div>
  );
}

export default Details;