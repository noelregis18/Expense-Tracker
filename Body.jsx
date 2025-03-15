import React from 'react'
import "./Body.css";
import { MdDelete } from "react-icons/md";
import { AiTwotoneEdit } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { InputLabel, TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Analytics from './Analytics';

const Body = () => {
    const [paramsId, setParamsId] = useState("");
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [category, setCategory] = useState('all');
    // by date
    const [byDate, setByDate] = useState('default');

    const handleClose = () => {
        setOpen(false);
    };
    const handleClose1 = () => {
        setOpen1(false);
    };
    const [budget, setBudget] = useState({
        amount: "",
        date: "",
        category: "",
        description: "",
        id: ""

    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setBudget({ ...budget, [name]: value, });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/api/v1/transection", budget)
            window.location.reload(false);
        } catch (error) {
            console.log(error);
        }
        setBudget({
            amount: "",
            date: "",
            category: "",
            description: "",
        })
        handleClose();
    }

    useEffect(() => {
        const getAllTransactions = async () => {
            try {
                const res = await axios.post("http://localhost:8080/api/v1/gettransection", { category, byDate });
                setTransactions(res.data.transection);
            } catch (error) {
                console.log(error);
            }
        };
        getAllTransactions();

    }, [category, byDate])

    const deleteTransaction = async (_id) => {
        try {
            await axios.delete(`http://localhost:8080/api/v1/deletetransection/${_id}`)
            window.location.reload(false);
        } catch (error) {
            console.log(error);
        }
    }

    const editHandle = (amount, date, description, category, _id) => {
        setParamsId(_id);
        setBudget({
            amount,
            date,
            description,
            category,
            id: _id
        })
        setOpen1(true);
    }

    const handleSubmit1 = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/api/v1/updatetransection/${paramsId}`, budget)
            window.location.reload(false);
        } catch (error) {
            alert("error")
            console.log(error);
        }
        handleClose1();
    }


    return (
        <div className='body'>
            <Analytics setBudget={setBudget} transactions={transactions} setOpen={setOpen} />
            <div style={{ width: "40%" }}>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    boxShadow: "rgba(33, 35, 38, 0.1) 0px 10px 10px -10px",
                    paddingBottom: "2rem",
                }}>
                    <h2>TRANSACTIONS</h2>
                    <div>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 150 }}>
                            <InputLabel id="demo-simple-select-standard-label">Category</InputLabel>
                            <Select
                                style={{ marginRight: "2rem" }}
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                name="category"
                                value={category}
                                onChange={(e) => { setCategory(e.target.value) }}
                                label="Category"
                                required
                            >
                                <MenuItem value={"all"}>All</MenuItem>
                                <MenuItem value={"saving"}>Saving</MenuItem>
                                <MenuItem value={"expense"}>Expense</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 150 }}>
                            <InputLabel id="demo-simple-select-standard-label">By Date</InputLabel>
                            <Select
                                style={{ marginRight: "2rem" }}
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                name="byDate"
                                value={byDate}
                                onChange={(e) => { setByDate(e.target.value) }}
                                label="byDate"
                                required
                            >
                                <MenuItem value={"default"}>Default</MenuItem>
                                <MenuItem value={"7"}>1 Week Ago</MenuItem>
                                <MenuItem value={"30"}>1 Month Ago</MenuItem>
                                <MenuItem value={"365"}>1 Year Ago</MenuItem>
                            </Select>
                        </FormControl>

                    </div>

                </div>
                <div className="history" id='style-1'>
                    {
                        transactions.map((item) => {
                            const { amount, date, description, category, _id } = item;
                            const splitDate = date.split("T")
                            return (
                                <div className="history-in-col">
                                    <div className='transacions-items'>
                                        <div className="description">
                                            <p>{description}</p>
                                            <div className="icons">
                                                <MdDelete onClick={() => deleteTransaction(_id)}
                                                    style={{
                                                        fontSize: "20px",
                                                        color: "red",
                                                        cursor: "pointer",
                                                         
                                                    }} />
                                                <AiTwotoneEdit onClick={() => editHandle(amount, date, description, category, _id)} style={{ fontSize: "20px", marginLeft: "0.5rem", color: "orange", cursor: "pointer" }} />
                                            </div>
                                        </div>
                                        <div className="description">
                                            {
                                                category === "expense"
                                                    ? <h2 style={{ color: "red" }}>{`$${amount}`}</h2>
                                                    : <h2>{`$${amount}`}</h2>
                                            }
                                            <p>{splitDate[0]}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            {/* Adding Dialog using MUI */}

            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}>
                        <DialogTitle id="alert-dialog-title">
                            {"ADD TRANSACTIONS"}
                        </DialogTitle>
                        <DialogActions>
                            <RxCross1 onClick={handleClose} style={{ marginRight: "1rem", cursor: "pointer" }} />
                        </DialogActions>
                    </div>

                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <form action="" onSubmit={handleSubmit}>
                                <FormControl
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        height: "100%",
                                        justifyContent: "space-between"
                                    }}
                                    variant="standard"
                                    sx={{ m: 1, minWidth: 400, minHeight: 380 }}

                                >
                                    <TextField
                                        name="amount"
                                        value={budget.amount}
                                        onChange={handleChange}
                                        id="standard-basic"
                                        label="Amount"
                                        variant="standard"
                                        required
                                    />
                                    <TextField
                                        name="date"
                                        value={budget.date}
                                        onChange={handleChange}
                                        type="date"
                                        id="standard-basic"
                                        variant="standard"
                                        required
                                    />
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        name="category"
                                        value={budget.category}
                                        onChange={handleChange}
                                        label="Category"
                                        required
                                    >
                                        <MenuItem value={"saving"}>Saving</MenuItem>
                                        <MenuItem value={'expense'}>Expense</MenuItem>

                                    </Select>
                                    <TextField
                                        name="description"
                                        value={budget.description}
                                        onChange={handleChange}
                                        id="standard-basic"
                                        label="Description"
                                        variant="standard"
                                        required
                                    />
                                    <button style={{ marginTop: "3rem", width: "100%" }} type="submit" class="btn btn-dark">Save</button>

                                </FormControl>
                            </form>
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
                <Dialog
                    open={open1}
                    onClose={handleClose1}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}>
                        <DialogTitle id="alert-dialog-title">
                            {"UPDATE TRANSACTIONS"}
                        </DialogTitle>
                        <DialogActions>
                            <RxCross1 onClick={handleClose1} style={{ marginRight: "1rem", cursor: "pointer" }} />
                        </DialogActions>
                    </div>

                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <form action="" onSubmit={handleSubmit1}>
                                <FormControl
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        height: "100%",
                                        justifyContent: "space-between"
                                    }}
                                    variant="standard"
                                    sx={{ m: 1, minWidth: 400, minHeight: 380 }}

                                >
                                    <TextField
                                        name="amount"
                                        value={budget.amount}
                                        onChange={handleChange}
                                        id="standard-basic"
                                        label="Amount"
                                        variant="standard"

                                    />
                                    <TextField
                                        name="date"
                                        value={budget.date}
                                        onChange={handleChange}
                                        type="date"
                                        id="standard-basic"
                                        variant="standard"

                                    />
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        name="category"
                                        value={budget.category}
                                        onChange={handleChange}
                                        label="Category"

                                    >
                                        <MenuItem value={"saving"}>Saving</MenuItem>
                                        <MenuItem value={'expense'}>Expense</MenuItem>

                                    </Select>
                                    <TextField
                                        name="description"
                                        value={budget.description}
                                        onChange={handleChange}
                                        id="standard-basic"
                                        label="Description"
                                        variant="standard"
                                    />
                                    <button style={{ marginTop: "3rem", width: "100%" }} type="submit" class="btn btn-dark">Update</button>
                                </FormControl>
                            </form>
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}

export default Body