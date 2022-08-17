import React from "react";

// Redux
import { useDispatch } from "react-redux";
import { updateTransaction } from "../redux/states/transactionsState";

// useForm
import { useForm } from "react-hook-form";

// Components
import InputDatePicker from "./InputDatePicker";

// Icons
import { CurrencyDollarIcon } from "@heroicons/react/outline";

// moment
import moment from "moment";

function EditTransaction({ data = {}, setDisplay }) {
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            description: data.description,
            amount: data.amount > 0 ? data.amount : -1 * data.amount,
        },
    });

    const handleSubmitTransaction = (form) => {
        const amount = parseInt(form.amount);
        const newTransaction = {
            id: data.id,
            description: form.description,
            amount: data.amount > 0 ? amount : -1 * amount,
            date: moment(form.date).format("YYYY-MM-DD HH:mm:ss"),
        };
        dispatch(updateTransaction(newTransaction));
        setDisplay(null);
    };

    return (
        <>
            {data ? (
                <div className="fixed top-0 right-0 w-full h-full flex justify-center items-center">
                    <div
                        className="backdrop z-40"
                        onClick={() => setDisplay(false)}
                    ></div>
                    <form
                        onSubmit={handleSubmit(handleSubmitTransaction)}
                        className="paper rounded-md w-8/12 z-40 grid gap-4"
                    >
                        <div>
                            <label className="label">Description</label>
                            <input
                                type="text"
                                className="input-transaction"
                                {...register("description", { required: true })}
                            />
                            {errors.description && (
                                <span className="input-error">
                                    The description is required
                                </span>
                            )}
                        </div>
                        <div className="relative">
                            <label className="label">Amount</label>
                            <CurrencyDollarIcon className="h-6 w-6 absolute text-gray-400" />
                            <input
                                className="input-transaction w-6/12 pl-7"
                                {...register("amount", {
                                    required: true,
                                    pattern: /^[0-9]*$/,
                                })}
                            />
                            {errors.amount &&
                                errors.amount.type === "required" && (
                                    <span className="input-error">
                                        The amount is required
                                    </span>
                                )}
                            {errors.amount &&
                                errors.amount.type === "pattern" && (
                                    <span className="input-error">
                                        Amount must be a number
                                    </span>
                                )}
                        </div>
                        <div>
                            <label className="label mb-2">Due date</label>
                            <InputDatePicker
                                control={control}
                                errors={errors}
                            />
                        </div>
                        <button type="submit" className="btn">
                            Send
                        </button>
                    </form>
                </div>
            ) : (
                ""
            )}
        </>
    );
}

export default EditTransaction;
