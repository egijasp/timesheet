import {
  FC, useEffect, useRef, useState,
} from 'react';
import './Dropdown.scss';
import { MdPersonOutline, GoTriangleDown, GoTriangleUp } from 'react-icons/all';

type DropdownProps = {
  label: string,
  data: string[];
  changeHandler: (item: string) => void,
  value: string,
  title: string
}

const Dropdown: FC<DropdownProps> = ({
  label, data, changeHandler, value, title,
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
          >
            <MdPersonOutline className="dropdown__button--icon" />
            {value || title}
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
                  changeHandler(item);
                  setOpen(false);
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
