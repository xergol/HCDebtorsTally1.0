import React from 'react';
import ReactDom from 'react-dom'
import { Redirect } from 'react-router-dom';

//history.push("/search")

const Modal = (props) => {
    return ReactDom.createPortal(
        <div onClick={() => <Redirect to="/search" />} className="ui modals dimmer visible active">
            <div onClick={e => e.stopPropagation()} style={{ width: "50%", height: "79%", top: "20%", left: "24%", overflow: "scroll" }} className="ui standard modal visible active">
                <div className="header ">{props.title}</div>
                <div className="content">
                    {props.content}
                </div>
                <div className="actions">
                    {props.actions}
                </div>
            </div>
        </div >,
        document.querySelector('#modal')
    )
}

export default Modal