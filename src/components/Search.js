import React, { useEffect, useState } from 'react';
// import initialData from '../dummyapi';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';

import Details from './Details'

const Search = () => {

    const [modal, setModal] = useState(false);
    const [selectedParticipant, setSelectedParticipant] = useState([])

    const [participants, setParticipants] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        getParticipants();
    }, [selectedParticipant])

    const getParticipants = async () => {
        const response = await axios.get('https://my.api.mockaroo.com/users.json?', {
            headers: { 'X-API-Key': 'e67443f0' }
        })
        setParticipants(response.data)

        // incase api is not working you can use dummy api file to fetch data
        // setParticipants(initialData)
    }

    const handleChange = event => {
        setSearchTerm(event.target.value)

        const filterArr = participants.sort((a, b) => {
            if (a.name.toLowerCase().indexOf(searchTerm.toLowerCase()) >
                b.name.toLowerCase().indexOf(searchTerm.toLowerCase())
            ) {
                return -1;
            } else if (a.name.toLowerCase().indexOf(searchTerm.toLowerCase()) <
                b.name.toLowerCase().indexOf(searchTerm.toLowerCase())
            ) {
                return 1;
            } else if (a.locality.toLowerCase().indexOf(searchTerm.toLowerCase()) >
                b.locality.toLowerCase().indexOf(searchTerm.toLowerCase())
            ) {
                return -1;
            } else if (a.locality.toLowerCase().indexOf(searchTerm.toLowerCase()) <
                b.locality.toLowerCase().indexOf(searchTerm.toLowerCase())
            ) {
                return 1;
            }
            return null;
        })
        setParticipants(filterArr)
    }

    const handleShow = (id) => {
        const selPart = participants.filter(x => x.id === id);
        setSelectedParticipant(selPart)
        setModal(true);
    }

    const handleClose = () => {
        setModal(false);
    }

    const renderParticipants = () => {
        if (participants !== 0) {
            return participants.map(participant => {
                return (
                    <div>
                        <div
                            key={participant.id}
                            onClick={e => handleShow(participant.id)}
                            className="list-group-item list-group-item-action flex-column align-items-start mt-4">
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">{participant.name}</h5>
                            </div>
                            <p className="mb-1">{participant.locality}</p>
                        </div>
                        <Details
                            show={modal}
                            data={selectedParticipant}
                            onClick={handleClose}
                            onHide={handleClose}
                        />
                    </div>
                )
            })
        } else {
            return <div class="spinner-border mt-5" role="status" style={{ "margin": "0 auto" }}>
                <span class="sr-only">Loading...</span>
            </div>
        }
    }

    return (
        <div className="container mt-5">
            <form>
                <div className="card card-body py-5 mb-5">
                    <input
                        type="search"
                        className="form-control ds-input "
                        id="search-input"
                        placeholder="Search..."
                        onChange={handleChange}
                    />
                    {renderParticipants()}
                </div>
            </form>
        </div>
    )
}

export default Search