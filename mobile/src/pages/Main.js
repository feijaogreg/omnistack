import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { requestPermissionAsync, getCurrentPositionAsync } from 'expo-location';

function Main() {
    const [currentRegion, setCurrentRegion] = useState(null);

    useEffect(() => {
        async function loadInitialPosition() {
            const { granted } = await requestPermissionAsync();

            if (granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                });

                const { latitude, longitude } = coords;

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04,
                });
            }
        }

        loadInitialPosition();
    }, [])

    if (!currentRegion) {
        return null;
    }

    return (
    <MapView initialRegion={currentRegion} style={styles.map}>

    </Mapview>
    );
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    
})

export default Main;