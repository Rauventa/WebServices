import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import axios from 'axios';
import {AUTH, PORT, URL} from '../api/api'

export const SignUp = ({navigation}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeat, setRepeat] = useState('');

    const sendData = async () => {
        try {
            // Господи, на этот баг ушло порядка 5-ти часов. Для того, чтобы юзать IOS онлайн, без эмулятора, нужно взять LAN expo и добавить к нему порт backend без прокси
            await axios.post(`${URL}:${PORT}/${AUTH}/register`, {
                email: email.toLowerCase(),
                password: password,
                repeat: repeat
            });

            setEmail('');
            setPassword('');
            setRepeat('');

            navigation.navigate('SignIn');
        } catch (e) {
            console.log('error', e.message)
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerSmall}>Welcome to</Text>
                <Text style={styles.headerBig}>Menta</Text>
            </View>
            <TextInput
                style={styles.textField}
                onChangeText={text => setEmail(text)}
                value={email}
                placeholder={'Email'}
                placeholderTextColor="#2F3132"
            />
            <TextInput
                style={styles.textField}
                onChangeText={text => setPassword(text)}
                value={password}
                secureTextEntry={true}
                placeholder={'Password'}
                placeholderTextColor="#2F3132"
            />
            <TextInput
                style={styles.textField}
                onChangeText={text => setRepeat(text)}
                value={repeat}
                secureTextEntry={true}
                placeholder={'Repeat password'}
                placeholderTextColor="#2F3132"
            />

            <TouchableOpacity
                style={styles.button}
                onPress={sendData}
            >
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')} style={styles.buttonTransparent}>
                <Text>Already registered?</Text>
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

    headerSmall: {
        textAlign: 'center',
        fontSize: 24,
        color: '#2F3132',
        fontWeight: 'normal'
    },

    headerBig: {
        textAlign: 'center',
        fontSize: 58,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: '#2F3132',
        marginBottom: 100
    },

    textField: {
        width: '90%',
        height: 'auto',
        textAlign: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20,
        marginVertical: 10,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#2F3132',
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
        marginTop: 50
    },

    buttonTransparent: {

    },

    buttonText: {
        color: '#FCFCFC',
        textTransform: 'uppercase'
    }
});