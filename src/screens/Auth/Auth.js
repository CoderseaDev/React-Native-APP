import React , {Component} from 'react';
import {
    View,
    StyleSheet,
    ImageBackground,
    Dimensions,
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback,
    ActivityIndicator,
    TextInput
} from 'react-native';
import  DefaultInput from "../../components/UI/DefaultInput/DefaultInput";
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import MainText from "../../components/UI/MainText/MainText";
import OfflineNotice from "../../components/OfflineNotice/OffilneNotice";
import backgroundImage from "../../assets/darkone.jpg";
import { Input, Button } from 'react-native-elements';
import validate from "../../utility/validation";
import {connect} from 'react-redux';
import {authSingIn , authAutoSignIn} from '../../store/actions/index';

console.disableYellowBox = true;

class AuthScreen extends Component{
    constructor(props){
        super(props);
        Dimensions.addEventListener("change" ,this.updateStyles);
    }
    state={
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
        navBarHidden: true
    };

    /*****
     *  after return to the default body of screen (portrait)
     */
    componentWillUnmount(){
        Dimensions.removeEventListener("change",this.updateStyles);
    }


    /****
     *
     * @param dims  operators conditions ,, update view mode from portorat to landscape by window height
     */
    updateStyles =(dims)=>{
        this.setState({
            viewMode:
                dims.window.height > 500 ? "portrait" : "landscape",
        });
    };
    /********
     * When onPress Login
     */
    authHandler = ( ) =>{
        const  authData ={
            email:this.state.controls.email.value,
            password:this.state.controls.password.value
        };
        this.props.onTryAuth(authData ,this.state.authMode );
    };
    /*****
     *
     * @param key identifer my contorls like email , password , ...
     * @param value
     */
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
                buttonStyle={styles.buttonStyle}
                containerStyle={styles.buttonContainerStyle}
                titleStyle={styles.buttonTitleStyle}
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
                    <OfflineNotice/>
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
                                          //autoCapitalize="non"
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
                                    <DefaultInput
                                        placeholder="Password"
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
    backgroundImage:{
        width:"100%",
        flex:1,

    },
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",

    },
    inputContainer:{
        width:"80%",

    },
    input:{
        borderColor:"#bbb",
        color: 'white',

    },
    portraitPasswordContainer:{
        flexDirection:"column",
        justifyContent:"flex-start"
    },
    landscapePasswordContainer:{
        flexDirection:"row",
        justifyContent:"space-between"
    },
    portraitPasswordWrapper:{
        width: "100%",
    },
    landscapePasswordWrapper:{
        width: "45%",
    },
    buttonStyle:{height: 50,
        width: 250,
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#E6E6FA',
        borderRadius: 30
    },
    buttonContainerStyle: {
            marginVertical: 10
        },
    buttonTitleStyle: {
        color:'white'},
    inputs1:{
        width:"100%",
        borderWidth:1,
        borderColor:"#eee",
        padding : 5,
        marginTop:8,
        marginBottom:8,
        backgroundColor: 'transparent' ,
        color : "white"

    },
    invalid:{
        backgroundColor:"#f9c0c0",
        borderColor:"red",
    },
});

const mapStateToProps = state =>{
    return{
        isLoading :state.ui.isLoading
    }  ;
};

const mapDispatchToProps = dispatch=>{
    return{
        onTryAuth:(authData , authMode)=> dispatch(authSingIn(authData, authMode)),
        onAutoSignIn:()=> dispatch(authAutoSignIn())
    };
};
export default connect(mapStateToProps ,mapDispatchToProps)(AuthScreen);

