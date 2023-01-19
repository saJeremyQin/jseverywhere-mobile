import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import JereButton from './JereButton';

const UserForm = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        // console.log('email is', email);
        // console.log('password is', password);
        props.action({
            variables:{
                email,
                password
            }
        });
    };

    return (
        <View style={styles.formview}>
            <Text style={styles.formlabel}>Email:</Text>
            <TextInput
                style={styles.input} 
                onChangeText={(text) => setEmail(text)}
                value={email}
                placeholder='Please input your Email'
                textContentType='emailAddress'
                autoFocus={true}
                autoCapitalize='none'
            />
            <Text>Password:</Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => setPassword(text)}
                value={password} 
                placeholder='Please input your Password'
                textContentType='password'
                secureTextEntry={true}
            />
            <JereButton color="green" title='Submit' onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    formview:{
        padding:10
    },
    input:{
        // border: 1px solid gray;
        // font-size: 18px;
        // padding: 8px;
        // margin-bottom: 24px;
        borderWidth:1,
        borderRadius:5,
        marginBottom:20,
        height:40,
        width:'80%',
        padding:8,
        // textAlign:'center'
    },
    // formlabel:{
    //     font-size: 18px;
    //     font-weight: bold;
    // }

});


export default UserForm;
