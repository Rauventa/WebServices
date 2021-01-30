import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import {AUTH, PORT, URL} from "../api/api";

export const SignIn = ({navigation}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const sendData = async () => {
        try {
            const response = await axios.post(`${URL}:${PORT}/${AUTH}/login`, {
                email: email.toLowerCase(),
                password: password,
            });

            //Set user data
            await AsyncStorage.setItem('userToken', response.data.token);
            await AsyncStorage.setItem('userId', response.data.userId);
            await AsyncStorage.setItem('userEmail', response.data.email);

            setEmail('');
            setPassword('');

            navigation.navigate('Shop');
        } catch (e) {
            console.log('error', e.response.data)
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headingText}>Sign In</Text>
            <TextInput
                style={styles.textField}
                onChangeText={text => setEmail(text)}
                value={email}
                placeholder={'Email'}
            />
            <TextInput
                style={styles.textField}
                onChangeText={text => setPassword(text)}
                value={password}
                placeholder={'Password'}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={sendData}
            >
                <Text style={styles.buttonText}>Sign In</Text>
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

    headingText: {
        fontSize: 36,
        marginBottom: 40
    },

    textField: {
        width: '90%',
        height: 'auto',
        textAlign: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 10,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#2F3132'
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