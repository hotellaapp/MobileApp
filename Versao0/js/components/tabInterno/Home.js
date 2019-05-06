import React, { Component } from 'react';
import { Text, View, Image, Button, StyleSheet, ScrollView } from 'react-native';
import { RkCard, RkText, RkTheme, RkTabView, RkType } from 'react-native-ui-kitten';
import { strings } from '../../../locales/i18n';
import styles from '../../styles/Tabs';
export default class Home extends React.Component {
    static navigationOptions = {
        tabBarLabel: strings('user_Menu.Home'),
        showLabel: false,
        tabBarIcon: ({ tintColor }) => (
            <Image
                key={5}
                source={require('../../../assets/icons/hotel.png')}
                style={[styles.HotelHome_icon]}
            />
        )
    }


    render() {
        return (
            <View style={styles.HotelHome_overlayContainer}>
                <RkCard rkType='backImg' style={styles.HotelHome_card} >
                    <Image rkCardImg resizeMode='contain' key={12} source={require('../../../images/storcato.png')} />
                    <ScrollView rkCardContent  style={styles.HotelHome_contenteC}>
                        <RkText style={{textAlign:'left'}}>
                            A ruralidade no seu esplendor, o sentido religioso e espiritualidade de S. Torcato permite pensar esta freguesia como um espaço geográfico que melhor representa a autenticidade de toda uma região, o verdadeiro espírito do Minho profundo.
                        A qualidade arquitetónica do Vale de S. Torcato está também na qualidade dos equipamentos e espaços contíguos às unidades de habitação. 
                        </RkText>
                    </ScrollView >
                    <View rkCardFooter style={{backgroundColor:'#3366ff', paddingHorizontal:'5%'}} >
                      
                            <RkText style={styles.HotelHome_footerText}>
                                Telefone: +351 253 534 008
                    </RkText>

                            <RkText style={styles.HotelHome_footerText2}>
                                EMAIL: geral@valedestorcato.pt
                    </RkText>
                     
                    </View>

                </RkCard>
            </View>
        );
    }
}

