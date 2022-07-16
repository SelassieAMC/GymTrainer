import React, { useLayoutEffect, useState } from "react";
import { Button, Text } from "react-native-elements";
import { Table, TableWrapper, Cell } from "react-native-table-component";
import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
import { LogBox } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

LogBox.ignoreLogs(['Warning: Failed prop type: Invalid prop `style` of type `array` supplied to `Cell`, expected `object`.']);

export default function ExerciseInProgress(props)
{
    const [serie, setSerie] = useState(0);
    const [restModalOpened, openRestModal] = useState(false);
    let serieData = props.selectedExercise.series[serie];
    let seriesCount = props.selectedExercise.series.length;
    let headers = ['Repetitions', 'Weight (Kg)', 'Fail', 'Rest (Seconds)'];
    let serieInfo = [serieData?.reps, serieData?.weight, serieData?.fail, serieData?.rest];
    
    useLayoutEffect(()=> {
        props.navigation.setOptions({
            headerLeft: () => (
                <View>
                    <TouchableOpacity onPress={() => props.onExit()} style={{width:40, height: 40, alignSelf:'flex-start'}}>
                        <FontAwesome name="angle-left" color={'orange'} size={40} solid style={{marginLeft:10}}/>
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

    return (
        <View>
            <Image
            style={{width: '100%', height:150, alignSelf:'center'}}
                source={{
                    uri: props.selectedExercise.image
                }}
                resizeMode={"contain"}
            />
            <Text style={{textAlign: "center", marginBottom: 20}} h2>Serie {serie+1}/{seriesCount}</Text>     
                <View>
                    <Table style={{flexDirection: 'row', alignSelf: 'center'}}> 
                        <TableWrapper>
                            {
                                headers.map((cell, index) => (
                                    <Cell key={index} data={cell} height={50} style={[styles.row, index%2 && {backgroundColor: '#005f73', color: 'white'}]} textStyle={styles.text}/>
                                ))
                            }
                        </TableWrapper>
                        <TableWrapper>
                            {
                                serieInfo.map((cell, index) => (
                                    <Cell key={index} data={index === 2 ? (cell ? 'Yes' : 'No') : cell} height={50} width={60} style={[styles.row, index%2 && {backgroundColor: '#005f73', color: 'white'}]} textStyle={styles.text}/>
                                ))
                            }
                        </TableWrapper>
                    </Table>
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