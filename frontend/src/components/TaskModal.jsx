
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { DatePicker } from './DatePicker';
import { ComboBox } from './ComboBox';
import { TimeSelector } from './TimeSelector';
import { addTask, fetchDailySummary, updateTask } from '@/store/slices/taskSlice';
import moment from 'moment-timezone';

export const TaskModal = ({ open, onClose, token, employees, myData, onTaskAdded, editTask }) => {
  const dispatch = useDispatch();
  const { summary } = useSelector(state => state.tasks) || {}; // Destructure with fallback
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [fromTime, setFromTime] = useState('08:00:00.000');
  const [toTime, setToTime] = useState('08:30:00.000');
  const [employeeId, setEmployeeId] = useState(myData._id);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editTask) {
      setDescription(editTask.description);
      setDate(new Date(editTask.from));
      setFromTime(moment(editTask.from).format('HH:mm:ss.SSS'));
      setToTime(moment(editTask.to).format('HH:mm:ss.SSS'));
      setEmployeeId(editTask.employeeId);
    }
  }, [editTask]);

  useEffect(() => {
    if (employeeId && date) {
      const formattedDate = moment(date).format('YYYY-MM-DD');
      dispatch(fetchDailySummary({ date: formattedDate, employeeId, token }));
    }
  }, [employeeId, date, dispatch, token]);

  const handleSaveTask = () => {
    setError('');

    const from = moment.tz(
      `${moment(date).format('YYYY-MM-DD')}T${fromTime}`,
      'Africa/Cairo'
    ).utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');

    const to = moment.tz(
      `${moment(date).format('YYYY-MM-DD')}T${toTime}`,
      'Africa/Cairo'
    ).utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');

    if (!moment(from).isValid() || !moment(to).isValid()) {
      setError('Invalid date or time value.');
      return;
    }

    if (moment(from).isSameOrAfter(to)) {
      setError('The "from" time must be before the "to" time.');
      return;
    }

    const duration = moment.duration(moment(to).diff(moment(from))).asHours();
    if (duration > 8) {
      setError('Task duration cannot be more than 8 hours.');
      return;
    }

    const fromHour = moment(from).hour();
    const toHour = moment(to).hour();
    if (fromHour < 8 || toHour > 18 || (toHour === 18 && moment(to).minute() > 0)) {
      setError('The task must be within working hours (8 AM to 6 PM Cairo time).');
      return;
    }

    if (summary && summary.tasks) {
      const isOverlapping = summary.tasks.some(task => {
        const taskFrom = moment(task.from);
        const taskTo = moment(task.to);
        return (moment(from).isBetween(taskFrom, taskTo, undefined, '[)') || moment(to).isBetween(taskFrom, taskTo, undefined, '(]')) ||
               (moment(from).isSameOrBefore(taskFrom) && moment(to).isSameOrAfter(taskTo));
      });
      if (isOverlapping) {
        setError('The selected time overlaps with an existing task.');
        return;
      }
    }

    const taskData = {
      description,
      from,
      to,
      employeeId,
      token
    };

    const action = editTask ? updateTask({ ...taskData, taskId: editTask._id }) : addTask(taskData);
    dispatch(action).then(() => {
      onClose();
      onTaskAdded();
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <Card className="w-full max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>{editTask ? 'Edit Task' : 'Add a Task'}</CardTitle>
          <CardDescription>Fill in the details to {editTask ? 'update' : 'add'} a task.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <label htmlFor="description">Description</label>
            <Textarea
              id="description"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
            <label htmlFor="date">Date</label>
            <DatePicker selectedDate={date} setSelectedDate={setDate} />
            <label htmlFor="fromTime">From</label>
            <TimeSelector selectedTime={fromTime} setSelectedTime={setFromTime} />
            <label htmlFor="toTime">To</label>
            <TimeSelector selectedTime={toTime} setSelectedTime={setToTime} />
            {myData.role === 'supervisor' && (
              <>
                <label htmlFor="assignedTo">Assigned To</label>
                <ComboBox selectedEmployee={employeeId} setSelectedEmployee={setEmployeeId} />
              </>
            )}
            {error && <p className="text-red-600">{error}</p>}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSaveTask}>{editTask ? 'Update Task' : 'Add Task'}</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

