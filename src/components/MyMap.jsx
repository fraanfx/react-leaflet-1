import React, { Component } from 'react'
import {MapContainer, GeoJSON} from "react-leaflet"
import mapData from './../data/countries.json'
import "leaflet/dist/leaflet.css";
import "./MyMap.css";


class MyMap extends Component {
    state = {color: "#FFFF00"};
    
    colorArray = ["green", "blue", "yellow", "orange"] //colors fill array

componentDidMount() {
   console.log(mapData);
}
countryStyle = {
    fillCollor: "pink",
    fillOpacity: 0.90,
    color: "grey",
    weight: 1,
    dashArray: 6,
};
//On EachCountry metods

changeCountryColor = (event) => {
    
    event.target.setStyle({
        color: "red",
        fillColor: this.state.color,
        fillOpacity: 1
    })    
}
onMouseOver = (event) =>  {
event.target.setStyle(
    {
        color: "green",
        fillColor: this.colorArray[Math.floor(Math.random()*this.colorArray.length)],

    })
}

onEachCountry = (country, layer) => {
    const countryName = country.properties.ADMIN;
    const countryOther = country.properties.ISO_A3;
    console.log(country);
    layer.bindPopup(countryName + "  Code: " + countryOther);
    

    //random opcacity
    layer.options.fillOpacity = Math.random(); //Random opacity value
    //random color
    //const colorIndex = Math.floor(Math.random() * this.colorArray.length)
    //console.log("Color index is "+colorIndex)
    //layer.options.fillColor = this.colorArray[colorIndex]

    layer.on({
        onauxclick: (event) => {
            event.target.setStyle({
                color: "red",
                fillColor: Math.random()
            })
        
        },
        click: this.changeCountryColor,
        mouseover: this.onMouseOver
        })
    };


    //ColorPickerMethod
    colorChange = (event) =>{
        this.setState({color: event.target.value})
    }


    render() {
        return (
            <div className="myMap">
                <h1 style={{ textAlign: "center" }}>Map</h1>
                <MapContainer style={{height:"80vh"}} zoom={2} center={[20,50]}>
                    <GeoJSON style={this.countryStyle} data={mapData.features} onEachFeature={this.onEachCountry} />
                </MapContainer>
                <input type="color" 
                value={this.state.color}
                 onChange={this.colorChange}/>
            </div>
            
        );
    
    }
}

export default MyMap;
