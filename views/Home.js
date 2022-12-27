import React, { useState, useEffect } from "react";
import {Image, ImageBackground, ScrollView, StyleSheet, Text, View} from "react-native";
import {Title} from "react-native-paper";
import darkStyles from "../components/common/DarkStyles";
import userPhoto from "../images/user.jpg";
import backgroundImage from "../images/dashboard/today-background.jpeg";
import LinearGradient from "react-native-linear-gradient";
import { Button } from "react-native-elements";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import {GetCurrentDayNumberAndName} from "../components/common/helpers/Utils";
import Routines from "../components/common/helpers/Routines";
import {BackgroundImage} from "react-native-elements/dist/config";

export default function Home({ navigation }, props)
{
    const [dayNumber, dayName] = GetCurrentDayNumberAndName();
    const day = props.dayNumber ? props.dayNumber-1 : dayNumber;
    const [exercises, setExercises] = useState(Routines.getRoutines().exercises.filter(x => x.day === day));
    const [routines, setRoutines] = useState([]);
    
    const getRoutineLevel = (levelNumber) => {
        switch (levelNumber)
        {
            case 0: return 'Beginner';
            case 1: return 'Intermediate';
            case 2: return 'Hard';
            case 3: return 'Expert';
            default: return 'Unbelievable'
        }
    }
    
    const fetchData = () => {
        return fetch("https://a6bb-191-109-174-5.ngrok.io/api/v1/routine/get-all?includeExercises=false",
            {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => setRoutines(data))
            .catch(error => console.log(error));
    };

    useEffect(() => {
        fetchData();
    }, []);

    return(
        <View style={[styles.container, darkStyles.backgroundDark]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <ImageBackground source={backgroundImage} style={styles.backgroundImage} resizeMode='cover'>
                    <LinearGradient
                        colors={['rgba(19, 20, 41, 0.5)', 'rgba(19, 20, 41, 0.7)', 'rgba(19, 20, 41, 1)']}
                        style={{height : '100%', width : '100%'}}>
                        <View style={styles.titleUserContainer}>
                            <View style={styles.salutationUser}>
                                <Text style={styles.userSalutation}>Hey,</Text>
                                <Text style={styles.userName}>Andres</Text>
                            </View>
                            <Image source={userPhoto} style={styles.userImage}/>
                        </View>
                        <Button 
                            type="solid"
                            buttonStyle={styles.playButton}
                            icon={
                                <FontAwesome
                                    name="play"
                                    solid
                                    size={20}
                                    style={styles.playIconButton}
                                    color='#FFF'
                                />
                            }
                        onPress={() => navigation.navigate('Today')}/>
                        
                        <Title style={styles.sectionTitle}>Weekly Stats</Title>
                        <View style={styles.startCardsContainer}>
                            <View style={styles.cardContainer}>
                                <View style={styles.statIconContainer}>
                                    <FontAwesome
                                        name="fire"
                                        solid
                                        size={22}
                                        color='#E68D33'
                                    />
                                </View>
                                <Text style={styles.valueStat}>2.153</Text>
                                <Text style={styles.descStat}>kcal. burnt</Text>
                            </View>
                            <View style={styles.cardContainer}>
                                <View style={styles.statIconContainer}>
                                    <FontAwesome
                                        name="clock"
                                        solid
                                        size={22}
                                        color='#E68D33'
                                    />
                                </View>
                                <Text style={styles.valueStat}>15H 39MIN</Text>
                                <Text style={styles.descStat}>total time</Text>
                            </View>
                            <View style={styles.cardContainer}>
                                <View style={styles.statIconContainer}>
                                    <FontAwesome
                                        name="dumbbell"
                                        solid
                                        size={22}
                                        color='#E68D33'
                                    />
                                </View>
                                <Text style={styles.valueStat}>67</Text>
                                <Text style={styles.descStat}>Exercise</Text>
                            </View>
                        </View>
                    </LinearGradient>
                </ImageBackground>
                <View style={styles.bodyContainer}>
                    <View>
                        <Title style={styles.bodySectionTitle}>Feature Workout</Title>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            {routines.map(routine =>
                                <View style={{flexWrap: 'wrap', width: 220}} key={routine.id}>
                                    <BackgroundImage source={{uri: routine.presentationImage}} style={styles.routineCard} resizeMode='cover'>
                                        <View style={styles.routineDescContainer}>
                                            <View style={styles.routineLevelIconContainer}>
                                                <FontAwesome
                                                    name="dumbbell"
                                                    solid
                                                    size={20}
                                                    color='#40d876'
                                                />
                                            </View>
                                            <Text style={styles.valueRoutineLevel}>{getRoutineLevel(routine.routineLevel)}</Text>
                                        </View>
                                    </BackgroundImage>
                                    <Text style={{color: '#FFF', textAlign: 'center', fontWeight: 'bold', width: '100%'}}>{routine.name}</Text>
                                </View>
                            )}
                        </ScrollView>
                    </View>
                    <View>
                        <Title style={styles.bodySectionTitle}>Main gym news</Title>
                    </View>
                    <View>
                        <Title style={styles.bodySectionTitle}>Training tips</Title>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
      height: 460
    },
    titleUserContainer: {
      marginTop: '15%',
      flexDirection: 'row',
      justifyContent: 'space-between', 
      alignItems: 'center',
      paddingLeft: 20, 
      paddingTop: 20,
      paddingRight: 50
    },
    salutationUser: {
        flexDirection: 'row',
        width: '40%'
    },
    userSalutation: {
        fontSize: 25,
        color: '#40d876',
        fontWeight: 'bold',
        marginRight: 5
    },
    userName: {
        fontSize: 25,
        color: '#FFF'
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 50,
        borderColor: '#40d876',
        borderWidth: 2
    },
    playButton: {
        borderRadius: 50, 
        width: 60, 
        height: 60,
        backgroundColor: '#40d876',
        alignSelf: "center",
        marginTop: '20%',
        marginBottom: 40,
        shadowOpacity: 1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 },
        shadowColor: '#40d876',
    },
    playIconButton: {
        marginLeft: 5
    },
    startCardsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10
    },
    cardContainer: {
        borderRadius: 10,
        backgroundColor: '#242538',
        height: 100,
        width: 100,
        justifyContent: "center",
        alignItems: "center"
    },
    statIconContainer: {
        backgroundColor: '#131429',
        height: 40,
        width: 40,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 5
    },
    valueStat: {
        color: '#40d876',
        fontWeight: "bold"
    },
    descStat: {
        color: '#9b9b9b',
        fontSize: 12
    },
    bodyContainer: {
      marginLeft: 10,
      marginRight: 10  
    },
    sectionTitle:{
        color: '#FFF', 
        paddingLeft: 20,
        fontWeight: 'bold'
    },
    bodySectionTitle:{
        color: '#FFF',
        paddingLeft: 10,
        fontWeight: 'bold'
    },
    routineCard: {
        borderRadius: 20,
        borderWidth: 0,
        width: 200,
        height: 200,
        margin: 10,
        overflow: 'hidden'
    },
    routineDescContainer: {
        borderRadius: 10,
        backgroundColor: 'rgba(19, 20, 41, 0.6)',
        height: 60,
        width: 80,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        marginLeft: 5
    },
    routineLevelIconContainer: {
        backgroundColor: '#131429',
        height: 30,
        width: 50,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5
    },
    valueRoutineLevel: {
        color: '#E68D33',
        fontSize: 11,
        fontWeight: 'bold'
    },
});