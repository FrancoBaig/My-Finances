import React from "react";

function IconButton({ Icon, text }) {
    return (
        <button className="flex gap-2 items-center mb-1">
            {Icon}
            <p className="text-lg">{text}</p>
        </button>
    );
}

export default IconButton;
