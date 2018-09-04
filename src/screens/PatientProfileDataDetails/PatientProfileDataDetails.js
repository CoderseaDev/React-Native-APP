import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,

    Dimensions,
    ScrollView,
    Picker,
    KeyboardAvoidingView,
    Alert,
    ActivityIndicator,
    TouchableOpacity,

Button
} from "react-native";
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-datepicker';
import {connect} from "react-redux";

import {updatePatient} from "../../store/actions/index";
import { deletePatient } from "../../store/actions/index";
import {FormInput, FormValidationMessage , FormLabel} from 'react-native-elements'
import validate from "../../utility/validation";

class PatientProfileDataDetailsScreen extends Component {
    constructor(props) {
        super(props);
        Dimensions.addEventListener("change" ,this.updateStyles);
    }

    static navigatorStyle = {
        navBarButtonColor: "#000000"
    };

    state = {
        viewMode : Dimensions.get("window").height>500 ? "portrait": "landscape",
        controls: {
            patientName: {
                value: this.props.selectedPatient.patientName,
                valid: false,
                validationRules:{
                    isName: true
                },
                touched: false ,
            },
            surName:{
                value:this.props.selectedPatient.surName,
                valid: false,
                validationRules:{
                    isName: true
                },
                touched: false ,

            },
            email:{
                value:this.props.selectedPatient.email,
                valid: false,
                validationRules:{
                    isEmail: true
                },
                touched: false
            },
            mobileNo: {
                value:this.props.selectedPatient.mobileNo,
                valid: false,
                validationRules:{
                    isPhoneNo: true
                },
                touched: false
            },
        },

            height: this.props.selectedPatient.height,
            weight: this.props.selectedPatient.weight,
            bloodType: this.props.selectedPatient.bloodType,
            complaint: this.props.selectedPatient.complaint,
            homeNo: this.props.selectedPatient.homeNo,
            address: this.props.selectedPatient.address,
            gender: this.props.selectedPatient.gender,
            date: this.props.selectedPatient.date,
            contactName: this.props.selectedPatient.contactName,
            contactRelationship: this.props.selectedPatient.contactRelationship,
            contactPhoneNo: this.props.selectedPatient.contactPhoneNo,

};
    componentWillUnmount(){
        Dimensions.removeEventListener("change",this.updateStyles);
    }
    updateStyles =(dims)=>{
        this.setState({
            viewMode:
                dims.window.height > 500 ? "portrait" : "landscape",
        });
    };
    updateInputState = (key, value) => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    [key]: {
                        ...prevState.controls[key],
                        value: value,
                        valid: validate(
                            value,
                            prevState.controls[key].validationRules,
                        ),
                        touched: true

                    }
                }
            };
        });
    };
    heightChangeHandler = val => {

        this.setState({height: val});
    };
    weightChangeHandler = val => {

        this.setState({weight: val});
    };
    bloodTypeChangeHandler = val => {

        this.setState({bloodType: val});
    };
    complaintChangeHandler = val => {

        this.setState({complaint: val});
    };
    homeNoChangeHandler = val => {

        this.setState({homeNo: val});
    };
    addressNoChangeHandler = val => {

        this.setState({address: val});
    };
    contactNameChangeHandler = val => {

        this.setState({contactName: val});
    };
    contactRelationshipChangeHandler = val => {

        this.setState({contactRelationship: val});
    };
    contactPhoneNoChangeHandler = val => {

        this.setState({contactPhoneNo: val});
    };
    genderChangeHandler  = val => {
        this.setState({gender: val});
        //console.log(val);
    };
    dateChangeHandler = val =>{
        this.setState({date: val});
    };
    patientUpdatedHandler = () => {
        this.props.onUpdatePatient(
            this.state.controls.patientName.value,
            this.state.controls.surName.value,
            this.state.controls.email.value,
            this.state.controls.mobileNo.value,
            this.state.height,
            this.state.weight,
            this.state.bloodType,
            this.state.complaint,
            this.state.homeNo,
            this.state.address,
            this.state.gender,
            this.state.date,
            this.state.contactName,
            this.state.contactRelationship,
            this.state.contactPhoneNo,


            this.props.selectedPatient
        );
      //   this.props.navigator.pop();
    };
    goToVisitHistory =()=>{
        const selPatientToReturnVisitors = this.props.selectedPatient._id;

        this.props.navigator.push({
            screen: 'Medical.VisitorDataScreen',
            title: 'Visits History',
            passProps: {
                pkey1: selPatientToReturnVisitors
            }
        });

    };
    patientDeletedHandler = () => {
        this.props.onDeletePatient(this.props.selectedPatient._id);
        this.props.navigator.pop();

    };
    addVisitHandler = key =>{
        const selPatient = this.props.patients.find(selectedPatient => {
            return selectedPatient.pkey === key;
        });
        this.props.navigator.push({
            screen: 'Medical.VisitScreen',
         //   title: `Add Visit To : ${selPatient.patientName}`,
            passProps: {
                pkey: selPatient
            },
        });
    };
    render() {

        let saveButton = (
            <Button
                title="Save"
                color="#1E90FF"
                onPress={this.patientUpdatedHandler}
            />
        );
        if (this.props.isLoading) {
            (saveButton) = <ActivityIndicator color="#000"/>;
        }
        return (





            <KeyboardAvoidingView style={
                styles.container}>


            <ScrollView showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}>
                <View style={{ margin :15}}>
                    {saveButton}
                </View>

                <View style={this.state.viewMode==="portrait"
                    ? styles.portraitInputContainer
                    : styles.landscapeInputContainer}>

                    <View  style={this.state.viewMode==="portrait"
                        ? styles.portraitInputWrapper
                        : styles.landscapeInputWrapper}>
                            <FormLabel>Patient Name:</FormLabel>
                            <FormInput
                                autoCorrect={true}
                                keyboardType="default"
                                onChangeText={val=>this.updateInputState("patientName",val)}
                                inputStyle={{color: 'black' ,fontSize: 20 }}
                                valid={this.state.controls.patientName.valid}
                                onSubmitEditing={() => {
                                    this.surnameInput.focus()
                                }}
                            >{this.props.selectedPatient.patientName}</FormInput>

                            {this.state.controls.patientName.touched && !this.state.controls.patientName.valid
                                ?<FormValidationMessage>Please Enter a Valid Name</FormValidationMessage>
                                :null}
                        </View>

                    <View  style={this.state.viewMode==="portrait"
                        ? styles.portraitInputWrapper
                        : styles.landscapeInputWrapper}>
                            <FormLabel>Sur Name:</FormLabel>
                            <FormInput
                                autoCorrect={true}
                                keyboardType="default"
                                inputStyle={{color: 'black',fontSize: 20}}
                                onChangeText={val=>this.updateInputState("surName",val)}
                                valid={this.state.controls.surName.valid}
                                textInputRef={ref => (this.surnameInput = ref)}
                                onSubmitEditing={() => {
                                    this.emailInput.focus()
                                }}
                            >{this.props.selectedPatient.surName}</FormInput>
                        {this.state.controls.surName.touched && !this.state.controls.surName.valid
                            ?<FormValidationMessage>Please Enter a Valid Sur Name</FormValidationMessage>
                            :null}
                        </View>
                </View>
                <View style={this.state.viewMode==="portrait"
                    ? styles.portraitInputContainer
                    : styles.landscapeInputContainer}>

                    <View  style={this.state.viewMode==="portrait"
                        ? styles.portraitInputWrapper
                        : styles.landscapeInputWrapper}>
                    <FormLabel>Email:</FormLabel>
                    <FormInput
                        autoCorrect={true}
                        keyboardType="email-address"
                        inputStyle={{color: 'black' ,fontSize: 20}}
                        onChangeText={val=>this.updateInputState("email",val)}
                        valid={this.state.controls.email.valid}
                        textInputRef={ref => (this.emailInput = ref)}
                        onSubmitEditing={() => {
                            this.mobileNoInput.focus()
                        }}
                    >{this.props.selectedPatient.email}</FormInput>
                    {this.state.controls.email.touched && !this.state.controls.email.valid
                        ?<FormValidationMessage>Please Enter a Valid Email</FormValidationMessage>
                        :null}
                </View>

                    <View  style={this.state.viewMode==="portrait"
                        ? styles.portraitInputWrapper
                        : styles.landscapeInputWrapper}>
                    <FormLabel>Mobile No:</FormLabel>
                    <FormInput
                        keyboardType="phone-pad"
                        inputStyle={{color: 'black' ,fontSize: 20}}
                        onChangeText={val=>this.updateInputState("mobileNo",val)}
                        textInputRef={ref => (this.mobileNoInput = ref)}
                        onSubmitEditing={() => {
                            this.heightInput.focus()
                        }}
                    >{this.props.selectedPatient.mobileNo}</FormInput>
                    {this.state.controls.mobileNo.touched && !this.state.controls.mobileNo.valid
                        ?<FormValidationMessage>Please Enter a Valid Mobile Number</FormValidationMessage>
                        :null}
                </View>
                </View>
                <View style={this.state.viewMode==="portrait"
                    ? styles.portraitInputContainer
                    : styles.landscapeInputContainer}>

                    <View  style={this.state.viewMode==="portrait"
                        ? styles.portraitInputWrapper
                        : styles.landscapeInputWrapper}>
                            <FormLabel>Height:</FormLabel>
                            <FormInput
                                autoCorrect={true}
                                keyboardType="numeric"
                                textInputRef={ref => (this.heightInput = ref)}
                                inputStyle={{color: 'black',fontSize: 20}}
                                onChangeText={this.heightChangeHandler}
                                onSubmitEditing={() => {
                                    this.weightInput.focus()
                                }}
                            >
                                {this.props.selectedPatient.height}
                            </FormInput>
                        </View>

                    <View  style={this.state.viewMode==="portrait"
                        ? styles.portraitInputWrapper
                        : styles.landscapeInputWrapper}>
                            <FormLabel>Weight:</FormLabel>
                            <FormInput
                                autoCorrect={true}
                                keyboardType="numeric"
                                inputStyle={{color: 'black',fontSize: 20}}
                                onChangeText={this.weightChangeHandler}

                                textInputRef={ref => (this.weightInput = ref)}
                                onSubmitEditing={() => {
                                    this.bloodTypeInput.focus()
                                }}
                            >
                                {this.props.selectedPatient.weight}
                            </FormInput>
                        </View>
                </View>

                <View style={this.state.viewMode==="portrait"
                    ? styles.portraitInputContainer
                    : styles.landscapeInputContainer}>

                    <View  style={this.state.viewMode==="portrait"
                        ? styles.portraitInputWrapper
                        : styles.landscapeInputWrapper}>
                            <FormLabel>Blood Type:</FormLabel>
                            <FormInput
                                autoCorrect={true}
                                keyboardType="default"
                                inputStyle={{color: 'black',fontSize: 20}}
                                onChangeText={this.bloodTypeChangeHandler}
                                textInputRef={ref => (this.bloodTypeInput = ref)}
                                onSubmitEditing={() => {
                                    this.complaintInput.focus()
                                }}
                            >
                                {this.props.selectedPatient.bloodType}
                            </FormInput>
                        </View>


                    <View  style={this.state.viewMode==="portrait"
                        ? styles.portraitInputWrapper
                        : styles.landscapeInputWrapper}>
                            <FormLabel>Complaint:</FormLabel>
                            <FormInput
                                autoCorrect={true}
                                keyboardType="default"
                                inputStyle={{color: 'black',fontSize: 20}}
                                onChangeText={this.complaintChangeHandler}
                                textInputRef={ref => (this.complaintInput = ref)}
                                onSubmitEditing={() => {
                                    this.homeNoInput.focus()
                                }}

                            >
                                {this.props.selectedPatient.complaint}
                            </FormInput>
                        </View>
                </View>
                <View style={this.state.viewMode==="portrait"
                    ? styles.portraitInputContainer
                    : styles.landscapeInputContainer}>

                    <View  style={this.state.viewMode==="portrait"
                        ? styles.portraitInputWrapper
                        : styles.landscapeInputWrapper}>
                            <FormLabel>Home No:</FormLabel>
                            <FormInput

                                keyboardType="phone-pad"
                                inputStyle={{color: 'black',fontSize: 20}}
                                onChangeText={this.homeNoChangeHandler}

                                textInputRef={ref => (this.homeNoInput = ref)}
                                onSubmitEditing={() => {
                                    this.addressInput.focus()
                                }}
                            >{this.props.selectedPatient.homeNo}</FormInput>
                        </View>
                    <View  style={this.state.viewMode==="portrait"
                        ? styles.portraitInputWrapper
                        : styles.landscapeInputWrapper}>
                            <FormLabel>Address:</FormLabel>
                            <FormInput
                                autoCorrect={true}
                                keyboardType="default"
                                inputStyle={{color: 'black',fontSize: 20}}
                                onChangeText={this.addressNoChangeHandler}
                                textInputRef={ref => (this.addressInput = ref)}

                            >{this.props.selectedPatient.address}</FormInput>
                        </View>
                </View>
                                 <View style={{paddingVertical: 5}}/>

                <View style={this.state.viewMode==="portrait"
                    ? styles.portraitInputContainer
                    : styles.landscapeInputContainer}>

                    <View  style={this.state.viewMode==="portrait"
                        ? styles.portraitInputWrapper
                        : styles.landscapeInputWrapper}>
                            <Picker
                                style={{marginLeft: 10,}}
                                selectedValue={this.state.gender}
                                onValueChange={this.genderChangeHandler}>
                                <Picker.Item value='' label='Select Gender'/>
                                <Picker.Item label="Male" value="male"/>
                                <Picker.Item label="Female" value="female"/>

                            </Picker>
                        </View>

                        <View style={{paddingVertical: 5}}/>

                    <View  style={this.state.viewMode==="portrait"
                        ? styles.portraitInputWrapper
                        : styles.landscapeInputWrapper}>
                        <Text style={{textAlign: 'center'}} >Date</Text>
                            <DatePicker
                                style={this.state.viewMode==="portrait"
                                    ? styles.portraitDateWrapper
                                    : styles.landscapeDateWrapper}

                                date={this.state.date}
                                mode="date"
                                placeholder="select date"
                                format="YYYY-MM-DD"
                                minDate="1993-11-30"
                                maxDate="2020-06-01"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        marginLeft: 36
                                    }
                                }}
                                onDateChange={this.dateChangeHandler}/>
                        </View>
                </View>
                        <View style={{paddingVertical: 5}}/>

                        <View style={styles.LineStyle}>
                            <Text style={styles.PersonalStyle}>Contact in case of emergency</Text>
                        </View>
                        <View style={{paddingVertical: 5}}/>


                        <View>
                            <FormLabel>Contact Name:</FormLabel>
                            <FormInput
                                autoCorrect={true}
                                keyboardType="default"
                                inputStyle={{color: 'black',fontSize: 20}}
                                onChangeText={this.contactNameChangeHandler}

                                onSubmitEditing={() => {
                                    this.contactRelInput.focus()
                                }}

                            >
                                {this.props.selectedPatient.contactName}
                            </FormInput>
                        </View>


                        <View>
                            <FormLabel>Contact Relationship:</FormLabel>
                            <FormInput
                                autoCorrect={true}
                                keyboardType="default"
                                inputStyle={{color: 'black',fontSize: 20}}
                                onChangeText={this.contactRelationshipChangeHandler}
                                textInputRef={ref => (this.contactRelInput = ref)}
                                onSubmitEditing={() => {
                                    this.contactPhoneInput.focus()
                                }}
                            >
                                {this.props.selectedPatient.contactRelationship}
                            </FormInput>
                        </View>

                        <View>
                            <FormLabel>Contact Phone No:</FormLabel>
                            <FormInput
                                autoCorrect={true}
                                keyboardType="phone-pad"
                                inputStyle={{color: 'black',fontSize: 20}}
                                onChangeText={this.contactPhoneNoChangeHandler}
                                textInputRef={ref => (this.contactPhoneInput = ref)}
                            >
                                {this.props.selectedPatient.contactPhoneNo}
                            </FormInput>
                        </View>


            </ScrollView>
                    <ActionButton autoInactive={false} buttonColor='#1E90FF' color='black' >
                        <ActionButton.Item buttonColor='#DC143C' title="Delete"  onPress={() => Alert.alert(
                            'Alert',
                            'You Want Delete This Patient ?',
                            [
                                {text: 'Cancel'},
                                {text: 'OK', onPress: this.patientDeletedHandler},
                            ],
                            { cancelable: false }
                        )}
                        >
                            <Icon name="md-trash" style={styles.iconStyle} />
                        </ActionButton.Item>
                        <ActionButton.Item buttonColor='#9b59b6' title="Visits History" onPress={this.goToVisitHistory}>
                            <Icon name="md-filing" style={styles.iconStyle} />
                        </ActionButton.Item>

                        <ActionButton.Item buttonColor='#ffd700' title="Add Visit" onPress={this.addVisitHandler}>
                            <Icon name="md-clipboard" style={styles.iconStyle} />
                        </ActionButton.Item>

                        <ActionButton.Item  buttonColor='#1abc9c' title="Save" onPress={this.patientUpdatedHandler}>
                            {this.props.isLoading
                                ?<ActivityIndicator color="#000"/>
                                :<Icon name="md-cloud-upload" style={styles.iconStyle} />}
                        </ActionButton.Item>
                    </ActionButton>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container:{

        flex:1,
        justifyContent:"center",
        alignItems:"center",

    },
    LineStyle: {
        borderBottomWidth: 1,
        paddingVertical: 10
    },
    portraitContainer: {
        flexDirection: "column"
    },
    landscapeContainer: {
        flexDirection: "row"
    },
    visitorDetailContainer: {
        flex: 2
    },
    visitorImage: {
        width: "100%",
        height: "100%"
    },
    patientName: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 28
    },
    subContainer: {
        flex: 1
    },
    buttonsHorzStyle: {
        flexDirection: 'row',
        flex: 1
    },
    deleteButton: {
        alignItems: "center"
    },
    PersonalStyle: {
        paddingTop: 10,
        fontSize: 20,
        textAlign: 'center',
        color: '#8b0000',

    },
    bgImage: {
        width:"100%",
        height:"100%"
    },
    landscapeInputContainer:{
        flexDirection:"row",
        justifyContent:"space-between"
    },
    portraitInputContainer:{
        flexDirection:"column",
        justifyContent:"flex-start"
    },
    landscapeInputWrapper:{
        width: "45%",
    },
    portraitInputWrapper:{
        width: "100%",
    },
    inputContainer:{
        width:"80%",
    },
    iconStyle: {
        color: '#000',
        fontSize: 30
    },

    buttonText: {
        color: '#000',
        fontSize: 15
    },
    addButton: {
        position: 'absolute',
        zIndex: 11,
        right: 20,
       // bottom: 90,
        backgroundColor: '#1E90FF',
        width: 70,
        height: 70,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,

    },
    addButton1: {
        position: 'absolute',
        zIndex: 11,
        right: 20,
        top: 10,
        backgroundColor: '#E91E63',
        width: 70,
        height: 70,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,

    },
    portraitDateWrapper:{
        width:325
    },
    landscapeDateWrapper:{
        width:225,
        paddingVertical: 10
    },


});

const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading,
        patients: state.patientProfile.patients

    };
};

const mapDispatchToProps = dispatch => {
    return {

        onUpdatePatient: (patientName, surName, email, mobileNo,
            height,weight, bloodType,
            complaint, homeNo,
            address,gender,date, contactName ,contactRelationship, contactPhoneNo, selectedPatient) =>
            dispatch(updatePatient(patientName, surName, email, mobileNo,
                height,weight, bloodType,
                complaint, homeNo,
                address,gender,date, contactName ,contactRelationship, contactPhoneNo, selectedPatient)),



        onDeletePatient: ( selectedPatient , key) => dispatch(deletePatient(  selectedPatient , key))

    };

};

export default connect(mapStateToProps, mapDispatchToProps)(PatientProfileDataDetailsScreen);


