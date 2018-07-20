import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import { ListItem ,} from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons';
const listItem1 = (props) => (




    <ListItem
        rightIcon={
            <TouchableOpacity  onPress={props.onAddPressed}>
            <View style={{ backgroundColor: 'rgba(222,222,222,1)',marginRight: 10 , width: 110, height: 28, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginHorizontal: 10}}>

                <View style={{  flexDirection:"row"}}>
                <Text size={10}>Add Visitor</Text>
            <Icon
                name='md-contacts'
                color='gray'
                size={20}
                style={{marginLeft:10}}
            />
                </View>
        </View>
            </TouchableOpacity>
       }
        subtitle={
            <TouchableOpacity onPress={props.onItemPressed}>

            <View style={styles.subtitleView}>
                <Text >{props.patientId}</Text>
                <View style={{paddingHorizontal: 2}}/>
                <Text>-</Text>
                <Text style={styles.ratingText}>{props.patientName}</Text>

            </View>
            </TouchableOpacity>

        }

    />

);
const styles = StyleSheet.create({
    listItem: {
        width: "100%",
        marginBottom: 5,
        padding: 10,
        backgroundColor: "#eee",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
    },

    ratingImage: {
        height: 19.21,
        width: 100
    },
    subtitleView: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 5
    },
    viewButton1: {
        flexDirection: "row",
        marginLeft: 52,

    },
    ratingText: {
        paddingLeft: 10,
        color: 'grey'
    }
});

export default listItem1;