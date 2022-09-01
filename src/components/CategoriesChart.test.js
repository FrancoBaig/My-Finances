import { screen } from "@testing-library/react";
import { renderWithProviders } from "../utils/test-utils";
import CategoriesChart from "./CategoriesChart";

describe("<CategoriesChart />", () => {
    it("renders the chart", async () => {
        const initialCategories = {
            incomes: [
                { id: 1, title: "income1", color: "#75eeff", value: 500 },
                { id: 2, title: "income2", color: "#75eeff", value: 600 },
            ],
        };

        renderWithProviders(
            <CategoriesChart title="Incomes" isIncome={true} />,
            { preloadedState: { categories: initialCategories } }
        );

        const firstCategory = screen.getByText("income1", {
            selector: "title",
        });
        const secondCategory = screen.getByText("income2", {
            selector: "title",
        });

        expect(firstCategory).toBeInTheDocument();
        expect(secondCategory).toBeInTheDocument();
    });

    it("renders the labels", () => {
        const initialCategories = {
            incomes: [
                { id: 1, title: "income1", color: "#75eeff", value: 500 },
                { id: 2, title: "income2", color: "#75eeff", value: 600 },
            ],
        };

        renderWithProviders(
            <CategoriesChart title="Incomes" isIncome={true} />,
            { preloadedState: { categories: initialCategories } }
        );

        const firstLabel = screen.getByText("income1 (500)");
        const secondLabel = screen.getByText("income2 (600)");

        expect(firstLabel).toBeInTheDocument();
        expect(secondLabel).toBeInTheDocument();
    });
});
