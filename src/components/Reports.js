import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { fetchParticipants } from '../actions'

const Reports = (props) => {

    const [details, setDetails] = useState([]);
    const [nopByAge, setNopByAge] = useState({});
    const [nopByLocality, setNopByLocality] = useState({});
    const [professionalCount, setProfessionalCount] = useState({});
    const [averagePeople, setAveragePeople] = useState(Number);

    useEffect(() => {
        const getReports = async () => {
            props.fetchParticipants();
            setDetails(props.participants)
        }
        getReports();
    }, [])

    const generateReport = () => {
        console.log('I run')
        getProfessionCount();
        getAgeCount();
        getLocalityCount();
        getTotalDebtAmount();
    }

    const getProfessionCount = () => {
        const proArr = details.map(x => x.profession).reduce((total, num) => {
            console.log(details);
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
        const ageArr = details.map(x => x.debtAmount);
        console.log(details);
        let count = 0;
        let count2 = 0;
        let count3 = 0;
        let count4 = 0;
        let count5 = 0;
        let count6 = 0;

        ageArr.forEach(x => {
            if (x >= 0 && x < 1000) {
                count++
            } else if (x >= 1000 && x < 10000) {
                count2++
            } else if (x >= 10000 && x < 25000) {
                count3++
            } else if (x >= 25000 && x < 50000) {
                count4++
            } else if (x >= 50000 && x < 100000) {
                count5++
            } else {
                count6++
            }
        })
        setNopByAge([count, count2, count3, count4, count5, count6])
    }

    const getTotalDebtAmount = () => {
        const totalDebt = details.map(x => x.debtAmount).reduce((total, curNum) => {
            console.log(details)
            return Number(total) + Number(curNum);
        })
        setAveragePeople(totalDebt);
    }

    const getLocalityCount = () => {

        const addObject = details.map(x => x.locality).reduce((total, num) => {
            console.log(details);
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
    const renderProfessionalTable = () => {
        return Object.keys(professionalCount).map(key => {
            return <tr>
                <th scope="row">{key}</th>
                <td>{professionalCount[key]}</td>
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
                                <th scope="col">Amount-Range</th>
                                <th scope="col">Number of People</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">Under 1000</th>
                                <td>{nopByAge[0]}</td>
                            </tr>
                            <tr>
                                <th scope="row">1000 - 10000</th>
                                <td>{nopByAge[1]}</td>
                            </tr>
                            <tr>
                                <th scope="row">10000 - 25000</th>
                                <td>{nopByAge[2]}</td>
                            </tr>
                            <tr>
                                <th scope="row">25000 - 50000</th>
                                <td>{nopByAge[3]}</td>
                            </tr>
                            <tr>
                                <th scope="row">50000 - 100000</th>
                                <td>{nopByAge[4]}</td>
                            </tr>
                            <tr>
                                <th scope="row">Above 100000</th>
                                <td>{nopByAge[5]}</td>
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
                <div className="col-md-6 mt-3" style={{ 'overflow-y': 'auto', 'height': '198px' }}>
                    <table className="table table-bordered table-hover">
                        <thead>
                            <th scope="col">Profession</th>
                            <th scope="col">Number of People</th>
                        </thead>
                        <tbody>
                            {renderProfessionalTable()}
                        </tbody>
                    </table>
                </div>
                <div className="col-md-6 mt-5 mb-4" style={{ "text-align": "center" }}>
                    <div className="card" style={{ "width": "18rem" }}>
                        <div className="card-body">
                            <h4 className="card-title">Total Debt Amount</h4>
                            <h2 className="card-text">{averagePeople}</h2>
                        </div>
                    </div>
                </div>
                <button
                    disabled={details.length === 0 ? true : false}
                    className="btn btn-danger btn-block m-4"
                    onClick={generateReport}
                >{details.length === 0 ? 'No Participants' : 'Generate Report'}</button>
            </div>
        </div >
    )
}

const mapStateToProps = (state) => {
    return { participants: state.part.profiles }
}

export default connect(mapStateToProps, { fetchParticipants })(Reports)