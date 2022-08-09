import React, { useState } from "react";

// Components
import AddTransactionButton from "../components/home/AddTransactionButton";
import Income from "../components/home/Income";

function Home() {
    const [openIncome, setOpenIncome] = useState(false);

    console.log(openIncome);

    return (
        <div>
            {openIncome ? (
                <Income setModal={setOpenIncome} />
            ) : (
                <AddTransactionButton setOpenIncome={setOpenIncome} />
            )}
        </div>
    );
}

export default Home;
