import React, { useState } from "react";
import { Button, Text } from "react-native-elements";
import {StyleSheet, View, SafeAreaView, TouchableOpacity} from "react-native";
import { Title } from "react-native-paper";
import darkStyles from "../common/DarkStyles.js";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import CustomMenu from "../common/CustomMenu";
import {readableTime} from "../common/helpers/Utils";
import EditExerciseSerie from "../EditExerciseSerie";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import {BackgroundImage} from "react-native-elements/dist/config";
import SquareIconInfo from "../SquareIconInfo";

export default function ExerciseInProgress(props)
{
    const [serie, setSerie] = useState(0);
    const [series, setSeries] = useState([...props.selectedExercise.series]);
    const [countDownStart, setCountDownStart] = useState(false);
    const showEditMenu = useState(false);
    
    let seriesCount = props.selectedExercise.series.length;

    const finishRest = () => {
        if (serie + 2 > seriesCount) return;
        setCountDownStart(false);
        setSerie(serie+1);
    }

    const goBack = () => {
        if (serie === 0) return;
        setCountDownStart(false);
        setSerie(serie-1);
    }
    
    const handleEditSerie = () => {
        showEditMenu[1](true);
    }
    
    const routineOptions = () => {
        return [
            { 
                title: 'Edit',
                actionHandler: handleEditSerie
            }
        ]
    }
    
    return (
        <SafeAreaView style={[darkStyles.backgroundDark]}>
            <EditExerciseSerie visibilityState={showEditMenu} series={series} serie={serie} setSeries={setSeries}/>
            <View style={styles.titleContainer}>
                <Title style={styles.title}>{props.selectedExercise.name}</Title>
            </View>
            <BackgroundImage source={{uri: props.selectedExercise.image}} style={styles.exerciseCard} resizeMode='cover'>
                <TouchableOpacity onPress={()=> alert('Display details')}>
                    <View style={styles.infoButtonContainer}>
                        <FontAwesome
                            name="info-circle"
                            solid
                            size={20}
                            color='#E68D33'
                        />
                    </View>
                </TouchableOpacity>
            </BackgroundImage>
            <View style={styles.startCardsContainer}>
                <SquareIconInfo title='Repetitions' iconName='clock' iconSize={30} value={series[serie].reps}/>
                <SquareIconInfo title='Weight (kg)' iconName='dumbbell' iconSize={30} value={series[serie].weight}/>
                <SquareIconInfo title='Fail' iconName='fire' iconSize={30} value={series[serie].fail ? 'Yes' : 'No'}/>
                <SquareIconInfo title='Rest (sec)' iconName='clock' iconSize={30} value={series[serie].rest ?? 60}/>
            </View>
            <View style={styles.actionsContainer}>
                <View style={styles.serieCountContainer}>
                    <Title style={styles.serieCounter}>Serie {serie+1}/{seriesCount}</Title>
                    <CustomMenu 
                        options={routineOptions()}
                        menuOptionsStyle={{borderBottomLeftRadius: 0, borderBottomRightRadius: 10}}
                        textOptionsStyle={{fontSize: 24}}/>
                </View>
                
                <View style={styles.buttonsContainer}>
                    <Button 
                        type='clear' 
                        titleStyle={styles.moveExerciseButton}
                        title='Back'
                        onPress={() => goBack()}
                    />
                    <View style={styles.restCountDownContainer}>
                        {countDownStart ? 
                            <CountdownCircleTimer
                                key={serie}
                                isPlaying={countDownStart}
                                duration={series[serie].rest ?? 60}
                                size={120}
                                strokeWidth={10}
                                trailColor='#40d876'
                                colors={['#a33115']}
                                colorsTime={[50]}>
                                {({ remainingTime }) => 
                                    <Text style={styles.countDown}>{readableTime(remainingTime)}</Text>}
                            </CountdownCircleTimer> :
                            <>
                                <Text style={styles.restInfo}>{readableTime(series[serie].rest ?? 60)}</Text>
                                <Button
                                    type="outline"
                                    buttonStyle={styles.playButton}
                                    icon={
                                        <FontAwesome5
                                            name="play"
                                            solid
                                            size={30}
                                            color='#a33115'
                                        />
                                    }
                                    onPress={() => setCountDownStart(true)}/>
                            </>
                        }
                    </View>
                    <Button
                        type='clear'
                        titleStyle={styles.moveExerciseButton}
                        title='Next'
                        disabled={serie === series.length - 1}
                        onPress={() => finishRest()}
                    />
                </View>
                <Button titleStyle={styles.moveExerciseButton} type='clear' title='Exit' onPress={()=> props.onExit()}/>
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    titleContainer: { flexDirection: 'row', justifyContent: 'center', margin: 30 },
    title: {color: '#40d876', fontSize: 32, maxWidth: '95%', textAlign: 'center'},
    exerciseCirclesContainer: { 
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 15,
        alignSelf: 'flex-end',
        padding: 5,width: '100%'
    },
    cardContainer: {flexDirection: 'row', height: 270},
    cardBackground: {height: '100%', flex: 2, marginTop: 0, backgroundColor: '#004368'},
    actionsContainer: {alignItems: 'center', marginTop: 50, justifyContent: 'center', height: 200},
    serieCountContainer: {flexDirection: 'row'},
    serieCounter: {textAlign: "center", fontSize: 26, color: '#40d876'},
    buttonsContainer: {flexDirection: 'row', alignItems: 'flex-end'},
    moveExerciseButton: {color: '#FFF', fontSize: 24, margin: 10},
    playButton: {
        width:80,
        height: 80,
        borderRadius: 20,
        borderColor: '#40d876',
        borderWidth: 1,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    restInfo: {color: '#FFF', fontSize: 34, margin: 10},
    countDown: {color: '#FFF', fontSize: 28},
    restCountDownContainer: {height:130, width: 130, alignItems: 'center', justifyContent: 'flex-end'},
    exerciseCard: {
        borderWidth: 0,
        width: '100%',
        height: 280,
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },
    infoButtonContainer: {
        borderRadius: 10,
        backgroundColor: 'rgba(19, 20, 41, 0.6)',
        height: 60,
        width: 60,
        justifyContent: "space-evenly",
        alignItems: "center",
        margin: 10
    },
    startCardsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    }
});