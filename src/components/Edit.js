import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { connect } from 'react-redux';
import { fetchParticipant, updateParticipant } from '../actions'
import history from '../history'
import { Link, Redirect } from 'react-router-dom'
import moment from 'moment';


const Edit = ({ participants: { profile, loading }, fetchParticipant, updateParticipant, match }) => {

    const [formData, setFormData] = useState({
        name: '',
        contactNumber: '',
        address: '',
        midPaymentDate: '',
        paymentDate: '',
        profession: '',
        debtAmount: '',
        advanceAmount: '',
        locality: '',
        itemPurchased: '',
        totalAmount: ''
    });

    useEffect(() => {

        if (!profile) {
            fetchParticipant(match.params.id);
        }

        setFormData({
            _id: loading || !profile ? '' : profile._id,
            name: loading || !profile ? '' : profile.name,
            contactNumber: loading || !profile ? '' : profile.contactNumber,
            address: loading || !profile ? '' : profile.address,
            midPaymentDate: loading || !profile ? '' : profile.midPaymentDate,
            paymentDate: loading || !profile ? '' : profile.paymentDate,
            profession: loading || !profile ? '' : profile.profession,
            debtAmount: loading || !profile ? '' : profile.debtAmount,
            advanceAmount: loading || '',
            locality: loading || !profile ? '' : profile.locality,
            itemPurchased: loading || !profile ? '' : profile.itemPurchased,
            totalAmount: loading || !profile ? '' : profile.totalAmount,
        })

        console.log(formData);

    }, [loading, profile]);

    const {
        name,
        contactNumber,
        address,
        paymentDate,
        profession,
        debtAmount,
        advanceAmount,
        locality,
        itemPurchased,
        totalAmount
    } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        console.log(formData);
    }

    const updateDetails = () => {
        updateParticipant(formData, match.params.id);
        console.log(formData);
        history.push('/search');
    }

    const renderActions = () => {
        return (
            <React.Fragment>
                <div>
                    <button onClick={updateDetails} className="ui button btn-success" disabled={!profile}>Save</button>
                    <Link to="/search" className="ui button ">Cancel</Link>
                </div>
            </React.Fragment>
        )
    }

    const renderContent = () => {
        if (!profile) {

            return <div class="spinner-border" role="status" style={{ "margin": "0 auto", "display": "flex" }}>
                <span class="sr-only">Loading...</span>
            </div>

        }

        return (
            <form>
                <table class="ui celled table">
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <td data-label="Name">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    placeholder="Name"
                                    value={name}
                                    onChange={handleChange}
                                    required
                                /></td>
                        </tr>
                        <tr>
                            <th>Mobile Number</th>
                            <td data-label="mobile">
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Mobile Number"
                                    name="contactNumber"
                                    value={contactNumber}
                                    onChange={handleChange}
                                    required
                                /></td>
                        </tr>
                        <tr>
                            <th>Address</th>
                            <td data-label="Profession">
                                <textarea
                                    className="form-control"
                                    placeholder="Address"
                                    name="address"
                                    value={address}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </td>
                        </tr>
                        <tr>
                            <th>Mid Payment Date</th>
                            <td data-label="midPaymentDate">
                                <input
                                    type="date"
                                    className="form-control"
                                    placeholder="Mid Payment Date"
                                    name="midPaymentDate"
                                    value={moment(new Date()).format('YYYY-MM-DD')}
                                    onChange={handleChange}
                                    required
                                    disabled
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>Payment Date</th>
                            <td data-label="paymentDate">
                                <input
                                    type="date"
                                    className="form-control"
                                    placeholder="Payment Date"
                                    name="paymentDate"
                                    value={debtAmount === parseInt(advanceAmount) ? moment(new Date()).format('YYYY-MM-DD') : moment(paymentDate).format('YYYY-MM-DD')}
                                    onChange={handleChange}
                                    required
                                    disabled={debtAmount === parseInt(advanceAmount) ? true : false}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>Profession</th>
                            <td data-label="Profession">
                                <select
                                    className="form-control"
                                    name="profession"
                                    value={profession}
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
                            </td>
                        </tr>
                        <tr>
                            <th>Debt Amount</th>
                            <td data-label="amount">
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Debt Amount"
                                    name="debtAmount"
                                    value={debtAmount}
                                    onChange={handleChange}
                                    required
                                    disabled
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>Advance Amount</th>
                            <td data-label="amount">
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Advance Amount"
                                    name="advanceAmount"
                                    value={advanceAmount}
                                    onChange={handleChange}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>Locality</th>
                            <td data-label="dob">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Locality"
                                    name="locality"
                                    value={locality}
                                    onChange={handleChange}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>Item Purchased</th>
                            <td data-label="dob">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Item Purchased"
                                    name="itemPurchased"
                                    value={itemPurchased}
                                    onChange={handleChange}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>Total Bill Amount</th>
                            <td data-label="dob">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Total Amount"
                                    name="totalAmount"
                                    value={totalAmount}
                                    onChange={handleChange}
                                    required
                                    disabled
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form >
        )
    }


    return (
        <div>
            <Modal
                title="Debtors Details"
                content={renderContent()}
                actions={renderActions()}
                onDismiss={() => <Redirect to="/search" />}
            />
        </div >
    )

}

const mapStateToProps = (state) => {
    return { participants: state.part }
}

export default connect(mapStateToProps, { fetchParticipant, updateParticipant })(Edit);
