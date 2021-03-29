import React from 'react';
import { Field, reduxForm } from 'redux-form';      //reduxForm has same functionality as connect in redux


class StreamForm extends React.Component{

    renderError({error,touched}){       //meta has error and touched property, error is error message and touched tells whether user has previously touched the field or not
        if(touched && error){
            return(
                <div className="ui error message">
                    <div className="header">
                        {error}
                    </div>
                </div>
            );
        }
    }

    renderInput = ({input,label,meta}) =>{       //destructure input from props sent by redux-form Field component
        console.log('meta property with error message handling',meta);
        // console.log(input.value);
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
        return (
            <div className={className}>
                <label>{label}</label>
                <input 
                    // onChange={formProps.input.onChange} 
                    // value={formProps.input.value} 
                    //or do this
                    {...input}      //spread the input props given by redux-form
                    autoComplete= "off"
                />
                {this.renderError(meta)}
            </div>
                
        )
    }

    onSubmit = (formValues) => {
        // event.preventDefault();      //redux form auto callls it
        // console.log(formValues);
        this.props.onSubmit(formValues);
    }

    render(){
        // console.log(this.props);
        return (
            <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field name="title" component={this.renderInput} label="Enter Title" />
                <Field name="description" component={this.renderInput} label="Enter Description" />
                <button className="ui button primary">Submit</button>
            </form>
        );
    }
}

const validate = (formValues) =>{
    //if valid we return empty object to redux otherwise we return object wit name of field and value error message..when redux form see object with key value pair, it thinks user must have entered incorrectly
    const errors = {};
    if(!formValues.title){
        //only ran if the user did not enter a title
        errors.title = 'You must enter a title';
    }

    if(!formValues.description){
        errors.description = 'You must enter a description';
    }

    return errors;

};

export default reduxForm({                       //it receives a single obj in which config can be given
    form: 'streamForm',        //give any meaningful name...this is key for form
    validate: validate            //pass redux the validate function we created , empty obj means everything is valid and obj with name and value means title and error message
})(StreamForm);   //redux-form works same as connect


