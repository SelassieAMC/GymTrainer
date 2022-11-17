import React from "react";
import {ImageBackground, View, StyleSheet, Text} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {Title} from "react-native-paper";

export default function CustomCardBackground(props){
    return (
        <View style={[styles.container, props.style]}>
            <ImageBackground source={props.backgroundImage ? props.backgroundImage : {uri: props.uriImage}} style={styles.backgroundImage}>
                {props.gradientColors ? 
                    <LinearGradient
                        colors={props.gradientColors}
                        style={{height : '100%', width : '100%'}}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 1 }}
                        locations={props.gradientLocations}>
                        <View style={[styles.cover, props.coverStyle]}>
                            <Title style={[styles.title, props.titleStyle]}>{props.title}</Title>
                        </View>
                        <View style={styles.content}>
                            {
                                props.icon1 &&
                                <View style={styles.indicatorContainer}>
                                    <FontAwesome
                                        name={props.icon1}
                                        light
                                        size={24}
                                        style={{marginRight:10}}
                                        color='green'
                                    />
                                    <Text style={styles.text}>1500 Kcal</Text>
                                </View>
                            }
                            {
                                props.icon2 &&
                                <View style={styles.indicatorContainer}>
                                    <FontAwesome
                                        name={props.icon2}
                                        light
                                        size={24}
                                        style={{marginRight:10}}
                                        color='green'
                                    />
                                    <Text style={styles.text}>47 min.</Text>
                                </View>
                            }
                        </View>
                    </LinearGradient> :
                    <>
                        <View style={[styles.cover, props.coverStyle]}>
                            <View style={props.titleContainerStyle}>
                                <Title style={[styles.title, props.titleStyle]}>{props.title}</Title>
                            </View>
                        </View>
                        <View style={styles.content}>
                            {
                                props.icon1 &&
                                <View style={styles.indicatorContainer}>
                                    <FontAwesome
                                        name={props.icon1}
                                        light
                                        size={24}
                                        style={{marginRight:10}}
                                        color='green'
                                    />
                                    <Text style={styles.text}>1500 Kcal</Text>
                                </View>
                            }
                            {
                                props.icon2 &&
                                <View style={styles.indicatorContainer}>
                                    <FontAwesome
                                        name={props.icon2}
                                        light
                                        size={24}
                                        style={{marginRight:10}}
                                        color='green'
                                    />
                                    <Text style={styles.text}>47 min.</Text>
                                </View>
                            }
                        </View>
                    </>
                }
            </ImageBackground>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        height: 200,
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