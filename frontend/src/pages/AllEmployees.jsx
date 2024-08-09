import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchEmployees, deleteEmployee } from '@/store/slices/employeesSlice';
import { useAuth } from '@/hooks/use-auth'; // Custom hook to get auth state

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { TaskModal } from '../components/TaskModal';

const AllEmployees = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useAuth(); // Use custom hook to get auth state
  const { employees } = useSelector(state => state.employees);
  const [modalOpen, setModalOpen] = useState(false); // State to manage modal visibility
  const [selectedEmployee, setSelectedEmployee] = useState(null); // State to store the selected employee for adding a task

  useEffect(() => {
    if (token) {
      dispatch(fetchEmployees(token));
    }
  }, [dispatch, token]);

  const handleDelete = (id) => {
    dispatch(deleteEmployee({ id, token }));
  };

  const handleAddTask = (employee) => {
    setSelectedEmployee(employee);
    setModalOpen(true);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => <div>{row.getValue('name')}</div>,
      },
      {
        accessorKey: 'email',
        header: 'Email',
        cell: ({ row }) => <div className="lowercase">{row.getValue('email')}</div>,
      },
      {
        accessorKey: 'role',
        header: 'Role',
        cell: ({ row }) => <div>{row.getValue('role')}</div>,
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
          const employee = row.original;

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => handleAddTask(employee)}>
                  Add Task
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => {
                  console.log(employee._id);
                  handleDelete(employee._id)}}>
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [navigate, handleDelete]
  );

  const table = useReactTable({
    data: employees,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full px-10 py-10">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="font-bold">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {modalOpen && (
        <TaskModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          token={token}
          employees={employees}
          myData={{ _id: selectedEmployee._id, role: 'supervisor' }} // Mock myData for supervisor
          onTaskAdded={() => dispatch(fetchEmployees(token))} // Re-fetch employees after adding a task
          editTask={null} // No edit task, only adding a new task
        />
      )}
    </div>
  );
};

export default AllEmployees;
