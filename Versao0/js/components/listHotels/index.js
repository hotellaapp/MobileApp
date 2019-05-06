import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    ListView,
} from 'react-native';
import { connect } from "react-redux";
import { DrawerNavigator, NavigationActions, TabNavigator } from "react-navigation";
import { Grid, Row } from "react-native-easy-grid";
import styles from '../../styles/Tabs';
import { setIndex } from "../../actions/list";
import { openDrawer } from "../../actions/drawer";
import { RkCard, RkButton, RkText } from 'react-native-ui-kitten';
import Accordion from '@ercpereda/react-native-accordion';

const background1 = require('../../../images/soloLogo.png');
const Dimensions = require('Dimensions');


const FixedHeight = Dimensions.get('window').height
const FixedWidth = Dimensions.get('window').height


const Header = ({ isOpen }) =>
    <View style={{
        paddingTop: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#a9a9a9',
        backgroundColor: '#f9f9f9',
    }}>
        <Text>{`${isOpen ? '-' : '+'} Hotel Sao Torcato`}</Text>
        <Image rkCardImg style={{
            height: 0.4 * FixedHeight,
            width: '100%',
            //aspectRatio: 1.02,
            resizeMode: 'stretch',
        }} key={2} source={{uri: 'https://valedestorcato.pt/wp-content/uploads/2018/06/095.jpg'}} />
    </View>;


const Header2 = ({ isOpen }) =>
    <View style={{
        paddingTop: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#a9a9a9',
        backgroundColor: '#f9f9f9',
    }}>
        <Text>{`${isOpen ? '-' : '+'} Hotel Villa Garden`}</Text>
        <Image rkCardImg style={{
            height: 0.4 * FixedHeight,
            width: '100%',
            resizeMode: 'stretch',

        }} key={14} source={require('../../../images/villagarden.jpeg')}  />

    </View>;


const Header3 = ({ isOpen }) =>
    <View style={{
        paddingTop: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#a9a9a9',
        backgroundColor: '#f9f9f9',
    }}>
        <Text>{`${isOpen ? '-' : '+'} Hotel Villa Garden`}</Text>
        <Image rkCardImg style={{
            height: 0.4 * FixedHeight,
            width: '100%',
            resizeMode: 'stretch',

        }} key={14} source={require('../../../images/villagarden.jpeg')}  />

    </View>;

const Content = (
    <ScrollView contentContainerStyle={styles.HotelList_contentContainer}>
        <View style={styles.HotelList_cardContainer}>
            <RkCard rkType='shadowed'>
                <View rkCardHeader>
                    <RkText>Hotel S. Torcato</RkText>
                </View>
                <View rkCardContent>
                    <Text>  A ruralidade no seu esplendor, o sentido religioso e espiritualidade de S. Torcato permite pensar esta freguesia como um espaço geográfico que melhor representa a autenticidade de toda uma região, o verdadeiro espírito do Minho profundo.
                    A qualidade arquitetónica do Vale de S. Torcato está também na qualidade dos equipamentos e espaços contíguos às unidades de habitação. É um parâmetro de diferenciação evidente que se caracteriza por espaços de estar comuns integrados nas áreas de jardim e piscina coletiva.
                    O empreendimento do Vale de S. Torcato tem o certificado de qualidade que acrescenta mais valias ao património construído da freguesia de S. Torcato, pelas referências que estabelece e evidencia; pela preocupação de integração a favor do espaço público; pela disponibilidade de qualidade na oferta de alojamento turístico e pelo esforço de quem se pretende diferenciar pela qualidade. </Text>
                </View>
                <View rkCardFooter style={{ paddingHorizontal: 15 }} >
                    <RkButton rkType='small outline'
                        onPress={() => {
                            this.props.navigation.navigate('ServicosExternos', {
                                name: 'Servicos Externos'
                            })
                        }}>
                        Show More

                        </RkButton>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.HotelHome_footerText2} style={{ paddingHorizontal: '10%' }}>
                            Telefone: +351 253 534 008
                </Text>
                    </View>
                </View>
            </RkCard>
        </View>

    </ScrollView>
);

const Content2 = (
    <ScrollView contentContainerStyle={styles.HotelList_contentContainer}>
        <View style={styles.HotelList_cardContainer}>
            <RkCard rkType='shadowed'>
                <View rkCardHeader>
                    <RkText>Hotel Villa Garden</RkText>
                </View>
                <View rkCardContent>
                    <Text> O Villa Garden Braga resulta da completa recuperação de um palacete do final do século XIX, convertido num acolhedor hotel de charme equipado com as melhores condições de espaço e ambiente para oferecer aos hóspedes uma estadia totalmente confortável e tranquila. Todos os 24 quartos assim como as 02 suites. </Text>
                </View>
                <View rkCardFooter style={{ paddingHorizontal: 15 }} >
                    <RkButton rkType='small outline'
                        onPress={() => {
                            this.props.navigation.navigate('ServicosExternos', {
                                name: 'Servicos Externos'
                            })
                        }}>
                        Show More

                    </RkButton>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.HotelHome_footerText2} style={{ paddingHorizontal: '10%' }}>
                            Telefone: +351 253 142 008
            </Text>
                    </View>
                </View>
            </RkCard>
        </View>

    </ScrollView>
)

const Content3= (
    <ScrollView contentContainerStyle={styles.HotelList_contentContainer}>
        <View style={styles.HotelList_cardContainer}>
            <RkCard rkType='shadowed'>
                <View rkCardHeader>
                    <RkText>Hotel Villa Garden</RkText>
                </View>
                <View rkCardContent>
                    <Text> O Villa Garden Braga resulta da completa recuperação de um palacete do final do século XIX, convertido num acolhedor hotel de charme equipado com as melhores condições de espaço e ambiente para oferecer aos hóspedes uma estadia totalmente confortável e tranquila. Todos os 24 quartos assim como as 02 suites. </Text>
                </View>
                <View rkCardFooter style={{ paddingHorizontal: 15 }} >
                    <RkButton rkType='small outline'
                        onPress={() => {
                            this.props.navigation.navigate('ServicosExternos', {
                                name: 'Servicos Externos'
                            })
                        }}>
                        Show More

                    </RkButton>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.HotelHome_footerText2} style={{ paddingHorizontal: '10%' }}>
                            Telefone: +351 253 142 008
            </Text>
                    </View>
                </View>
            </RkCard>
        </View>

    </ScrollView>
)

class Hotels extends React.Component {
    static navigationOptions = {
        title: 'Hotels',
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Accordion
                        header={Header}
                        content={Content}
                        duration={300}
                    />
                    <Accordion
                        header={Header2}
                        content={Content2}
                        duration={300}
                    />
                    <Accordion
                        header={Header3}
                        content={Content3}
                        duration={300}
                    />
                </View>
            </ScrollView>
        );
    }


}




export default Hotels;