import React, { Component } from 'react';
import { RefreshControl, TouchableHighlight, ActivityIndicator, Dimensions, ScrollView, StyleSheet, Text, View, Image, Button } from 'react-native';
import MapView from 'react-native-maps';
import { strings } from '../../../locales/i18n';
import { openDrawer } from "../../actions/drawer";
import styles from '../../styles/Tabs';

import { RkCard, RkButton, RkText, RkImage } from 'react-native-ui-kitten';
const { width, height } = Dimensions.get('window')

const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
const paddingValue = 8;


export default class PontosTuristicos extends React.Component {
    static navigationOptions = {
        tabBarLabel: strings('user_Menu.InterestPoints'),
        tabBarIcon: ({ tintColor }) => (
            <Image
                key={6}
                source={require('../../../assets/icons/placeholder.png')}
                style={[styles.icon]}
            />
        )
    }

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isRefreshing: false,
            region: {
                latitude: null,
                longitude: null,
                latitudeDelta: null,
                longitudeDelta: null
            },
            markers: [

            ]
        }
        this.getData = this.getData.bind(this);
    };

    _calculateItemSize() {
        let { height, width } = Dimensions.get('window');
        return (width - paddingValue * 6) / 1.5;
    }

    calcDelta(lat, long, acc) {
        const oneD = 111.32;
        const circu = (40075 / 360);
        const latDelta = acc * (1 / (Math.cos(lat) * circu))
        const longDelta = (acc / oneD);

        this.setState({
            region: {
                latitude: lat,
                longitude: long,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1
            }
        })
    }

    componentWillMount() {
        this.getData();
    }

    getData() {

        navigator.geolocation.getCurrentPosition(
            (position) => {
                //const lat = position.coords.latitude
                //const long = position.coords.longitude
                const lat = 41.47849
                const long = -8.2581406
                const acc = position.coords.accuracy
                this.calcDelta(lat, long, acc)
                var refresh = this.state.isRefreshing;
                this.fetchData();

            }
            , (error) => this.gPSOFF())
    }

    gPSOFF() {
        var refresh = this.state.isRefreshing;
        this.setState({ isLoading: true, isRefreshing: false });

        //alert(JSON.stringify("PLZ TURN GPS ON to use the MAP!")) //ajuda do pedro dicionário
    }

    fetchData = async () => {
        const response = await fetch("https://hotella.herokuapp.com/api/informacao/all", );


        const json = await response.json();
        var arrayvar = this.state.markers.slice();
        for (i in json) {

            const newelement = {
                title: json[i].nome.trim().toString(),
                coordinates: {
                    latitude: json[i].latitude,
                    longitude: json[i].longitude
                },
                desc: json[i].descricao,
                img: json[i].caminho_imagem
            }
            arrayvar.push(newelement)

        }

        this.setState({ isLoading: false, isRefreshing: false, markers: arrayvar });
    };

    markerClick(titulo, desc, img) {
        this.props.navigation.navigate('Info', { name: titulo, desc: desc, img: img })
    }

    _onRefresh() {
        this.setState({ isLoading: true, isRefreshing: true });
        this.getData();

    }



    render() {

        if (this.state.isLoading) {
            return (
                <View style={styles.overlayContainer}>
                <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.isRefreshing}
                                onRefresh={this._onRefresh.bind(this)}
                            />
                        } 
                >
                <Text style={styles.erroGPSText}>{strings('map.gpsOFF')}</Text>
                </ScrollView>
                </View>
            );
        }

        let size = this._calculateItemSize();

        return (
            <View style={styles.overlayContainer}>
                <MapView
                    style={styles.map}
                    region={this.state.region}
                >
                    <MapView.Marker
                        key={8}
                        coordinate={this.state.region}
                        title={strings('map.here')}>
                        <View style={styles.markerHere}>
                        </View>
                    </MapView.Marker>
                    {this.state.markers.map(marker => (
                        <MapView.Marker
                            coordinate={marker.coordinates}
                            title={marker.title}
                        //onPress={(e) => { e.stopPropagation(); this.markerClick() }}
                        >
                            <MapView.Callout tooltip onPress={(e) => { e.stopPropagation(); this.markerClick(marker.title, marker.desc, marker.img) }}>
                                <View style={styles.cardMapContainer}>
                                    <RkCard style={{ width: size, height: size }}>
                                        <View rkCardHeader>
                                            <RkText>{marker.title}</RkText>
                                        </View>
                                        <Image rkCardImg key={8} source={{ uri: marker.img }} />
                                    </RkCard>
                                </View>
                            </MapView.Callout>
                        </MapView.Marker>
                    ))}
                </MapView>
            </View>
        );
    }
}

