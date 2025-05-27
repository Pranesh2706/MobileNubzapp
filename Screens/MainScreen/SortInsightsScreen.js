import React, {useState} from 'react';
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
import {Svg} from 'react-native-svg';
import backgroundImage from '../assets/home_bg.png';
import {FlatList} from 'react-native-gesture-handler';

const SortInsightsScreen = ({visible, onClose, Data}) => {
  const [selectCurrentSortName, setSelectCurrentSortName] = useState('Price');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const sortListAry = [
    {
      id: '1',
      title: 'Price',
      isSelect: false,
      data: [
        {id: '1', title: 'High to Low', value: '1', Selected: false},
        {id: '2', title: 'Low to High', value: '2', Selected: false},
      ],
    },
    {
      id: '2',
      title: 'Seats',
      isSelect: false,
      data: [
        {id: '1', title: 'High to Low', value: '1', Selected: false},
        {id: '2', title: 'Low to High', value: '2', Selected: false},
      ],
    },
    {
      id: '3',
      title: 'Start Ratings',
      isSelect: false,
      data: [
        {id: '1', title: 'High to Low', value: '1', Selected: false},
        {id: '2', title: 'Low to High', value: '2', Selected: false},
      ],
    },
    {
      id: '4',
      title: 'Arrival Time',
      isSelect: false,
      data: [
        {id: '1', title: 'Earliest to Latest', value: '1', Selected: false},
        {id: '2', title: 'Latest to Earliest', value: '2', Selected: false},
      ],
    },
    {
      id: '5',
      title: 'Departure Time',
      isSelect: false,
      data: [
        {id: '1', title: 'Earliest to Latest', value: '1', Selected: false},
        {id: '2', title: 'Latest to Earliest', value: '2', Selected: false},
      ],
    },
  ];
  const Separator = () => <View style={styles.separator} />;

  function SortMainRowView({item, index,LastCount}) {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedIndex(index);
          setSelectCurrentSortName(item.title);
        }}>
        <View
          style={[
            {
              flex: 1,
              flexDirection: 'row',
              borderBottomWidth: 0.9,
              borderColor: '#1F487C',
              borderBottomEndRadius:(LastCount === index && selectCurrentSortName !== item.keyValue ) ? 20 : 0,

              height:50,
            },
            selectCurrentSortName === item.title
              ? {
                  borderRightWidth: 0.0,
                  backgroundColor: 'rgba(52, 52, 52, 0.0)',
                }
              : {
                  borderRightWidth: 0.9,
                  backgroundColor: 'rgba(255, 255, 255, 0.5)',
                },
          ]}>
          {selectCurrentSortName === item.title && (
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
              
                alignSelf:'center',
                fontFamily: 'Inter',
                textAlign: 'justify',
              },
              selectCurrentSortName === item.title
                ? {
                    color: '#1F487C',
                    fontWeight: '600',
                    fontSize: 14,
                    lineHeight: 18,
                    paddingHorizontal:10,
                  }
                : {
                    color: '#393939',
                    fontWeight: '400',
                    fontSize: 13,
                    lineHeight: 16,
                    paddingHorizontal:15,
                  },
            ]}>
            {item.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
  function SortingSubRowView({item, index}) {
    return (
      <TouchableOpacity
        style={{padding: 10}}
        onPress={() => {
          console.log('clicked');
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems:'center',
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
            style={{width: 20, height: 20, marginRight: 10}}
          />
        </View>
      </TouchableOpacity>
    );
  }

  const renderViewSectionHeader = ({section}) => {
    return (
      <View
        style={{
          padding: 10,
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
      </View>
    );
  };
  const renderViewSectionFooter = ({section}) => {
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
            paddingHorizontal: 10,
            height: 33,
          }}>
          <Text
            style={{
              fontWeight: '400',
              fontSize: 15,
              fontFamily: 'Inter',
              color: '#FFFFFF',
              lineHeight: 17,
            }}>
            {'20 Buses'}
          </Text>
          <Image
            source={require('../assets/ArrowRight.gif')}
            style={{
              width: 18,
              height: 24,
              marginLeft:2,
              transform: [{rotate: '-90deg'}],
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{flex: 1, width: '100%'}}
          onPress={onClose}></TouchableOpacity>
        <View
          style={{
            width: '100%',
            maxHeight: '70%',
            backgroundColor: '#E5FFF1',
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            position: 'absolute', //Here is the trick
            bottom: 0, //Here is the trick
          }}>
          <ImageBackground
            source={backgroundImage}
            style={{flex: 1, resizeMode: 'cover', height: '100%'}}>
            <View style={{alignItems: 'center', margin: 10}}>
              <Text
                style={{
                  color: '#1F487C',
                  textAlign: 'center',
                  fontSize: 22,
                  fontFamily: 'Montserrat',
                  fontWeight: '600',
                }}>
                {'Sort Insights'}
              </Text>
            </View>
            <Separator />
            <View style={{flexDirection: 'row', flex: 1}}>
              <View style={{width: '40%', height: '100%'}}>
                <FlatList
                  data={sortListAry}
                  renderItem={({item, index}) => {
                    return <SortMainRowView item={item} index={index} LastCount={sortListAry.length - 1} />;
                  }}
                  keyExtractor={(item, index) => item + index}
                />
              </View>
              <View
                style={{
                  width: '60%',
                  height: '100%',
                  paddingHorizontal:10,
                  paddingVertical:8
                }}>
                <SectionList
                  sections={[sortListAry[selectedIndex]]}
                  keyExtractor={(item, index) => item + index}
                  renderItem={({item, index, section}) => {
                    return <SortingSubRowView item={item} index={index} />;
                  }}
                  renderSectionHeader={renderViewSectionHeader}
                  renderSectionFooter={renderViewSectionFooter}
                  stickySectionHeadersEnabled
                  stickyHeaderHiddenOnScroll
                />
              </View>
            </View>
            <View style={styles.buttonView}>
              <TouchableOpacity onPress={onClose} style={styles.clearBtn}>
                <Text style={styles.clearTxt}>CLEAR</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onClose} style={styles.applyBtn}>
                <Text style={styles.apply}>APPLY</Text>
              </TouchableOpacity>
            </View>
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
    width: '57%',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(31, 72, 124, 0.5)',
  },
  clearBtn: {
    backgroundColor: '#FFFFFF',
    width: '40%',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(31, 72, 124, 0.5)',
  },
  buttonView: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    marginTop: 10,
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
});
export default SortInsightsScreen;
