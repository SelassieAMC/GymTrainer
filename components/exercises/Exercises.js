// import React, { useState } from "react";
// import { View, Text, StyleSheet, Dimensions, Image, Button, Alert } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import Carousel from "react-native-snap-carousel";
// import Routines from "../common/helpers/Routines";
// import ExerciseInProgress from "./ExerciseInProgress";
// import { Table } from "react-native-table-component";
// import { ViewPropTypes } from 'deprecated-react-native-prop-types';
// export const SLIDER_WIDTH = Dimensions.get('window').width + 80
// export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)

// export default function Exercises(props)
// {
//     const date = new Date();
//     const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
//     const dayNumber = props.dayNumber ? props.dayNumber-1 : date.getDay()-1;
//     const day = days[dayNumber];
//     const [exercises, setExercises] = useState(Routines.getRoutines().exercises.filter(x => x.day === dayNumber));
//     const [currentExercise, setCurrentExercise] = useState(null);
//     const [selectedExercise, setSelectedExercise] = useState(null);

//     const fillExerciseDescription = (exercise) =>
//     {
//         return (
//         <Table responsive striped centered>
//             <thead>
//                 <tr>
//                     <th>Number</th>
//                     <th>Repetitions</th>
//                     <th>Weight</th>
//                     <th>Fail</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {exercise.series?.map((serie, index) => {
//                     return( <tr key={index}>
//                         <td>{index+1}</td>
//                         <td>{serie.reps}</td>
//                         <td>{`${serie.weight} Kg`}</td>
//                         <td>{serie.fail}</td>
//                     </tr>)
//                 })}
//             </tbody>
//         </Table>
//         )
//     }

//     const onExerciseDone = () => {
//         let cloneData = exercises.slice();
//         cloneData.forEach(function(obj) {
//             if(obj.id === selectedExercise.id)
//                 obj.done = true;
//             return obj;
//             });
        
//         setExercises(cloneData);
//         setSelectedExercise(null);
//     }

//     const skipCurrentExercise = () => {
//         const cloneData = exercises.slice();
//         cloneData.forEach(function(obj) {
//             if(obj.id === currentExercise.id)
//                 obj.skipped = true;
//                 return obj;
//             });
//         setExercises(cloneData);
//     }

//     const carouselCard = ({item, index}) => {
//         return (
//             <SafeAreaView 
//                 style={styles.cardContainer}
//                 key={index}>
//                 <Image 
//                     source={{uri: item.image}}
//                     style={styles.image}
//                     resizeMode='stretch'
//                 />
//                 <Text style={styles.header}>{ item.name }</Text>
//                 <Text style={styles.body}>{ item.muscle }</Text>
                
//                 {!item.done ? 
//                     <View style={styles.actionButtons}>
//                         <Button style={{color: '#007AFF' }} title="Start" onPress={() => setSelectedExercise(item)}/>
//                         <Button style={{color: '#007AFF' }} title="Skip"/>
//                     </View> :
//                     (<Text style={styles.header}>Completed!!</Text>)
//                 }
//             </SafeAreaView>
//         );
//     }

//     function pagination () {
//         const { entries, activeSlide } = this.state;
//         return (
//             <Pagination
//               dotsLength={entries.length}
//               activeDotIndex={activeSlide}
//               containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
//               dotStyle={{
//                   width: 10,
//                   height: 10,
//                   borderRadius: 5,
//                   marginHorizontal: 8,
//                   backgroundColor: 'rgba(255, 255, 255, 0.92)'
//               }}
//               inactiveDotStyle={{
//                   // Define styles for inactive dots here
//               }}
//               inactiveDotOpacity={0.4}
//               inactiveDotScale={0.6}
//             />
//         );
//     }

//     const carouselRef = React.useRef(null);

//     return (
//         <>
//             {exercises && !selectedExercise && 
//                 <SafeAreaView style={styles.container}>
//                     <Text style={styles.titles}>{day} workout</Text>
//                     <Carousel
//                         layout="stack"
//                         layoutCardOffset={18}
//                         ref={carouselRef}
//                         data={exercises}
//                         style={{alignSelf: "center"}}
//                         renderItem={carouselCard}
//                         sliderWidth={SLIDER_WIDTH}
//                         itemWidth={ITEM_WIDTH}
//                         inactiveSlideShift={0}
//                         useScrollView={true}
//                     />
//                     { this.pagination }
//                 </SafeAreaView>
//             }
//             {selectedExercise && 
//                 <SafeAreaView>
//                     <ExerciseInProgress selectedExercise={selectedExercise} onExerciseDone={onExerciseDone}/>
//                 </SafeAreaView>
//             }
//         </>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         alignSelf: "center",
//         color: 'black'
//     },
//     titles: {
//         fontSize: 30, 
//         alignSelf: 'center'
//     },
//     cardContainer: {
//       backgroundColor: 'black',
//       borderRadius: 8,
//       width: ITEM_WIDTH,
//       marginTop: 30,
//       shadowColor: "#fff",
//       shadowOffset: {
//         width: 0,
//         height: 3,
//       },
//       shadowOpacity: 0.29,
//       shadowRadius: 4.65,
//       elevation: 7,
//       height: '70%'
//     },
//     image: {
//       width: ITEM_WIDTH,
//       height: 300,
//       alignSelf: 'center'
//     },
//     header: {
//       color: "#fff",
//       fontSize: 28,
//       fontWeight: "bold",
//       paddingLeft: 20,
//       paddingTop: 20
//     },
//     body: {
//       color: "#fff",
//       fontSize: 18,
//       paddingLeft: 20,
//       paddingRight: 20
//     },
//     actionButtons: {
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       paddingLeft: 20,
//       paddingRight: 20 
//     }
//   });