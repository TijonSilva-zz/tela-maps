
import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Dimensions, Platform, PermissionsAndroid, BackHandler} from 'react-native';

import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';
import configs from './configs';

const { width, height } = Dimensions.get('screen');



export default function App() {
const [region, setRegion] = useState(null);
const [marker, setMarker] = useState([
  {id:1,localizations: {
    latitude: -23.5465, longitude: -46.6907
  }, title: 'Ponto 1' },
  {id:2, localizations: {
    latitude: -23.5468, longitude: -46.6902 
  }, title: 'Ponto 2' },
  {id:3, localizations: {
    latitude: -23.5459, longitude: -46.6909
  }, title: 'Ponto 3' },
  {id:4, localizations: {
    latitude: -23.5454, longitude: -46.6897
  }, title: 'Ponto 4' },
  {id:5, localizations: {
    latitude:-23.5464, longitude: -46.6903
  }, title: 'Ponto 4' },
]);

useEffect(() => {
  getMylocation(

  )
}, []);

function getMylocation(){
  Geolocation.getCurrentPosition(info => {
    console.log("Latitude: ",info.coords.latitude);
    console.log("Longitude: ",info.coords.longitude);

    setRegion({
      latitude: info.coords.latitude,
      longitude: info.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    })

  },
  () => {console.log("error")}, {
    enableHighAccuracy: true,
    timeout: 2000,
  })
  
}


return (
  <View style={styles.container}>
          <MapView style={styles.mapStyle}
          onMapReady={() => {
            Platform.OS === 'android' ?
            PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
              .then (() => {
                console.log("usuario aceitouu")
              })
              : ""
            }}
  
              style={styles.mapStyle}
              initialRegion={region}
              showsUserLocation={true}
              minZoomLevel={17}
              zoomEnabled={true}
              loadingEnabled={true}
              mapType="terrain"
              
              
              >
                {marker.map((pontos) =>  
                  <Marker 
                  style={{width: 40, height: 40}}
                    key={pontos?.id}
                    coordinate={pontos.localizations}
                    image={pontos.id == 1 ? require('./image/verde.png'): require('./image/vermelho.png')}
                  />
                )}
 

                     <MapViewDirections
                origin={region}
                destination={{latitude:-23.5464, longitude: -46.6903}}
                apikey={configs.googleApi}
                strokeWidth={4}
                strokeColor="#00ff00"
              />
              
          </MapView>
  </View>
);
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  alignItems: 'center',
},
mapStyle: {
  width: width,
  height: height
}
});
