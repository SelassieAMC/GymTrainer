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
import ExerciseInProgress from "../components/exercises/ExerciseInProgress";
import CustomMenu from "../components/common/CustomMenu";


export default function TodaySession({navigation})
{
    const [dayNumber, dayName] = GetCurrentDayNumberAndName();
    const day = dayNumber;
    const [exercises, setExercises] = useState(Routines.getRoutines().exercises.filter(x => x.day === day));
    const [selectedExercise, setSelectedExercise] = useState(null);

    const onExerciseDone = () => {
        let cloneData = exercises.slice();
        cloneData.forEach(function(obj) {
            if(obj.id === selectedExercise.id)
            {
                obj.done = true;
            }
            return obj;
        });

        setExercises(cloneData);
        setSelectedExercise(null);
    }

    const routineOptions = () => {
        return [
            {
                title: 'Skip',
                actionHandler: () => alert('Exercise skipped!')
            },
            {
                title: 'Mark as completed',
                actionHandler: () => alert('Exercise completed!')
            },
            {
                title: 'Replace',
                actionHandler: () => alert('Open menu for replace')
            }
        ]
    }
    
    return(
        <SafeAreaView style={darkStyles.backgroundDark}>
            { !selectedExercise && <Title style={styles.mainTitle}>Today's Session</Title>}
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
                                    <View style={styles.exerciseTitleContainer}>
                                        <Text style={styles.exerciseTitle}>{exercise.name}</Text>
                                        <CustomMenu options={routineOptions()} menuOptionsStyle={{width: 200}} textOptionsStyle={{writingDirection: 'rtl'}}/>
                                    </View>
                                    <View style={styles.exerciseInfoContainer}>
                                        <View style={styles.cardContentContainer}>
                                            <View style={styles.cardItemsContainer}>
                                                    <FontAwesome
                                                        name="clock"
                                                        solid
                                                        size={20}
                                                        color='#E68D33'
                                                    />
                                                    <FontAwesome
                                                        name="fire"
                                                        solid
                                                        size={20}
                                                        color='#E68D33'
                                                    />
                                                    <FontAwesome
                                                        name="dumbbell"
                                                        solid
                                                        size={19}
                                                        color='#E68D33'
                                                    />
                                            </View>
                                            <View style={[styles.cardItemsContainer, { alignItems: 'flex-start'}]}>
                                                <Text style={styles.exerciseText}>{exercise.series.length} series</Text>
                                                <Text style={styles.exerciseText}>X Kcal</Text>
                                                <Text style={styles.exerciseText}>{exercise.series[exercise.series.length-1].weight} Kg. (Max)</Text>
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
                                            }
                                            onPress={() => setSelectedExercise(exercise)}/>
                                    </View>
                                </View>
                            </LinearGradient>
                        </BackgroundImage>
                    </View>
                )}
            </ScrollView>
            {selectedExercise &&
                <View>
                    <ExerciseInProgress selectedExercise={selectedExercise} onExerciseDone={onExerciseDone} onExit={() => setSelectedExercise(null)} navigation={navigation}/>
                </View>
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainTitle: {
        color: '#FFF', 
        alignSelf: 'center'
    },
    exerciseTitleContainer: {
        flexDirection: 'row', 
        alignItems: 'center'
    },
    routineCard: {
        borderRadius: 20,
        borderWidth: 0,
        height: 180,
        margin: 10,
        overflow: 'hidden'
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
    cardContentContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        width: 80
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
    cardItemsContainer: {
        height: 90, 
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        marginLeft: 2
    }
});