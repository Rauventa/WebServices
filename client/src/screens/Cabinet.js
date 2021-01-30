import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {URL, PORT} from '../api/api';
import {AntDesign, MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import {Cart} from "../components/Cart";

export const Cabinet = ({navigation}) => {

    const [email, setEmail] = useState('');
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        renderEmailHandler();
    }, [email]);

    useEffect(() => {
        renderOrders()
    }, [orders])

    const renderOrders = async () => {
        try {
            const userId = await AsyncStorage.getItem('userId');
            const response = await axios.get(`${URL}:${PORT}/api/orders/all`, {params: {userId}});

            setOrders(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    const renderEmailHandler = async () => {
        const res = await AsyncStorage.getItem('userEmail');
        setEmail(res);
    }

    const logoutHandler = async () => {
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('userId');
        await AsyncStorage.removeItem('userEmail');

        navigation.navigate('SignIn')
    };

    const goToShop = () => {
        navigation.navigate('Shop')
    }

    const goToCabinet = () => {
        navigation.navigate('Cabinet')
    }

    // const sendDataHandler = async () => {
    //     try {
    //         await axios.post(`${URL}:${PORT}/api/flowers/add`, {
    //             name: 'Rose',
    //             description: 'good flower with pretty colors',
    //             price: 15,
    //             count: 1000
    //         })
    //     } catch (e) {
    //         console.log(e)
    //     }
    // };

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.headerText}>Menta</Text>
                <Text style={styles.headerEmail}>{email === '' ? 'User is not active now' : email}</Text>
            </View>

            <ScrollView style={styles.main}>
                {/*<TouchableOpacity*/}
                {/*    style={styles.button}*/}
                {/*    onPress={sendDataHandler}*/}
                {/*>*/}
                {/*    <Text style={styles.buttonText}>Add new flower</Text>*/}
                {/*</TouchableOpacity>*/}

                {orders.length !== 0 ? orders.map((order, index) => {
                    return (
                        <View key={index} style={styles.card}>
                            <Text style={styles.cardName}>Order for {order.price}$</Text>
                            <Text style={styles.description}>{order.orderTime.toLocaleString()}</Text>
                        </View>
                    )
                }) : <Text style={styles.headerEmail}>There is no orders now</Text>}
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
}

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
    headerEmail: {
        textAlign: 'center',
        fontSize: 15,
    },
    headerText: {
        textTransform: 'uppercase',
        fontSize: 28,
        fontWeight: 'bold'
    },
    card: {
        padding: 20,
        backgroundColor: '#FCFCFC',
        borderRadius: 10,
        marginBottom: 20,
    },
    cardName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10
    },
    description: {
        marginBottom: 15,
        fontStyle: 'italic',
    },
    price: {
        fontStyle: 'italic',
        textAlign: 'right',
        marginBottom: 20
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