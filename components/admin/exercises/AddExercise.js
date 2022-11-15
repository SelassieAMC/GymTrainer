import {TextInput, Text, StyleSheet, ImageBackground, ScrollView, View} from "react-native";
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
    
    const [selectedCategories, setSelectedCats] = useState([]);
    const [selectedMuscles, setSelectedMuscles] = useState([]);

    const fetchCategories = () => {
        return fetch("https://27a5-80-209-193-197.eu.ngrok.io/api/v1/categories",
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
        return fetch("https://27a5-80-209-193-197.eu.ngrok.io/api/v1/muscles",
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
    
    useEffect(()=> {
       fetchMuscles();
       fetchCategories();
    },[])
    
    return (
        <View style={darkStyles.backgroundDark}>
                <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
                    <LinearGradient
                        colors={['#131429', '#13142901', '#131429']}
                        style={{height : '100%', width : '100%'}}>
                        { categories.length > 0 && muscles.length > 0 &&
                            <ScrollView style={styles.container}>
                                <Title style={darkStyles.bigTitle}>Create an exercise</Title>
                                <TextInput placeholder="Name" placeholderTextColor="#8c8c8c" style={[styles.text, styles.input]}/>
                                <TextInput placeholder="Url Image" placeholderTextColor="#8c8c8c" style={[styles.text, styles.input]}/>
                                <TextInput placeholder="Description" multiline={true} placeholderTextColor="#8c8c8c" style={[styles.text, styles.input, styles.multiLine]}/>
                                <Text style={styles.text}>Categories</Text>
                                <Dropdown
                                    data={categories}
                                    isMultiSelect={true}
                                    dropdownStyle={styles.dropdown}
                                    selectedTextStyle={darkStyles.textWhite}
                                    label={"name"}
                                    value={"id"}
                                    iconName="calendar-times"
                                    onSelectedValue={value => setSelectedCats(value) }/>

                                <Text style={styles.text}>Muscles</Text>
                                <Dropdown
                                    data={muscles}
                                    isMultiSelect={true}
                                    dropdownStyle={styles.dropdown}
                                    label={"name"}
                                    value={"id"}
                                    iconName="calendar-times"
                                    selectedTextStyle={darkStyles.textWhite}
                                    onSelectedValue={value => setSelectedMuscles(value) }/>
                                <Button
                                    type="outline"
                                    title="Finish"
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
        fontSize: 14,
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
        fontSize: 18,
        fontWeight: '400'
    },
    dropdown: {
        borderColor: '#40d876'
    }
});
