import React ,{Component} from 'react';
import {View , ActivityIndicator ,TouchableOpacity, Text , StyleSheet  , KeyboardAvoidingView} from 'react-native';
import {connect} from 'react-redux';
import VisitorsList from '../../components/VisitorsList/VisitorsList';
import { getVisitor } from "../../store/actions/index";


class VisitorDataScreen extends Component{
    static navigatorStyle = {
        navBarButtonColor: "#000000"
    };



    constructor(props){
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
        this.state = {
            data: null,
            text: this.props.visits
        }
    }

    onNavigatorEvent = event => {
        if (event.type === "ScreenChangedEvent") {
            if (event.id === "willAppear") {
                this.props.onLoadVisits(this.props.pkey1);
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

 // to return the key of the visit data
    itemSelectedHandler=key=>{
        const selVisit = this.props.visits.find(visit=> {
          //  patientProfile._id
            return visit._id === key;
        });



        this.props.navigator.push({
            screen :"Medical.VisitorDataDetailsScreen",
            title : selVisit.name ,
            passProps:{
                selectedVisit : selVisit
            }
        });

    };

    pic = ()=>{


        console.log("props of key1" ,this.props.pkey1);


    };

    addVisitHandler = () =>{
        const selPatientToReturnVisitors = this.props.pkey1;





       /* const selPatient = this.props.patients.find(ss => {
            return this.props.pkey1 === key;

        });*/

        this.props.navigator.push({
            screen: 'Medical.VisitScreen',
         //   title: `Add Visit To : ${selPatient.patientName}`,
            passProps: {
                pkey: selPatientToReturnVisitors
             },

        });
        console.log("sss " ,selPatientToReturnVisitors);
    };
    render(){

        let saveButton1 = (
            <TouchableOpacity
                style={styles.addButton}
                onPress={this.addVisitHandler}
              >
                {this.props.isLoading
                    ?<ActivityIndicator color="#000"/>
                    :<Text style={{color : "#F8F8FF" , fontWeight: 'bold'}}>Add</Text>}
            </TouchableOpacity>
        );
        if (this.props.isLoading) {
            return (
                <ActivityIndicator
                    animating={true}
                    style={{flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 80}}
                    size="large"
                />
            );
        }

        let viewButton = (

                <VisitorsList visits={this.props.visits}
                              onItemSelected={this.itemSelectedHandler}/>

        );
        return (
    <KeyboardAvoidingView style={styles.container}  >

                {viewButton}
            {saveButton1}


    </KeyboardAvoidingView>

        );

    }
}

const styles = StyleSheet.create({
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
        flex:1,
        marginTop: 50

    },
    container:{
        flex:1,
       // justifyContent:"center",
      //  alignItems:"center",
    },
});

const mapStateToProps = state =>{
    return{
        visits : state.visit.visits,
        isLoading: state.ui.isLoading,
        patients: state.patientProfile.patients
    };
};


const mapDispatchToProps = dispatch=>{
    return{

        onLoadVisits :(pkey1)=> dispatch(getVisitor(pkey1))
    };
};
export default connect(mapStateToProps , mapDispatchToProps) (VisitorDataScreen);



