import moment from 'moment';
import days from '../data/days';
import { EmployeeData } from './types';
import employeesList from '../data/employeesList';

export const weekList = (): string[] => {
  const weeks = [];
  for (let i = 0; i < 5; i += 1) {
    const start = moment().subtract(i, 'weeks').startOf('isoWeek').format('DD MMM YYYY');
    const end = moment().subtract(i, 'weeks').endOf('isoWeek').format('DD MMM YYYY');
    weeks.push(`${start} - ${end}`);
  }
  return weeks;
};

export const generateEmployeeData = (): EmployeeData[] => {
  const employeesData = [];

  for (let x = 0; x < employeesList.length; x += 1) {
    const weeksData = [];

    for (let y = 0; y < weekList().length; y += 1) {
      const daysAndHours = {};

      days.forEach((day) => {
        Object.assign(daysAndHours, { [day]: Math.round(Math.random() * (8 - 0 + 1) + 0) });
      });

      weeksData.push({
        week: weekList()[y],
        workedHours: daysAndHours,
      });
    }

    employeesData.push(
      {
        name: employeesList[x],
        weeks: weeksData,
      },
    );
  }
  return employeesData;
};
