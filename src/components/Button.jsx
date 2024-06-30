import PropTypes from "prop-types";

const Button = ({ label, onClick }) => {
  return (
    <button onClick={() => onClick(label)} className="button">
      {label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
