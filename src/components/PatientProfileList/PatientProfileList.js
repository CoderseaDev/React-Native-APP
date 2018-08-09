
import React, {Component} from 'react';
import {StyleSheet, FlatList , ScrollView} from 'react-native';
import ListItem1 from '../ListItem/ListItem1';
import {createFilter} from 'react-native-search-filter';
import {Header, Item, Input, Icon} from 'native-base';

class PatientProfileList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            KEYS_TO_FILTERS: ['patientName', 'patientId' , 'surName'],
            search: '',
        };
    }
    searchUpdated(term) {
        this.setState({search: term})
    }
    renderItem = ({ item }) => (
        <ListItem1 patientName={item.patientName}
                   surName ={item.surName}
                   patientId={item.patientId}
                   onItemPressed={() => this.props.onItemSelected(item._id)}
                   onAddPressed={() => this.props.onAddVisit(item._id)}
        />
    );
    render() {
        return (
<ScrollView
    showsVerticalScrollIndicator={false}
    showsHorizontalScrollIndicator={false}
>
        <Header searchBar rounded style={styles.SearchBar}>
            <Item>
                <Icon name="ios-search" />
                <Input
                    onChangeText={(term)=>{this.searchUpdated(term)}}
                    placeholder="Search For Patients / ID " />
                <Icon name="ios-people" />
            </Item>
        </Header>
                <FlatList
                    style={styles.listContainer}
                    data={this.props.patients.filter(createFilter(this.state.search, this.state.KEYS_TO_FILTERS))}
                        renderItem={this.renderItem}
                />
</ScrollView>
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
