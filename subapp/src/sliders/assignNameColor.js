//Assign color gets the relavent information from the player data strucutre and assigns that color to the slider
export default function assignNameColor (player_id,playerData)
{

    //Prevent place holder values slipping through and causing erros
    if (player_id != null)
    {
        //Join on the name of the two lists and return the color
        var join = playerData.find(player => player.id == player_id)
        //0 for name, 1 for color
        return [join.name,join.color]
    }
    else{return[null,null]}

}