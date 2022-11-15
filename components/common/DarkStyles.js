import React from 'react';
import { StyleSheet } from 'react-native';

const darkStyles = StyleSheet.create({
    textWhite:{
        color: '#fff'
    },
    backgroundDark: {
        backgroundColor: '#131429',
        height: '100%'
    },
    darkTabStyle: {
        backgroundColor: '#242538',
        borderTopWidth: 0
    },
    containerComponent: {
        paddingTop: 80
    },
    bigTitle: {
        color: "#FDB10E",
        fontSize: 28,
        paddingLeft: 20,
        alignSelf: 'center',
        marginBottom: 30
    },
    button: {
        borderColor: '#40d876'
    }
});

module.exports = darkStyles;