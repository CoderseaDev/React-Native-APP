import React from 'react';
import { View, StyleSheet , TouchableOpacity , Image , Text } from 'react-native';
import { Container, Header, Content, Button } from 'native-base';
import { ListItem , ButtonGroup } from 'react-native-elements'



const listItem = (props) => (


    <ListItem

        subtitle={
            <TouchableOpacity onPress={props.onItemPressed}>
                <View style={styles.subtitleView}>
                    <Image resizeMode="contain" source={props.image} style={styles.image}/>
                    <Text style={styles.ratingText}>{props.visitorName}</Text>
                   {/* <Text style={styles.ratingText}>{props.date}</Text>*/}

                </View>


            </TouchableOpacity>

        }/>

);

const styles = StyleSheet.create({
    listItem: {
        width: "100%",
        marginBottom: 5,
        padding: 10,
        backgroundColor: "#eee",
        flexDirection:"row",
        alignItems:"center"
    },

    image:{
        marginRight: 8 ,
        height:30,
        width: 30,
    },

    viewButton:{
        marginLeft: 30
        ,
    },
    subtitleView: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 5
    },
    ratingText: {
      //  paddingLeft: 10,
        color: 'black'
    },
    ratingDate:{
        paddingLeft: 10,
        color:'grey'
    }
});

export default listItem;