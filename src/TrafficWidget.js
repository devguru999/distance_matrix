import React, { useEffect, useState } from "react"

import "react-widgets/styles.css";

import './traffic-widget.css'
import Marker from './image/marker.png'
import DirectionSlide from "./DirectionSlide"
import DirectionEdit from "./DirectionEdit";


const TrafficWidget = () => {
    const [routes, setRoutes] = useState([]);
    const [longitude, setLongitude] = useState("9.188540");
    const [latitude, setLatitude] = useState("45.464664");
    const [destination, setDestination] = useState('Uffici J&J Whitemoon');
    const [duration, setDuration] = useState('0 min');
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

    const handleOptionChange = (val) => {
        console.log(val);
        // setDestination(evt.target.options[evt.target.selectedIndex].text)
        // setSelectedOption(evt.target.value)
        // const pos = evt.target.value.split(",")
        // setLatitude(parseFloat(pos[0]));
        // setLongitude(parseFloat(pos[1]));           
        
    }

    return (
        <div id="traffic-widget">
            <h2>DIRECTIONS</h2>
            <div className="row carousel">
                <DirectionSlide
                    icon={Marker}
                    dest={destination}
                    dura={duration}
                    dist={distance} />
            </div>
            <div className="control">
                { !showControl &&
                <div className="row flex-end">
                    <a href="#" onClick={() => setShowControl(true)}>MANAGE DESTINATION</a>
                </div>
                }
                { showControl &&
                <DirectionEdit 
                    start=''
                    end=''
                    onChange={handleOptionChange} />
                }
            </div>
        </div>
    )
}

export default TrafficWidget