import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddTransactionButton from "./AddTransactionButton";

describe("<AddTransactionButton />", () => {
    it("renders button", () => {
        render(<AddTransactionButton />);

        const addButton = screen.getByRole("button");

        expect(addButton).toBeInTheDocument();
    });

    it("renders modal when button is clicked", async () => {
        render(<AddTransactionButton />);

        const addButton = screen.getByRole("button");
        await userEvent.click(addButton);

        const incomeButton = screen.getByRole("button", { name: /income/i });
        const expenseButton = screen.getByRole("button", { name: /expense/i });

        expect(incomeButton).toBeInTheDocument();
        expect(expenseButton).toBeInTheDocument();
    });

    it("renders income modal when income button is clicked", async () => {
        const setOpenTransaction = jest.fn();
        const setMode = jest.fn();

        render(
            <AddTransactionButton
                setOpenTransaction={setOpenTransaction}
                setMode={setMode}
            />
        );

        const addButton = screen.getByRole("button");
        await userEvent.click(addButton);

        const incomeButton = screen.getByRole("button", { name: /income/i });
        await userEvent.click(incomeButton);

        expect(setMode).toHaveBeenCalledWith(1);
        expect(setOpenTransaction).toHaveBeenCalledWith(true);
    });

    it("renders expense modal when expense button is clicked", async () => {
        const setOpenTransaction = jest.fn();
        const setMode = jest.fn();

        render(
            <AddTransactionButton
                setOpenTransaction={setOpenTransaction}
                setMode={setMode}
            />
        );

        const addButton = screen.getByRole("button");
        await userEvent.click(addButton);

        const expenseButton = screen.getByRole("button", { name: /expense/i });
        await userEvent.click(expenseButton);

        expect(setMode).toHaveBeenCalledWith(2);
        expect(setOpenTransaction).toHaveBeenCalledWith(true);
    });
});
