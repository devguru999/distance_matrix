import React, { useState } from "react"

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import "react-widgets/styles.css";

import './traffic-widget.css'
import Marker from './image/marker.png'
import DirectionSlide from "./DirectionSlide"
import DirectionEdit from "./DirectionEdit";


const TrafficWidget = () => {
    const [routes, setRoutes] = useState([]);
    const [showControl, setShowControl] = useState(false);

    const handleOptionChange = (val) => {
        if (val && val.destination) {
            for (let i in routes) {
                if (routes[i].startPoint == val.startPoint &&
                    routes[i].destination == val.destination)
                    return;
            }
            setRoutes([...routes, val]);
        }
    }

    return (
        <div id="traffic-widget">
            <h2>DIRECTIONS</h2>
            <div className="carousel-container">
                <Carousel 
                    interval={2000}
                    autoPlay={true}
                    showThumbs={false}
                    showArrows={false}
                    showStatus={false}>
                {
                routes.map((route, index) => (
                    <DirectionSlide
                        key={index}
                        icon={Marker}
                        dest={route.destination}
                        dura={route.duration}
                        dist={route.distance} />
                    ))
                }                
                </Carousel>                
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