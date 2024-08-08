import { useParams } from 'react-router-dom';

const AddTask = () => {
  const { id } = useParams();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Task for Employee {id}</h1>
      {/* Add task form goes here */}
    </div>
  );
};

export default AddTask;
