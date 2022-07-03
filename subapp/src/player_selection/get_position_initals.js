export default function getPositionInitals(positionData,positionIndex)
{
  return positionData.find(position => position.position_id == positionIndex).position_inititals
}


