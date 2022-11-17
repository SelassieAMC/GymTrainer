import React, { useState } from "react";
import { Button, Text } from "react-native-elements";
import {StyleSheet, TouchableOpacity, View, TextInput, FlatList, LogBox, SafeAreaView, ScrollView} from "react-native";
import CustomDropdown from "../common/Dropdown";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Title } from "react-native-paper";
import darkStyles from '../common/DarkStyles';
import CustomCardBackground from "../common/CustomCardBackground";

LogBox.ignoreLogs(['Warning: Failed prop type: Invalid prop `style` of type `array` supplied to `Cell`, expected `object`.']);

export default function ExerciseInProgress(props)
{
    const [serie, setSerie] = useState(0);
    const [series, setSeries] = useState([...props.selectedExercise.series]);
    // const [restModalOpened, openRestModal] = useState(false);
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

    const finishRest = () => {
        if (serie + 2 > seriesCount)
            return;

        setSerie(serie+1);
        //openRestModal(false);
    }

    const goBack = () => {
        if (serie == 0)
            return;

        setSerie(serie-1);
        //openRestModal(false);
    }

    const openModal = () => {
        if (serie + 2 > seriesCount)
            return;

        setSerie(serie+1);
        //openRestModal(true);
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
                {item.index !== 3 && 
                <TextInput 
                    key={item.index} 
                    value={item.value.toString()} 
                    keyboardType='numeric' 
                    editable={editSerie} 
                    onChangeText={newText => setExerciseValue(newText, item.index)}
                    style={styles.text}/>}
                {item.index === 3 && !editSerie &&
                    <Text style={styles.text}>{item.value ? 'Yes' : 'No'}</Text>} 
                {item.index === 3 && editSerie &&
                    <CustomDropdown 
                        data={[{label: 'Yes', value: true}, {label: 'No', value: false}]} 
                        dropdownStyle={{width:100, borderWidth: 0}}
                        selectedTextStyle={{fontSize: 18}} 
                        onSelectedValue={newText => setExerciseValue(newText, item.index)}
                        defaultValue={item.value}
                    />}
            </View>
        </View>
      );

    return (
        <SafeAreaView style={darkStyles.backgroundDark}>
            <CustomCardBackground
                titleStyle={styles.exerciseTitle}
                titleContainerStyle={styles.titleContainer}
                uriImage={props.selectedExercise.image}
                title={props.selectedExercise.name}/>
            <View style={{flexDirection:'row',justifyContent: 'center', marginTop: 20, marginBottom: 20}}>
                <Title style={{textAlign: "center", fontSize: 28, color: '#40d876'}}>Serie {serie+1}/{seriesCount}</Title>
                {editSerie ?
                    <Icon name="save" size={25} color="#f29316" style={{marginLeft: 15}} onPress={() => setEditSerie(false)}/> :
                    <Icon name="edit" size={30} color="#f29316" style={{marginLeft: 15}} onPress={() => setEditSerie(true)}/>
                }
            </View>
            <View>
                <FlatList
                    data={arrangedSerieInfo}
                    renderItem={renderItem}
                    contentContainerStyle={[styles.exerciseDataContainer, editSerie ? {height: 220} : {}]}
                />
            </View>
            {serie+1 < seriesCount && !editSerie && (
                <>
                    <View style={styles.buttonsContainer}>
                        <Button
                            icon={
                                <Icon
                                    name="backward"
                                    size={19}
                                    color="#FFF"
                                    style={{marginRight:10}}
                                />
                            }
                            type="outline"
                            disabled={serie <= 0}
                            disabledStyle={styles.buttonDisabledStyle}
                            titleStyle={styles.buttonText}
                            buttonStyle={styles.touchableButton}
                            onPress={() => goBack()}
                            title="Back"
                        />
                        <Button
                            icon={
                                <Icon
                                    name="clock"
                                    size={19}
                                    color="#FFF"
                                    style={{marginRight:10}}
                                />
                            }
                            type="outline"
                            disabled={serie <= 0}
                            disabledStyle={styles.buttonDisabledStyle}
                            titleStyle={styles.buttonText}
                            buttonStyle={styles.touchableButton}
                            onPress={() => openModal()}
                            title='Rest'
                        />
                        <Button
                            icon={
                                <Icon
                                    name="forward"
                                    size={19}
                                    color="#FFF"
                                    style={{marginRight:10}}
                                />
                            }
                            type="outline"
                            disabled={serie.id === series.length}
                            titleStyle={styles.buttonText}
                            disabledStyle={styles.buttonDisabledStyle}
                            buttonStyle={styles.touchableButton}
                            onPress={() => finishRest()}
                            title='Next'
                        />
                    </View>
                    <View style={styles.alertButtonContainer}>
                        <Button
                            icon={
                                <Icon
                                    name="forward"
                                    size={19}
                                    color="#FFF"
                                    style={{marginRight:10}}
                                />
                            }
                            type="outline"
                            disabled={editSerie}
                            titleStyle={styles.buttonText}
                            buttonStyle={[styles.touchableButton, styles.alertButton]}
                            onPress={() => null}
                            title='Skip'
                        />
                        <Button
                            icon={
                                <Icon
                                    name="exit"
                                    size={19}
                                    color="#FFF"
                                    style={{marginRight:10}}
                                />
                            }
                            type="outline"
                            titleStyle={styles.buttonText}
                            buttonStyle={[styles.touchableButton, styles.alertButton]}
                            onPress={() => props.onExit()}
                            title='Exit'
                        />
                    </View>
                </>
            )}
            {serie+1 === seriesCount && (
                <View style={styles.buttonsContainer}>
                    <Button
                        icon={
                            <Icon
                                name="square"
                                solid
                                size={19}
                                color="#FFF"
                                style={{marginRight:10}}
                            />
                        }
                        type="outline"
                        titleStyle={styles.buttonText}
                        buttonStyle={[styles.touchableButton, styles.alertButton]}
                        onPress={() => props.onExerciseDone()}
                        title='Finish'
                    />
                </View>)}
        </SafeAreaView>
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
        height: 190
    },
    touchableButton: {
        width: 100,
        height: 40,
        justifyContent: 'center',
        borderRadius: 50,
        marginBottom: 40,
        backgroundColor: '#40d876'
    },
    alertButton: {
        backgroundColor: '#f29316',
        width: 120
    },
    buttonText: {
        color: '#000'
    },
    buttonsContainer: {
        flexDirection:'row',
        marginTop: 20, 
        justifyContent: 'space-around',
        width: '80%',
        alignSelf: 'center'
    },
    buttonDisabledStyle: {
        backgroundColor: '#9cd2b2'
    },
    alertButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: 250,
        alignSelf: 'center'
    },
    exerciseTitle: {
        color: '#000',
        width: '100%'
    },
    titleContainer: {
        backgroundColor: 'rgba(64,216,118,0.29)',
        height: 50
    }
});