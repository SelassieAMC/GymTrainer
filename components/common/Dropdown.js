import React, { useState } from "react";
import { Dropdown } from 'react-native-element-dropdown';
import { StyleSheet } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

export default function CustomDropdown(props)
{
    const [value, setValue] = useState(null);

    return (
        <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.arrowIconStyle}
            itemTextStyle={styles.itemStyle}
            data={props.data}
            labelField="label"
            valueField="value"
            searchPlaceholder="Search..."
            value={value}
            onChange={item => {
            setValue(item.value);
            }}
            renderLeftIcon={() => (
                <FontAwesome
                    style={styles.icon}
                    name="calendar-times"
                    size={20}
                />
            )}
        />
    );
}

const styles = StyleSheet.create({
    dropdown: {
        height: 50,
        width: 200,
        borderColor: '#2089Dc',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8
    },
    icon: {
        marginRight: 10,
        color: '#FDB10E'
    },
    placeholderStyle: {
        fontSize: 15
    },
    selectedTextStyle: {
        fontSize: 14
    },
    arrowIconStyle: {
        width: 20,
        height: 20,
    },
    itemStyle: {
        fontSize: 16
    }
});