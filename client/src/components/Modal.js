import React from 'react';
import ReactDOM from 'react-dom';       //in order to render modal directly on our body element...its hard to show modal in react beacuse its deeply nested so z index of parent may affect z index of modal


const Modal = props => {
    return ReactDOM.createPortal(       //takes 2 argument JSX and reference to element
        <div onClick={props.onDismiss} className="ui dimmer modals visible active">
            <div onClick={(e)=>e.stopPropagation()} className="ui standard modal visible active">
                <i className="close icon" onClick={props.onDismiss}></i>
                <div className="header">{props.title}</div>
                <div className="content">
                    {props.content}
                </div>
                <div className="actions">
                    {props.actions}
                </div>
            </div>
        </div>,
        document.querySelector('#modal')
    );
};

export default Modal;

