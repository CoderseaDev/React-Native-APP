import React ,{Component} from 'react';
import {View , ActivityIndicator} from 'react-native';
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


    render(){

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
                <VisitorsList visits={this.props.visits}
                              onItemSelected={this.itemSelectedHandler}/>
            </View>
        );
        return (
            <View>
                {viewButton}
            </View>
        );

    }
}

const mapStateToProps = state =>{
    return{
        visits : state.visit.visits,
        isLoading: state.ui.isLoading,
    };
};


const mapDispatchToProps = dispatch=>{
    return{
        onLoadVisits :(pkey1)=> dispatch(getVisitor(pkey1))
    };
};
export default connect(mapStateToProps , mapDispatchToProps) (VisitorDataScreen);



