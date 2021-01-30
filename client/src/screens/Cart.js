import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import axios from "axios";
import {PORT, URL} from "../api/api";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Cart = ({navigation}) => {

    const [items, setItems] = useState([]);

    useEffect(() => {
        renderItems();
    }, [items]);

    const renderItems = async () => {
        try {
            const response = await axios.get(`${URL}:${PORT}/api/cart/all`);

            setItems(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    const removeItem = async (id) => {
        try {
            await axios.delete(`${URL}:${PORT}/api/cart/delete`, {params: {id}})
        } catch (e) {
            console.log(e)
        }
    }

    const makeOrderHandler = async (summary) => {
        try {
            const userId = await AsyncStorage.getItem('userId');
            await axios.post(`${URL}:${PORT}/api/orders/add`, {
                userId,
                price: summary
            });

            await axios.delete(`${URL}:${PORT}/api/cart/remove`);

            navigation.navigate('Cabinet')
        } catch (e) {
            console.log(e)
        }
    }

    const summary =
        items.length !== 0 ?
            items.reduce((a, b) => a + b.price, 0) : 0

    return (
        <View style={styles.container}>
            {items ? items.map((item, index) => {
                return (
                    <View key={index} style={styles.card}>
                        <Text style={styles.cardName}>{item.name}</Text>
                        <Text style={styles.description}>{item.description}</Text>
                        <Text style={styles.price}>{item.price} $ for {item.count} piece</Text>
                        <TouchableOpacity
                            onPress={() => removeItem(item._id)}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Remove {item.name} from cart</Text>
                        </TouchableOpacity>
                    </View>
                )
            }) : null}

            {items.length !== 0 ?
                <View>
                    <Text>There is {items.length} items in cart</Text>
                    <Text>Summary - {summary} $</Text>

                    <TouchableOpacity
                        onPress={() => makeOrderHandler(summary)}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Buy {items.length} items by {summary} $</Text>
                    </TouchableOpacity>
                </View> : null}
        </View>
    )
}

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