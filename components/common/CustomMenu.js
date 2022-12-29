import React from 'react';
import { View, StyleSheet, Text } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import { Menu, MenuOption, MenuOptions, MenuTrigger } from "react-native-popup-menu";

export default function CustomMenu(props)
{
    return (
        <View style={styles.container}>
            <Menu>
                <MenuTrigger>
                    <FontAwesome
                        name="ellipsis-v"
                        solid
                        size={25}
                        color='#40d876'
                    />
                </MenuTrigger>
                <MenuOptions optionsContainerStyle={[styles.menuOptions, props.menuOptionsStyle]}>
                    {props.options.map((item, index) => {
                        return <MenuOption key={index} onSelect={() => item.actionHandler()} text={item.title} customStyles={{optionText:[styles.optionText, props.textOptionsStyle]}}/>
                    })}
                </MenuOptions>
            </Menu>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {alignItems: 'center', alignSelf: 'center', marginLeft: 5},
    menuOptions: {width: 120, backgroundColor: '#242538', borderBottomLeftRadius: 15, padding: 5},
    optionText: {color: '#40d876', fontSize: 18}
});