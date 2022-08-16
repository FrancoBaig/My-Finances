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

function TransactionList() {
    const dispatch = useDispatch();
    const transactions = useSelector((state) => state.transactions);
    const [isFullPage, setIsFullPage] = useState(false);

    useEffect(() => {
        if (isFullPage) {
            dispatch(getTransactions());
        } else {
            dispatch(getTransactions(10));
        }
    }, [dispatch, isFullPage]);

    return (
        <div
            className={classNames(
                "paper px-8 py-4 row-span-2 md:h-auto lg:pb-14",
                isFullPage
                    ? "absolute top-0 right-0 w-full rounded-none z-30 bg-white"
                    : ""
            )}
        >
            <div className="flex justify-between items-center pb-4">
                <h3 className="font-semibold">Latest transactions</h3>
                {isFullPage ? (
                    <XIcon
                        className="w-6 cursor-pointer"
                        onClick={() => {
                            setIsFullPage(false);
                        }}
                    />
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
    );
}

export default TransactionList;
