import React, { useState, useRef } from "react";
import { Button, Text } from "react-native-elements";
import {StyleSheet, View, SafeAreaView} from "react-native";
import { Title } from "react-native-paper";
import CustomCardBackground from "../common/CustomCardBackground";
import darkStyles from "../common/DarkStyles.js";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import CustomMenu from "../common/CustomMenu";

// LogBox.ignoreLogs(['Warning: Failed prop type: Invalid prop `style` of type `array` supplied to `Cell`, expected `object`.']);

export default function ExerciseInProgress2(props)
{
    const [serie, setSerie] = useState(0);
    const [series, setSeries] = useState([...props.selectedExercise.series]);
    const [countDownStart, setCountDownStart] = useState(false);
    const [openExerciseMenu, setOpenExerciseMenu] = useState(false);
    
    let seriesCount = props.selectedExercise.series.length;

    const finishRest = () => {
        if (serie + 2 > seriesCount)
            return;
        setCountDownStart(false);
        setSerie(serie+1);
    }

    const goBack = () => {
        if (serie === 0)
            return;
        setCountDownStart(false);
        setSerie(serie-1);
    }
    
    const readableTime = (time) =>
    {
        const minutes = Math.floor(time / 60);
        const seconds = time - minutes * 60;
        return str_pad_left(minutes,'0',2)+':'+str_pad_left(seconds,'0',2);
    }

    function str_pad_left(string,pad,length) {
        return (new Array(length+1).join(pad)+string).slice(-length);
    }
    
    return (
        <SafeAreaView style={[darkStyles.backgroundDark]}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 10}}>
                <Title style={{color: '#FFF', fontSize: 24, maxWidth: '70%'}}>{props.selectedExercise.name}</Title>
                        <View style={{flexDirection: 'row'}}>
                            <Title style={{textAlign: "center", fontSize: 20, color: '#40d876'}}>Serie {serie+1}/{seriesCount}</Title>
                        </View>
            </View>
            <View style={{flexDirection: 'row', height: 350}}>
                <CustomCardBackground uriImage={props.selectedExercise.image} style={{height: '100%', flex: 2, marginTop: 0}} imageResizeMode={'stretch'}/>
                <View style={{justifyContent: 'space-between', borderRadius: 15, alignSelf: 'flex-end', padding: 5,height: '100%'}}>
                    <View style={{width: 80, height: 80, backgroundColor:'#242538', borderRadius: 50, alignItems: 'center', justifyContent: 'space-between',  borderColor: '#40d876', borderWidth: 3, padding: 5, borderTopWidth: 1}}>
                        <FontAwesome5 name="clock" color='#E68D33' size={30}/>
                        <Text style={{color: '#FFF', fontSize: 11}}>Repetitions</Text>
                        <Text style={{color: '#FFF', fontSize: 16}}>{series[serie].reps}</Text>
                    </View>
                    <View style={{width: 80, height: 80, backgroundColor:'#242538', borderRadius: 50, alignItems: 'center', justifyContent: 'space-between', borderColor: '#40d876', borderWidth: 3, padding: 5, borderTopWidth: 1}}>
                        <FontAwesome5 name="dumbbell" color='#E68D33' size={30}/>
                        <Text style={{color: '#FFF', fontSize: 11}}>Weight (kg)</Text>
                        <Text style={{color: '#FFF', fontSize: 16}}>{series[serie].weight}</Text>
                    </View>
                    <View style={{width: 80, height: 80, backgroundColor:'#242538', borderRadius: 50, alignItems: 'center', justifyContent: 'space-between', borderColor: '#40d876', borderWidth: 3, padding: 5, borderTopWidth: 1}}>
                        <FontAwesome5 name="fire" color='#E68D33' size={30}/>
                        <Text style={{color: '#FFF', fontSize: 11}}>Fail</Text>
                        <Text style={{color: '#FFF', fontSize: 16}}>{series[serie].fail ? 'Yes' : 'No'}</Text>
                    </View>
                    <View style={{width: 80, height: 80, backgroundColor:'#242538', borderRadius: 50, alignItems: 'center', justifyContent: 'space-between', borderColor: '#40d876', borderWidth: 3, padding: 5, borderTopWidth: 1}}>
                        <FontAwesome5 name="clock" color='#E68D33' size={30}/>
                        <Text style={{color: '#FFF', fontSize: 12}}>Rest (sec)</Text>
                        <Text style={{color: '#FFF', fontSize: 16}}>{series[serie].rest ?? 60}</Text>
                    </View>
                </View>
            </View>
            <View style={{alignItems: 'center', marginTop: 30, justifyContent: 'center', height: 200}}>
                <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                    <Button 
                        type='clear' 
                        titleStyle={{color: '#FFF', fontSize: 24, margin: 10}}
                        title='Back'
                        onPress={() => goBack()}
                    />
                    <View style={{height:130, width: 130, alignItems: 'center', justifyContent: 'flex-end'}}>
                        {
                            countDownStart ? <CountdownCircleTimer
                            key={serie}
                            isPlaying={countDownStart}
                            duration={series[serie].rest ?? 60}
                            size={120}
                            strokeWidth={10}
                            trailColor='#40d876'
                            colors={['#E68D33']}
                            colorsTime={[50]}>
                                {({ remainingTime }) => <Text style={{color: '#FFF', fontSize: 28}}>{readableTime(remainingTime)}</Text>}
                            </CountdownCircleTimer> :
                            <>
                                <Text style={{color: '#FFF', fontSize: 34, margin: 10}}>{readableTime(series[serie].rest ?? 60)}</Text>
                                <Button
                                    type="outline"
                                    buttonStyle={{width:80, height: 80, borderRadius: 20, borderColor: '#40d876', borderWidth: 1, marginLeft: 'auto', marginRight: 'auto'}}
                                    icon={
                                        <FontAwesome5
                                            name="play"
                                            solid
                                            size={30}
                                            color='#E68D33'
                                        />
                                    }
                                    onPress={() => setCountDownStart(true)}/>
                            </>
                        }
                    </View>
                    <Button
                        type='clear'
                        titleStyle={{color: '#FFF', fontSize: 24, margin: 10}}
                        title='Next'
                        disabled={serie.id === series.length}
                        onPress={() => finishRest()}
                    />
                </View>
                <Button titleStyle={{color: '#FFF', fontSize: 24, margin: 10}} type='clear' title='Exit' onPress={()=> props.onExit()}/>
            </View>

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