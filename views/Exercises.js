import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, Text, Modal, Alert, SafeAreaView } from "react-native";
import { Button } from "react-native-elements";
import { Title } from "react-native-paper";
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {GetCurrentDayNumberAndName} from "../components/common/helpers/Utils";
import Routines from "../components/common/helpers/Routines";
import ExerciseCard from "../components/exercises/ExerciseCard";
import darkStyles from '../components/common/DarkStyles';
import CustomDropdown  from "../components/common/CustomDropdown";

export default function Exercises(props)
{
    const dayInfo = GetCurrentDayNumberAndName();
    const [modalVisible, setModalVisible] = useState(false);
    const [todayExercises, setTodayExercises] = useState(Routines.getRoutines().exercises.filter(x => x.day === dayInfo[0]));
    const [selectedExercise, setSelectedExercise] = useState(null);
    const [exercisesData, setExercisesData] = useState([]);
    const [filteredExercises, setFilteredExercises] = useState([]);
    const [categories, setCategories] = useState([]);
    const [muscles, setMuscles] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState(null);
    const [muscleFilter, setMuscleFilter] = useState(null);
    const [categoryFilterValueSetter, setCategoryFilterValueSetter] = useState(null);
    const [muscleFilterValueSetter, setMuscleFilterValueSetter] = useState(null);

    const fetchData = () => {
        return fetch("https://fa67-190-69-60-250.ngrok.io/api/v1/exercises/get-all",
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

    const fetchCategories = () => {
        return fetch("https://fa67-190-69-60-250.ngrok.io/api/v1/Categories/get-all",
            {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                const categoriesData = data.map((category) => {
                        return { label: category.name, value: category.id }
                    });
                setCategories(categoriesData);
            })
            .catch(error => console.log(error));
    };

    const fetchMuscles = () => {
        return fetch("https://fa67-190-69-60-250.ngrok.io/api/v1/Muscles/get-all",
            {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                const musclesData = data.map((muscle) => {
                    return { label: muscle.name, value: muscle.id }
                });
                setMuscles(musclesData);
            })
            .catch(error => console.log(error));
    };

    useEffect(() => {
        fetchData();
        fetchCategories();
        fetchMuscles();
    }, []);

    const addRoutineOptions = [
        { label: 'Just today', value: 1 },
        { label: dayInfo[1] + '`s routine', value: 2 },
        { label: 'Specific days', value: 3 }
    ];
    
    const handleCategoryFilterChange = (value, setter) =>
    {
        setCategoryFilterValueSetter(setter);
        setCategoryFilter(value);
        let dataQueried;
        if (value) {
            dataQueried = exercisesData.filter(exercise => exercise.categories.some(cat => cat.id === Number(value)));
        }

        if (muscleFilter) {
            dataQueried = dataQueried.filter(exercise => exercise.musclesWorked.some(mw => mw.id === Number(muscleFilter)));
        }
        
        setFilteredExercises(dataQueried);
    }

    const handleMuscleFilterChange = (value, setter) =>
    {
        setMuscleFilterValueSetter(setter);
        setMuscleFilter(value);
        let dataQueried;
        if (value) {
            dataQueried = exercisesData.filter(exercise => exercise.musclesWorked.some(mw => mw.id === Number(value)));
        }

        if (categoryFilter) {
            dataQueried = dataQueried.filter(exercise => exercise.categories.some(cat => cat.id === Number(categoryFilter)));
        }

        setFilteredExercises(dataQueried);
    }
    
    const handleClearFilters = () => {
        setCategoryFilter(null);
        setMuscleFilter(null);
        
        if(categoryFilterValueSetter)
        {
            categoryFilterValueSetter(null);
        }
        if(muscleFilterValueSetter) 
        {
            muscleFilterValueSetter(null);
        }
        fetchData();
    }

    const handleActionButton = (exerciseItem) => {
        setModalVisible(true);
        setSelectedExercise(exerciseItem);
    }

    const actionButtons = (exerciseItem) => (
        <View style={styles.actionButtonsContainer}>
            {!props.routineCreatorMode ?
            <>
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
                    containerStyle={styles.actionButtonContainer}
                    buttonStyle={darkStyles.button}
                    titleStyle={styles.textButton}
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
                    containerStyle={styles.actionButtonContainer}
                    buttonStyle={darkStyles.button}
                    titleStyle={styles.textButton}
                />
            </> :
            <>
                <Button
                    icon={
                        <FontAwesome
                            name="plus"
                            solid
                            size={19}
                            style={{marginRight:5}}
                            color='green'
                        />
                    }
                    title='Select'
                    type="outline"
                    containerStyle={styles.actionButtonRoutineContainer}
                    buttonStyle={darkStyles.button}
                    titleStyle={styles.textButton}
                    onPress={() => props.handleSelectedExercise(exerciseItem.id)}
                />
            </>}
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
        if(todayExercises.filter(x => x.id === selectedExercise.id).length > 0)
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
        <SafeAreaView style={darkStyles.backgroundDark}>
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
                        <CustomDropdown data={addRoutineOptions} iconName="calendar-times" onSelectedValue={(value, resetter) => handleAddRoutineAction(value, resetter) }/>
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
            { !props.routineCreatorMode && <Title style={styles.catalogTitle}>Exercises Catalog</Title>}
            <View style={{margin: 10, flexDirection:'row', justifyContent:'space-between'}}>
                {categories.length > 0 && 
                    <CustomDropdown
                        data={categories}
                        dropdownStyle={{height: 40, width: 150}}
                        placeholderStyle={{fontSize: 16}}
                        placeholder='Category'
                        selectedTextStyle={{color: '#FFF'}}
                        defaultValue={categoryFilter}
                        onSelectedValue={(value, setter) => handleCategoryFilterChange(value, setter)}/>
                }
                {muscles.length > 0 &&
                    <CustomDropdown
                        data={muscles}
                        dropdownStyle={{height: 40, width: 150}}
                        placeholderStyle={{fontSize: 16}}
                        placeholder='Muscle'
                        defaultValue={muscleFilter}
                        selectedTextStyle={{color: '#FFF'}}
                        onSelectedValue={(value, setter) =>  handleMuscleFilterChange(value, setter)}/>
                }
                <Button type='clear' title='clear' disabled={!muscleFilter && !categoryFilter} onPress={() => handleClearFilters()}/>   
            </View>
            {filteredExercises && <FlatList
                data={filteredExercises}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                keyExtractor={item  =>  item.id}
            />}
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
    },
    actionButtonContainer: {
        marginTop: 10,
        backgroundColor: '#40d876',
        maxWidth: 160,
        borderRadius: 15
    },
    actionButtonRoutineContainer: {
        marginTop: 10,
        backgroundColor: '#40d876',
        width: 280,
        borderRadius: 15,
        alignItems: 'center'
    },
    textButton: {
        color: '#131429',
        fontSize: 14,
        fontWeight: 'bold'
    },
    actionButtonsContainer: {
        justifyContent: 'space-between', 
        margin: 10,
        flexDirection: 'row'
    },
    filterText: {
        color: '#FFF'
    }
  });