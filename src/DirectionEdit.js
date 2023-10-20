import { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'

import { DropdownList } from "react-widgets"

import Routing from './image/routing.png'

const DirectionEdit = ({addresses, start, end, onChange}) => {   
    const [startPoint, setStartPoint] = useState(start);
    const [destination, setDestination] = useState(end);

    const handleOptionChange = (val) => {
        if (!val) {
            onChange(null);
        } else {            
            if (!startPoint || !destination) return;       

            const requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };

            const url = `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${startPoint["pos"]}&destinations=${destination["pos"]}&key=8wgWs28VBCU32pBTzmzgPJfbes3gMiyRXu4usNy3Qg4otPmmLWQurFATasbJxbuD`;
            fetch(decodeURIComponent(url), requestOptions)
            .then(response => response.text())
            .then(result => {
                const json = JSON.parse(result);
                const element = json["rows"][0]["elements"][0];
                onChange({
                    "startPoint": startPoint["title"],
                    "destination": destination["title"],
                    "duration": element["duration"]["text"],
                    "distance": element["distance"]["text"]
                })
            })
            .catch(error => onChange(error));
        }
    }

    return (
        <div className="control-pad">
            <div className="title text-left">
                ROUTE PLANNER 
                <a href="#" onClick={()=> handleOptionChange(null)}>manage routes &nbsp;<FontAwesomeIcon icon={faPenToSquare}/></a>
            </div>
            <div className="row">
                <div className="col icon">
                    <img src={Routing}></img>
                </div>
                <div className="col fields flex-grow">
                    <DropdownList 
                        data={addresses}
                        dataKey='id'
                        textField='title'
                        value={startPoint}
                        onChange={(value) => setStartPoint(value)}
                        placeholder="Write or choose your starting point" />
                    <DropdownList
                        data={addresses}
                        dataKey='id'
                        textField='title'
                        value={destination}
                        onChange={(value) => setDestination(value)}
                        placeholder="Write or choose destination" />
                    <a className='button' href='#' onClick={() => handleOptionChange("route")}>ROUTE PLANNER</a>
                </div>
            </div>
        </div>
    )
}

export default DirectionEdit