import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native"
import { Card, Text, Button } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import fireImage from '../../images/dashboard/fire.png';
import chestImage from '../../images/dashboard/chest.png';
import legImage from '../../images/dashboard/leg.png';
import trainingPlanImage from '../../images/dashboard/training-plan.jpg';
import improveDietImage from '../../images/dashboard/improve-diet.jpeg';
import bestTrainingImage from '../../images/dashboard/best-training.jpg';
import { Divider } from 'react-native-elements/dist/divider/Divider';

export default function Dashboard( { navigation })
{
    return (
        <ScrollView>
            <View>
                <Card containerStyle={styles.streakCardRecord}>
                    <Card.Title h4 style={styles.cardTitle}>Daily record</Card.Title>
                    <View style={{flexDirection:'row'}}>
                        <Image
                            style={styles.streakImage}
                            source={{
                                uri: Image.resolveAssetSource(fireImage).uri
                            }}
                        />
                        <View style={styles.mainCardTextData}>
                            <Text style={styles.mainCardText}>
                                X streak days
                            </Text>
                        </View>
                    </View>
                </Card>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Card containerStyle={styles.mostWorkedCardRecord}>
                    <Card.Title h5 style={styles.cardTitle}>Most worked area</Card.Title>
                    <View style={{flexDirection:'row'}}>
                        <Image
                            style={styles.mostWorkedImage}
                            source={{
                                uri: Image.resolveAssetSource(chestImage).uri
                            }}
                        />
                        <View style={styles.cardTextData}>
                            <Text style={styles.cardText}>
                                Upper train
                            </Text>
                            <Text style={styles.cardText}>
                                70 %
                            </Text>
                        </View>
                    </View>
                </Card>
                <Card containerStyle={styles.lessWorkedCardRecord}>
                    <Card.Title h5 style={styles.cardTitle}>Less worked area</Card.Title>
                    <View style={{flexDirection:'row'}}>
                        <Image
                            style={styles.mostWorkedImage}
                            source={{
                                uri: Image.resolveAssetSource(legImage).uri
                            }}
                        />
                        <View style={styles.cardTextData}>
                            <Text style={styles.cardText}>
                                Legs
                            </Text>
                            <Text style={styles.cardText}>
                                50 %
                            </Text>
                        </View>
                    </View>
                </Card>
            </View>
            <View>
                <Card containerStyle={styles.newsCardRecord}>
                    <Card.Title h3 style={styles.cardTitle}>Tips and news</Card.Title>
                    <TouchableOpacity onPress={() => navigation.navigate('ScheduleRoutine')}>
                        <View style={styles.subTipCard}>
                            <Image
                                style={styles.newsImage}
                                source={{
                                    uri: Image.resolveAssetSource(trainingPlanImage).uri
                                }}
                            />
                            <Text style={styles.newsText}>
                                Check your training plan for the next days.
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <Divider/>
                    <View style={styles.subTipCard}>
                        <Image
                            style={styles.newsImage}
                            source={{
                                uri: Image.resolveAssetSource(improveDietImage).uri
                            }}
                        />
                        <Text style={styles.newsText}>
                            A good shape comes with a good diet, healthy food could help you to pottencialize your training gaining more energy with less fat.
                        </Text>
                    </View>
                    <Divider/>
                    <View style={styles.subTipCard}>
                        <Image
                            style={styles.newsImage}
                            source={{
                                uri: Image.resolveAssetSource(bestTrainingImage).uri
                            }}
                        />
                        <Text style={styles.newsText}>
                            How to train that specific place of your body correctly and efficiently with our experts.
                        </Text>
                    </View>
                </Card>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    streakCardRecord: {
        backgroundColor: '#00A0FE',
        borderRadius: 10
    },
    streakImage: {
        width: 80,
        height:140
    },    
    mainCardTextData: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'flex-end'
    },
    mainCardText: {
        color: 'black',
        fontSize: 40,
        textAlign: 'right'
    },
    cardTextData: {
        justifyContent: 'center',
        alignContent: 'flex-end',
        marginLeft: 10,
        flexShrink: 1
    },
    mostWorkedCardRecord: {
        flex: 1,
        backgroundColor: '#FDB10E',
        borderRadius: 10
    },
    mostWorkedImage: {
        width: 60,
        height:120    
    },
    lessWorkedCardRecord: {
        flex: 1,
        backgroundColor: '#169A13',
        borderRadius: 10
    },
    lessWorkedImage: {
        width: 60,
        height:120    
    },
    cardTitle: {
        textAlign: 'left',
        color: '#F61732'
    },
    cardText: {
        color: 'black',
        fontSize: 20,
        textAlign: 'center',
        flexShrink: 1
    },
    newsCardRecord: {
        backgroundColor: '#19204E',
        color: 'white',
        borderRadius: 10
    },
    newsImage: {
        width: '80%',
        height: 220,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    newsText: {
        color: 'white',
        fontSize: 20,
        alignSelf: 'center',
        textAlign: 'center',
        borderRadius: 20
    },
    subTipCard: {
        margin: 10
    }
});
//Palette
// #00A0FE
// #F61732
// #FDB10E
// #169A13
