import { useState, useEffect } from "react";
import { View, ScrollView, SafeAreaView, TouchableOpacity, Dimensions, Image, StyleSheet, ImageBackground, Text, FlatList } from "react-native";
import { Svg } from 'react-native-svg';
import BackWhite from "../assets/BackWhite";
const { width } = Dimensions.get('window');
const numColumns = 2; // Number of columns
const itemWidth = (width - 40) / numColumns;
import FastImage from 'react-native-fast-image';

const BusTypeDetails = ({ navigation }) => {
    const data = [
        { id: '1', title: 'AC', image: require('../assets/ac.png'), selectedImage: require('../assets/Selected_ac.png') },
        { id: '2', title: 'Non AC', image: require('../assets/nonAc.png'), selectedImage: require('../assets/Selected_NonAc.png') },
        { id: '3', title: 'Seater', image: require('../assets/seater1.png'), selectedImage: require('../assets/seater1.png') },
        { id: '4', title: 'Sleeper', image: require('../assets/sleeper1.png'), selectedImage: require('../assets/sleeper1.png') },
    ];

    // Select all options for the Regular Bus when the app opens
    const [selectedBusesRegular, setSelectedBusesRegular] = useState([]);  // Pre-select all items in Regular Bus
    const [selectedBusesLuxury, setSelectedBusesLuxury] = useState([]);  // State for Luxury Bus
    const [selectedBusesAll, setSelectedBusesAll] = useState(data.map(item => item.id));  // State for All Buses
    const [isToggled, setIsToggled] = useState('all');  // Default to Regular Bus

    // Handle selecting a bus option
    const handleSelectBus = (item) => {
        if (isToggled === 'reg') {
            setSelectedBusesRegular((prev) =>
                prev.includes(item.id) ? prev.filter((each) => each !== item.id) : [...prev, item.id]
            );
        } else if (isToggled === 'lux') {
            setSelectedBusesLuxury((prev) =>
                prev.includes(item.id) ? prev.filter((each) => each !== item.id) : [...prev, item.id]
            );
        } else {
            setSelectedBusesAll((prev) =>
                prev.includes(item.id) ? prev.filter((each) => each !== item.id) : [...prev, item.id]
            );
        }
    };

    // Render bus items based on the toggled bus type
    const BusItem = ({ item, type }) => {
        const isSelected =
            type === 'reg' ? selectedBusesRegular.includes(item.id) :
                type === 'lux' ? selectedBusesLuxury.includes(item.id) :
                    selectedBusesAll.includes(item.id);

        const backgroundImages = {
            reg: isSelected ? require('../assets/reg.png') : require('../assets/regUn.png'),
            lux: isSelected ? require('../assets/lux.png') : require('../assets/luxUn.png'),
            all: isSelected ? require('../assets/all.png') : require('../assets/allUn.png')
        };

        const contentStyle = isSelected ? styles.busItemContent1 : styles.busItemContent;



        const imageToShow = isSelected ? item.image : item.selectedImage;
        const textColor = isSelected
            ? '#FFFFFF' // Selected text color is white
            : type === 'reg' ? '#1F487C' : // Regular Bus not selected
                type === 'lux' ? '#9A7522' : // Luxury Bus not selected
                    '#393939'; // All Buses not selected
        const shouldApplyTintColor = item.title !== 'seater' && item.title !== 'sleeper';
        return (
            <View style={{ padding: 5 }}>
                <TouchableOpacity onPress={() => handleSelectBus(item)}>
                    <ImageBackground
                        resizeMode='contain'
                        source={backgroundImages[type]}
                        style={[styles.busItemBackground, { width: itemWidth }]}
                        imageStyle={{ borderRadius: 8 }}
                    >
                        <View style={contentStyle}>
                            {/* Conditional rendering of the Image component */}
                            {item.title === 'AC' || item.title === 'Non AC' ? (
                                <Image
                                    source={imageToShow}
                                    style={[styles.busItemIcon, { tintColor: textColor }]}
                                    resizeMode="contain"
                                />
                            ) : (
                                <Image
                                    source={imageToShow}
                                    style={[styles.busItemIcon]}
                                    resizeMode="contain"
                                />
                            )}

                            <Text style={[styles.busItemText, { color: textColor }]}>{item.title}</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
        );
    };

    // Function to render bus items depending on the selected bus type
    const renderBusItems = (type) => (
        <FlatList
            data={data}
            renderItem={({ item }) => <BusItem item={item} type={type} />}
            numColumns={2} // Ensures two items per row
            scrollEnabled={false} // Disables scrolling if needed
            contentContainerStyle={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between', // Ensures equal spacing between items
            }}
            keyExtractor={(item) => item.id}
        />
    );

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require('../assets/appBackgroundImage.png')} style={styles.fullScreenBackground}>
                <View style={styles.bgView}>
                    <View style={styles.navigationView}>
                        <ImageBackground
                            source={require('../assets/HeadBg.png')}
                            style={styles.topImageBg}
                            imageStyle={{
                                resizeMode: 'cover',
                            }}>
                            <TouchableOpacity
                                style={styles.backBtn}
                                onPress={() => navigation.goBack()}>
                                <View style={{ flex: 1, justifyContent: 'center' }}>
                                    <Svg style={{ width: 30, height: 30, borderRadius: 100 }}>
                                        <BackWhite width="100%" height="100%" />
                                    </Svg>
                                </View>
                            </TouchableOpacity>
                            <View style={styles.topViewTitle}>
                                <Text style={styles.topTitle}>Bus Type Details</Text>
                                <Text style={{
                                    color: 'rgba(255, 255, 255, 0.5)',
                                    fontSize: 13.85,
                                    fontWeight: '700'
                                }}>Step 1 of 4</Text>
                            </View>
                        </ImageBackground>
                    </View>

                    <ScrollView contentContainerStyle={styles.scrollContentContainer}>
                        <View style={styles.sectionContainer}>
                            <ImageBackground source={require('../assets/allbus.png')} style={styles.sectionBackground}>
                                <TouchableOpacity onPress={() => setIsToggled('all')} style={styles.sectionHeader}>
                                    <Text style={styles.sectionHeaderText}>ALL BUSES</Text>
                                </TouchableOpacity>
                                {isToggled === 'all' && renderBusItems('all')}

                            </ImageBackground>

                            <ImageBackground source={require('../assets/regular.png')} style={[{ overflow: 'hidden' }, { backgroundColor: '#FBBA11' }]}>
                                <TouchableOpacity onPress={() => setIsToggled('reg')} style={styles.sectionHeader}>
                                    <Text style={styles.sectionHeaderText}>REGULAR BUSS</Text>
                                </TouchableOpacity>

                                {isToggled === 'reg' && renderBusItems('reg')}
                            </ImageBackground>

                            <ImageBackground source={require('../assets/luxbus.png')} style={{ overflow: 'hidden', backgroundColor: '#FBBA11', borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                                <TouchableOpacity onPress={() => setIsToggled('lux')} style={styles.sectionHeader}>
                                    <Text style={styles.sectionHeaderText}>LUXURY BUS</Text>
                                </TouchableOpacity>
                                {isToggled === 'lux' && renderBusItems('lux')}
                            </ImageBackground>
                        </View>

                        <ImageBackground
                            style={[styles.applyButtonContainer, isToggled === 'lux' && { backgroundColor: '#FBBA11' }]}
                            source={isToggled === 'reg' ? require('../assets/regular.png') : isToggled === 'lux' ? require('../assets/luxbus.png') : require('../assets/allbus.png')}
                        >
                            <TouchableOpacity onPress={() => navigation.navigate('SearchAI')} style={styles.submitView}>
                                <Text style={styles.submitText}>APPLY</Text>
                            </TouchableOpacity>
                        </ImageBackground>

                        <View style={styles.imageContainer}>

                            {Platform.OS === 'ios' ? (
                                <Image source={require('../assets/busttypedetail.gif')} resizeMode='cover' style={styles.fullSizeImage} />
                            ) : (
                                <FastImage
                                    source={require('../assets/homeAds.gif')}
                                    style={styles.fullSizeImage}
                                    resizeMode={FastImage.resizeMode.cover}
                                />
                            )}
                        </View>
                    </ScrollView>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1F487C',
    },
    bgView: {
        flex: 1,
        backgroundColor: '#E5FFF1'
    },
    backBtn: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    navigationView: {
        width: '100%',
        padding: 5,
        flexDirection: 'row',
        backgroundColor: '#1F487C',
    },
    topImageBg: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        paddingHorizontal: 5,
        overflow: 'hidden',
        position: 'relative',
        bottom: 5,
    },
    topImageBg1: {

        height: 110,
        flexDirection: 'row',

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
        marginRight: 30,
    },
    topTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'right',
        color: 'white',
    },
    fullScreenBackground: {
        height: '100%',
        width: '100%',
    },
    scrollContentContainer: {
        paddingBottom: 20, // Ensure there's padding at the bottom
    },
    sectionContainer: {
        borderRadius: 15,
        overflow: 'hidden',
        padding: 10,
    },
    sectionBackground: {

        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        marginVertical: -0.5,
        overflow: 'hidden',


    },
    sectionHeader: {
        padding: 10,
    },
    sectionHeaderText: {
        fontWeight: '700',
        fontSize: 22,
        color: '#fff',
        lineHeight: 26
    },
    busItemBackground: {
        height: 50,
        width: 160,
        justifyContent: 'center',
    },
    busItemContent: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
        left: 15
    },
    busItemContent1: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
        right: 15
    },
    busItemIcon: {
        height: 25,
        width: 25,
    },
    busItemText: {
        color: '#000',
        fontSize: 18.74,
        textAlign: 'left',

    },
    flatListContent: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    applyButtonContainer: {
        borderRadius: 10,
        overflow: 'hidden',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        height: 50,
        justifyContent: 'center',

    },
    submitView: {
        borderRadius: 15,

        justifyContent: 'center',
        alignItems: 'center',
    },
    submitText: {
        fontSize: 22,
        fontWeight: '700',
        lineHeight: 26,
        color: '#FFFFFF',
        textAlign: 'center',
    },
    imageContainer: {
        margin: 20,
        height: 290,
        overflow: 'hidden',
        // borderStyle: 'dashed',
        borderRadius: 10,
        borderWidth: 1,

        backgroundColor: '#fff',


    },
    fullSizeImage: {
        height: '100%',
        width: '100%',
    },
});

export default BusTypeDetails;