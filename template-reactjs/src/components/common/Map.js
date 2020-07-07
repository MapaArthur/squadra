import React, {Component} from 'react';

export default class Map extends Component{

    componentDidMount() {
        let {location, zoom} = this.props;
        this.map = new window.google.maps.Map(document.getElementById('map'), {
            center: {lat: location.latitude, lng: location.longitude},
            zoom: zoom
        });

        if(this.props.init){
            this.props.init(this.map);
        }
    }

    render() {
        return <div id="map" style={{width: "100%", height: "100%"}}>{this.props.children}</div>;
    }
}
