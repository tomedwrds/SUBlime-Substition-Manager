import { View } from "react-native"



const NetballPitch = () =>
(
    <View style = {{flex:1}}>  
        {/* Top third */}
        <View style = {{flex: 1,flexDirection:'row', backgroundColor: 'green',borderBottomWidth:2,borderColor:'white'}}>
        <View style = {{flex:1, backgroundColor:'green'}}></View>
        <View style = {{flex:4}}>
            <View style = {{flex:3,borderRightWidth:2,borderLeftWidth:2,borderBottomWidth:2,borderColor:'white', borderBottomEndRadius:150,borderBottomStartRadius:150}}></View>
            <View style ={{flex:3}}></View>
        </View>
        <View style = {{flex:1, backgroundColor:'green'}}></View>
        </View>
        {/* Middle third of field */}
        <View style = {{flex: 1, backgroundColor: 'green',borderBottomWidth:2,borderColor:'white'}}>
            <View style = {{flex: 6}}/>
            <View style = {{flex: 1,flexDirection:'row'}}>
                <View style = {{flex: 6}}/>
                <View style = {{flex: 1,borderWidth:2,borderColor:'white',aspectRatio:1,borderRadius:1000}}/>
                <View style = {{flex: 6}}/>
            </View>
            <View style = {{flex: 6}}/>
        </View>
       

        {/* Bottom third */}
        <View style = {{flex: 1, backgroundColor: 'green',flexDirection:'row'}}>
        <View style = {{flex:1, backgroundColor:'green'}}></View>
        <View style = {{flex:4}}>
            <View style = {{flex:3}}></View>
            <View style = {{flex:3,borderRightWidth:2,borderLeftWidth:2,borderTopWidth:2,borderColor:'white', borderTopLeftRadius:200,borderTopRightRadius:200}}></View>
        </View>
        <View style = {{flex:1, backgroundColor:'green'}}></View>
        </View>
    </View> 
        

)

export default (NetballPitch)
