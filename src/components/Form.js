import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { createParticipant } from '../actions'
import history from '../history';

const Form = (props) => {

    const [form, setForm] = useState({
        name: '',
        contactNumber: '',
        address: '',
        supplyDate: '',
        paymentDate: '',
        profession: '',
        debtAmount: '',
        advanceAmount: '',
        locality: '',
        itemPurchased: '',
        totalAmount: '',
    });

    useEffect(() => {
        // window.history.pushState({ name: "browserBack" }, "on browser back click", window.location.href);
        // window.addEventListener('popstate', () => {
        //     setTimeout(() => {
        //         alert("Are you sure you want to leave, you will lose your data if you continue!");
        //     }, 500)
        // });
    }, [])

    const postParticipant = () => {
        console.log(form)
        props.createParticipant(form);
    }

    const handleChange = event => {
        event.preventDefault();
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = event => {
        event.preventDefault();
        postParticipant();
        setForm({
            name: '',
            contactNumber: '',
            address: '',
            supplyDate: '',
            paymentDate: '',
            profession: '',
            debtAmount: '',
            advanceAmount: '',
            locality: '',
            itemPurchased: '',
            totalAmount: ''
        })
        history.push("/search");
    }

    return (
        <div className="container mt-5 mb-5" style={{ fontSize: "18px" }}>
            <h3 className="mb-4" style={{ textAlign: "center" }}>Debtors Details Form</h3>
            <div className="card card-body py-4">
                <h5 className="mt-3">Please fill the debtors details below</h5>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mt-4">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            placeholder="Name"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mobile">Mobile Number</label>
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Mobile Number"
                            name="contactNumber"
                            value={form.mobile}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <textarea
                            className="form-control"
                            placeholder="Address"
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="supplyDate">Supply Date</label>
                        <input
                            type="date"
                            className="form-control"
                            placeholder="Supply Date"
                            name="supplyDate"
                            value={form.supplyDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="paymentDate">Payment Date</label>
                        <input
                            type="date"
                            className="form-control"
                            placeholder="Payment Date"
                            name="paymentDate"
                            value={form.paymentDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Profession</label>
                        <select
                            className="form-control"
                            name="profession"
                            value={form.profession}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled >Profession</option>
                            <option value='Contractor'>Contractor</option>
                            <option value='Painter'>Painter</option>
                            <option value='Plumber'>Plumber</option>
                            <option value='Carpenter'>Carpenter</option>
                            <option value='Farmer'>Farmer</option>
                            <option value='Shopkeeper'>Shopkeeper</option>
                            <option value='General'>General</option>

                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="amount">Debt Amount</label>
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Debt Amount"
                            name="debtAmount"
                            value={form.debtAmount = form.totalAmount - form.advanceAmount}
                            onChange={handleChange}
                            required
                            disabled
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="amount">Advance Amount</label>
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Advance Amount"
                            name="advanceAmount"
                            value={form.advanceAmount}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="locality">Locality</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Locality"
                            name="locality"
                            value={form.locality}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Item Purchased</label>
                        <textarea
                            className="form-control"
                            placeholder="Item Purchased"
                            name="itemPurchased"
                            value={form.itemPurchased}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Total Bill Amount</label>
                        <textarea
                            className="form-control"
                            placeholder="Total Bill Amount"
                            name="totalAmount"
                            value={form.totalAmount}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                    <input type="submit" className="btn btn-danger btn-block" />
                </form>
            </div>
        </div >
    )
}

export default connect(null, { createParticipant })(Form)
