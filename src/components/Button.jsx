const Button = ({ children, onClick, className = "" }) => {
  return (
    <div>
      <button
        onClick={onClick}
        className={`${className} max-w-fit font-bold border-solid border-2 px-4 py-2 rounded-2xl hover:bg-amber-600 hover:text-gray-800 border-amber-300 cursor-pointer`}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
