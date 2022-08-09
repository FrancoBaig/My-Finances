import React from "react";

function IconButton({ Icon, text, onClick }) {
    return (
        <button
            className="flex gap-2 items-center mb-1 w-full"
            onClick={() => onClick(true)}
        >
            {Icon}
            <p className="text-lg">{text}</p>
        </button>
    );
}

export default IconButton;
