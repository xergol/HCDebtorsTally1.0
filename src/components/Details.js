import React from "react";

import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Details = ({ show, onHide, data, onClick }) => {

    return (
        <div>
            <Modal show={show} onHide={() => onHide({ msg: 'Cross Icon Clicked!' })}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Details
                        </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {data.map(item => (
                        <table class="table">
                            <tbody>
                                <tr>
                                    <th scope="row">Name</th>
                                    <td>{item.name}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Age</th>
                                    <td>{item.age}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Locality</th>
                                    <td>{item.locality}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Profession</th>
                                    <td>{item.profession}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Guest</th>
                                    <td>{item.numberOfGuest}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Address</th>
                                    <td>{item.address}</td>
                                </tr>
                            </tbody>
                        </table>
                    ))}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => onClick({ msg: 'Modal Closed!' })} >Close</Button>
                </Modal.Footer>

            </Modal>
        </div>
    )
}

export default Details;
