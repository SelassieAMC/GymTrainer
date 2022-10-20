import React, { useState } from "react";
import { Dropdown } from 'react-native-element-dropdown';
import { StyleSheet } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

export default function CustomDropdown(props)
{
    const [value, setValue] = useState(props.defaultValue);

    const handleOnChange = (value) => {
        setValue(value);
        props.onSelectedValue(value, setValue);
    }

    return (
        <Dropdown
            style={[styles.dropdown, props.dropdownStyle]}
            placeholderStyle={[styles.placeholderStyle, props.placeholderStyle]}
            selectedTextStyle={[styles.selectedTextStyle, props.selectedTextStyle]}
            iconStyle={styles.arrowIconStyle}
            itemTextStyle={styles.itemStyle}
            data={props.data}
            labelField="label"
            valueField="value"
            searchPlaceholder="Search..."
            value={value}
            onChange={item => {
                handleOnChange(item.value);
            }}
            renderLeftIcon={() => (
                props.iconName &&
                <FontAwesome
                    style={styles.icon}
                    name={props.iconName}
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
        fontSize: 16
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