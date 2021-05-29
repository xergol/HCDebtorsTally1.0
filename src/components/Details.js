import React from "react";
import Modal from "./Modal";
import { connect } from 'react-redux';
import { fetchParticipant } from '../actions'
import { Link, Redirect } from 'react-router-dom'


class Details extends React.Component {

    componentDidMount() {
        this.props.fetchParticipant(this.props.match.params.id)
    }

    renderActions() {
        return (
            <React.Fragment>
                <Link to="/search" className="ui button ">Cancel</Link>
            </React.Fragment>
        )
    }

    renderContent() {
        if (!this.props.participants) {

            return <div class="spinner-border" role="status" style={{ "margin": "0 auto", "display": "flex" }}>
                <span class="sr-only">Loading...</span>
            </div>

        }

        return (<table class="ui celled table">
            <tbody>
                <tr>
                    <th>Name</th>
                    <td data-label="Name">{this.props.participants.name}</td>
                </tr>
                <tr>
                    <th>Mobile Number</th>
                    <td data-label="mobile">{this.props.participants.contactNumber}</td>
                </tr>
                <tr>
                    <th>Address</th>
                    <td data-label="Profession">{this.props.participants.address}</td>
                </tr>
                <tr>
                    <th>Supply Date</th>
                    <td data-label="supplyDate">{new Date(this.props.participants.supplyDate).toDateString()}</td>
                </tr>
                <tr>
                    <th>Payment Date</th>
                    <td data-label="paymentDate">{new Date(this.props.participants.paymentDate).toDateString()}</td>
                </tr>
                <tr>
                    <th>Profession</th>
                    <td data-label="Profession">{this.props.participants.profession}</td>
                </tr>
                <tr>
                    <th>Debt Amount</th>
                    <td data-label="amount">{this.props.participants.debtAmount}</td>
                </tr>
                <tr>
                    <th>Last Advance Amount</th>
                    <td data-label="amount">{this.props.participants.advanceAmount}</td>
                </tr>
                <tr>
                    <th>Locality</th>
                    <td data-label="dob">{this.props.participants.locality}</td>
                </tr>
                <tr>
                    <th>Item Purchased</th>
                    <td data-label="dob">{this.props.participants.itemPurchased}</td>
                </tr>
                <tr>
                    <th>Total Bill Amount</th>
                    <td data-label="dob">{this.props.participants.totalAmount}</td>
                </tr>
            </tbody>
        </table>
        )
    }

    render() {
        return (
            <div>
                <Modal
                    title="Debtors Details"
                    content={this.renderContent()}
                    actions={this.renderActions()}
                    onDismiss={() => <Redirect to="/search" />}
                />
            </div >
        )
    }
}

const mapStateToProps = (state) => {
    return { participants: state.part.profile }
}

export default connect(mapStateToProps, { fetchParticipant })(Details);
