import React, { useState } from "react";

// Components
import IconButton from "./IconButton";
import IncomeIcon from "./IncomeIcon";
import ExpenseIcon from "./ExpenseIcon";

const BackDrop = ({ setModal }) => {
    return (
        <div
            className="fixed top-0 right-0 w-full h-full bg-black/30"
            onClick={() => setModal(false)}
        ></div>
    );
};

function AddTransactionButton({ setOpenTransaction, setMode }) {
    const [openModal, setOpenModal] = useState(false);

    return (
        <div className="fixed bottom-5 right-5 grid grid-cols-4 lg:right-10">
            {openModal ? (
                <>
                    <BackDrop setModal={setOpenModal} />
                    <div className="w-fit col-span-3 justify-self-end paper h-30 rounded-none rounded-t-lg rounded-l-lg px-4 z-10 lg:w-full">
                        <IconButton
                            Icon={<IncomeIcon />}
                            text="Income"
                            onClick={() => {
                                setOpenTransaction(true);
                                setMode(1);
                            }}
                        />
                        <IconButton
                            Icon={<ExpenseIcon />}
                            text="Expense"
                            onClick={() => {
                                setOpenTransaction(true);
                                setMode(2);
                            }}
                        />
                    </div>
                </>
            ) : (
                ""
            )}

            <button
                className="row-start-2 col-start-4 w-16 h-16 bg-primary rounded-full flex justify-center items-center drop-shadow-xl hover:scale-110 duration-100 lg:w-20 lg:h-20"
                onClick={() => setOpenModal(true)}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white lg:w-9 lg:h-9"
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
