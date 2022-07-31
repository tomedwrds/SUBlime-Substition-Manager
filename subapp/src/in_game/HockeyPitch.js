import { View } from "react-native"



const HockeyPitch = () =>
(
    <View style = {{flex:1}}>  
        {/* Top quarter */}
        <View style = {{flex: 1,flexDirection:'row', backgroundColor: 'green',borderBottomWidth:2,borderColor:'white'}}>
        <View style = {{flex:1, backgroundColor:'green'}}></View>
        <View style = {{flex:4}}>
            <View style = {{flex:17,borderRightWidth:2,borderLeftWidth:2,borderBottomWidth:2,borderColor:'white', borderBottomEndRadius:150,borderBottomStartRadius:150}}></View>
            <View style ={{flex:3}}></View>
        </View>
        <View style = {{flex:1, backgroundColor:'green'}}></View>
        </View>
        {/* Middle half of field */}
        <View style = {{flex: 1, backgroundColor: 'green',borderBottomWidth:2,borderColor:'white'}}></View>
        <View style = {{flex: 1, backgroundColor: 'green',borderBottomWidth:2,borderColor:'white'}}></View>

        {/* Bottom quarter */}
        <View style = {{flex: 1, backgroundColor: 'green',flexDirection:'row'}}>
        <View style = {{flex:1, backgroundColor:'green'}}></View>
        <View style = {{flex:4}}>
            <View style = {{flex:3}}></View>
            <View style = {{flex:17,borderRightWidth:2,borderLeftWidth:2,borderTopWidth:2,borderColor:'white', borderTopLeftRadius:150,borderTopRightRadius:150}}></View>
        </View>
        <View style = {{flex:1, backgroundColor:'green'}}></View>
        </View>
    </View> 
        

)

export default (HockeyPitch)
