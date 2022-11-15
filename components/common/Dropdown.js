import React, { useState } from "react";
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';
import {StyleSheet, View} from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

export default function CustomDropdown(props)
{
    const [value, setValue] = useState(props.defaultValue ?? []);

    const handleOnChange = (value) => {
        setValue(value);
        props.onSelectedValue(value, setValue);
    }
    
    return (
        <View>
            { props.isMultiSelect ?
                <MultiSelect
                    style={[styles.dropdown, props.dropdownStyle]}
                    placeholderStyle={[styles.placeholderStyle, props.placeholderStyle]}
                    selectedTextStyle={[styles.selectedTextStyle, props.selectedTextStyle]}
                    iconStyle={styles.arrowIconStyle}
                    containerStyle={[styles.containerItemsStyle, props.containerItemsStyle]}
                    itemTextStyle={styles.itemStyle}
                    selectedStyle={props.selectedStyle}
                    data={props.data}
                    labelField={props.label ?? 'label'}
                    valueField={props.value ?? 'value'}
                    searchPlaceholder="Search..."
                    value={value}
                    onChange={item => {
                        handleOnChange(item);
                    }}
                    renderLeftIcon={() => (
                        props.iconName &&
                        <FontAwesome
                            style={styles.icon}
                            name={props.iconName}
                            size={20}
                        />
                    )}
                /> :
                <Dropdown
                    style={[styles.dropdown, props.dropdownStyle]}
                    placeholderStyle={[styles.placeholderStyle, props.placeholderStyle]}
                    selectedTextStyle={[styles.selectedTextStyle, props.selectedTextStyle]}
                    iconStyle={styles.arrowIconStyle}
                    itemTextStyle={styles.itemStyle}
                    containerStyle={[styles.containerItemsStyle, props.containerItemsStyle]}
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
            }
        </View>
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
        fontSize: 16,
        color: '#FFF'
    },
    selectedTextStyle: {
        fontSize: 14
    },
    arrowIconStyle: {
        width: 20,
        height: 20
    },
    itemStyle: {
        fontSize: 16,
        color: '#8c8c8c'
    },
    containerItemsStyle: {
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: '#232441'
    }
});