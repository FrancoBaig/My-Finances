import React, { useState, useEffect } from "react";

// Components
import InputDatePicker from "./InputDatePicker";
import DropDown from "./DropDown";

// heruicons
import { CurrencyDollarIcon } from "@heroicons/react/outline";
import { XIcon } from "@heroicons/react/solid";

// services
import { getCategoriesService } from "../../services/categoriesAPI";
import { postTransactionService } from "../../services/transactionsAPI";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { createCategories } from "../../redux/states/categoriesState";

// Moment
import moment from "moment";

function Income({ setModal }) {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const [description, setDescription] = useState("");
    const [categoryId, setCategoryId] = useState(null);
    const [amount, setAmount] = useState(0);
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const getCategories = async (token) => {
            const result = await getCategoriesService(token);
            dispatch(createCategories(result.data));
        };
        getCategories(user.token);
    }, [dispatch, user]);

    const handleSubmitTransaction = async (e) => {
        e.preventDefault();

        const data = {
            description,
            categoryId,
            amount: parseInt(amount),
            date: moment(date).format("YYYY-MM-DD HH:mm:ss"),
        };

        postTransactionService(data, user.token);
        setModal(false);
    };

    return (
        <div>
            <div className="w-full h-10 px-2 text-white bg-green-600 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <button onClick={() => setModal(false)}>
                        <XIcon className="h-4 w-4" />
                    </button>
                    <span>Income</span>
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
                onSubmit={handleSubmitTransaction}
                className="grid gap-6 px-3 pt-4"
                id="transaction-form"
            >
                <input
                    type="text"
                    placeholder="Description..."
                    className="input-transaction"
                    onChange={({ target }) => setDescription(target.value)}
                />
                <div className="relative">
                    <CurrencyDollarIcon className="h-6 w-6 absolute text-gray-400" />
                    <input
                        type="number"
                        className="input-transaction w-6/12 pl-7"
                        onChange={({ target }) => setAmount(target.value)}
                    />
                </div>
                <InputDatePicker date={date} setDate={setDate} />
                <DropDown
                    categoryId={categoryId}
                    setCategoryId={setCategoryId}
                />
            </form>
        </div>
    );
}

export default Income;
