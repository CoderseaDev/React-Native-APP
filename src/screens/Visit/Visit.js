import React, {Component} from 'react';
import {View, Button, StyleSheet, ScrollView, ActivityIndicator, KeyboardAvoidingView, Dimensions , TouchableOpacity , Text} from 'react-native';
import DatePicker from 'react-native-datepicker';

import PickImage from '../../components/PickImage/PickImage';
import validate from "../../utility/validation";
import {connect} from 'react-redux';
import {FormInput} from 'react-native-elements'
import {addVisitor} from "../../store/actions/index";
class VisitScreen extends Component {
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
        Dimensions.addEventListener("change" ,this.updateStyles);
    }

    state = {
        controls: {
          comment: {
                value: "",
                valid: false,
                touched: false,
                validationRules: {
                    notEmpty: true
                }
            },

            date: {
                value: new Date(),
                valid: false,
            },
            image: {
                value: null,
                valid: false,
            },
        }
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

    //This Method Tho Handle The Button Event The Button Of SideDrawer At The Top

    static navigatorStyle = {
        navBarButtonColor: "#000000",

    };



    onNavigatorEvent = event => {

        if (event.type === "NavBarButtonPress") {
            if (event.id === "sideDrawerToggle") {
                this.props.navigator.toggleDrawer({
                    side: "left"
                });
            }
        }
    };

    commentChangeHandler = val => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    comment: {
                        ...prevState.controls.comment,
                        value: val,
                        valid: validate(val, prevState.controls.comment.validationRules),
                        touched: true
                    },


                }
            };
        });
    };
    imagePickedHandler = image => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    image: {
                        value: image,
                        valid: true,

                    }
                }
            }
        });
    };
    dateChangeHandler = date => {
        this.setState(prevState => {
            return {

                controls: {
                    ...prevState.controls,
                    date: {
                        ...prevState.controls.date,
                        value: date,
                        valid: validate(date, prevState.controls.date.validationRules),
                        touched: true
                    },
                }
            }
        })
    };

    rochtaAddedHandler = () => {
        this.props.onAddVisitor(
            this.state.controls.comment.value,
            this.state.controls.image.value,
            this.state.controls.date.value,
            this.props.pkey,

        );
    };


    render() {
            let saveButton1 = (
                <TouchableOpacity
                    style={!this.state.controls.image.valid? styles.addButtonIfDisabled : styles.addButton}
                    onPress={this.rochtaAddedHandler}
                    disabled={
                         !this.state.controls.image.valid
                    }>
                    {this.props.isLoading
                        ?<ActivityIndicator color="#000"/>
                        :<Text style={{color : "#F8F8FF" , fontWeight: 'bold'}}>SAVE</Text>}
                </TouchableOpacity>
            );
        return (

            <KeyboardAvoidingView
                style={styles.container}
            >
                <View  style={{margin: 15}}>
                <Button title={"SAVE"} onPress={this.rochtaAddedHandler} disabled={
                    !this.state.controls.image.valid
                }/>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}>

                        <Text style={{textAlign: 'center'}} >Date</Text>

                    <View style={{alignItems: 'center'}}>
                    <DatePicker
                        visitdata={this.state.controls.date}
                        style={{width: "80%"}}
                        date={this.state.controls.date.value}
                        mode="date"
                        placeholder="select date"
                        format="YYYY-MM-DD"
                        minDate="1970-01-01"
                        maxDate="2050-01-01"
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
                        onDateChange={this.dateChangeHandler}
                    />
                    </View>
                <View style={{paddingVertical: 5}}/>
                    <PickImage
                        onImagePicked={this.imagePickedHandler}
                    />
                <View style={{paddingVertical: 5}}/>
    <View style={styles.viewComment}>
                <View style={styles.placeholder} >
                    <FormInput
                        autoCorrect={true}
                        keyboardType="default"
                        inputStyle={{color: 'black'}}
                        style={styles.previewComment}
                        underlineColorAndroid="transparent"
                        placeholder={"Leave a Comment ...."}
                        placeholderTextColor={"grey"}
                        numberOfLines={5}
                        multiline={true}
                        visitData={this.state.controls.comment}
                        onChangeText={this.commentChangeHandler}
                    />
                </View>
    </View>

    <View style={{paddingVertical: 8}}/>

    <View style={styles.button}>
        {saveButton1}
    </View>

                </ScrollView>
            </KeyboardAvoidingView>

        );
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },

    viewComment:{
        width:"100%",
        alignItems :"center",
    },
    placeholder: {
        borderWidth: 1,
        borderColor: "black",
        width:"80%",
        height: 150,

    },
    previewComment:{
        width:"100%",
        height:"100%",
    },
    button: {
        margin: 30,

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
    portraitDateWrapper:{
        width: "100%"
    },
    landscapeDateWrapper:{
        width:225,
        paddingVertical: 10
    },
    addButton: {
        position: 'absolute',
        zIndex: 11,
        right: 30,
        bottom: 20,
        backgroundColor: '#1E90FF',
        width: 55,
        height: 55,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
    },
    addButtonIfDisabled: {
        position: 'absolute',
        zIndex: 11,
        right: 30,
        bottom: 20,
        backgroundColor: '#D3D3D3',
        width: 55,
        height: 55,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
    },
});

//get redux state as an argument
const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading

    };
};


const mapDispatchToProps = dispatch => {
    return {
        onAddVisitor: ( comment, image, date, pkey) => dispatch(addVisitor( comment, image, date, pkey))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VisitScreen);