import React, {useState} from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import JereButton from './JereButton';
import { useNavigation } from '@react-navigation/native';

const UserForm = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username,setUsername] = useState('');

    const navigation = useNavigation();

    const handleSubmit = e => {
        e.preventDefault();

        props.action({
            variables:{
                email,
                password,
                username
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
            {
                props.formType==="SignUp" && (
                    <>
                        <Text style={styles.formlabel}>Username</Text>
                        <TextInput
                            style={styles.input} 
                            onChangeText={(text) => setUsername(text)}
                            value={username}
                            placeholder='Please input your Username'
                            textContentType='username'
                            autoCapitalize='none'
                        />
                    </>
                )
            }
            <Text style={styles.formlabel}>Password</Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => setPassword(text)}
                value={password} 
                placeholder='Please input your Password'
                textContentType='password'
                secureTextEntry={true}
            />
            <JereButton color='green' title='Submit' onPress={handleSubmit} style={styles.formbutton}/>
            {
                props.formType!=="SignUp" && (
                    <Pressable onPress={()=> navigation.navigate('signUp')} style={styles.linkview}>
                        <Text>Need an account? 
                            <Text style={styles.linktext}>Sign up</Text>
                        </Text>                        
                    </Pressable>
                )
            }
        </View>
    );
};

const styles = StyleSheet.create({
    formview:{
        flex:1,
        padding:10
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
    },
    formlabel:{
        fontSize: 18,
        fontWeight:'bold'
    },
    formbutton:{
        width:'100%',
        height:40
    },
    linkview:{
        margin:10
    },
    linktext:{
        color: '#0077cc',
        fontWeight:'bold'
    }
});


export default UserForm;
