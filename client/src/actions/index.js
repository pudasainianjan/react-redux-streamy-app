import streams from '../apis/streams';
import history from '../history';        //our custom history object so that we can access it without browser router
import { 
    SIGN_IN,
    SIGN_OUT, 
    CREATE_STREAM ,
    FETCH_STREAMS,
    FETCH_STREAM,
    DELETE_STREAM,
    EDIT_STREAM,
} from './types';

//all action creators
export const signIn = (userId) =>{  //anytime our reducer sees type of sign in, it will set signInState to true
    return {
        type: SIGN_IN,
        payload: userId
    };
};

export const signOut = () =>{  
    return {
        type: SIGN_OUT
    };
};


//handling api call to json server requesting for create stream
export const createStream = (formValues) =>{
    return async (dispatch,getState) =>{     //redux thunk call this function automatically with dispatch function and getState function..getState func allows us to reach into the redux store and pull our info we need ..in this case we need to ull our user id updated by sign in
        const {userId} = getState().auth;
        const response = await streams.post('/streams',{...formValues, userId: userId });
        dispatch({ type: CREATE_STREAM, payload: response.data });

        //programmatic Navigation to get the user back to the root route
        history.push('/');
    };
};

export const fetchStreams = () => async dispatch=>{                   //arrow function that returns a thunk function
    const response = await streams.get('/streams');
    dispatch({type: FETCH_STREAMS, payload: response.data });
}

export const fetchStream = (id) => async dispatch =>{
    const response = await streams.get(`/streams/${id}`);
    dispatch({ type: FETCH_STREAM, payload: response.data });
};

export const editStream = (id, formValues) => async dispatch =>{
    //const response = await streams.put(`/streams/${id}`, formValues);           //?note: PUT VS PATCH put request updates all properties and replaces other properties we dont want to update..for eg: userId, we dont want to chage but this will get {title:'some title',description:'some desc..'} and there is no previous userId and Id associated with user...so in this case we can use PATCH request to update some provided key values only...
    const response = await streams.patch(`/streams/${id}`, formValues);
    dispatch({type: EDIT_STREAM, payload: response.data });
    history.push('/');
}

export const deleteStream = (id) => async dispatch =>{
    await streams.delete(`/streams/${id}`);
    dispatch({ type: DELETE_STREAM, payload: id });
    history.push('/');
}





