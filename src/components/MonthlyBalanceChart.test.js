import { screen } from "@testing-library/react";
import { renderWithProviders } from "../utils/test-utils";
import userEvent from "@testing-library/user-event";
import MonthlyBalanceChart from "./MonthlyBalanceChart";

describe("<MonthlyOverview />", () => {
    it("renders initial state", async () => {
        renderWithProviders(<MonthlyBalanceChart />);

        const balance = screen.getByText("$0");
        expect(balance).toBeInTheDocument();

        const initial = screen.getByText("Initial $0");
        expect(initial).toBeInTheDocument();
    });

    it("renders balance and initial properly", async () => {
        const initialCategories = {
            initial: 100,
            incomes: [
                { id: 1, title: "inc1", color: "#75eeff", value: 500 },
                { id: 2, title: "inc2", color: "#75eeff", value: 600 },
            ],
            expenses: [
                { id: 3, title: "exp1", color: "#75eeff", value: -200 },
                { id: 4, title: "exp2", color: "#75eeff", value: -300 },
            ],
        };

        const initialDate = {
            month: "09",
            year: "2022",
        };

        renderWithProviders(<MonthlyBalanceChart />, {
            preloadedState: {
                categories: initialCategories,
                date: initialDate,
            },
        });

        const balance = screen.getByText("$700");
        expect(balance).toBeInTheDocument();

        const initial = screen.getByText("Initial $100");
        expect(initial).toBeInTheDocument();

        const date = screen.getByText("September");
        expect(date).toBeInTheDocument();
    });

    it("changes to the previous month when the left button is clicked", async () => {
        const initialDate = {
            month: "09",
            year: "2022",
        };

        renderWithProviders(<MonthlyBalanceChart />, {
            preloadedState: {
                date: initialDate,
            },
        });

        const date = screen.getByText("September");
        expect(date).toBeInTheDocument();

        const leftButton = screen.getByTestId("toggle-month-left");

        await userEvent.click(leftButton);
        expect(date).toHaveTextContent("August");

        await userEvent.click(leftButton);
        expect(date).toHaveTextContent("July");
    });

    it("changes to the next month when the right button is clicked", async () => {
        const initialDate = {
            month: "09",
            year: "2022",
        };

        renderWithProviders(<MonthlyBalanceChart />, {
            preloadedState: {
                date: initialDate,
            },
        });

        const date = screen.getByText("September");
        expect(date).toBeInTheDocument();

        const rightButton = screen.getByTestId("toggle-month-right");

        await userEvent.click(rightButton);
        expect(date).toHaveTextContent("October");

        await userEvent.click(rightButton);
        expect(date).toHaveTextContent("November");
    });
});
