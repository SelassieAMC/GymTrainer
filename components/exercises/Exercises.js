import React, { useState } from "react";
import { StyleSheet, View, FlatList, Text, Modal, Alert } from "react-native";
import { Button } from "react-native-elements";
import { Title } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Dropdown from "../common/Dropdown";
import ExerciseCard from "./ExerciseCard";
import { GetCurrentDayNumberAndName } from "../common/helpers/Utils";
import Routines from "../common/helpers/Routines";

export default function Exercises(props)
{
    const dayInfo = GetCurrentDayNumberAndName();
    const [modalVisible, setModalVisible] = useState(false);
    const [todayExercises, setTodayExercises] = useState(Routines.getRoutines().exercises.filter(x => x.day === dayInfo[0]));
    const [selectedExercise, setSelectedExercise] = useState(null);

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
        },
        {
            id:50,
            name : 'Prensa una pierna new test',
            image : 'https://www.cambiatufisico.com/wp-content/uploads/Prensa-Inclinada-a-una-pierna.jpg',
            muscles : ['Cuadricep', 'femoral', 'gluteo']
        }
    ];

    const addRoutineOptions = [
        { label: 'Just today', value: 1 },
        { label: dayInfo[1] + '`s routine', value: 2 },
        { label: 'Specific days', value: 3 }
    ];

    const handleActionButton = (exerciseItem) => {
        setModalVisible(true);
        setSelectedExercise(exerciseItem);
    }

    const actionButtons = (exerciseItem) => (
        <View style={{width: 200, alignSelf: 'center', height: 90, justifyContent: 'space-between', marginTop: 5, paddingBottom: 5}}>
            <Button 
                icon={
                    <FontAwesome
                        name="calendar-plus"
                        solid
                        size={19}
                        style={{marginRight:5}}
                        color='green'
                    />
                }
                title='Add to your routine'
                type="outline" 
                buttonStyle={{borderRadius: 10}}
                onPress={() => handleActionButton(exerciseItem)}
            />
            <Button
                icon={
                    <FontAwesome
                        name="search"
                        solid
                        size={19}
                        style={{marginRight:5}}
                        color='green'
                    />
                }
                title='Find similars'
                type="outline" 
                buttonStyle={{borderRadius: 10}}
            />
        </View>
    );

    const renderItem = ({item}) => (
        <View>
            <ExerciseCard item={item} actions={actionButtons}/>
        </View>
    );

    const handleAddRoutineAction = function (action, resetAction)
    {
        switch(action)
        {
            case 1: addExerciseToRoutine(resetAction);  break;
            case 2: Alert.alert(action + 'day selected'); break;
            case 3: Alert.alert(action + 'specific selected'); break;
        }
    }

    const addExerciseToRoutine = (resetAction) => {
        if(todayExercises.filter(x => x.id == selectedExercise.id).length > 0)
        {
            Alert.alert('Alert', 'The exercise is already in the today routine.');
            resetAction(0);
        }
        else
        {
            setTodayExercises([...todayExercises, selectedExercise]);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                presentationStyle="overFullScreen"
                onRequestClose={() => setModalVisible(!modalVisible)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Modal to add routine to the day or week</Text>
                        <Dropdown data={addRoutineOptions} iconName="calendar-times" onSelectedValue={(value, resetter) => handleAddRoutineAction(value, resetter) }/>
                        <View style={{flexDirection: "row", width: 200, alignSelf: 'center', justifyContent: 'space-between', marginTop: 20}}>
                            <Button 
                                icon={
                                    <FontAwesome
                                        name="check"
                                        solid
                                        size={19}
                                        style={{marginRight:5}}
                                        color='#00FF00'
                                    />
                                }
                                title='Accept'
                                type="outline" 
                                buttonStyle={{borderRadius: 10}}
                                onPress={() => setModalVisible(false)}
                            />
                            <Button 
                                icon={
                                    <FontAwesome
                                        name="times-circle"
                                        solid
                                        size={19}
                                        style={{marginRight:5}}
                                        color='#FF0000'
                                    />
                                }
                                title='Cancel'
                                type="outline" 
                                buttonStyle={{borderRadius: 10}}
                                onPress={() => setModalVisible(false)}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
            <Title style={styles.catalogTitle}>Exercises Catalog</Title>
            <Text>Filters</Text>
            <View flexDirection='row' justifyContent='space-around'>
                <Text>Body part</Text>
                <Text>Muscle</Text>
                <Text>Type</Text>
                <Text>Not done</Text>
            </View>
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item  =>  item.id}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    
    catalogTitle: {
        color: "#FDB10E",
        fontSize: 28,
        paddingLeft: 20,
        alignSelf: 'center'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    }
  });