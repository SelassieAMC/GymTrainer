import {ImageBackground, Modal, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import {List, Title} from "react-native-paper";
import React, {useEffect, useState} from "react";
import darkStyles from "../components/common/DarkStyles";
import CustomCheckBox from "../components/common/CustomCheckBox";
import backgroundImage from "../images/weekPlan.jpg";
import LinearGradient from "react-native-linear-gradient";
import {Picker} from "@react-native-picker/picker";
import {Button} from "react-native-elements";
import ExerciseSelector from "../components/ExerciseSelector";
import {screenDimensions} from "../components/common/helpers/Utils";
import EditExerciseSerie from "../components/EditExerciseSerie";
import Step1PeriodSelection from "../components/routine-stepper/Step1PeriodSelection";

export default function YourRoutine()
{
    const [weekdays, setWeekdays] = useState([
        {name:'Monday', checked:false},
        {name:'Tuesday', checked:false},
        {name:'Wednesday', checked:false},
        {name:'Thursday', checked:false},
        {name:'Friday', checked:false},
        {name:'Saturday', checked:false},
        {name:'Sunday', checked:false}
    ]);

    const [replyRoutineOverWeeks, setReplyRoutineOverWeeks] = useState(false);
    const [step, setStep] = useState(1);
    const [selectedExercises, setSelectedExercises] = useState([]);
    const [exercisesSelectedIndex, setExercisesDay] = useState(0);
    const [exercisesData, setExercisesData] = useState([]);
    const [exerciseDataModalShow, setExerciseDataModalShow] = useState(false);
    const serieEditionMenu = useState(false);
    
    const [weekSerieIndex, setWeekIndex] = useState(0);
    const [routine, setRoutine] = useState({ name: 'Test', routineWeeks: []});
    const [selectedExerciseData, setSelectedExerciseData] = useState({});
    const [series, setSeries] = useState([]);
    const [currentSerie, setCurrentSerie] = useState(0);
    
    const fetchData = () => {
        return fetch("https://c19b-191-108-26-96.ngrok.io/api/v1/exercises/get-all",
            {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                setExercisesData(data);
            })
            .catch(error => console.log(error));
    };

    useEffect(() => {
        fetchData();
    }, []);
    
    const handleSelectedExercise = (exerciseId) => {
        const exerciseDay = weekdays.indexOf(weekdays.filter(x => x.checked === true)[exercisesSelectedIndex]); //get number day
        let dayElement = selectedExercises.filter(x => x.day === exerciseDay)[0]; //get current day object
        const newExercisesList = [...new Set([...dayElement.exercises, exerciseId])]; // set exercises for the current day
        const newSelectionForDay = {...dayElement, exercises: newExercisesList}; // replace exercises with the new array
        const newSelection = selectedExercises.map(selectionDay =>
        { return selectionDay.day === newSelectionForDay.day ? newSelectionForDay : selectionDay}); // replace current day data on general exercise data
        setSelectedExercises([...newSelection]);
    }
    
    const goNextDay = () => {
        setExercisesDay(exercisesSelectedIndex+1);
        const weekDay = weekdays.indexOf(weekdays.filter(x => x.checked === true)[exercisesSelectedIndex+1]);
        if(!selectedExercises.filter(x => x.day === weekDay)[0])
        {
            setSelectedExercises((selectedExercises) => [...selectedExercises, { day : weekDay, exercises: []}])
        }
    }
    
    const handleRemoveExercise = (exerciseId) => {
        const exerciseDay = weekdays.indexOf(weekdays.filter(x => x.checked === true)[exercisesSelectedIndex]); //get number day
        let dayElement = selectedExercises.filter(x => x.day === exerciseDay)[0]; //get current day object
        const exercisesArray = dayElement.exercises.filter(value => value !== exerciseId);
        const newSelectionForDay = {...dayElement, exercises: exercisesArray};
        const newSelection = selectedExercises.map(selectionDay => { return selectionDay.day === newSelectionForDay.day ? newSelectionForDay : selectionDay});
        setSelectedExercises([...newSelection]);
    }
    
    const goToStep2 = () => {
        setStep(2);
        const checkedDaysForWorkout = weekdays.map((x, i) => {if(x.checked === true) return i;}).filter(x => x !== undefined);
        
        const daysInitialization = checkedDaysForWorkout.map(item => {
            return {day: item, exercises: selectedExercises.filter(x => x.day === item)[0]?.exercises ?? []};
        })
        setSelectedExercises([...daysInitialization]);
    }
    
    const goToStep1 = () => {
        setStep(1);
        setExercisesDay(0);
    }
    
    const goToStep3 = () => {
        setStep(3);
        setRoutine(prevState => {
            return {...prevState, routineWeeks: prevState.routineWeeks.map(week => {return {...week, exercises: [...selectedExercises]}})};
        });
    }
    
    const getExercisesForCurrentDay = () => {
        const exerciseDay = weekdays.indexOf(weekdays.filter(x => x.checked === true)[exercisesSelectedIndex]);
        return selectedExercises.filter(x => x.day === exerciseDay)[0].exercises; 
    }
    
    const getCurrentDayName = () => {
        const exerciseDay = weekdays.indexOf(weekdays.filter(x => x.checked === true)[exercisesSelectedIndex]);
        return weekdays[exerciseDay].name;
    }
    
    const setRoutineWeeks = (value) => {
        let routineWeeks = [...routine.routineWeeks];
        for (let i = 1; i <= value; i++)
        {
            if (!routine.routineWeeks.filter(x => x.week === i)[0])
            {
                routineWeeks.push({ week: i, exercises: []});
            }
        }
        setRoutine(prevState => {
            return {...prevState, routineWeeks: routineWeeks}
        });
    }
    
    const handleSetExerciseData = (exerciseDay, exercise) => {
        setExerciseDataModalShow(true);
        setSelectedExerciseData({day: exerciseDay, exerciseId: exercise});
    }
    
    const initializeSeries = (value) => {
        const seriesTemp = [];
        
        for(let i = 0; i < value; i++)
        {
            const serie = series[i] ?? {reps: '', weight: '', rest: '', fail: ''};
            seriesTemp.push(serie);
        }
        
        setSeries([...seriesTemp]);
        setCurrentSerie(0);
    }
    
    const goToStep2SerieEdition = () =>
    {
        if(!series.length)
            return;
        
        setExerciseDataModalShow(false);
        setCurrentSerie(0);
        serieEditionMenu[1](true);
    }
    
    const handleSetSerieData = (serieData) => {
        setSeries(serieData);
        setSelectedExerciseData(prevState => {
            return {...prevState, series: serieData}
        });
        
        if(currentSerie < series.length-1)
        {
            setCurrentSerie(prevState => prevState+1);
            serieEditionMenu[1](true);
        }
        else
        {
            const newRoutine = routine.routineWeeks.map(x => {
                const exerciseSerieInfo = x.exercises.map(y => {
                    if (y.day === selectedExerciseData.day && x.week === weekSerieIndex+1) {
                        const exercisesArray = y.exercises.map(u => 
                        {
                            if (u === selectedExerciseData.exerciseId)
                            {
                                return {id: u, series: selectedExerciseData.series};
                            }
                            return u;
                        });
                        return {...y, exercises: exercisesArray};
                    }
                    return y;
                });
                return { ...x, exercises: exerciseSerieInfo};
            });
            //let newRoutine = routine.routineWeeks.filter(x => x.week === weekSerieIndex+1)[0].exercises.filter(y => y.day === selectedExerciseData.day)[0].exercises.filter(u => u === selectedExerciseData.exerciseId)[0];
            setRoutine(prevState => {
                return {...prevState, routineWeeks: newRoutine}
            });
        }
    }
    
    return (
        <View style={darkStyles.backgroundDark}>
            <EditExerciseSerie visibilityState={serieEditionMenu} series={series} serie={currentSerie} setSeries={serieData => handleSetSerieData(serieData)}/>
            <Modal
                animationType="fade"
                transparent={true}
                visible={exerciseDataModalShow}
                presentationStyle="overFullScreen"
                onRequestClose={() => setExerciseDataModalShow(prev => !prev)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View>
                            <Text style={{fontSize: 18}}>Set serie workout data</Text>
                            <TextInput
                                value={series.length?.toString()}
                                keyboardType='numeric'
                                maxLength={2}
                                onChangeText={(value) => initializeSeries(value)}
                                style={styles.text}/>
                        </View>
                        
                        <View style={{flexDirection: "row", alignSelf: 'center', justifyContent: 'space-between', marginTop: 20}}>
                            <Button
                                title='Accept'
                                type="clear"
                                onPress={() => goToStep2SerieEdition()}
                            />
                            <Button
                                title='Cancel'
                                type="clear"
                                onPress={() => setExerciseDataModalShow(false)}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
            <ImageBackground source={backgroundImage} style={styles.backgroundImage} resizeMode='cover'>
                <LinearGradient
                    colors={['rgba(19, 20, 41, 0)', 'rgba(19, 20, 41, 0.5)', 'rgba(19, 20, 41, 1)']}
                    style={{height : '100%', width : '100%'}}>
                    { step === 1 && <Title style={{color: '#FFF', textAlign: 'center', marginTop: 90}}>Set period of work</Title>}
                    { step === 2 && <Title style={{color: '#FFF', textAlign: 'center', marginTop: 90}}>Select exercises for {getCurrentDayName()}</Title>}
                </LinearGradient>
            </ImageBackground>
            {/*Step 1 - Select days of the week and training period*/}
            { step === 1 && <Step1PeriodSelection weekdays={weekdays} handleDaysSelection={(days => setWeekdays(days))} handleWeeksSelection={(weeksAmount => setRoutineWeeks(weeksAmount))}/> }
            { step === 2 &&
                <View style={{margin: 10}}>
                    <View style={{height: screenDimensions()[1] *0.65}}>
                        <ExerciseSelector 
                            selectedExercises={getExercisesForCurrentDay()}
                            handleRemoveExercise={handleRemoveExercise}
                            routineCreatorMode={true}
                            handleSelectedExercise={handleSelectedExercise}/>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <Button title='Back' type='clear' buttonStyle={{width: 100}} onPress={() => goToStep1()}/>
                        <View style={{alignContent: 'center'}}>
                            <Button title='Back Day' type='clear' disabled={exercisesSelectedIndex === 0} buttonStyle={{width: 100}} onPress={() => setExercisesDay(exercisesSelectedIndex-1)}/>
                            <Button title='Next Day' type='clear' disabled={exercisesSelectedIndex === weekdays.filter(x => x.checked === true).length-1} buttonStyle={{width: 100}} onPress={() => goNextDay()}/>
                        </View>
                        <Button title='Next' type='clear' buttonStyle={{width: 100}} onPress={() => goToStep3()}/>
                    </View>
                </View>
            }
            {
                step === 3 &&
                <View style={{marginTop: 20}}>
                    <Title style={{color: '#FFF', textAlign: 'center', marginBottom: 10}}>Set exercises challenge for Week {weekSerieIndex+1}</Title>
                    <View style={{margin: 20, height: screenDimensions()[1] *0.4}}>
                        <ScrollView>
                            <List.AccordionGroup>
                                {
                                    routine.routineWeeks[weekSerieIndex].exercises.map((exerciseDay, index) => {
                                        return (
                                            <List.Accordion
                                                id={index.toString()}
                                                style={{backgroundColor: '#242538'}}
                                                titleStyle={{ color: '#FFF'}}
                                                left={ props => <List.Icon {...props} icon="calendar-today" color='#FDB10E'/> }
                                                title={weekdays[exerciseDay.day].name}
                                                key={index}>
                                                {exerciseDay.exercises.map(exercise => {
                                                    return <List.Item
                                                        onPress={() => handleSetExerciseData(exerciseDay.day, exercise)}
                                                        left={props => <List.Icon {...props} icon="pencil" color='#FDB10E' /> }
                                                        title={exercisesData.filter(x => x.id === exercise)[0].name} titleStyle={{color: '#FFF'}}
                                                        style={{backgroundColor: '#131429'}}
                                                        key={exercise}/>
                                                })}
                                            </List.Accordion>
                                        )
                                    })
                                }
                            </List.AccordionGroup> 
                        </ScrollView>
                    </View>
                    {weekSerieIndex === 0 && <CustomCheckBox
                        label='Reply sets over the next weeks, you will allow to change the values later.'
                        containerStyle={{width: screenDimensions()[0]*0.9, marginTop: 20, marginBottom: 10}}
                        labelStyle={{marginLeft:10}}
                        status={replyRoutineOverWeeks} onPress={() => setReplyRoutineOverWeeks(prev => !prev)}/>}
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <Button title='Back' type='clear' buttonStyle={{width: 70}} onPress={() => setStep(2)}/>
                        <View style={{alignContent: 'center'}}>
                            <Button title='Back Week' type='clear' disabled={weekSerieIndex === 0 } onPress={() => setWeekIndex(prev => prev-1)}/>
                            <Button title='Next Week' type='clear' disabled={weekSerieIndex >= routine.routineWeeks.length-1} buttonStyle={{width: 150}} onPress={() => setWeekIndex(prev => prev+1)}/>
                        </View>
                        <Button title='Next' type='clear' buttonStyle={{width: 70}} onPress={() => setStep(4)}/>
                    </View>
                </View>    
            }
        </View>
        
        //Step 3 - Set the data for the exercise and add a way to go back between exercises, and a summary for the edition.
        
        //Step 4 - Confirm
    )
}

const styles = StyleSheet.create({
    backgroundImage: {
        height: 120
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20
    },
    modalView: {
        margin: 10,
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
    text: {
        fontSize: 18,
        alignSelf: "center",
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        minWidth: 70,
        textAlign: 'center',
        marginTop: 20
    },
});