import React, { useState, useEffect } from "react";

// Components
import AddTransactionButton from "../components/AddTransactionButton";
import TransactionList from "../components/TransactionList";
import Transaction from "../components/Transaction";

// Redux
import { useDispatch } from "react-redux";
import { setDate } from "../redux/states/dateState";

const transactions = {
    1: { id: 1, title: "Income", bg: "bg-green-600" },
    2: { id: 2, title: "Expense", bg: "bg-red-600" },
};

function Home() {
    const [openTransaction, setOpenTransaction] = useState(false);
    const [mode, setMode] = useState(1);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setDate(Date.now()));
    }, []);

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
