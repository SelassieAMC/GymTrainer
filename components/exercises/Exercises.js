import React, { useState } from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import { Button, Card } from "react-native-elements";
import { Divider } from "react-native-elements/dist/divider/Divider";
import { Title } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

export default function Exercises(props)
{
    const [isFavorite, setFavorite] = useState(false);
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
                <View style={{borderStyle: 'solid', borderWidth: 1, borderTopWidth: 0, borderBottomLeftRadius: 5, borderBottomRightRadius: 5,borderColor: '#9B9A99', borderTopColor: 'none', padding: 5, marginTop: 10}}>
                    <View style={{flexDirection: "row", alignItems: "baseline", marginTop: 10}}>
                        <FontAwesome name="tags" color={'green'} style={styles.muscleItemIcon} size={14} solid/>
                        <Text style={{fontSize: 16}}>Set of muscles</Text>
                    </View>
                    <Divider/>
                    <View style={styles.musclesContainer}>
                        {item.muscles.map((muscle) => {
                            return (
                            <View style={styles.muscleContainer}>
                                <FontAwesome name="check-circle" color={'green'} style={styles.muscleItemIcon} size={15} solid/>
                                <Text>{muscle}</Text>
                            </View>)
                        })}
                    </View>
                </View>

                <View style={{borderStyle: 'solid', borderWidth: 1, borderTopWidth: 0, borderBottomLeftRadius: 5, borderBottomRightRadius: 5, borderColor: '#9B9A99', borderTopColor: 'none', padding: 5, marginTop: 10}}>
                    <View style={{flexDirection: "row", alignItems: "baseline", marginTop: 10}}>
                        <FontAwesome name="tasks" color={'green'} style={styles.muscleItemIcon} size={18} solid/>
                        <Text style={{fontSize: 16}}>Actions</Text>
                        </View>
                    <Divider/>
                    <View style={{width: 200, alignSelf: 'center', height: 90, justifyContent: 'space-between', marginTop: 5, paddingBottom: 5}}>
                        <Button 
                            icon={
                                <FontAwesome
                                    name="plus-circle"
                                    solid
                                    size={19}
                                    style={{marginRight:5}}
                                    color='#FDB10E'
                                />
                            }
                            title='Add to your routine'
                            type="outline" 
                            buttonStyle={{borderRadius: 10}}
                        />
                        <Button
                            icon={
                                <FontAwesome
                                    name="search"
                                    solid
                                    size={19}
                                    style={{marginRight:5}}
                                    color='#FDB10E'
                                />
                            }
                            title='Find similars'
                            type="outline" 
                            buttonStyle={{borderRadius: 10}}
                        />
                    </View>                    
                </View>
            </Card>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Title style={styles.catalogTitle}>Exercises Catalog</Title>
            <Text>Filters</Text>
            <View flexDirection='row' justifyContent='space-around' marginBottom='10'>
                <Text>Body part</Text>
                <Text>Muscle</Text>
                <Text>Type</Text>
                <Text>Not done</Text>
            </View>
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
    catalogTitle: {
        color: "#FDB10E",
        fontSize: 28,
        paddingLeft: 20,
        alignSelf: 'center'
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