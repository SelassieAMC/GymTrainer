import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Dimensions, Text, ScrollView, View } from "react-native";
import Routines from "../common/helpers/Routines";
import { Button, Card } from "react-native-elements";
import ExerciseInProgress from '../exercises/ExerciseInProgress';
import Icon from 'react-native-vector-icons/FontAwesome5';

export const SLIDER_WIDTH = Dimensions.get('window').width + 80
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)

export default function TodayTraining(props)
{
    const date = new Date();
    const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
    const dayNumber = props.dayNumber ? props.dayNumber-1 : date.getDay()-1;
    const day = days[dayNumber];
    const [exercises, setExercises] = useState(Routines.getRoutines().exercises.filter(x => x.day === dayNumber));
    const [selectedExercise, setSelectedExercise] = useState(null);


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
                obj.done = true;
            return obj;
            });
        
        setExercises(cloneData);
        setSelectedExercise(null);
    }

    const skipCurrentExercise = () => {
        const cloneData = exercises.slice();
        cloneData.forEach(function(obj) {
            if(obj.id === currentExercise.id)
                obj.skipped = true;
                return obj;
            });
        setExercises(cloneData);
    }

    return (
        <>
            {exercises && !selectedExercise && 
            <>
                <Text style={styles.titles}>{day} workout</Text>
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
                                {!exercise.done ? 
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
                                            onPress={() => skipCurrentExercise()}
                                        />
                                    </View> :
                                    (<Text style={styles.header}>Completed!!</Text>)
                                }
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
        </>
    )
}

const styles = StyleSheet.create({
    titles: {
        fontSize: 30,
        fontWeight: "bold",
        alignSelf: 'center',
        color: '#19204E',
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