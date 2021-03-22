import _ from 'lodash';
import {
    FETCH_STREAM,
    FETCH_STREAMS,
    CREATE_STREAM,
    EDIT_STREAM,
    DELETE_STREAM
} from '../actions/types';

export default (state = {} ,action) =>{
    switch (action.type) {
        case FETCH_STREAMS:
            return {...state, ..._.mapKeys(action.payload, 'id')}
        case FETCH_STREAM:
            return {...state, [action.payload.id]: action.payload }
        
        case CREATE_STREAM:
            return {...state, [action.payload.id]: action.payload }
        
        case EDIT_STREAM:
            return {...state, [action.payload.id]: action.payload }
        
        case DELETE_STREAM:
            return _.omit(state, action.payload);           //omit is a lodash function that returns new object in which given key is removed from our state object..so no need here to spread 
        default: 
        return state;
    }
};

//lodash map keys function will map an array of object taking particular value from it and mapping it into object of objects with object key as provided value
//because our api returns array of objects and we need object of objects here, i used mapkeys function of lodash in fetch alll streams
