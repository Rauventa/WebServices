import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import axios from 'axios';
import {URL, PORT} from "../api/api";

export const Flower = ({id, name, description, price, count, navigation}) => {

    // const addItemHandler = async () => {
    //     try {
    //         const userData = await AsyncStorage.getItem('userId');
    //         await axios.post(`${URL}:${PORT}/api/orders/add`, {
    //             userId: userData,
    //             flowerId: id,
    //             name,
    //             description,
    //             price,
    //             count: 10
    //         })
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }

    const addItemHandler = async () => {
        try {
            await axios.post(`${URL}:${PORT}/api/cart/add`, {
                name,
                description,
                price,
                count: 1
            })
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <View style={styles.card}>
            <Text>{name}</Text>

            <TouchableOpacity
                style={styles.button}
                onPress={addItemHandler}
            >
                <Text style={styles.buttonText}>Buy {name}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        width: '80%',
        height: 'auto',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
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
        paddingHorizontal: 30
    },
    buttonText: {
        color: '#FCFCFC'
    }
});