import { rest } from "msw";

export const handlers = [
    rest.post("http://localhost:3001/api/categories", (req, res, ctx) => {
        return res(ctx.json({ id: 11 }));
    }),

    rest.get(
        "http://localhost:3001/api/categories/2022/09",
        (req, res, ctx) => {
            return res(
                ctx.json({
                    status: "ok",
                    data: {
                        initial: null,
                        incomes: [
                            {
                                id: 54,
                                title: "dsa",
                                color: "#75eeff",
                                value: 0,
                            },
                        ],
                        expenses: [
                            {
                                id: 55,
                                title: "dsa",
                                color: "#a5c2f7",
                                value: 0,
                            },
                        ],
                    },
                })
            );
        }
    ),

    rest.get("http://localhost:3001/api/transaction", (req, res, ctx) => {
        return res(
            ctx.json([
                {
                    id: 88,
                    description: "transaction2",
                    amount: -500,
                    date: "2022-09-08T03:00:00.000Z",
                    category_id: 55,
                    user_id: 32,
                },
                {
                    id: 87,
                    description: "transaction1",
                    amount: 100,
                    date: "2022-09-06T03:00:00.000Z",
                    category_id: 54,
                    user_id: 32,
                },
            ])
        );
    }),
];
