import { Link } from 'react-router-dom';
import classNames from "classnames";
import './button.css';

const Button = ({ children, className, type='button', href, ...rest }) => {
  const buttonClasses = classNames('button', className);

  if (type === 'link') {
    return (
      <Link
        to={ href }
        className={ buttonClasses }
        { ...rest }
      >
        { children }
      </Link>
    );
  } else {
    return (
      <button
        type={ type }
        className={ buttonClasses }
        { ...rest }
      >
        { children }
      </button>
    );
  }
};

export default Button;