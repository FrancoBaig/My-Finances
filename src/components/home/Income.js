import React, { useEffect } from "react";

// Components
import InputDatePicker from "./InputDatePicker";
import DropDown from "./DropDown";

// heruicons
import { SaveIcon } from "@heroicons/react/outline";
import { CurrencyDollarIcon } from "@heroicons/react/outline";
import { XIcon } from "@heroicons/react/solid";

// services
import { getCategoriesService } from "../../services/categoriesAPI";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { createCategories } from "../../redux/states/categoriesState";

function Income({ setModal }) {
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);

    useEffect(() => {
        const getCategories = async (userId, token) => {
            const result = await getCategoriesService(userId, token);
            dispatch(createCategories(result.data));
        };
        getCategories(user.id, user.token);
    }, [dispatch, user]);

    return (
        <div>
            <div className="w-full h-10 px-2 text-white bg-green-600 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <button onClick={() => setModal(false)}>
                        <XIcon className="h-6 w-6" />
                    </button>
                    <span>Income</span>
                </div>
                <SaveIcon className="w-6" />
            </div>
            <form className="grid gap-6 px-3 pt-4">
                <input
                    type="text"
                    placeholder="Description..."
                    className="input-transaction"
                />
                <div className="relative">
                    <CurrencyDollarIcon class="h-6 w-6 absolute text-gray-400" />
                    <input
                        type="number"
                        className="input-transaction w-6/12 pl-7"
                    />
                </div>
                <InputDatePicker />
                <DropDown />
            </form>
        </div>
    );
}

export default Income;
