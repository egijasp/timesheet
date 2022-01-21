import {
  FC, useEffect, useRef, useState,
} from 'react';
import './Dropdown.scss';
import { MdPersonOutline, GoTriangleDown, GoTriangleUp } from 'react-icons/all';
import { EmployeeData } from '../../helpers/types';

type DropdownProps = {
  label: string,
  value: string,
  data: string[];
  onSelect: (value: string) => void,
  placeholder: string,
}

const Dropdown: FC<DropdownProps> = ({
  label, value, data, onSelect, placeholder,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLFieldSetElement>(null);

  useEffect(() => {
    const ifClickedOutside = (e: MouseEvent) => {
      if (open && ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('click', ifClickedOutside);
    return () => {
      document.addEventListener('click', ifClickedOutside);
    };
  }, [open]);

  return (
    <>
      <fieldset
        ref={ref}
        className="dropdown__wrapper"
      >
        <legend className="dropdown__label">
          {label}
        </legend>
        <div className="dropdown">
          <div
            className="dropdown__button"
            onClick={() => setOpen(!open)}
            placeholder={placeholder}
          >
            <MdPersonOutline className="dropdown__button--icon" />
            {value}
            <span className="dropdown__button--angle">
              { open ? <GoTriangleUp /> : <GoTriangleDown /> }
            </span>
          </div>
        </div>
        {open && (
          <div className="dropdown__content">
            {data?.map((item) => (
              <div
                key={Math.random()}
                className="dropdown__list"
                onClick={() => {
                  setOpen(!open);
                  onSelect(item);
                }}

              >
                {item}
              </div>
            ))}
          </div>
        )}
      </fieldset>
    </>
  );
};

export default Dropdown;
