import { rest } from "msw";

export const handlers = [
    rest.post("http://localhost:3001/api/categories", (req, res, ctx) => {
        return res(ctx.json({ id: 11 }));
    }),
];
