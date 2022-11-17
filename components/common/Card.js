import React from "react";
import {ImageBackground, View, StyleSheet, Text} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {Title} from "react-native-paper";

export default function CustomCardBackground(props){
    return (
        <View style={styles.container}>
            <ImageBackground source={props.backgroundImage} style={styles.backgroundImage}>
                <LinearGradient
                    colors={['rgba(0,0,0,0.9)', 'rgba(19, 20, 41, 0.5)', 'rgba(19, 20, 41, 0)']}
                    style={{height : '100%', width : '100%'}}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 1 }}
                    locations={[0, 0.9, 1]}>
                    <View style={styles.cover}>
                        <Title style={styles.title}>{props.title}</Title>
                    </View>
                    <View style={styles.content}>
                        <View style={styles.indicatorContainer}>
                            <FontAwesome
                                name='fire-alt'
                                light
                                size={24}
                                style={{marginRight:10}}
                                color='green'
                            />
                            <Text style={styles.text}>1500 Kcal</Text>
                        </View>
                        <View style={styles.indicatorContainer}>
                            <FontAwesome
                                name='clock'
                                light
                                size={24}
                                style={{marginRight:10}}
                                color='green'
                            />
                            <Text style={styles.text}>47 min.</Text>
                        </View>
                    </View>
                </LinearGradient>
            </ImageBackground>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        height:200,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 15
    },
    cover: {
        width: '100%',
        height: '50%'
    },
    content: {
        paddingLeft: 20,
        flexDirection: "row",
        height: '50%',
        justifyContent: "flex-start"
    },
    title: {
        color: '#FFF',
        fontSize: 28,
        fontWeight: "bold",
        width: 170,
        marginTop: 20,
        marginLeft: 20
    },
    text: {
        color: '#FFF'
    },
    indicatorContainer: {
        flexDirection: 'row',
        alignItems: "center",
        margin: 5
    },
    backgroundImage: {
        borderRadius: 20,
        overflow: 'hidden'
    }
});