import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import IconButton from "./IconButton";
import IncomeIcon from "./IncomeIcon";

describe("<IconButton />", () => {
    it("renders icon", () => {
        render(<IconButton Icon={<IncomeIcon />} text="Income" />);

        const title = screen.getByTitle("income icon");
        expect(title).toBeInTheDocument();

        const text = screen.getByText("Income");
        expect(text).toBeInTheDocument();
    });

    it("onClick is called once when the button is clicked", async () => {
        const onClick = jest.fn();
        render(
            <IconButton Icon={<IncomeIcon />} text="Income" onClick={onClick} />
        );

        const button = screen.getByRole("button");
        await userEvent.click(button);

        expect(onClick).toHaveBeenCalledTimes(1);
    });
});
