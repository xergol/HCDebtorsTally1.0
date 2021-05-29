import _ from 'lodash';

const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'CREATE_PART':
            console.log({
                ...state,
                profiles: [...state.profiles, action.payload],
                loading: false
            })
            return {
                ...state,
                profiles: [...state.profiles, action.payload],
                loading: false
            };
        case 'UPDATE_PART':
            console.log({
                ...state,
                profiles: [...state.profiles, action.payload],
                loading: false
            })
            return {
                ...state,
                profiles: [...state.profiles],
                loading: false
            };
        case 'FETCH_PARTS':
            console.log({ ...state, profiles: action.payload })
            return {
                ...state,
                profile: null,
                profiles: action.payload,
                loading: false
            };
        case 'SORT_PART':
            console.log({
                ...state,
                profile: null,
                profiles: action.payload
            })
            return {
                ...state,
                profile: null,
                profiles: action.payload
            };
        case 'SORT_PART_BY_DATE':
            console.log({
                ...state,
                profile: null,
                profiles: action.payload
            })
            return {
                ...state,
                profile: null,
                profiles: action.payload
            };
        case 'DELETE_PART':
            console.log(state);
            return {
                ...state,
                profile: null,
                profiles: state.profiles.filter(profile => profile._id !== action.payload)
            };
        case 'FETCH_PART':
            return {
                ...state,
                profile: action.payload,
                loading: false
            }
        default:
            return state;
    }
}