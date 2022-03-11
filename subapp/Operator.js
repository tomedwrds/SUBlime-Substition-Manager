import React from 'react';

import {
    Pressable,
    Text
} from 'react-native';

const Operator = (props) => {
    return(
        <Pressable
            onPress={props.onPressFunction}
        >
            <Text style = {props.style}>{props.text}</Text> 
        </Pressable>
    )
}

export default Operator;