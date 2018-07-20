import React, {Component} from 'react';
import {
    View,
    Text,
    ScrollView,
    Picker,
    ImageBackground,
    Dimensions,
    ActivityIndicator,
    KeyboardAvoidingView, Button, Alert
} from 'react-native';
import validate from "../../utility/validation";
import DatePicker from 'react-native-datepicker';
import {connect} from 'react-redux';
import {addPatient, startAddPatient} from "../../store/actions/index";
import {FormInput, FormValidationMessage} from 'react-native-elements'
class PatientProfileScreen extends Component {

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
        Dimensions.addEventListener("change" ,this.updateStyles);
    }


    state = {
        viewMode : Dimensions.get("window").height>500 ? "portrait": "landscape",
        gender: '',
        controls: {
            patientName: {
                value: '',
                valid: false,
                validationRules:{
                    isName: true
                },
                touched: false ,
            },
            surName: {
                value: '',
                valid: false,
                validationRules:{
                    isName: true
                },
                 touched: false,
            },
            email:{
                value:"",
                valid: false,
                validationRules:{
                    isEmail: true
                },
                touched: false
            },
            mobileNo: {
                value:"",
                valid: false,
                validationRules:{
                    isPhoneNo: true
                },
                touched: false
            },
            height: {
                value: '',
                touched: false,
                valid: false,
                validationRules:{
                    maxLength: 3
                }
            },
            weight: {value: '', touched: false, valid: false,},
            bloodType: {value: '', touched: false, valid: false,},
            complaint: {value: '', touched: false, valid: false,},
            date: {
                value: null,
                valid: false,
            },
            homeNo: {value: '', touched: false,  valid: false,},
            address: {value: '', touched: false ,  valid: false,},
            contactName: {value: '', touched: false ,  valid: false,},
            contactRelationship: {value: '', touched: false ,  valid: false,},
            contactPhoneNo: {value: '', touched: false ,  valid: false,},
            patientId: {value: ''}
        },

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
    componentDidUpdate() {
        if (this.props.patientAdded) {
            this.reset();
            this.props.navigator.switchToTab({tabIndex: 0});
        }
    }

    onNavigatorEvent = event => {
        if (event.type === "ScreenChangedEvent") {
            if (event.id === "willAppear") {
                this.props.onStartAddPatient();
            }
        }
        if (event.type === "NavBarButtonPress") {
            if (event.id === "sideDrawerToggle") {
                this.props.navigator.toggleDrawer({
                    side: "left"
                });
            }
        }
    };
    weightChangeHandler = val => {
        let controls = this.state.controls;
        controls.weight = {
            value: val, touched: true
        }
        this.setState({controls})
    };
    genderChangeHandler = gender => {
        this.setState({gender: gender})
    };
    bloodChangeHandler = val => {
        let controls = this.state.controls;
        controls.bloodType = {
            value: val, touched: true
        }
        this.setState({controls})
    };
    complaintChangeHandler = val => {
        let controls = this.state.controls;
        controls.complaint = {
            value: val, touched: true
        }
        this.setState({controls})
    };
    dateChangeHandler = date => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    date: {
                        ...prevState.controls.date,
                        value: date,
                        touched: true
                    },
                }
            }
        })
    };
    homeNoChangeHandler = val => {
        let controls = this.state.controls;
        controls.homeNo = {
            value: val, touched: true
        }
        this.setState({controls})
    };
    addressChangeHandler = val => {
        let controls = this.state.controls;
        controls.address = {
            value: val, touched: true
        }
        this.setState({controls})
    };
    visitorChangeHandler = val => {
        let controls = this.state.controls;
        controls.contactName = {
            value: val, touched: true
        }
        this.setState({controls})
    };
    relationChangeHandler = val => {
        let controls = this.state.controls;
        controls.contactRelationship = {
            value: val, touched: true
        }
        this.setState({controls})
    };
    phoneNoChangeHandler = val => {
        let controls = this.state.controls;
        controls.contactPhoneNo = {
            value: val, touched: true
        }
        this.setState({controls})
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
    reset=()=>{
             this.patinetNameInput.clear();
             this.surnameInput.clear();
             this.heightInput.clear();
             this.weightInput.clear();
             this.bloodTypeInput.clear();
             this.complaintInput.clear();
             this.homeNoInput.clear();
             this.mobileNoInput.clear();
             this.addressInput.clear();
             this.emailInput.clear();
             this.contactNameInput.clear();
             this.contactRelationInput.clear();
             this.contactPhoneNoInput.clear();

          };
    onSave = () => {
            this.props.onAddPatient(
                this.state.controls.patientName.value,
                this.state.controls.surName.value,
                this.state.controls.height.value,
                this.state.controls.weight.value,
                this.state.gender,
                this.state.controls.bloodType.value,
                this.state.controls.complaint.value,
                this.state.controls.date.value,
                this.state.controls.homeNo.value,
                this.state.controls.mobileNo.value,
                this.state.controls.address.value,
                this.state.controls.email.value,
                this.state.controls.contactName.value,
                this.state.controls.contactRelationship.value,
                this.state.controls.contactPhoneNo.value,
            );


     };

    render() {

        let saveButton = (
            <Button
                title="Save!"


                color="#000000"
                disabled={
                    !this.state.controls.patientName.valid ||!this.state.controls.surName.valid|| !this.state.controls.email.valid || !this.state.controls.mobileNo.valid
                }


                onPress={() => Alert.alert(
                    'Alert',
                    'Add This Patient ?',
                    [
                        {text: 'Cancel',},
                        {text: 'OK', onPress: this.onSave},
                    ],
                    { cancelable: false }
                )}

            />
        );

        if (this.props.isLoading) {
            saveButton = <ActivityIndicator/>;
        }

        const { PersonalStyle, } = styles;

        return (

                <KeyboardAvoidingView
                    style={styles.container}

                >

                <ScrollView showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}>

                    <View style={this.state.viewMode==="portrait"
                        ? styles.portraitInputContainer
                        : styles.landscapeInputContainer}>

                    <View  style={this.state.viewMode==="portrait"
                        ? styles.portraitInputWrapper
                        : styles.landscapeInputWrapper}>
                    <FormInput
                        textInputRef={ref => (this.patinetNameInput = ref)}
                        inputStyle={{color: 'black'}}
                        placeholder="Patient Name"
                        value={this.state.controls.patientName}
                        onChangeText={val=>this.updateInputState("patientName",val)}
                        autoCapitalize="non"
                        autoCorrect={true}
                        keyboardType="default"
                        valid={this.state.controls.patientName.valid}
                        onSubmitEditing={() => {
                            this.surnameInput.focus()
                        }}
                    />
                    {this.state.controls.patientName.touched && !this.state.controls.patientName.valid
                        ?<FormValidationMessage>Please Enter a Valid Name</FormValidationMessage>
                        :null}
                    </View>


                    <View style={this.state.viewMode==="portrait"
                        ? styles.portraitInputWrapper
                        : styles.landscapeInputWrapper}>
                    <FormInput
                        autoCorrect={true}
                        keyboardType="default"
                        inputStyle={{color: 'black'}}
                        placeholder="Sur Name"
                        value={this.state.controls.surName}
                        valid={this.state.controls.surName.valid}
                        onChangeText={val=>this.updateInputState("surName",val)}
                        textInputRef={ref => (this.surnameInput = ref)}
                        onSubmitEditing={() => {
                            this.emailInput.focus()
                        }}
                    />
                        {this.state.controls.surName.touched && !this.state.controls.surName.valid
                            ?<FormValidationMessage>Please Enter a Valid Name</FormValidationMessage>
                            :null}
                    </View>
                    </View>

                    <View style={this.state.viewMode==="portrait"
                        ? styles.portraitInputContainer
                        : styles.landscapeInputContainer}>
                    <View  style={this.state.viewMode==="portrait"
                        ? styles.portraitInputWrapper
                        : styles.landscapeInputWrapper}>
                            <FormInput
                                inputStyle={{color: 'black'}}
                                placeholder="E-mail address"
                                value={this.state.controls.email}
                                onChangeText={val=>this.updateInputState("email",val)}
                                autoCapitalize="non"
                                autoCorrect={false}
                                keyboardType="email-address"
                                textInputRef={ref => (this.emailInput = ref)}
                                onSubmitEditing={() => {
                                    this.mobileNoInput.focus()
                                }}
                            />
                            {this.state.controls.email.touched && !this.state.controls.email.valid
                                ?<FormValidationMessage>Please Enter a Valid Email</FormValidationMessage>
                                :null}
                        </View>
                    <View  style={this.state.viewMode==="portrait"
                        ? styles.portraitInputWrapper
                        : styles.landscapeInputWrapper}>
                            <FormInput

                                keyboardType="phone-pad"
                                inputStyle={{color: 'black'}}
                                placeholder="Mobile Number"
                                value={this.state.controls.mobileNo}
                                onChangeText={val=>this.updateInputState("mobileNo",val)}
                                textInputRef={ref => (this.mobileNoInput = ref)}
                                onSubmitEditing={() => {
                                    this.heightInput.focus()
                                }}
                            />
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
                    <FormInput

                        keyboardType="numeric"
                        inputStyle={{color: 'black'}}
                        placeholder="Height"
                        value={this.state.controls.height}
                        onChangeText={val=>this.updateInputState("height",val)}
                        textInputRef={ref => (this.heightInput = ref)}
                        onSubmitEditing={() => {
                            this.weightInput.focus()
                        }}
                    />
                    {this.state.controls.height.touched && !this.state.controls.height.valid
                        ?<FormValidationMessage>Please Enter a Valid Height with min Length 3 Numbers</FormValidationMessage>
                        :null}
                    </View>


                        <View  style={this.state.viewMode==="portrait"
                            ? styles.portraitInputWrapper
                            : styles.landscapeInputWrapper}>
                    <FormInput

                        keyboardType="numeric"
                        inputStyle={{color: 'black'}}
                        placeholder="Weight"
                        value={this.state.controls.weight}
                        onChangeText={this.weightChangeHandler}
                        textInputRef={ref => (this.weightInput = ref)}
                        onSubmitEditing={() => {
                            this.bloodTypeInput.focus()
                        }}
                    />
                    </View>
                    </View>

                    <View style={this.state.viewMode==="portrait"
                        ? styles.portraitInputContainer
                        : styles.landscapeInputContainer}>
                        <View  style={this.state.viewMode==="portrait"
                            ? styles.portraitInputWrapper
                            : styles.landscapeInputWrapper}>
                    <FormInput

                        keyboardType="default"
                        inputStyle={{color: 'black'}}
                        placeholder="Blood Type"
                        value={this.state.controls.bloodType}
                        onChangeText={this.bloodChangeHandler}
                        textInputRef={ref => (this.bloodTypeInput = ref)}
                        onSubmitEditing={() => {
                            this.complaintInput.focus()
                        }}
                    />
                    </View>

                        <View  style={this.state.viewMode==="portrait"
                            ? styles.portraitInputWrapper
                            : styles.landscapeInputWrapper}>

                    <FormInput
                        autoCorrect={true}
                        keyboardType="default"

                        inputStyle={{color: 'black'}}
                        placeholder="Complaint"
                        value={this.state.controls.complaint}
                        onChangeText={this.complaintChangeHandler}
                        textInputRef={ref => (this.complaintInput = ref)}
                        onSubmitEditing={() => {
                            this.homeNoInput.focus()
                        }}
                    />
                    </View>
                    </View>


                    <View style={this.state.viewMode==="portrait"
                        ? styles.portraitInputContainer
                        : styles.landscapeInputContainer}>
                        <View  style={this.state.viewMode==="portrait"
                            ? styles.portraitInputWrapper
                            : styles.landscapeInputWrapper}>
                    <FormInput
                        keyboardType="phone-pad"

                        inputStyle={{color: 'black'}}
                        placeholder="Home Number"
                        value={this.state.controls.homeNo}
                        onChangeText={this.homeNoChangeHandler}
                        textInputRef={ref => (this.homeNoInput = ref)}
                        onSubmitEditing={() => {
                            this.addressInput.focus()
                        }}
                    />
                    </View>

                        <View  style={this.state.viewMode==="portrait"
                            ? styles.portraitInputWrapper
                            : styles.landscapeInputWrapper}>
                    <FormInput

                        keyboardType="default"
                        inputStyle={{color: 'black'}}
                        placeholder="Address"
                        value={this.state.controls.address}
                        onChangeText={this.addressChangeHandler}
                        textInputRef={ref => (this.addressInput = ref)}
                    />
                        </View>
                    </View>


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
                    <DatePicker
                        style={this.state.viewMode==="portrait"
                            ? styles.portraitDateWrapper
                            : styles.landscapeDateWrapper}
                        date={this.state.controls.date.value}
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
                            },
                            placeholderText: {

                                color: '#000000'
                            }
                        }}
                        onDateChange={this.dateChangeHandler}/>
                    </View>
                        </View>
                    <View style={{paddingVertical: 5}}/>

                    <View style={styles.LineStyle}>
                        <Text style={PersonalStyle}>Contact in case of emergency</Text>
                    </View>
                    <View style={{paddingVertical: 5}}/>
                    <View>
                    <FormInput
                        autoCorrect={true}
                        keyboardType="default"
                        inputStyle={{color: 'black'}}
                        placeholder="Name"
                        value={this.state.controls.contactName}
                        onChangeText={this.visitorChangeHandler}
                        textInputRef={ref => (this.contactNameInput = ref)}
                        onSubmitEditing={() => {
                            this.contactRelationInput.focus()
                        }}
                    />
                    </View>
                    <View>
                    <FormInput
                        autoCorrect={true}
                        keyboardType="default"
                        inputStyle={{color: 'black'}}
                        placeholder="Relation"
                        value={this.state.controls.contactRelationship}
                        onChangeText={this.relationChangeHandler}
                        textInputRef={ref => (this.contactRelationInput = ref)}
                        onSubmitEditing={() => {
                            this.contactPhoneNoInput.focus()
                        }}
                    />
                    </View>
                    <View>
                    <FormInput
                        keyboardType="phone-pad"
                        inputStyle={{color: 'black'}}
                        placeholder="Phone No"
                        value={this.state.controls.contactPhoneNo}
                        onChangeText={this.phoneNoChangeHandler}
                        textInputRef={ref => (this.contactPhoneNoInput = ref)}
                    />
                    </View>

                <View style={styles.button}>
                    {saveButton}
                </View>

                </ScrollView>
                </KeyboardAvoidingView>

        );
    }
}

const styles = {
        container:{

            flex:1,
            justifyContent:"center",
            alignItems:"center",
          //  margin: 10,

        },
    InputHorzStyle: {
        flexDirection: 'row',
        flex: 1
    },
    HeaderStyle: {
        fontSize: 25,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    PersonalStyle: {

        paddingTop: 10,
        fontSize: 20,
        textAlign: 'center',
        color: '#8b0000',

    },

    LineStyle: {
        borderBottomWidth: 1,
        paddingVertical: 10
    },
    PickerStyle: {
        height: 20,
        width: 90,
        borderWidth: 1,
        borderColor: 'black',
        flex: 0.5
    },
    bgColor1: {
        flex: 1,
        backgroundColor: '#F0F8FF'
    },
    input:{
        backgroundColor:'transparent',
        borderColor:"black",

    },
    backgroundImage:{
        width:"100%",
        flex:1,
    },

    bgImage: {
        width:"100%",
        height:"100%"
    },
    button: {
        margin: 15,


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
    portraitDateWrapper:{
        width:325
    },
    landscapeDateWrapper:{
        width:225,
        paddingVertical: 10
    }
};


const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading,
        patientAdded: state.patientProfile.patientAdded
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onAddPatient: (patientName, surName, height, weight,
                       gender, bloodType, complaint, date,
                       homeNo, mobileNo, address, email, contactName,
                       contactRelationship, contactPhoneNo,) =>
            dispatch(addPatient(patientName, surName, height, weight,
                gender, bloodType, complaint, date,
                homeNo, mobileNo, address, email, contactName,
                contactRelationship, contactPhoneNo)),

        onStartAddPatient: () => dispatch(startAddPatient())


    };
};
export default connect(mapStateToProps, mapDispatchToProps)(PatientProfileScreen);