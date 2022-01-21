import React, { useEffect, useState } from 'react';
import './App.scss';
import Dropdown from './components/Dropdown/Dropdown';
import WeekView from './components/WeekView/WeekView';
import employeesList from './data/employeesList';
import days from './data/days';
import weekList, { employeeData } from './helpers/weekList';
import { EmployeeData } from './helpers/types';

const hourlyRate = 10;

const App = () => {
  const [employeesData, setEmployeesData] = useState<EmployeeData[]>(employeeData);
  const [selectedEmployee, setSelectedEmployee] = useState('Select employee');
  const [selectedTimesheet, setSelectedTimesheet] = useState('Select week');

  console.log(employeesData);

  return (
    <div className="App">
      <header className="App__header">
        <Dropdown
          placeholder="Select employee"
          data={employeesData.map(({ name }) => name)}
          label="Employee"
          onSelect={setSelectedEmployee}
          value={selectedEmployee}
        />
        <Dropdown
          placeholder="Select week"
          data={weekList}
          value={selectedTimesheet}
          label="Week"
          onSelect={(week) => setSelectedTimesheet(week)}
        />
      </header>
      {days.map((day) => (
        <WeekView day={day} />
      ))}

      <footer className="App__footer">
        <span className="footer__text">Hours worked</span>
        <span>10</span>
        <span className="footer__text">Salary</span>
        <span>€ 100</span>
      </footer>
    </div>
  );
};

export default App;
