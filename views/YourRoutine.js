import {ImageBackground, StyleSheet, View} from "react-native";
import {Title} from "react-native-paper";
import React, { useState} from "react";
import darkStyles from "../components/common/DarkStyles";
import backgroundImage from "../images/weekPlan.jpg";
import LinearGradient from "react-native-linear-gradient";
import {Button} from "react-native-elements";
import Step1PeriodSelection from "../components/routine-stepper/Step1PeriodSelection";
import Step2ExerciseSelection from "../components/routine-stepper/Step2ExercisesSelection";
import Step3SetSeries from "../components/routine-stepper/Step3SetSeries";

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
    const [step, setStep] = useState(1);
    const [selectedExercises, setSelectedExercises] = useState([]);
    const [exercisesSelectedIndex, setExercisesDay] = useState(0);
    const [weekSerieIndex, setWeekIndex] = useState(0);
    const [routine, setRoutine] = useState({ name: 'Test', routineWeeks: []});
    const [series, setSeries] = useState([]);

    const goNextDay = () => {
        setExercisesDay(exercisesSelectedIndex+1);
        const weekDay = weekdays.indexOf(weekdays.filter(x => x.checked === true)[exercisesSelectedIndex+1]);
        if(!selectedExercises.filter(x => x.day === weekDay)[0])
        {
            setSelectedExercises((selectedExercises) => [...selectedExercises, { day : weekDay, exercises: []}])
        }
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
    
    const goToNextStep = () => {
        if (step === 1)
        {
            const checkedDaysForWorkout = weekdays.map((x, i) => {if(x.checked === true) return i;}).filter(x => x !== undefined);

            const daysInitialization = checkedDaysForWorkout.map(item => {
                return {day: item, exercises: selectedExercises.filter(x => x.day === item)[0]?.exercises ?? []};
            })
            setSelectedExercises([...daysInitialization]);
        }
        
        if (step === 2)
        {
            setRoutine(prevState => {
                return {...prevState, routineWeeks: prevState.routineWeeks.map(week => {return {...week, exercises: [...selectedExercises]}})};
            });
        }
        
        setStep(prevStep => prevStep+1);
    }
    
    const goToBackStep = () => {
        if (step === 2)
        {
            setExercisesDay(0);
        }
        setStep(prevStep => prevStep-1);
    }
    
    return (
        <View style={darkStyles.backgroundDark}>
            <ImageBackground source={backgroundImage} style={styles.backgroundImage} resizeMode='cover'>
                <LinearGradient
                    colors={['rgba(19, 20, 41, 0)', 'rgba(19, 20, 41, 0.5)', 'rgba(19, 20, 41, 1)']}
                    style={{height : '100%', width : '100%'}}>
                    { step === 1 && <Title style={{color: '#FFF', textAlign: 'center', marginTop: 90}}>Set period of work</Title>}
                    { step === 2 && <Title style={{color: '#FFF', textAlign: 'center', marginTop: 90}}>Select exercises for {getCurrentDayName()}</Title>}
                </LinearGradient>
            </ImageBackground>
            { step === 1 && 
                <Step1PeriodSelection 
                    weekdays={weekdays}
                    handleDaysSelection={(days => setWeekdays(days))}
                    handleWeeksSelection={(weeksAmount => setRoutineWeeks(weeksAmount))}/> }
            { step === 2 && 
                <Step2ExerciseSelection 
                    weekdays={weekdays}
                    selectedExercises={selectedExercises}
                    setSelectedExercises={setSelectedExercises}
                    indexDay={exercisesSelectedIndex}/> }
            { step === 3 && 
                <Step3SetSeries 
                    weekdays={weekdays} 
                    weekSerieIndex={weekSerieIndex}
                    routineWeeks={routine.routineWeeks}
                    setSeries={(series) => setSeries(series)}
                    series={series} 
                    routine={routine}
                    setRoutine={(routine) => setRoutine(routine)} 
                    indexDay={exercisesSelectedIndex}/> }
            
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                { step === 1 && <Button title='Next' type='clear' disabled={!weekdays.some(x => x.checked === true)} buttonStyle={{marginTop: 20}} onPress={() => goToNextStep()}/> }
                { step === 2 &&
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <Button title='Back' type='clear' buttonStyle={{width: 100}} onPress={() => goToBackStep()}/>
                        <View style={{alignContent: 'center'}}>
                            <Button title='Back Day' type='clear' disabled={exercisesSelectedIndex === 0} buttonStyle={{width: 100}} onPress={() => setExercisesDay(exercisesSelectedIndex-1)}/>
                            <Button title='Next Day' type='clear' disabled={exercisesSelectedIndex === weekdays.filter(x => x.checked === true).length-1} buttonStyle={{width: 100}} onPress={() => goNextDay()}/>
                        </View>
                        <Button title='Next' type='clear' buttonStyle={{width: 100}} onPress={() => goToNextStep()}/>
                    </View>
                }
                { step === 3 && 
                    <View>
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
        </View>
        
        //Step 3 - Set the data for the exercise and add a way to go back between exercises, and a summary for the edition.
        
        //Step 4 - Confirm
    )
}

const styles = StyleSheet.create({
    backgroundImage: {
        height: 120
    }
});