import React, { useState, useEffect } from 'react';
import {
  View,
  Text, KeyboardAvoidingView,
  Animated, ScrollView,
  ImageBackground,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
  Image,
  SectionList, Platform, StatusBar,
} from 'react-native';
import backgroundImage from '../assets/home_bg.png';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { FlatList, TextInput, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Slider from '@react-native-community/slider';

import Slider1 from '@react-native-community/slider';

import thumbImage from '../assets/Bullets.png';

const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

// Get screen dimensions
const { height: screenHeight } = Dimensions.get('window');

const { width: RangeScreenWidth } = Dimensions.get('window');

const { width } = Dimensions.get('window');

const FilterInsightsScreen = ({ visible, onClose, Data, isLuxuryUser }) => {


  const insets = useSafeAreaInsets();

  console.log('status ios :', insets.top);

  const statustopBarheight = (insets.top === 0) ? statusBarHeight : insets.top
  const [selectCurrentSortName, setSelectCurrentSortName] = useState('Vehicle Type');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedFilterValue, setSelectedFilterValue] = useState('Vehicle Type');

  const maxRating = [1, 2, 3, 4, 5];

  const [isSelectedAC, setSelectedAC] = useState('AC')



  const TimeList = [
    {
      id: '1',
      title: 'Morning',
      value: '1',
      Selected: false,
      time: '6 AM to 11 AM',
      image: require('../assets/MorningIcon.png'),
    },
    {
      id: '2',
      title: 'Afternoon',
      value: '2',
      Selected: true,
      time: '11 AM to 6 PM',
      image: require('../assets/AfternoonIcon.png'),
    },
    {
      id: '3',
      title: 'Evening',
      value: '3',
      Selected: false,
      time: '6 PM to 11 PM',
      image: require('../assets/EveningIcon.png'),
    },
    {
      id: '4',
      title: 'Late Night',
      value: '4',
      Selected: false,
      time: '11 PM to 6 AM',
      image: require('../assets/LateNightIcon.png'),
    },
  ];

  const AmentiesList = [
    {
      id: '1',
      title: 'Wi-Fi',
      value: '1',
      Selected: false,
      count: '15',
    },
    {
      id: '2',
      title: 'Water Bottle',
      value: '2',
      Selected: true,
      time: '11 AM to 6 PM',
      count: '15',
    },
    {
      id: '3',
      title: 'Toilet',
      value: '3',
      Selected: false,
      time: '6 PM to 11 PM',
      count: '15',
    },
    {
      id: '4',
      title: 'Blankets',
      value: '4',
      Selected: true,
      time: '11 PM to 6 AM',
      count: '15',
    },
    {
      id: '5',
      title: 'Charging Point',
      value: '4',
      Selected: false,
      time: '11 PM to 6 AM',
      count: '15',
    },
    {
      id: '6',
      title: 'Charging Point',
      value: '4',
      Selected: false,
      time: '11 PM to 6 AM',
      count: '15',
    },
    {
      id: '7',
      title: 'Charging Point',
      value: '4',
      Selected: false,
      time: '11 PM to 6 AM',
      count: '15',
    },
    {
      id: '8',
      title: 'Bed Sheet',
      value: '4',
      Selected: false,
      time: '11 PM to 6 AM',
      count: '15',
    },
  ];

  const sortListAry = [
    {
      id: '1',
      title: 'Vehicle Type',
      keyValue: 'Vehicle Type',
      isSelect: false,
      data: [
        { id: '1', title: 'High to Low', value: '1', Selected: false },
        { id: '2', title: 'Low to High', value: '2', Selected: false },
      ],
    },
    {
      id: '2',
      title: 'Star Ratings',
      keyValue: 'Star Ratings',
      isSelect: false,
      data: [
        { id: '1', title: 'High to Low', value: '1', Selected: false },
        { id: '2', title: 'Low to High', value: '2', Selected: false },
      ],
    },
    {
      id: '3',
      title: 'Price Range',
      keyValue: 'Price Range',
      isSelect: false,
      data: [
        { id: '1', title: 'High to Low', value: '1', Selected: false },
        { id: '2', title: 'Low to High', value: '2', Selected: false },
      ],
    },
    {
      id: '4',
      title: 'Boarding Points',
      keyValue: 'Boarding Points',
      isSelect: false,
      data: [
        { id: '1', title: 'Earliest to Latest', value: '1', Selected: false },
        { id: '2', title: 'Latest to Earliest', value: '2', Selected: false },
      ],
    },
    {
      id: '5',
      title: 'Boarding Time',
      keyValue: 'Boarding Time',
      isSelect: false,
      data: [
        { id: '1', title: 'Earliest to Latest', value: '1', Selected: false },
        { id: '2', title: 'Latest to Earliest', value: '2', Selected: false },
      ],
    },
    {
      id: '6',
      title: 'Travel Operators',
      keyValue: 'Travel Operators',
      isSelect: false,
      data: [
        { id: '1', title: 'Earliest to Latest', value: '1', Selected: false },
        { id: '2', title: 'Latest to Earliest', value: '2', Selected: false },
      ],
    },
    {
      id: '7',
      title: 'Dropping Points',
      keyValue: 'Dropping Points',
      isSelect: false,
      data: [
        { id: '1', title: 'Earliest to Latest', value: '1', Selected: false },
        { id: '2', title: 'Latest to Earliest', value: '2', Selected: false },
      ],
    },
    {
      id: '8',
      title: 'Dropping time',
      keyValue: 'Dropping time',
      isSelect: false,
      data: [
        { id: '1', title: 'Earliest to Latest', value: '1', Selected: false },
        { id: '2', title: 'Latest to Earliest', value: '2', Selected: false },
      ],
    },
    {
      id: '9',
      title: 'Amenities',
      keyValue: 'Amenities',
      isSelect: false,
      data: [
        { id: '1', title: 'Earliest to Latest', value: '1', Selected: false },
        { id: '2', title: 'Latest to Earliest', value: '2', Selected: false },
      ],
    },
  ];


  const PointsList = [
    {
      title: 'Popular',
      data: [{
        id: '1',
        title: 'Poonamallee',
        Selected: false,
        count: '15',
      }, {
        id: '2',
        title: 'Sriperumbudur',
        Selected: false,
        count: '15',
      },
      {
        id: '3',
        title: 'Koyambedu',
        Selected: true,
        count: '15',
      },
      {
        id: '4',
        title: 'Vadapalani',
        Selected: false,
        count: '15',
      }, {
        id: '5',
        title: 'Ashok Pillar',
        Selected: true,
        count: '15',
      }],
    },
    {
      title: 'Others',
      data: [{
        id: '1',
        title: 'Poonamallee',
        Selected: false,
        count: '15',
      }, {
        id: '2',
        title: 'Sriperumbudur',
        Selected: true,
        count: '15',
      },
      {
        id: '3',
        title: 'Koyambedu',
        Selected: false,
        count: '15',
      },
      {
        id: '4',
        title: 'Vadapalani',
        Selected: true,
        count: '15',
      }, {
        id: '5',
        title: 'Ashok Pillar',
        Selected: false,
        count: '15',
      }, {
        id: '6',
        title: 'Dilsukhnagar',
        Selected: false,
        count: '15',
      }, {
        id: '7',
        title: 'Lakdikapul',
        Selected: false,
        count: '15',
      },
      {
        id: '8',
        title: 'Sr Nagar',
        Selected: false,
        count: '15',
      },
      {
        id: '9',
        title: 'KPHB-Pulla Reddy',
        Selected: false,
        count: '15',
      }, {
        id: '10',
        title: 'Ashok Pillar',
        Selected: false,
        count: '15',
      }],
    },
    // Add more sections here
  ];

  const StartRatingList = [
    {
      id: '1',
      title: '5',
      value: 5,
      Selected: false,
      count: '15',
    },
    {
      id: '2',
      title: '4',
      value: 4,
      Selected: true,
      count: '15',
    },
    {
      id: '3',
      title: '3',
      value: 3,
      Selected: false,
      count: '15',
    },
    {
      id: '4',
      title: '2',
      value: 2,
      Selected: false,
      count: '15',
    },
    {
      id: '5',
      title: '1',
      value: 1,
      Selected: false,
      count: '15',
    },

  ];

  const SeatTypeList = [
    {
      id: '1',
      title: 'Seater',
      value: '1',
      Selected: false,
      image: require('../assets/Filters/Seater.png'),
    },
    {
      id: '2',
      title: 'Semi Sleeper',
      value: '2',
      Selected: true,
      image: require('../assets/Filters/SemiSeater.png'),
    },
    {
      id: '3',
      title: 'Sleeper',
      value: '3',
      Selected: false,
      image: require('../assets/Filters/Sleepers.png'),
    },
  ];

  const TravelOperatorList = [
    {
      title: 'Popular',
      data: [{
        id: '1',
        title: 'Poonamallee',
        Selected: true,
        count: '15',
      }, {
        id: '2',
        title: 'Sriperumbudur',
        Selected: false,
        count: '15',
      },
      {
        id: '3',
        title: 'Koyambedu',
        Selected: true,
        count: '15',
      },
      {
        id: '4',
        title: 'Vadapalani',
        Selected: false,
        count: '15',
      }, {
        id: '5',
        title: 'Ashok Pillar',
        Selected: true,
        count: '15',
      }],
    },
    {
      title: 'Others',
      data: [{
        id: '1',
        title: 'Poonamallee',
        Selected: false,
        count: '15',
      }, {
        id: '2',
        title: 'Sriperumbudur',
        Selected: true,
        count: '15',
      },
      {
        id: '3',
        title: 'Koyambedu',
        Selected: false,
        count: '15',
      },
      {
        id: '4',
        title: 'Vadapalani',
        Selected: false,
        count: '15',
      }, {
        id: '5',
        title: 'Ashok Pillar',
        Selected: true,
        count: '15',
      }, {
        id: '6',
        title: 'Dilsukhnagar',
        Selected: false,
        count: '15',
      }, {
        id: '7',
        title: 'Lakdikapul',
        Selected: false,
        count: '15',
      },
      {
        id: '8',
        title: 'Sr Nagar',
        Selected: false,
        count: '15',
      },
      {
        id: '9',
        title: 'KPHB-Pulla Reddy',
        Selected: false,
        count: '15',
      }, {
        id: '10',
        title: 'Ashok Pillar',
        Selected: false,
        count: '15',
      }],
    },
    // Add more sections here
  ];

  // const [price, setPrice] = useState(500);
  // const minPrice = 260;
  // const maxPrice = 1260;
  // // const sliderWidth = (RangeScreenWidth * 0.60) - 40 ; // Adjust based on your container's padding/margin
  // const sliderWidth = 200 - 40;
  // // Calculate the position for the floating label
  // const calculateLabelPosition = () => {
  //   const percentage = (price - minPrice) / (maxPrice - minPrice);
  //   return percentage * sliderWidth;
  // };

  // New Price range
  const [price1, setPrice1] = useState(500);
  const minPrice1 = 260;
  const maxPrice1 = 1260;

  const sliderWidth1 = width * 0.7; // 70% of the screen width
  const thumbWidth1 = 30; // Assume the thumb is 30px wide (adjust if different)
  const labelWidth1 = 50; // Assume the label is 50px wide (adjust if different)

  const animatedValue1 = useState(new Animated.Value(0))[0];

  useEffect(() => {
    // Initial position calculation
    handleValueChange(price1);
  }, []);

  const handleValueChange = (value) => {
    setPrice1(value);

    // Calculate the exact position of the thumb
    const ratio = (value - minPrice1) / (maxPrice1 - minPrice1);
    const position = ratio * (sliderWidth1 / 2) - (thumbWidth1 / 2) - 50;

    // Update the animated value
    Animated.timing(animatedValue1, {
      toValue: position,
      duration: 100, // smooth transition
      useNativeDriver: false,
    }).start();
  };


  const Separator = () => <View style={styles.separator} />;

  // Manage state for expanded sections
  const [sections, setSections] = useState(
    PointsList.map(section => ({ ...section, expanded: false })));

  // Function to toggle section
  const toggleSection = (getIndex) => {
    setSections(prevSections =>
      prevSections.map((section, i) =>
        i === getIndex
          ? { ...section, expanded: !section.expanded }
          : { ...section, expanded: false }
      )
    );
  };

  function SortMainRowView({ item, index, LastCount }) {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedIndex(index);
          setSelectCurrentSortName(item.title);
          setSelectedFilterValue(item.keyValue);
        }}>
        <View
          style={[
            {
              flex: 1,
              flexDirection: 'row',
              borderBottomWidth: 0.9,
              borderColor: '#1F487C',
              borderBottomEndRadius: (LastCount === index && selectedFilterValue !== item.keyValue) ? 20 : 0,
              height: 49,
            },
            selectedFilterValue === item.keyValue
              ? {
                borderRightWidth: 0.0,
                backgroundColor: 'rgba(52, 52, 52, 0.0)',
              }
              : {
                borderRightWidth: 0.9,
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
              },
          ]}>
          {selectedFilterValue === item.keyValue && (
            <View
              style={{
                backgroundColor: '#1F487C',
                height: '100%',
                width: 8,
              }}></View>
          )}
          <Text
            style={[
              {
                alignSelf: 'center',
                fontFamily: 'Inter',
                textAlign: 'justify',
              },
              selectedFilterValue === item.keyValue
                ? {
                  color: '#1F487C',
                  fontWeight: '600',
                  fontSize: 14,
                  lineHeight: 18,
                  paddingHorizontal: 10,
                }
                : {
                  color: '#393939',
                  fontWeight: '400',
                  fontSize: 13,
                  lineHeight: 16,
                  paddingHorizontal: 15,
                },
            ]}>
            {item.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
  function SortingSubRowView({ item, index }) {
    return (
      <TouchableOpacity
        style={{ padding: 12 }}
        onPress={() => {
          console.log('clicked');
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontWeight: '400',
              fontSize: 16,
              fontFamily: 'Inter',
              color: '#1F487C',
              lineHeight: 20,
            }}>
            {item.title}
          </Text>
          <Image
            source={require('../assets/UnSelectSort.png')}
            style={{ width: 20, height: 20, marginLeft: 20 }}
          />
        </View>
      </TouchableOpacity>
    );
  }

  const RenderViewSectionHeader = ({ section }) => {
    console.log('index---' + section.expanded)
    const index = PointsList.findIndex(s => s.title === section.title);
    return (
      <TouchableOpacity onPress={() => toggleSection(index)}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '96%',
            paddingVertical: 10,
          }}>
          <Text
            style={{
              fontWeight: '600',
              fontSize: 16,
              fontFamily: 'Inter',
              color: '#1F487C',
              lineHeight: 18,
            }}>
            {section.title}
          </Text>
          <Image
            source={section.expanded === true ? require('../assets/UpArrowFilterIcon.png') : require('../assets/DownFilterIcon.png')}
            style={{ width: 15, height: 8 }}
          />
        </View>
      </TouchableOpacity>
    );
  };
  const renderViewSectionFooter = ({ section }) => {
    return (
      <View
        style={{
          paddingHorizontal: 15,
          paddingVertical: 5,
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#1F487C',
            paddingHorizontal: 15,
            height: 30,
          }}>
          <Text
            style={{
              fontWeight: '300',
              fontSize: 14,
              fontFamily: 'Inter',
              color: '#FFFFFF',
              lineHeight: 17,
            }}>
            {'200 Seats'}
          </Text>
          <Image
            source={require('../assets/ArrowRight.gif')}
            style={{ width: 14, height: 15, marginHorizontal: 5 }}
          />
        </View>
      </View>
    );
  };

  const FilterBoardingDropTimeView = () => {
    return (
      <View style={{ alignItems: 'flex-start', marginLeft: 10 }}>
        <FlatList
          data={TimeList}
          renderItem={({ item, index }) => {
            return <BoardingTimeRowView item={item} index={index} />;
          }}
          contentContainerStyle={{ gap: 20 }}
          keyExtractor={(item, index) => item + index}
        />
      </View>
    );
  };

  function BoardingTimeRowView({ item, index }) {
    return (
      <TouchableOpacity
        onPress={() => {
          console.log('clicked');
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 12,
            borderColor: '#C9C9C9',
            backgroundColor: item.Selected === true ? '#1F487C' : '#FFFFFF',
            borderWidth: 1,
            paddingHorizontal: 10,
          }}>
          <Image
            source={item.image}
            style={{
              width: 28,
              height: 28,
              tintColor: item.Selected === true ? '#FFFFFF' : 'rgba(74, 74, 74, 0.6)',
              marginHorizontal: 10,
              resizeMode: 'cover',
            }}
          />
          <View
            style={{
              flexDirection: 'column',
              paddingVertical: 2,
              paddingHorizontal: 10,
            }}>
            <Text
              style={{
                fontWeight: '600',
                fontSize: 16,
                fontFamily: 'Inter',
                color: item.Selected === true ? '#FFFFFF' : '#4A4A4A',
                lineHeight: 22,
              }}>
              {item.title}
            </Text>
            <Text
              style={{
                fontWeight: '400',
                fontSize: 13,
                fontFamily: 'Inter',
                color: item.Selected === true ? '#FFFFFF' : '#4A4A4A',
                lineHeight: 22,
              }}>
              {item.time}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  const FilterAmenitiesView = () => {
    return (
      <View style={{ alignItems: 'flex-start', marginHorizontal: 10 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            width: '100%',
            height: 33,
            borderWidth: 0.5,
            borderColor: 'rgba(31, 72, 124, 0.5)',
            borderRadius: 18,
            paddingHorizontal: 15,
            marginBottom: 5,

          }}>
          <Image
            source={require('../assets/FilterSearchIcon.png')}
            style={{
              width: 11,
              height: 11,
              resizeMode: 'cover',
              marginRight: 10,
            }}
          />
          <TextInput
            style={{
              fontWeight: '300',
              fontSize: 10,
              fontFamily: 'Inter',
              color: '#1F487C',
              lineHeight: 14,
            }}
            placeholder="Search Amenities"
            placeholderTextColor="rgba(31, 72, 124, 0.8)"
          />
        </View>
        <FlatList
          data={AmentiesList}
          renderItem={({ item, index }) => {
            return <AmenitiesRowView item={item} index={index} />;
          }}
          contentContainerStyle={{ gap: 5 }}
          keyExtractor={(item, index) => item + index}
        />
      </View>
    );
  };

  function AmenitiesRowView({ item, index }) {
    return (
      <TouchableOpacity
        onPress={() => {
          console.log('clicked');
        }}>
        <View
          style={{
            flex: 1,
            width: '96%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderColor: '#C9C9C9',
            paddingVertical: 4,
          }}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Image
              source={
                item.Selected === true
                  ? require('../assets/selectTick.png')
                  : require('../assets/UnCheckBlockIcon.png')
              }
              style={{
                width: 15,
                height: 15,
                resizeMode: 'cover',
                marginRight: 10,
              }}
            />
            <Text
              style={{
                fontWeight: '400',
                fontSize: 12,
                fontFamily: 'Inter',
                color: '#4A4A4A',
                lineHeight: 14,
              }}>
              {item.title}
            </Text>
          </View>
          <Text
            style={{
              alignSelf: 'flex-end',
              fontWeight: '400',
              fontSize: 10,
              fontFamily: 'Inter',
              color: '#9B9B9B',
              lineHeight: 12,
              textAlign: 'right',
            }}>
            {'(14)'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }


  const StartRatingView = () => {
    return (
      <View style={{ alignItems: 'flex-start', marginHorizontal: 10 }}>
        <FlatList
          data={StartRatingList}
          renderItem={({ item, index }) => {
            return <StartRatingRowView item={item} index={index} />;
          }}
          contentContainerStyle={{ gap: 5 }}
          keyExtractor={(item, index) => item + index}
        />
      </View>
    );
  };

  function StartRatingRowView({ item, index }) {
    return (
      <TouchableOpacity
        onPress={() => {
          console.log('clicked');
        }}>
        <View
          style={{
            flex: 1,
            width: '96%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderColor: '#C9C9C9',
            paddingVertical: 6,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center'
            }}>
            <Image
              source={
                item.Selected === true
                  ? require('../assets/selectTick.png')
                  : require('../assets/UnCheckBlockIcon.png')
              }
              style={{
                width: 18,
                height: 18,
                resizeMode: 'cover',
                marginRight: 10,
                marginTop: 2,
              }}
            />
            <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', }}>
              {
                maxRating.map(rates => {
                  return (
                    <View>
                      <Image
                        style={{
                          width: 20,
                          height: 20,
                          resizeMode: 'cover',
                          marginRight: 6,
                        }}
                        source={
                          rates <= item.value
                            ? require('../assets/FilterFullStar.png') : require('../assets/FilterEmptyStar.png')

                        }
                      />
                    </View>
                  )
                })

              }

            </View>
          </View>
          <Text
            style={{
              alignSelf: 'flex-end',
              fontWeight: '400',
              fontSize: 10,
              fontFamily: 'Inter',
              color: '#9B9B9B',
              lineHeight: 13,
              textAlign: 'right',
            }}>
            {'(14)'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  const VehicleTypeView = () => {
    return (
      <View style={{ alignItems: 'flex-start', marginHorizontal: 10 }}>

        <View style={{ flexDirection: 'row', width: '100%', gap: 8 }}>
          <TouchableOpacity style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 6,
            borderColor: '#1F487C',
            backgroundColor: isSelectedAC === 'AC' ? '#1F487C' : '#FFFFFF',
            borderWidth: 0.5,
            borderRightWidth: 5,
          }}
            onPress={() => {
              console.log('clicked');
              setSelectedAC('AC')
            }}>


            <Image
              source={require('../assets/Filters/Ac.png')
              }
              style={{
                width: 20,
                height: 18,
                resizeMode: 'cover',
                marginRight: 5,
                tintColor: isSelectedAC === 'AC' ? '#FFFFFF' : '#1F487C',

              }}
            />
            <Text
              style={{
                fontWeight: '600',
                fontSize: 14,
                fontFamily: 'Inter',
                color: isSelectedAC === 'AC' ? '#FFFFFF' : '#1F487C',
                lineHeight: 16,
              }}>
              AC
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 6,
            borderColor: '#1F487C',
            backgroundColor: isSelectedAC === 'NonAC' ? '#1F487C' : '#FFFFFF',
            borderWidth: 0.5,
            borderRightWidth: 5,
            paddingVertical: 8,
          }}
            onPress={() => {
              setSelectedAC('NonAC')
              console.log('clicked');
            }}>


            <Image
              source={require('../assets/Filters/NonAc.png')
              }
              style={{
                width: 20,
                height: 18,
                resizeMode: 'cover',
                tintColor: isSelectedAC === 'NonAC' ? '#FFFFFF' : '#1F487C',
                marginRight: 5,
              }}
            />
            <Text
              style={{
                fontWeight: '600',
                fontSize: 14,
                fontFamily: 'Inter',
                color: isSelectedAC === 'NonAC' ? '#FFFFFF' : '#1F487C',
                lineHeight: 16,
              }}>
              {"Non AC"}
            </Text>


          </TouchableOpacity>
        </View>
        <View style={{ paddingTop: 25, paddingBottom: 8 }}>
          <Text style={{
            fontWeight: '600',
            fontSize: 16,
            fontFamily: 'Inter',
            color: '#1F487C',
            lineHeight: 20,
          }}>Seat Type</Text>
        </View>
        <FlatList
          data={SeatTypeList}
          renderItem={({ item, index }) => {
            return <VehicleTypeRowView item={item} index={index} />;
          }}
          contentContainerStyle={{ gap: 2 }}
          keyExtractor={(item, index) => item + index}
        />
      </View>
    );
  };

  function VehicleTypeRowView({ item, index }) {
    return (
      <TouchableOpacity
        onPress={() => {
          console.log('clicked');
        }}>
        <View
          style={{
            flex: 1,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            borderRadius: 6,
            borderColor: '#1F487C',
            backgroundColor: item.Selected === true ? '#1F487C' : '#FFFFFF',
            borderWidth: 0.5,
            borderRightWidth: 5,
            paddingVertical: 10,
            paddingLeft: 10,
            paddingRight: 10,
            marginVertical: 8,
          }}>

          <Image
            source={item.image
            }
            style={{
              width: 20,
              height: 18,
              resizeMode: 'cover',
              marginRight: 10,
              tintColor: item.Selected === true ? '#FFFFFF' : '#1F487C'
            }}
          />
          <Text
            style={{
              fontWeight: '600',
              fontSize: 14,
              fontFamily: 'Inter',
              color: item.Selected === true ? '#FFFFFF' : '#1F487C',
              lineHeight: 17,
            }}>
            {item.title}
          </Text>

        </View>
      </TouchableOpacity>
    );
  }

  // const PriceRangeView = () => {
  //   return (
  //     <View style={{ width: 200, padding: 20, }}>

  //       <View style={styles.sliderContainer}>
  //         <View style={styles.startingPointCircle} />
  //         <Slider
  //           style={styles.slider}
  //           minimumValue={minPrice}
  //           maximumValue={maxPrice}
  //           step={1}
  //           value={price}
  //           onValueChange={(value) => setPrice(value)}
  //           minimumTrackTintColor="transparent" // Make the minimum track transparent to show the custom filled track
  //           maximumTrackTintColor="#d3d3d3"
  //           thumbImage={thumbImage}               // Set the thumb image
  //         />
  //         <View style={[styles.filledTrack, { width: calculateLabelPosition() }]} />

  //         <View style={[styles.floatingLabel, { left: calculateLabelPosition() - 20 }]}>
  //           <Text style={styles.floatingLabelText}>₹{price}</Text>
  //         </View>
  //         {/* <View style={styles.staticLabel}>
  //         <Text style={styles.staticLabelText}>₹{minPrice}</Text>
  //       </View>
  //       <View style={styles.staticLabelMax}>
  //         <Text style={styles.staticLabelText}>₹{maxPrice}</Text>
  //       </View> */}
  //       </View>
  //       <View style={{ flexDirection: 'row', marginTop: 20, gap: 15, width: '100%' }}>
  //         <View style={{ flex: 1 }}>
  //           <Text style={{
  //             fontWeight: '500',
  //             fontSize: 14,
  //             fontFamily: 'Inter',
  //             color: '#1F487C',
  //             lineHeight: 17,
  //             paddingBottom: 5,
  //           }}>Min. Price</Text>
  //           <View style={{
  //             flexDirection: 'row',
  //             justifyContent: 'flex-start',
  //             alignItems: 'center',
  //             borderRadius: 5,
  //             borderColor: '#1F487C',
  //             backgroundColor: '#FFFFFF',
  //             borderWidth: 0.5,
  //             padding: 8,
  //           }}>
  //             <TextInput
  //               style={{
  //                 fontWeight: '500',
  //                 fontSize: 12,
  //                 fontFamily: 'Inter',
  //                 color: '#1F487C',
  //                 lineHeight: 16,
  //               }}
  //               placeholder={"₹0 "}
  //               placeholderTextColor="#9B9B9B" />
  //           </View>
  //         </View>
  //         <View style={{ flex: 1 }}>
  //           <Text style={{
  //             fontWeight: '500',
  //             fontSize: 14,
  //             fontFamily: 'Inter',
  //             color: '#1F487C',
  //             lineHeight: 17,
  //             paddingBottom: 5,
  //           }}>Max. Price</Text>
  //           <View style={{
  //             flexDirection: 'row',
  //             justifyContent: 'flex-start',
  //             alignItems: 'center',
  //             borderRadius: 5,
  //             borderColor: '#1F487C',
  //             backgroundColor: '#FFFFFF',
  //             borderWidth: 0.5,
  //             padding: 8,
  //           }}>
  //             <TextInput
  //               style={{
  //                 fontWeight: '500',
  //                 fontSize: 12,
  //                 fontFamily: 'Inter',
  //                 color: '#1F487C',
  //                 lineHeight: 16,

  //               }}
  //               placeholder={"₹500 "}
  //               placeholderTextColor="#9B9B9B" />
  //           </View>
  //         </View>
  //       </View>
  //       {/* <View style={styles.priceInputs}>
  //       <View style={styles.inputContainer}>
  //         <Text style={styles.inputLabel}>Min. Price</Text>
  //         <TextInput style={styles.input} value={`₹${minPrice}`} editable={false} />
  //       </View>
  //       <View style={styles.inputContainer}>
  //         <Text style={styles.inputLabel}>Max. Price</Text>
  //         <TextInput style={styles.input} value={`₹${price}`} editable={false} />
  //       </View>
  //     </View> */}

  //     </View>
  //   );
  // };


  const BoardingDroppingPointsView = ({ filterKey }) => {

    return (
      <View style={{ alignItems: 'flex-start', flex: 1, marginHorizontal: 10 }}>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            width: '100%',
            height: 33,
            borderWidth: 0.5,
            borderColor: 'rgba(31, 72, 124, 0.5)',
            borderRadius: 18,
            paddingHorizontal: 15,
            marginBottom: 5,
          }}>

          <Image
            source={require('../assets/FilterSearchIcon.png')}
            style={{
              width: 11,
              height: 11,
              resizeMode: 'cover',
              marginRight: 10,
            }}
          />
          <TextInput
            style={{
              fontWeight: '300',
              fontSize: 10,
              fontFamily: 'Inter',
              color: '#1F487C',
              lineHeight: 14,
            }}
            autoFocus={false}
            placeholder={"Search " + filterKey}
            placeholderTextColor="rgba(31, 72, 124, 0.8)"
          />
        </View>

        <View style={{ flex: 1, overflow: 'scroll' }}>
          <SectionList
            sections={sections.map(section => ({
              ...section,
              data: section.expanded ? section.data : [], // Show items only if expanded
            }))}
            renderItem={({ item, index }) => {
              console.log('Mohan section number' + item.title)

              return <DroppingPointRowView item={item} index={index} />
            }}
            renderSectionHeader={({ section }) => {
              return <RenderViewSectionHeader section={section} />
            }}
            keyExtractor={(item, index) => item + index}
            stickySectionHeadersEnabled={false}
            stickyHeaderHiddenOnScroll

          />
        </View>
      </View>
    );
  };

  function DroppingPointRowView({ item, index }) {
    return (
      <TouchableOpacity
        onPress={() => {
          console.log('clicked');
        }}>
        <View
          style={{
            flex: 1,
            width: '96%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderColor: '#C9C9C9',
            paddingVertical: 5,
          }}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Image
              source={
                item.Selected === true
                  ? require('../assets/selectTick.png')
                  : require('../assets/UnCheckBlockIcon.png')
              }
              style={{
                width: 15,
                height: 15,
                resizeMode: 'cover',
                marginRight: 10,
              }}
            />
            <Text
              style={{
                fontWeight: '400',
                fontSize: 12,
                fontFamily: 'Inter',
                color: '#4A4A4A',
                lineHeight: 14,
              }}>
              {item.title}
            </Text>
          </View>
          <Text
            style={{
              alignSelf: 'flex-end',
              fontWeight: '400',
              fontSize: 10,
              fontFamily: 'Inter',
              color: '#9B9B9B',
              lineHeight: 12,
              textAlign: 'right',
            }}>
            {'(14)'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (

    <Modal

      animationType="slide"
      transparent={true}
      visible={visible}
      statusBarTranslucent={true}
      onRequestClose={onClose}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
        }}>
        <TouchableOpacity
          style={{ flex: 1, width: '100%' }}
          onPress={onClose}></TouchableOpacity>
        <View
          style={{
            flex: 1,
            backgroundColor: '#E5FFF1',
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            height: screenHeight - ((isLuxuryUser === true) ? statustopBarheight + 50 : statustopBarheight + 150),
            position: 'absolute', //Here is the trick
            bottom: 0, //Here is the trick


          }}>
          <ImageBackground
            source={backgroundImage}
            style={{ flex: 1, resizeMode: 'cover', }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                <View
                  style={{
                    alignItems: 'center',
                    height: 50,
                    justifyContent: 'center',
                  }}
                >
                  <Text
                    style={{
                      color: '#1F487C',
                      textAlign: 'center',
                      fontSize: 22,
                      fontFamily: 'Montserrat',
                      fontWeight: '600',
                    }}
                  >
                    {isLuxuryUser === true ? 'Popular Filters' : 'Filter Insights'}
                  </Text>
                </View>

                <Separator />

                <View style={{ flex: 1, flexDirection: 'row', width: '100%' }}>
                  {/* Left Section */}
                  <View style={{ flex: 1 }}>
                    <FlatList
                      data={sortListAry}
                      renderItem={({ item, index }) => {
                        return <SortMainRowView item={item} index={index} LastCount={sortListAry.length - 1} />;
                      }}
                      keyExtractor={(item, index) => item + index}
                    />
                  </View>

                  {/* Right Section */}
                  <View style={{ flex: 1.5 }}>
                    <View
                      style={{
                        height: 50,
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        paddingLeft: 10,
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: '600',
                          fontSize: 16,
                          fontFamily: 'Inter',
                          color: '#1F487C',
                          lineHeight: 20,
                        }}
                      >
                        {selectedFilterValue === 'Vehicle Type' ? 'Air Condition' : selectCurrentSortName}
                      </Text>
                    </View>

                    {/* Conditional Views */}
                    {(selectedFilterValue === 'Boarding Time' || selectedFilterValue === 'Dropping time') && (
                      <FilterBoardingDropTimeView />
                    )}
                    {selectedFilterValue === 'Vehicle Type' && <VehicleTypeView />}
                    {selectedFilterValue === 'Price Range' && (
                      <View style={{ padding: 10, flex: 1 }}>
                        <View style={styles.labelContainer1}>
                          <Text style={styles.label1}>₹{minPrice1}</Text>
                          <Text style={styles.label1}>₹{maxPrice1}</Text>
                        </View>
                        <View style={styles.sliderContainer1}>
                          {/* Floating label */}
                          <View style={styles.startingPointCircle} />
                          <Animated.View
                            style={[
                              styles.floatingLabel1,
                              {
                                transform: [{ translateX: animatedValue1 }],
                              },
                            ]}
                          >
                            <Text style={styles.floatingLabelText1}>₹{price1}</Text>
                          </Animated.View>
                          <Slider1
                            style={styles.slider1}
                            minimumValue={minPrice1}
                            maximumValue={maxPrice1}
                            step={10}
                            value={price1}
                            onValueChange={handleValueChange}
                            minimumTrackTintColor="#1F487C"
                            maximumTrackTintColor="#C9C9C9"
                            thumbImage={thumbImage}
                          //thumbTintColor="#1F487C"
                          />



                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 25, gap: 15, width: '100%', paddingRight: 10 }}>
                          <View style={{ flex: 1 }}>
                            <Text style={{
                              fontWeight: '500',
                              fontSize: 14,
                              fontFamily: 'Inter',
                              color: '#1F487C',
                              lineHeight: 17,
                              paddingBottom: 5,
                            }}>Min. Price</Text>
                            <View style={{
                              flexDirection: 'row',
                              justifyContent: 'flex-start',
                              alignItems: 'center',
                              borderRadius: 5,
                              borderColor: '#1F487C',
                              backgroundColor: '#FFFFFF',
                              borderWidth: 0.5,
                              padding: 8,
                            }}>
                              <TextInput
                                style={{
                                  fontWeight: '500',
                                  fontSize: 12,
                                  fontFamily: 'Inter',
                                  color: '#1F487C',
                                  lineHeight: 16,
                                }}
                                placeholder={"₹0 "}
                                placeholderTextColor="#9B9B9B" />
                            </View>
                          </View>
                          <View style={{ flex: 1 }}>
                            <Text style={{
                              fontWeight: '500',
                              fontSize: 14,
                              fontFamily: 'Inter',
                              color: '#1F487C',
                              lineHeight: 17,
                              paddingBottom: 5,
                            }}>Max. Price</Text>
                            <View style={{
                              flexDirection: 'row',
                              justifyContent: 'flex-start',
                              alignItems: 'center',
                              borderRadius: 5,
                              borderColor: '#1F487C',
                              backgroundColor: '#FFFFFF',
                              borderWidth: 0.5,
                              padding: 8,
                            }}>
                              <TextInput
                                style={{
                                  fontWeight: '500',
                                  fontSize: 12,
                                  fontFamily: 'Inter',
                                  color: '#1F487C',
                                  lineHeight: 16,

                                }}
                                placeholder={"₹500 "}
                                placeholderTextColor="#9B9B9B" />
                            </View>
                          </View>
                        </View>


                      </View>
                    )}
                    {selectedFilterValue === 'Star Ratings' && <StartRatingView />}
                    {selectedFilterValue === 'Amenities' && <FilterAmenitiesView />}
                    {(selectedFilterValue === 'Boarding Points' ||
                      selectedFilterValue === 'Dropping Points' ||
                      selectedFilterValue === 'Travel Operators') && (
                        <BoardingDroppingPointsView filterKey={selectedFilterValue} />
                      )}
                  </View>
                </View>
              </View>

              <View
                style={{
                  justifyContent: 'flex-end',
                  paddingHorizontal: 12,
                  paddingVertical: 5,
                }}
              >
                {isLuxuryUser === true && (
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginVertical: 5,
                    }}
                  >
                    <Image
                      source={require('../assets/Banner.gif')}
                      style={{
                        height: 150,
                        resizeMode: 'cover',
                        borderRadius: 10,
                        flex: 1,
                      }}
                      resizeMode="cover"
                    />
                  </View>
                )}
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: 40,
                    gap: 10,
                    marginVertical: 5,
                    marginBottom: 15,
                  }}
                >
                  <TouchableOpacity onPress={onClose} style={styles.clearBtn}>
                    <Text style={styles.clearTxt}>CLEAR</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={onClose} style={styles.applyBtn}>
                    <Text style={styles.apply}>APPLY</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </ImageBackground>
        </View>
      </View>
    </Modal>

  );
};

const styles = StyleSheet.create({
  separator: {
    marginVertical: 1,
    borderBottomColor: '#1F487C',
    borderBottomWidth: 1,
  },
  applyBtn: {
    backgroundColor: '#1F487C',
    flex: 1.3,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(31, 72, 124, 0.5)',

  },
  clearBtn: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(31, 72, 124, 0.5)',
  },
  buttonView: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 54,
    paddingHorizontal: 20,
    marginTop: 10,
    paddingBottom: 10,
    marginBottom: 15,
  },
  clearTxt: {
    color: '#1F487C',
    fontSize: 16,
    fontFamily: 'Inter',
    textAlign: 'center',
    fontWeight: '600',
    padding: 10,
  },
  apply: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter',
    textAlign: 'center',
    fontWeight: '600',
    padding: 10,
  },
  startingPointCircle: {
    position: 'absolute',
    width: 16, // Adjust size as needed
    height: 16,
    borderWidth: 3,
    borderColor: '#1F487C',
    backgroundColor: '#FFFFFF', // The color for the circle
    borderRadius: 10, // Half of width and height to make it circular
    top: '50%',
    left: 0, // Adjust to align with the start of the slider
    transform: [{ translateY: -8 }], // Center vertically
  },
  sliderContainer: {
    position: 'relative',
    width: '100%',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  priceText: {
    textAlign: 'center',
    fontSize: 18,
    marginVertical: 10,
  },
  filledTrack: {
    position: 'absolute',
    height: 5,
    backgroundColor: '#1F487C',
    borderRadius: 2.5,
    top: '50%',
    transform: [{ translateY: -2.5 }],
    zIndex: -1,
  },
  floatingLabel: {
    position: 'absolute',
    bottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1F487C',
    borderRadius: 14,
    padding: 5,
  },
  floatingLabelText: {
    color: '#fff',
    fontSize: 16,
    paddingHorizontal: 5,
  },
  priceInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  inputContainer: {
    width: '45%',
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  staticLabel: {
    position: 'absolute',
    bottom: 40,
    left: -10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    backgroundColor: '#1fb28a',
    borderRadius: 5,
    padding: 5,
  },
  staticLabelText: {
    color: '#fff',
    fontSize: 16,
  },
  staticLabelMax: {
    position: 'absolute',
    bottom: 40,
    right: -10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1fb28a',
    borderRadius: 5,
    padding: 5,
  },
  sliderContainer1: {
    alignItems: 'center',
    position: 'relative',
    paddingHorizontal: 10,
  },
  slider1: {
    width: '100%',
    height: 40,
  },
  labelContainer1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingRight: 10,
  },
  label1: {
    fontSize: 15,
    fontWeight: '500',
    color: '#444444',
    fontFamily: 'Inter',
    lineHeight: 18,
  },
  floatingLabel1: {
    position: 'absolute',
    top: -18,
    backgroundColor: '#1F487C',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 14,
    height: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  floatingLabelText1: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
export default FilterInsightsScreen;
