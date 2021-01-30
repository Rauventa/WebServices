import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import axios from "axios";
import {PORT, URL} from "../api/api";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AntDesign, Feather, MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import {Flower} from "./Flower";

export const Cart = ({navigation}) => {

    const [items, setItems] = useState([]);

    useEffect(() => {
        renderItems();
    }, [items]);

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

            <View style={styles.header}>
                <Text style={styles.headerText}>Menta</Text>
            </View>

            <ScrollView style={styles.main}>
                {items.length !== 0 ? items.map((item, index) => {
                    return (
                        <View key={index} style={styles.card}>
                            <Text style={styles.cardName}>{item.name}</Text>
                            <Text style={styles.description}>{item.description}</Text>
                            <Text style={styles.price}>{item.price} $ for {item.count} piece</Text>
                            <TouchableOpacity
                                onPress={() => removeItem(item._id)}
                                style={styles.buttonSmall}
                            >
                                <Text style={styles.buttonText}>Remove {item.name} from cart</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }) : <Text style={styles.headerEmail}>There is no flowers now</Text>}
            </ScrollView>

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
                <Feather name="shopping-cart" size={24} color="white" />
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
    headerEmail: {
        textAlign: 'center',
        fontSize: 15,
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
        marginBottom: 20
    },
    buttonSmall: {
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

    button: {
        borderRadius: 100,
        borderWidth: 1,
        backgroundColor: '#2F3132',
        width: '90%',
        height: 'auto',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 30,
        marginBottom: 10,
        marginTop: 20
    },

    buttonTransparent: {

    },

    buttonText: {
        color: '#FCFCFC',
        textTransform: 'uppercase'
    }
});