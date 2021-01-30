import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import axios from "axios";
import {PORT, URL} from "../api/api";


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

    const goToCart = () => {
        navigation.navigate('Cart')
    }

    return (
        <View>
            <TouchableOpacity
                style={styles.button}
                onPress={goToCart}
            >
                <Text style={styles.buttonText}>{items ? items.length : 0}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
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