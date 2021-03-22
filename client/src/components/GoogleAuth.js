import React from 'react';
import {connect} from 'react-redux';
import {signIn,signOut} from '../actions';

class GoogleAuth extends React.Component{
    
    componentDidMount(){
        window.gapi.load('client:auth2',()=>{
            //called after when this client auth2 lib loads into gapi
            window.gapi.client.init({
                clientId: '771700332176-6mlgqg4qugvq3qjd3fmrnb11s5m3frbg.apps.googleusercontent.com',
                scope: 'email'      //we want unly users email
            }).then(()=>{
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);     //listen() and get() is inside proto of isSignedIn  //listen is called anytime the users authentication status changes
            })
        });
    }

    onAuthChange = (isSignedIn) =>{         //called anytime auth status changes
        if(isSignedIn){
            this.props.signIn(this.auth.currentUser.get().getId());        //update state to signedin to true...calling action creators    //passing the id of currently signed in user so that we can see llater which user user created which stream
        }
        else{
            this.props.signOut();
        }
    };

    onSignInClick = () =>{
        this.auth.signIn();
    };

    onSignOutClick = () =>{
        this.auth.signOut();
        this.auth.disconnect();
    };

    renderAuthButton(){
        if(this.props.isSignedIn===null){
            return null;
        } 
        else if(this.props.isSignedIn){
            return (
                <button className="ui red google button" onClick={this.onSignOutClick}>
                    <i className="google icon"></i>Sign Out
                </button>
            );
        }
        else{
            return (
                <button className="ui red google button" onClick={this.onSignInClick}>
                    <i className="google icon"></i>Sign In With Google
                </button>
            );
        }
    }

    render(){
        return <div>{this.renderAuthButton()}</div>;
    }
}

const mapStateToProps = (state) =>{
    return { isSignedIn: state.auth.isSignedIn };    //now isSignedin is received inside props of this component
};

export default connect(
    mapStateToProps,
    {signIn,signOut}
)(GoogleAuth);
