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
            <Text style={styles.headingText}>Sign up</Text>
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
            <TextInput
                style={styles.textField}
                onChangeText={text => setRepeat(text)}
                value={repeat}
                placeholder={'Repeat password'}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={sendData}
            >
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')} style={styles.button}>
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