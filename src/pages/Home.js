import React, { useState } from "react";

// Components
import AddTransactionButton from "../components/AddTransactionButton";
import Transaction from "../components/Transaction";
import TransactionList from "../components/TransactionList";

const transactions = {
    1: { id: 1, title: "Income", bg: "bg-green-600" },
    2: { id: 2, title: "Expense", bg: "bg-red-600" },
};

function Home() {
    const [openTransaction, setOpenTransaction] = useState(false);
    const [mode, setMode] = useState(1);

    return (
        <div className="relative">
            <TransactionList />
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
