import {Modal, StyleSheet, View} from "react-native";
import React from "react";
import {Title} from "react-native-paper";

export default function CustomModal(props)
{
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.visibilityState[0]}
            presentationStyle="overFullScreen"
            onRequestClose={() => props.visibilityState[1](!props.isVisible)}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Title>{props.title}</Title>
                    {props.children}
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
})