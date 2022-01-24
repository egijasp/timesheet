import './WeekView.scss';
import React, {
  FC, useEffect, useState,
} from 'react';
import Loading from '../Loading/Loading';
import { EmployeeData, WeeksData } from '../../helpers/types';

type WeekViewProps = {
  onHoursChange: (value: number, day: string) => void;
  day: string,
  hours: number,
  salary: number,
  employee: EmployeeData,
  week: string,
  // loading: boolean,
}

const WeekView: FC<WeekViewProps> = ({
  onHoursChange, day, hours, salary, employee, week,
}) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(true);
    }, 500);
    return () => {
      setLoading(false);
      clearTimeout(timeout);
    };
  }, [hours, salary, employee, week]);
  return (
    <div className="container">
      <div className="input__list">
        <div
          className="input__wrapper"
        >
          <input
            className="input"
            type="number"
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value >= 0 && value <= 24) {
                onHoursChange(value, day);
              }
            }}
            value={hours}
            placeholder="0"
            id={day}
          />
          <label
            htmlFor={day}
            className="input__label"
          >
            {day}
          </label>
        </div>
        {!loading
          ? <Loading /> : (
            <span
              className="salary"
            >
              €
              {' '}
              {salary.toFixed(2)}
            </span>
          )}
      </div>
    </div>
  );
};

export default WeekView;
