import React from 'react';
import { View, StyleSheet , TouchableOpacity ,Text } from 'react-native';
import { ListItem  } from 'react-native-elements';
import Moment from 'moment';
/**
 *@param props to Visitors History ListItem
 */
Moment.locale('en');

const listItem = (props) => (

    <ListItem
        subtitle={
            <TouchableOpacity onPress={props.onItemPressed}>
                <View style={styles.subtitleView}>
                    <Text style={styles.ratingText}>{Moment(props.date).format('DD - MM - YYYY')}</Text>
                </View>
            </TouchableOpacity>
        }/>
);
const styles = StyleSheet.create({
    subtitleView: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 5
    },
    ratingText: {
        color: 'black'
    },
});
export default listItem;



