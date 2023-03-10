export default {
    
    getRoutines()
    {
        return {
            id : 1,
            name : 'routine1',
            days : [0,1,2,3],
            timeWeeks : 3,
            exercises : [
                {
                    id: 1,
                    day : 0,
                    name : 'Prensa una pierna',
                    image : 'https://www.thingys.com.ar/gymapps/tutorial/beinpresse_45_grad%20(1).gif',
                    muscle : 'Cuadricep, femoral, gluteo',
                    series: [
                        {
                            reps: 12,
                            weight: 40,
                            fail: true
                        },
                        {
                            reps: 12,
                            weight: 45,
                            fail: true
                        },
                        {
                            reps: 13,
                            weight: 50,
                            fail: false
                        },
                        {
                            reps: 14,
                            weight: 55,
                            fail: true
                        }
                    ]
                },
                {
                    id : 2,
                    day : 0,
                    name : 'Peso muerto',
                    image : 'https://www.thingys.com.ar/gymapps/tutorial/peso_muerto.gif',
                    muscle : 'Femoral',
                    series: [
                        {
                            reps: 12,
                            weight: 40,
                            fail: true
                        },
                        {
                            reps: 12,
                            weight: 45,
                            fail: false
                        },
                        {
                            reps: 13,
                            weight: 50,
                            fail: false
                        },
                        {
                            reps: 14,
                            weight: 55,
                            fail: true
                        }
                    ]
                },
                {
                    id : 3,
                    day : 0,
                    name : 'Aductores en polea',
                    image : 'https://www.cambiatufisico.com/wp-content/uploads/aductores-polea.jpg',
                    muscle : 'aductores',
                    series: [
                        {
                            reps: 12,
                            weight: 40,
                            fail: true
                        },
                        {
                            reps: 12,
                            weight: 45,
                            fail: false
                        },
                        {
                            reps: 13,
                            weight: 50,
                            fail: false
                        },
                        {
                            reps: 14,
                            weight: 55,
                            fail: true
                        }
                    ]
                },
                {
                    id : 4,
                    day : 0,
                    name : 'Extension cuadriceps en maquina',
                    image : 'https://www.cambiatufisico.com/wp-content/uploads/Extensiones-en-maquina.jpg',
                    muscle : 'cuadricep',
                    series: [
                        {
                            reps: 12,
                            weight: 40,
                            rest: 90,
                            fail: true
                        },
                        {
                            reps: 12,
                            weight: 45,
                            rest: 90,
                            fail: false
                        },
                        {
                            reps: 13,
                            weight: 50,
                            rest: 120,
                            fail: false
                        },
                        {
                            reps: 14,
                            weight: 55,
                            fail: true
                        },
                        {
                            reps: 16,
                            weight: 60,
                            fail: true
                        },
                        {
                            reps: 18,
                            weight: 70,
                            fail: true
                        }
                    ]
                },
                {
                    id: 1,
                    day : 1,
                    name : 'Prensa una pierna - dia 1',
                    image : 'https://www.cambiatufisico.com/wp-content/uploads/Prensa-Inclinada-a-una-pierna.jpg',
                    presentationImage: 'https://www.cambiatufisico.com/wp-content/uploads/prensa-piernas.jpg',
                    muscle : 'Cuadricep, femoral, gluteo',
                    series: [
                        {
                            reps: 12,
                            weight: 40,
                            fail: true
                        },
                        {
                            reps: 12,
                            weight: 45,
                            fail: true
                        },
                        {
                            reps: 13,
                            weight: 50,
                            fail: false
                        },
                        {
                            reps: 14,
                            weight: 55,
                            fail: true
                        }
                    ]
                },
                {
                    id : 2,
                    day : 1,
                    name : 'Peso muerto - dia 1',
                    image : 'https://www.cambiatufisico.com/wp-content/uploads/peso-muerto2.jpg',
                    presentationImage: 'https://i.blogs.es/d61882/istock-891602094/1366_2000.jpg',
                    muscle : 'Femoral',
                    series: [
                        {
                            reps: 12,
                            weight: 40,
                            fail: true
                        },
                        {
                            reps: 12,
                            weight: 45,
                            fail: false
                        },
                        {
                            reps: 13,
                            weight: 50,
                            fail: false
                        },
                        {
                            reps: 14,
                            weight: 55,
                            fail: true
                        }
                    ]
                },
                {
                    id : 3,
                    day : 1,
                    name : 'Aductores en polea - dia 1',
                    image : 'https://www.cambiatufisico.com/wp-content/uploads/aductores-polea.jpg',
                    presentationImage: 'https://www.nexofin.com/archivos/2017/10/abduccion-con-polea-1.jpg',
                    muscle : 'aductores',
                    series: [
                        {
                            reps: 12,
                            weight: 40,
                            fail: true
                        },
                        {
                            reps: 12,
                            weight: 45,
                            fail: false
                        },
                        {
                            reps: 13,
                            weight: 50,
                            fail: false
                        },
                        {
                            reps: 14,
                            weight: 55,
                            fail: true
                        }
                    ]
                },
                {
                    id : 4,
                    day : 1,
                    name : 'Extension cuadriceps en maquina - dia 1',
                    image : 'https://www.cambiatufisico.com/wp-content/uploads/Extensiones-en-maquina.jpg',
                    presentationImage: 'https://physiotutors.com/wp-content/uploads/2022/01/Seated-Leg-Extension.png',
                    muscle : 'cuadricep',
                    series: [
                        {
                            reps: 12,
                            weight: 40,
                            rest: 90,
                            fail: true
                        },
                        {
                            reps: 12,
                            weight: 45,
                            rest: 90,
                            fail: false
                        },
                        {
                            reps: 13,
                            weight: 50,
                            rest: 120,
                            fail: false
                        },
                        {
                            reps: 14,
                            weight: 55,
                            fail: true
                        },
                        {
                            reps: 16,
                            weight: 60,
                            fail: true
                        },
                        {
                            reps: 18,
                            weight: 70,
                            fail: true
                        }
                    ]
                },
                {
                    id: 1,
                    day : 2,
                    name : 'Prensa una pierna - dia 2',
                    image : 'https://i.ytimg.com/vi/xT5-HS6e9O4/maxresdefault.jpg',
                    presentationImage: 'https://www.cambiatufisico.com/wp-content/uploads/prensa-piernas.jpg',
                    muscle : 'Cuadricep, femoral, gluteo',
                    series: [
                        {
                            reps: 12,
                            weight: 40,
                            fail: true
                        },
                        {
                            reps: 12,
                            weight: 45,
                            fail: true
                        },
                        {
                            reps: 13,
                            weight: 50,
                            fail: false
                        },
                        {
                            reps: 14,
                            weight: 55,
                            fail: true
                        }
                    ]
                },
                {
                    id : 2,
                    day : 2,
                    name : 'Peso muerto - dia 2',
                    image : 'https://tumejorfisico.com/wp-content/uploads/2020/10/peso-muerto.jpg',
                    presentationImage: 'https://i.blogs.es/d61882/istock-891602094/1366_2000.jpg',
                    muscle : 'Femoral',
                    series: [
                        {
                            reps: 12,
                            weight: 40,
                            fail: true
                        },
                        {
                            reps: 12,
                            weight: 45,
                            fail: false
                        },
                        {
                            reps: 13,
                            weight: 50,
                            fail: false
                        },
                        {
                            reps: 14,
                            weight: 55,
                            fail: true
                        }
                    ]
                },
                {
                    id : 3,
                    day : 2,
                    name : 'Aductores en polea - dia 2',
                    image : 'https://www.musculaciontotal.com/wp-content/uploads/2018/08/abduccion-de-piernas-en-polea-baja.jpg',
                    presentationImage: 'https://www.nexofin.com/archivos/2017/10/abduccion-con-polea-1.jpg',
                    muscle : 'aductores',
                    series: [
                        {
                            reps: 12,
                            weight: 40,
                            fail: true
                        },
                        {
                            reps: 12,
                            weight: 45,
                            fail: false
                        },
                        {
                            reps: 13,
                            weight: 50,
                            fail: false
                        },
                        {
                            reps: 14,
                            weight: 55,
                            fail: true
                        }
                    ]
                },
                {
                    id : 4,
                    day : 2,
                    name : 'Extension cuadriceps en maquina - dia 2',
                    image : 'https://www.masmusculo.com/blog/wp-content/uploads/2018/07/extension-de-cuadriceps.jpg',
                    presentationImage: 'https://physiotutors.com/wp-content/uploads/2022/01/Seated-Leg-Extension.png',
                    muscle : 'cuadricep',
                    series: [
                        {
                            reps: 12,
                            weight: 40,
                            fail: true,
                            rest: 90
                        },
                        {
                            reps: 12,
                            weight: 45,
                            fail: false,
                            rest: 90
                        },
                        {
                            reps: 13,
                            weight: 50,
                            fail: false,
                            rest: 120
                        },
                        {
                            reps: 14,
                            weight: 55,
                            fail: true
                        },
                        {
                            reps: 16,
                            weight: 60,
                            fail: true
                        },
                        {
                            reps: 18,
                            weight: 70,
                            fail: true
                        }
                    ]
                },
                {
                    id: 1,
                    day : 3,
                    name : 'Prensa una pierna - dia 3',
                    image : 'https://i.ytimg.com/vi/xT5-HS6e9O4/maxresdefault.jpg',
                    presentationImage: 'https://www.cambiatufisico.com/wp-content/uploads/prensa-piernas.jpg',
                    muscle : 'Cuadricep, femoral, gluteo',
                    series: [
                        {
                            reps: 12,
                            weight: 40,
                            fail: true
                        },
                        {
                            reps: 12,
                            weight: 45,
                            fail: true
                        },
                        {
                            reps: 13,
                            weight: 50,
                            fail: false
                        },
                        {
                            reps: 14,
                            weight: 55,
                            fail: true
                        }
                    ]
                },
                {
                    id : 2,
                    day : 3,
                    name : 'Peso muerto - dia 3',
                    image : 'https://w7.pngwing.com/pngs/976/621/png-transparent-deadlift-dumbbell-exercise-fitness-centre-barbell-dumbbell-physical-fitness-hand-human-thumbnail.png',
                    presentationImage: 'https://i.blogs.es/d61882/istock-891602094/1366_2000.jpg',
                    muscle : 'Femoral',
                    series: [
                        {
                            reps: 12,
                            weight: 40,
                            fail: true
                        },
                        {
                            reps: 12,
                            weight: 45,
                            fail: false
                        },
                        {
                            reps: 13,
                            weight: 50,
                            fail: false
                        },
                        {
                            reps: 14,
                            weight: 55,
                            fail: true
                        }
                    ]
                },
                {
                    id : 3,
                    day : 3,
                    name : 'Aductores en polea - dia 3',
                    image : 'https://www.cambiatufisico.com/wp-content/uploads/aductores-polea.jpg',
                    presentationImage: 'https://www.nexofin.com/archivos/2017/10/abduccion-con-polea-1.jpg',
                    muscle : 'aductores',
                    series: [
                        {
                            reps: 12,
                            weight: 40,
                            fail: true
                        },
                        {
                            reps: 12,
                            weight: 45,
                            fail: false
                        },
                        {
                            reps: 13,
                            weight: 50,
                            fail: false
                        },
                        {
                            reps: 14,
                            weight: 55,
                            fail: true
                        }
                    ]
                },
                {
                    id : 4,
                    day : 3,
                    name : 'Extension cuadriceps en maquina - dia 3',
                    image : 'https://www.cambiatufisico.com/wp-content/uploads/Extensiones-en-maquina.jpg',
                    presentationImage: 'https://physiotutors.com/wp-content/uploads/2022/01/Seated-Leg-Extension.png',
                    muscle : 'cuadricep',
                    series: [
                        {
                            reps: 12,
                            weight: 40,
                            fail: true,
                            rest: 90
                        },
                        {
                            reps: 12,
                            weight: 45,
                            fail: false,
                            rest: 90
                        },
                        {
                            reps: 13,
                            weight: 50,
                            fail: false,
                            rest: 120
                        },
                        {
                            reps: 14,
                            weight: 55,
                            fail: true
                        },
                        {
                            reps: 16,
                            weight: 60,
                            fail: true
                        },
                        {
                            reps: 18,
                            weight: 70,
                            fail: true
                        }
                    ]
                },
                {
                    id: 1,
                    day : 4,
                    name : 'Prensa una pierna - dia 4',
                    image : 'https://www.thingys.com.ar/gymapps/tutorial/beinpresse_45_grad%20(1).gif',
                    muscle : 'Cuadricep, femoral, gluteo',
                    series: [
                        {
                            reps: 12,
                            weight: 40,
                            fail: true
                        },
                        {
                            reps: 12,
                            weight: 45,
                            fail: true
                        },
                        {
                            reps: 13,
                            weight: 50,
                            fail: false
                        },
                        {
                            reps: 14,
                            weight: 55,
                            fail: true
                        }
                    ]
                },
                {
                    id : 2,
                    day : 4,
                    name : 'Peso muerto - dia 4',
                    image : 'https://www.thingys.com.ar/gymapps/tutorial/peso_muerto.gif',
                    muscle : 'Femoral',
                    series: [
                        {
                            reps: 12,
                            weight: 40,
                            fail: true
                        },
                        {
                            reps: 12,
                            weight: 45,
                            fail: false
                        },
                        {
                            reps: 13,
                            weight: 50,
                            fail: false
                        },
                        {
                            reps: 14,
                            weight: 55,
                            fail: true
                        }
                    ]
                },
                {
                    id : 3,
                    day : 4,
                    name : 'Aductores en polea - dia 4',
                    image : 'https://www.cambiatufisico.com/wp-content/uploads/aductores-polea.jpg',
                    muscle : 'aductores',
                    series: [
                        {
                            reps: 12,
                            weight: 40,
                            fail: true
                        },
                        {
                            reps: 12,
                            weight: 45,
                            fail: false
                        },
                        {
                            reps: 13,
                            weight: 50,
                            fail: false
                        },
                        {
                            reps: 14,
                            weight: 55,
                            fail: true
                        }
                    ]
                },
                {
                    id : 4,
                    day : 4,
                    name : 'Extension cuadriceps en maquina - dia 4',
                    image : 'https://www.cambiatufisico.com/wp-content/uploads/Extensiones-en-maquina.jpg',
                    muscle : 'cuadricep',
                    series: [
                        {
                            reps: 12,
                            weight: 40,
                            fail: true,
                            rest: 90
                        },
                        {
                            reps: 12,
                            weight: 45,
                            fail: false,
                            rest: 90
                        },
                        {
                            reps: 13,
                            weight: 50,
                            fail: false,
                            rest: 120
                        },
                        {
                            reps: 14,
                            weight: 55,
                            fail: true
                        },
                        {
                            reps: 16,
                            weight: 60,
                            fail: true
                        },
                        {
                            reps: 18,
                            weight: 70,
                            fail: true
                        }
                    ]
                },
                {
                    id: 1,
                    day : 5,
                    name : 'Prensa una pierna - dia 5',
                    image : 'https://www.cambiatufisico.com/wp-content/uploads/Prensa-Inclinada-a-una-pierna.jpg',
                    muscle : 'Cuadricep, femoral, gluteo',
                    series: [
                        {
                            reps: 12,
                            weight: 40,
                            fail: true
                        },
                        {
                            reps: 12,
                            weight: 45,
                            fail: true
                        },
                        {
                            reps: 13,
                            weight: 50,
                            fail: false
                        },
                        {
                            reps: 14,
                            weight: 55,
                            fail: true
                        }
                    ]
                },
                {
                    id : 2,
                    day : 5,
                    name : 'Peso muerto - dia 5',
                    image : 'https://www.cambiatufisico.com/wp-content/uploads/peso-muerto2.jpg',
                    muscle : 'Femoral',
                    series: [
                        {
                            reps: 12,
                            weight: 40,
                            fail: true
                        },
                        {
                            reps: 12,
                            weight: 45,
                            fail: false
                        },
                        {
                            reps: 13,
                            weight: 50,
                            fail: false
                        },
                        {
                            reps: 14,
                            weight: 55,
                            fail: true
                        }
                    ]
                },
                {
                    id : 3,
                    day : 5,
                    name : 'Aductores en polea - dia 5',
                    image : 'https://www.cambiatufisico.com/wp-content/uploads/aductores-polea.jpg',
                    muscle : 'aductores',
                    series: [
                        {
                            reps: 12,
                            weight: 40,
                            fail: true
                        },
                        {
                            reps: 12,
                            weight: 45,
                            fail: false
                        },
                        {
                            reps: 13,
                            weight: 50,
                            fail: false
                        },
                        {
                            reps: 14,
                            weight: 55,
                            fail: true
                        }
                    ]
                },
                {
                    id : 4,
                    day : 5,
                    name : 'Extension cuadriceps en maquina - dia 5',
                    image : 'https://www.cambiatufisico.com/wp-content/uploads/Extensiones-en-maquina.jpg',
                    muscle : 'cuadricep',
                    series: [
                        {
                            reps: 12,
                            weight: 40,
                            fail: true,
                            rest: 90
                        },
                        {
                            reps: 12,
                            weight: 45,
                            fail: false,
                            rest: 90
                        },
                        {
                            reps: 13,
                            weight: 50,
                            fail: false,
                            rest: 120
                        },
                        {
                            reps: 14,
                            weight: 55,
                            fail: true
                        },
                        {
                            reps: 16,
                            weight: 60,
                            fail: true
                        },
                        {
                            reps: 18,
                            weight: 70,
                            fail: true
                        }
                    ]
                },
                {
                    id: 1,
                    day : 6,
                    name : 'Prensa una pierna - dia 6',
                    image : 'https://www.cambiatufisico.com/wp-content/uploads/Prensa-Inclinada-a-una-pierna.jpg',
                    muscle : 'Cuadricep, femoral, gluteo',
                    series: [
                        {
                            reps: 12,
                            weight: 40,
                            fail: true
                        },
                        {
                            reps: 12,
                            weight: 45,
                            fail: true
                        },
                        {
                            reps: 13,
                            weight: 50,
                            fail: false
                        },
                        {
                            reps: 14,
                            weight: 55,
                            fail: true
                        }
                    ]
                },
                {
                    id : 2,
                    day : 6,
                    name : 'Peso muerto - dia 6',
                    image : 'https://www.cambiatufisico.com/wp-content/uploads/peso-muerto2.jpg',
                    muscle : 'Femoral',
                    series: [
                        {
                            reps: 12,
                            weight: 40,
                            fail: true
                        },
                        {
                            reps: 12,
                            weight: 45,
                            fail: false
                        },
                        {
                            reps: 13,
                            weight: 50,
                            fail: false
                        },
                        {
                            reps: 14,
                            weight: 55,
                            fail: true
                        }
                    ]
                },
                {
                    id : 3,
                    day : 6,
                    name : 'Aductores en polea - dia 6',
                    image : 'https://www.cambiatufisico.com/wp-content/uploads/aductores-polea.jpg',
                    muscle : 'aductores',
                    series: [
                        {
                            reps: 12,
                            weight: 40,
                            fail: true
                        },
                        {
                            reps: 12,
                            weight: 45,
                            fail: false
                        },
                        {
                            reps: 13,
                            weight: 50,
                            fail: false
                        },
                        {
                            reps: 14,
                            weight: 55,
                            fail: true
                        }
                    ]
                },
                {
                    id : 4,
                    day : 6,
                    name : 'Extension cuadriceps en maquina - dia 6',
                    image : 'https://www.cambiatufisico.com/wp-content/uploads/Extensiones-en-maquina.jpg',
                    muscle : 'cuadricep',
                    series: [
                        {
                            reps: 12,
                            weight: 40,
                            rest: 90,
                            fail: true
                        },
                        {
                            reps: 12,
                            weight: 45,
                            rest: 90,
                            fail: false
                        },
                        {
                            reps: 13,
                            weight: 50,
                            rest: 120,
                            fail: false
                        },
                        {
                            reps: 14,
                            weight: 55,
                            fail: true
                        },
                        {
                            reps: 16,
                            weight: 60,
                            fail: true
                        },
                        {
                            reps: 18,
                            weight: 70,
                            fail: true
                        }
                    ]
                }
            ]
        }
    }
}