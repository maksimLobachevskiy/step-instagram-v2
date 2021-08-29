import React from "react";

function Button(props) {
  const { className, backgroundColor, text, onClick } = props;
  return (
    <button
      className={className}
      style={{ background: backgroundColor }}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
