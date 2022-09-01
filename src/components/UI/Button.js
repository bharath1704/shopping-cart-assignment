import './Button.scss';

const Button = ({ title, fullWidth, clickHandler }) => {
  return (
    <button
      className={`btn ${fullWidth ? "btn-full" : ""}`}
      onClick={clickHandler}>
      {title}
    </button>
  )
}

export default Button;