import React, {Component} from 'react';
import {View, Button, StyleSheet, ScrollView, ActivityIndicator, KeyboardAvoidingView, Dimensions , ImageBackground} from 'react-native';
import DatePicker from 'react-native-datepicker';

import PickImage from '../../components/PickImage/PickImage';
import validate from "../../utility/validation";
import {connect} from 'react-redux';
import {FormInput} from 'react-native-elements'
import {addRochta} from "../../store/actions/index";

class VisitScreen extends Component {
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
        Dimensions.addEventListener("change" ,this.updateStyles);
    }

    state = {
        controls: {
            visitorName: {
                value: "",
                valid: false,
                touched: false,
                validationRules: {
                    notEmpty: true
                }
            },

            comment: {
                value: "",
                valid: false,
                touched: false,
                validationRules: {
                    notEmpty: true
                }
            },

            date: {
                value: null,
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


    visitorNameChangedHandler = val => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    visitorName: {
                        ...prevState.controls.visitorName,
                        value: val,
                        valid: validate(val, prevState.controls.visitorName.validationRules),
                        touched: true
                    },
                }
            };
        });
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
        this.props.onAddRochta(
            this.state.controls.visitorName.value,
            this.state.controls.comment.value,
            this.state.controls.image.value,
            this.state.controls.date.value,
            this.props.pkey,
        );
    };


    render() {
        let submitButton = (
            <Button
                color="#000000"
                title="Add"
                onPress={this.rochtaAddedHandler}
                disabled={
                    !this.state.controls.visitorName.valid ||
                    !this.state.controls.comment.valid||
                     !this.state.controls.date.valid ||
                    !this.state.controls.image.valid
                }
            />
        );
        if (this.props.isLoading) {
            submitButton = <ActivityIndicator/>;





        }
        return (

            <KeyboardAvoidingView
                style={styles.container}
            >

            <ScrollView    showsVerticalScrollIndicator={false}
                           showsHorizontalScrollIndicator={false}>

                <View style={this.state.viewMode==="portrait"
                    ? styles.portraitInputContainer
                    : styles.landscapeInputContainer}>
                    <View  style={this.state.viewMode==="portrait"
                        ? styles.portraitInputWrapper
                        : styles.landscapeInputWrapper}>

                    <FormInput
                        autoCorrect={true}
                        keyboardType="default"
                        inputStyle={{color: 'black'}}
                        placeholder="Visitor Name"
                        visitData={this.state.controls.visitorName}
                        onChangeText={this.visitorNameChangedHandler}
                    />
                    </View>
                    <View style={{paddingVertical: 10}}/>
                        <View style={this.state.viewMode==="portrait"
                            ? styles.portraitInputWrapper
                            : styles.landscapeInputWrapper}>
                    <DatePicker
                        visitdata={this.state.controls.date}
                        style={this.state.viewMode==="portrait"
                            ? styles.portraitDateWrapper
                            : styles.landscapeDateWrapper}
                       // style={{width: 325 }}
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
                        onDateChange={this.dateChangeHandler}
                    />
                    </View>
                    </View>

                <View style={{paddingVertical: 10}}/>



                    <PickImage
                        onImagePicked={this.imagePickedHandler}
                    />


                <View style={{paddingVertical: 8}}/>

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
        {submitButton}
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
    bgImage: {
       // width:"100%",
      //  height:"100%",

          flex: 1,

         top: 0,
          left: 0,
        //  width: SCREEN_WIDTH,
        //   height: SCREEN_HEIGHT,
    justifyContent: 'center',
        alignItems: 'center',
        //  opacity: .5
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
        width:325
    },
    landscapeDateWrapper:{
        width:225,
        paddingVertical: 10
    }


});

//get redux state as an argument
const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading

    };
};


const mapDispatchToProps = dispatch => {
    return {
        onAddRochta: (visitorName, comment, image, date, pkey) => dispatch(addRochta(visitorName, comment, image, date, pkey))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VisitScreen);