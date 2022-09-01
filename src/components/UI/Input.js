import './Input.scss';

const Input = ({ type, title, name, id, value, changeHandler }) => {

  return (
    <div className="input-label">
      <input
        type={type}
        name={name}
        placeholder={title}
        id={id}
        value={value}
        onChange={changeHandler}
      />
      <label htmlFor={id}>{title}</label>
    </div>
  );
}

export default Input;