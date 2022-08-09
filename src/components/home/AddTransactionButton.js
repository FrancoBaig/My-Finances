import React, { useState } from "react";

// Components
import IconButton from "./IconButton";

const BackDrop = ({ setModal }) => {
    return (
        <div
            className="fixed top-0 right-0 w-full h-full bg-black/30"
            onClick={() => setModal(false)}
        ></div>
    );
};

const IncomeIcon = () => {
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
};

const ExpenseIcon = () => {
    return (
        <div className="w-6 h-6 bg-red-600 rounded-full flex justify-center items-center">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-white"
                fill="#FFFFFF"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20 12H4"
                />
            </svg>
        </div>
    );
};

function AddTransactionButton() {
    const [openModal, setOpenModal] = useState(false);

    return (
        <div className="fixed bottom-5 w-full grid grid-cols-4 bg-blue">
            {openModal ? (
                <>
                    <BackDrop setModal={setOpenModal} />
                    <div className="w-4/5 col-span-3 justify-self-end paper h-20 rounded-none rounded-t-lg rounded-l-lg z-10">
                        <IconButton Icon={<IncomeIcon />} text="Income" />
                        <IconButton Icon={<ExpenseIcon />} text="Expense" />
                    </div>
                </>
            ) : (
                ""
            )}

            <button
                className="row-start-2 col-start-4 w-16 h-16 bg-primary rounded-full flex justify-center items-center"
                onClick={() => setOpenModal(true)}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
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
            </button>
        </div>
    );
}

export default AddTransactionButton;
