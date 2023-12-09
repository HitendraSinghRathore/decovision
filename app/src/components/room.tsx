import { FaUtensils, FaBed, FaHome } from "react-icons/fa"
interface IRoom {
    roomTypes: IRoomTypes[],
    current: string,
    onClick: Function

} 
interface IRoomTypes {
    name: string,
    value: string
}
export default function RoomSelector(props:IRoom) {
    return (<div className="bg-dark1 p-4 rounded-md shadow">
    <div className="room-types flex gap-8">
      {props.roomTypes.map((item:IRoomTypes) => {
        return <div key={item.value} className="cursor-pointer" onClick={() => props.onClick(item.value)}>
          <div className={`rounded-full bg-dark3 p-4 shadow justify-center flex items-center w-16 h-16 mb-2 hover:border-2 hover:border-indigo-500/100 ${props.current === item.value ? 'border-brandBlue border-2' : ''}` }>
          { item.value === 'diningRoom' ? <FaUtensils/> : item.value === 'bedroom'? <FaBed/> :<FaHome/> }
          </div>
        <div className="text-primaryWhite text-xs text-center">{item.name}</div></div>
      })}
    </div>
  </div>)
}