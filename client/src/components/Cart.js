import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import axios from "axios";
import {PORT, URL} from "../api/api";
import {Feather} from "@expo/vector-icons";


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
                style={styles.cart}
                onPress={goToCart}
            >
                <Feather name="shopping-cart" size={24} color="white" />
                <Text style={styles.buttonText}>{items.length !== 0 ? items.length : 0}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    cart: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    headerEmail: {
        textAlign: 'center',
        fontSize: 15,
    },
    buttonText: {
        color: '#FCFCFC',
        marginLeft: 10
    }
});