import { render, screen } from "@testing-library/react";

import IncomeIcon from "./IncomeIcon";

describe("<IncomeIcon>", () => {
    it("renders icon properly", () => {
        render(<IncomeIcon />);
        const icon = screen.getByTitle(/income icon/i);
        expect(icon).toBeInTheDocument();
    });
});
