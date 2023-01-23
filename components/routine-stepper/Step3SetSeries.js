import {List, Title} from "react-native-paper";
import {Modal, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import {screenDimensions} from "../common/helpers/Utils";
import CustomCheckBox from "../common/CustomCheckBox";
import React, {useState, useEffect}  from "react";
import EditExerciseSerie from "../EditExerciseSerie";
import {Button} from "react-native-elements";

export default function Step3SetSeries(props){

    const [exercisesData, setExercisesData] = useState([]);
    const [exerciseDataModalShow, setExerciseDataModalShow] = useState(false);
    const [replyRoutineOverWeeks, setReplyRoutineOverWeeks] = useState(false);
    const serieEditionMenu = useState(false);
    const [currentSerie, setCurrentSerie] = useState(0);
    const [selectedExerciseData, setSelectedExerciseData] = useState({});

    useEffect(() => {
        fetchData();
    }, []);
    
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
            })
            .catch(error => console.log(error));
    };
    
    const handleSetExerciseSeries = (day, exercise) => {
        setExerciseDataModalShow(true);
        setSelectedExerciseData({day: day, exerciseId: exercise});
    }

    const initializeSeries = (value) => {
        const seriesTemp = [];

        for(let i = 0; i < value; i++)
        {
            const serie = props.series[i] ?? {reps: '', weight: '', rest: '', fail: ''};
            seriesTemp.push(serie);
        }

        props.setSeries([...seriesTemp]);
        setCurrentSerie(0);
    }

    const goToStep2SerieEdition = () =>
    {
        if(!props.series.length)
            return;

        setExerciseDataModalShow(false);
        setCurrentSerie(0);
        serieEditionMenu[1](true);
    }

    const handleSetSerieData = (serieData) => {
        props.setSeries(serieData);
        setSelectedExerciseData(prevState => {
            return {...prevState, series: serieData}
        });

        if(currentSerie < props.series.length-1)
        {
            setCurrentSerie(prevState => prevState+1);
            serieEditionMenu[1](true);
        }
        else
        {
            const newRoutine = props.routine.routineWeeks.map(x => {
                const exerciseSerieInfo = x.exercises.map(y => {
                    if (y.day === selectedExerciseData.day && x.week === props.indexDay+1) {
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
            props.setRoutine(prevState => {
                return {...prevState, routineWeeks: newRoutine}
            });
        }
    }
    
    return (
        <>
            <EditExerciseSerie 
                visibilityState={serieEditionMenu} 
                series={props.series} 
                serie={currentSerie} 
                setSeries={serieData => handleSetSerieData(serieData)}/>
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
                                value={props.series.length?.toString()}
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
            <View style={{marginTop: 20}}>
                <Title style={{color: '#FFF', textAlign: 'center', marginBottom: 10}}>Set exercises challenge for Week {props.weekSerieIndex+1}</Title>
                <View style={{margin: 20, height: screenDimensions()[1] *0.4}}>
                    <ScrollView>
                        <List.AccordionGroup>
                            {
                                props.routineWeeks[props.weekSerieIndex].exercises.map((exerciseDay, index) => {
                                    return (
                                        <List.Accordion
                                            id={index.toString()}
                                            style={{backgroundColor: '#242538'}}
                                            titleStyle={{ color: '#FFF'}}
                                            left={ props => <List.Icon {...props} icon="calendar-today" color='#FDB10E'/> }
                                            title={props.weekdays[exerciseDay.day].name}
                                            key={index}>
                                            {exercisesData.length > 0 && exerciseDay.exercises.map(exercise => {
                                                return <List.Item
                                                    onPress={() => handleSetExerciseSeries(exerciseDay.day, exercise)}
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
                {props.weekSerieIndex === 0 && <CustomCheckBox
                    label='Reply sets over the next weeks, you will allow to change the values later.'
                    containerStyle={{width: screenDimensions()[0]*0.9, marginTop: 20, marginBottom: 10}}
                    labelStyle={{marginLeft:10}}
                    status={replyRoutineOverWeeks} onPress={() => setReplyRoutineOverWeeks(prev => !prev)}/>}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
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