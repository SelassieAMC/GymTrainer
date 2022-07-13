import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native-elements";
import { Table, TableWrapper, Cell } from "react-native-table-component";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function ExerciseInProgress(props)
{
    const [serie, setSerie] = useState(0);
    const [restModalOpened, openRestModal] = useState(false);
    let serieData = props.selectedExercise.series[serie];
    let seriesCount = props.selectedExercise.series.length;
    let headers = ['Repetitions', 'Weight (Kg)', 'Fail', 'Rest (Seconds)'];
    let serieInfo = [serieData?.reps, serieData?.weight, serieData?.fail, serieData?.rest];

    const finishRest = () => {
        if (serie + 2 > seriesCount)
        return;

        setSerie(serie+1);
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
        <SafeAreaView>
            <Text style={{textAlign: "center", marginBottom: 20}} h3>Serie {serie+1}/{seriesCount}</Text>
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
                                <Cell key={index} data={index === 2 ? (cell ? 'Yes' : 'No') : cell} height={50} width={50} style={[styles.row, index%2 && {backgroundColor: '#005f73', color: 'white'}]} textStyle={styles.text}/>
                            ))
                        }
                    </TableWrapper>
                </Table>
                {serie+1 < seriesCount && (<View style={styles.buttonsContainer}>
                    <TouchableOpacity
                        style={styles.touchableButton}
                        onPress={() => finishRest()}>
                        <Text style={styles.text}>Next</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.touchableButton}
                        onPress={() => openModal()}>
                        <Text style={styles.text}>Rest</Text>
                    </TouchableOpacity>
                </View>)}
                {serie+1 === seriesCount && (<View style={styles.buttonsContainer}>
                    <TouchableOpacity
                        style={styles.touchableButton}
                        onPress={() => props.onExerciseDone()}>
                        <Text style={styles.text}>Finish</Text>
                    </TouchableOpacity>
                </View>)}
        </SafeAreaView>
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
        width: 100,
        height: 50,
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