import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Check, ChevronsUpDown } from "lucide-react";

import { fetchEmployees } from '@/store/slices/employeesSlice';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function ComboBox({ selectedEmployee, setSelectedEmployee }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { employees } = useSelector(state => state.employees);
  const { token, myData } = useSelector(state => state.auth); // Use myData for current user

  useEffect(() => {
    if (token) {
      dispatch(fetchEmployees(token));
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (myData && myData._id) {
      setSelectedEmployee(myData._id); // Set the default value to the current user's ID
    }
  }, [myData, setSelectedEmployee]);

  const handleSelect = (currentValue) => {
    setSelectedEmployee(currentValue === selectedEmployee ? "" : currentValue);
    setOpen(false);
  };

  const getEmployeeLabel = (employee) => {
    if (!employee) return "";
    if (employee._id === myData._id) {
      return `${employee.name} (me)`;
    }
    return employee.name;
  };

  const selectedEmployeeLabel = employees.find((employee) => employee._id === selectedEmployee);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedEmployee
            ? getEmployeeLabel(selectedEmployeeLabel)
            : "Select employee..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {employees.map((employee) => (
                <CommandItem
                  key={employee._id}
                  value={employee._id}
                  onSelect={() => handleSelect(employee._id)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedEmployee === employee._id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {getEmployeeLabel(employee)}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
