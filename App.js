import React, {Component} from 'react';
import {Platform, StyleSheet, Button, Text, ToastAndroid, View, PermissionsAndroid} from 'react-native';
import MapView from 'react-native-maps';
import {createStackNavigator} from 'react-navigation';
import { AsyncStorage } from "react-native"

class App extends Component{
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      position: null,
    };
  }

  componentDidMount() {
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
          position: position,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
    );
    if(this.state.position != null) {
      _storeData = async () => {
        try {
          await AsyncStorage.setItem('key', this.state.position);
        } catch (error) {
          ToastAndroid.show('Error while storing data', ToastAndroid.SHORT);
        }
      }
    }
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
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
export default createStackNavigator({
  Home: {
    screen: App
  },
  Data: {
    screen: Data
  },
});
