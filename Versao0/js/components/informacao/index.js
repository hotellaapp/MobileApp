import React, { Component } from 'react';
import { Dimensions, Text, View, Image, Button, StyleSheet } from 'react-native';
import { RkCard, RkButton, RkText } from 'react-native-ui-kitten';
import { strings } from '../../../locales/i18n';
import styles from '../../styles/Tabs';

export default class Info extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            nome: this.props.navigation.state.params.name,
            img: this.props.navigation.state.params.img,
            desc: this.props.navigation.state.params.desc
        }
    }

    static navigationOptions = ({ navigation }) => ({
        title: "Informação",
        //title:  navigation.state.params.name,

    });

    render() {
        return (
            <View style={styles.overlayContainerInfo}>
                <RkCard style={{ flex: 1, alignSelf: 'stretch' }}>
                    <View rkCardHeader  >
                        <RkText>{this.state.nome}</RkText>
                    </View>
                    <Image rkCardImg resizeMode='stretch' source={{ uri: this.state.img }} />
                    <View rkCardContent>
                        <Text>{this.state.desc}</Text>
                    </View>

                </RkCard>
            </View>
        );
    }
}