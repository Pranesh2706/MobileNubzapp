import React, { useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Modal,
  StyleSheet,
  SectionList,
  Image,
  Alert,
} from 'react-native';
import { Svg } from 'react-native-svg';
import backgroundImage from '../assets/home_bg.png'; // Replace with your actual image path
import BusTimeBg from '../assets/BusTimeBg';
import BluedashLine from '../assets/BluedashLine';
import { FlatList } from 'react-native-gesture-handler';
import BusTimeDisplay from '../assets/BusTimeDisplay';

const ViewMoreScreen = ({ visible, onClose, Data }) => {

  const viewListAry = [{
    id: "0",
    title: "",
    data: [{
      id: "1", ListData: [
        {
          id: "1",
          task: "Boarding/Dropping Point"
        }, {
          id: "2",
          task: "Cancellation Policy"
        }, {
          id: "3",
          task: "Amenities"
        }, {
          id: "4",
          task: "Travel Policy"
        }]
    }],
  }, {
    id: "1",
    title: "Boarding Points",
    data: [
      {
        id: "1",
        task: "Make a section list tutorial1"
      }, {
        id: "2",
        task: "Make a section list tutorial2"
      },],
  }, {
    id: "2",
    title: "Dropping Points",
    data: [
      {
        id: "6",
        task: "Make a section list tutorial22"
      }],
  },
  {
    id: "3",
    title: "Cancellation Policy",
    data: [
      {
        id: "18",
        task: "Make a section list tutorial45"
      }],
  },
  {
    id: "4",
    title: "Amenities",
    data: [
      {
        id: "6",
        task: "Make a section list tutorial765"
      }],
  }, {
    id: "5",
    title: "Travel Policy",
    data: [
      {
        id: "116",
        task: "Make a section list tutorial"
      }, {
        id: "112",
        task: "Make a section list tutorial"
      }, {
        id: "113",
        task: "Make a section list tutorial Make a section list tutorial"
      }],
  }
  ];

  const [isDroppingRowMore, setDroppingRowMore] = useState(false);

  const [isBoardingRowMore, setBoardingRowMore] = useState(false);



  const AmenitiesList = [{
    id: "0",
    title: "Charging Point",

  }, {
    id: "1",
    title: "TV",

  }, {
    id: "2",
    title: "Pillows",

  },
  {
    id: "3",
    title: "Wifi",
  },
  {
    id: "4",
    title: "Emergency",

  }, {
    id: "5",
    title: "GPS Tracking",

  }
  ];


  const ViewMoresections = viewListAry.map(section => {

    const dataToShow = (isBoardingRowMore === false && section.id === '1' && section.data.length >= 2) ? section.data.slice(0, 1) : (isDroppingRowMore === false && section.id === '2' && section.data.length >= 2) ? section.data.slice(0, 1) : section.data;
    return {
      ...section,
      data: dataToShow,
    };
  });

  const myListAmenitiesEmpty = () => {
    return (
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.item}>No Amenities</Text>
      </View>
    );
  };
  function AmenitiesItem({ item, index }) {
    return (
      <View
        style={{ flex: 1, paddingVertical: 15, paddingHorizontal: 5, alignItems: 'flex-start' }}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ backgroundColor: '#1F487C', borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}>
            <Image
              // source={{ uri: `${item.image}` }}
              source={require('../assets/LocationIcon.png')}
              resizeMode="center"
              style={{
                width: 44,
                height: 44,
                alignItems: 'center',
                justifyContent: 'center',
                tintColor: '#E55959',
              }} />
          </View>

          <Text
            style={{
              paddingTop: 5,
              fontSize: 10,
              fontWeight: '400',
              lineHeight: 13,
              fontFamily: 'Inter',
              color: '#1F487C',
              textAlign: 'center',
            }}>
            {item.title}
          </Text>
        </View>
      </View>
    );
  }
  const renderViewMoreItem = ({ item, index, section }) => {
    // Example condition: Render item only if it's in 'Section 1' and starts with 'Item 1'
    if (section.id === '5') {
      return (
        <View style={{ flex: 1, paddingHorizontal: 10, backgroundColor: 'rgba(214, 235, 255, 0.5)' }}>
          <Text style={{ color: '#001938', fontSize: 12, fontFamily: 'Inter', textAlign: 'left', fontWeight: '600', padding: 5 }}>{'Can I travel with my Pet?'}</Text>
          <Text style={{ color: '#1F487C', fontSize: 12, fontFamily: 'Inter', textAlign: 'left', fontWeight: '400', padding: 5 }}>{'Travelling with your pets in the bus is not permitted.Travelling with your pets in the bus is not permitted.'}</Text>
          <View style={{ marginVertical: 7, width: '100%', borderBottomColor: '#1F487C', borderBottomWidth: StyleSheet.hairlineWidth }} />
        </View>
      );
    } else if (section.id === '4') {
      return (
        <View style={{ flex: 1, marginHorizontal: 10, marginBottom: 15, borderColor: '#FFFFFF', borderWidth: 1, borderRadius: 20, backgroundColor: '#FFFFFF' }}>
          <FlatList
            numColumns={5}
            key={5}
            bounces={false}
            ListEmptyComponent={myListAmenitiesEmpty}
            // contentContainerStyle={{
            //   flexDirection: 'column',
            //   flexWrap: 'wrap',
            //   alignSelf: 'center',
            // }}
            data={AmenitiesList}
            renderItem={({ item, index }) => {
              return <AmenitiesItem item={item} index={index} />;
            }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index}
          />
        </View>
      );
    } else if (section.id === '3') {
      return (
        <View style={{ flex: 1, marginHorizontal: 10, padding: 10, marginBottom: 15, borderColor: '#FFFFFF', borderWidth: 1, borderRadius: 20, backgroundColor: '#FFFFFF' }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 8,
            }}>
            <Text
              style={{
                fontFamily: 'Inter',
                fontSize: 15,
                fontWeight: '600',
                fontStyle: 'normal',
                textAlign: 'left',
                lineHeight: 18,
                color: '#1F487C',
              }}>
              {"Cancellation Time"}
            </Text>
            <Text
              style={{
                fontFamily: 'Inter',
                fontSize: 15,
                fontWeight: '600',
                fontStyle: 'normal',
                textAlign: 'right',
                lineHeight: 18,
                color: '#1F487C',
              }}>
              {"Refund Amount"}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 8,
            }}>
            <Text
              style={{
                fontFamily: 'Inter',
                fontSize: 12,
                fontWeight: '400',
                fontStyle: 'normal',
                textAlign: 'left',
                lineHeight: 14,
                color: '#1F487C',
              }}>
              {"Before 20 - Feb 18:00"}
            </Text>
            <Text
              style={{
                fontFamily: 'Inter',
                fontSize: 12,
                fontWeight: '600',
                fontStyle: 'normal',
                textAlign: 'right',
                lineHeight: 14,
                color: '#1F487C',
              }}>
              {"Rs 1190/- @ 85% refund"}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 8,
            }}>
            <Text
              style={{
                fontFamily: 'Inter',
                fontSize: 12,
                fontWeight: '400',
                fontStyle: 'normal',
                textAlign: 'left',
                lineHeight: 14,
                color: '#1F487C',
              }}>
              {"Between 20 Feb & 21 Feb 10:00"}
            </Text>
            <Text
              style={{
                fontFamily: 'Inter',
                fontSize: 12,
                fontWeight: '600',
                fontStyle: 'normal',
                textAlign: 'right',
                lineHeight: 14,
                color: '#1F487C',
              }}>
              {"Rs 980/- @ 70% refund"}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 8,
            }}>
            <Text
              style={{
                fontFamily: 'Inter',
                fontSize: 12,
                fontWeight: '400',
                fontStyle: 'normal',
                textAlign: 'left',
                lineHeight: 14,
                color: '#1F487C',
              }}>
              {"After 21 Feb - 10:00"}
            </Text>
            <Text
              style={{
                fontFamily: 'Inter',
                fontSize: 12,
                fontWeight: '600',
                fontStyle: 'normal',
                textAlign: 'right',
                lineHeight: 14,
                color: '#1F487C',
              }}>
              {"Rs 0/- @ 0% refund"}
            </Text>
          </View >
          <View style={{ backgroundColor: 'rgba(214, 235, 255, 0.5)', flex: 1, borderRadius: 10, padding: 10 }}>
            <Text style={{
              fontFamily: 'Inter',
              fontSize: 12,
              fontWeight: '400',
              fontStyle: 'normal',
              color: '#1F487C',
            }}>{"Refund amount is Indicative. \n\nAdditional Rs. 15 per seat cancellation fee is applicable.\n\nPartial cancellation is not allowed."}</Text>
          </View>
        </View>
      );
    } else if (section.id === '1' || section.id === '2') {
      return (
        <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'rgba(214, 235, 255, 0.5)' }}>
          <View style={{ width: '50%', flexDirection: 'row', alignItems: 'center' }}>
            <Image source={require('../assets/LocationIcon.png')} style={{ width: 14, height: 20, marginLeft: 15 }} />
            <Text style={{ color: '#1F487C', fontSize: 14, fontFamily: 'Inter', textAlign: 'left', lineHeight: 16, fontWeight: '400', padding: 10 }}>{'Koyambeduitem'}</Text>
          </View>
          <View style={{ width: '50%', }}>
            <Text style={{ color: '#1F487C', fontSize: 14, fontFamily: 'Inter', textAlign: 'right', lineHeight: 16, fontWeight: '400', padding: 10 }}>{'21 Feb, 01:30'}</Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1, paddingBottom: 20 }}>
          <View style={{ alignItems: 'flex-start', margin: 15 }}>
            <Text style={styles.title}>
              {"Orange Tours and Travels"}
            </Text>
            <Text style={styles.subtitle}>
              {"SCANIA AC Multiaxle Sleeper (2+1)"}
            </Text>
          </View>
          <FlatList
            style={{ marginHorizontal: 10 }}
            bounces={false}
            //columnWrapperStyle={{ flexWrap: 'wrap', flex: 1 }}
            contentContainerStyle={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              flex: 1,
            }}
            data={section.data[0].ListData}
            renderItem={({ item, index }) => {
              return (
                <View
                  style={{
                    borderRadius: 6,
                    borderWidth: 1,

                    height: 36,
                    borderColor: '#1F487C',
                    backgroundColor: '#FFFFFF',
                    paddingHorizontal: 3,
                    margin: 5,
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'Inter',
                      color: '#1F487C',
                      fontWeight: '400',
                      lineHeight: 17,
                      textAlign: 'center',
                      paddingHorizontal: 5,
                    }}>
                    {item.task}
                  </Text>
                </View>
              );
            }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index}
          />
        </View>
      );

    }
  };
  const renderViewSectionHeader = ({ section }) => {
    if (section.id.startsWith('0')) {
      return null;     // Return null to render nothing for other sections

    } else {
      return (
        <View key={section} style={{ backgroundColor: (section.id === "1" || section.id === "2" || section.id === "5") ? 'rgba(214, 235, 255, 0.5)' : 'rgba(0, 0, 0, 0)', padding: 15 }}>
          <Text style={{ fontWeight: '600', color: '#1F487C', fontFamily: 'Inter', fontSize: 16, lineHeight: 19 }}>{section.title}</Text>
        </View>
      );
    }

  }
  const renderViewSectionFooter = ({ section }) => {
    // Example condition: Render section header only if title starts with 'Section 1'
    if (section.id.startsWith('1') || section.id.startsWith('2')) {
      return (
        <TouchableOpacity on onPress={() => {

          if (section.id === '1') {
            setDroppingRowMore(false)
            setBoardingRowMore(!isBoardingRowMore)
          } else if (section.id === '2') {
            setBoardingRowMore(false)
            setDroppingRowMore(!isDroppingRowMore)
          } else {
            setBoardingRowMore(false)
            setDroppingRowMore(false)
          }



        }}>
          <View style={styles.footerContainer}>
            <View style={styles.footerBgView} />
            <View style={{ borderRadius: 3, borderColor: '#1F487C', backgroundColor: '#1F487C', padding: 4 }}>
              <Image source={require('../assets/downWhiteArrow.png')} style={{
                width: 10,
                height: 7,
                transform: [{ rotate: (section.id === '1' && isBoardingRowMore === true && section.data.length >= 2) ? '180deg' : (section.id === '2' && isDroppingRowMore === true && section.data.length >= 2) ? '180deg' : '0deg' }],
              }} />
            </View>
            <View style={{
              marginVertical: 7,
              width: '45%', borderBottomColor: '#1F487C', borderBottomWidth: StyleSheet.hairlineWidth
            }} />
          </View>
        </TouchableOpacity>
      );
    } else {
      return null;  // Return null to render nothing for other sections
    }
  };

  return (<Modal
    animationType="slide"
    transparent={true}
    visible={visible}
    onRequestClose={onClose}>

    <View style={styles.modalContainer}>
      <TouchableOpacity style={styles.dismissbtn} onPress={onClose}>
      </TouchableOpacity>
      <View style={styles.topBgView}>
        <ImageBackground
          source={backgroundImage}
          style={styles.ImageBg}>
          <View style={{ flex: 1, position: 'relative', top: 5, bottom: 30 }}>
            <SectionList style={{ marginBottom: 5 }}
              sections={ViewMoresections}
              renderItem={renderViewMoreItem}
              renderSectionHeader={renderViewSectionHeader}
              renderSectionFooter={renderViewSectionFooter}
              keyExtractor={(item, index) => item.id}
              stickySectionHeadersEnabled={false}
              stickyHeaderHiddenOnScroll />
          </View>
        </ImageBackground>
      </View>
    </View>
  </Modal>)
};

const styles = StyleSheet.create(
  {
    footerBgView: {
      marginVertical: 7, width: '45%',
      borderBottomColor: '#1F487C',
      borderBottomWidth: StyleSheet.hairlineWidth
    },
    footerContainer: { backgroundColor: 'rgba(214, 235, 255, 0.5)', padding: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    modalContainer: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.2)', justifyContent: 'center', alignItems: 'center' },
    topBgView: {
      width: '100%', height: '75%', backgroundColor: '#E5FFF1', borderTopRightRadius: 20, borderTopLeftRadius: 20,
      position: 'absolute', //Here is the trick
      bottom: 0, //Here is the trick
    },
    ImageBg: {
      flex: 1,
      resizeMode: 'cover',
      height: '100%'
    },
    title: { color: '#1F487C', fontSize: 16, fontFamily: 'Inter', lineHeight: 19, fontWeight: '600', paddingVertical: 5 },
    subtitle: { color: '#1F487C', fontWeight: '400', lineHeight: 17, fontSize: 14, fontFamily: 'Inter', },
    dismissbtn: { flex: 1, width: '100%', height: '30%', }

  }

)

export default ViewMoreScreen;
