import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
    Dimensions,
    Image,
    Alert, TextInput,
    FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Line } from 'react-native-svg';

import BackWhite from '../assets/BackWhite';
import HeadWhite from '../assets/HeadArrow';
import BusIcon from '../assets/BusIcon';
import PlaceIcon from '../assets/PlaceIcon';
import ArrowIcone from '../assets/ArrowIcone';
import { ScrollView } from 'react-native-gesture-handler';
import Addpassengericon from '../assets/Addpassengericon';
import CustomCheckbox from './CustomCheckbox';
import BottomModalSheet from './BottomModalSheet';
import PersonIcon from '../assets/PersonIcon';
import BusTimeBg from '../assets/BusTimeBg';
import BlackCar from '../assets/BlackCar';
import LinearGradient from 'react-native-linear-gradient';
import { BackgroundImage } from '@rneui/base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const CustomCheckbox1 = ({ label, checked, onChange }) => {
    return (
        <TouchableOpacity style={styles.container1} onPress={onChange}>

            <Image
                source={
                    checked
                        ? require('../assets/selectTick.png')
                        : require('../assets/UnCheckBlockIcon.png')
                }
                style={{
                    width: 15,
                    height: 15,
                    borderWidth: 1,
                    borderColor: '#1F487C',
                    justifyContent: 'center',
                    alignItems: 'center',

                    // width: 18,
                    // height: 18,
                    // resizeMode: 'cover',
                    // marginRight: 10,
                    // marginTop: 2,
                }}
            />
            <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
    );
};

const screenWidth = Dimensions.get('window').width;

const TravelerScreenDetails = ({ props, navigation, route }) => {

    const { themecolor = '#1F487C' } = route.params || {};

    const { screenTheme = 'Normal Coach' } = route.params || {};

    const themeheaderFontColor = (screenTheme === 'Luxury Coach') ? '#141414' : '#FFFFFF'; // Default to black if not '#393939'

    const themeheaderFontColor1 = (screenTheme === 'Luxury Coach') ? '#141414' : 'rgba(255, 255, 255, 0.5)'; // Default to black if not '#393939'


    const [selectedGender, setSelectedGender] = useState('male');
    //  setSelectedGender('male')
    const [checked, setChecked] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [isChecked1, setIsChecked1] = useState(false);
    const [isOfferExpand, setOfferExpand] = useState(true)
    const [isJourneyExpand, setJourneyExpand] = useState(false)

    const [isActive, setIsActive] = useState(false);


    const OfferList = [
        { id: '1', image: require('../assets/SliderImg.png') },
        { id: '2', image: require('../assets/SliderImg.png') },
        { id: '3', image: require('../assets/SliderImg.png') },
        { id: '4', image: require('../assets/SliderImg.png') },
        { id: '5', image: require('../assets/SliderImg.png') },
    ];
    const PassengerList = [
        { id: '1', name: "xxxxxxx" },
        { id: '2', name: "YYYYYYYY" },

    ];
    const Separator = () => <View style={{
        marginVertical: 5,
        borderBottomColor: '#393939',
        borderBottomWidth: StyleSheet.hairlineWidth,
    }} />;

    const PassengerItemRow = ({ item }) => (
        <View
            style={{
                flexDirection: 'row',
                borderRadius: 6,
                borderWidth: 1,
                marginHorizontal: 20,
                marginTop: 12,
                borderColor: '#393939',
            }}>
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    margin: 5,
                    marginLeft: 15,
                    gap: 15,

                }}>
                <View style={styles.circle}>
                    <Svg
                        style={{
                            width: 12.17,
                            height: 12.19,
                            alignSelf: 'center',
                            alignItems: 'center',
                        }}>
                        <PersonIcon width="100%" height="100%" />
                    </Svg>
                </View>
                <View style={{
                    flexDirection: 'column', justifyContent: 'center',
                }}>
                    <Text style={{
                        fontWeight: '600',
                        fontSize: 14,
                        fontFamily: 'Inter',
                        color: '#393939',
                        lineHeight: 17,
                    }}>MithunKumar </Text>
                    <Text style={{
                        fontWeight: '400',
                        fontSize: 12,
                        fontFamily: 'Inter',
                        color: '#393939',
                        lineHeight: 15,
                    }}>male, 24 years </Text>
                </View>
            </View>
            <View
                style={{
                    flex: 1,
                    alignItems: 'flex-end',
                    alignSelf: 'center',
                }}>
                <CustomCheckbox
                    label=""
                    checked={checked}
                    onChange={() => setChecked(!checked)}
                />
            </View>
        </View>
    );
    const hexToRGB = (hex_value, opecity = 1) => {
        const numericValue = parseInt(hex_value.slice(1), 16);
        const r = numericValue >> 16 & 0xFF;
        const g = numericValue >> 8 & 0xFF;
        const b = numericValue & 0xFF;
        return `rgba(${r}, ${g}, ${b},${opecity})`
    }
    const OfferItemsRow = ({ image }) => (
        <View style={{
            marginVertical: 10,
            width: screenWidth * 0.62,
            height: 105,
            borderRadius: 8, marginRight: 9
        }}>
            <Image source={image} style={{ height: 105, width: screenWidth * 0.62, borderRadius: 8, }} />
        </View>
    );

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: (screenTheme === 'Luxury Coach') ? '#F6B642' : themecolor }}
            edges={['right', 'left', 'top']}>
            <View style={styles.container}>
                <ImageBackground
                    source={(screenTheme === 'Luxury Coach') ? require('../assets/luxuryHeaderBg.png') : require('../assets/HeadBg.png')}
                    imageStyle={{
                        resizeMode: 'cover',
                    }}
                    style={[styles.navigationView, {
                        backgroundColor: (screenTheme === 'Luxury Coach') ? '#F6B642' : themecolor,
                    }]}>
                    <View
                        style={styles.topImageBg}
                    >
                        <TouchableOpacity
                            style={styles.backBtn}
                            onPress={() => navigation.goBack()}>
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <Svg style={{ width: 30, height: 30, borderRadius: 100 }}>
                                    <BackWhite width="100%" height="100%" color={themeheaderFontColor} />
                                </Svg>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.topViewTitle}>
                            <Text style={[styles.topTitle, { color: themeheaderFontColor }]}>Traveler Details</Text>
                            <Text style={[styles.topSubtitle, { color: themeheaderFontColor1 }]}>Step 3 of 4</Text>
                        </View>
                    </View>
                </ImageBackground>

                <KeyboardAwareScrollView style={{ flex: 1 }}
                    contentContainerStyle={{ flexGrow: 1, }}
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    scrollEnabled={true}>
                    <View style={styles.card}>
                        <View
                            style={[
                                {
                                    backgroundColor: '#FFFFFF',
                                    borderRadius: 13,
                                    marginTop: 10,
                                    marginHorizontal: 7,
                                    shadowColor: 'rgba(31, 72, 124, 0.22)',
                                    shadowOpacity: 0.8,
                                    shadowRadius: 2,
                                    paddingHorizontal: 14,
                                    shadowOffset: {
                                        height: 1,
                                        width: 0,
                                    },
                                },
                            ]}>
                            <TouchableOpacity
                                style={[
                                    {
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        paddingTop: 14,
                                    },
                                    isJourneyExpand === false && { height: 60, paddingTop: 0, },
                                ]}
                                onPress={() => { setJourneyExpand(!isJourneyExpand) }}
                            >
                                <Text
                                    style={{
                                        fontWeight: '500',
                                        fontSize: 16,
                                        fontFamily: 'Inter',
                                        color: '#393939',
                                        lineHeight: 19,
                                    }}>
                                    {'Journey Details'}
                                </Text>
                                <Image
                                    source={
                                        isJourneyExpand === true
                                            ? require('../assets/upBlackIcon.png')
                                            : require('../assets/downBlackIcon.png')
                                    }
                                    style={{ width: 18, height: 9 }}
                                />
                            </TouchableOpacity>
                            {isJourneyExpand === true && (
                                <View>
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                        paddingVertical: 10,
                                    }}>
                                        <Image
                                            source={require('../assets/Operatorlogo.png')}
                                            style={{ width: 40, height: 40, }}
                                        />
                                        <View style={{ paddingHorizontal: 8, gap: 2 }}>
                                            <Text style={{ fontSize: 15, fontFamily: 'Inter', color: '#393939', fontWeight: '600', lineHeight: 18 }}>
                                                ORANGE TRAVELS
                                            </Text>
                                            <Text style={{ fontSize: 12, fontFamily: 'Inter', color: '#393939', fontWeight: '500', lineHeight: 14 }}>
                                                A/C Sleeper (2+1)
                                            </Text>
                                        </View>
                                    </View>
                                    <View>
                                        <View style={{ flexDirection: 'row', marginTop: 5, marginBottom: 8 }}>
                                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                                <View style={{ alignItems: 'flex-start', flex: 1, justifyContent: 'center', gap: 3 }}>
                                                    <Text style={{ fontSize: 12, fontFamily: 'Inter', color: '#393939', fontWeight: '400', lineHeight: 14 }}>20 Feb</Text>
                                                    <Text style={{ fontSize: 12, fontFamily: 'Inter', color: '#393939', fontWeight: '700', lineHeight: 14 }}>
                                                        18:30
                                                    </Text>
                                                    <Text style={{ fontSize: 12, fontFamily: 'Inter', color: '#393939', fontWeight: '400', lineHeight: 14 }}>
                                                        Chennai
                                                    </Text>
                                                </View>
                                                <View
                                                    style={{
                                                        justifyContent: 'center', // This aligns the SVG vertically centered
                                                        alignItems: 'center',
                                                        position: 'absolute',
                                                        height: '100%',
                                                        width: '100%',
                                                    }}>
                                                    <View style={{
                                                        width: 140,
                                                        position: 'relative',
                                                        height: 40,
                                                        justifyContent: 'center', // This aligns the SVG vertically centered
                                                        alignItems: 'center',
                                                    }}>
                                                        <BlackCar width="100%" height="100%" />

                                                        <Text
                                                            style={{
                                                                position: 'absolute',
                                                                top: 8, left: -2,
                                                                width: '100%', alignSelf: 'center', textAlign: 'center',
                                                                fontSize: 9, fontFamily: 'Inter', color: '#FFFFFF', fontWeight: '600', lineHeight: 11,
                                                            }}>
                                                            10:30 Hrs
                                                        </Text>
                                                    </View>
                                                </View>

                                                <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center', gap: 3 }}>
                                                    <Text style={{ fontSize: 12, fontFamily: 'Inter', color: '#393939', fontWeight: '400', lineHeight: 14 }}>21 Feb</Text>
                                                    <Text style={{ fontSize: 12, fontFamily: 'Inter', color: '#393939', fontWeight: '700', lineHeight: 14 }}>
                                                        09:55
                                                    </Text>
                                                    <Text style={{ fontSize: 12, fontFamily: 'Inter', color: '#393939', fontWeight: '400', lineHeight: 14 }}>
                                                        Hyderabad
                                                    </Text>
                                                </View>
                                            </View>
                                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                <Image
                                                    source={require('../assets/LineIcon.png')}
                                                    style={{
                                                        width: 1,
                                                        height: 60,
                                                        marginRight: 10,
                                                        marginLeft: 8,
                                                        alignSelf: 'center',
                                                    }}
                                                />
                                            </View>
                                            <View style={{ justifyContent: 'center', alignItems: 'flex-start', gap: 3 }}>
                                                <Text
                                                    style={{
                                                        fontSize: 12, fontFamily: 'Inter', color: '#393939', fontWeight: '500', lineHeight: 14
                                                    }}>
                                                    Seat Number(s)
                                                </Text>
                                                <Text
                                                    style={{
                                                        fontSize: 12, fontFamily: 'Inter', color: '#393939', fontWeight: '600', lineHeight: 14
                                                    }}>
                                                    L18 | Sleeper
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', paddingBottom: 14, }}>
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', gap: 2 }}>
                                            <Text style={{ fontSize: 12, fontFamily: 'Inter', color: 'rgba(57, 57, 57, 0.5)', fontWeight: '400', lineHeight: 14 }}>
                                                Boarding Point & Time
                                            </Text>
                                            <Text style={{ fontSize: 12, fontFamily: 'Inter', color: '#393939', fontWeight: '600', lineHeight: 14 }}>
                                                Chennai : 6:20 AM
                                            </Text>
                                        </View>

                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', gap: 2 }}>
                                            <Text style={{ fontSize: 15, fontFamily: 'Inter', color: 'rgba(57, 57, 57, 0.5)', fontWeight: '400', lineHeight: 14 }}>
                                                Dropping Point & Time
                                            </Text>
                                            <Text
                                                style={{
                                                    fontSize: 12, fontFamily: 'Inter', color: '#393939', fontWeight: '600', lineHeight: 14
                                                }}>
                                                Hyderabad : 1:30 PM
                                            </Text>
                                        </View>
                                    </View>

                                </View>
                            )
                            }
                        </View>
                        <View
                            style={[
                                {
                                    backgroundColor: '#FFFFFF',
                                    borderRadius: 13,
                                    marginTop: 10,
                                    marginHorizontal: 7,
                                    shadowColor: 'rgba(31, 72, 124, 0.22)',
                                    shadowOpacity: 0.8,
                                    shadowRadius: 2,
                                    paddingHorizontal: 14,
                                    shadowOffset: {
                                        height: 1,
                                        width: 0,
                                    },
                                },
                            ]}>
                            <TouchableOpacity
                                style={[
                                    {
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        paddingTop: 14,
                                    },
                                    isOfferExpand === false && { height: 60, paddingTop: 0, },
                                ]}
                                onPress={() => { setOfferExpand(!isOfferExpand) }}
                            >
                                <Text
                                    style={{
                                        fontWeight: '500',
                                        fontSize: 16,
                                        fontFamily: 'Inter',
                                        color: '#393939',
                                        lineHeight: 19,
                                    }}>
                                    {'Offers'}
                                </Text>
                                <Image
                                    source={
                                        isOfferExpand === true
                                            ? require('../assets/upBlackIcon.png')
                                            : require('../assets/downBlackIcon.png')
                                    }
                                    style={{ width: 18, height: 9 }}
                                />
                            </TouchableOpacity>
                            {isOfferExpand === true && (
                                <View>
                                    <FlatList
                                        data={OfferList}
                                        renderItem={({ item }) => <OfferItemsRow image={item.image} />}
                                        keyExtractor={item => item.id}
                                        horizontal={true} // Set to horizontal
                                        showsHorizontalScrollIndicator={false} // Optional: hide scroll indicator
                                    />
                                    <View>
                                        <Text
                                            style={{
                                                fontWeight: '500',
                                                fontSize: 15,
                                                fontFamily: 'Inter',
                                                color: '#393939',
                                                lineHeight: 19,
                                            }}>
                                            Do you have a coupon code?
                                        </Text>
                                        <View style={{
                                            position: 'relative',
                                            height: 45,
                                            borderRadius: 7,
                                            overflow: 'hidden',
                                            marginVertical: 14,
                                            borderTopRightRadius: 8,
                                            borderBottomRightRadius: 8,
                                        }}>
                                            <Svg height="100%" width="100%" style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                right: 0,
                                                bottom: 0,
                                            }}>
                                                <Line
                                                    x1="0"
                                                    y1="0"
                                                    x2="100%"
                                                    y2="0"
                                                    stroke={themecolor}
                                                    strokeWidth="2"
                                                    strokeDasharray="10,5"
                                                />
                                                <Line
                                                    x1="0"
                                                    y1="100%"
                                                    x2="100%"
                                                    y2="100%"
                                                    stroke={themecolor}
                                                    strokeWidth="2"
                                                    strokeDasharray="10,5"
                                                />
                                                <Line
                                                    x1="0"
                                                    y1="0"
                                                    x2="1"
                                                    y2="100%"
                                                    stroke={themecolor}
                                                    strokeWidth="1"
                                                    strokeDasharray="10,5"
                                                />
                                            </Svg>

                                            <View
                                                style={{
                                                    borderRadius: 7,
                                                    height: 45,
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                }}>
                                                <TextInput
                                                    style={{
                                                        flex: 1,
                                                        paddingVertical: 12,
                                                        paddingHorizontal: 20,
                                                        fontSize: 15,
                                                        lineHeight: 19,
                                                        fontFamily: 'Inter',
                                                        fontWeight: '400',
                                                        color: '#1F487C',
                                                    }}
                                                    placeholder="Enter Promo code"
                                                    placeholderTextColor="rgba(57, 57, 57, 0.5)"
                                                />
                                                <TouchableOpacity style={[{
                                                    backgroundColor: 'white',
                                                    overflow: 'hidden',
                                                    height: 45,

                                                }, (screenTheme === 'Luxury Coach') ? { borderColor: '#D89E2F', borderWidth: 1.5 } : { borderColor: themecolor, borderWidth: 1.3 }]} onPress={() => {
                                                    console.log('Apply button click')
                                                }}>
                                                    <LinearGradient

                                                        locations={(screenTheme === 'Luxury Coach') ? [0.15, 0.38, 0.60, 0.69, 0.85] : [0, 0]}
                                                        colors={(screenTheme === 'Luxury Coach') ? ['#F6B642', '#FFF279', '#F6B642', '#FFDF71', '#FBE67B'] : [themecolor, themecolor]}
                                                        useAngle={true}
                                                        angle={(screenTheme === 'Luxury Coach') ? 150 : 45}
                                                        style={[{
                                                            justifyContent: 'center', flex: 1, alignItems: 'center', paddingVertical: 12,
                                                            paddingHorizontal: 20,
                                                        }]}
                                                    >
                                                        <Text style={{
                                                            fontSize: 15,
                                                            lineHeight: 19,
                                                            fontFamily: 'Inter',
                                                            fontWeight: '700',
                                                            color: (screenTheme === 'Luxury Coach') ? '#393939' : '#FFFFFF',
                                                        }}>Apply</Text>
                                                    </LinearGradient>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )
                            }
                        </View>

                        <View style={{ flex: 1 }}>


                            <View
                                style={{
                                    margin: 7,
                                    height: 'auto',
                                    backgroundColor: 'white',
                                    borderRadius: 13,
                                    shadowColor: 'rgba(31, 72, 124, 0.22)',
                                    shadowOpacity: 0.8,
                                    shadowRadius: 2,
                                    shadowOffset: {
                                        height: 1,
                                        width: 0,
                                    },


                                }}>
                                <View style={{ flexDirection: 'column', marginTop: 12, paddingHorizontal: 14, }}>
                                    <Text
                                        style={{
                                            fontWeight: '500',
                                            fontSize: 17,
                                            fontFamily: 'Inter',
                                            color: '#393939',
                                            lineHeight: 20,
                                        }}>
                                        Passenger Details
                                    </Text>
                                    <Text
                                        style={{
                                            fontWeight: '500',
                                            fontSize: 14.66,
                                            fontFamily: 'Inter',
                                            color: '#393939',
                                            lineHeight: 17,
                                            marginLeft: 5,
                                            marginTop: 5,
                                        }}>
                                        Contact Details
                                    </Text>
                                    <TextInput
                                        style={[styles.textInput, { marginTop: 10, marginLeft: 5, marginRight: 10 }]}
                                        placeholder="Email Id*"
                                        placeholderTextColor="#393939"
                                    />
                                    <View style={{
                                        flexDirection: 'row', marginLeft: 5, marginTop: 5,
                                    }}>
                                        <View style={{ flex: 1, marginTop: 10, marginRight: 5 }}>
                                            <TextInput
                                                style={styles.textInput}
                                                placeholder="Mobile Number*"
                                                placeholderTextColor="#393939"
                                            />
                                        </View>
                                        <View style={{ alignSelf: 'center' }}>
                                            <Image
                                                source={require('../assets/ToggleGreen.png')}
                                                style={{ width: 94.27, margin: 10, height: 47.14 }}
                                            />
                                        </View>
                                    </View>
                                </View>
                                <View style={{ marginHorizontal: 5 }}>
                                    <Text style={{
                                        fontWeight: '400',
                                        textAlign: 'center',
                                        fontSize: 10,
                                        fontFamily: 'Inter',
                                        color: 'rgba(57, 57, 57, 0.5)',
                                        lineHeight: 12,
                                    }}>
                                        Your booking details will be sent to this email address and
                                        mobile number
                                    </Text>
                                    <View
                                        style={{
                                            marginTop: 8,
                                            borderWidth: 0.5,
                                            borderColor: 'rgba(31, 72, 124, 0.5)',
                                        }}></View>
                                </View>
                                <View style={{ paddingHorizontal: 14, flexDirection: 'column' }}>
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            fontWeight: '500',
                                            fontFamily: 'Inter',
                                            color: '#393939',
                                            lineHeight: 16,
                                            marginTop: 10,
                                            marginBottom: 10,
                                            left: 5,

                                        }}>
                                        Seat No. L18
                                    </Text>
                                    <TextInput
                                        style={[styles.textInput, { marginLeft: 5, marginRight: 10 }]}
                                        placeholder="Traveler Name*"
                                        placeholderTextColor="#393939"
                                    />
                                    <View style={{ flexDirection: 'row', gap: 5 }}>
                                        <View style={{ flex: 1, marginTop: 10, marginHorizontal: 5 }}>
                                            <TextInput
                                                style={styles.textInput}
                                                placeholder="Age*"
                                                placeholderTextColor="#393939"
                                            />
                                        </View>{
                                            (screenTheme === 'Luxury Coach') ? <View
                                                style={{
                                                    flex: 1,
                                                    marginTop: 10,
                                                    marginRight: 10,
                                                    marginLeft: 3,
                                                    flexDirection: 'row',
                                                    borderRadius: 6,
                                                    borderColor: '#393939',
                                                    borderWidth: 1,

                                                }}>
                                                <TouchableOpacity
                                                    style={[
                                                        styles.halfView, { borderTopLeftRadius: 5, borderBottomLeftRadius: 5, }, (selectedGender === 'male') && {
                                                            borderColor: '#D89E2F',
                                                            borderWidth: 2,
                                                        },

                                                    ]}
                                                    onPress={() => setSelectedGender('male')}>
                                                    <LinearGradient

                                                        locations={(selectedGender === 'male') ? [0.15, 0.38, 0.60, 0.69, 0.85] : [0, 0]}
                                                        colors={(selectedGender === 'male') ? ['#F6B642', '#FFF279', '#F6B642', '#FFDF71', '#FBE67B'] : ['#FFFFFF', '#FFFFFF']}
                                                        useAngle={true}
                                                        angle={(selectedGender === 'male') ? 170 : 45}
                                                        style={[{
                                                            flexDirection: 'row', width: '100%', flex: 1,
                                                            justifyContent: 'center', alignItems: 'center', borderTopLeftRadius: 5, borderBottomLeftRadius: 5,
                                                        }]}
                                                    >
                                                        <Text
                                                            style={[
                                                                styles.text,
                                                                selectedGender === 'male'
                                                                    ? { color: '#393939', fontWeight: '600', }
                                                                    : styles.unselectedText,
                                                            ]}>
                                                            Male
                                                        </Text>
                                                    </LinearGradient>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={[
                                                        styles.halfView, { borderTopRightRadius: 5, borderBottomRightRadius: 5 },
                                                        , (selectedGender === 'female') && {
                                                            borderColor: '#D89E2F',
                                                            borderWidth: 2,
                                                        },
                                                    ]}
                                                    onPress={() => setSelectedGender('female')}>
                                                    <LinearGradient

                                                        locations={(selectedGender === 'female') ? [0.15, 0.38, 0.60, 0.69, 0.85] : [0, 0]}
                                                        colors={(selectedGender === 'female') ? ['#F6B642', '#FFF279', '#F6B642', '#FFDF71', '#FBE67B'] : ['#FFFFFF', '#FFFFFF']}
                                                        useAngle={true}
                                                        angle={(selectedGender === 'female') ? 170 : 45}
                                                        style={[{
                                                            flexDirection: 'row', width: '100%', flex: 1,
                                                            overflow: 'hidden', borderTopRightRadius: 5, borderBottomRightRadius: 5,
                                                            justifyContent: 'center', alignItems: 'center',
                                                        }]}
                                                    >
                                                        <Text
                                                            style={[
                                                                styles.text,
                                                                selectedGender === 'female'
                                                                    ? { color: '#393939', fontWeight: '600', }
                                                                    : styles.unselectedText,
                                                            ]}>
                                                            Female
                                                        </Text>
                                                    </LinearGradient>
                                                </TouchableOpacity>

                                            </View> :
                                                <View
                                                    style={{
                                                        flex: 1,
                                                        marginTop: 10,
                                                        marginRight: 10,
                                                        marginLeft: 3,
                                                        flexDirection: 'row',
                                                        borderRadius: 6,
                                                        borderColor: '#393939',
                                                        borderWidth: 1,

                                                    }}>
                                                    <TouchableOpacity
                                                        style={[
                                                            styles.halfView, { borderTopLeftRadius: 5, borderBottomLeftRadius: 5, },
                                                            selectedGender === 'male'
                                                                ? { backgroundColor: themecolor }
                                                                : styles.unselected,
                                                        ]}
                                                        onPress={() => setSelectedGender('male')}>
                                                        <Text
                                                            style={[
                                                                styles.text,
                                                                selectedGender === 'male'
                                                                    ? styles.selectedText
                                                                    : styles.unselectedText,
                                                            ]}>
                                                            Male
                                                        </Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        style={[
                                                            styles.halfView, { borderTopRightRadius: 5, borderBottomRightRadius: 5, },
                                                            selectedGender === 'female'
                                                                ? { backgroundColor: themecolor }
                                                                : styles.unselected,
                                                        ]}
                                                        onPress={() => setSelectedGender('female')}>
                                                        <Text
                                                            style={[
                                                                styles.text,
                                                                selectedGender === 'female'
                                                                    ? styles.selectedText
                                                                    : styles.unselectedText,
                                                            ]}>
                                                            Female
                                                        </Text>
                                                    </TouchableOpacity>

                                                </View>
                                        }
                                    </View>
                                </View>
                                <View
                                    style={{
                                        marginVertical: 10,
                                        marginHorizontal: 5,
                                        borderWidth: 0.5,
                                        borderColor: 'rgba(31, 72, 124, 0.5)',
                                    }}></View>

                                <View style={{ alignSelf: 'center' }}>
                                    <TouchableOpacity
                                        style={[{
                                            height: 46.09,
                                            backgroundColor: '#1F487C', // White background
                                            borderRadius: 23, // Square rounded corners
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }, (screenTheme === 'Luxury Coach') ? { borderColor: '#D89E2F', borderWidth: 1.5 } : { borderColor: themecolor, borderWidth: 1.3 }]}
                                        onPress={() => setModalVisible(true)}>
                                        {/* <View style={{ flexDirection: 'row', gap: 10 }}> */}
                                        <LinearGradient

                                            locations={(screenTheme === 'Luxury Coach') ? [0.15, 0.38, 0.60, 0.69, 0.85] : [0, 0]}
                                            colors={(screenTheme === 'Luxury Coach') ? ['#F6B642', '#FFF279', '#F6B642', '#FFDF71', '#FBE67B'] : [themecolor, themecolor]}
                                            useAngle={true}
                                            angle={(screenTheme === 'Luxury Coach') ? 170 : 45}
                                            style={[{
                                                flexDirection: 'row', flex: 1, gap: 10, paddingHorizontal: 25,
                                                justifyContent: 'center', borderRadius: 23, alignItems: 'center',
                                            }]}
                                        >
                                            <Svg style={{ width: 25, height: 25 }}>
                                                <Addpassengericon width="100%" height="100%" color={(screenTheme === 'Luxury Coach') ? '#393939' : '#FFFFFF'} />
                                            </Svg>
                                            <Text style={{
                                                fontSize: 16.76,
                                                fontWeight: '600',
                                                fontFamily: 'Inter',
                                                color: (screenTheme === 'Luxury Coach') ? '#393939' : '#FFFFFF',
                                                lineHeight: 20.28,
                                            }}>Add New Passenger</Text>

                                        </LinearGradient>
                                        {/* </View> */}
                                    </TouchableOpacity>
                                </View>
                                <View style={{ marginBottom: 15 }}>
                                    <FlatList
                                        data={PassengerList}
                                        renderItem={({ item }) => <PassengerItemRow item={item} />}
                                        keyExtractor={item => item.id}
                                        showsVerticalScrollIndicator={false} // Optional: hide scroll indicator
                                    />
                                </View>

                            </View>

                        </View>


                    </View>
                </KeyboardAwareScrollView>

                <View >
                    <View style={{
                        margin: 10,
                        marginLeft: 25,
                        gap: 7,
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <CustomCheckbox1
                            checked={isChecked1}
                            onChange={() => setIsChecked1(!isChecked1)}
                        />

                        <Text style={{ fontSize: 12, color: '#393939', fontFamily: 'Inter', fontWeight: '600' }}>
                            I accept the Terms & Conditions
                        </Text>
                    </View>

                    <View style={{ marginHorizontal: 5, marginBottom: 20, marginTop: 3, overflow: 'hidden', flexDirection: 'column', borderWidth: 1.2, borderRadius: 10, borderColor: (screenTheme === 'Luxury Coach') ? '#D89E2F' : themecolor, }}>
                        <View style={{
                            flexDirection: 'column',
                            alignItems: 'center',
                            backgroundColor: '#FFFFFF',
                            overflow: 'hidden',
                            width: '99.8%',
                            position: 'relative',
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                        }}>
                            <TouchableOpacity style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                width: '100%',
                                paddingHorizontal: 15,
                                paddingVertical: 10,
                            }} onPress={() => setIsActive(!isActive)}>
                                <Text style={{
                                    fontFamily: 'Inter',
                                    fontSize: 15,
                                    fontWeight: '400',
                                    fontStyle: 'normal',
                                    textAlign: 'left',
                                    lineHeight: 20,
                                    color: '#393939',
                                }}>Fare Details</Text>
                                <Image
                                    source={
                                        isActive === true
                                            ? require('../assets/downBlackIcon.png') : require('../assets/upBlackIcon.png')
                                    }
                                    style={{ width: 18, height: 9 }}
                                />


                            </TouchableOpacity>
                            {(isActive == true) && (
                                <View>
                                    <Separator />
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            width: '100%',
                                            paddingHorizontal: 15,
                                            paddingVertical: 5,
                                        }}>
                                        <Text
                                            style={{
                                                fontFamily: 'Inter',
                                                fontSize: 15,
                                                fontWeight: '400',
                                                fontStyle: 'normal',
                                                textAlign: 'left',
                                                lineHeight: 20,
                                                color: '#393939',
                                            }}>
                                            {"Base Fare "}
                                        </Text>
                                        <Text
                                            style={{
                                                fontFamily: 'Inter',
                                                fontSize: 15,
                                                fontWeight: '400',
                                                fontStyle: 'normal',
                                                textAlign: 'right',
                                                lineHeight: 20,
                                                color: '#393939',
                                            }}>
                                            {"INR 1757"}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            width: '100%',
                                            paddingHorizontal: 15,
                                            paddingVertical: 5,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                        }}>
                                        <Text
                                            style={{
                                                fontFamily: 'Inter',
                                                fontSize: 15,
                                                fontWeight: '400',
                                                fontStyle: 'normal',
                                                textAlign: 'left',
                                                lineHeight: 20,
                                                color: '#393939',
                                            }}>
                                            {"GST"}
                                        </Text>
                                        <Text
                                            style={{
                                                fontFamily: 'Inter',
                                                fontSize: 15,
                                                fontWeight: '400',
                                                fontStyle: 'normal',
                                                textAlign: 'right',
                                                lineHeight: 20,
                                                color: '#393939',
                                            }}>
                                            {"+ INR 85"}
                                        </Text>
                                    </View>

                                </View>)}

                        </View>
                        <BackgroundImage
                            source={(screenTheme === 'Luxury Coach') ? require('../assets/luxuryContBg.png') : ''}
                            style={{
                                height: 60,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                backgroundColor: (screenTheme === 'Luxury Coach') ? '#D89E2F' : themecolor,
                                borderBottomLeftRadius: 10,
                                borderBottomRightRadius: 10,
                                bottom: -1,
                            }}
                            imageStyle={{
                                borderBottomLeftRadius: 10,
                                borderBottomRightRadius: 10,
                            }}>
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <View style={{ marginLeft: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ justifyContent: 'flex-start', gap: 5 }}>
                                        <Text style={{ color: (screenTheme === 'Luxury Coach') ? themecolor : 'white', fontWeight: '700', fontFamily: 'Inter', fontSize: 15, }}>L18</Text>
                                        <Text style={{
                                            fontWeight: '400', fontSize: 15,
                                            fontFamily: 'Inter',
                                            lineHeight: 16, color: (screenTheme === 'Luxury Coach') ? themecolor : 'white'
                                        }}>
                                            Selected Seat
                                        </Text>
                                    </View>

                                    <View style={{ justifyContent: 'flex-end', gap: 5 }}>
                                        <Text style={{ alignSelf: 'flex-end', fontWeight: '700', fontFamily: 'Inter', fontSize: 15, color: (screenTheme === 'Luxury Coach') ? themecolor : 'white' }}>
                                            ₹ 800
                                        </Text>
                                        <Text
                                            style={{
                                                fontWeight: '400', fontFamily: 'Inter', fontSize: 15,
                                                alignSelf: 'flex-end',
                                                fontWeight: '500',
                                                color: (screenTheme === 'Luxury Coach') ? themecolor : 'white',
                                            }}>
                                            Price
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ alignSelf: 'center' }}>
                                <Image
                                    source={require('../assets/Linewhite.png')}
                                    style={{ width: 1.5, margin: 10, height: 36, tintColor: (screenTheme === 'Luxury Coach') ? themecolor : '#FFFFFF' }}
                                />
                            </View>
                            <View style={{ alignSelf: 'center', paddingRight: 15 }}>
                                <TouchableOpacity style={[styles.cornerbutton, (screenTheme === 'Luxury Coach') ? { backgroundColor: themecolor, } : { backgroundColor: '#fff', }]} onPress={() => {
                                    navigation.navigate('TravelerScreenDetailsSuccess', {
                                        screenTheme: screenTheme,
                                        themecolor: themecolor,
                                        themeColor2: route.params.themeColor2,
                                    }
                                    )
                                }}>


                                    <Text style={{ fontWeight: '400', color: (screenTheme === 'Luxury Coach') ? '#FFFFFF' : themecolor, fontFamily: 'Inter', fontSize: 18, lineHeight: 22 }}>Continue</Text>
                                </TouchableOpacity>
                            </View>
                        </BackgroundImage>
                    </View>

                </View>
                <BottomModalSheet

                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    themeColor={themecolor}
                    screenTheme={screenTheme}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E5FFF1',

    },
    navigationView: {
        width: '100%',
        flexDirection: 'row',
        height: 50,
    },
    topImageBg: {
        width: '100%',
        flexDirection: 'row',
        paddingVertical: 5,
        paddingHorizontal: 10,
        overflow: 'hidden',
        position: 'relative',
    },
    backBtn: {
        alignItems: 'center',
        justifyContent: 'center',
    },
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
    circle: {
        width: 30, // Diameter of the circle
        height: 30, // Diameter of the circle
        borderRadius: 50,
        alignSelf: 'center',
        justifyContent: 'center', // Center vertically
        alignItems: 'center', // Center horizontally 
        backgroundColor: '#3498db', // Background color
    }, button: {
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
    }, button1: {
        height: 46.09,
        backgroundColor: '#1F487C', // White background
        borderRadius: 23, // Square rounded corners
        paddingHorizontal: 25,
        alignItems: 'center',
        justifyContent: 'center',
        // Adding shadow for a subtle Material Design look
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2, // For Android shadow
    },
    buttonText: {
        fontSize: 18,
        color: '#1F487C', // Text color
        textAlign: 'center',
        fontFamily: 'Inter',
        fontWeight: '400',

    }, buttonText1: {
        fontSize: 16,
        color: '#fff', // Text color
        textAlign: 'center',
        alignSelf: 'center'
    }, halfView: {
        flex: 1,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',

    },
    text: {
        fontSize: 14,
        color: '#393939', // Text color
        textAlign: 'center',
        fontFamily: 'Inter',
        fontWeight: '400',
        lineHeight: 16,
    },
    selectedText: {
        color: '#ffffff',
    },
    unselectedText: {
        color: '#393939',
    },
    selected: {
        backgroundColor: '#1F487C',
    },
    unselected: {
        backgroundColor: '#ffffff',

    },
    card: {
        flex: 1,
    }, textInput: {
        height: 40,
        borderColor: '#393939',
        borderWidth: 1,
        borderRadius: 5, // Square rounded corners
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        fontSize: 12,
        fontWeight: '400',
        fontFamily: 'Inter',
        color: '#393939',
        lineHeight: 17,
        // Adding shadow for Material Design look
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.2,
        // shadowRadius: 2,
        // elevation: 2, // For Android shadow
    },
    headerView: {
        width: '100%',
        padding: 5,
        flexDirection: 'row',
        backgroundColor: '#1F487C',
    },
    Headbackground: {
        flexDirection: 'row',
        minHeight: 30,
        width: '100%',
        resizeMode: 'center',
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
    },
    slide: {
        height: 120,
        flex: 1,
        margin: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgray',
        borderRadius: 10,
    },
    rowContainer: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 8,
        marginRight: 16,
        marginTop: 8,
        marginBottom: 20,
    },
    title: {
        fontSize: 16,
        color: '#000',
    },
    container_text: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 12,
        justifyContent: 'center',
    },
    description: {
        fontSize: 11,
        fontStyle: 'italic',
    },
    photo: {
        height: 50,
        width: 50,
    },
    image: {
        width: '100%',
        height: 120,
        resizeMode: 'cover',
        borderRadius: 10,
        flex: 1,
    },
    trackingView: {

        height: 24,
        marginHorizontal: 1,
        flexDirection: 'row', justifyContent: 'center',
        alignItems: 'center'
    },
    wrapper1: {
        position: 'relative',
        flex: 1, // adjust as needed
        height: 65, // adjust as needed
    },
    busPlatformBg: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
    },

    icon: {
        position: 'absolute',
        left: 10,
        top: '55%',
        transform: [{ translateY: -12.5 }],
        width: '50%', // adjust as needed
        height: '50%', // adjust as needed
    }, busListContainer: {
        position: 'relative',
        width: '80%',
        height: 30,
        top: 16,
        left: 28,
    },
    rsText: {
        position: 'absolute',
        top: 3,
        right: 10,
        width: '100%',
        textAlign: 'right',
        color: '#FFFFFF',
        fontSize: 11,
    },
    list: {
        justifyContent: 'center',
    },
    filterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#1F487C',
        borderRadius: 5,
        marginRight: 10,
    },
    filterIcon: {
        width: 20,
        height: 20,
        marginRight: 5,
    },
    filterTitle: {
        fontSize: 13,
        fontWeight: 'bold',
        marginRight: 5,
        color: '1F487C'
    },
    filteAarrowIcon: {
        width: 12,
        height: 6,
    },
    appContainer1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container1: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 15,
        height: 15,
        borderWidth: 1,
        borderColor: '#1F487C',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checked: {
        width: 14,
        height: 14,
        backgroundColor: '#007AFF',
    },
    label: {
        fontSize: 16,
    },
});

export default TravelerScreenDetails;
