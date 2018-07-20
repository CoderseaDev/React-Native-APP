import React , {Component} from 'react';
import {View ,Text, StyleSheet ,ImageBackground , Dimensions , KeyboardAvoidingView , Keyboard , TouchableWithoutFeedback , ActivityIndicator} from 'react-native';
import  DefaultInput from "../../components/UI/DefaultInput/DefaultInput";
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import MainText from "../../components/UI/MainText/MainText";

import backgroundImage from "../../assets/darkone.jpg";
import { Input, Button } from 'react-native-elements'

import validate from "../../utility/validation";
import {connect} from 'react-redux';
import {tryAuth , authAutoSignIn} from '../../store/actions/index';

console.disableYellowBox = true; // this is to remove yello boxess greeeeaaat

class AuthScreen extends Component{

    state={
        //this state to make your deice landscape and portarit deminsons
        viewMode : Dimensions.get("window").height>500 ? "portrait": "landscape",

        authMode:"login",

        controls:{
            email:{
                value:"",
                valid: false,
                validationRules:{
                    isEmail: true
                },
                touched: false
            },
            password:{
                value:"",
                valid: false,
                validationRules:{
                    minLength: 6
                },
                touched: false
            },
        }

    };


    componentDidMount() {
        this.props.onAutoSignIn();
    }
    static navigatorStyle = {
       // navBarButtonColor: "#1E90FF",
        navBarHidden: true
    };

    // this event linster to handle when a give a mobile deminshon to (landscabe) it handle event listner
    constructor(props){
        super(props);
        Dimensions.addEventListener("change" ,this.updateStyles);
    }

    // after i return to the default body of screen (portrait)
    componentWillUnmount(){
        Dimensions.removeEventListener("change",this.updateStyles);
    }


    // operators conditions ,, update view mode from portorati to landscape by window height
    updateStyles =(dims)=>{
        this.setState({
            viewMode:
                dims.window.height > 500 ? "portrait" : "landscape",
        });
    };


    authHandler = ( ) =>{
        const  authData ={
            email:this.state.controls.email.value,
            password:this.state.controls.password.value
        };
        this.props.onTryAuth(authData ,this.state.authMode );



    };

// key the identifer my contorls like email , password , ...
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

    render(){

        let headingText= null;


        let submitButton1 = (

            <Button
                onPress={this.authHandler}
               title='LOG IN'
                activeOpacity={1}
                underlayColor="transparent"
                buttonStyle={{height: 50, width: 250, backgroundColor: 'transparent', borderWidth: 2, borderColor: '#E6E6FA', borderRadius: 30}}
                containerStyle={{marginVertical: 10}}
                titleStyle={{ color:'white'  }}
                >

            </Button>

        );
        if(this.state.viewMode==="portrait"){
            headingText=(
                <MainText>
                    <HeadingText>Please Log In</HeadingText>
                </MainText>
            );
        }

        if(this.props.isLoading){
            submitButton1 = <ActivityIndicator/>;

        }


        return(
            <ImageBackground source={backgroundImage}   style={styles.backgroundImage}>
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior="padding"
                >

                    {headingText}


                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.inputContainer}>
                            <DefaultInput
                                placeholder="Your E-mail address"
                                placeholderTextColor="white"
                                         style={styles.input}
                                          value={this.state.controls.email.value}
                                          onChangeText={val=>this.updateInputState("email",val)}
                                          valid={this.state.controls.email.valid}
                                          touched={this.state.controls.email.touched}
                                          autoCapitalize="non"
                                          autoCorrect={false}
                                          keyboardType="email-address"
                            />
                            <View style={this.state.viewMode==="portrait" ||
                            this.state.authMode==="login"
                                ? styles.portraitPasswordContainer
                                : styles.landscapePasswordContainer}>

                                <View style={this.state.viewMode==="portrait" ||
                                this.state.authMode==="login"
                                    ? styles.portraitPasswordWrapper
                                    : styles.landscapePasswordWrapper}>


                                    <DefaultInput placeholder="Password"
                                                  placeholderTextColor="white"
                                                  style={styles.input}
                                                  value={this.state.controls.password.value}
                                                  onChangeText={val=>this.updateInputState("password",val)}
                                                  valid={this.state.controls.password.valid}
                                                  touched={this.state.controls.password.touched}
                                                  secureTextEntry

                                    />
                                </View>

                            </View>
                        </View>
                    </TouchableWithoutFeedback>

                    {submitButton1}




                </KeyboardAvoidingView>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",

    },
    inputContainer:{
        width:"80%",

    },
    input:{
       // backgroundColor:"#eee",
        borderColor:"#bbb",
        color: 'white',

    },
    backgroundImage:{
        width:"100%",
        flex:1,

    },
    landscapePasswordContainer:{
        flexDirection:"row",
        justifyContent:"space-between"
    },
    portraitPasswordContainer:{
        flexDirection:"column",
        justifyContent:"flex-start"
    },
    landscapePasswordWrapper:{
        width: "45%",
    },
    portraitPasswordWrapper:{
        width: "100%",
    },

});

const mapStateToProps = state =>{
    return{
        isLoading :state.ui.isLoading


    }  ;
};

const mapDispatchToProps = dispatch=>{
    return{
        onTryAuth:(authData , authMode)=> dispatch(tryAuth(authData, authMode)),

        onAutoSignIn:()=> dispatch(authAutoSignIn())
    };
};
export default connect(mapStateToProps ,mapDispatchToProps)(AuthScreen);

