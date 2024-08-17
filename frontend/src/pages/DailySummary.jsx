// import { useState, useEffect, useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { DatePicker } from '../components/DatePicker';
// import { ComboBox } from '../components/ComboBox';
// import { fetchDailySummary, deleteTask } from '@/store/slices/taskSlice';
// import { fetchEmployees } from '@/store/slices/employeesSlice';
// import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Pencil, Trash } from 'lucide-react';
// import { format } from 'date-fns-tz';
// import { TaskModal } from '../components/TaskModal'; // Import the TaskModal component

// const DailySummary = () => {
//   const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
//   const [selectedEmployee, setSelectedEmployee] = useState('');
//   const [modalOpen, setModalOpen] = useState(false); // State to manage modal visibility
//   const [editTask, setEditTask] = useState(null); // State to manage the task being edited
//   const selectedDateRef = useRef(selectedDate);
//   const selectedEmployeeRef = useRef(selectedEmployee);
//   const dispatch = useDispatch();
//   const { myData, token } = useSelector(state => state.auth);
//   const { summary, loading, error } = useSelector(state => state.tasks) || {}; // Destructure with fallback
//   const { employees, loading: employeesLoading } = useSelector(state => state.employees); // Check loading state of employees

//   useEffect(() => {
//     if (token) {
//       dispatch(fetchEmployees(token)); // Fetch all employees
//     }
//   }, [dispatch, token]);

//   useEffect(() => {
//     if (myData.role === 'regEmployee') {
//       setSelectedEmployee(myData._id); // Set the current user as the selected employee
//     }
//   }, [myData]);

//   useEffect(() => {
//     selectedDateRef.current = selectedDate;
//     selectedEmployeeRef.current = selectedEmployee;

//     if (selectedDate && selectedEmployee) {
//       dispatch(fetchDailySummary({ date: selectedDate, employeeId: selectedEmployee, token }));
//     }
//   }, [selectedDate, selectedEmployee, dispatch, token]);

//   const handleDelete = (taskId) => {
//     dispatch(deleteTask({ taskId, token })).then(() => {
//       dispatch(fetchDailySummary({ date: selectedDateRef.current, employeeId: selectedEmployeeRef.current, token }));
//     });
//   };

//   const handleTaskAdded = () => {
//     dispatch(fetchDailySummary({ date: selectedDate, employeeId: selectedEmployee, token }));
//   };

//   const getEmployeeName = (employeeId) => {
//     const employee = employees.find(emp => emp._id === employeeId);
//     return employee ? employee.name : 'Unknown';
//   };

//   const formatTimeToCairo = (date) => {
//     return format(new Date(date), 'hh:mm a', { timeZone: 'Africa/Cairo' });
//   };

//   return (
//     <div className="p-10 max-w-screen-xl mx-auto">

//       <div className='flex flex-col sm:flex-row items-start md:items-center justify-start sm:justify-between gap-4 sm:gap-0'>
//         <DatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
//         {myData.role === 'supervisor' && (
//           <ComboBox selectedEmployee={selectedEmployee} setSelectedEmployee={setSelectedEmployee} />
//         )}
//         <Button onClick={() => { setEditTask(null); setModalOpen(true); }}>Add a Task</Button>
//       </div>






//       {loading && <p>Loading...</p>}
//       {error && <p className="text-red-600">{error}</p>}
//       {summary && summary.date && (
//         <div>
//           <div className='flex justify-around text-2xl font-bold mt-10'>
//             <p className="mb-2">Total Hours: {summary.totalHours}</p>
//             <p className="mb-4">Remaining Hours: {summary.remainingHours}</p>
//           </div>
//           <h3 className="text-xl font-semibold mb-2">Tasks:</h3>
//           <div className="grid gap-4">
//             {summary.tasks && summary.tasks.map((task) => {
//               const fromTime = formatTimeToCairo(task.from);
//               const toTime = formatTimeToCairo(task.to);
//               const duration = (new Date(task.to) - new Date(task.from)) / 1000 / 60 / 60; // Duration in hours
//               const canDelete = myData.role === 'supervisor' || myData._id === task.createdBy;

//               return (
//                 <Card key={task._id}>
//                   <CardHeader>
//                     <CardTitle>{task.description}</CardTitle>
//                     <CardDescription>{`From: ${fromTime} To: ${toTime} (${duration.toFixed(2)} hours)`}</CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     {employeesLoading ? (
//                       <p>Loading...</p>
//                     ) : (
//                       <p>Created By: {getEmployeeName(task.createdBy)}</p>
//                     )}
//                   </CardContent>
//                   <CardFooter className="flex justify-between">
//                     {canDelete && (
//                       <Button className="hover:bg-green-700 hover:text-white" variant="outline" onClick={() => { setEditTask(task); setModalOpen(true); }}>
//                         <Pencil className="mr-2 h-4 w-4" /> Edit
//                       </Button>
//                     )}
//                     {canDelete && (
//                       <Button variant="outline" className="hover:bg-red-600 hover:text-white" onClick={() => handleDelete(task._id)}>
//                         <Trash className="mr-2 h-4 w-4" /> Delete
//                       </Button>
//                     )}
//                   </CardFooter>
//                 </Card>
//               );
//             })}
//           </div>
//         </div>
//       )}

//       {/* Render TaskModal */}
//       <TaskModal
//         open={modalOpen}
//         onClose={() => setModalOpen(false)}
//         token={token}
//         employees={employees}
//         myData={myData}
//         onTaskAdded={handleTaskAdded}
//         editTask={editTask}
//       />
//     </div>
//   );
// };

// export default DailySummary;


import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DatePicker } from '../components/DatePicker';
import { ComboBox } from '../components/ComboBox';
import { fetchDailySummary, deleteTask } from '@/store/slices/taskSlice';
import { fetchEmployees } from '@/store/slices/employeesSlice';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pencil, Trash } from 'lucide-react';
import { format } from 'date-fns-tz';
import { TaskModal } from '../components/TaskModal'; 

const DailySummary = () => {
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [modalOpen, setModalOpen] = useState(false); //  manage modal visibility
  const [editTask, setEditTask] = useState(null); //manage the task being edited
  const dispatch = useDispatch();
  const { myData, token } = useSelector(state => state.auth);
  const { summary, loading, error } = useSelector(state => state.tasks) || {}; 
  const { employees, loading: employeesLoading } = useSelector(state => state.employees); 

  useEffect(() => {
    if (token) {
      dispatch(fetchEmployees(token)); // Fetch all employees
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (myData.role === 'regEmployee') {
      setSelectedEmployee(myData._id); // Set the current user as the selected employee
    }
  }, [myData]);

  useEffect(() => {
   

    if (selectedDate && selectedEmployee) {
      dispatch(fetchDailySummary({ date: selectedDate, employeeId: selectedEmployee, token }));
    }
  }, [selectedDate, selectedEmployee, dispatch, token]);

  const handleDelete = (taskId) => {
    dispatch(deleteTask({ taskId, token })).then(() => {
      dispatch(fetchDailySummary({ date: selectedDate, employeeId: selectedEmployee, token }));
    });
  };

  const handleTaskAdded = () => {
    dispatch(fetchDailySummary({ date: selectedDate, employeeId: selectedEmployee, token }));
  };

  const getEmployeeName = (employeeId) => {
    const employee = employees.find(emp => emp._id === employeeId);
    return employee ? employee.name : 'Unknown';
  };

  const formatTimeToCairo = (date) => {
    return format(new Date(date), 'hh:mm a', { timeZone: 'Africa/Cairo' });
  };

  return (
    <div className="p-10 max-w-screen-xl mx-auto">

      <div className='flex flex-col sm:flex-row items-start md:items-center justify-start sm:justify-between gap-4 sm:gap-0'>
        <DatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        {myData.role === 'supervisor' && (
          <ComboBox selectedEmployee={selectedEmployee} setSelectedEmployee={setSelectedEmployee} />
        )}
        <Button onClick={() => { setEditTask(null); setModalOpen(true); }}>Add a Task</Button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {summary && summary.date && (
        <div>
          <div className='flex justify-around text-2xl font-bold mt-10'>
            <p className="mb-2">Total Hours: {summary.totalHours}</p>
            <p className="mb-4">Remaining Hours: {summary.remainingHours}</p>
          </div>
          <h3 className="text-xl font-semibold mb-2">Tasks:</h3>
          <div className="grid gap-4">
            {summary.tasks && summary.tasks.map((task) => {
              const fromTime = formatTimeToCairo(task.from);
              const toTime = formatTimeToCairo(task.to);
              const duration = (new Date(task.to) - new Date(task.from)) / 1000 / 60 / 60; // Duration in hours
              const canDelete = myData.role === 'supervisor' || myData._id === task.createdBy;

              return (
                <Card key={task._id}>
                  <CardHeader>
                    <CardTitle>{task.description}</CardTitle>
                    <CardDescription>{`From: ${fromTime} To: ${toTime} (${duration.toFixed(2)} hours)`}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {employeesLoading ? (
                      <p>Loading...</p>
                    ) : (
                      <p>Created By: {getEmployeeName(task.createdBy)}</p>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    {canDelete && (
                      <Button className="hover:bg-green-700 hover:text-white" variant="outline" onClick={() => { setEditTask(task); setModalOpen(true); }}>
                        <Pencil className="mr-2 h-4 w-4" /> Edit
                      </Button>
                    )}
                    {canDelete && (
                      <Button variant="outline" className="hover:bg-red-600 hover:text-white" onClick={() => handleDelete(task._id)}>
                        <Trash className="mr-2 h-4 w-4" /> Delete
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Render TaskModal */}
      <TaskModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        token={token}
        employees={employees}
        myData={myData}
        onTaskAdded={handleTaskAdded}
        editTask={editTask}
      />
    </div>
  );
};

export default DailySummary;
