import React from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { increaseMonth, decreaseMonth } from "../redux/states/dateState";

// React minimal pie chart
import { PieChart } from "react-minimal-pie-chart";

// Icons
import { ChevronLeftIcon } from "@heroicons/react/outline";
import { ChevronRightIcon } from "@heroicons/react/outline";

// moment
import moment from "moment";

const ToggleMonths = ({ title }) => {
    const dispatch = useDispatch();

    return (
        <div className="flex gap-4 justify-center">
            <ChevronLeftIcon
                className="w-5 cursor-pointer"
                onClick={() => dispatch(decreaseMonth())}
            />
            <span className="font-semibold pb-px">{title}</span>
            <ChevronRightIcon
                className="w-5 cursor-pointer"
                onClick={() => dispatch(increaseMonth())}
            />
        </div>
    );
};

function MonthlyBalanceChart() {
    const initial = useSelector((state) => state.categories.initial);
    const balance = useSelector((state) => {
        const categories = state.categories;
        const expenses =
            -1 *
            categories.expenses.reduce((prev, curr) => (prev += curr.value), 0);

        const incomes = categories.incomes.reduce(
            (prev, curr) => (prev += curr.value),
            0
        );

        const base = [
            { title: "Incomes", value: incomes, color: "#FBAB4D" },
            { title: "Expenses", value: expenses, color: "#E9231A" },
        ];

        if (incomes - expenses < 0) {
            return base;
        }

        return [
            ...base,
            { title: "Balance", value: incomes - expenses, color: "#344154" },
        ];
    });

    const month = useSelector((state) =>
        moment()
            .month(state.date.month - 1)
            .format("MMMM")
    );

    return (
        <div className="paper px-8 py-4 relative">
            <ToggleMonths title={month} />
            <div className="grid gap-1 justify-center content-center items-center absolute top-2/4 right-2/4 -translate-y-2/4 translate-x-2/4 pt-5 md:-translate-y-3/4 md:mt-2">
                <span className="font-semibold text-3xl text-[#333333] ">
                    ${initial + (balance[0].value - balance[1].value)}
                </span>
                <span className="font-semibold text-xs text-gray-500 text-center">
                    Initial ${initial || 0}
                </span>
            </div>
            <div className="p-3">
                <PieChart data={balance} lineWidth={15} rounded animate />
            </div>
        </div>
    );
}

export default MonthlyBalanceChart;
