import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import darkStyles from "../components/common/DarkStyles";
import backgroundImage from "../images/login.jpg";
import LinearGradient from "react-native-linear-gradient";
import { Button } from "react-native-elements";
import { Title } from "react-native-paper";

export default function Login({ navigation }){
    return(
        <View style={darkStyles.backgroundDark}>
            <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
                <LinearGradient
                    colors={['rgba(19, 20, 41, 0.9)', 'rgba(19, 20, 41, 0.9)', 'rgba(19, 20, 41, 0.9)']}
                    style={{height : '100%', width : '100%'}}>
                    <View style={styles.titleContainer}>
                        <Title style={styles.title}>HARD</Title><Title style={styles.title2}>ELEMENT</Title>
                    </View>
                    <View style={styles.welcomeTitleContainer}>
                        <Title style={styles.welcomeTitle}>
                            Welcome
                        </Title>
                        <Text style={{color: '#FFF'}}>
                            Train and live the new experiece of exercising with control.
                        </Text>
                    </View>
                    <View style={styles.buttonsContainer}>
                        <Button 
                            buttonStyle={[styles.generalButtonStyle, styles.loginButton]} 
                            titleStyle={styles.textButton} 
                            title="Login"
                            onPress={() => navigation.navigate('UserTabs')}/>
                        <Button 
                            type="outline" 
                            buttonStyle={[styles.generalButtonStyle, styles.signUpButton]} 
                            titleStyle={styles.textButton} 
                            title="Sign Up"/>
                    </View>
                </LinearGradient>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    backgroundImage: {
        minHeight: '90%'
    },
    titleContainer: {
        marginTop: '30%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: 230,
        alignSelf: "center"
    },
    title: {
        fontSize: 30,
        color: '#FFF'
    },
    title2: {
        fontSize: 30,
        color: '#40d876'
    },
    welcomeTitle: {
        fontSize: 50,
        color: '#FFF',
        fontWeight: '800',
        lineHeight: 50
    },
    welcomeTitleContainer: {
        marginLeft: 30,
        marginTop: '50%'
    },
    buttonsContainer: {
        width: '80%',
        alignSelf: "center",
        justifyContent: "space-between",
        height: 120,
        marginTop: '40%'
    },
    generalButtonStyle: {
        borderRadius: 40,
        height: 50
    },
    loginButton: {
        backgroundColor: '#40d876'
    },
    signUpButton: {
        borderColor: '#FFF',
        borderWidth: 1.5
    },
    textButton: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 20
    }
});