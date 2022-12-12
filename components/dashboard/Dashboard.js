import React from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity, Image, Text, SafeAreaView} from "react-native"
import { Card } from "react-native-elements";
import CustomCardBackground from '../common/CustomCardBackground';
import streakImage from '../../images/dashboard/streak-days.jpg';
import mostWorkedBackground from '../../images/dashboard/mostWorked.jpg';
import lessWorkedBackground from '../../images/dashboard/lessWorked.jpg';
import trainingPlanImage from '../../images/dashboard/training-plan.jpg';
import improveDietImage from '../../images/dashboard/improve-diet.jpeg';
import bestTrainingImage from '../../images/dashboard/best-training.jpg';
import { Divider } from 'react-native-elements/dist/divider/Divider';
import darkStyles from '../common/DarkStyles';

export default function Dashboard( { navigation })
{
    return (
        <SafeAreaView style={darkStyles.backgroundDark}>
        <ScrollView>
            <CustomCardBackground
                style={styles.streakCardRecord}
                backgroundImage={streakImage} 
                icon1='fire' 
                icon2='clock' 
                title='Your record' 
                gradientColors={['rgba(0,0,0,0.9)', 'rgba(19, 20, 41, 0.5)', 'rgba(19, 20, 41, 0)']}
                gradientLocations={[0, 0.9, 1]}/>
            <View style={styles.recordContainer}>
                <CustomCardBackground 
                    style={styles.mostWorkedCard}
                    titleStyle={styles.recordTitle}
                    backgroundImage={mostWorkedBackground} 
                    title='Most worked area' 
                    gradientColors={['rgba(22,154,19,0.4)', 'rgba(19, 20, 41, 0.5)', 'rgba(19, 20, 41, 0)']}
                    gradientLocations={[0, 0.9, 1]}/>
                <CustomCardBackground 
                    style={styles.lessWorkedCard}
                    titleStyle={styles.recordTitle}
                    backgroundImage={lessWorkedBackground} 
                    title='Less worked area' 
                    gradientColors={['rgba(253,177,14,0.4)', 'rgba(19, 20, 41, 0.5)', 'rgba(19, 20, 41, 0.8)']}
                    gradientLocations={[0, 0.9, 1]}/> 
            </View>
            <View>
                <Card containerStyle={styles.newsCardRecord}>
                    <Card.Title h3 style={styles.cardTitle}>Tips and news</Card.Title>
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
                    <Divider color='#40d876'/>
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
                    <Divider color='#40d876'/>
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
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    streakCardRecord: {
        marginLeft: 15,
        marginRight: 15
    },
    recordTitle: {
        justifyContent: 'center',
        fontSize: 16,
        alignContent: 'flex-end',
        marginLeft: 10,
        flexShrink: 1
    },
    recordContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        marginLeft: 15,
        marginRight: 15
    },
    mostWorkedCard: {
        width: '45%'
    },
    lessWorkedCard: {
        width: '45%'
    },
    cardTitle: {
        textAlign: 'left',
        color: '#FFFFFF'
    },
    newsCardRecord: {
        backgroundColor: '#242538',
        color: 'white',
        borderRadius: 10,
        borderWidth: 0 
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
