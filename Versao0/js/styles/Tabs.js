import { StyleSheet } from 'react-native';
import { scale, scaleModerate, scaleVertical } from '../utils/scale';


var background = '#3BA2DC';

export default StyleSheet.create({
  overlayContainerInfo: {
    flex: 1,
    backgroundColor: background,
    alignItems: 'center',
  },
  overlayContainer: {
    flex: 1,
    backgroundColor: background
  },
  loadContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: background
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '8%'
  },
  rating: {
    backgroundColor: background,
    paddingVertical: '5%',
    paddingHorizontal: '5%',
    borderRadius: 100,
  },
  TextInput: {
    textAlignVertical: "top"
  },
  icon: {
    width: '5%',
    height: '5%',
  },
  forms: {
    justifyContent: 'center',
  },
  header_aval: {
    color: 'white',
    fontSize: 50,
    paddingTop: '5%',
  },
  markerHere: {
    height: '2%',
    width: '2%',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 20 / 2,
    overflow: 'hidden',
    backgroundColor: '#007AFF'
  },
  map: {
    position: 'absolute',
    top: '0.5%',
    bottom: '1%',
    left: '1%',
    right: '1%',
  },
  cardMapContainer: {
    flex: 1, //apagar
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: background,
  },
  erroGPSText: {
    color: 'white',
    fontSize: 28,
    padding: '2%',
    paddingLeft: '4%',
    paddingRight: '4%',
  },
  PediroReq_screen: {
    padding: '1.6%',
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: background
  },
  PediroReq_row: {
    flexDirection: 'row',
    paddingHorizontal: '1.75%',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'black',
    alignItems: 'center',
  },
  PediroReq_content: {
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  PediroReq_button: {
    marginVertical: '2%'
  },
  PediroReq_footer: {
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  HotelHome_overlayContainer: {
    flex: 1,
    backgroundColor: background,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  HotelHome_top: {
    height: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  HotelHome_imageContainer: {
    width: '60%',
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  HotelHome_header: {
    alignSelf: 'center'
  },
  HotelHome_image: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
    opacity: 0.8,
  },
  HotelHome_icon: {
    width: '5%',
    height: '5%',
  },
  HotelHome_hotelDescription: {
    color: 'black',
    fontSize: 28,
    justifyContent: 'flex-end'
  },
  HotelHome_descText: {
    color: 'black',
    fontSize: 16,
    paddingBottom: 2,
    backgroundColor: background,
    paddingLeft: 2,
    paddingRight: 2,
    paddingTop: 1
  },
  HotelHome_footerText: {
    color: 'black',
    fontSize: 10.5,
  },
  HotelHome_footerText2: {
    color: 'black',
    fontSize: 10.5,
  },
  HotelHome_contenteC:{
    borderColor: 'white',
    paddingHorizontal:'4%',
    paddingTop: 0
  },
  Login_screen: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: scaleVertical(24),
    justifyContent: 'space-between',
    backgroundColor: background
  },
  Login_screenHorizontal: {
    flex: 1,
    justifyContent: 'space-around',
    paddingVertical: scaleVertical(24),
    backgroundColor: background,
    flexDirection: 'row',
  },
  Login_header: {
    alignItems: 'center',
    backgroundColor: background,
    justifyContent: 'space-around'
  },
  Login_image: {
    marginVertical: scaleVertical(17),
    height: scaleVertical(300),
    resizeMode: 'contain'
  },
  Login_content: {
    alignItems: 'center'
  },
  Login_Horizontalcontent: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: '5%'
  },
  Login_Horizontalimage: {
    marginHorizontal: scale(17),
    height: scaleVertical(200),
    width: scale(200),
    resizeMode: 'contain'
  },
  Login_save: {
  
  },
  HotelList_contentContainer: {
    backgroundColor: '#f9f9f9'
},
HotelList_cardContainer: {
  paddingVertical: '1%',
  flex : 1

},
HotelHome_card:{
  flex: 1,
  alignSelf: 'stretch',
  backgroundColor: background
}
});