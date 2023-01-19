import {TextInput, Text, StyleSheet, ImageBackground, ScrollView, View, Alert} from "react-native";
import Dropdown from "../../common/Dropdown";
import React, {useEffect, useState} from "react";
import {Button} from "react-native-elements";
import backgroundImage from '../../../images/add-exercise-background.png';
import darkStyles from '../../common/DarkStyles';
import LinearGradient from "react-native-linear-gradient"
import {Title} from "react-native-paper";

export default function AddExercise()
{
    const [categories, setCategories] = useState([]);
    const [muscles, setMuscles] = useState([]);
    const [exerciseData, setExerciseData] = useState({});
    
    const [selectedCategories, setSelectedCats] = useState([]);
    const [selectedMuscles, setSelectedMuscles] = useState([]);

    const fetchCategories = () => {
        return fetch("https://c19b-191-108-26-96.ngrok.io/api/v1/categories",
            {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(error => console.log(error));
    };

    const fetchMuscles = () => {
        return fetch("https://c19b-191-108-26-96.ngrok.io/api/v1/muscles",
            {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => setMuscles(data))
            .catch(error => console.log(error));
    };
    
    useEffect(()=> {//
       fetchMuscles();
       fetchCategories();
    },[])
    
    const saveExercise = () => {
        fetch("https://c19b-191-108-26-96.ngrok.io/api/v1/exercises",
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(exerciseData)
            })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(error => console.log(error));
    }
    
    return (
        <View style={darkStyles.backgroundDark}>
                <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
                    <LinearGradient
                        colors={['#131429', '#13142901', '#131429']}
                        style={{height : '100%', width : '100%'}}>
                        { categories.length > 0 && muscles.length > 0 &&
                            <ScrollView style={styles.container}>
                                <Title style={darkStyles.bigTitle}>Create an exercise</Title>
                                <TextInput 
                                    placeholder="Name" 
                                    value={exerciseData.name} 
                                    onChangeText={(val) => setExerciseData({...exerciseData, name: val})} 
                                    placeholderTextColor="#8c8c8c" 
                                    style={[styles.text, styles.input]}/>
                                <TextInput 
                                    placeholder="Url Image"
                                    value={exerciseData.image}
                                    onChangeText={(val) => setExerciseData({...exerciseData, image: val})}
                                    placeholderTextColor="#8c8c8c" 
                                    style={[styles.text, styles.input]}/>
                                <TextInput 
                                    placeholder="Description" 
                                    multiline={true}
                                    value={exerciseData.description}
                                    onChangeText={(val) => setExerciseData({...exerciseData, description: val})}
                                    placeholderTextColor="#8c8c8c" 
                                    style={[styles.text, styles.input, styles.multiLine]}/>
                                <Text style={styles.text}>Categories</Text>
                                <Dropdown
                                    data={categories}
                                    isMultiSelect={true}
                                    dropdownStyle={styles.dropdown}
                                    selectedTextStyle={darkStyles.textWhite}
                                    label={"name"}
                                    value={"id"}
                                    iconName="calendar-times"
                                    onSelectedValue={values => 
                                        setExerciseData(
                                            {...exerciseData, 
                                                categories: values.map(val => { return { id: val }})})}/>
                                <Text style={styles.text}>Muscles</Text>
                                <Dropdown
                                    data={muscles}
                                    isMultiSelect={true}
                                    dropdownStyle={styles.dropdown}
                                    label={"name"}
                                    value={"id"}
                                    iconName="calendar-times"
                                    selectedTextStyle={darkStyles.textWhite}
                                    onSelectedValue={values => 
                                        setExerciseData(
                                            {...exerciseData,
                                                musclesWorked: values.map(val => { return{ id: val }})})}/>
                                <Button
                                    type="outline"
                                    title="Finish"
                                    onPress={() =>saveExercise()}
                                    containerStyle={styles.submitButton}
                                    buttonStyle={darkStyles.button}
                                    titleStyle={styles.textButton}
                                />
                            </ScrollView>
                        }
                    </LinearGradient>
                </ImageBackground>
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
      marginTop: 100,
      marginLeft: 30,
      marginRight: 30  
    },
    text: {
        color: '#fff',
        fontSize: 18,
        padding: 10
    },
    input: {
        borderColor: '#40d876',
        borderWidth: .5,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 5,
        minHeight: 40
    },
    multiLine: {
        minHeight: 80
    },
    backgroundImage: {
        minHeight: '90%'
    },
    submitButton: {
        marginTop: 20,
        backgroundColor: '#40d876'
    },
    textButton: {
        color: '#131429',
        fontSize: 22,
        fontWeight: 'bold'
    },
    dropdown: {
        borderColor: '#40d876'
    }
});
