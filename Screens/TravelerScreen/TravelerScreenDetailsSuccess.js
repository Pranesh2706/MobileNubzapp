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
    TextBase,
    Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Svg } from 'react-native-svg';
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
import HomeIcone from '../assets/HomeIcone';
import ShareIcone from '../assets/ShareIcone';
import ArrowIcone1 from '../assets/ArrowIcone1';
import RectSquarebox from '../assets/RectSquarebox';
import TicketLine from '../assets/TicketLine';
import Downloadicon from '../assets/Downloadicon';
import moment from 'moment';
import RNFetchBlob from 'react-native-blob-util';
import { downloadFile } from '../BookingScreen/DownloadFile';
import Downloadicon1 from '../assets/Downloadicon1';
import { BackgroundImage } from '@rneui/base';

const TravelerScreenDetailsSuccess = ({ props, navigation, route }) => {



    const { themecolor = '#1F487C' } = route.params || {};
    const { themecolor1 = '#1F487C' } = route.params || {};
    const { screenTheme = 'Normal Coach' } = route.params || {};

    const themeheaderFontColor = (screenTheme === 'Luxury Coach') ? '#141414' : '#FFFFFF'; // Default to black if not '#393939'

    const [selectedGender, setSelectedGender] = useState(null);

    const [checked, setChecked] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);


    const onShare = async () => {
        try {
            const result = await Share.share({
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




    // Function to preview the downloaded file on iOS

    const previewFile = async (filePath) => {
        if (Platform.OS === 'ios') {

            RNFetchBlob.fs.exists(filePath)
                .then((exists) => {
                    if (exists) {
                        console.log('entered')
                        setTimeout(() => {
                            console.log('Started')
                            RNFetchBlob.ios.openDocument(filePath)
                                .then(() => console.log('Document opened successfully'))
                                .catch((error) => console.error('Error opening document:', error));
                        }, 10); // Small delay to ensure reinitialization

                    } else {
                        console.error('File does not exist at path:', filePath);
                    }
                })
                .catch((error) => console.error('Error checking file existence:', error));

            // try {
            //   // Clear the cached preview
            //   await RNFetchBlob.fs.unlink(filePath);

            //   // Re-download or recreate the file
            //   // your file download logic here

            //   RNFetchBlob.ios.previewDocument(filePath)
            //     .then(() => {
            //       console.log('Preview opened successfully');
            //     })
            //     .catch((error) => {
            //       console.error('Error opening preview:', error);
            //     });
            // } catch (error) {
            //   console.error('Error handling file:', error);
            // }
        } else {
            console.log('File preview is only available on iOS.');
        }
    };

    const downloadUrlFile = async (getName, getDownloadUrl) => {

        console.log('getName', getName)
        console.log('getDownloadUrl', getDownloadUrl)

        // const getDownloadUrl = API_BASE_URL + "/" + getDocumentUrl;
        try {
            if (Platform.OS === 'ios') {
                downloadFile(getDownloadUrl).then(res => {
                    console.log(res.path());

                    // RNFetchBlob.ios.openDocument(res.path());
                    previewFile(res.path())
                    // RNFetchBlob.ios.previewDocument(res.path());
                });
            } else {
                const currentDate = moment().format('YYYYMMDD_HHmmss');
                let fileName;
                if (getDownloadUrl.toLowerCase().endsWith('.pdf')) {
                    fileName = `${getName}_${currentDate}.pdf`;
                } else if (getDownloadUrl.toLowerCase().match(/\.(jpg|jpeg|png|gif)$/)) {
                    fileName = `${getName}_${currentDate}.jpg`;
                } else {
                    console.log('Unsupported file format.');
                }
                if (fileName) {
                    try {
                        await downloadFileNew(getDownloadUrl, fileName);
                        console.log('Download completed successfully!');
                    } catch (error) {
                        console.log('Download failed:', error);
                    }
                }
            }
        } catch (error) {
            console.log('BLOB ERROR -> ', error);
        }
    };

    const downloadFileNew = async (url, fileName) => {
        const { dirs } = RNFetchBlob.fs;
        const fileExtension = url.split('.').pop();
        const path = `${dirs.DocumentDir}/${fileName}.${fileExtension}`;

        try {
            const response = await RNFetchBlob.config({
                fileCache: true,
                appendExt: fileExtension,
                path,
                addAndroidDownloads: {
                    useDownloadManager: true,
                    notification: true,
                    title: fileName,
                    description: 'File downloaded by download manager.',
                    mime: fileExtension === 'pdf' ? 'application/pdf' : `image/${fileExtension}`,
                },
            }).fetch('GET', url);
            console.log('File downloaded to:', response.path());
            return response.path();
        } catch (error) {
            console.log('Error downloading file:', error);
            return null;
        }
    };

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: (screenTheme === 'Luxury Coach') ? '#F6B642' : themecolor }}
            edges={['right', 'left', 'top']}>

            <View style={styles.container}>
                {/* <View style={styles.headerView}> */}
                <ImageBackground
                    source={(screenTheme === 'Luxury Coach') ? require('../assets/luxuryHeaderBg.png') : require('../assets/HeadBg.png')}
                    style={[styles.navigationView, {
                        backgroundColor: (screenTheme === 'Luxury Coach') ? '#F6B642' : themecolor,
                    }]}
                    imageStyle={{
                        resizeMode: 'cover',
                    }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>


                        <TouchableOpacity
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingRight: 10,
                            }}
                            onPress={() => {
                                navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'BottomTabs', params: { screen: 'HomeStack', params: { screen: 'Home' } } }]
                                });
                            }}>
                            <View style={{ flex: 1, justifyContent: 'center', marginTop: 0, left: 5 }}>
                                <Svg style={{ width: 35, height: 35, borderRadius: 100 }}>
                                    <HomeIcone width="100%" height="100%" color={themeheaderFontColor} />
                                </Svg>
                            </View>
                        </TouchableOpacity>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                            <Text style={{ fontSize: 18, color: themeheaderFontColor, fontWeight: '700' }}>Ticket Details</Text>
                            <Text style={{ fontSize: 12, color: themeheaderFontColor, fontWeight: '700' }}>Successfully</Text>
                        </View>
                        <View style={{ alignSelf: 'flex-end', justifyContent: 'flex-end', marginTop: 5, alignItems: 'flex-end' }}>

                            <TouchableOpacity onPress={onShare}>

                                <View style={{ flex: 1, justifyContent: 'center', marginTop: 0, right: 5 }}>
                                    <Svg style={{ width: 35, height: 35, borderRadius: 100 }}>
                                        <ShareIcone width="100%" height="100%" color={themeheaderFontColor} />
                                    </Svg>
                                </View>
                            </TouchableOpacity>
                        </View>

                    </View>
                </ImageBackground>

                {/* </View> */}
                <ScrollView>


                    <View style={{ flex: 1, flexDirection: 'column' }}>
                        <Text style={{ fontSize: 25, fontWeight: '600', color: '#393939', alignSelf: 'center', marginTop: 20 }}>Ticket Booked Successfully !</Text>
                        <View style={{
                            height: 'auto',
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                            margin: 20, backgroundColor: (screenTheme === 'Luxury Coach') ? '#F6B642' : themecolor
                        }}>

                            <View
                                style={{
                                    width: '100%',
                                    justifyContent: 'center',
                                    alignItems: 'center',

                                }}>
                                <BackgroundImage
                                    source={(screenTheme === 'Luxury Coach') ? require('../assets/DownloadBg1.png') : themecolor}

                                    style={{ width: '100%', height: 150, }}
                                    imageStyle={{
                                        borderTopLeftRadius: 10,
                                        borderTopRightRadius: 10,
                                    }}
                                    resizeMode="cover"
                                >
                                    <View style={{ flex: 1, justifyContent: 'center', }}>


                                        <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'center' }}>
                                            <View style={{ flexDirection: 'column' }}>
                                                <Text style={{ color: themeheaderFontColor, fontSize: 35, fontWeight: 900 }}>CHN</Text>

                                            </View>
                                            <Svg style={{ width: 30, height: 30, borderRadius: 100, alignSelf: 'center' }}>
                                                <ArrowIcone1 width="100%" height="100%" color={themeheaderFontColor} />
                                            </Svg>
                                            <View style={{ flexDirection: 'column' }}>
                                                <Text style={{ color: themeheaderFontColor, fontSize: 35, fontWeight: 900 }}>HYD</Text>

                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'center' }}>
                                            <View style={{ flexDirection: 'column' }}>
                                                <Text style={{ color: themeheaderFontColor, fontSize: 14, fontWeight: '400' }}>20 Feb 2024</Text>

                                            </View>
                                            <Svg style={{ width: 30, height: 30, borderRadius: 100, }}>
                                                {/* <ArrowIcone1 width="100%" height="100%" /> */}
                                            </Svg>
                                            <View style={{ flexDirection: 'column' }}>
                                                <Text style={{ color: themeheaderFontColor, fontSize: 14, fontWeight: '400' }}>21 Feb 2024</Text>

                                            </View>
                                        </View>
                                        <Text style={{ flex: 1, fontSize: 18, fontWeight: '400', color: themeheaderFontColor, alignSelf: 'center', }}>Ticket Number : 353450230-1123</Text>
                                        <Text style={{ flex: 1, fontSize: 18, fontWeight: '400', color: themeheaderFontColor, alignSelf: 'center', }}>PNR : 353450230-1123</Text>

                                    </View>
                                </BackgroundImage>
                            </View>
                            <View style={{ backgroundColor: 'white', marginVertical: -2.5, borderTopWidth: 0, borderWidth: 3, borderColor: (screenTheme === 'Luxury Coach') ? '#F6B642' : themecolor }}>

                                <View style={{ marginHorizontal: 20, marginTop: 10, marginBottom: 0, marginVertical: 5 }}>


                                    <View style={{ flexDirection: 'row', flex: 1, marginBottom: -30, }}>
                                        <View style={{ flexDirection: 'column', flex: 1 }}>
                                            <Text style={{ color: 'black', fontSize: 16.5, fontWeight: 400 }}>Name</Text>
                                            <Text style={{ color: 'black', fontSize: 16.5, fontWeight: 400 }}>Mithun Kumar</Text>

                                        </View>

                                        <View style={{ flexDirection: 'column', flex: 1, alignItems: 'flex-end' }}>
                                            <Text style={{ color: 'black', fontSize: 16.5, fontWeight: 400 }}>Age</Text>
                                            <Text style={{ color: 'black', fontSize: 16.5, fontWeight: 400 }}>24</Text>

                                        </View>
                                    </View>

                                    <View style={{
                                        flexDirection: 'row',
                                        flex: 1,
                                        justifyContent: 'space-between', // Distributes children with space between them
                                        alignItems: 'center',

                                    }}>

                                        {/* <View style={styles.circle} /> */}


                                        <View style={{
                                            width: 15, // Diameter of the circle
                                            height: 30,
                                            left: -23,
                                            top: 20,
                                            borderWidth: 2.5,
                                            borderLeftWidth: 0,
                                            borderColor: (screenTheme === 'Luxury Coach') ? '#F6B642' : themecolor,
                                            borderTopRightRadius: 50,
                                            borderBottomRightRadius: 50,
                                            backgroundColor: '#E5FFF1',

                                        }} />
                                        <View style={{
                                            width: 15, // Diameter of the circle
                                            height: 30,
                                            right: -23,
                                            top: 20,
                                            borderWidth: 2.5,
                                            borderRightWidth: 0,
                                            borderColor: (screenTheme === 'Luxury Coach') ? '#F6B642' : themecolor,
                                            borderTopLeftRadius: 50,
                                            borderBottomLeftRadius: 50,
                                            backgroundColor: '#E5FFF1',

                                        }} />
                                        {/* <View style={styles.circle1} /> */}

                                    </View>


                                    <Svg style={{ height: 3, top: 9, margin: -5 }}>
                                        <TicketLine width="100%" height="100%" />
                                    </Svg>


                                    <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center', justifyContent: 'center' }}>

                                        <Image
                                            source={require('../assets/Operatorlogo.png')}
                                            style={{ width: 34, height: 34, marginRight: 10 }}
                                        />
                                        <Text style={{ fontSize: 15, fontWeight: '400', color: 'black', alignSelf: 'center', }}>ORANGE TOURS AND TRAVELS</Text>

                                    </View>
                                    <View style={{ flexDirection: 'row', gap: 10, margin: 0, justifyContent: 'center' }}>
                                        <View style={{ flexDirection: 'column' }}>
                                            <Text style={{ color: 'black', fontSize: 16, fontWeight: 400 }}>20 Feb</Text>
                                            <Text style={{ color: 'black', fontSize: 16, fontWeight: 700 }}>18:30</Text>

                                        </View>
                                        <View style={{
                                            flex: 1, alignItems: 'center', alignItems: 'center',
                                            justifyContent: 'center',
                                            position: 'relative',
                                        }}>
                                            <Image
                                                source={require('../assets/BusArrowicone.png')}
                                                style={{ width: 148, height: 35, tintColor: 'black' }}
                                            />
                                            <Text style={{
                                                position: 'absolute',
                                                color: 'white', // Adjust color as needed
                                                fontSize: 12,
                                                bottom: 20,
                                                fontWeight: 'bold',
                                            }}>10:30 Hrs</Text>
                                        </View>
                                        <View style={{ flexDirection: 'column' }}>
                                            <Text style={{ color: 'black', fontSize: 16, fontWeight: 400 }}>21 Feb</Text>
                                            <Text style={{ color: 'black', fontSize: 16, fontWeight: 700 }}>01:30</Text>

                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', gap: 10, marginTop: 10, justifyContent: 'center' }}>
                                        <View style={{ flexDirection: 'row', }}>


                                            <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                                                <Text style={{ color: 'black', fontSize: 16, fontWeight: 400 }}>Seat No</Text>
                                                <Text style={{ color: 'black', fontSize: 16, fontWeight: 700 }}>L18</Text>

                                            </View>

                                        </View>
                                        <View style={{ flexDirection: 'row', flex: 1, }}>


                                            <Image
                                                source={require('../assets/LineTBS.png')}
                                                style={{ width: 1.5, height: 64, justifyContent: 'center', alignSelf: 'center' }}
                                            />


                                            <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ color: 'black', fontSize: 16, fontWeight: 400 }}>Passenger</Text>
                                                <Text style={{ color: 'black', fontSize: 16, fontWeight: 700 }}>1 Adult (M)</Text>

                                            </View>

                                            <Image
                                                source={require('../assets/LineTBS.png')}
                                                style={{ width: 1.5, height: 64, justifyContent: 'center', alignSelf: 'center' }}
                                            />

                                        </View>
                                        <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                                            <Text style={{ color: 'black', fontSize: 16, fontWeight: 400 }}>Trip</Text>
                                            <Text style={{ color: 'black', fontSize: 16, fontWeight: 700 }}>One Way</Text>

                                        </View>
                                    </View>
                                    <View style={{ top: -30 }}>
                                        <View style={{
                                            flexDirection: 'row',
                                            flex: 1,
                                            justifyContent: 'space-between', // Distributes children with space between them
                                            alignItems: 'center',
                                        }}>

                                            {/* <View style={styles.circle} /> */}


                                            <View style={{
                                                width: 15, // Diameter of the circle
                                                height: 30,
                                                left: -23,
                                                top: 20,
                                                borderWidth: 2.5,
                                                borderLeftWidth: 0,
                                                borderColor: (screenTheme === 'Luxury Coach') ? '#F6B642' : themecolor,
                                                borderTopRightRadius: 50,
                                                borderBottomRightRadius: 50,
                                                backgroundColor: '#E5FFF1',

                                            }} />
                                            <View style={{
                                                width: 15, // Diameter of the circle
                                                height: 30,
                                                right: -23,
                                                top: 20,
                                                borderWidth: 2.5,
                                                borderRightWidth: 0,
                                                borderColor: (screenTheme === 'Luxury Coach') ? '#F6B642' : themecolor,
                                                borderTopLeftRadius: 50,
                                                borderBottomLeftRadius: 50,
                                                backgroundColor: '#E5FFF1',

                                            }} />
                                            {/* <View style={styles.circle1} /> */}

                                        </View>
                                        <Svg style={{ height: 3, top: 9, margin: -5, }}>
                                            <TicketLine width="100%" height="100%" />
                                        </Svg>
                                    </View>

                                    <View style={{ flexDirection: 'row', marginTop: 20, top: -25, alignItems: 'center', justifyContent: 'center' }}>


                                        <Text style={{ fontSize: 16.76, lineHeight: 20.29, fontWeight: '400', color: 'black', alignSelf: 'center', }}>Scan this QR code to get on the bus</Text>

                                    </View>
                                    <View style={{ justifyContent: 'center', flex: 1, top: -10 }}>


                                        <Image
                                            source={require('../assets/QRIcone2.png')}
                                            style={{ width: 89, height: 86, bottom: 5, alignSelf: 'center' }}
                                        />
                                    </View>
                                </View>
                            </View>


                        </View>
                        <TouchableOpacity style={{
                            height: 40, // Define the height of the view
                            flex: 1,
                            margin: 19,

                        }} onPress={() => {
                            downloadUrlFile("TBS", 'https://assets.respectpropertyowners.com/emirates_id/1723793133677-input.pdf')

                        }}>
                            {screenTheme !== 'Luxury Coach' ? (
                                <Svg
                                    style={{
                                        flex: 1,
                                        width: '100%',
                                        height: 155,
                                        top: -85,
                                    }}
                                >
                                    <Downloadicon width="100%" height="100%" />
                                </Svg>
                            ) : (
                                // <Image
                                //     source={require('../assets/DT.png')} // Replace with your PNG path
                                //     style={{
                                //         width: '100%',
                                //         height: 155,
                                //         top: -87,
                                //     }}
                                //     resizeMode="contain" // Ensure the image scales properly
                                // />


                                <Svg
                                    style={{
                                        flex: 1,
                                        width: '100%',
                                        height: 155,
                                        top: -85,
                                    }}
                                >
                                    <Downloadicon1 width="100%" height="100%" />
                                </Svg>
                            )}
                        </TouchableOpacity>



                    </View>
                </ScrollView>

            </View >

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E5FFF1',
    }, circle: {
        width: 40, // Diameter of the circle
        height: 41, // Diameter of the circle
        borderRadius: 50,
        left: -40,
        top: 20,
        borderWidth: 1,
        borderColor: 'black',
        alignSelf: 'flex-start',
        justifyContent: 'center', // Center vertically
        alignItems: 'center', // Center horizontally 
        backgroundColor: 'white', // Background color
    }, redHalf: {
        width: 20, // Half of the diameter
        height: 40, // Full height to cover the circle
        backgroundColor: 'red', // Color of the left half border
        position: 'absolute',
        left: -20, // Move to the left side of the circle
        top: 0, // Align with the top of the circle
        borderTopLeftRadius: 20, // Match the circle's border radius
        borderBottomLeftRadius: 20, // Match the circle's border radius
    },

    navigationView: {
        width: '100%',
        flexDirection: 'row',
        height: 50,
    },
    circle1: {
        width: 40, // Diameter of the circle
        height: 41, // Diameter of the circle
        borderRadius: 50,
        right: -40,
        top: 20,

        alignSelf: 'flex-start',
        justifyContent: 'center', // Center vertically
        alignItems: 'center', // Center horizontally 
        backgroundColor: '#E5FFF1', // Background color
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
        backgroundColor: '#1F487C', // White background
        borderRadius: 20, // Square rounded corners
        paddingVertical: 10,
        paddingHorizontal: 20,
        // Adding shadow for a subtle Material Design look
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2, // For Android shadow
    }, textContainer: {
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: [{ translateX: -50 }, { translateY: -50 }],

        width: '100%',
    }, container12: {
        width: 100,
        height: 50, // Half of the diameter
        overflow: 'hidden',
        borderTopLeftRadius: 50, // Half of the diameter
        borderTopRightRadius: 50, // Half of the diameter
    },
    halfCircle: {
        width: 100,
        height: 100, // Diameter
        backgroundColor: 'blue', // Desired fill color
        borderRadius: 50, // Half of the diameter to make it a circle
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    text: {
        fontSize: 24,
        color: 'black', // Customize the text style as needed
    },
    buttonText: {
        fontSize: 16,
        color: '#000', // Text color
        textAlign: 'center',
    }, buttonText1: {
        fontSize: 16,
        color: '#fff', // Text color
        textAlign: 'center',
        alignSelf: 'center'
    }, halfView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
    },
    selectedText: {
        color: 'white',
    },
    unselectedText: {
        color: 'black',
    },
    selected: {
        backgroundColor: '#1F487C',
        borderRadius: 10
    },
    unselected: {
        backgroundColor: 'white',
        borderRadius: 10

    },
    card: {
        flex: 1,
    }, textInput: {
        height: 40,

        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10, // Square rounded corners
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        fontSize: 16,
        // Adding shadow for Material Design look
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2, // For Android shadow
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
});

export default TravelerScreenDetailsSuccess;
