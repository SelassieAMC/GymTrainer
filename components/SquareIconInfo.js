import {StyleSheet, View} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import {Text} from "react-native-elements";
import React from "react";


export default function SquareIconInfo(props)
{
    return (
        <View style={[styles.cardContainer, props.style]}>
            <View style={styles.statIconContainer}>
                <FontAwesome
                    name={props.iconName}
                    solid
                    size={props.iconSize}
                    color='#E68D33'
                />
            </View>
            <Text style={[styles.valueStat, props.valueStyle]}>{props.value}</Text>
            <Text style={[styles.descStat, props.descStyle]}>{props.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        borderRadius: 10,
        backgroundColor: '#242538',
        height: 100,
        width: 100,
        justifyContent: "center",
        alignItems: "center",
    },
    statIconContainer: {
        backgroundColor: '#131429',
        height: 40,
        width: 40,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 5
    },
    valueStat: {
        color: '#40d876',
        fontWeight: "bold",
        fontSize: 24
    },
    descStat: {
        color: '#9b9b9b',
        fontSize: 18
    }
})