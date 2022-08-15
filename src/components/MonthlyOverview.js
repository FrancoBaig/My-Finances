import React from "react";

// Redux
import { useSelector } from "react-redux";

// Components
import IncomeIcon from "./IncomeIcon";
import ExpenseIcon from "./ExpenseIcon";

// Icons
import { TrendingUpIcon } from "@heroicons/react/solid";
import { TrendingDownIcon } from "@heroicons/react/solid";

const BalanceIcon = ({ isUp }) => {
    return (
        <div className="w-6 h-6 bg-primary rounded-full flex justify-center items-center">
            {isUp ? (
                <TrendingUpIcon className="w-4 text-white" />
            ) : (
                <TrendingDownIcon className="w-4 text-white" />
            )}
        </div>
    );
};

const IconItem = ({ children, title, value }) => {
    return (
        <div className="flex justify-between py-2">
            <div className="flex gap-2">
                {children}
                <span>{title}</span>
            </div>
            <span className="">${value}</span>
        </div>
    );
};

function MonthlyOverview() {
    const values = useSelector((state) => {
        const incomes = state.categories.incomes.reduce(
            (prev, curr) => (prev += curr.value),
            0
        );
        const expenses = state.categories.expenses.reduce(
            (prev, curr) => (prev += curr.value),
            0
        );

        return {
            incomes: incomes,
            expenses: expenses,
            balance: incomes - expenses,
        };
    });

    return (
        <div className="paper px-8 py-4">
            <h3 className="font-semibold pb-1">Monthly Overview</h3>
            <IconItem title="Incomes" value={values.incomes}>
                <IncomeIcon />
            </IconItem>
            <IconItem title="Expenses" value={values.expenses}>
                <ExpenseIcon />
            </IconItem>
            <div className="w-full h-px bg-gray-200 my-1"></div>
            <IconItem title="Balance" value={values.balance}>
                <BalanceIcon isUp={values.balance >= 0} />
            </IconItem>
        </div>
    );
}

export default MonthlyOverview;
