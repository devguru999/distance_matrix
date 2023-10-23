import { useState, useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'

import { Combobox } from "react-widgets"

import Routing from './image/routing.png'

const DirectionEdit = ({addresses, start, end, onChange}) => {   
    const [startPoint, setStartPoint] = useState(start);
    const [destination, setDestination] = useState(end);
    const [isLoading, setIsLoading] = useState(false);
    const [loadCount, setLoadCount] = useState(0);

    useEffect(() => {
        if (loadCount < 0) {
            setLoadCount(0);
        } else if (loadCount == 0) {
            setIsLoading(false);
            calculateEstimation();
        } else {
            setIsLoading(true);
        }
    }, [loadCount]);

    const calculateEstimation = () => {
        console.log(startPoint, destination);
        if (!startPoint || !destination) {
            return;
        }

        if (startPoint?.title == '' || destination?.title == '') {
            return;
        }

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

    const onStartPointChange = (val) => {
        setStartPoint(val);
    }

    const onDestinationChange = (val) => {
        setDestination(val);
    }

    const handleOptionChange = (val) => {
        if (!val) {
            onChange(null);
        } else {            
            if (!startPoint || !destination) return;       

            const requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };

            console.log(startPoint);
            console.log(destination);

            if (typeof startPoint == 'string') {
                setLoadCount(loadCount + 1);
                setStartPoint(startPoint.replace(/\s/g, '+'));
                fetch(`https://api.distancematrix.ai/maps/api/geocode/json?address=${startPoint}&key=8wgWs28VBCU32pBTzmzgPJfbes3gMiyRXu4usNy3Qg4otPmmLWQurFATasbJxbuD`, requestOptions)
                    .then(response => response.text())
                    .then(result => {
                        const json = JSON.parse(result);
                        const address = json.result[0].formatted_address;
                        const geometry = json.result[0].geometry.location;
                        const pos = geometry.lat + "," + geometry.lng;
                        setStartPoint({                        
                            id: 12,
                            title: address,
                            pos: pos
                        })
                        setLoadCount(loadCount - 1);
                    })
                    .catch(error => console.log('error', error));
            }            

            if (typeof destination == 'string') {
                setLoadCount(loadCount + 1);
                setDestination(destination.replace(/\s/g, '+'));
                fetch(`https://api.distancematrix.ai/maps/api/geocode/json?address=${destination}&key=8wgWs28VBCU32pBTzmzgPJfbes3gMiyRXu4usNy3Qg4otPmmLWQurFATasbJxbuD`, requestOptions)
                    .then(response => response.text())
                    .then(result => {
                        const json = JSON.parse(result);
                        const address = json.result[0].formatted_address;
                        const geometry = json.result[0].geometry.location;
                        const pos = geometry.lat + "," + geometry.lng;
                        setDestination({                        
                            id: 12,
                            title: address,
                            pos: pos
                        })
                        setLoadCount(loadCount - 1);
                    })
                    .catch(error => console.log('error', error));
            }   

            
            if (typeof startPoint !== 'string' && typeof destination !== 'string') {
                calculateEstimation();
            }
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
                    { isLoading &&
                    <Combobox busy disabled
                        data={addresses}
                        dataKey='id'
                        textField='title'
                        value={startPoint}
                        onChange={onStartPointChange}
                        placeholder="Write or choose your starting point" />
                    }
                    { !isLoading &&
                    <Combobox 
                        data={addresses}
                        dataKey='id'
                        textField='title'
                        value={startPoint}
                        onChange={onStartPointChange}
                        placeholder="Write or choose your starting point" />
                    }
                    { isLoading &&
                    <Combobox busy disabled
                        data={addresses}
                        dataKey='id'
                        textField='title'
                        value={destination}
                        onChange={onDestinationChange}
                        placeholder="Write or choose destination" />
                    }
                    { !isLoading &&
                    <Combobox
                        data={addresses}
                        dataKey='id'
                        textField='title'
                        value={destination}
                        onChange={onDestinationChange}
                        placeholder="Write or choose destination" />
                    }
                    <a className='button' href='#' onClick={() => handleOptionChange("route")}>ROUTE PLANNER</a>
                </div>
            </div>
        </div>
    )
}

export default DirectionEdit