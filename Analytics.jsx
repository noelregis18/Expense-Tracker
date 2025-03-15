import React from 'react';
import "./Body.css";
import { IoMdAdd } from "react-icons/io";

const Analytics = ({setBudget, transactions, setOpen }) => {
    console.log(transactions);
    const handleClickOpen = () => {
        setBudget({
            amount: "",
            date: "",
            category: "",
            description: "",
        })
       setOpen(true);
    }
    const totalAmountLength = transactions.length;
    const totalSavings = transactions.filter(item => item.category === 'saving')
    const totalExpenses = transactions.filter(item => item.category === 'expense')
    const totalSavingsPercent = (totalSavings.length / totalAmountLength) * 100;
    const totalExpensesPercent = (totalExpenses.length / totalAmountLength) * 100;

    // total amount, expenses and savings
    const totalAmount = transactions
    .reduce((acc, item) => acc + item.amount, 0)

    //total Savings
    const totalSavingsAmount = transactions
    .filter(item => item.category === 'saving')
    .reduce((acc, item) => acc + item.amount, 0)
    //total Expense
    const totalExpensesAmount = transactions
    .filter(item => item.category === 'expense')
    .reduce((acc, item) => acc + item.amount, 0)
    return (
        <div className="create-expenses">
            <div class="left-sidebar">
                <div className="total-balance">
                    <p>Total Balance</p>
                    <h1>{`$${totalAmount}`}</h1>
                </div>
                <div className="income-and-expenses">
                    <div className="income">
                        <p>Income</p>
                        <h2>{`$${totalSavingsAmount}`}</h2>
                    </div>
                    <div className="expenses">
                        <p>Expenses</p>
                        <h2>{`$${totalExpensesAmount}`}</h2>
                    </div>
                </div>
            </div>
            <div className='expenses-and-savings-in-per'>
                <div className="expense-in-per">
                    <span>Expenses</span>
                    {
                        totalAmountLength === 0
                        ?<span style={{ fontWeight: "bold" }}>{`$0%`}</span>
                        :<span style={{ fontWeight: "bold" }}>{`${totalExpensesPercent.toFixed(0)}%`}</span>
                    }
                </div>
                <div className="expense-in-per">
                    <span>Savings</span>
                    {
                      totalAmountLength === 0
                      ?<span style={{ fontWeight: "bold" }}>{`$0%`}</span>
                      :<span style={{ fontWeight: "bold" }}>{`${totalSavingsPercent.toFixed(0)}%`}</span>
                    }
                </div>
            </div>

            <button onClick={handleClickOpen} style={{ marginTop: "4rem", width: "50%" }} type="button" class="btn btn-dark"><IoMdAdd style={{ fontSize: "25px" }} />New Budget</button>
        </div>
    )
}

export default Analytics