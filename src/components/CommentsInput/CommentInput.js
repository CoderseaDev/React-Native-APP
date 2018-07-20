import React, { Component } from 'react';
import { TextInput ,View } from 'react-native';
import { Container, Header, Left, Body, Title, Right, Content, Textarea, Form } from "native-base";
class CommentInput extends Component {

    render() {
        return (

            <View style={{
                //     backgroundColor: ,
                borderBottomColor: '#000000',
                borderBottomWidth: 22 }}
            >


            <Textarea
                {...this.props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
                editable = {true}
                maxLength = {40}
                numberOfLines = {4}
                multiline = {true}

            />
            </View>
        );
    }
}

export default CommentInput;