import React, { useEffect, useState } from 'react';
import {StyleSheet, Text, TextInput, View} from "react-native";
import CustomModal from "./CustomModal";
import CustomDropdown from "./common/CustomDropdown";
import {Button} from "react-native-elements";

export default function EditExerciseSerie(props)
{
    const [currentSerie, setCurrentSerie] = useState({...props.series[props.serie]});
    
    useEffect(() => {
        setCurrentSerie({...props.series[props.serie]});
    }, [props.serie]);
    
    const handleSaveAction = () => {
        let tempSeries = {...props.series}
        tempSeries[props.serie] = currentSerie;
        props.setSeries(tempSeries);
        props.visibilityState[1](false);
    }
    
    const handleCancelAction = () => {
        props.visibilityState[1](false);
    }
    
    return (
        <CustomModal visibilityState={props.visibilityState} title="Edit your current serie">
            <View style={{marginTop: 10, marginBottom: 10, alignItems: 'center'}}>
                <Text>Repetitions</Text>
                <TextInput
                    value={currentSerie.reps?.toString()}
                    keyboardType='numeric'
                    editable={true}
                    onChangeText={newText => setCurrentSerie({...currentSerie, reps: newText})}
                    style={styles.inputEditor}/>
                <Text>Weight (Kg)</Text>
                <TextInput
                    value={currentSerie.weight?.toString()}
                    keyboardType='numeric'
                    editable={true}
                    onChangeText={newText => setCurrentSerie({...currentSerie, weight: newText})}
                    style={styles.inputEditor}/>
                <Text>Rest (Sec)</Text>
                <TextInput
                    value={currentSerie.rest?.toString() ?? '60'}
                    keyboardType='numeric'
                    editable={true}
                    onChangeText={newText => setCurrentSerie({...currentSerie, rest: newText})}
                    style={styles.inputEditor}/>
                <Text>Fail</Text>
                <CustomDropdown
                    data={[{label: 'Yes', value: true}, {label: 'No', value: false}]}
                    dropdownStyle={{width:100, borderWidth: 1, padding: 5, borderColor: '#000'}}
                    selectedTextStyle={{fontSize: 18, textAlign: 'center'}}
                    onSelectedValue={newText => setCurrentSerie({...currentSerie, fail: newText})}
                    defaultValue={currentSerie?.fail}
                />
            </View>
            <View style={{flexDirection: 'row'}}>
                <Button type='clear' title='Cancel' onPress={() => handleCancelAction()}/>
                <Button type='clear' title='Save' onPress={() => handleSaveAction()}/>
            </View>
        </CustomModal>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        alignSelf: "center"
    },
    inputEditor: {
        borderWidth: 1,
        width: 100,
        borderRadius: 5,
        textAlign: 'center',
        padding: 5,
        fontSize: 24,
        margin: 5
    }
});
