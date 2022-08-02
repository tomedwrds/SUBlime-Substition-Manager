import { View } from "react-native"



const FootballPitch = () =>
(
    <View style = {{flex:1}}>  
        {/* Top quarter */}
        <View style = {{flex:1,borderBottomWidth:2,borderColor:'white',backgroundColor:'green'}}>

            <View style = {{flex: 1,flexDirection:'row', backgroundColor: 'green',}}>
                <View style = {{flex:1, backgroundColor:'green'}}/>
                <View style = {{flex:4}}>
                    <View style = {{flex:17,borderRightWidth:2,borderLeftWidth:2,borderBottomWidth:2,borderColor:'white',flexDirection:'row'}}>
                        <View style = {{flex:1, backgroundColor:'green'}}/>
                        <View style = {{flex:3}}>
                            <View style = {{flex:3,borderRightWidth:2,borderLeftWidth:2,borderBottomWidth:2,borderColor:'white'}}/>
                            <View style ={{flex:3}}/>
                        </View>
                        <View style = {{flex:1, backgroundColor:'green'}}/>
                        
                    </View>
                    <View style ={{flex:3}}/>
                </View>
                <View style = {{flex:1, backgroundColor:'green'}}/>
            </View>
            <View style = {{flex:1, backgroundColor:'green'}}/>
        </View>
       

        {/* Bottom quarter */}
        <View style = {{flex:1}}>
            <View style = {{flex:1, backgroundColor:'green'}}/>
            <View style = {{flex: 1, backgroundColor: 'green',flexDirection:'row'}}>
                <View style = {{flex:1, backgroundColor:'green'}}/>
                <View style = {{flex:4}}>
                    <View style = {{flex:3}}/>
                    <View style = {{flex:17,borderRightWidth:2,borderLeftWidth:2,borderTopWidth:2,borderColor:'white',flexDirection:'row'}}>
                        <View style = {{flex:1, backgroundColor:'green'}}/>
                        <View style = {{flex:3}}>
                            <View style = {{flex:3}}/>
                            <View style = {{flex:3,borderRightWidth:2,borderLeftWidth:2,borderTopWidth:2,borderColor:'white'}}/>
                        </View>
                        <View style = {{flex:1, backgroundColor:'green'}}/>
                    </View>
                </View>
            <View style = {{flex:1, backgroundColor:'green'}}/>
            </View>
        </View>
    </View> 
        

)

export default (FootballPitch)
