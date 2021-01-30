import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
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

            Alert.alert(
                `Flower was added`,
                `${name} flower of ${count} pcs`,
                [
                    { text: "Ok",}
                ],
                { cancelable: false }
            );
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <View style={styles.card}>
            {/*<Image*/}
            {/*    style={styles.image}*/}
            {/*    source={{ uri: 'https://img5.goodfon.ru/wallpaper/nbig/5/8e/wallpaper-background-4k-ultra-hd-roses-bouquet-flowers-vase.jpg' }}*/}
            {/*/>*/}
            <Text style={styles.cardName}>{name}</Text>
            <Text style={styles.description}>{description}</Text>
            <Text style={styles.price}>{price} $ for {count} piece</Text>

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
        width: '100%',
        height: 'auto',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FCFCFC',
        marginBottom: 30,
        borderRadius: 10
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
    image: {
      width: 'auto',
      height: '100%'
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