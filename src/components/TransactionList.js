import React, { useState, useEffect } from "react";

// Redux
import { getTransactions } from "../redux/states/transactionsState";
import { useDispatch, useSelector } from "react-redux";

// helper
import { classNames } from "../helper/classNames";

// moment
import moment from "moment";

// icons
import { ExternalLinkIcon } from "@heroicons/react/solid";
import { XIcon } from "@heroicons/react/solid";

const TransactionItem = ({ data }) => {
    const newDate = moment(data.date).format("DD-MM-YYYY");
    return (
        <div>
            <div className="flex justify-between items-center">
                <p>{data.description}</p>
                <div className="grid gap-0 items-end">
                    <p
                        className={classNames(
                            "font-semibold justify-self-end",
                            data.amount < 0 ? "text-red-500" : "text-green-500"
                        )}
                    >
                        $ {data.amount}
                    </p>
                    <span className="text-xs text-gray-500">{newDate}</span>
                </div>
            </div>
            <div className="h-px bg-gray-100 w-full mt-1"></div>
        </div>
    );
};

const options = [
    { id: "ALL", title: "All" },
    { id: "INCOMES", title: "Incomes" },
    { id: "EXPENSES", title: "Expenses" },
];

function TransactionList() {
    const dispatch = useDispatch();
    const [filter, setFilter] = useState("ALL");
    const [isFullPage, setIsFullPage] = useState(false);
    const transactions = useSelector((state) => {
        if (!isFullPage) return state.transactions;

        if (filter === "ALL") {
            return state.transactions;
        } else if (filter === "INCOMES") {
            return state.transactions.filter((el) => el.amount > 0);
        } else {
            return state.transactions.filter((el) => el.amount < 0);
        }
    });

    useEffect(() => {
        if (isFullPage) {
            dispatch(getTransactions());
        } else {
            setFilter("ALL");
            dispatch(getTransactions(10));
        }
    }, [dispatch, isFullPage]);

    return (
        <>
            <div
                className={classNames(
                    "backdrop",
                    isFullPage ? "visible" : "hidden"
                )}
                onClick={() => {
                    setIsFullPage(false);
                }}
            ></div>
            <div
                className={classNames(
                    "paper px-8 py-4 row-span-2 md:h-full lg:pb-14",
                    isFullPage
                        ? "absolute top-0 right-0 w-full rounded-none z-30 bg-white md:w-2/4 md:right-2/4 md:translate-x-2/4 md:mt-2 md:rounded-lg"
                        : ""
                )}
            >
                <div className="flex justify-between items-center pb-4">
                    <h3 className="font-semibold">Latest transactions</h3>
                    {isFullPage ? (
                        <div className="flex gap-5">
                            <select
                                className="rounded bg-gray-200 p-1"
                                onChange={({ target }) =>
                                    setFilter(target.value)
                                }
                            >
                                {options.map((opt) => (
                                    <option value={opt.id} key={opt.id}>
                                        {opt.title}
                                    </option>
                                ))}
                            </select>
                            <XIcon
                                className="w-6 cursor-pointer"
                                onClick={() => {
                                    setIsFullPage(false);
                                }}
                            />
                        </div>
                    ) : (
                        <ExternalLinkIcon
                            className="w-6 cursor-pointer"
                            onClick={() => {
                                setIsFullPage(true);
                            }}
                        />
                    )}
                </div>
                <div className="grid gap-2">
                    {transactions.map((tran) => (
                        <TransactionItem key={tran.id} data={tran} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default TransactionList;
