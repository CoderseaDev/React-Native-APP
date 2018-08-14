import {Navigation} from 'react-native-navigation';
import {Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const startTabs =()=> {
    Promise.all([
        Icon.getImageSource(Platform.OS ==='android'? "md-search":"ios-search", 30),
        Icon.getImageSource(Platform.OS ==='android'? "md-person-add": "ios-person-add", 30),
        Icon.getImageSource(Platform.OS ==='android'? "md-menu":"ios-menu", 30),
    ]).then(sources => {
            Navigation.startTabBasedApp({
                tabs: [
                    {
                        screen: "Medical.SearchPatientProfileDataScreen",
                        label: "Patients Search",
                        title: "Patients Search",
                      icon: sources[0],
                        navigatorButtons:{
                            leftButtons :[
                                {
                                    icon : sources[2],
                                    title : "menu",
                                    id: "sideDrawerToggle"
                                }
                            ]
                        }
                    },

                    {
                        screen: "Medical.PatientProfileScreen",
                        label: "Add Patient",
                        title: "Add Patient",
                        icon: sources[1],
                        navigatorButtons:{
                            leftButtons :[
                                {
                                    icon : sources[2],
                                    title : "menu",
                                    id: "sideDrawerToggle"
                                }

                            ]
                        }
                    },
                ],
                tabsStyle:{
                    tabBarSelectedButtonColor : "#000000",
                    forceTitlesDisplay: true,
                    tabBarBackgroundColor: '#551A8B'
                },
                drawer :{
                    left :{
                        screen :"Medical.SideDrawer"
                    }
                },
                appStyle:{
                    tabBarSelectedButtonColor : "#000000",
                    forceTitlesDisplay: true,

                },
            });
         });
};

export default startTabs;
