import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Form = () => {

    const [form, setForm] = useState({
        name: '',
        age: '',
        dateOfBirth: '',
        profession: '',
        locality: '',
        guests: '',
        address: ''
    });

    useEffect(() => {
        window.history.pushState({ name: "browserBack" }, "on browser back click", window.location.href);
        window.addEventListener('popstate', () => {
            setTimeout(() => {
                alert("Are you sure you want to leave, you will lose your data if you continue!");
            }, 500)
        });
    }, [])

    const postParticipant = async () => {
        await axios.post('https://meetup.free.beeceptor.com/api/participantRegistration',
            [form])
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
            age: '',
            dateOfBirth: '',
            profession: '',
            locality: '',
            guests: '',
            address: '',
        })
    }

    return (
        <div className="container mt-5 mb-5">
            <div className="card card-body py-4">
                <h3>ReactJS Meetup</h3>
                <h5 className="mt-3">If you’d like to participate in ReactJS meetup please fill in the details below</h5>
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
                        <label htmlFor="age">Age</label>
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Age"
                            name="age"
                            value={form.age}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dob">Date of Birth</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="D.O.B"
                            name="dateOfBirth"
                            value={form.dateOfBirth}
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
                            <option value='Employed'>Employed</option>
                            <option value='Student'>Student</option>
                        </select>
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
                        <label htmlFor="address">Number of Guests</label>
                        <select
                            className="form-control"
                            name="guests"
                            value={form.guests}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>Number of Guests</option>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                        </select>
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
                    <input type="submit" className="btn btn-danger btn-block" />
                </form>
            </div>
        </div >
    )
}

export default Form
