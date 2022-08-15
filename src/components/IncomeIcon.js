import React from "react";

function IncomeIcon() {
    return (
        <div className="w-6 h-6 bg-green-600 rounded-full flex justify-center items-center">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 text-white"
                fill="#FFFFFF"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                />
            </svg>
        </div>
    );
}

export default IncomeIcon;
