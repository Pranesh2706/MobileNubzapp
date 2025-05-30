import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Image,
  Alert,
  Animated,
  Share,
  KeyboardAvoidingView,
} from 'react-native';
import { Svg, Path } from 'react-native-svg';
import Swiper from 'react-native-swiper';
import Modal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

import BackWhite from '../assets/BackWhite';
import HeadWhite from '../assets/HeadArrow';
import backgroundImage from '../assets/home_bg.png'; // Replace with your actual image path
import FastImage from 'react-native-fast-image';

import BusTimeBg from '../assets/BusTimeBg';
import SeatRed from '../assets/SeatRed';
import UserWhite from '../assets/UserWhite';
import StarWhite from '../assets/StarWhite';
import BusIcon from '../assets/BusIcon';
import WaterBottleIcon from '../assets/WaterBottleIcon';
import SleepIcon from '../assets/SleepIcon';
import ChargePluginIcon from '../assets/ChargePlugin';
import LiveTrackIcon from '../assets/LiveTrackIcon';
const { width, height } = Dimensions.get('window');
import BusList from '../assets/BusList'; // Import your BusList component
import BusList1 from '../assets/BusList1'; // Import your BusList1 component
import BusList2 from '../assets/BusList2'; // Import your BusList2 component
import styles from '../MainScreen/TripListStyle';
import ViewMoreScreen from './ViewMoreScreen';
import SortInsightsScreen from './SortInsightsScreen';
import FilterInsightsScreen from './FilterInsightsScreen';
import BluedashLine from '../assets/BluedashLine';
import BlueStandLine from '../assets/BlueStandLine';
import FilterModal from './FilterModal';
import ShareIcone from '../assets/ShareIcone';
import BusDurationBg from '../assets/BusDurationBg';
import LuxuryChargePluginIcon from '../assets/LuxuryChargePluginIcon';
import LuxuryWaterBottleIcon from '../assets/LuxuryWaterBottleIcon';
import LuxurySleepIcon from '../assets/LuxurySleepIcon';
const screenWidth = Dimensions.get('window').width;

const TripListScreen = props => {
  const [BannerData, setBannerData] = useState([]);
  const data1 = Array.from({ length: 6 }, (_, index) => ({ key: `${index}` }));
  const [busColor, setBusColor] = useState('#04B9EF');
  const [busColor1, setBusColor1] = useState('#04B9EF');

  const [statusVisible, setStatusVisible] = useState(false);
  const [sortScreenVisible, setSortScreenVisible] = useState(false);
  const [filterScreenVisible, setFilterScreenVisible] = useState(false);

  const [FilterData, setFilterData] = useState('');

  const [modalVisible, setModalVisible] = useState(false);

  const [userPlan, setUserPlan] = useState(true);



  const Colordata = [
    { title: 'Red Bus', color: '#E92E3D' },
    { title: 'EasyMyTrip', color: '#1F487C' },
    { title: 'Abhi Bus', color: '#C32629' },
    { title: 'Goibio Bus', color: '#F16635' },
    { title: 'Paytm', color: '#04B9EF' },
    { title: 'MakeMyTrip', color: '#216BC0' },
  ];

  const viewListAry = [
    {
      id: '0',
      title: '',
      data: [
        {
          id: '1',
          ListData: [
            {
              id: '1',
              task: 'Boarding/Dropping Point',
            },
            {
              id: '2',
              task: 'Cancellation Policy',
            },
            {
              id: '3',
              task: 'Amenities',
            },
            {
              id: '4',
              task: 'Travel Policy',
            },
          ],
        },
      ],
    },
    {
      id: '1',
      title: 'Boarding Points',
      data: [
        {
          id: '6',
          task: 'Make a section list tutorial',
        },
      ],
    },
    {
      id: '2',
      title: 'Dropping Points',
      data: [
        {
          id: '6',
          task: 'Make a section list tutorial',
        },
      ],
    },
    {
      id: '3',
      title: 'Cancellation Policy',
      data: [
        {
          id: '6',
          task: 'Make a section list tutorial',
        },
      ],
    },
    {
      id: '4',
      title: 'Amenities',
      data: [
        {
          id: '6',
          task: 'Make a section list tutorial',
        },
      ],
    },
    {
      id: '5',
      title: 'Travel Policy',
      data: [
        {
          id: '6',
          task: 'Make a section list tutorial',
        },
        {
          id: '2',
          task: 'Make a section list tutorial',
        },
        {
          id: '3',
          task: 'Make a section list tutorial',
        },
      ],
    },
  ];

  const swiperRef = useRef(null);

  const Separator = () => <View style={styles.separator} />;

  const colors = [
    'tomato',
    'thistle',
    'skyblue',
    'tomato',
    'thistle',
    'skyblue',
    'teal',
  ];

  const dataFilter = [
    { id: '2', icon: require('../assets/Filters/Sort.png'), title: 'Sort' },
    { id: '3', icon: (userPlan === true) ? require('../assets/Filters/LuxuryCoach.png') : require('../assets/Filters/Ac.png'), title: (userPlan === true) ? 'Luxury Coach' : 'AC' },
    { id: '4', icon: require('../assets/Filters/NonAc.png'), title: 'Non AC' },
    { id: '5', icon: require('../assets/Filters/Seater.png'), title: 'Seater' },
    {
      id: '6',
      icon: require('../assets/Filters/SemiSeater.png'),
      title: 'Semi Sleeper',
    },
    {
      id: '7',
      icon: require('../assets/Filters/Sleepers.png'),
      title: 'Sleeper',
    },
    { id: '8', icon: require('../assets/Filters/Day.png'), title: 'Day' },
    { id: '9', icon: require('../assets/Filters/Night.png'), title: 'Night' },
  ];

  const [isMinimized, setIsMinimized] = useState(false); // State to track minimized/expanded state
  const [isFilterSelect, setFilterSelect] = useState(false); // State to track minimized/expanded state

  const scrollOffset = useRef(0); // Ref to track the previous scroll position

  const handleScroll = (event) => {
    const currentOffset = event.nativeEvent.contentOffset.x; // Current horizontal offset
    const direction = currentOffset > scrollOffset.current ? 'right' : 'left'; // Determine scroll direction
    // Update scrollOffset to the current value
    scrollOffset.current = currentOffset;
    // Hide button if scrolling left, show button if scrolling right
    if (direction === 'left' && currentOffset <= 25) {
      setIsMinimized(false);
    } else if (direction === 'right') {
      setIsMinimized(true);
    }
  };

  const BusBookingDetails = ({ details, isExpanded }) => (
    <View
      style={styles.tripRowContainer}>
      <View style={{ paddingTop: 8, paddingHorizontal: 5, flexDirection: 'row' }}>
        <View style={{ paddingTop: 8, width: '65%' }}>
          <Text
            style={styles.tripBusTypeTxt}>
            A/C Sleeper (2+1)
          </Text>
          <View
            style={styles.tripPickDateView}>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                gap: 3,
                alignItems: 'flex-start',
                paddingLeft: 3,
              }}>
              <Text style={styles.tripDateTxt}>
                20 Feb
              </Text>
              <Text
                style={styles.tripStartTimeTxt}>
                18:30
              </Text>
            </View>
            <View
              style={styles.tripDropView}>
              <BusTimeBg width="100%" height="100%" />
              <Text
                style={styles.tripDurationTimeTxt}>
                10:30 Hrs
              </Text>
            </View>
            <View
              style={styles.tripDropDateView}>
              <Text
                style={{
                  fontSize: 12, lineHeight: 15, fontFamily: 'Inter', fontWeight: '400', color: '#1F487C', textAlign: 'right'
                }}>
                21 Feb
              </Text>
              <Text
                style={styles.tripDropDateTxt}>
                01:30
              </Text>
            </View>
          </View>
        </View>
        <View
          style={styles.tripViewDivide}>
          <Svg style={{ width: 4 }}>
            <BlueStandLine width="100%" height="100%" />
          </Svg>
        </View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}>
          <View
            style={styles.tripRightView}>
            <View
              style={styles.tripStarView}>
              <Svg style={{ width: 16, height: '100%', marginHorizontal: 3 }}>
                <StarWhite width="100%" height="100%" />
              </Svg>
              <Text
                style={styles.ratingTxt}>
                4.0
              </Text>
            </View>
            <View
              style={styles.userView}>
              <Svg style={{ width: 15, height: 15, marginHorizontal: 1 }}>
                <UserWhite width="90%" height="90%" />
              </Svg>
              <Text
                style={styles.userLikeCount}>
                8.8k
              </Text>
            </View>
          </View>
          <View
            style={styles.seatRemainView}>
            <Svg style={{ width: 14, height: 14, margin: 5 }}>
              <SeatRed width="90%" height="90%" />
            </Svg>
            <Text
              style={styles.seatCountTxt}>
              7 Seats left
            </Text>
          </View>
          <View style={{ paddingVertical: 2 }}>
            <Text
              style={styles.windowSeatTxt}>
              7 Window Seats
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          width: '100%',
          paddingHorizontal: 6,

        }}>
        <View
          style={styles.tripBusnameView}>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 40,
              maxWidth: '75%',
              alignItems: 'center',
            }}>
            <Text
              style={styles.tripBusName}>
              ORANGE TRAVELS{' '}
            </Text>
            <Image
              source={require('../assets/OperatorIcon.png')}
              style={{ width: 30, height: 30, marginLeft: 8 }}
            />
          </View>
          <Text
            style={styles.tripPriceTxt}>
            ₹1700
          </Text>


        </View>
        <View
          style={styles.lowPriceImageView}>
          <Image
            source={require('../assets/LowPrice.png')}
            style={{ width: 70, height: 70 }}
          />
        </View>
        <View style={styles.LowPriceRightShape} />

      </View>
      {/* <View
        style={{
          flex: 1,
          alignItems: 'center',
          paddingVertical:2,
          marginRight:12,
          marginLeft:45,
          justifyContent: 'space-around',
        }}> */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          paddingRight: 10,
          paddingLeft: 60,
          paddingVertical: 2,
          flex: 1,
        }}>
        <View style={styles.trackingView}>
          <Image
            source={require('../assets/LiveTrackIcons.png')}
            style={{ width: 20, height: 20.69 }}
          />
          <Text
            style={styles.liveTrackingTxt}>
            Live Tracking
          </Text>
        </View>
        <View
          style={styles.viewMoreDivide}
        />
        <View style={styles.trackingView}>
          <Svg style={{ width: 17, height: 17, marginHorizontal: 2 }}>
            <ChargePluginIcon width="100%" height="100%" />
          </Svg>
          <Svg style={{ width: 17, height: 17, marginHorizontal: 2 }}>
            <SleepIcon width="100%" height="100%" />
          </Svg>
          <Svg style={{ width: 16, height: 16, marginHorizontal: 2 }}>
            <WaterBottleIcon width="100%" height="100%" />
          </Svg>
          <Text
            style={{
              fontSize: 14,
              color: '#1F487C',
              paddingRight: 5,
            }}>
            +2
          </Text>
        </View>
        <View
          style={styles.viewMoreDivide}
        />
        <View style={styles.trackingView}>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => setStatusVisible(true)}>
            <Text
              style={styles.tripViewMoreTxt}>
              View More...
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* //</View> */}
      {isExpanded && (
        <View style={{ flex: 1 }}>
          <View
            style={{
              marginVertical: 2,
              width: '100%',
            }}>
            <Svg style={{ height: 3 }}>
              <BluedashLine width="100%" height="100%" color="rgba(31, 72, 124, 0.5)" />
            </Svg>
          </View>

          <FlatList
            data={Colordata}
            renderItem={({ item, index }) => (
              <PlatformColorListItem item={item} />
            )}
            keyExtractor={item => item.key}
            numColumns={3}
            contentContainerStyle={styles.list}
          />
        </View>
      )}
    </View>
  );

  // User plan B List 



  const BusBookingPlanView = ({ details, item, Index }) => (
    <TouchableOpacity
      style={styles.tripRowContainer} onPress={() => OnClickListNavigation(item, Index, false)}>
      <View style={{ paddingTop: 8, flexDirection: 'row' }}>
        <View style={{ paddingTop: 8, width: '64%' }}>
          <Text
            style={styles.tripBusTypeTxt}>
            A/C Sleeper (2+1)
          </Text>
          <View
            style={styles.tripPickDateView}>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                gap: 3,
                alignItems: 'flex-start',
                paddingLeft: 8,

              }}>
              <Text style={styles.tripDateTxt}>
                20 Feb
              </Text>
              <Text
                style={styles.tripStartTimeTxt}>
                18:30
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                paddingHorizontal: 5,
                height: 38,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 1,
              }}>
              <BusTimeBg width="100%" height="100%" />
              <Text
                style={styles.tripDurationTimeTxt}>
                10:30 Hrs
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                gap: 3,
                alignItems: 'center',
              }}>
              <Text
                style={{ fontSize: 12, lineHeight: 15, fontFamily: 'Inter', fontWeight: '400', color: '#1F487C', textAlign: 'right' }}>
                21 Feb
              </Text>
              <Text
                style={styles.tripDropDateTxt}>
                01:30
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingLeft: 6,
          }}>
          <Svg style={{ width: 4 }}>
            <BlueStandLine width="100%" height="90" />
          </Svg>
        </View>
        <View
          style={{
            flexDirection: 'column',
            flex: 1,
            gap: 8,
            paddingLeft: 8,
            paddingRight: 8,
          }}>
          <View
            style={{
              flexDirection: 'row',
              borderColor: '#2CA103',
              borderWidth: 1,
              justifyContent: 'center',
              alignItems: 'center',
              height: 25,
              borderRadius: 5,
            }}>
            <View
              style={styles.tripStarView}>
              <Svg style={{ width: 16, height: '100%', marginHorizontal: 3 }}>
                <StarWhite width="100%" height="100%" />
              </Svg>
              <Text
                style={styles.ratingTxt}>
                4.0
              </Text>
            </View>
            <View
              style={styles.userView}>
              <Svg style={{ width: 15, height: 15, marginHorizontal: 3 }}>
                <UserWhite width="90%" height="90%" />
              </Svg>
              <Text
                style={styles.userLikeCount}>
                8.8k
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: 'rgba(255, 193, 193, 0.5)',
              justifyContent: 'center',
              alignItems: 'center',
              height: 25,
              borderRadius: 12,
            }}>
            <Svg style={{ width: 14, height: 14, margin: 5 }}>
              <SeatRed width="100%" height="100%" />
            </Svg>
            <Text
              style={styles.seatCountTxt}>
              7 Seats left
            </Text>
          </View>
          <View>
            <Text
              style={styles.windowSeatTxt}>
              8 Window Seats
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}>
        <View
          style={{
            backgroundColor: '#1F487C',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 34,
            width: '100%',
            borderTopRightRadius: 10,
            position: 'relative',
            left: 10,
            flexDirection: 'row',

            marginTop: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              width: '60%',
              height: 34,
              justifyContent: 'flex-end',
              alignItems: 'center', paddingRight: 8,
            }}>
            <Text
              style={{
                fontSize: 15,
                color: '#FFFFFF',
                textAlign: 'right',
                fontWeight: '400',
                fontFamily: "Inter",
                maxWidth: '60%',
                lineHeight: 19,
              }}>
              Starting @{' '}
            </Text>

          </View>
          <View style={{ width: '38%', height: 34, borderTopRightRadius: 8, }}>
            <ImageBackground style={{
              flexDirection: 'row',
              height: '100%',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTopRightRadius: 8,
            }} source={require('../assets/regaulerPriceshape.png')}
              imageStyle={{
                width: '100%',
                height: '100%',
                borderTopRightRadius: 8,
                resizeMode: "stretch"
              }}
            >
              <Text
                style={{
                  fontSize: 17,
                  color: '#FFFFFF',
                  textAlign: 'right',
                  fontWeight: 'bold', marginLeft: 15
                }}>
                ₹1700
              </Text>



              {Platform.OS === 'ios' ? (
                <Image
                  source={require('../assets/Pricedown.gif')}
                  style={{
                    width: 37,
                    height: 22,
                    marginRight: 5,
                    transform: [{ rotate: '-90deg' }],
                  }}
                />
              ) : (
                <FastImage
                  source={require('../assets/Pricedown.gif')}
                  style={{
                    width: 37,
                    height: 22,
                    marginRight: 5,
                    transform: [{ rotate: '-90deg' }],
                  }}

                  resizeMode={FastImage.resizeMode.cover}
                />
              )}



            </ImageBackground>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            overflow: 'hidden',
            width: '100%',
            paddingRight: 10,
            paddingLeft: '15%',
            paddingVertical: 2,
            flex: 1,
          }}>
          <View style={styles.trackingView}>
            <Image
              source={require('../assets/LiveTrackIcons.png')}
              style={{ width: 20, height: 20.69 }}
            />
            <Text
              style={styles.liveTrackingTxt}>
              Live Tracking
            </Text>
          </View>
          <View
            style={styles.viewMoreDivide}
          />
          <View style={styles.trackingView}>
            <Svg style={{ width: 17, height: 17, marginHorizontal: 2 }}>
              <ChargePluginIcon width="100%" height="100%" />
            </Svg>
            <Svg style={{ width: 17, height: 17, marginHorizontal: 2 }}>
              <SleepIcon width="100%" height="100%" />
            </Svg>
            <Svg style={{ width: 16, height: 16, marginHorizontal: 2 }}>
              <WaterBottleIcon width="100%" height="100%" />
            </Svg>
            <Text
              style={{
                fontSize: 14,
                color: '#1F487C',
                paddingRight: 5,
              }}>
              +2
            </Text>
          </View>
          <View
            style={styles.viewMoreDivide}
          />
          <View style={styles.trackingView}>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => setStatusVisible(true)}>
              <Text
                style={styles.tripViewMoreTxt}>
                View More...
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={styles.lowPriceImageView}>
          <Image
            source={require('../assets/LowPrice.png')}
            style={{ width: 70, height: 70 }}
          />
        </View>
        <View style={{
          position: 'absolute',
          right: -10,
          top: 44,
          bottom: 3,
          backgroundColor: "transparent",
          borderStyle: "solid",
          borderRightWidth: 10,
          borderTopWidth: 10,
          borderRightColor: "transparent",
          borderTopColor: 'rgba(0, 25, 56, 1)'
        }} />
      </View>
    </TouchableOpacity>
  );

  const BusBookingLuxuryPlanView = ({ details, item, Index }) => (
    <TouchableOpacity style={{
      flex: 1,
      flexDirection: 'column',
      borderRadius: 20,

      top: 17,
      backgroundColor: '#FFF',
    }} onPress={() => OnClickListNavigation(item, Index, false)}>
      <ImageBackground source={require('../assets/Luxurybg.png')}
        style={{ borderRadius: 20 }}
        imageStyle={{
          width: '100%',
          height: '100%',
          borderRadius: 20,
          borderWidth: 1,
          borderColor: 'rgba(215, 147, 20, 1)',
          resizeMode: 'cover',
        }}>
        <View style={{ paddingTop: 8, paddingHorizontal: 5, flexDirection: 'row' }}>
          <View style={{ paddingTop: 8, width: '65%' }}>
            <Text
              style={{
                fontSize: 10,
                padding: 5,
                lineHeight: 12,
                fontFamily: 'Inter',
                fontWeight: '400',
                color: '#393939',
                textAlign: 'center',
              }}>
              A/C Sleeper (2+1)
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                // backgroundColor:'green',
                height: 40, paddingHorizontal: 5, marginTop: 10
              }}>
              <View
                style={{
                  // backgroundColor:'red',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 3,
                }}>
                <Text style={{ fontSize: 12, fontFamily: 'Inter', lineHeight: 15, fontWeight: '400', color: '#393939', textAlign: 'left' }}>
                  20 Feb
                </Text>
                <Text
                  style={{ fontSize: 15, fontFamily: 'Inter', lineHeight: 19, fontWeight: '700', color: '#393939', textAlign: 'left', }}>
                  18:30
                </Text>
              </View>
              <View
                style={{
                  position: 'relative',
                  flex: 1,
                  paddingHorizontal: 5,
                  height: 38,
                }}>
                <BusDurationBg width="100%" height="100%" />
                <Text
                  style={{
                    position: 'absolute',
                    top: 10,
                    left: 5,
                    width: '100%',
                    textAlign: 'center',
                    color: '#FFFFFF',
                    fontSize: 10,
                    lineHeight: 12,
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
                  alignItems: 'center', gap: 3,
                }}>
                <Text
                  style={{ fontSize: 12, fontFamily: 'Inter', lineHeight: 15, fontWeight: '400', color: '#393939', textAlign: 'right' }}>
                  21 Feb
                </Text>
                <Text
                  style={{ fontSize: 15, fontFamily: 'Inter', lineHeight: 19, fontWeight: '700', color: '#393939', textAlign: 'right', }}>
                  01:30
                </Text>
              </View>
            </View>
          </View>
          <View
            style={styles.tripViewDivide}>
            <Svg style={{ width: 4 }}>
              <BlueStandLine width="100%" height="90" />
            </Svg>
          </View>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              flex: 1,
            }}>
            <View
              style={{
                flexDirection: 'row',
                borderColor: '#2CA103',
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
                height: 25,
                borderRadius: 5,
                overflow: 'hidden',
                margin: 5,
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
                    color: '#FFFFFF',
                    fontWeight: '400',
                    lineHeight: 13,
                    fontFamily: 'Inter',
                  }}>
                  4.0
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  overflow: 'hidden',
                  alignItems: 'center', backgroundColor: '#ffffff', borderTopRightRadius: 5, borderBottomRightRadius: 5
                }}>
                <Svg style={{ width: 15, height: '100%', marginHorizontal: 3 }}>
                  <UserWhite width="90%" height="90%" />
                </Svg>
                <Text
                  style={{
                    color: '#2CA103',
                    fontSize: 11,
                    fontWeight: '400',
                    lineHeight: 13,
                    fontFamily: 'Inter',
                  }}>
                  8.8k
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: 'rgba(255, 167, 167, 0.8)',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
                height: 25,
                margin: 5,
                borderRadius: 12,
              }}>
              <Svg style={{ width: 14, height: 14, margin: 5 }}>
                <SeatRed width="90%" height="90%" />
              </Svg>
              <Text
                style={{
                  fontSize: 12,
                  textAlign: 'justify',
                  color: 'rgba(198, 43, 43, 1)',
                  fontWeight: '600',
                  fontFamily: 'Inter',
                  lineHeight: 15,
                }}>
                7 Seats left
              </Text>
            </View>
            <View style={{ paddingVertical: 2 }}>
              <Text
                style={{
                  fontSize: 12,
                  color: '#393939',
                  fontWeight: '500',
                  textAlign: 'center',
                  lineHeight: 16,
                  fontFamily: 'Inter',
                }}>
                5 Window Seats
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            // backgroundColor:'red',
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 34,
              width: '100%',
              borderTopRightRadius: 10,
              position: 'relative',
              left: 10,
              marginTop: 10,
            }}>
            <ImageBackground style={{
              flexDirection: 'row', borderTopRightRadius: 10, width: '100%,', height: 34, justifyContent: 'space-between',
              alignItems: 'center',
            }} source={require('../assets/LuxuryLowPriceBg.png')}
              imageStyle={{
                width: '100%',
                height: '100%',
                resizeMode: 'cover',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  width: '62%',
                  height: 34,
                  justifyContent: 'flex-end',
                  // backgroundColor:'blue',
                  alignItems: 'center', paddingRight: 8,
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    color: '#393939',
                    fontFamily: 'Inter',
                    textAlign: 'right',
                    fontWeight: '400',
                    maxWidth: '60%',
                    lineHeight: 19,
                  }}>
                  Starting @{' '}
                </Text>

              </View>
              <View style={{ width: '38%', height: 34, borderTopRightRadius: 10, }}>
                <ImageBackground style={{
                  flexDirection: 'row',
                  height: '100%',
                  width: '100%',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderTopRightRadius: 10,
                }} source={require('../assets/LuxuryPriceBg.png')}
                  imageStyle={{
                    width: '100%',
                    height: '100%',
                    resizeMode: 'stretch',
                  }}>
                  <Text
                    style={{
                      fontSize: 17,
                      color: '#FFFFFF',
                      textAlign: 'right',
                      fontWeight: 'bold', marginLeft: 15
                    }}>
                    ₹2650
                  </Text>
                  <Image
                    source={require('../assets/Pricedown.gif')}
                    style={{
                      width: 37,
                      height: 22,
                      marginRight: 5,
                      transform: [{ rotate: '-90deg' }],
                    }}
                  />
                </ImageBackground>
              </View>

            </ImageBackground>
            <View
              style={{
                backgroundColor: '#F7E287',
                justifyContent: 'center',
                alignItems: 'center',
                height: 60,
                width: 65,
                borderRadius: 100,
                position: 'absolute',
                left: -5,
                paddingLeft: 8,
              }}>
              <Image
                source={require('../assets/LowPrice.png')}
                style={{ width: 80, height: 80, position: 'absolute', }}
              />
            </View>

          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              overflow: 'hidden',
              width: '100%',
              paddingRight: 10,
              paddingLeft: '15%',
              paddingVertical: 2,
              flex: 1,

            }}>
            <View style={{
              height: 24,
              marginHorizontal: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Image
                source={require('../assets/LuxuryLiveTrackIcons.png')}
                style={{ width: 20, height: 20.69 }}
              />
              <Text
                style={{
                  fontSize: 12.07,
                  color: '#393939',
                  paddingHorizontal: 3,
                  fontFamily: 'Inter',
                  fontWeight: '400',
                  lineHeight: 15,
                }}>
                Live Tracking
              </Text>
            </View>
            <View
              style={{
                borderStyle: 'solid',
                margin: 4,
                borderWidth: 0.5,
                borderRadius: 1,
                borderColor: '#393939',
                height: '80%',
                width: 1,
              }}
            />
            <View style={{
              height: 24,
              marginHorizontal: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Svg style={{ width: 17, height: 17, marginHorizontal: 2 }}>
                <LuxuryChargePluginIcon width="100%" height="100%" />
              </Svg>
              <Svg style={{ width: 17, height: 17, marginHorizontal: 2 }}>
                <LuxurySleepIcon width="100%" height="100%" />
              </Svg>
              <Svg style={{ width: 16, height: 16, marginHorizontal: 2 }}>
                <LuxuryWaterBottleIcon width="100%" height="100%" />
              </Svg>
              <Text
                style={{
                  fontSize: 14,
                  color: '#393939',
                  paddingRight: 5,
                }}>
                +2
              </Text>
            </View>
            <View
              style={{
                borderStyle: 'solid',
                margin: 4,
                borderWidth: 0.5,
                borderRadius: 1,
                borderColor: '#393939',
                height: '80%',
                width: 1,
              }}
            />
            <View style={{
              height: 24,
              marginHorizontal: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => setStatusVisible(true)}>
                <Text
                  style={{
                    fontSize: 12.07,
                    color: '#393939',
                    fontFamily: 'Inter',
                    fontWeight: '400',
                    lineHeight: 15,
                  }}>
                  View More...
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{
            position: 'absolute',
            right: -9,
            top: 44,
            backgroundColor: "transparent",
            borderStyle: "solid",
            borderRightWidth: 9,
            borderTopWidth: 10,
            borderRightColor: "transparent",
            borderTopColor: '#3E3E3E'
          }}>
          </View>
        </View>

      </ImageBackground>
    </TouchableOpacity>
  );
  //Platform List row view

  function isValidColor(color) {
    // Hex color regex
    const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3}|[A-Fa-f0-9]{8}|[A-Fa-f0-9]{4})$/;

    // RGB, RGBA color regex
    const rgbColorRegex = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/;
    const rgbaColorRegex = /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*((0(\.\d+))|1(\.0+)?)\)$/;

    // HSL, HSLA color regex
    const hslColorRegex = /^hsl\(\s*(\d{1,3}),\s*(\d{1,3})%,\s*(\d{1,3})%\)$/;
    const hslaColorRegex = /^hsla\(\s*(\d{1,3}),\s*(\d{1,3})%,\s*(\d{1,3})%,\s*((0(\.\d+))|1(\.0+)?)\)$/;

    // Named color regex (e.g., "red", "blue")
    const namedColorRegex = /^(red|blue|green|yellow|orange|purple|black|white|gray|grey|pink|brown|cyan|magenta)$/i;

    return (
      hexColorRegex.test(color) ||
      rgbColorRegex.test(color) ||
      rgbaColorRegex.test(color) ||
      hslColorRegex.test(color) ||
      hslaColorRegex.test(color) ||
      namedColorRegex.test(color)
    );
  }
  const OnClickListNavigation = (item, index, isColor) => {
    props.navigation.navigate(
      'BusSeatSelectScreen',
      userPlan === true && FilterData === 'Luxury Coach'
        ? {
          screenTheme: 'Luxury Coach',
          themecolor: '#393939',
          themeColor2: '#D89E2F',
        }
        : {
          screenTheme: 'Normal Coach',
          themecolor:
            isColor === true
              ? isValidColor(item.color)
                ? item.color
                : '#1F487C'
              : '#1F487C',
          themeColor2:
            isColor === true
              ? isValidColor(item.color)
                ? item.color
                : '#1F487C'
              : '#1F487C',
        },
    );
  };
  const PlatformColorListItem = ({ item, Index }) => {
    return (
      <TouchableOpacity
        style={{ flex: 1, marginVertical: -2 }}
        onPress={() => OnClickListNavigation(item, Index, true)}>
        <View style={styles.wrapper1}>
          <Svg style={styles.busPlatformBg}>
            <BusList
              width="100%"
              height="100%"
              color={item.color}
              color1={item.color}
            />
          </Svg>

          <Text style={{
            fontSize: 10, color: 'black', fontFamily: 'Inter',
            fontWeight: '700', left: 22, top: 7
          }}>
            {item.title + ' '}
          </Text>
          <View style={styles.busListContainer}>
            <BusList1 width="100%" height="100%" color={item.color} />
            <Text style={styles.rsText}>Rs 12,000</Text>
          </View>
          <View style={styles.icon}>
            <BusList2 width="100%" height="100%" />
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  //BusBooking list Row
  const TripListRow = ({ title, description, image_url }) => {
    const [expanded, setExpanded] = useState(false);

    return (
      <View style={styles.rowContainer}>
        <BusBookingDetails details={[]} isExpanded={expanded} />
        <View
          style={styles.busOperatorView}>
          <LinearGradient
            colors={['#1F487C', '#0890B4']}
            style={styles.operatorNameView}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 0.5, y: 0.2 }}>
            <View>
              <Text
                style={styles.operatorNameTxt}>
                Bus Operator
              </Text>
              <Text
                style={styles.operatorBrandTxt}>
                Orange Tours and Travels
              </Text>
            </View>
            <Image
              source={require('../assets/OperatorIcon.png')}
              style={{ width: 30, height: 30 }}
            />
          </LinearGradient>
          <View
            style={styles.topShareView}></View>
        </View>

        <View
          style={styles.compareView}>
          <LinearGradient
            colors={['#1F487C', '#0890B4']}
            style={styles.compareGradientView}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}>
            <TouchableOpacity
              style={styles.comparePriceBtn}
              onPress={() => setExpanded(!expanded)}>
              <Text style={{ fontSize: 14, fontWeight: '700', fontFamily: 'Inter', color: 'white' }}>
                To Compare Prices
              </Text>
              <Image
                source={require('../assets/Pricedown.gif')}
                style={{
                  width: 40,
                  height: 25,
                  transform: [{ rotate: expanded === true ? '180deg' : '0deg' }],
                }}
              />
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    );
  };

  //Plan B User BusBooking list Row
  const TripPlanListRow = ({ item, Index, image_url }) => {

    return (
      <View style={styles.rowContainer}>
        <BusBookingPlanView details={[]} item={item} index={Index} />
        <View
          style={styles.busOperatorView}>
          <LinearGradient
            colors={['#1F487C', '#0890B4']}
            style={styles.operatorNameView}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 0.5, y: 0.2 }}>
            <View>
              <Text
                style={styles.operatorNameTxt}>
                Bus Operator
              </Text>
              <Text
                style={styles.operatorBrandTxt}>
                Orange Tours and Travels
              </Text>
            </View>
            <Image
              source={require('../assets/OperatorIcon.png')}
              style={{ width: 30, height: 30 }}
            />
          </LinearGradient>
          <View
            style={styles.topShareView}></View>
        </View>
      </View>
    );
  };

  //Plan B User BusBooking list Row
  const TripLuxuryCoachListRow = ({ item, Index, image_url }) => {

    return (
      <View style={styles.rowContainer}>
        <BusBookingLuxuryPlanView details={[]} item={item} index={Index} />
        <View
          style={{
            flexDirection: 'row',
            width: '65%',
            position: 'absolute',
            top: 0,
            left: 0,
          }}>

          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              borderTopWidth: 1.3,
              borderLeftWidth: 1.3,
              borderRightWidth: 1.3,
              borderTopLeftRadius: 10,
              borderBottomRightRadius: 10,
              borderColor: '#3E3E3E',
              height: 34,
            }}>
            <ImageBackground style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', alignItems: 'center', paddingRight: 5 }}
              source={require('../assets/luxuryTopImage.png')}>
              <View style={{ paddingLeft: 8 }}>
                <Text
                  style={[styles.operatorNameTxt, { color: '#393939' }]}>
                  Bus Operator
                </Text>
                <Text
                  style={[styles.operatorBrandTxt, { color: '#393939' }]}>
                  Orange Tours and Travels
                </Text>
              </View>
              <Image
                source={require('../assets/OperatorIcon.png')}
                style={{ width: 30, height: 30 }}
              />
            </ImageBackground>
          </View>
          <View style={{
            backgroundColor: '#3E3E3E',
            width: 0,
            height: 0,
            left: -1,
            backgroundColor: 'transparent',
            borderStyle: 'solid',
            borderLeftWidth: 0,
            borderTopWidth: 0,
            borderRightWidth: 15,
            borderBottomWidth: 17,
            borderLeftColor: 'transparent',
            borderRightColor: 'transparent',
          }} />
        </View>
      </View>
    );
  };
  //Filter Listview and Row
  const HorizontalFilterListItem = ({ item, Index }) => {
    return (
      <TouchableOpacity style={{ overflow: 'hidden', }} onPress={() => OnClickCategoryListFilter(item, Index)}>
        {(item.title === 'Luxury Coach' && item.title === FilterData) ?
          <ImageBackground source={require('../assets/luxuryFilterBg.png')}
            style={[{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: 70,
              height: 30,
              paddingVertical: 5,
              paddingHorizontal: 8,
              borderWidth: 1,
              overflow: 'hidden',
              borderColor: '#1F487C',
              borderRadius: 5,
              marginRight: 5,
            }, { borderColor: 'rgba(57, 57, 57, 1)', }]}>
            <Image source={item.icon} style={{ marginRight: 5, width: item.title === 'Luxury Coach' ? 14 : item.title === 'Sleeper' ? 23 : 16, height: item.title === 'Luxury Coach' ? 20 : 16, tintColor: '#393939' }} />
            <Text style={[styles.filterTitle, { color: '#393939' }]}>{item.title}</Text>
          </ImageBackground> :
          <View style={[styles.filterContainer, { backgroundColor: (item.title === FilterData) ? '#1F487C' : '#FFFFFF' }]}>
            <Image source={item.icon} style={{ marginRight: 5, width: item.title === 'Luxury Coach' ? 14 : item.title === 'Sleeper' ? 23 : 16, height: item.title === 'Luxury Coach' ? 20 : 16, tintColor: (item.title === FilterData) ? '#FFFFFF' : '#1F487C' }} />
            <Text style={[styles.filterTitle, { color: (item.title === FilterData) ? '#FFFFFF' : '#1F487C' }]}>{item.title}</Text>
            {(item.title === 'Filters' || item.title === 'Sort') && (
              <Image
                source={require('../assets/Filters/downArrow.png')}
                style={styles.filteAarrowIcon}
              />
            )}
          </View>
        }
      </TouchableOpacity>
    );
  };

  //ViewMore
  const onStatusSelection = (item, index) => {
    console.log('Clicked status Button===', item, index);
    setStatusVisible(false);
  };

  const backNavigationClick = (page) => {
    //props.navigation.popToTop();
    props.navigation.pop(2)

  }

  const OnClickFilterButton = () => {
    if (isFilterSelect === false) {
      setFilterScreenVisible(true);
    }
    setFilterSelect(!isFilterSelect)

  };

  const OnClickCategoryListFilter = (item, index) => {
    console.log('Clicked status Button===', item, index);
    setFilterData(item.title);
    // if (index === 0) {
    //   setFilterScreenVisible(true);
    // } else
    if (index === 0) {
      setSortScreenVisible(true);
    }


  };


  const onShare = async () => {
    try {
      const result = await Share.share({
        url: 'https://www.figma.com/design/Rvnet2sk2hYHtygXO8we1b/React-Native-design?node-id=0-1&t=pIfJCnAfnvs5wrGB-0',
        message:
          'Designed exclusively for travellers, TBS’s pioneering technology consolidates your bus booking into one easy-to-use platform, custom built to your exact requirements.'
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: (FilterData === 'Luxury Coach') ? '#F6B642' : '#1F487C' }}
      edges={['right', 'left', 'top']}>
      <View style={styles.container}>{
        (FilterData === 'Luxury Coach') ?
          <ImageBackground source={require('../assets/luxuryHeaderBg.png')} style={{
            width: '100%',
            flexDirection: 'row',
            backgroundColor: '#F6B642', height: 50
          }} imageStyle={{
            resizeMode: 'cover',
          }}>
            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                padding: 5,
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => backNavigationClick()}>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                  <Svg style={{ width: 30, height: 30, borderRadius: 100 }}>
                    <BackWhite width="100%" height="100%" color='#393939' />
                  </Svg>
                </View>
              </TouchableOpacity>
              <View
                style={styles.topSubView}>
                <View
                  style={styles.leftPlaceView}>
                  <View
                    style={styles.leftPlaceSubView}>
                    <Text
                      style={[styles.fromPlaceTxt, { color: '#393939' }]}>
                      Chennai
                    </Text>
                    <Text
                      style={[styles.fromDateTxt, { color: '#393939' }]}>
                      Tues 20 Feb
                    </Text>
                  </View>
                  <View style={{ paddingHorizontal: 10, }}>
                    <Svg style={{ width: 54, height: 25, borderRadius: 100 }}>
                      <HeadWhite width="100%" height="100%" color="#393939" />
                    </Svg>
                  </View>
                  <View
                    style={styles.dropPlaceView}>
                    <Text
                      style={[styles.dropPlaceTxt, { color: '#393939' }]}>
                      Hyderabad
                    </Text>
                    <View
                      style={styles.buseCountView}>
                      <Svg style={{ width: 16, height: 16 }}>
                        <BusIcon width="80%" height="100%" color="#393939" />
                      </Svg>
                      <Text
                        style={[styles.buseCountTxt, { color: '#393939' }]}>
                        133 Buses
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              // onPress={onShare}
              >
                <View style={{ flex: 1, justifyContent: 'center' }}>
                  <Svg style={{ width: 30, height: 30, borderRadius: 100 }}>
                    {/* <ShareIcone width="100%" height="100%"  color = "#393939"/> */}
                  </Svg>
                </View>
              </TouchableOpacity>
            </View>
          </ImageBackground> :
          <View style={styles.headerView}>

            <ImageBackground
              source={require('../assets/HeadBg.png')}
              style={styles.topBgImage}
              imageStyle={{
                resizeMode: 'cover',
              }}>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => backNavigationClick()}>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                  <Svg style={{ width: 30, height: 30, borderRadius: 100 }}>
                    <BackWhite width="100%" height="100%" />
                  </Svg>
                </View>
              </TouchableOpacity>
              <View
                style={styles.topSubView}>
                <View
                  style={styles.leftPlaceView}>
                  <View
                    style={styles.leftPlaceSubView}>
                    <Text
                      style={styles.fromPlaceTxt}>
                      Chennai
                    </Text>
                    <Text
                      style={styles.fromDateTxt}>
                      Tues 20 Feb
                    </Text>
                  </View>
                  <View style={{ paddingHorizontal: 10 }}>
                    <Svg style={{ width: 54, height: 25, borderRadius: 100 }}>
                      <HeadWhite width="100%" height="100%" />
                    </Svg>
                  </View>
                  <View
                    style={styles.dropPlaceView}>
                    <Text
                      style={styles.dropPlaceTxt}>
                      Hyderabad
                    </Text>
                    <View
                      style={styles.buseCountView}>
                      <Svg style={{ width: 18, height: 18 }}>
                        <BusIcon width="80%" height="100%" />
                      </Svg>
                      <Text
                        style={styles.buseCountTxt}>
                        133 Buses
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              //onPress={onShare}
              >
                <View style={{ flex: 1, marginTop: 5, justifyContent: 'center' }}>
                  <Svg style={{ width: 30, height: 30, borderRadius: 100 }}>
                    {/* <ShareIcone width="100%" height="100%" /> */}
                  </Svg>
                </View>
              </TouchableOpacity>
            </ImageBackground>
          </View>
      }

        <View
          style={{
            height: 100, // Decrease the height as needed
          }}>
          <Swiper
            loop={true}
            ref={swiperRef}
            autoplay={true}
            autoplayTimeout={5}
            showsPagination={false}>
            {colors.map((item, index) => (
              <View key={index} style={styles.slide}>
                <Image
                  //source={{ uri: `${banner1?.image}` }}
                  source={require('../assets/Banner.gif')}
                  style={styles.image}
                  resizeMode="cover"
                />
                {/* //<Text style={styles.welcomeText}>List{index}</Text> */}
              </View>
            ))}
          </Swiper>
        </View>
        <View style={{ paddingHorizontal: 5, paddingTop: 8, paddingBottom: 2, flexDirection: 'row' }}>
          <View style={[isMinimized === true && { // iOS shadow
            shadowColor: '#000',
            borderRadius: 5,
            shadowOffset: { width: 6, height: 0 }, // Right shadow
            shadowOpacity: 0.3,
            shadowRadius: 5,
            // Android shadow (elevation)
            elevation: 10, // Higher value = more shadow

          }]}>
            <TouchableOpacity style={[{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              minWidth: 40,
              height: 30,
              paddingVertical: 5,
              paddingHorizontal: 8,
              borderWidth: 1,
              borderColor: '#1F487C',
              backgroundColor: (isFilterSelect === true) ? '#1F487C' : '#FFFFFF',
              borderRadius: 5,
              marginRight: 5,
            }]}

              onPress={() => OnClickFilterButton()}
            >
              <Image source={require('../assets/Filters/Filter.png')} style={{ marginRight: 5, width: 16, height: 16, tintColor: (isFilterSelect === true) ? '#FFFFFF' : '#1F487C' }} />
              {!isMinimized && ( // Conditionally render text when not minimized
                <>
                  <Text style={[styles.filterTitle, { color: (isFilterSelect === true) ? '#FFFFFF' : '#1F487C' }]}>{'Filters'}</Text>
                  <Image
                    source={require('../assets/Filters/downArrow.png')}
                    style={styles.filteAarrowIcon}
                  />
                </>
              )}
            </TouchableOpacity>
          </View>
          <FlatList
            data={dataFilter}
            horizontal
            bounces={false} // Disable the bounce effect
            onScroll={handleScroll} // Detect scroll
            scrollEventThrottle={16} // Increase responsiveness of onScroll
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={({ item, index }) => (
              <HorizontalFilterListItem item={item} Index={index} />
            )}
          />
        </View>
        <FlatList
          data={colors}
          renderItem={({ item }) => (
            (userPlan === true && FilterData === 'Luxury Coach') ?
              <TripLuxuryCoachListRow
                title={'Bus 1'}
                description={'Operator'}
                image_url={''}
              /> : (userPlan === true) ? <TripPlanListRow
                title={'Bus 1'}
                description={'Operator'}
                image_url={''}
              /> :
                <TripListRow
                  title={'Bus 1'}
                  description={'Operator'}
                  image_url={''}
                />
          )}
          keyExtractor={item => item.toString()}
        />
      </View>
      <View>
        <ViewMoreScreen
          visible={statusVisible}
          onClose={() => setStatusVisible(false)}
          Data={'Trip seats and details'}
        />
      </View>
      <View>
        <SortInsightsScreen
          visible={sortScreenVisible}
          onClose={() => setSortScreenVisible(false)}
          Data={'Trip seats and details'}
        />
      </View>
      <View>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null}>
          <FilterInsightsScreen
            visible={filterScreenVisible}
            onClose={() => setFilterScreenVisible(false)}
            Data={'Trip seats and details'}
            isLuxuryUser={userPlan}
          />
        </KeyboardAvoidingView>
      </View>
      <FilterModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
};
export default TripListScreen;
