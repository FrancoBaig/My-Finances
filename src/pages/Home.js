import React, { useState, useEffect } from "react";

// Components
import AddTransactionButton from "../components/AddTransactionButton";
import TransactionList from "../components/TransactionList";
import CategoriesChart from "../components/CategoriesChart";
import Transaction from "../components/Transaction";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { setDate } from "../redux/states/dateState";
import { getCategories } from "../redux/states/categoriesState";

const transactions = {
    1: { id: 1, title: "Income", bg: "bg-green-600" },
    2: { id: 2, title: "Expense", bg: "bg-red-600" },
};

function Home() {
    const [openTransaction, setOpenTransaction] = useState(false);
    const [mode, setMode] = useState(1);
    const dispatch = useDispatch();
    const date = useSelector((state) => state.date);

    useEffect(() => {
        dispatch(setDate(Date.now()));
    }, [dispatch]);

    useEffect(() => {
        dispatch(getCategories(date.year, date.month));
    }, [dispatch, date]);

    return (
        <div className="relative grid gap-4">
            <TransactionList />
            <CategoriesChart title="Incomes" isIncome={true} />
            <CategoriesChart title="Expenses" isIncome={false} />
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
