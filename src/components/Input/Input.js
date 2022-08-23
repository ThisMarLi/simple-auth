import classNames from "classnames";

import './input.css';

const Input = ({ type='text', placeholder, value, onChange, className, ...rest }) => {
  const inputClasses = classNames('form-control', className);

  return (
    <input
      type={ type }
      className={ inputClasses }
      placeholder={ placeholder }
      value={ value }
      onChange={ onChange }
    />
  );
};

export default Input;