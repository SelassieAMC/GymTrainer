import React, { useState } from "react";
import { StyleSheet, View, FlatList, Image, Text } from "react-native";
import { Card } from "react-native-elements";
import { Title } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

export default function Exercises(props)
{

    const DATA = [
        {
            id: 1,
            name : 'Prensa una pierna',
            image : 'https://www.cambiatufisico.com/wp-content/uploads/Prensa-Inclinada-a-una-pierna.jpg',
            muscles : ['Cuadricep', 'femoral', 'gluteo']
        },
        {
            id:2,
            name : 'Prensa una pierna',
            image : 'https://www.cambiatufisico.com/wp-content/uploads/Prensa-Inclinada-a-una-pierna.jpg',
            muscles : ['Cuadricep', 'femoral', 'gluteo']
        },
        {
            id:3,
            name : 'Prensa una pierna',
            image : 'https://www.cambiatufisico.com/wp-content/uploads/Prensa-Inclinada-a-una-pierna.jpg',
            muscles : ['Cuadricep', 'femoral', 'gluteo']
        },
        {
            id:4,
            name : 'Prensa una pierna',
            image : 'https://www.cambiatufisico.com/wp-content/uploads/Prensa-Inclinada-a-una-pierna.jpg',
            muscles : ['Cuadricep', 'femoral', 'gluteo']
        },
        {
            id:5,
            name : 'Prensa una pierna',
            image : 'https://www.cambiatufisico.com/wp-content/uploads/Prensa-Inclinada-a-una-pierna.jpg',
            muscles : ['Cuadricep', 'femoral', 'gluteo']
        }
    ];

    const renderItem = ({item}) => (
        <View>
            <Card containerStyle={styles.cardContainer}>
                <Card.Title h4 style={styles.cardTitle}>{item.name}</Card.Title>
                <Card.Image
                    style={styles.image}
                    source={{
                        uri: item.image
                    }}
                />
                <View style={{flexDirection: "row", alignItems: "baseline", marginTop: 10}}>
                    <FontAwesome name="walking" color={'black'} style={styles.muscleItemIcon} size={20} solid/>
                    <Text style={{fontSize: 16}}>Muscles to work</Text>
                </View>
                <View style={styles.musclesContainer}>
                    {item.muscles.map((muscle) => {
                        return (
                        <View style={styles.muscleContainer}>
                            <FontAwesome name="check-circle" color={'green'} style={styles.muscleItemIcon} size={15} solid/>
                            <Text>{muscle}</Text>
                        </View>)
                    })}
                </View>
            </Card>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Title>List of exercises</Title>
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        borderRadius: 10
    },
    image: {
        borderRadius: 10
    },
    musclesContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10
    },
    muscleContainer: {
        flexDirection: "row",
        alignItems: "baseline"
    },
    muscleItemIcon: {
        marginRight: 5,
        marginBottom: 5
    }
  });