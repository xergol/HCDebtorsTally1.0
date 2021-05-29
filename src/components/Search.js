import React from 'react';
import { fetchParticipants } from '../actions'
import { sortParticipant, sortParticipantByDate } from '../actions'
import { connect } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import history from '../history'

class Search extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.fetchParticipants();
    }

    sortByDate = () => {
        this.props.sortParticipantByDate(this.props.participants)
    }

    handleChange = event => {
        this.props.sortParticipant(this.props.participants, event.target.value)
    }

    renderParticipants = () => {
        { console.log(this.props.participants) }
        if (this.props.participants.length !== 0) {
            return this.props.participants.map(participant => {
                return (
                    <div>
                        <div
                            onClick={() => history.push(`/details/${participant._id}`)}
                            key={participant._id}
                            className={`list-group-item list-group-item-action align-items-start mt-4 justify-content-between ${participant.debtAmount === 0 ? 'bg-success' : Math.ceil((new Date(participant.paymentDate) - new Date()) / (1000 * 60 * 60 * 24)) < 0 ? 'bg-danger' : Math.ceil((new Date(participant.paymentDate) - new Date()) / (1000 * 60 * 60 * 24)) === 0 ? 'bg-warning' : ''}`}
                            style={{ display: 'flex', flexDirection: 'row' }}
                        >
                            <div>
                                <div className="d-flex w-100 justify-content-between">
                                    <h5 className="mb-1">{participant.name}</h5>
                                </div>
                                <p className="mb-1">{participant.locality}</p>
                            </div>
                            {Math.ceil((new Date(participant.paymentDate) - new Date()) / (1000 * 60 * 60 * 24))}
                            <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                                <div onClick={e => e.stopPropagation()} style={{ marginLeft: '10px' }}>
                                    <button
                                        onClick={() => history.push(`/delete/${participant._id}`)}
                                        className="btn btn-danger btn-block">Delete</button>
                                </div>
                                <div onClick={e => e.stopPropagation()} style={{ marginLeft: '10px' }}>
                                    <button
                                        onClick={() => history.push(`/edit/${participant._id}`)}
                                        className="btn btn-success btn-block">Edit</button>
                                </div>
                                <div onClick={e => e.stopPropagation()} >
                                    <button
                                        onClick={() => history.push(`/transaction/${participant._id}`)}
                                        className="btn btn-success btn-block">Transaction</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        } else {
            return <div class="spinner-border mt-5" role="status" style={{ "margin": "0 auto" }}>
                <span class="sr-only">Loading...</span>
            </div>
        }
    }

    render() {
        return (
            <div className="container mt-5">
                <h3 className="mb-4 mt-2" style={{ textAlign: "center" }}>Debtors List</h3>
                <div className="card card-body py-5 mb-5">
                    <input
                        type="search"
                        className="form-control ds-input "
                        id="search-input"
                        placeholder="Search..."
                        onChange={this.handleChange}
                    />
                    {this.renderParticipants()}
                    {console.log('render')}
                </div>
                <button onClick={this.sortByDate} class="btn btn-success">Sort By Date</button>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    console.log(Object.values(state.part.profiles))
    return { participants: Object.values(state.part.profiles) }
}

export default connect(mapStateToProps, { fetchParticipants, sortParticipant, sortParticipantByDate })(Search);