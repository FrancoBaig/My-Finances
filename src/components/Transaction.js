import React, { useState } from "react";

// Components
import InputDatePicker from "./InputDatePicker";
import CreateCategory from "./CreateCategory";

// heruicons
import { CurrencyDollarIcon } from "@heroicons/react/outline";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { PlusCircleIcon } from "@heroicons/react/outline";
import { XIcon } from "@heroicons/react/solid";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { postTransaction } from "../redux/states/transactionsState";
import {
    updateCategoryValue,
    updateInitial,
} from "../redux/states/categoriesState";

// Moment
import moment from "moment";

// useForm
import { useForm } from "react-hook-form";

// helper
import { classNames } from "../helper/classNames";

function Transaction({ setModal, mode }) {
    const items = useSelector((state) => {
        if (mode.id === 1) {
            return state.categories.incomes;
        } else {
            return state.categories.expenses;
        }
    });
    const dispatch = useDispatch();
    const [createCategory, setCreateCategory] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const handleSubmitTransaction = (form) => {
        const amount = parseInt(form.amount);
        const isExpense = mode.id === 2 ? amount * -1 : amount;

        const data = {
            description: form.description,
            categoryId: parseInt(form.category),
            amount: isExpense,
            date: moment(form.date).format("YYYY-MM-DD HH:mm:ss"),
        };

        dispatch(postTransaction(data));
        const payload = {
            id: data.categoryId,
            amount: data.amount,
            isIncome: mode.id === 1,
        };

        const currentMonth = moment(new Date()).format("MM");
        const transactionMonth = moment(data.date).format("MM");

        if (transactionMonth === currentMonth) {
            dispatch(updateCategoryValue(payload));
        } else if (transactionMonth < currentMonth) {
            dispatch(updateInitial({ amount: payload.amount }));
        }

        setModal(false);
    };

    if (items === undefined) {
        return;
    }

    return (
        <>
            <div className="backdrop" onClick={() => setModal(false)}></div>
            <div className="absolute top-0 right-0 bg-white w-full h-full md:w-2/4 md:right-2/4 md:translate-x-2/4 md:mt-2 md:rounded-lg">
                <div
                    className={classNames(
                        "w-full h-10 px-2 text-white flex items-center justify-between md:rounded-t-lg",
                        mode.bg
                    )}
                >
                    <div className="flex items-center gap-2">
                        <button onClick={() => setModal(false)}>
                            <XIcon className="h-4 w-4" />
                        </button>
                        <span>{mode.title}</span>
                    </div>
                    <button
                        form="transaction-form"
                        type="submit"
                        className="text-white text-sm font-bold pr-2"
                    >
                        Save
                    </button>
                </div>
                <form
                    onSubmit={handleSubmit(handleSubmitTransaction)}
                    className="grid gap-6 px-3 pt-4 bg-white"
                    id="transaction-form"
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
                        {errors.amount && errors.amount.type === "required" && (
                            <span className="input-error">
                                The amount is required
                            </span>
                        )}
                        {errors.amount && errors.amount.type === "pattern" && (
                            <span className="input-error">
                                Amount must be a number
                            </span>
                        )}
                    </div>

                    <div>
                        <label className="label mb-2">Due date</label>
                        <InputDatePicker control={control} errors={errors} />
                    </div>

                    <div>
                        <label className="label">Category</label>
                        <div className="flex gap-2 justify-center align-center">
                            <div className="relative w-11/12">
                                <select
                                    className="block w-full border-b bg-white text-gray-700 py-3 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-state"
                                    {...register("category", {
                                        valueAsNumber: true,
                                    })}
                                >
                                    {items.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.title}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDownIcon className="h-4 w-4 pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700" />
                            </div>
                            <div
                                className="cursor-pointer"
                                onClick={() => setCreateCategory(true)}
                            >
                                <PlusCircleIcon className="w-7 pointer-events-none text-gray-500" />
                            </div>
                        </div>
                    </div>
                </form>
                <CreateCategory
                    display={createCategory}
                    setDisplay={setCreateCategory}
                />
            </div>
        </>
    );
}

export default Transaction;
