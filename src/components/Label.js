import React from 'react';
import {Text, View} from 'react-native';


//props !
const Label = ({label}) => {

    const {labelStyle, containerStyle} = styles;

    return (
        <View style={containerStyle}>
            <Text style={labelStyle}>{label}</Text>
        </View>
    );

};

const styles = {

    labelStyle: {
        fontSize: 18,
    },
    containerStyle: {
        flex: 0.3,
        flexDirection: 'row',
        alignItems: 'center',
        margin: 15,
        paddingLeft: 5
    }
}

export {Label} ;