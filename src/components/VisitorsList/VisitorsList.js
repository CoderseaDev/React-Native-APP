import React from 'react';
import {  StyleSheet , FlatList } from 'react-native';
import ListItem from '../ListItem/ListItem';
const VisitorsList = props => {
    return (
        <FlatList
            style={styles.listContainer}
            data={props.visits}
            renderItem={(info)=>(
                <ListItem
                    visitorName={info.item.visitorName}
                    //date ={info.item.date}
                    onItemPressed ={()=> props.onItemSelected(info.item._id)}
                />

            ) }


        />

    );
};
const styles = StyleSheet.create({
    listContainer: {
        width: "100%"
    }
});
export default VisitorsList;
