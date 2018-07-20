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
                   date ={info.item.date}
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




/*
import React, { Component } from 'react';
import {  StyleSheet , FlatList , View } from 'react-native';
import { Container, Header, Item, Input, Icon, Button, Text } from 'native-base';
import ListItem from '../ListItem/ListItem';
import SearchInput, { createFilter } from 'react-native-search-filter';
const KEYS_TO_FILTERS = ['user.name', 'subject'];





const VisitorsList = props => {



        return (
            <View>

                <Header searchBar rounded>
                    <Item>
                        <Icon name="ios-search" />
                        <Input placeholder="Search" />
                        <Icon name="ios-people" />
                    </Item>
                    <Button transparent>
                        <Text>Search</Text>
                    </Button>

                </Header>



                <FlatList

                    style={styles.listContainer}
                    data={props.visits}
                    renderItem={(info)=>(
                        <ListItem
                            visitorName={info.item.name}
                            date ={info.item.date}
                            onItemPressed ={()=> props.onItemSelected(info.item.key)}
                        />

                    ) }


                />
                </View>






        );

};

const styles = StyleSheet.create({
    listContainer: {
        width: "100%"
    }
});

export default VisitorsList;*/
