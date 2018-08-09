import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import { ListItem ,} from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons';


/**********
 *@param props to Patients ListItem In Search
 */
const listItem1 = (props) => (
    <ListItem
        rightIcon={
            <TouchableOpacity  onPress={props.onAddPressed}>
            <View style={styles.ViewButton}>
                <View style={styles.ViewIconWithText}>
                <Text size={10}>Add Visit</Text>
            <Icon
                name='md-clipboard'
                color='gray'
                size={20}
                style={styles.IconStyle}
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
                <Text style={styles.ratingText1}>{props.surName}</Text>
            </View>
            </TouchableOpacity>

        }

    />

);
const styles = StyleSheet.create({
    ViewButton:{
        backgroundColor: 'rgba(222,222,222,1)',
        marginRight: 10 ,
        width: 110,
        height: 28,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10
    },

    ViewIconWithText:{
        flexDirection:"row"
    },
    IconStyle:{
            marginLeft:10
    },
    subtitleView: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 5
    },
    ratingText: {
        paddingLeft: 8,
        color: 'grey'
    },
    ratingText1: {
        paddingLeft: 3,
        color: 'grey'
    }

});

export default listItem1;