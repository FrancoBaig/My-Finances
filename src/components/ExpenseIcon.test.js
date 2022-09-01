import { render, screen } from "@testing-library/react";

import ExpenseIcon from "./ExpenseIcon";

describe("<ExpenseIcon>", () => {
    it("renders icon properly", () => {
        render(<ExpenseIcon />);
        const icon = screen.getByTitle(/expense icon/i);
        expect(icon).toBeInTheDocument();
    });
});
