
import React, {Component} from 'react';
import {Animated,StyleSheet, FlatList , ActivityIndicator  } from 'react-native';
import ListItem1 from '../ListItem/ListItem1';
import {createFilter} from 'react-native-search-filter';
import {Header, Item, Input, Icon} from 'native-base';

class PatientProfileList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            KEYS_TO_FILTERS: ['patientName', 'patientId' , 'surName' ,'mobileNo'],
            search: '',

            loading: true

        };
    }

    searchUpdated(term) {
        this.setState({search: term})
    }




    renderItem = ({ item }) => (
        <ListItem1 patientName={item.patientName}
                   surName ={item.surName}
                   patientId={item.patientId}
                   mobileNo={item.mobileNo}
                   onItemPressed={() => this.props.onItemSelected(item._id)}
                   onAddPressed={() => this.props.onAddVisit(item._id)}
        />
    );

componentWillMount(){

        setTimeout(()=>{
                this.setState({
                    loading : false
                })
            },
            3000)
    }


    render() {


        return (

            <Animated.ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
              //  onMomentumScrollEnd={() => this.showSpinner()}
            >

                <Header searchBar rounded style={styles.SearchBar}>
                    <Item>
                        <Icon name="ios-search" />
                        <Input
                            onChangeText={(term)=>{this.searchUpdated(term)}}
                            placeholder="Search By Name / ID / Phone No " />
                        <Icon name="ios-people" />
                    </Item>
                </Header>
                <FlatList
                    style={styles.listContainer}
                    data={this.props.patients.filter(createFilter(this.state.search, this.state.KEYS_TO_FILTERS))}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index}

                />

                {this.state.loading
                    ?<ActivityIndicator  />
                    :null
                }

            </Animated.ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    SearchBar:
        {
            backgroundColor: '#000000'},
    listContainer: {
        width: "100%"
    },

});


export default PatientProfileList;