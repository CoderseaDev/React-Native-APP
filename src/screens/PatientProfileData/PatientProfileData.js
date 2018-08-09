import React, {Component} from 'react';
import {connect} from 'react-redux';
import PatientProfileList from '../../components/PatientProfileList/PatientProfileList';
import {getPatient} from "../../store/actions/index";
import {StyleSheet, View, ScrollView, TouchableOpacity , ActivityIndicator , Text} from 'react-native';


import SearchInput, {createFilter} from 'react-native-search-filter';
const KEYS_TO_FILTERS = ['user.name', 'subject', 'patientName'];
///////////ELmAFROD DY Htb2a El Search Page
// El Mafrod Dy htb2a el Search
class SearchPatientProfileDataScreen extends Component {



    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);

    }
    static navigatorStyle = {
        navBarButtonColor: "#000000",

    };




// to load visitor data screen all the time we don't need to refresh
    onNavigatorEvent = event => {
        if (event.type === "ScreenChangedEvent") {
            if (event.id === "willAppear") {
                this.props.onLoadPatients();
        }

        }

// to show the sideDrawer
        if (event.type === "NavBarButtonPress") {
            if (event.id === "sideDrawerToggle") {
                this.props.navigator.toggleDrawer({
                    side: "left"
                });
            }
        }
    };
    // to return the key of the patient data
    itemSelectedHandler = key => {
         const selPatient = this.props.patients.find(patientProfile => {
            return patientProfile._id === key;
        });

        this.props.navigator.push({
            screen: "Medical.PatientProfileDataDetailsScreen",
            title: `${selPatient.patientName}${selPatient.surName}`,
            passProps: {
                selectedPatient: selPatient
            },
        });
    };



    addVisitHandler = key =>{
        const selPatient = this.props.patients.find(patientProfile => {
            return patientProfile._id === key;
        });

        this.props.navigator.push({
            screen: 'Medical.VisitScreen',
            title: `Add Visitor To : ${selPatient.patientName}`,
            passProps: {
                pkey: selPatient
            },


        });
    };





    render() {
           if (this.props.isLoading) {
            return (
                <ActivityIndicator
                    animating={true}
                    style={styles.indicator}
                    size="large"
                />
            );
        }

        let viewButton = (
            <View>
                <PatientProfileList patients={this.props.patients} onItemSelected={this.itemSelectedHandler}
                                    onAddVisit={this.addVisitHandler}/>
            </View>
        );

        return (

<View>
    {viewButton}
</View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-start'
    },
    emailItem: {
        borderBottomWidth: 0.5,
        borderColor: 'rgba(0,0,0,0.3)',
        padding: 10
    },
    emailSubject: {
        color: 'rgba(0,0,0,0.5)'
    },
    searchInput: {
        padding: 10,
        borderColor: '#CCC',
        borderWidth: 1
    },
    indicator: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 80
    }
});
const mapStateToProps = state => {
    return {
        patients: state.patientProfile.patients,
        isLoading: state.ui.isLoading,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onLoadPatients: () => dispatch(getPatient())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchPatientProfileDataScreen);



