import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ImageBackground,
  Dimensions,
  Image,
  Alert,
  SectionList,
} from 'react-native';
import { Svg } from 'react-native-svg';
import Swiper from 'react-native-swiper';
import Modal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import SegmentedControl from '@react-native-segmented-control/segmented-control';

import BackWhite from '../assets/BackWhite';
import BusTimeBg from '../assets/BusTimeBg';
import SeatRed from '../assets/SeatRed';
import UserWhite from '../assets/UserWhite';
import StarWhite from '../assets/StarWhite';
import SeatBtnIcon from '../assets/SeatBtnIcon';
import BoadingBtnIcon from '../assets/BoadingBtnIcon';
import SleeperSeat from '../assets/SleeperSeat';
import BlueStandLine from '../assets/BlueStandLine';
import { BackgroundImage } from '@rneui/base';
import SeatInfoScreen from './SeatInfoScreen';
import BusSeater from '../assets/BusSeater';
import BusLight from '../assets/BusLight';
import { search } from 'react-native-country-picker-modal/lib/CountryService';
const BusSeatSelectScreen = ({ props, navigation, route }) => {

  const [modalVisible, setModalVisible] = useState(false);

  const [selectedTab, setSelectedTab] = useState('All');

  const [selectedPrice, setSelectedPrice] = useState('500');

  const [selectedIndex, setSelectedIndex] = useState(0); // Initialize with default index

  const useThemeColor = route.params.themecolor

  const { screenTheme = 'Normal Coach' } = route.params || {};

  const operatorFontColor = (screenTheme === 'Luxury Coach') ? '#141414' : useThemeColor; // Default to black if not '#393939'

  const themeheaderFontColor = (screenTheme === 'Luxury Coach') ? '#141414' : '#FFFFFF'; // Default to black if not '#393939'

  const [selectSeatScreen, setSelectSeatScreen] = useState('SelectSeat');

  const selectedSeats = [];

  const onTabsSelectScreenClickPress = selectedTab => {
    setSelectSeatScreen(selectedTab);
  };

  const [lowerRow1, setLoweRow1] = useState(
    [{ id:1,isBooked: true, isSelected: false ,SeatLegend:'Unisex'},
    { id:2,isBooked: false, isSelected: false,SeatLegend:'Unisex'},
    { id:3,isBooked: false, isSelected: true ,SeatLegend:'Unisex'},
    { id:4,isBooked: false, isSelected: false,SeatLegend:'Unisex'},
    { id:5,isBooked: false, isSelected: false ,SeatLegend:'Women'},
    { id:6,isBooked: false, isSelected: false ,SeatLegend:'Women'},
    { id:7,isBooked: false, isSelected: false,SeatLegend:'Women' },
    { id:8,isBooked: true, isSelected: true ,SeatLegend:'Men'},
    { id:9,isBooked: true, isSelected: false,SeatLegend:'Men' },
   ]
  )
  const [LowerRow2, setLowerRow2] = useState(
    [{ id:1,isBooked: true, isSelected: false ,SeatLegend:'Unisex'},
      {id:2, isBooked: true, isSelected: false,SeatLegend:'Unisex'},
      { id:3,isBooked: false, isSelected: true ,SeatLegend:'Unisex'},
      { id:4,isBooked: false, isSelected: false,SeatLegend:'Unisex'},
      { id:5,isBooked: false, isSelected: false ,SeatLegend:'Women'},
      { id:6,isBooked: false, isSelected: false ,SeatLegend:'Women'},
      { id:7,isBooked: false, isSelected: false,SeatLegend:'Women' },
      { id:8,isBooked: false, isSelected: true ,SeatLegend:'Men'},
      { id:9,isBooked: false, isSelected: false,SeatLegend:'Men' },
      { id:10,isBooked: false, isSelected: false ,SeatLegend:'Unisex'},
    { id:11,isBooked: true, isSelected: false,SeatLegend:'Unisex'},
    { id:12,isBooked: true, isSelected: true ,SeatLegend:'Unisex'},
    { id:13,isBooked: true, isSelected: false,SeatLegend:'Unisex'},
    { id:14,isBooked: true, isSelected: false ,SeatLegend:'Women'},
    { id:15,isBooked: true, isSelected: false ,SeatLegend:'Women'},
    { id:16,isBooked: true, isSelected: false,SeatLegend:'Women' },
    { id:17,isBooked: true, isSelected: true ,SeatLegend:'Men'},
    { id:18,isBooked: true, isSelected: false,SeatLegend:'Men' },
    { id:19,isBooked: true, isSelected: true ,SeatLegend:'Men'},
    {id:20, isBooked: true, isSelected: false,SeatLegend:'Men' },
   ]
  )
  const [lowerLastRow, setLowerLastRow] = useState(
    [ {id:1, isBooked: true, isSelected: true ,SeatLegend:'Men'},
      { id:2,isBooked: true, isSelected: false,SeatLegend:'Men' },
   ]
  )

  const [upperRow1, setUpperRow1] = useState(
    [ { id:1,isBooked: true, isSelected: false,SeatLegend:'Women' },
      { id:2,isBooked: true, isSelected: true ,SeatLegend:'Men'},
      { id:3,isBooked: true, isSelected: false,SeatLegend:'Men' },
      { id:4,isBooked: false, isSelected: true ,SeatLegend:'Unisex'},
      {id:5, isBooked: true, isSelected: false,SeatLegend:'Unisex' },
   ]
  )

  const [upperRow2, setUpperRow2] = useState(
    [ { id:1,isBooked: true, isSelected: false,SeatLegend:'Women' },
      { id:2,isBooked: true, isSelected: true ,SeatLegend:'Men'},
      { id:3,isBooked: false, isSelected: false,SeatLegend:'Unisex' },
      { id:4,isBooked: false, isSelected: true ,SeatLegend:'Unisex'},
      {id:5, isBooked: true, isSelected: false,SeatLegend:'Men' },
      { id:6,isBooked: false, isSelected: false,SeatLegend:'Women' },
      { id:7,isBooked: false, isSelected: true ,SeatLegend:'Unisex'},
      { id:8,isBooked: true, isSelected: false,SeatLegend:'Men' },
      { id:9,isBooked: false, isSelected: true ,SeatLegend:'Men'},
      { id:10,isBooked: true, isSelected: false,SeatLegend:'Men' },
  ]
  )


//Filter Listview and Row
const HorizontalFilterListItem = ({item}) => {
  console.log('item---',item)
  return (
    <TouchableOpacity style ={{overflow:'hidden',}} onPress={() => OnClickCategoryList(item)}>
      <View style={[{    flexDirection: 'row',
          alignItems: 'center',
          justifyContent:'center',
          backgroundColor:'#FFFFFF',
          minWidth:50,
          height:'100%',
          padding: 5,
          marginRight: 1,},{backgroundColor:(selectedTab === item)? `${hexToRGB('#FFFFFF', 0.5)}`:'#FFFFFF'}]}>
      <Text style={[{ fontSize: 12,
          fontWeight: '600',
          fontFamily:'Inter',
          textAlign:'center',
          color:(selectedTab === item)? '#FFFFFF':useThemeColor,
          lineHeight:14,}]}>{item}</Text>
    </View>
    </TouchableOpacity>
  );
};

const OnClickCategoryList = (item) => {
  setSelectedTab(item);

};

  const BusBookingDetails = ({ details, isExpanded }) => (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        top: 15,
        backgroundColor: '#FFF',
        // shadowColor: 'gray',
        // shadowOpacity: 0.8,
        // shadowRadius: 2,
        // shadowOffset: {
        //   height: 1,
        //   width: 0,
        // },
      }}>
       <ImageBackground  source= { (screenTheme === 'Luxury Coach')? require('../assets/journeyBg.png') :''}  style={ { elevation: 2,
        padding: 5, 
        flex:1,
        backgroundColor: '#FFF',
        }}   
        imageStyle={{ borderRadius: 15 , borderWidth: 1.3,borderColor: (screenTheme === 'Luxury Coach')? 'rgba(215, 147, 20, 0.7)' : 'rgba(31, 72, 124, 0.7)',
        }} >
      <View style={{ paddingTop: 8, flexDirection: 'row' }}>
        <View style={{ paddingTop: 8, width: '66%' }}>
          <Text
            style={{
              fontSize: 10,
              padding: 8,
              lineHeight: 12,
              fontWeight: '400',
              fontFamily: 'Inter',
              color: operatorFontColor,
              textAlign: 'center',
            }}>
            A/C Sleeper (2+1)
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              height: 40,
            }}>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{
                fontSize: 12, lineHeight: 15,
                fontWeight: '400',
                fontFamily: 'Inter', color: operatorFontColor, textAlign: 'left'
              }}>
                20 Feb
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  lineHeight: 19,
                  fontWeight: '700',
                  fontFamily: 'Inter',
                  color: operatorFontColor,
                  fontWeight: 'bold',
                  textAlign: 'left',
                }}>
                18:30
              </Text>
            </View>
            <View
              style={{
                position: 'relative',
                flex: 1,
                paddingHorizontal: 5,
                height: 38,
                bottom: 0,
              }}>
              <BusTimeBg width="100%" height="100%" color= {useThemeColor} />
              <Text
                style={{
                  position: 'absolute',
                  top: 10,
                  left: 5,
                  width: '100%',
                  textAlign: 'center',
                  color: '#FFFFFF',
                  fontSize: 10,
                  fontFamily: 'Inter',
                  fontWeight: '600'
                }}>
                10:30 Hrs
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 12, lineHeight: 15,
                  fontWeight: '400',
                  fontFamily: 'Inter', color: operatorFontColor, textAlign: 'right'
                }}>
                21 Feb
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  lineHeight: 19,
                  fontWeight: '700',
                  fontFamily: 'Inter',
                  color: operatorFontColor,
                  fontWeight: 'bold',
                  textAlign: 'right',
                }}>
                01:30
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            marginHorizontal: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Svg style={{ width: 4 }}>
            <BlueStandLine width="100%" height="92" color={useThemeColor}/>
          </Svg>
        </View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 5,
            gap:3
          }}>
          <View
            style={{
              flexDirection: 'row',
              borderColor: '#2CA103',
              borderWidth: 1,
              justifyContent: 'center',
              alignItems: 'center',
              height: 24,
              borderRadius: 5,
              bottom: 8,
              overflow:'hidden'
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                backgroundColor: '#2CA103',
              }}>
              <Svg style={{ width: 16, height: '100%', marginHorizontal: 3 }}>
                <StarWhite width="100%" height="100%" />
              </Svg>
              <Text
                style={{
                  fontSize: 11,
                  fontFamily: "Inter",
                  fontWeight: '400',
                  lineHeight: 13,
                  color: '#FFFFFF',
                }}>
                4.0
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                height:'100%'
              }}>
              <Svg style={{ width: 14, height: 14, marginHorizontal: 2 }}>
                <UserWhite width="90%" height="90%" />
              </Svg>
              <Text
                style={{
                  fontSize: 11,
                  fontFamily: "Inter",
                  fontWeight: '400',
                  lineHeight: 13,
                  color: '#2CA103',
                  paddingRight: 5,
                }}>
                8.8k
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#FFC1C1',
              justifyContent: 'center',
              alignItems: 'center',
              height: 24,
              borderRadius: 12,
            }}>
            <Svg style={{ width: 14, height: 14, margin: 5 }}>
              <SeatRed width="90%" height="90%" />
            </Svg>
            <Text
              style={{
                fontSize: 10,
                color: '#C62B2B',
                fontWeight: 'bold',
                paddingRight: 5,
              }}>
              7 Seats left
            </Text>
          </View>
          <Text
            style={{
              fontSize: 12,
              fontFamily: 'Inter',
              fontWeight: '500',
              lineHeight: 15,
              color: operatorFontColor,
              textAlign: 'center',
              top: 5,
            }}>
            5 Window Seats
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          borderColor: useThemeColor,
          borderBottomRightRadius: 15,
          borderBottomLeftRadius: 15,
          borderWidth: 1,

          flex: 1,
          backgroundColor: (screenTheme === 'Luxury Coach') ? '#FFEEC9' : '#EEEDED',
        }}>
        <View
          style={{
            backgroundColor: useThemeColor,
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 40,
            width: '104%',
            borderBottomRightRadius: 4,
            borderTopRightRadius: 4,
            position: 'relative',
            top: -1,
            left: 0,
            flexDirection: 'row',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              height:33,
              width: '98%',
              overflow:'hidden',
              position: 'relative',

            }}>
         
            <View style={{height: 30,borderRadius:5,overflow:'hidden',paddingHorizontal:10}}>
            <FlatList
            data={['All','₹ 500','₹ 500','₹ 500','₹ 500',]}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item}
            contentContainerStyle={{ borderRadius:5,overflow:'hidden' }}
            renderItem={({item, index}) => (
              <HorizontalFilterListItem item={item} Index={index} />
            )}
          />
            </View>
            {/* <SegmentedControl
            style= {{height:30,width:'80%'}}
              values={['All', '₹ 500','₹ 500','₹ 500','₹ 500']}
              selectedIndex={selectedIndex}
              onChange={(event) => {
                setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
              }}
            /> */}
           
            {/* <View style={styles.infoView}>
              <TouchableOpacity
                onPress={() => onTabsTopbarClickPress('All')}
                style={[
                  styles.infoTab,
                  selectedTab === 'All' && {
                    backgroundColor: `${hexToRGB(useThemeColor, 0.5)}`,
                  },
                ]}>
                <Text
                  style={[
                    styles.infotabTitle, {
                      color: useThemeColor,
                    },
                    selectedTab === 'All' && styles.InfotabTitleActive,
                  ]}>
                  {'All'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onTabsTopbarClickPress('Price')}
                style={[
                  styles.infoTab,
                  selectedTab === 'Price' && { backgroundColor: `${hexToRGB(useThemeColor, 0.5)}` },
                ]}>
                <Text
                  style={[
                    styles.infotabTitle, {
                      color: useThemeColor,
                    },
                    selectedTab === 'Price' && styles.InfotabTitleActive,
                  ]}>
                  {'RS500'}
                </Text>
              </TouchableOpacity>
            </View> */}
          </View>
          
          <View style={{
            position: 'absolute',
            right: 0,
            bottom: -8,
            backgroundColor: "transparent",
            borderStyle: "solid",
            borderRightWidth: 8,
            borderTopWidth: 10,
            borderRightColor: "transparent",
            borderTopColor: useThemeColor
          }}>

          </View>
        </View>
        <View style={styles.ViewTabs}>
          
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}>
               <TouchableOpacity  onPress={() => setModalVisible(true)}>
            <Image
              source={require('../assets/SeatInfoIcon.png')}
              style={{ width: 18, height: 18,marginRight:8,tintColor:(screenTheme === 'Luxury Coach') ? '#D89E2F' :useThemeColor
              }}
            />
            </TouchableOpacity>
            <Svg style={{ width: 18, height: 21, marginRight: 5 }}>
              <SeatBtnIcon width="100%" height="100%" color="#E92E3D" />
            </Svg>

            <TouchableOpacity
              style={[
                styles.tab,
                selectSeatScreen === 'SelectSeat' && styles.tabActive, { borderBottomColor: useThemeColor },
              ]}
              onPress={() => onTabsSelectScreenClickPress('SelectSeat')}>
              <Text
                style={[
                  styles.tabTitle,
                  selectSeatScreen === 'SelectSeat' && {
                    fontSize: 13,
                    fontWeight: '500',
                    color: useThemeColor,
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                  },
                ]}>
                {'Select your Seats'}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Svg style={{ width: 18, height: 18, marginRight: 3 }}>
              <BoadingBtnIcon
                width="100%"
                height="100%"
                // color={
                //   selectSeatScreen === 'BoardingPoint'
                //     ? 'rgba(31, 72, 124, 0.5)'
                //     : 'white'
                // }
                // color1={
                //   selectSeatScreen === 'BoardingPoint' ? '#1F487C' : '#000000'
                // }
              />
            </Svg>
            <TouchableOpacity
              onPress={() => onTabsSelectScreenClickPress('BoardingPoint')}
              style={[
                styles.tab,
                selectSeatScreen === 'BoardingPoint' && styles.tabActive, { borderBottomColor: useThemeColor },
              ]}>
              <Text
                style={[
                  styles.tabTitle,
                  selectSeatScreen === 'BoardingPoint' && {
                    fontSize: 13,
                    fontWeight: '500',
                    color: useThemeColor,
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                  },
                ]}>
                {'Boarding & Drop Point'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {selectSeatScreen === 'SelectSeat' ? (
          <View style={{ flex: 1, width: '100%' }}>
            <BookBusSeatView BusSeatsData={null} />
          </View>
        ) : (
          <View style={{ flex: 1, width: '100%' }}>
            <BoardingDropPointView BusBoardingData={null} />
          </View>
        )}
        <View
          style={{
            width: '100%',
            
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <BackgroundImage
          source={(screenTheme === 'Luxury Coach') ? require('../assets/luxuryContBg.png' ):''} 
            style={{
              height: 60,
              flexDirection: 'row',
              margin: 10,
              // borderColor: '#001938',
              // borderWidth: 1,
              // borderRadius: 10,
              justifyContent: 'center',
              flex:1,
              backgroundColor:(screenTheme === 'Luxury Coach') ? '#D89E2F' :useThemeColor,
              borderRadius: 10,
            }} 
            imageStyle={{borderWidth: 1,
              borderColor:(screenTheme === 'Luxury Coach') ? '#D89E2F' : '#001938',
              borderRadius: 10,}}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <View style={{ marginLeft: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ justifyContent: 'flex-start', gap: 5 }}>
                  <Text style={{ color: (screenTheme === 'Luxury Coach')? useThemeColor:'white', fontWeight: '700', fontFamily: 'Inter', fontSize: 15, }}>L18</Text>
                  <Text style={{
                    fontWeight: '400', fontSize: 15,
                    fontFamily: 'Inter',
                    lineHeight: 16, color: (screenTheme === 'Luxury Coach')? useThemeColor :'white'
                  }}>
                    Selected Seat
                  </Text>
                </View>

                <View style={{ justifyContent: 'flex-end', gap: 5 }}>
                  <Text style={{ alignSelf: 'flex-end', fontWeight: '700', fontFamily: 'Inter', fontSize: 15, color: (screenTheme === 'Luxury Coach')? useThemeColor:'white' }}>
                    ₹ 800
                  </Text>
                  <Text
                    style={{
                      fontWeight: '400', fontFamily: 'Inter', fontSize: 15,
                      alignSelf: 'flex-end',
                      fontWeight: '500',
                      color: (screenTheme === 'Luxury Coach')? useThemeColor :'white',
                    }}>
                    Price
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ alignSelf: 'center' }}>
              <Image
                source={require('../assets/Linewhite.png')}
                style={{ width: 1.5, margin: 10, height: 36 ,tintColor:(screenTheme === 'Luxury Coach')? useThemeColor:'#FFFFFF'}}
              />
            </View>
            <View style={{ alignSelf: 'center', paddingRight: 15 }}>
              <TouchableOpacity style={[styles.cornerbutton,(screenTheme === 'Luxury Coach') ? {backgroundColor: useThemeColor, }:{backgroundColor: '#fff', }]} onPress={() => {
                navigation.navigate('TravelerScreenDetails',  {
                      screenTheme: screenTheme,
                      themecolor:useThemeColor,
                      themeColor2:route.params.themeColor2,
                    }
                  )
              }}>
                <Text style={{ fontWeight: '400', color: (screenTheme === 'Luxury Coach') ? '#FFFFFF' : useThemeColor, fontFamily: 'Inter', fontSize: 18, lineHeight: 22 }}>Continue</Text>
              </TouchableOpacity>
            </View>
          </BackgroundImage>
        </View>
      </View>
      </ImageBackground>
    </View>
  );

  const BookBusSeatView = ({ BusSeatsData }) => {
    return (
      <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 10, gap: 10,marginTop:8 }}>
        <View style={{ height: '100%', flex: 1.05,borderColor:(screenTheme === 'Luxury Coach') ? '#D89E2F' :useThemeColor,borderWidth:1, borderRadius: 8, backgroundColor: '#FFFFFF', }}>
          
          <View style={{ height: 50 }}>
            <View  style={{ width: '100%', height: 8,flexDirection:'row',justifyContent:'space-around',position:'absolute', marginTop:- 7, }} > 
            <Svg style={{ width: 14, height: 7 }}>
               <BusLight width="100%" height="100%" color= {(screenTheme === 'Luxury Coach') ? '#D89E2F' :useThemeColor} />
            </Svg>
            <Svg style={{ width: 14, height: 7 }}>
                  <BusLight width="100%" height="100%"  color= {(screenTheme === 'Luxury Coach') ? '#D89E2F' :useThemeColor}/>
            </Svg>
              
            </View>  

            <Text style={{ fontWeight: '400',marginTop:5, color: '#393939', fontFamily: 'Inter', fontSize: 10,textAlign:'center', lineHeight: 12 }}>LOWER BERTH (31)</Text>
            <Image source={require('../assets/stearing.png')}
              style={{ width: 18, height: 18, alignSelf: 'flex-end', marginTop:- 5, marginRight: 12 }} />
            <View style={{ width: 14, height: 22, marginTop:- 8, backgroundColor: (screenTheme === 'Luxury Coach') ? '#FFEEC9' :'#EEEDED',left:-1 ,borderColor:(screenTheme === 'Luxury Coach') ? '#D89E2F' :useThemeColor,borderTopWidth:1,borderBottomWidth:1,borderRightWidth:1}} />
          </View>
          <View style={{ flex: 1, backgroundColor: '#FFFFFF',overflow:'hidden', paddingHorizontal: 5,marginBottom:5,  flexDirection: 'row' }}>
            <View style= {{flex:1}} >
              <FlatList data={lowerRow1}
                renderItem={({ item, index }) => <NonSleeperRowView  SeatData={item} Index={index} SeatRow={'Row1'}/>}
              />
          <FlatList data={lowerLastRow}
           horizontal
           showsHorizontalScrollIndicator={false}
           keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => <BottomSeaterRowView SeatData={item} Index={index}/>}
              />
            </View>
            <View  style= {{flex:1}}>
              <FlatList data={LowerRow2}
                numColumns={2}
                renderItem={({ item, index }) => <NonSleeperRowView SeatData={item} Index={index}  SeatRow={'Row2'}/>}
              />
            </View>
          </View>
          {/* <View style = {{flex:1,paddingHorizontal: 6,paddingBottom:5}}>
          <FlatList data={lowerLastRow}
           horizontal
           showsHorizontalScrollIndicator={false}
           keyExtractor={item => item.id}
                renderItem={({ item, index }) => <BottomSeaterRowView index={index}/>}
              />
          </View> */}
        </View>
        <View style={{ height: '100%', flex: 1, borderRadius: 8,borderColor:(screenTheme === 'Luxury Coach') ? '#D89E2F' :useThemeColor,borderWidth:1, backgroundColor: '#FFFFFF' }}>
          <View style={{ height: 50 }}>
          <View  style={{ width: '100%', height: 8,flexDirection:'row',justifyContent:'space-around',position:'absolute', marginTop:- 7, }} > 
            <Svg style={{ width: 14, height: 7 }}>
               <BusLight width="100%" height="100%" color= {(screenTheme === 'Luxury Coach') ? '#D89E2F' :useThemeColor} />
            </Svg>
            <Svg style={{ width: 14, height: 7 }}>
                  <BusLight width="100%" height="100%"  color= {(screenTheme === 'Luxury Coach') ? '#D89E2F' :useThemeColor}/>
            </Svg>
              
            </View> 
          <Text style={{ fontWeight: '400',marginTop:5, color: '#393939', fontFamily: 'Inter', fontSize: 10,textAlign:'center', lineHeight: 12 }}>UPPER BERTH (15)</Text>
          </View>
          <View style={{ flex: 1, backgroundColor: '#FFFFFF',marginBottom:5, paddingHorizontal: 6, justifyContent: 'space-between', flexDirection: 'row' }}>
            <View>
              <FlatList data={upperRow1}
                renderItem={({ item, index }) => <SleeperRowView SeatData={item} Index={index} SeatRow={'Row1'}/>}
              />

            </View>
            <View>
              <FlatList data={upperRow2}
                numColumns={2}
                renderItem={({ item, index }) => <SleeperRowView SeatData={item} Index={index} SeatRow={'Row2'}/>}
              />
            </View>
          </View>

        </View>
      </View>
    );
  };

  const SleeperRowView = ({ SeatData,Index ,SeatRow}) => {
    return (<TouchableOpacity style={[{ marginHorizontal: 5,marginVertical:6,
     },(selectedPrice === 'All')&& {shadowColor: '#44AA21',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 1,
      shadowRadius: 3,
      elevation: 3, }]} onPress={() => {
        if (!SeatData.isBooked && SeatRow === 'Row1') 
          {
            onSelectUpperRow1(Index);
          }else if (!SeatData.isBooked && SeatRow === 'Row2'){
            onSelectUpperRow2(Index);
          }else{
            Alert.alert('Seat Already Booked');
          }
        
      }}
      disabled={SeatData.isBooked} 
      >
      <Svg style={{ width: 26, height: 68 }}>
        <SleeperSeat width="100%" height="100%" fillColor={getSeatFillColor(SeatData.isSelected,SeatData.isBooked,SeatData.SeatLegend)} strokeColor= {getSeatColor(SeatData.isSelected,SeatData.isBooked,SeatData.SeatLegend)}/>
      </Svg>
      {/* <Text style={[styles.rowTitle, { paddingTop: 3 }]}>$ 500</Text> */}
    </TouchableOpacity>);
  };

  const onSelectUpperRow1 = index => {
    let tempRow = [];
    tempRow = upperRow1;
    tempRow.map((item,ind)=>{
      if (index === ind){
        if (item.isSelected === true){
          item.isSelected = false;
        }else{
          item.isSelected = true;
        }
      }
    });
    let tempSeats = [];
    tempRow.map(item =>{
      tempSeats.push(item)
    })
    setUpperRow1(tempSeats);

  };
  const onSelectUpperRow2 = index => {
    let tempRow = [];
    tempRow = upperRow2;
    tempRow.map((item,ind)=>{
      if (index === ind){
        if (item.isSelected === true){
          item.isSelected = false;
        }else{
          item.isSelected = true;
        }
      }
    });
    let tempSeats = [];
    tempRow.map(item =>{
      tempSeats.push(item)
    })
    setUpperRow2(tempSeats);

  };


  const onSelectLowerRow1 = index => {
    let tempRow = [];
    tempRow = lowerRow1;
    tempRow.map((item,ind)=>{
      if (index === ind){
        if (item.isSelected === true){
          item.isSelected = false;
        }else{
          item.isSelected = true;
        }
      }
    });
    let tempSeats = [];
    tempRow.map(item =>{
      tempSeats.push(item)
    })
    setLoweRow1(tempSeats);

  };

  const onSelectLowerRow2 = index => {
    let tempRow = [];
    tempRow = LowerRow2;
    tempRow.map((item,ind)=>{
      if (index === ind){
        if (item.isSelected === true){
          item.isSelected = false;
        }else{
          item.isSelected = true;
        }
      }
    });
    let tempSeats = [];
    tempRow.map(item =>{
      tempSeats.push(item)
    })
    setLowerRow2(tempSeats);

  };


  const onAllSelectedSeats = () => {

    lowerRow1.map(item => {
      if (item.isSelected === true) {
        selectedSeats.push(item)
      }
    });

    LowerRow2.map(item => {
      if (item.isSelected === true) {
        selectedSeats.push(item)
      }
    });

    upperRow1.map(item => {
      if (item.isSelected === true) {
        selectedSeats.push(item)
      }
    });

    upperRow2.map(item => {
      if (item.isSelected === true) {
        selectedSeats.push(item)
      }
    });
    return selectedSeats.length
  }

  const boardingPointedSelectClick = (item) => {
    console.log('Clicked boarding point clicked')
  }
  const NonSleeperRowView = ({ SeatData ,Index,SeatRow}) => {
    return (<TouchableOpacity style={[{ marginHorizontal: 5,marginVertical:4 },(selectedPrice === 'All')&& {shadowColor: '#44AA21',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 1,
      shadowRadius: 3,
      elevation: 3, }]} onPress={() => {
        if (!SeatData.isBooked && SeatRow === 'Row1') 
          {
            onSelectLowerRow1(Index);
          }else if (!SeatData.isBooked && SeatRow === 'Row2'){
            onSelectLowerRow2(Index);
          }else{
            Alert.alert('Seat Already Booked');
          }
        
      }}
      disabled={SeatData.isBooked} 
      >
      <Svg style={{ width: 26, height: 32 }}>
      <BusSeater width="100%" height="100%"  fillColor={getSeatFillColor(SeatData.isSelected,SeatData.isBooked,SeatData.SeatLegend)} strokeColor= {getSeatColor(SeatData.isSelected,SeatData.isBooked,SeatData.SeatLegend)}/>
      </Svg>
      {/* <Text style={styles.rowTitle}>$ 500</Text> */}
    </TouchableOpacity>);
  };
  const BottomSeaterRowView = ({ SeatData ,index}) => {
    return (<TouchableOpacity style={[
      { marginLeft: 5,marginVertical:3 },(selectedPrice === 'All')&& {shadowColor: '#44AA21',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 1,
        shadowRadius: 3,
        elevation: 3, }]
      } onPress={() => { if (SeatData.isBooked) 
        {
          Alert.alert('Clicked Non Sleeper seat');
      }
    }
  }
      disabled={SeatData.isBooked}
      >
      <Svg style={{ width: 26, height: 32 }}>
        <BusSeater width="100%" height="100%"  fillColor={getSeatFillColor(SeatData.isSelected,SeatData.isBooked,SeatData.SeatLegend)} strokeColor= {getSeatColor(SeatData.isSelected,SeatData.isBooked,SeatData.SeatLegend)}/>
      </Svg>
      {/* <Text style={styles.rowTitle}>$ 500</Text> */}
    </TouchableOpacity>);
  };
/*
// Declare variables for colors or other properties
const fillColorUnisex = rowIndex === 0 ? '#FFFFFF' : rowIndex === 1 ? '#84EC7A' : '#D8D8D8';
const fillColorWomen = rowIndex === 0 ? '#FFFFFF' : rowIndex === 1 ? '#FDB0F9' : '#FFE9FE';
const fillColorMen = rowIndex === 0 ? '#FFFFFF' : rowIndex === 1 ? '#58E1FF' : '#CCF6FF';
*/

  // Get seat color based on status and type
  const getSeatColor = (status,booked, type) => {
    if (status === false && booked === false ) {
      return type === 'Unisex' ? '#298121' : type === 'Men' ? '#0088D3' : '#FF00D5';
    } else if (status === true && booked === false) {
      return type === 'Unisex' ? '#298121' : type === 'Men' ? '#0088D3' : '#FF00D5';
      // Selected green color
    } else if (booked) {
      return type === 'Unisex' ? '#958F8F' : type === 'Men' ? '#0088D3' : '#FF00D5';
      // Booked grey color
    }
    return '#D8D8D8';
  };
   // Get seat color based on status and type
   const getSeatFillColor = (status,booked, type) => {
    if (status === false && booked === false ) {
      return type === 'Unisex' ? '#FFFFFF' : type === 'Men' ? '#FFFFFF' : '#FFFFFF';
    } else if (status === true && booked === false) {
      return type === 'Unisex' ? '#84EC7A' : type === 'Men' ? '#58E1FF' : '#FDB0F9';
      // Selected green color
    } else if (booked) {
      return type === 'Unisex' ? '#D8D8D8' : type === 'Men' ? '#CCF6FF' : '#FFE9FE';
      // Booked grey color
    }
    return '#D8D8D8';
  };
  const BoardingPointRowView = ({ SeatData }) => {
    return (<TouchableOpacity style={[styles.RowpointViewPlace,
    SeatData.Selected === true && { backgroundColor:(screenTheme === 'Luxury Coach') ? `${hexToRGB('#FFE5AB', 1)}` :`${hexToRGB(useThemeColor, 0.2)}`, borderColor:(screenTheme === 'Luxury Coach') ? '#ffffff': useThemeColor, borderWidth:(screenTheme === 'Luxury Coach') ? 0:1 }]} onPress={() => boardingPointedSelectClick(SeatData)}>
      <Text style={[styles.rowPointTime, SeatData.Selected === true && { color: useThemeColor }]}>04:45   (05 Jun)</Text>
      <Text style={[styles.rowPointPlace, SeatData.Selected === true && { color: useThemeColor }]}>Vijaymangalam Toll </Text>
    </TouchableOpacity>);
  };
  const BoardingDropPointView = ({ BusBoardingData }) => {
    console.log('show color ' + hexToRGB('#1F487C', 0.5));
    return (
      <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 10, gap: 10, justifyContent: 'space-between', }}>
        <View style={{ height: '100%', overflow: 'hidden', flex: 1, borderRadius: 8, backgroundColor: '#FFFFFF', }}>
          <View style={{ height: 37, backgroundColor: useThemeColor, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.SectionPointTitle}>BOARDING POINT</Text>
          </View>
          <View style={{ flex: 1, backgroundColor: '#FFFFFF',}}>

            <FlatList data={upperRow1}
              renderItem={({ item, index }) => <BoardingPointRowView SeatData={item} />}
              scrollEnabled={true}
              showsVerticalScrollIndicator={true}
              indicatorStyle="#1F487C"  // Customize for iOS
            />


          </View>
        </View>
        <View style={{ height: '100%', overflow: 'hidden', flex: 1, borderRadius: 8, backgroundColor: '#FFFFFF', }}>
          <View style={{ height: 37, backgroundColor: useThemeColor, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.SectionPointTitle}>DROP POINT</Text>
          </View>
          <View style={{ flex: 1, backgroundColor: '#FFFFFF', justifyContent: 'space-between', flexDirection: 'row', }}>
            <FlatList data={upperRow1}
              renderItem={({ item, index }) => <BoardingPointRowView SeatData={item} />}
              scrollEnabled={true}
              showsVerticalScrollIndicator={true}
              indicatorStyle="#1F487C"  // Customize for iOS

            />
          </View>
        </View>
      </View>
    );
  };

  const hexToRGB = (hex_value, opecity = 1) => {
    const numericValue = parseInt(hex_value.slice(1), 16);
    const r = numericValue >> 16 & 0xFF;
    const g = numericValue >> 8 & 0xFF;
    const b = numericValue & 0xFF;
    return `rgba(${r}, ${g}, ${b},${opecity})`
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: ( screenTheme === 'Luxury Coach')? '#F6B642' : useThemeColor }]} edges={['right', 'left', 'top']}>
      <View style={styles.bgView}>
        <ImageBackground
          source={( screenTheme === 'Luxury Coach') ? require('../assets/luxuryHeaderBg.png') :require('../assets/HeadBg.png')}
          imageStyle={{
            resizeMode: 'cover',
          }}
         style={[styles.navigationView, {
          backgroundColor: ( screenTheme === 'Luxury Coach')? '#F6B642' : useThemeColor,
        }]}>
          <View
            style={styles.topImageBg}
          >
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => navigation.goBack()}>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <Svg style={{ width: 30, height: 30, borderRadius: 100 }}>
                 <BackWhite width="100%" height="100%" color =  {themeheaderFontColor} />
                </Svg>
              </View>
            </TouchableOpacity>
            <View style={styles.topViewTitle}>
              <Text style={[styles.topTitle,{color:themeheaderFontColor}]}>Journey Details</Text>
              <Text style={[styles.topSubtitle ,{color:`${hexToRGB(themeheaderFontColor, 0.8)}`}]}>Step 1 of 3</Text>
            </View>
          </View>
        </ImageBackground>
        <ScrollView>
        <View style={styles.tripInfoview}>
          <BusBookingDetails details={[]} />
          <View
            style={{
              flexDirection: 'row',
              width: '65%',
              position: 'absolute',
            }}> 
            {
      (screenTheme === 'Luxury Coach') ? 
    
            <BackgroundImage
                source={require('../assets/luxuryTopImage.png')}
              style={[{
                borderTopLeftRadius:10,
                borderBottomRightRadius:10,
                overflow:'hidden',
                height:38,
                width: '100%',
                alignItems:'center',
                justifyContent:'center',
                },{borderColor:'rgba(57, 57, 57, 1)',}]}
              >
                <View style={{  borderTopWidth:1.3,
               overflow:'hidden',
                borderLeftWidth:1.3,
                borderRightWidth:1.3,
                borderTopLeftRadius:10,
                borderBottomRightRadius:10,flexDirection: 'row',overflow:'hidden',justifyContent: 'space-between',alignItems:'center',paddingHorizontal:8,paddingVertical:3}}>
              <View  style={{flex:1,paddingRight:3}}>
                <Text style={{ fontSize: 10, fontWeight: '500', fontFamily: 'Inter', lineHeight: 12, textAlign: 'left', color: {themeheaderFontColor} }}>
                  Bus Operator
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: 'Inter',
                    lineHeight: 18,
                    textAlign: 'left',
                    fontWeight: '600',
                    numberOfLines:1,      // Shows only 1 line of text
                    ellipsizeMode:"tail" , 
                    color: {themeheaderFontColor},
                  }}>
                  Orange Tours 
                </Text>
              </View>
              <Image
                source={require('../assets/OperatorIcon.png')}
                style={{ width: 30, height: 30 }}
              />
              </View>
            </BackgroundImage>
           :
            <LinearGradient
              colors={['#1F487C', '#0890B4']}
              style={styles.operatorView}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 0.5, y: 0.2 }}>
              <View>
                <Text style={{ fontSize: 10, fontWeight: '500', fontFamily: 'Inter', lineHeight: 12, textAlign: 'left', color: 'white' }}>
                  Bus Operator
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: 'Inter',
                    lineHeight: 18,
                    textAlign: 'left',
                    fontWeight: '600',
                    color: 'white',
                  }}>
                  Orange Tours and Travels
                </Text>
              </View>
              <Image
                source={require('../assets/OperatorIcon.png')}
                style={{ width: 30, height: 30 }}
              />
            </LinearGradient>
}
            <View
              style={{
                backgroundColor: '#1F487C',
                width: 0,
                height: 0,
                backgroundColor: 'transparent',
                borderStyle: 'solid',
                borderLeftWidth: 0,
                borderRightWidth: 15,
                borderBottomWidth: 15,
                borderLeftColor: 'transparent',
                borderRightColor: 'transparent',
              }}></View>
          </View>
        </View>
        </ScrollView>
      </View>
      <SeatInfoScreen
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  bgView: { flex: 1, backgroundColor: '#E5FFF1' },
  navigationView: {
    width: '100%',
    flexDirection: 'row',
    height: 50,
  },
  topImageBg: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical:5,
    paddingHorizontal:10,
    overflow: 'hidden',
    position: 'relative',
  },
  backBtn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  operatorView: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal:10,
    paddingVertical:5
  },
  RowpointViewPlace: { paddingVertical: 10, width: '100%', paddingHorizontal: 8 },
  RowSelectPlace: { marginVertical: 8, width: '100%', padding: 5, borderColor: "#1F487C", },
  topViewTitle: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    marginRight: 25,
  },
  topTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    color: 'white',
  },
  topSubtitle: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.5)',
  },
  tripInfoview: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 8,
    marginRight: 12,
    marginTop: 8,
    marginBottom: 20,
  },
  infoView: {
    flexDirection: 'row',
    width: 120,
    borderRadius: 6,
    overflow: 'hidden',
    justifyContent: 'space-between',
    display: 'flex',
    backgroundColor: '#FFFFFF',
  },
  infoTab: {
    flex: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  infotabActive: {
    flex: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowTitle: {
    textAlign: 'center',
    fontSize: 9,
    color: '#000000',
    fontWeight: '400',
    fontFamily: 'Inter',
    fontStyle: 'normal',
  },
  SectionPointTitle: {
    textAlign: 'center',
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
    fontFamily: 'Inter',
    fontStyle: 'normal',
  },
  rowPointPlace: {
    textAlign: 'justify',
    fontSize: 13,
    color: '#000000',
    fontWeight: '400',
    fontFamily: 'Inter',
    fontStyle: 'normal',

  },
  rowPointTime: {
    textAlign: 'justify',
    fontSize: 11,
    color: '#000000',
    fontWeight: '400',
    fontFamily: 'Inter',
    fontStyle: 'normal',

  },
  infotabTitle: {
    textAlign: 'center',
    fontSize: 12,
    color: '#1F487C',
    fontWeight: '600',
    fontFamily: 'Inter',
    fontStyle: 'normal',
  },
  InfotabTitleActive: {
    textAlign: 'center',
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
    fontFamily: 'Inter',
    fontStyle: 'normal',
  },
  separator: {
    marginVertical: 7,
    borderBottomColor: '#C5C5C5',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  ViewTabs: {
    flexDirection: 'row',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    paddingHorizontal:5,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#000000',
    borderBottomWidth: 0,
    paddingVertical: 4,
  },
  tabActive: {
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1.5,
    paddingVertical: 4,
  },
  tabTitle: {
    fontSize: 13,
    color: '#000000',
    fontWeight: '300',
    fontFamily: 'Inter',
    fontStyle: 'normal',
  },
  tabTitleActive: {
    fontSize: 13,
    fontWeight: '500',
    fontFamily: 'Inter',
    fontStyle: 'normal',

  },
  indicatorWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    padding: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 10,
  },
  indicatorText: {
    fontSize: 18,
    marginTop: 12,
  },
  cornerbutton: {
    backgroundColor: '#fff', // White background
    borderRadius: 20, // Square rounded corners
    paddingVertical: 10,
    paddingHorizontal: 20,
    // Adding shadow for a subtle Material Design look
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2, // For Android shadow
  },
});

export default BusSeatSelectScreen;
