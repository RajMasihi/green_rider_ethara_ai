import React from "react";

function Button({ text }) {
  return (
    <button className="btn btn-lg p-1 m-0 border-2 border-success">
      {text}
    </button>
  );
}

export default Button;
