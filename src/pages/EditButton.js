import React from "react";
import {useNavigate} from 'react-router-dom'
import editLogo from './icons-imgs/icons8-edit.svg'
import './EditButton.css'

export default function EditButton(props) {

    const navigate = useNavigate();

    function handleClick(){
        navigate(`/cases/edit/${props.caseId}`);
    }

    return(
        <button onClick={handleClick}><img src={editLogo} alt="Edit"/></button>
    );

}