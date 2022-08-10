import React, { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function InputDatePicker({ date, setDate }) {
    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <div onClick={onClick} ref={ref} className="relative">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 absolute text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
            </svg>
            <div className="input-transaction pl-7 w-4/12">{value}</div>
        </div>
    ));

    return (
        <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            customInput={<ExampleCustomInput />}
        />
    );
}

export default InputDatePicker;
