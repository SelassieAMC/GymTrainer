import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { GetCurrentDayNumberAndName } from "../components/common/helpers/Utils";
import Routines from "../components/common/helpers/Routines";
import { Button } from "react-native-elements";
import darkStyles from "../components/common/DarkStyles";
import { Title } from "react-native-paper";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import { BackgroundImage } from "react-native-elements/dist/config";
import LinearGradient from "react-native-linear-gradient";


export default function TodaySession()
{
    const [dayNumber, dayName] = GetCurrentDayNumberAndName(); //move inline styles to the StyleSheet, add start exercise with a new view, check how to go back from a route to the stack navigator
    const day = dayNumber;
    const [exercises, setExercises] = useState(Routines.getRoutines().exercises.filter(x => x.day === day));
    const [selectedExercise, setSelectedExercise] = useState(null);
    
    return(
        <SafeAreaView style={darkStyles.backgroundDark}>
            <Title style={{color: '#FFF', alignSelf: 'center'}}>Today's Session</Title>
            <ScrollView>
                {exercises.map(exercise =>
                    <View key={exercise.id}>
                        <BackgroundImage source={{uri: exercise.presentationImage}} style={styles.routineCard} resizeMode='cover'>
                            <LinearGradient
                                colors={['rgba(255,255,255,0)', 'rgba(19, 20, 41, 0.6)', 'rgba(19, 20, 41, 0.8)']}
                                style={{height : '100%', width : '100%'}}
                                start={{ x: 0, y: 1 }}
                                end={{ x: 1, y: 1 }}
                                locations={[0, 0.5, 1]}>
                                <View style={styles.exerciseDataContainer}>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <Text style={styles.exerciseTitle}>{exercise.name}</Text>
                                        <Button
                                            type="clear"
                                            icon={
                                                <FontAwesome
                                                    name="ellipsis-v"
                                                    solid
                                                    size={20}
                                                    color='#40d876'
                                                />
                                            }/>
                                    </View>
                                    <View style={styles.exerciseInfoContainer}>
                                        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: 80}}>
                                            <View style={styles.cardInfoContainer}>
                                                    <FontAwesome
                                                        name="clock"
                                                        solid
                                                        size={20}
                                                        color='orange'
                                                    />
                                                    <FontAwesome
                                                        name="fire"
                                                        solid
                                                        size={20}
                                                        color='orange'
                                                    />
                                                    <FontAwesome
                                                        name="dumbbell"
                                                        solid
                                                        size={19}
                                                        color='orange'
                                                    />
                                            </View>
                                            <View style={[styles.cardInfoContainer, {alignItems: 'flex-start'}]}>
                                                <Text style={styles.exerciseText}>{exercise.series.length} series</Text>
                                                <Text style={styles.exerciseText}>X Kcal</Text>
                                                <Text style={styles.exerciseText}>{exercise.series[exercise.series.length-1].weight} Kg.</Text>
                                            </View>
                                        </View>
                                        <Button
                                            type="solid"
                                            buttonStyle={styles.startButtonStyle}
                                            icon={
                                                <FontAwesome
                                                    name="play"
                                                    solid
                                                    size={20}
                                                    style={styles.playIconButton}
                                                    color='#FFF'
                                                />
                                            }/>
                                    </View>
                                </View>
                            </LinearGradient>
                        </BackgroundImage>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    titles: {
        fontSize: 30,
        fontWeight: "bold",
        alignSelf: 'center',
        color: '#fff',
        marginTop: 10,
        marginLeft:10,
        marginBottom: -40
    },
    cardContainer: {
        borderRadius: 10,
        borderWidth: 0,
        backgroundColor: '#242538'
    },
    image: {
        borderRadius: 10,
        height: 210,
        resizeMode: 'stretch',
        alignSelf: 'center'
    },
    header: {
        color: "#40d876",
        fontSize: 22,
        paddingLeft: 20
    },
    actionButtonContainer: {
        justifyContent: 'space-between',
        height: 85,
        width: 150,
        alignSelf: 'center',
        marginTop: 10
    },
    actionButton: {
        backgroundColor: '#40d876'
    },
    textButton: {
        color: '#131429',
        fontSize: 18,
        fontWeight: '400'
    },
    routineCard: {
        borderRadius: 20,
        borderWidth: 0,
        height: 180,
        margin: 10,
        overflow: 'hidden'
    },
    routineScrollView: {
        margin: 20
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
        color: 'orange',
        fontSize: 11,
        fontWeight: 'bold'
    },
    exerciseDataContainer: {
        alignSelf: 'flex-end',
        marginTop: 10,
        width: '55%'
    },
    exerciseTitle: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
        width: 160
    },
    exerciseText: {
        fontSize: 13,
        color: '#eeeeee'
    },
    startButtonStyle: {
        borderRadius: 50,
        width: 40,
        height: 40,
        backgroundColor: '#40d876',
        alignSelf: "center",
        marginBottom: 40,
        shadowOpacity: 1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 },
        shadowColor: '#40d876',
        margin: 15
    },
    playIconButton: {
        marginLeft: 5
    },
    exerciseInfoContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 5,
        alignItems: 'center'
    },
    infoContainer: {
        flexDirection: 'row',
        height: 30,
        width: 70,
        marginTop: 5, 
        alignItems: 'center'
    },
    cardInfoContainer: {
        height: 80, 
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10
    }
});