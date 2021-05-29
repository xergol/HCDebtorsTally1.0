import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { fetchParticipant } from '../actions'

const Reports = ({ participants: { profile, loading }, fetchParticipant, match }) => {

    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        if (!profile) {
            fetchParticipant(match.params.id);
        }

        if (loading || !profile) {
            console.log('waiting...')
        } else {
            setTransactions(profile.transaction);
            console.log(profile.transaction);
        }


    }, [loading, profile])


    const renderContent = () => {
        if (!profile) {

            return <div class="spinner-border" role="status" style={{ "margin": "0 auto", "display": "flex" }}>
                <span class="sr-only">Loading...</span>
            </div>

        }

        return (
            <div className="container mb-5 mt-5" >
                <h3 className="mt-4" style={{ "text-align": "center" }}>Transactions</h3>
                <div className="row mb-2">
                    <div className="col-md-6 mt-3">
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Date</th>
                                    <th scope="col">Transaction description</th>
                                    <th scope="col">Debt</th>
                                    <th scope="col">Paid</th>
                                    <th scope="col">Balance to Pay</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map(transaction =>
                                    <tr key={transaction.id}>
                                        <th scope="row">{transaction.date}</th>
                                        <td>{transaction.description}</td>
                                        <td>{transaction.debtAmount}</td>
                                        <td>{transaction.paidAmount}</td>
                                        <td>{transaction.balanceToPay}</td>
                                    </tr>
                                )}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div >
        )
    }
    return (renderContent());

}

const mapStateToProps = (state) => {
    return { participants: state.part }
}

export default connect(mapStateToProps, { fetchParticipant })(Reports)