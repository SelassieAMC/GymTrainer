import React, { useEffect, useLayoutEffect, useState } from "react";
import { Text } from "react-native-elements";
import { Table, TableWrapper, Cell } from "react-native-table-component";
import { StyleSheet, TouchableOpacity, View, Image, Alert, TextInput, FlatList } from "react-native";
import { LogBox } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';


LogBox.ignoreLogs(['Warning: Failed prop type: Invalid prop `style` of type `array` supplied to `Cell`, expected `object`.']);

export default function ExerciseInProgress(props)
{
    const [serie, setSerie] = useState(0);
    const [series, setSeries] = useState([...props.selectedExercise.series]);
    const [restModalOpened, openRestModal] = useState(false);
    const [editSerie, setEditSerie] = useState(false);

    const arrangedSerieInfo = Object.keys(series[serie]).map((key, index) => {
        const serieKey = series[serie][key];
        if (index === 0)
            return {title: 'Repetitions', value: serieKey, index: 0}
        if (index === 1)
            return {title: 'Weight (Kg)', value: serieKey, index: 1}
        if (index === 2)
            return {title: 'Fail', value: (serieKey === true ? 'yes' : 'no'), index: 2}
        if (index === 3)
            return {title: 'Rest (Seconds)', value: serieKey, index: 3}
    });

    let seriesCount = props.selectedExercise.series.length;

    useLayoutEffect(()=> {
        props.navigation.setOptions({
            headerLeft: () => (
                <View>
                    <TouchableOpacity onPress={() => props.onExit()} style={{width:40, height: 40, alignSelf:'flex-start'}}>
                        <Icon name="angle-left" color={'orange'} size={40} solid style={{marginLeft:10}}/>
                    </TouchableOpacity>
                </View>
            )
        });
    },[props.navigation]);

    const finishRest = () => {
        if (serie + 2 > seriesCount)
        return;

        setSerie(serie+1);
        openRestModal(false);
    }

    const goBack = () => {
        if (serie == 0)
        return;

        setSerie(serie-1);
        openRestModal(false);
    }

    const openModal = () =>
    {
        if (serie + 2 > seriesCount)
            return;

        setSerie(serie+1);
        openRestModal(true);
    }

    const setExerciseValue = (newValue, index) => {
        let tempEditedSerie = {...series[serie]};
        switch(index)
        {
            case 0: tempEditedSerie = {...tempEditedSerie, reps: newValue}; 
            break;
            case 1: tempEditedSerie = {...tempEditedSerie, weight: newValue};
            break;
            case 2: tempEditedSerie = {...tempEditedSerie, fail: newValue === 'yes' ? 1 : 0};
            break;
            case 3: tempEditedSerie = {...tempEditedSerie, rest: newValue};
            break;
        }
        let tempSeries = {...series}
        tempSeries[serie] = tempEditedSerie
        setSeries(tempSeries);
    }

    const renderItem = ({ item }) => (
        <View style={styles.exerciseItemContainer}>
            <View style={styles.exerciseTitleContainer}>
                <Text style={styles.text}>{item.title}</Text>
            </View>
            
            <View style={[styles.exerciseValuesContainer, editSerie ? styles.editableExerciseContainer : styles.notEditableExerciseContainer]}>
                <TextInput 
                    key={item.index} 
                    value={item.value.toString()} 
                    keyboardType='numeric' 
                    editable={editSerie} 
                    onChangeText={newText => setExerciseValue(newText, item.index)}
                    style={styles.text}/> 
            </View>
        </View>
      );

    return (
        <View>
            <Image
            style={{width: '100%', height:150, alignSelf:'center'}}
                source={{
                    uri: props.selectedExercise.image
                }}
                resizeMode={"contain"}
            />
            <View style={{flexDirection:'row',justifyContent: 'center'}}>
                <Text style={{textAlign: "center", marginBottom: 20}} h2>Serie {serie+1}/{seriesCount}</Text>
                {editSerie ? 
                    <Icon name="save" size={25} color="orange" style={{marginTop: 11, marginLeft: 15}} onPress={() => setEditSerie(false)}/> :
                    <Icon name="pencil" size={25} color="orange" style={{marginTop: 11, marginLeft: 15}} onPress={() => setEditSerie(true)}/>
                }
            </View>
            <View>
                <FlatList
                    data={arrangedSerieInfo}
                    renderItem={renderItem}
                    contentContainerStyle={styles.exerciseDataContainer}
                />
            </View>
            {serie+1 < seriesCount && (
            <View style={styles.buttonsContainer}>
                {serie > 0 && (
                <TouchableOpacity
                    style={styles.touchableButton}
                    onPress={() => goBack()}>
                    <Text style={styles.text}>Back</Text>
                </TouchableOpacity>)}
                <TouchableOpacity
                    style={styles.touchableButton}
                    onPress={() => finishRest()}>
                    <Text style={styles.text}>Next</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.touchableButton}
                    onPress={() => null}>
                    <Text style={styles.text}>Skip</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.touchableButton}
                    onPress={() => openModal()}>
                    <Text style={styles.text}>Rest</Text>
                </TouchableOpacity>
            </View>)}
            {serie+1 === seriesCount && (
            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={styles.touchableButton}
                    onPress={() => props.onExerciseDone()}>
                    <Text style={styles.text}>Finish</Text>
                </TouchableOpacity>
            </View>)}
        </View>
    );
}

const styles = StyleSheet.create({
    text: { 
        textAlign: 'center',
        fontSize: 18
    },
    editTextInput: {
        backgroundColor: '#005f73', 
        borderStyle: 'solid',
        borderColor: '#FFFFFF'
    },
    editableExerciseContainer: {
        backgroundColor: '#FCF4C2',
        borderWidth: 1,
        borderColor: 'black'
    },
    exerciseItemContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginLeft: 100,
        marginRight: 100
    },
    notEditableExerciseContainer: {
        backgroundColor: '#005f73',
        borderBottomColor: 'white',
        borderBottomWidth:1
    },
    exerciseValuesContainer: {
        width: 80,
        padding: 6
    },
    exerciseTitleContainer: {
        backgroundColor: 'orange',
        width:150,
        padding: 10,
        borderBottomColor: 'white',
        borderBottomWidth:1
    },
    row: { 
        height: 60, 
        backgroundColor: '#F6F7Fb',
        padding: 10
    },
    touchableButton: {
        width: 90,
        height: 40,
        justifyContent: 'center',
        borderRadius: 50,
        backgroundColor: 'orange',
        marginBottom: 40
    },
    buttonsContainer: {
        flexDirection:'row',
        marginTop: 20, 
        justifyContent: 'space-around'
    }
});