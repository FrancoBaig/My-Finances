import React from "react";

// Redux
import { useSelector } from "react-redux";

// React minimal pie chart
import { PieChart } from "react-minimal-pie-chart";

// moment
import moment from "moment";

const Label = ({ tag }) => {
    return (
        <div className="flex gap-2 items-center">
            <div
                className="w-4 h-4 rounded-full"
                style={{
                    backgroundColor: tag.color,
                }}
            ></div>
            <p className="text-sm">
                {tag.title} ({tag.value})
            </p>
        </div>
    );
};

function CategoriesChart({ title, isIncome = true }) {
    const categories = useSelector((state) => {
        if (isIncome) {
            return state.categories.incomes;
        } else {
            return state.categories.expenses;
        }
    });

    const date = useSelector((state) =>
        moment()
            .month(state.date.month - 1)
            .format("MMMM")
    );

    return (
        <div>
            <div className="paper px-8 py-4 lg:max-h-96">
                <h3 className="font-semibold pb-4">
                    {title} in {date}
                </h3>
                <div className="lg:h-48">
                    <PieChart data={categories} background="#f9fafb" />
                </div>
                <div className="pt-4 flex flex-wrap gap-2">
                    {categories.map((tag, index) => (
                        <Label tag={tag} key={index} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CategoriesChart;
