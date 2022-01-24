import React, { useEffect, useState } from 'react';
import './App.scss';
import Dropdown from './components/Dropdown/Dropdown';
import WeekView from './components/WeekView/WeekView';
import {
  generateEmployeeData, weekList,
} from './helpers/weekList';
import { EmployeeData, WeeksData } from './helpers/types';
import employeesList from './data/employeesList';
import days from './data/days';
import Loading from './components/Loading/Loading';

const hourlyRate = 10;
const weeks = weekList();

const App = () => {
  const [employeesData, setEmployeesData] = useState<EmployeeData[]>(generateEmployeeData);
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeData>(employeesData[0]);
  const [selectedWeek, setSelectedWeek] = useState(weeks[0]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(true);
    }, 500);

    return () => {
      clearTimeout(timeout);
      setLoading(false);
    };
  }, [selectedWeek, selectedEmployee]);

  const updateEmployee = (name: string) => {
    setSelectedEmployee({
      ...selectedEmployee,
      name,
    });
  };

  const selectedWeekData = selectedEmployee.weeks
    .find(({ week }) => week === selectedWeek) || {} as WeeksData;

  const hoursChange = (hours: number, day: string) => {
    if (selectedEmployee && selectedWeekData) {
      const employeeIndex = employeesData.indexOf(selectedEmployee);
      const weekIndex = employeesData[employeeIndex].weeks.indexOf(selectedWeekData);
      const copyEmployeesData = [...employeesData];
      copyEmployeesData[employeeIndex].weeks[weekIndex].workedHours[day] = hours;

      setEmployeesData(copyEmployeesData);
    }
  };

  const workedHoursDay = (day: string): number => (
    selectedWeekData ? selectedWeekData.workedHours[day] : 0
  );

  const employeeSalaryDay = (day: string, index: number): number => {
    if (selectedEmployee) {
      const salary = workedHoursDay(day) * hourlyRate;
      return (selectedWeekData?.workedHours[day] && index >= 5) ? salary * 2 : salary;
    }
    return 0;
  };

  const employeeSalaryTotal = (): number => Object.entries(selectedWeekData.workedHours)
    .map((day, index) => employeeSalaryDay(day[0], index))
    .reduce((prev, curr) => prev + curr);

  const employeeHoursTotal = (): number => Object.values(selectedWeekData.workedHours)
    .reduce((prev, curr) => prev + curr);

  return (
    <div className="App">
      <header className="App__header">
        <Dropdown
          data={employeesList}
          value={selectedEmployee.name}
          label="Employee"
          title="Select name"
          changeHandler={(value) => {
            updateEmployee(value);
          }}
        />
        <Dropdown
          data={weekList()}
          label="Week"
          title="Select week"
          value={selectedWeek}
          changeHandler={(value) => {
            setSelectedWeek(value);
          }}
        />
      </header>
      {days.map((day, index) => (
        <WeekView
          key={day}
          day={day}
          employee={selectedEmployee}
          week={selectedWeek}
          onHoursChange={hoursChange}
          hours={workedHoursDay(day)}
          salary={employeeSalaryDay(day, index)}
        />
      ))}
      <footer className="App__footer">
        <div className="footer__text">
          <span className="">Hours worked</span>
          <span className="footer__text--right">{employeeHoursTotal()}</span>
          <span className="">Salary</span>
          {!loading ? <Loading /> : (
            <span className="footer__text--right">
              €
              {' '}
              {employeeSalaryTotal()}
            </span>
          )}
        </div>
      </footer>
    </div>
  );
};

export default App;
