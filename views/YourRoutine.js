import {ImageBackground, Text, View, StyleSheet, ScrollView} from "react-native";
import { Title } from "react-native-paper";
import React, {useState} from "react";
import darkStyles from "../components/common/DarkStyles";
import CustomCheckBox from "../components/common/CustomCheckBox";
import backgroundImage from "../images/weekPlan.jpg";
import LinearGradient from "react-native-linear-gradient";
import { Picker } from "@react-native-picker/picker";
import {Button} from "react-native-elements";
import Exercises from "./Exercises";
import ExerciseSelector from "../components/ExerciseSelector";
import {screenDimensions} from "../components/common/helpers/Utils";


export default function YourRoutine()
{
    const [weekdays, setWeekday] = useState([
        {name:'Monday', checked:false},
        {name:'Tuesday', checked:false},
        {name:'Wednesday', checked:false},
        {name:'Thursday', checked:false},
        {name:'Friday', checked:false},
        {name:'Saturday', checked:false},
        {name:'Sunday', checked:false}
    ]);
    
    const [weeksSelected, setWeeks] = useState(1);
    const [step, setStep] = useState(1);
    const [selectedExercises, setSelectedExercises] = useState([]);
    const [exercisesSelectedIndex, setExercisesDay] = useState(0);
    
    const handleSelectedExercise = (exerciseId) => {
        const newSelectedList = [...new Set([...selectedExercises, exerciseId])];
        setSelectedExercises(newSelectedList);
    }
    
    const handleRemoveExercise = (exerciseId) => {
        const newArray = selectedExercises.filter(value => value !== exerciseId);
        setSelectedExercises([...newArray]);
    }
    
    return (
        <View style={darkStyles.backgroundDark}>
                <ImageBackground source={backgroundImage} style={styles.backgroundImage} resizeMode='cover'>
                    <LinearGradient
                        colors={['rgba(19, 20, 41, 0)', 'rgba(19, 20, 41, 0.5)', 'rgba(19, 20, 41, 1)']}
                        style={{height : '100%', width : '100%'}}>
                        { step === 1 && <Title style={{color: '#FFF', textAlign: 'center', marginTop: 90}}>Set period of work</Title>}
                        { step === 2 && <Title style={{color: '#FFF', textAlign: 'center', marginTop: 90}}>Select exercises for {weekdays.filter(x => x.checked === true)[exercisesSelectedIndex].name}</Title>}
                    </LinearGradient>
                </ImageBackground>
                {/*Step 1 - Select days of the week and training period*/}
                { step === 1 && 
                    <>
                        <Text style={{color:'#FFF', fontSize: 18, marginLeft: 10, marginTop: 10}}>Repeat routine for the next:</Text>
                        <Picker
                            style={{margin: -20, padding: 0}}
                            selectedValue={weeksSelected}
                            onValueChange={value => setWeeks(value)}>
                            <Picker.Item label='1 week' value='1' color='#FFF'/>
                            <Picker.Item label='2 week' value='2' color='#FFF'/>
                            <Picker.Item label='3 week' value='3' color='#FFF'/>
                            <Picker.Item label='4 week' value='4' color='#FFF'/>
                            <Picker.Item label='5 week' value='5' color='#FFF'/>
                        </Picker>
                        <Text style={{color:'#FFF', fontSize: 18, marginLeft: 10, marginTop: 10}}>Every:</Text>
                        <View style={{ alignSelf: 'center', justifyContent: 'space-around', height: 300}}>
                            {weekdays.map((day, index) => {
                                if (day.name)
                                    return <CustomCheckBox
                                        key={day.name}
                                        label={day.name}
                                        status={day.checked}
                                        onPress={() => setWeekday([...weekdays, weekdays[index].checked = !day.checked])}/>
                            })}
                        </View>
                        <View style={{margin: 20, alignItems: 'center'}}>
                            <Button title='Next' type='clear' disabled={!weekdays.some(x => x.checked === true)} buttonStyle={{width: 100}} onPress={() => setStep(2)}/>
                        </View>
                    </>
                }
                { step === 2 && 
                    <>
                        <View style={{margin: 10}}>
                            <View style={{height: screenDimensions()[1] * 0.6}}>
                                <ExerciseSelector 
                                    selectedExercises={selectedExercises}
                                    handleRemoveExercise={handleRemoveExercise}
                                    routineCreatorMode={true}
                                    handleSelectedExercise={handleSelectedExercise}/>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Button title='Back' type='clear' buttonStyle={{width: 100}} onPress={() => setStep(1)}/>
                                <View style={{alignContent: 'center'}}>
                                    <Button title='Back Day' type='clear' disabled={exercisesSelectedIndex === 0} buttonStyle={{width: 100}} onPress={() => setExercisesDay(exercisesSelectedIndex-1)}/>
                                    <Button title='Next Day' type='clear' disabled={exercisesSelectedIndex === weekdays.filter(x => x.checked === true).length-1} buttonStyle={{width: 100}} onPress={() => setExercisesDay(exercisesSelectedIndex+1)}/>
                                </View>
                                <Button title='Next' type='clear' buttonStyle={{width: 100}} onPress={() => setStep(3)}/>
                            </View>
                        </View>
                    </>
                }
        </View>
        
        //Step 2 - Select exercises per day
        
        //Step 3 - Confirm
    )
}

const styles = StyleSheet.create({
    backgroundImage: {
        height: 120
    },
});