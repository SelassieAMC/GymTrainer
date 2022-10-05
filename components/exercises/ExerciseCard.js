import React, { useState } from "react";
import { Card } from "react-native-elements";
import { Divider } from "react-native-elements/dist/divider/Divider";
import { StyleSheet, View, Text } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { Title } from "react-native-paper";

export default function ExerciseCard(props)
{
    const [isFavorite, setFavorite] = useState(false);
    const [item, setItem] = useState(props.item);

    return (
        <Card containerStyle={styles.cardContainer}>
            <Card.Title h4 style={{alignSelf: 'center' }}>
                <View style={styles.cardTitle}>
                    <View style={{marginRight: 10}}>
                        <FontAwesome name="star" color={'orange'} size={25} solid={isFavorite} onPress={()=> setFavorite(!isFavorite)}/>
                    </View>
                    <Title>{item.name}</Title>
                </View>                    
            </Card.Title>
            <Card.Image
                style={styles.image}
                source={{
                    uri: item.image
                }}
            />
            <View
                style={{borderStyle: 'solid', borderWidth: 1, borderTopWidth: 0, borderBottomLeftRadius: 5, borderBottomRightRadius: 5,borderColor: '#9B9A99', borderTopColor: 'none', padding: 5, marginTop: 10}}>
                <View style={{flexDirection: "row", alignItems: "baseline", marginTop: 10}}>
                    <FontAwesome name="tags" color={'green'} style={styles.muscleItemIcon} size={14} solid/>
                    <Text style={{fontSize: 16}}>Set of muscles</Text>
                </View>
                <Divider/>
                <View style={styles.musclesContainer}>
                    {item.muscles.map((muscle, index) => {
                        return (
                        <View style={styles.muscleContainer} key={index}>
                            <FontAwesome name="check-circle" color={'green'} style={styles.muscleItemIcon} size={15} solid/>
                            <Text>{muscle}</Text>
                        </View>)
                    })}
                </View>
            </View>

            <View
                style={{borderStyle: 'solid', borderWidth: 1, borderTopWidth: 0, borderBottomLeftRadius: 5, borderBottomRightRadius: 5, borderColor: '#9B9A99', borderTopColor: 'none', padding: 5, marginTop: 10}}>
                <View style={{flexDirection: "row", alignItems: "baseline", marginTop: 10}}>
                    <FontAwesome name="tasks" color={'green'} style={styles.muscleItemIcon} size={18} solid/>
                    <Text style={{fontSize: 16}}>Actions</Text>
                    </View>
                <Divider/>
                {props.actions()}
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        borderRadius: 10
    },
    image: {
        borderRadius: 10,
        resizeMode: 'stretch'
    },
    musclesContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
        paddingLeft: 5,
        paddingRight: 5
    },
    muscleContainer: {
        flexDirection: "row",
        alignItems: "baseline"
    },
    muscleItemIcon: {
        marginRight: 5,
        marginBottom: 5
    }, 
    cardTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
});