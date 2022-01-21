import moment from 'moment';
import days from '../data/days';
import { EmployeeData, WeeksData, WorkedHours } from './types';
import employeesList from '../data/employeesList';

const weekList = () => {
  const weeks = [];
  for (let i = 0; i < 5; i += 1) {
    const start = moment().subtract(i, 'weeks').startOf('isoWeek').format('DD MMM YYYY');
    const end = moment().subtract(i, 'weeks').endOf('isoWeek').format('DD MMM YYYY');
    weeks.push(`${start} - ${end}`);
  }
  return weeks;
};

export const employeeData = () => {
  const randomIndex = () => Math.round(Math.random() * employeesList.length);
  const randomHours = (): WorkedHours[] => days.map((item) => ({
    day: item,
    hours: Math.round(Math.random() * (8 - 0 + 1) + 0),
  }));
  const weeksData = (): WeeksData[] => weekList().map((item) => ({
    week: item,
    workedHours: randomHours(),
  }));

  const employeeArray = new Array(employeesList.length).fill({});

  return employeeArray.map(() => ({
    name: `${employeesList[randomIndex()]}`,
    weeks: weeksData(),
  }));
};

export default weekList();
