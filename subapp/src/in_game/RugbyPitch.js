import { View } from "react-native"



const RugbyPitch = () =>
(
    <View style = {{flex:1}}>  
        {/* Top quarter */}
        
        <View style = {{flex: 1, backgroundColor: 'green',borderBottomWidth:2,borderColor:'white'}}></View>
        {/* Middle half of field */}
        <View style = {{flex: 1, backgroundColor: 'green',borderBottomWidth:2,borderColor:'white'}}></View>
        <View style = {{flex: 1, backgroundColor: 'green',borderBottomWidth:2,borderColor:'white'}}></View>

        {/* Bottom quarter */}
        <View style = {{flex: 1, backgroundColor: 'green',flexDirection:'row'}}/>
       
    </View> 
        

)

export default (RugbyPitch)
