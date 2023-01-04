import React, {useEffect, useState} from "react";
import {FlatList, StyleSheet, Text, View} from "react-native";
import {BackgroundImage} from "react-native-elements/dist/config";
import {Title} from "react-native-paper";
import {Button} from "react-native-elements";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
import {screenDimensions} from "./common/helpers/Utils";

export default function ExerciseSelector(props)
{
    const [exercisesData, setExercisesData] = useState([]);
    const [filteredExercises, setFilteredExercises] = useState([]);
    
    const fetchData = () => {
        return fetch("https://777a-186-113-78-154.ngrok.io/api/v1/exercises/get-all",
            {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                setExercisesData(data);
                setFilteredExercises(data);
            })
            .catch(error => console.log(error));
    };

    useEffect(() => {
        fetchData();
    }, []);

    const renderItem = ({item}) => (
        <View style={styles.exerciseRecord} key={item.id}>
            <BackgroundImage source={{uri: item.image}} style={styles.exerciseCard} resizeMode='cover'/>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: screenDimensions()[0]*0.73, alignItems: 'center'}}>
                <View>
                    <Title style={styles.title}>{item.name}</Title>
                    <Text style={styles.exerciseDataText}>Muscles: </Text>
                    <View style={styles.musclesContainer}>
                        {item.musclesWorked.map((muscle, index)=> {
                            return <View key={index} style={styles.muscleTextContainer}>
                                <Text style={[styles.exerciseDataText]}>{muscle.name}</Text>
                            </View>
                        })}
                    </View>
                </View>
                <View>
                    <Button 
                        type="clear" 
                        disabled={props.selectedExercises.filter(x => x === item.id).length > 0} 
                        icon={
                            <FontAwesome5 
                                name='plus-circle' 
                                color={props.selectedExercises.filter(x => x === item.id).length > 0 ? 'gray' : 'green'} 
                                size={30}/>
                        } 
                        onPress={() => props.handleSelectedExercise(item.id)}/>
                </View>
            </View>
        </View>
    );
    
    return (
        <View>
            {props.selectedExercises.length > 0 &&
                <View style={{flexDirection: 'row', marginBottom: 5}}>
                    {props.selectedExercises.map((value) => {
                        const exerciseItem = exercisesData.filter(x => x.id === value)[0];
                        return (
                            <View key={value}>
                                <Ionicons 
                                    name='md-close-circle'
                                    color='green'
                                    size={20}
                                    style={{alignSelf: 'flex-end', marginBottom: -12, marginRight: -5, zIndex: 10 }}
                                    onPress={() => props.handleRemoveExercise(value)}
                                />
                                <BackgroundImage 
                                    source={{uri: exerciseItem.image}}
                                    style={styles.miniCardSelected}
                                    resizeMode='cover'
                                />
                            </View>
                        )})
                    }
                </View>
            }
            {filteredExercises && <FlatList
                data={filteredExercises}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                keyExtractor={item  =>  item.id}
            />}
        </View>
    )
}

const styles = StyleSheet.create({
    exerciseRecord: {
        flexDirection: 'row',
        marginTop: 5,
        alignItems: 'center',
        backgroundColor: '#242538',
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 10,
        justifyContent: 'space-between'
    },
    title: {
        color: '#FFF'
    },
    exerciseDataText: {
        color: '#FFF'
    },
    muscleTextContainer: {
        backgroundColor: 'rgba(43,59,110,0.74)',
        borderRadius: 5,
        marginRight: 5,
        padding: 2
    },
    exerciseCard: {
        width: 80,
        height: 80,
        borderRadius: 10,
        overflow: 'hidden',
        marginRight: 5
    },
    musclesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        maxWidth: 200
    },
    miniCardSelected: {
        width: 40,
        height: 40,
        borderRadius: 10,
        overflow: 'hidden',
        marginRight: 5
    },
});