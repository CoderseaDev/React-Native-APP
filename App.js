import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';
import AuthScreen from './src/screens/Auth/Auth';
import SideDrawer from './src/screens/SideDrawer/SideDrawer';



import configureStore from './src/store/configureStore';

import VisitScreen from "./src/screens/Visit/Visit";

import VisitorDataScreen from "./src/screens/VisitorData/VisitorData";

import VisitorDataDetailsScreen from "./src/screens/VistorDataDetails/VisitorDataDetails";

import PatientProfileScreen from "./src/screens/PatientProfile/PatientProfile";

import SearchPatientProfileDataScreen from "./src/screens/PatientProfileData/PatientProfileData";

import PatientProfileDataDetailsScreen from "./src/screens/PatientProfileDataDetails/PatientProfileDataDetails";

import Main from "./src/screens/Splash/trySplash";




const store = configureStore();

//Register Screens
Navigation.registerComponent(
    "Medical.AuthScreen",
    () => AuthScreen,
    store,
    Provider
);

Navigation.registerComponent(
    "Medical.SideDrawer",
    () => SideDrawer,
    store,
    Provider
);

Navigation.registerComponent(
    "Medical.VisitScreen",
    () => VisitScreen,
    store,
    Provider
);


Navigation.registerComponent(
    "Medical.VisitorDataScreen",
    () => VisitorDataScreen,
    store,
    Provider
);

Navigation.registerComponent(
    "Medical.VisitorDataDetailsScreen",
    () => VisitorDataDetailsScreen,
    store,
    Provider
);

Navigation.registerComponent(
    "Medical.PatientProfileScreen",
    () => PatientProfileScreen,
    store,
    Provider
);

Navigation.registerComponent(
    "Medical.SearchPatientProfileDataScreen",
    () => SearchPatientProfileDataScreen,
    store,
    Provider
);


Navigation.registerComponent(
    "Medical.PatientProfileDataDetailsScreen",
    () => PatientProfileDataDetailsScreen,
    store,
    Provider
);

Navigation.registerComponent(
    "Medical.Main",
    () => Main,
    store,
    Provider
);



//Start a App
export default () => Navigation.startSingleScreenApp({
    screen: {
        screen: "Medical.AuthScreen",
     //   title: "Login Screen"
    },

});

// export default () => Navigation.startSingleScreenApp({
//     screen: {
//         screen: "awesome-places.AuthScreen",
//         title: "Login"
//     }
// });
