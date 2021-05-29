import React from 'react';
import Modal from './Modal';
import { Link, Redirect } from 'react-router-dom';
import { fetchParticipant } from '../actions'
import { deleteParticipant } from '../actions'

import { connect } from 'react-redux';
import history from '../history';


class Delete extends React.Component {

    componentDidMount() {
        this.props.fetchParticipant(this.props.match.params.id)
    }

    deleteProfile = () => {
        console.log(`delete ${this.props.match.params.id}`)
        // call the action creation for delete
        this.props.deleteParticipant(this.props.match.params.id);
        history.push('/search');
    }

    renderActions() {
        return (
            <React.Fragment>
                <button
                    onClick={this.deleteProfile}
                    className="btn btn-danger ui button ">
                    Delete
                </button>
                <Link to="/search" className="ui button ">Cancel</Link>
            </React.Fragment>
        )
    }

    renderContent() {
        return (
            <p>
                Are you sure you want to delete?.
            </p>
        )
    }

    render() {
        return (
            <div>
                <Modal
                    title="Alert"
                    content={this.renderContent()}
                    actions={this.renderActions()}
                    onDismiss={() => <Redirect to="/search" />}
                />
            </div>
        )
    }

}

export default connect(null, { fetchParticipant, deleteParticipant })(Delete);
