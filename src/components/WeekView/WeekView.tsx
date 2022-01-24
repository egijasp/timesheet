import './WeekView.scss';
import React, {
  FC,
} from 'react';
import Loading from '../Loading/Loading';

type WeekViewProps = {
  onHoursChange: (value: number, day: string) => void;
  day: string,
  hours: number,
  salary: number,
  loading: boolean,
}

const WeekView: FC<WeekViewProps> = ({
  onHoursChange, day, hours, salary, loading,
}) => (
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

export default WeekView;
