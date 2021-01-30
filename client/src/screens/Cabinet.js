import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {URL, PORT} from '../api/api';

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

            <Text>{email === '' ? 'User is not active now' : email}</Text>

            {/*<TouchableOpacity*/}
            {/*    style={styles.button}*/}
            {/*    onPress={sendDataHandler}*/}
            {/*>*/}
            {/*    <Text style={styles.buttonText}>Add new flower</Text>*/}
            {/*</TouchableOpacity>*/}

            <TouchableOpacity
                style={styles.button}
                onPress={goToShop}
            >
                <Text style={styles.buttonText}>Go to the shop</Text>
            </TouchableOpacity>

            {orders ? orders.map((order, index) => {
                return (
                    <View key={index} style={styles.card}>
                        <Text style={styles.cardName}>Order for {order.price}$</Text>
                        <Text style={styles.description}>{order.orderTime.toLocaleString()}</Text>
                    </View>
                )
            }) : null}

            <TouchableOpacity
                style={styles.button}
                onPress={logoutHandler}
            >
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00EAD0',
    },
    card: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 5,
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