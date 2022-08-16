import React, { useState, useEffect } from "react";

// Components
import AddTransactionButton from "../components/AddTransactionButton";
import TransactionList from "../components/TransactionList";
import CategoriesChart from "../components/CategoriesChart";
import MonthlyBalanceChart from "../components/MonthlyBalanceChart";
import MonthlyOverview from "../components/MonthlyOverview";
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
        <div className="relative my-0 mx-auto max-w-7xl grid gap-4 justify-center md:grid-cols-2 lg:grid-cols-3">
            <div className="grid gap-4">
                <MonthlyBalanceChart />
                <MonthlyOverview />
            </div>
            <div>
                <TransactionList />
            </div>
            <div className="grid gap-4 md:col-span-2 md:grid-cols-2 lg:grid-cols-1 lg:col-span-1 lg:row-span-2">
                <CategoriesChart title="Incomes" isIncome={true} />
                <CategoriesChart title="Expenses" isIncome={false} />
            </div>
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
