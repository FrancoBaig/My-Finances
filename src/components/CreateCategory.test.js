import { screen } from "@testing-library/react";
import { renderWithProviders } from "../utils/test-utils";
import userEvent from "@testing-library/user-event";
import Transaction from "./Transaction";

describe("<CreateCategory />", () => {
    it("create a new income category properly", async () => {
        renderWithProviders(<Transaction setModal={true} mode={{ id: 1 }} />);

        const addCategory = screen.getByTestId("add-category");
        await userEvent.click(addCategory);

        const inputName = screen.getByLabelText(/create category/i);
        expect(inputName).toBeInTheDocument();
        await userEvent.type(inputName, "New category 1");

        const options = screen.getByTestId("create-category-select");
        await userEvent.selectOptions(options, "Income");

        const option = screen.getByRole("option", { name: "Income" });
        expect(option.selected).toBe(true);

        const button = screen.getByRole("button", { name: /send/i });
        await userEvent.click(button);

        const allCategories = await screen.findByRole("combobox");
        expect(allCategories).toHaveTextContent("New category 1");
    });

    it("create a new expense category properly", async () => {
        renderWithProviders(<Transaction setModal={true} mode={{ id: 2 }} />);

        const addCategory = screen.getByTestId("add-category");
        await userEvent.click(addCategory);

        const inputName = screen.getByLabelText(/create category/i);
        expect(inputName).toBeInTheDocument();
        await userEvent.type(inputName, "New expense 1");

        const options = screen.getByTestId("create-category-select");
        await userEvent.selectOptions(options, "Expense");

        const option = screen.getByRole("option", { name: "Expense" });
        expect(option.selected).toBe(true);

        const button = screen.getByRole("button", { name: /send/i });
        await userEvent.click(button);

        const allCategories = await screen.findByRole("combobox");
        expect(allCategories).toHaveTextContent("New expense 1");
    });
});
