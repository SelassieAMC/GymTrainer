import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native"
import { Card, Text, Button } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import trainingPlanImage from '../../images/dashboard/training-plan.jpg';
import improveDietImage from '../../images/dashboard/improve-diet.jpeg';
import bestTrainingImage from '../../images/dashboard/best-training.jpg';

export default function OldHome( { navigation })
{
    const date = new Date();
    const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
    const day = days[date.getDay()-1];
    const goToRoutine = () => {
        navigation.navigate('Routine');
    }
    
    return (
        <>
            <SafeAreaView>
                <ScrollView>
                    <Text style={styles.title}>Are you ready for your {day} workout?</Text>
                    <View style={{flex:1}}>
                        <TouchableOpacity 
                            style={styles.touchableButton} 
                            onPress={() => navigation.navigate('TodayExercise')}>
                            <Text style={styles.buttonText}>Start</Text>
                        </TouchableOpacity>
                        <Card containerStyle={styles.cardContainer}>
                            <Card.Title h4 style={styles.cardText} onPress={goToRoutine}>Your training plan</Card.Title>
                            <Card.Divider />
                            <Card.Image
                                style={{ padding: 0 }}
                                source={{
                                    uri: Image.resolveAssetSource(trainingPlanImage).uri
                                }}
                                onPress={goToRoutine}
                            />
                            <Text style={styles.cardText}>
                                Check your training plan for the next days.
                            </Text>
                        </Card>
                        <Card containerStyle={styles.cardContainer}>
                            <Card.Title h4 style={styles.cardText}>Best training</Card.Title>
                            <Card.Divider />
                            <Card.Image
                            style={{ padding: 0 }}
                            source={{
                                uri: Image.resolveAssetSource(bestTrainingImage).uri
                            }}
                            />
                            <Text style={styles.cardText}>
                            How to train that specific place of your body correctly and efficiently with our experts.
                            </Text>
                            <Button
                            buttonStyle={styles.cardButton}
                            title="More details"
                            />
                        </Card>
                        <Card containerStyle={styles.cardContainer}>
                            <Card.Title h4 style={styles.cardText}>Improve your diet</Card.Title>
                            <Card.Divider />
                            <Card.Image
                            style={{ padding: 0 }}
                            source={{
                                uri: Image.resolveAssetSource(improveDietImage).uri
                            }}
                            />
                            <Text style={styles.cardText}>
                            A good shape comes with a good diet, healthy food could help you to pottencialize your training gaining more energy with less fat.
                            </Text>
                            <Button
                            buttonStyle={styles.cardButton}
                            title="More details"
                            />
                        </Card>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        textAlign: "center", 
        fontSize: 40, 
        color: "black", 
        padding: 20
    },
    buttonText: {
        color: 'black', 
        fontSize: 30
    },
    touchableButton: {
        width: 150,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 200,
        backgroundColor: 'orange',
        alignSelf: 'center', 
        marginBottom: 40
    },
    cardContainer: {
        backgroundColor: 'black',
        borderRadius: 10
    },
    cardText: {
        color: 'white',
        paddingBottom: 10,
        paddingTop: 10
    },
    cardButton: {
        borderRadius: 100,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0
    }
});