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
                <View style={styles.cardTitleContainer}>
                    <View style={{marginRight: 10}}>
                        <FontAwesome name="star" color={'#E68D33'} size={25} solid={isFavorite} onPress={()=> setFavorite(!isFavorite)}/>
                    </View>
                    <Title style={styles.cardTitles}>{item.name}</Title>
                </View>                    
            </Card.Title>
            <Card.Image
                style={styles.image}
                source={{
                    uri: item.presentationImage
                }}
            />
            <View style={styles.sectionsContainer}>
                <View style={styles.muscleTitleContainer}>
                    <FontAwesome name="tags" color={'#FDB10E'} style={styles.muscleItemIcon} size={14} solid/>
                    <Text style={[styles.cardTitles, {fontSize: 16}]}>Set of muscles</Text>
                </View>
                <Divider/>
                <View style={styles.musclesContainer}>
                    {item.musclesWorked?.map(muscle => {
                        return (
                        <View style={styles.muscleContainer} key={muscle.id}>
                            <FontAwesome name="check-circle" color={'green'} style={styles.muscleItemIcon} size={15} solid/>
                            <Text style={styles.cardText}>{muscle.name}</Text>
                        </View>)
                    })}
                </View>
            </View>

            <View style={styles.sectionsContainer}>
                <View style={[styles.muscleContainer,{marginTop: 10}]}>
                    <FontAwesome name="tasks" color={'#FDB10E'} style={styles.muscleItemIcon} size={18} solid/>
                    <Text style={[styles.cardTitles, {fontSize: 16}]}>Actions</Text>
                    </View>
                <Divider/>
                {props.actions(item)}
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        borderRadius: 10,
        backgroundColor: '#242538',
        borderWidth: 0
    },
    image: {
        width: null,
        resizeMode: 'contain',
        height: 220
    },
    sectionsContainer: {
        borderStyle: 'solid', 
        borderWidth: 1, 
        borderTopWidth: 0, 
        borderBottomLeftRadius: 5, 
        borderBottomRightRadius: 5,
        borderColor: '#9B9A99',
        borderTopColor: 'none',
        padding: 5,
        marginTop: 10
    },
    muscleTitleContainer: {
        flexDirection: "row", 
        alignItems: "baseline", 
        marginTop: 10
    },
    musclesContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
        paddingLeft: 15,
        paddingRight: 15,
        flexWrap: 'wrap'
    },
    muscleContainer: {
        flexDirection: "row",
        alignItems: "baseline"
    },
    muscleItemIcon: {
        marginRight: 5,
        marginBottom: 5
    }, 
    cardTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardText: {
        color: '#FFF'
    },
    cardTitles: {
        color: '#40d876'
    }
});