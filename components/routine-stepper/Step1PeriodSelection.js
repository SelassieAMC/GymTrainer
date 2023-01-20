import {Text, View} from "react-native";
import {Picker} from "@react-native-picker/picker";
import CustomCheckBox from "../common/CustomCheckBox";
import {Button} from "react-native-elements";
import React, {useState} from "react";

export default function Step1PeriodSelection(props)
{
    const [weeksAmount, setWeeksAmount] = useState(1);
    const [daysSelectionInfo, setDaysSelected] = useState([...props.weekdays]);
    
    const handleWeeksSelection = (value) => {
        setWeeksAmount(value);
        props.handleWeeksSelection(value);
    }
    
    const handleDaysSelection = (dayIndex, currentState) => {
        setDaysSelected(prevDays => {
            return [...prevDays, prevDays[dayIndex].checked = !currentState];
        });
        props.handleDaysSelection([...daysSelectionInfo]);
    }
    
    return (
        <>
            <Text style={{color:'#FFF', fontSize: 18, marginLeft: 10, marginTop: 10, marginBottom: 10}}>Repeat routine for the next:</Text>
            <Picker
                style={{margin: -20, padding: 0}}
                selectedValue={weeksAmount.toString()}
                onValueChange={value => handleWeeksSelection(value)}>
                <Picker.Item label='1 week' value='1' color='#FFF'/>
                <Picker.Item label='2 week' value='2' color='#FFF'/>
                <Picker.Item label='3 week' value='3' color='#FFF'/>
                <Picker.Item label='4 week' value='4' color='#FFF'/>
                <Picker.Item label='5 week' value='5' color='#FFF'/>
            </Picker>
            <Text style={{color:'#FFF', fontSize: 18, marginLeft: 10, marginTop: 10, marginBottom: 20}}>Days planned to work:</Text>
            <View style={{ alignSelf: 'center', justifyContent: 'space-around', height: 300}}>
                {daysSelectionInfo.map((day, index) => {
                    if (day.name)
                        return <CustomCheckBox
                            key={day.name}
                            label={day.name}
                            status={day.checked}
                            onPress={() => handleDaysSelection(index, day.checked)}/>
                })}
            </View>
        </>
    )
}