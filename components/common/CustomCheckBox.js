import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Checkbox} from "react-native-paper";


export default function CustomCheckBox({onPress, label, status}, props)
{
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.container, props.containerStyle]}>
                <View style={{borderWidth: 1, borderColor: '#40d876' }}>
                    <Checkbox status={status ? 'checked': 'unchecked'}/>
                </View>
                <Text style={[styles.label, props.labelStyle]}>{label}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
        justifyContent: "space-between",
        width: 140
    },
   label: {
       color: '#FFF',
       fontSize: 18
   } 
});
