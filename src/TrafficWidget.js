import React, { useEffect, useState } from "react"

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import "react-widgets/styles.css";

import './traffic-widget.css'
import Marker from './image/marker.png'
import DirectionSlide from "./DirectionSlide"
import DirectionEdit from "./DirectionEdit";
import DirectionList from "./DirectionList";

import Addresses from "./address.json"

const TrafficWidget = () => {
    const [routes, setRoutes] = useState([]);
    const [selectedRoute, setSelectedRoute] = useState(null);
    const [showControl, setShowControl] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    
    const [addresses, setAddresses] = useState([]);

    useEffect(() => {
        setAddresses(Addresses);
        const storedRoutes = localStorage.getItem('routes');
        if (storedRoutes) {
            setRoutes(JSON.parse(storedRoutes));
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("routes", JSON.stringify(routes));
    }, [routes])

    useEffect(() => {
        if (!routes.length)
            setShowEdit(true)
    }, [showEdit, showControl])

    const handleOptionChange = (val) => {
        if (val && val.destination) {
            for (let i in routes) {
                if (routes[i].startPoint == val.startPoint &&
                    routes[i].destination == val.destination)
                    return;
            }
            if (selectedRoute) {
                setRoutes(routes.map(route => {
                    if (route.startPoint === selectedRoute.startPoint &&
                        route.destination === selectedRoute.destination) {
                        return val;
                    }
                    return route;
                }));
            } else {
                setRoutes([...routes, val]);
            }
            setSelectedRoute(null);
            setShowEdit(false);
        } else {
            setSelectedRoute(null);
            setShowEdit(false);
        }
    }

    const handleListChange = (val) => {
        if (!val) {
            setSelectedRoute(null);
            setShowEdit(true);
        } else {
            if (val.action === "delete") {
                delete val.action;
                setRoutes(routes.filter(route => 
                    route.startPoint !== val.startPoint || 
                    route.destination !== val.destination));                
            } else if (val.action === "edit") {
                delete val.action;
                setSelectedRoute(val);
                setShowEdit(true);
            }
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
                <div className="row flex-end">
                    <a href="#" onClick={() => setShowControl(!showControl)}>MANAGE DESTINATION</a>
                </div>
            </div>
            <div className="control">
                { showControl && showEdit &&
                <DirectionEdit 
                    addresses={addresses}
                    setAddresses={setAddresses}
                    start={selectedRoute?addresses.filter(address =>
                        address.title == selectedRoute.startPoint)[0]:null}
                    end={selectedRoute?addresses.filter(address =>
                        address.title == selectedRoute.destination)[0]:null}
                    onChange={handleOptionChange} />
                }
                
                { showControl && !showEdit &&
                <DirectionList 
                    routes={routes}
                    onChange={handleListChange} />
                }
            </div>
        </div>
    )
}

export default TrafficWidget