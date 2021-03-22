import React from 'react';
import {connect} from 'react-redux';
import {fetchStreams} from '../../actions';
import { Link } from 'react-router-dom';

class StreamList extends React.Component {
    componentDidMount(){
        this.props.fetchStreams();
    }

    renderAdmin(stream){          //only user who created can delete and edit stream
        if(stream.userId === this.props.currentUserId){
            return (
                <div className="right floated content">
                    <button className="ui button primary">
                        Edit
                    </button>
                    <button className="ui button negative">
                        Delete
                    </button>
                </div>
            );
        }
    }

    renderList(){
        return this.props.streams.map(stream=>{
            return(
                <div className="item" key={stream.id}>
                    {this.renderAdmin(stream)}
                    <i className="large middle aligned icon camera" />
                    <div className="content">
                        {stream.title}
                        <div className="description">{stream.description}</div>
                    </div>
                </div>
            )
        });
    }

    renderCreate(){     //we only want to show create if the user is signed in...
        if(this.props.isSignedIn){
           return (
                <div style={{textAlign:'right'}}>
                    <Link to="/streams/new" className="ui button primary">
                        Create Stream
                    </Link>
                </div>
            );
        }
    }

    render(){
        console.log(this.props.streams);
        return (
            <div>
                <h2>Streams</h2>
                <div className="ui celled list">
                    {this.renderList()}
                </div>
                {this.renderCreate()}
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return { 
        streams: Object.values(state.streams),           //Object.values(state.streams) take all different vaues inside object and put it into array
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    };   
}

export default connect(mapStateToProps,{ fetchStreams })(StreamList);
