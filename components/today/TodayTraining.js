import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Dimensions, Text, ScrollView, View } from "react-native";
import Routines from "../common/helpers/Routines";
import { Button, Card } from "react-native-elements";
import ExerciseInProgress from '../exercises/ExerciseInProgress';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { GetCurrentDayNumberAndName } from "../common/helpers/Utils";
import { useIsFocused } from "@react-navigation/native";
import darkStyles from '../common/DarkStyles';
import {Title} from "react-native-paper";

export const SLIDER_WIDTH = Dimensions.get('window').width + 80

export default function TodayTraining(props)
{
    const [dayNumber, dayName] = GetCurrentDayNumberAndName();
    const day = props.dayNumber ? props.dayNumber-1 : dayNumber;
    const [exercises, setExercises] = useState(Routines.getRoutines().exercises.filter(x => x.day === day));
    const [selectedExercise, setSelectedExercise] = useState(null);
    const isFocused = useIsFocused(); //Re-render the component

    useEffect(() => {
        if (!selectedExercise)
        {
            props.navigation?.setOptions({
                headerLeft: () => <></>
            });
        }
    },[selectedExercise]);

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

    const skipCurrentExercise = (exerciseId) => {
        const cloneData = exercises.slice();
        cloneData.forEach(function(obj) {
            if(obj.id === exerciseId)
            {
                obj.skipped = true;
            }
            return obj;
        });
        setExercises(cloneData);
    }

    return (
        <SafeAreaView style={darkStyles.backgroundDark}>
            {exercises && !selectedExercise &&
            <>
                <Title style={darkStyles.bigTitle}>{dayName} workout</Title>
                <SafeAreaView>
                    <ScrollView>
                        {exercises.map(exercise => 
                            <Card containerStyle={styles.cardContainer} key={exercise.id}>
                                <Card.Title style={styles.header}>{exercise.name}</Card.Title>
                                <Card.Image
                                    style={styles.image}
                                    source={{
                                        uri: exercise.image
                                    }}
                                />
                                {!exercise.done && !exercise.skipped &&
                                    <View style={styles.actionButtons}>
                                        <Button 
                                            icon={
                                                <Icon
                                                    name="play-circle"
                                                    size={19}
                                                    color="#FDB10E"
                                                    style={{marginRight:10}}
                                                />
                                            }
                                            type="outline" 
                                            buttonStyle={{borderRadius: 10}}
                                            title="Start" 
                                            onPress={() => setSelectedExercise(exercise)}
                                        />
                                        <Button 
                                            icon={
                                                <Icon
                                                    name="times-circle"
                                                    size={19}
                                                    color="#FDB10E"
                                                    style={{marginRight:10}}
                                                />
                                            }
                                            type="outline"
                                            title="Skip" 
                                            buttonStyle={{borderRadius: 10}}
                                            onPress={() => skipCurrentExercise(exercise.id)}
                                        />
                                    </View>
                                }
                                {exercise.done && (<Text style={styles.header}>Completed!</Text>)}
                                {exercise.skipped && (<Text style={styles.header}>Skipped!</Text>)}
                            </Card>
                        )}
                    </ScrollView>
                </SafeAreaView>
            </> 
            }
            {selectedExercise && 
                <SafeAreaView>
                    <ExerciseInProgress selectedExercise={selectedExercise} onExerciseDone={onExerciseDone} onExit={() => setSelectedExercise(null)} navigation={props.navigation}/>
                </SafeAreaView>
            }
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
      borderWidth: 5
    },
    image: {
        borderRadius: 10,
       height: 210,
       resizeMode: 'stretch',
       alignSelf: 'center'
    },
    header: {
      color: "#FDB10E",
      fontSize: 22,
      paddingLeft: 20
    },
    actionButtons: {
      justifyContent: 'space-between',
      height: 85,
      width: 150,
      alignSelf: 'center',
      marginTop: 10
    }
  });
  