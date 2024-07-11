/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div className="marker" style={{ fontSize: '2em' }}>{text}</div>;

export function GoogleMap() {
    const [coords, setCoords] = useState({ lat: 32.0853, lng: 34.7818 })
    const zoom = 11

    function onHandleClick({ lat, lng }) {
        setCoords({ lat, lng })
    }

    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '50vh', width: '50%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyA8EUNwd1-P2TJME2BpcKwaeT3rBMGpZCw" }}
                center={coords}
                defaultZoom={zoom}
                onClick={onHandleClick}
            >
                <AnyReactComponent
                    // lat={coords.lat}
                    // lng={coords.lng}
                    {...coords}
                    text=""
                />
            </GoogleMapReact>
        </div>
    );
}