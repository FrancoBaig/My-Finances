import React from "react";

// Redux
import { useSelector } from "react-redux";

// React minimal pie chart
import { PieChart } from "react-minimal-pie-chart";

function MonthlyBalanceChart() {
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

    return (
        <div className="paper px-8 py-4 relative">
            <span className="font-semibold text-3xl text-[#333333] absolute top-2/4 right-2/4 -translate-y-2/4 translate-x-2/4">
                ${balance[0].value - balance[1].value}
            </span>
            <div className="p-3">
                <PieChart data={balance} lineWidth={15} rounded animate />
            </div>
        </div>
    );
}

export default MonthlyBalanceChart;
