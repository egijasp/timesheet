import './WeekView.scss';
import {
  FC, useEffect, useRef, useState,
} from 'react';
import days from '../../data/days';

type WeekViewProps = {
  hours?: number,
  salary?: number,
  day: string,
}

const WeekView: FC<WeekViewProps> = ({ hours, salary, day }) => {
  const [editHours, setEditHours] = useState(false);
  const [inputValue, setInputValue] = useState<number>(0);
  const hoursRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    hoursRef.current?.focus();
  }, [editHours]);

  return (
    <div className="container">
      <div
        key={day}
        className="wrapper"
      >
        <fieldset
          className="input__wrapper"
          onBlur={() => setEditHours(false)}
          onDoubleClick={() => setEditHours(true)}
        >
          <legend
            className="input__label"
          >
            {day}
          </legend>
          {editHours ? (
            <input
              className="input"
              ref={hoursRef}
              type="number"
              value={inputValue}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (value >= 0 && value <= 24) {
                  setInputValue(value);
                }
              }}
            />
          ) : (
            <span
              className="hours"
              onClick={() => setEditHours(true)}
            >
              {hours}
            </span>
          )}
        </fieldset>
        <span className="salary">
          €
          {' '}
          {salary?.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default WeekView;
