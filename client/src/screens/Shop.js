import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Button, TouchableOpacity} from 'react-native';
import {Flower} from "./Flower";
import axios from 'axios';
import {URL, PORT} from "../api/api";
import {Cart} from "../components/Cart";

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

    const goToCabinet = () => {
        navigation.navigate('Cabinet')
    }

    return (
        <View style={styles.container}>
            <Text>Shop</Text>

            <TouchableOpacity
                onPress={goToCabinet}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Go to cabinet</Text>
            </TouchableOpacity>

            <Cart navigation={navigation} />

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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00EAD0',
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