import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text , TouchableHighlight} from 'react-native';
import { ListItem ,} from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons';


/**********
 *@param props to Patients ListItem In Search
 */
const listItem1 = (props) => (
    <ListItem
        rightIcon={
            <TouchableOpacity activeOpacity={-10}  onPress={props.onAddPressed}>
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
            <TouchableOpacity  activeOpacity={-10} onPress={props.onItemPressed}>
                <View style={styles.subtitleView}>
                    <Text >{props.patientId}</Text>
                    <View style={{paddingHorizontal: 2}}/>
                    <Text>-</Text>
                    <Text style={styles.ratingFn}>{props.patientName}</Text>
                    <Text style={styles.ratingSn}>{props.surName}</Text>

                </View>

                <View >
                    <Text style={styles.ratingNo}>Mobile No : {props.mobileNo}</Text>
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
        paddingLeft: 2,
        paddingTop: 5
    },
    ratingFn: {
        paddingLeft: 8,
        color: 'grey'
    },
    ratingSn: {
        paddingLeft: 3,
        color: 'grey'
    },
    ratingNo: {
        paddingVertical: 3,
        color: 'grey',
        paddingHorizontal: 2
    }


});

export default listItem1;