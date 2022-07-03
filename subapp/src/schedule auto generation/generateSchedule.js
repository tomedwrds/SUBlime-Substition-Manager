import getPositionInitals from "../player_selection/get_position_initals"
export default function generateSchedule(positionData,playerData)
{
    //Determine required amount of starters per position as some positions appear more than once

    let data = positionData.map((pos,i)=> ({
        id:pos.position_id,
        bench: playerData.filter(player => player.positions.some(player_pos => getPositionInitals(positionData,player_pos) == pos.position_inititals) ).map((player)=>player.id),
        activeBench: playerData.filter(player => player.positions.some(player_pos => getPositionInitals(positionData,player_pos) == pos.position_inititals) ).map((player)=>player.id), 
        active: []}))
    console.log(data)
    
}
