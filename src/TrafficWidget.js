import React, { useEffect, useState } from "react"

import './traffic-widget.css'
import Marker from './image/marker.png'
import Routing from './image/routing.png'

const TrafficWidget = () => {
    const [longitude, setLongitude] = useState("45.464664");
    const [latitude, setLatitude] = useState("9.188540");
    const [destination, setDestination] = useState('Uffici J&J Whitemoon');
    const [arriveTime, setArriveTime] = useState('0 min');
    const [distance, setDistance] = useState('0 km');

    const [showControl, setShowControl] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
            });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }, []);

    const handleOptionChange = (evt) => {
        setDestination(evt.target.options[evt.target.selectedIndex].text)
        setSelectedOption(evt.target.value)
        // const pos = evt.target.value.split(",")
        // setLatitude(parseFloat(pos[0]));
        // setLongitude(parseFloat(pos[1]));
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
          
        fetch(`https://api.distancematrix.ai/maps/api/distancematrix/json
        ?origins=${latitude},${longitude}&destinations=${evt.target.value}
        &key=8wgWs28VBCU32pBTzmzgPJfbes3gMiyRXu4usNy3Qg4otPmmLWQurFATasbJxbuD`, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    return (
        <div id="traffic-widget">
            <h2>PERCORSI D'INTERESEE</h2>
            <div className="row content">
                <div className="col icon">
                    <img src={Marker}></img>
                </div>
                <div className="col flex-grow">
                    <div className="row flex-between title">
                        <div className="col title-destination">
                            <div className="main-title">{destination}</div>
                            <div className="sub-title">tramite Via Cenisio</div>
                        </div>
                        <div className="col values text-right">
                            <div className="values-time">{arriveTime}</div>
                            <div className="values-dist">{distance}</div>
                        </div>
                    </div>
                    <div className="description">
                        In questo momento sul percorso piu rapido il traffico e moderato come al solito.
                    </div>
                </div>
            </div>
            <div className="control">
                { !showControl &&
                <div className="row flex-end">
                    <a href="#" onClick={setShowControl(true)}>CALCOLA ALTRI TRAGITTI</a>
                </div>
                }
                { showControl &&
                <div className="control-pad">
                    <div className="title text-left">
                        CALCOLA ALTRI TRAGITTI
                    </div>
                    <div className="row">
                        <div className="col icon">
                            <img src={Routing}></img>
                        </div>
                        <div className="col fields flex-grow">
                            <input type="text" placeholder="Punto di partenza"></input>
                            <select value={selectedOption} onChange={handleOptionChange}>
                                <option value="" disabled>Punti d’interesse</option>
                                <option value="45.5234,8.9234">Uffici J&J Whitemoon </option>
                                <option value="45.6301,8.7255">Aeroporto di Milano Malpensa</option>
                                <option value="45.4840,9.2061">Stazione Centrale, Milano MI</option>
                            </select>
                        </div>
                    </div>
                </div>
                }
            </div>
            <p>Latitude: {latitude}</p>
            <p>Longitude: {longitude}</p>
        </div>
    )
}

export default TrafficWidget