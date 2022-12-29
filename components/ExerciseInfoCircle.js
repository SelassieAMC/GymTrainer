import React from 'react';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {Text} from "react-native-elements";
import {StyleSheet, View} from "react-native";

export default function ExerciseInfoCircle(props) {
    return (
        <View style={styles.container}>
            <FontAwesome5 name={props.icon} color='#40d876' size={30}/>
            <Text style={styles.descText}>{props.desc}</Text>
            <Text style={styles.valueText}>{props.value}</Text>
        </View>
    )
}

const styles = StyleSheet.create(
    {
        container: {
            width: 85,
            height: 85,
            backgroundColor:'#a33115',
            borderRadius: 50,
            alignItems: 'center',
            justifyContent: 'space-between',
            borderColor: '#40d876',
            borderWidth: 1,
            padding: 5,
            borderTopWidth: 1
        },
        descText: {
            color: '#FFF',
            fontSize: 12,
            fontWeight: 'bold'
        },
        valueText: {
            color: '#40d876',
            fontSize: 26,
            fontWeight: 'bold'
        }
    }
)