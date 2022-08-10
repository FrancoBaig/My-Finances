import React, { useState } from "react";

// Components
import AddTransactionButton from "../components/home/AddTransactionButton";
import Transaction from "../components/home/Transaction";

const transactions = {
    1: { id: 1, title: "Income", bg: "bg-green-600" },
    2: { id: 2, title: "Expense", bg: "bg-red-600" },
};

function Home() {
    const [openTransaction, setOpenTransaction] = useState(false);
    const [mode, setMode] = useState(1);

    return (
        <div>
            {openTransaction ? (
                <Transaction
                    setModal={setOpenTransaction}
                    mode={transactions[mode]}
                />
            ) : (
                <AddTransactionButton
                    setOpenTransaction={setOpenTransaction}
                    setMode={setMode}
                />
            )}
        </div>
    );
}

export default Home;
