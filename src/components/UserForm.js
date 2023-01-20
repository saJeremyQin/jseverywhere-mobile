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

        props.action({
            variables:{
                email,
                password
            }
        });
    };

    return (
        <View style={styles.formview}>
            <Text style={styles.formlabel}>Email</Text>
            <TextInput
                style={styles.input} 
                onChangeText={(text) => setEmail(text)}
                value={email}
                placeholder='Please input your Email'
                textContentType='emailAddress'
                autoFocus={true}
                autoCapitalize='none'
            />
            <Text style={styles.formlabel}>Password</Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => setPassword(text)}
                value={password} 
                placeholder='Please input your Password'
                textContentType='password'
                secureTextEntry={true}
            />
            <JereButton color="green" title='Submit' onPress={handleSubmit} style={styles.formbutton}/>
        </View>
    );
};

const styles = StyleSheet.create({
    formview:{
        flex:1,
        padding:10
        // justifyContent:'center',
        // alignItems:'center'
    },
    input:{
        // border: 1px solid gray;
        // font-size: 18px;
        // padding: 8px;
        // margin-bottom: 24px;
        borderWidth:1,
        borderColor:'gray',
        borderRadius:5,
        marginBottom:20,
        height:40,
        width:'100%',
        padding:8,
        // textAlign:'center'
    },
    formlabel:{
        fontSize: 18,
        fontWeight:'bold'
    },
    formbutton:{
        width:'100%',
        height:40
    }
});


export default UserForm;
