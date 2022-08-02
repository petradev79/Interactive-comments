import '../style/button.scss';

type ButtonProps = {
  className: string;
  text: string;
  onClick?: () => void;
  children?: JSX.Element | JSX.Element[];
};

const Button = ({ children, text, className, onClick }: ButtonProps) => {
  return (
    <button className={`btn flex-align-center ${className}`} onClick={onClick}>
      {children} {text}
    </button>
  );
};

export default Button;
