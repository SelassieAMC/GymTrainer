import React, { useLayoutEffect, useState } from "react";
import { Text } from "react-native-elements";
import { StyleSheet, TouchableOpacity, View, Image, TextInput, FlatList } from "react-native";
import { LogBox } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import DropDownPicker from 'react-native-dropdown-picker';


LogBox.ignoreLogs(['Warning: Failed prop type: Invalid prop `style` of type `array` supplied to `Cell`, expected `object`.']);

export default function ExerciseInProgress(props)
{
    const [serie, setSerie] = useState(0);
    const [series, setSeries] = useState([...props.selectedExercise.series]);
    const [restModalOpened, openRestModal] = useState(false);
    const [editSerie, setEditSerie] = useState(false);

    const [openDropdown, setOpenDropdown] = useState(false);

    const arrangedSerieInfo = Object.keys(series[serie]).map((key, index) => {
        const serieKey = series[serie][key];
        switch(key)
        {
            case 'reps': 
                return {title: 'Repetitions', value: serieKey, index: 0}
            case 'weight': 
                return {title: 'Weight (Kg)', value: serieKey, index: 1}
            case 'rest': 
                return {title: 'Rest (Seconds)', value: serieKey, index: 2}
            case 'fail': 
                return {title: 'Fail', value: serieKey, index: 3} 
        }      
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
            case 2: tempEditedSerie = {...tempEditedSerie, rest: newValue};
            break;
            case 3: tempEditedSerie = {...tempEditedSerie, fail: newValue};
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
                {item.index !== 3 ? 
                <TextInput 
                    key={item.index} 
                    value={item.value.toString()} 
                    keyboardType='numeric' 
                    editable={editSerie} 
                    onChangeText={newText => setExerciseValue(newText, item.index)}
                    style={styles.text}/> :
                !editSerie ? 
                    <Text style={styles.text}>{item.value ? 'Yes' : 'No'}</Text> :
                    <DropDownPicker
                        open={openDropdown}
                        setOpen={setOpenDropdown}
                        items={[{label: 'Yes', value: true}, {label: 'No', value: false}]}
                        key={item.index}
                        value={item.value}
                        textStyle={styles.dropdownText}
                        containerStyle={{borderColor: '#FCF4C2',zIndex:10000}}
                        dropDownContainerStyle={{borderColor: '#FCF4C2',zIndex:10000}}
                        style={{borderColor: 'white', backgroundColor: '#FCF4C2',zIndex:10000}}
                        zIndex={10000}
                        setValue={newText => setExerciseValue(newText(), item.index)}/>}
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
                    <Icon name="save" size={25} color="#f29316" style={{marginTop: 11, marginLeft: 15}} onPress={() => setEditSerie(false)}/> :
                    <Icon name="edit" size={30} color="#f29316" style={{marginTop: 11, marginLeft: 15}} onPress={() => setEditSerie(true)}/>
                }
            </View>
            <View>
                <FlatList
                    data={arrangedSerieInfo}
                    renderItem={renderItem}
                    contentContainerStyle={styles.exerciseDataContainer}
                />
            </View>
            {serie+1 < seriesCount && !editSerie && (
            <View style={styles.buttonsContainer}>
                {serie > 0 && (
                <TouchableOpacity
                    disabled={editSerie}
                    style={styles.touchableButton}
                    onPress={() => goBack()}>
                    <Text style={styles.text}>Back</Text>
                </TouchableOpacity>)}
                <TouchableOpacity
                    disabled={editSerie}
                    style={styles.touchableButton}
                    onPress={() => finishRest()}>
                    <Text style={styles.text}>Next</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    disabled={editSerie}
                    style={styles.touchableButton}
                    onPress={() => null}>
                    <Text style={styles.text}>Skip</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    disabled={editSerie}
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
        fontSize: 18,
        alignSelf: "center"
    },
    dropdownText: { 
        textAlign: 'center',
        fontSize: 16
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
        width: 120,
        padding: 6,
        justifyContent: 'center'
    },
    exerciseTitleContainer: {
        backgroundColor: '#f29316',
        width:150,
        padding: 10,
        borderBottomColor: 'white',
        borderBottomWidth:1,
        justifyContent: 'center'
    },
    exerciseDataContainer: {
        height: 230
    },
    touchableButton: {
        width: 90,
        height: 40,
        justifyContent: 'center',
        borderRadius: 50,
        backgroundColor: '#f29316',
        marginBottom: 40
    },
    buttonsContainer: {
        flexDirection:'row',
        marginTop: 20, 
        justifyContent: 'space-around'
    }
});