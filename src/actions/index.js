import participants from '../utils/api'

export const createParticipant = (formValues) => async dispatch => {
    const response = await participants.post("/profile", { ...formValues })
    sessionStorage.setItem('sortType', '');
    dispatch({ type: "CREATE_PART", payload: response.data })
}

export const updateParticipant = (formValues, id) => async dispatch => {
    const response = await participants.patch(`/profile/${id}`, { ...formValues })
    dispatch({ type: "UPDATE_PART", payload: response.data })
}

export const fetchParticipants = () => async dispatch => {
    const response = await participants.get("/profile");
    console.log(response.data)
    if (sessionStorage.getItem('sortType') === 'Term') {
        sortParticipant(response.data, JSON.parse(sessionStorage.getItem('searchTerm')));
    } else {
        sortParticipantByDate(response.data);
    }
    dispatch({ type: "FETCH_PARTS", payload: response.data })
}

export const fetchParticipant = (id) => async dispatch => {
    const response = await participants.get(`/profile/${id}`);
    console.log(response.data)
    dispatch({ type: "FETCH_PART", payload: response.data })
}

export const deleteParticipant = (id) => async dispatch => {
    const response = await participants.delete(`/profile/${id}`);
    console.log(response.data)
    dispatch({ type: "DELETE_PART", payload: id })
}

export const sortParticipant = (participants, searchTerm) => {
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
    sessionStorage.setItem('sortType', 'Term');
    sessionStorage.setItem('searchTerm', JSON.stringify(searchTerm));
    return { type: "SORT_PART", payload: filterArr }
}


export const sortParticipantByDate = (participants) => {
    const filterArr = participants.sort((a, b) => {
        if (Math.ceil((new Date(a.paymentDate) - new Date()) / (1000 * 60 * 60 * 24)) >
            Math.ceil((new Date(b.paymentDate) - new Date()) / (1000 * 60 * 60 * 24))
        ) {
            return 1;
        } else if (Math.ceil((new Date(a.paymentDate) - new Date()) / (1000 * 60 * 60 * 24)) <
            Math.ceil((new Date(b.paymentDate) - new Date()) / (1000 * 60 * 60 * 24))
        ) {
            return -1;
        }
        return null;
    })
    sessionStorage.setItem('sortType', 'Date');
    return { type: "SORT_PART_BY_DATE", payload: filterArr }
}
