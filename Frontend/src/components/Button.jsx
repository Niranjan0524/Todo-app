const Button = ({ btnType, btnText, handler }) => {
  let btnClass = "px-4 py-2 rounded focus:outline-none ";

  if (btnType === 'success') {
    btnClass += "bg-green-500 hover:bg-green-600 text-white";
  } else if (btnType === 'danger') {
    btnClass += "bg-red-500 hover:bg-red-600 text-white";
  } else {
    btnClass += "bg-blue-500 hover:bg-blue-600 text-white";
  }

  return (
    <button className={btnClass} onClick={handler}>
      {btnText}
    </button>
  );
};

export default Button;