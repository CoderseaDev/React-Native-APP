import React ,{Component} from 'react';
import {View , Text} from 'react-native';
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





   /* onNavigatorEvent = event =>{
// to load visitor data screen all the time we don't need to refresh
                this.props.onLoadVisits(this.props.pkey1);

// to show the sideDrawer
        if(event.type==="NavBarButtonPress"){
            if(event.id==="sideDrawerToggle"){
                this.props.navigator.toggleDrawer({
                    side:"left"
                });
            }
        }
    };*/

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
        console.log("show selected visit" , selVisit)
    };


    render(){
        return (
            <View>

                <VisitorsList visits={this.props.visits}
                              onItemSelected={this.itemSelectedHandler}/>

            </View>
        );

    }
}

const mapStateToProps = state =>{
    return{
        visits : state.visit.visits
    };
};


const mapDispatchToProps = dispatch=>{
    return{
        onLoadVisits :(pkey1)=> dispatch(getVisitor(pkey1))
    };
};
export default connect(mapStateToProps , mapDispatchToProps) (VisitorDataScreen);



