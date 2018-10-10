import React, {Component} from 'react';
import {Platform, StyleSheet, Button, Text, View, PermissionsAndroid} from 'react-native';
import MapView from 'react-native-maps';

export default class App extends Component{
  constructor(props) {
    super(props);
    
    this.state = {
      latitude: null,
      longitude: null,
      error: null,
    };
    this.region = {
        latitude: 29.064334,
        longitude: -110.984752,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,      
    }
    }
    
    componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
           });
           },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 25000, maximumAge: 3600000 },
    );}

     render() {
    return (
      <MapView style = {styles.map}
        initialRegion= {this.region}/>

      );
     }
    }
    const styles = StyleSheet.create({
      map: {
        ...StyleSheet.absoluteFillObject,
      },
    });