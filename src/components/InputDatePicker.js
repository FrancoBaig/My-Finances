import React, { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Icon
import { CalendarIcon } from "@heroicons/react/outline";

// react-hook-form
import { Controller } from "react-hook-form";

function InputDatePicker({ control, errors }) {
    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <div onClick={onClick} ref={ref} className="relative">
            <CalendarIcon className="w-5 text-gray-400 absolute bottom-2 left-0" />
            <div className="input-transaction pl-7 w-4/12 h-7">{value}</div>
        </div>
    ));

    return (
        <>
            <Controller
                control={control}
                name="date"
                rules={{ required: true }}
                render={({ field }) => (
                    <DatePicker
                        placeholder="Select a date..."
                        onChange={(date) => field.onChange(date)}
                        selected={field.value}
                        customInput={<ExampleCustomInput />}
                    />
                )}
            />
            {errors.date && (
                <span className="input-error">This field is required</span>
            )}
        </>
    );
}

export default InputDatePicker;
