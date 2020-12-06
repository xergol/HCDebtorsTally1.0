import React, { useEffect, useState } from 'react';
// import Initialdata from '../dummyapi'
import axios from 'axios';

const Reports = () => {

    const [details, setDetails] = useState([]);
    const [nopByAge, setNopByAge] = useState({});
    const [nopByLocality, setNopByLocality] = useState({});
    const [professionalCount, setProfessionalCount] = useState({});
    const [averagePeople, setAveragePeople] = useState(Number);

    useEffect(() => {
        const getReports = async () => {
            const response = await axios.get('https://my.api.mockaroo.com/users.json?', {
                headers: { 'X-API-Key': 'e67443f0' }
            })
            setDetails(response.data)
        }
        getReports();
    }, [])

    const generateReport = () => {
        console.log('I run')
        getProfessionCount();
        getAgeCount();
        getLocalityCount();
        getAverageCount();
    }

    const getProfessionCount = () => {
        const proArr = details.map(x => x.profession).reduce((total, num) => {
            if (!total[num]) {
                total[num] = 1;
            } else {
                total[num] += 1;
            }
            return total
        }, {})
        setProfessionalCount(proArr)
    }

    const getAgeCount = () => {
        const ageArr = details.map(x => x.age);
        let count = 0;
        let count2 = 0;
        let count3 = 0;
        ageArr.forEach(x => {
            if (x >= 13 && x < 18) {
                count++
            } else if (x >= 18 && x < 25) {
                count2++
            } else {
                count3++
            }
        })
        setNopByAge([count, count2, count3])
    }

    const getAverageCount = () => {
        const guestArr = details.map(x => x.numberOfGuest).reduce((total, curNum) => {
            return (total + curNum);
        })
        const averagePeople = guestArr + details.length / details.length;
        setAveragePeople(averagePeople)
    }

    const getLocalityCount = () => {
        const addObject = details.map(x => x.locality).reduce((total, num) => {
            if (!total[num]) {
                total[num] = 1;
            } else {
                total[num] += 1;
            }
            return total;
        }, {})
        setNopByLocality(addObject)
    }

    const renderLocalityTable = () => {
        return Object.keys(nopByLocality).map(key => {
            return <tr>
                <th scope="row">{key}</th>
                <td>{nopByLocality[key]}</td>
            </tr>
        })
    }

    return (
        <div className="container mb-5 mt-5" >
            <h3 className="mt-4" style={{ "text-align": "center" }}>Reports</h3>
            <div className="row mb-2">
                <div className="col-md-6 mt-3">
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Age-Range</th>
                                <th scope="col">Number of People</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">13-18</th>
                                <td>{nopByAge[0]}</td>
                            </tr>
                            <tr>
                                <th scope="row">18-25</th>
                                <td>{nopByAge[1]}</td>
                            </tr>
                            <tr>
                                <th scope="row">25+</th>
                                <td>{nopByAge[2]}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="col-md-6 mt-3" style={{ 'overflow-y': 'auto', 'height': '198px' }}>
                    <table className="table table-bordered table-hover" >
                        <thead>
                            <tr>
                                <th scope="col">Locality</th>
                                <th scope="col">Number of People</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderLocalityTable()}
                        </tbody>
                    </table>
                </div>
                <div className="col-md-6 mt-5">
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Profession</th>
                                <th scope="col">Number of People</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">Professional</th>
                                <td>{professionalCount.Professional}</td>
                            </tr>
                            <tr>
                                <th scope="row">Student</th>
                                <td>{professionalCount.Student}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="col-md-6 mt-5" style={{ "text-align": "center" }}>
                    <div className="card" style={{ "width": "18rem" }}>
                        <div className="card-body">
                            <h4 className="card-title">Average people Count</h4>
                            <h2 className="card-text">{averagePeople}</h2>
                        </div>
                    </div>
                </div>
                <button
                    disabled={details.length === 0 ? true : false}
                    className="btn btn-danger btn-block"
                    onClick={generateReport}
                >{details.length === 0 ? 'No Participants' : 'Generate Report'}</button>
            </div>
        </div >
    )
}

export default Reports