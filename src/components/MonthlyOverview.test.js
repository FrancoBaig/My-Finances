import { screen } from "@testing-library/react";
import { renderWithProviders } from "../utils/test-utils";
import MonthlyOverview from "./MonthlyOverview";

describe("<MonthlyOverview />", () => {
    it("renders initial state", async () => {
        renderWithProviders(<MonthlyOverview />);
        const zeros = screen.getAllByText("$0");
        expect(zeros).toHaveLength(3);
    });

    it("renders incomes, expenses and balance properly", async () => {
        const initialCategories = {
            incomes: [
                { id: 1, title: "inc1", color: "#75eeff", value: 500 },
                { id: 2, title: "inc2", color: "#75eeff", value: 600 },
            ],
            expenses: [
                { id: 3, title: "exp1", color: "#75eeff", value: -200 },
                { id: 4, title: "exp2", color: "#75eeff", value: -300 },
            ],
        };

        renderWithProviders(<MonthlyOverview />, {
            preloadedState: { categories: initialCategories },
        });

        const incomes = screen.getByText("$1100");
        const expense = screen.getByText("$-500");
        const balance = screen.getByText("$600");

        expect(incomes).toBeInTheDocument();
        expect(expense).toBeInTheDocument();
        expect(balance).toBeInTheDocument();
    });
});
