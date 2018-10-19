import React, {Component} from 'react';
import {Platform, StyleSheet, Button, Text, ToastAndroid, View,
   PermissionsAndroid} from 'react-native';
import MapView from 'react-native-maps';
import {createStackNavigator} from 'react-navigation';
import { AsyncStorage } from "react-native"

class App extends Component{
  constructor(props) {        //We set the constructor normally
    super(props);

    this.state = {            //We set the sate to null to then fill with data
      latitude: null,
      longitude: null,
      error: null,
      position: null,
    };
  }

  componentDidMount() {       //When it mounts or loads, it will execute this
    this.watchId = navigator.geolocation.watchPosition(   //This uses the watchId API to get
      (position) => {                             //geolocation data and saves it to the state
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
          position: position,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000,     // Extra options to get maximum efficiency
        maximumAge: 1000, distanceFilter: 10 },
    );
    if(this.state.position != null) {   //Trying to know if the state was modified and 
      _storeData = async () => {        //saving the data with asynStorage to use it on
        try {                           //the whole app
          await AsyncStorage.setItem('key', this.state.position);
        } catch (error) {
          ToastAndroid.show('Error while storing data',   //If for some reason it fails, a Toast
           ToastAndroid.SHORT);                           //notification appears (on android)
        }
      }
    }
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);  //After it finishes, it clears the watcher
  }

  render() {
    return (
      <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Latitude: {this.state.latitude}</Text>
        <Text>Longitude: {this.state.longitude}</Text>
        {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
        <Button
          title="Go to Data"
          onPress={() => this.props.navigation.navigate('Data')}
        />
      </View>
    );
  }
}
class Data extends Component{
  constructor(props) {
    super(props);

    this.state = {
      data : 'null'
    };
  }
  
  componentDidMount(){
    _retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem('key');
        if (value !== null) {
          this.setState = ({
            data: value
          });
        }else{
          this.setState = ({
            data: 'keonda'
          })
        }
       } catch (error) {
        
       }
    }
  }


  render() {
    return (
      <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Otra ventanta</Text>
        <Text>{this.state.data}</Text>
      </View>
    );
  }
}
export default createStackNavigator({     //This is the default export, for which we route it 
  Home: {                                 //towards our main class (App) to visualise it and
    screen: App                           //we add another router towards the second class (Data)
  },
  Data: {
    screen: Data
  },
});
