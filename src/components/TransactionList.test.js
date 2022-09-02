import { screen } from "@testing-library/react";
import { renderWithProviders } from "../utils/test-utils";
import userEvent from "@testing-library/user-event";
import TransactionList from "./TransactionList";

describe("<TransactionList />", () => {
    it("renders initial transactions", async () => {
        const initialDate = {
            month: "09",
            year: "2022",
        };

        renderWithProviders(<TransactionList />, {
            preloadedState: {
                date: initialDate,
            },
        });

        const firstTransaction = await screen.findByText("transaction1");
        const secondTransaction = await screen.findByText("transaction2");

        expect(firstTransaction).toBeInTheDocument();
        expect(secondTransaction).toBeInTheDocument();
    });

    it("renders full page when button is clicked", async () => {
        const initialDate = {
            month: "09",
            year: "2022",
        };

        renderWithProviders(<TransactionList />, {
            preloadedState: {
                date: initialDate,
            },
        });

        const openFullPageButton = await screen.findByTestId("open-fullpage");
        await userEvent.click(openFullPageButton);

        // renders transactions
        const firstTransaction = await screen.findByText("transaction1");
        const secondTransaction = await screen.findByText("transaction2");

        expect(firstTransaction).toBeInTheDocument();
        expect(secondTransaction).toBeInTheDocument();
    });

    it("filters transactions properly by selection", async () => {
        const initialDate = {
            month: "09",
            year: "2022",
        };

        renderWithProviders(<TransactionList />, {
            preloadedState: {
                date: initialDate,
            },
        });

        const openFullPageButton = await screen.findByTestId("open-fullpage");
        await userEvent.click(openFullPageButton);

        const options = screen.getByRole("combobox");
        await userEvent.selectOptions(options, "Incomes");

        const incomeTransaction = screen.queryByText("transaction1");
        const expenseTransaction = screen.queryByText("transaction2");

        expect(incomeTransaction).toBeInTheDocument();
        expect(expenseTransaction).not.toBeInTheDocument();

        await userEvent.selectOptions(options, "Expenses");

        const incomeTransactionExp = screen.queryByText("transaction1");
        const expenseTransactionExp = screen.queryByText("transaction2");

        expect(incomeTransactionExp).not.toBeInTheDocument();
        expect(expenseTransactionExp).toBeInTheDocument();

        await userEvent.selectOptions(options, "All");

        const incomeTransactionAll = screen.getByText("transaction1");
        const expenseTransactionAll = screen.getByText("transaction2");

        expect(incomeTransactionAll).toBeInTheDocument();
        expect(expenseTransactionAll).toBeInTheDocument();
    });
});
