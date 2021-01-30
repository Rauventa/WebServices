import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {Flower} from "./Flower";
import axios from 'axios';
import {URL, PORT} from "../api/api";
import {Cart} from "../components/Cart";
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Shop = ({navigation}) => {

    const [flowers, setFlowers] = useState([]);

    useEffect(() => {
        renderFlowers();
    }, [flowers]);

    const renderFlowers = async () => {
        try {
            const response = await axios.get(`${URL}:${PORT}/api/flowers/all`);

            setFlowers(response.data);
        } catch (e) {
            console.log(e)
        }
    }

    const logoutHandler = async () => {
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('userId');
        await AsyncStorage.removeItem('userEmail');

        navigation.navigate('SignIn')
    };

    const goToCabinet = () => {
        navigation.navigate('Cabinet')
    }

    const goToShop = () => {
        navigation.navigate('Shop')
    }

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.headerText}>Menta</Text>
            </View>

            <ScrollView style={styles.main}>
                {flowers.length !== 0 ?
                    flowers.map((flower, index) => {
                        return (
                            <Flower
                                key={index}
                                id={flower._id}
                                name={flower.name}
                                description={flower.description}
                                price={flower.price}
                                count={flower.count}
                            />
                        )
                    }) : null
                }
            </ScrollView>


            <View style={styles.bottomBar}>
                <TouchableOpacity
                    onPress={goToCabinet}
                >
                    <AntDesign name="user" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={goToShop}
                >
                    <MaterialCommunityIcons name="flower-tulip" size={24} color="white" />
                </TouchableOpacity>
                <Cart navigation={navigation} />
                <TouchableOpacity
                    onPress={logoutHandler}
                >
                    <MaterialIcons name="logout" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    )
};

// Shop.navigationOptions = {
//     headerTitle: 'Shopping',
//     headerRight: () => <Cart />
// }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 50,
        backgroundColor: '#00EAD0',
    },
    main: {
        paddingVertical: 30,
        paddingHorizontal: 50,
        width: '100%',
    },

    header: {

    },
    headerText: {
      textTransform: 'uppercase',
        fontSize: 28,
        fontWeight: 'bold'
    },
    bottomBar: {
        backgroundColor: '#2F3132',
        paddingHorizontal: 30,
        paddingVertical: 30,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowRadius: 10,
        shadowOpacity: 0.55,
        shadowOffset: {
            width: 0,
            height: -5,
        },
        shadowColor: '#2F3132',
        elevation: 0,
    },

    button: {
        borderRadius: 100,
        borderWidth: 1,
        backgroundColor: '#2F3132',
        width: '90%',
        height: 'auto',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20
    },

    buttonText: {
        color: '#FCFCFC'
    }
});