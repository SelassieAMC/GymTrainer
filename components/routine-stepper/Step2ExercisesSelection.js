import {View} from "react-native";
import {screenDimensions} from "../common/helpers/Utils";
import ExerciseSelector from "../ExerciseSelector";
import {Button} from "react-native-elements";
import React from "react";
import {useState} from "react";


export default function Step2ExerciseSelection(props)
{
    const [exercisesSelectedIndex, setExercisesDay] = useState(0);
    
    const getExercisesForCurrentDay = () => {
        const exerciseDay = props.weekdays.indexOf(props.weekdays.filter(x => x.checked === true)[exercisesSelectedIndex]);
        return props.selectedExercises.filter(x => x.day === exerciseDay)[0].exercises;
    }

    const handleRemoveExercise = (exerciseId) => {
        const exerciseDay = props.weekdays.indexOf(props.weekdays.filter(x => x.checked === true)[exercisesSelectedIndex]); //get number day
        let dayElement = props.selectedExercises.filter(x => x.day === exerciseDay)[0]; //get current day object
        const exercisesArray = dayElement.exercises.filter(value => value !== exerciseId);
        const newSelectionForDay = {...dayElement, exercises: exercisesArray};
        const newSelection = props.selectedExercises.map(selectionDay => { return selectionDay.day === newSelectionForDay.day ? newSelectionForDay : selectionDay});
        props.setSelectedExercises([...newSelection]);
    }

    const handleSelectedExercise = (exerciseId) => {
        const exerciseDay = props.weekdays.indexOf(props.weekdays.filter(x => x.checked === true)[exercisesSelectedIndex]); //get number day
        let dayElement = props.selectedExercises.filter(x => x.day === exerciseDay)[0]; //get current day object
        const newExercisesList = [...new Set([...dayElement.exercises, exerciseId])]; // set exercises for the current day
        const newSelectionForDay = {...dayElement, exercises: newExercisesList}; // replace exercises with the new array
        const newSelection = props.selectedExercises.map(selectionDay =>
        { return selectionDay.day === newSelectionForDay.day ? newSelectionForDay : selectionDay}); // replace current day data on general exercise data
        props.setSelectedExercises([...newSelection]);
    }
    
    return (
        <View style={{margin: 10}}>
            <View style={{height: screenDimensions()[1] *0.65}}>
                <ExerciseSelector
                    selectedExercises={getExercisesForCurrentDay()}
                    handleRemoveExercise={handleRemoveExercise}
                    routineCreatorMode={true}
                    handleSelectedExercise={handleSelectedExercise}/>
            </View>
        </View>
    )
}