import _ from 'lodash';
import React from 'react';
import {connect} from 'react-redux';
import { formValues } from 'redux-form';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component{       //this props can also be accessed by mapStateToProps function with ownProps argument
    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id);     
    }

    onSubmit = formValues => {
        this.props.editStream(this.props.match.params.id, formValues);
    };
    
    render(){
        console.log(this.props);
        if(!this.props.stream){
            return <div>Loading...</div>
        }
        return (
            <div>
                <h3>Edit a Stream</h3>
                {/* <StreamForm initialValues={{title: this.props.stream.title, description:'Change me'}} onSubmit = {this.onSubmit} /> */}
                <StreamForm initialValues={_.pick(this.props.stream,'title','description')} onSubmit = {this.onSubmit} />
            </div>
        );
    }
}

const mapStateToProps = (state,ownProps) => {    //(state,ownProps)    //this can be called with two args..state and ownProps that gets reference to props object that shows inside the streamEdit component
    return { stream: state.streams[ownProps.match.params.id]};              //react router sends props to this class to find which url and params
}

export default connect(mapStateToProps,{fetchStream, editStream})(StreamEdit);
