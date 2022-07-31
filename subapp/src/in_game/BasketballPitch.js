import { View } from "react-native"



const BasketballPitch = () =>
(
    <View style = {{flex:1}}>  
        
       
       

        {/* Bottom third */}
        <View style = {{flex: 1, backgroundColor: 'green',flexDirection:'row'}}>
        <View style = {{flex:1, backgroundColor:'green'}}/>
        <View style = {{flex:12}}>
            {/* Circle */}
            <View style = {{flex:1}}/>
            <View style = {{flex:2,borderRightWidth:2,borderLeftWidth:2,borderTopWidth:2,borderColor:'white', borderTopLeftRadius:200,borderTopRightRadius:200,flexDirection:'row'}}>
                <View style = {{flex:1}}/>
                    <View style = {{flex:1}}>
                        <View style = {{flex:1}}/>
                        <View style = {{flex:4,borderRightWidth:2,borderLeftWidth:2,borderTopWidth:2,borderColor:'white',borderTopStartRadius:100,borderTopEndRadius:100}}>
                            <View style = {{flex:1}}/>
                            <View style = {{flex:3,borderTopWidth:2,borderColor:'white'}}/>
                        </View>
                    </View>
                
                <View style = {{flex:1}}/>
            </View>
        </View>
        <View style = {{flex:1, backgroundColor:'green'}}/>
        </View>
    </View> 
        

)

export default (BasketballPitch)
