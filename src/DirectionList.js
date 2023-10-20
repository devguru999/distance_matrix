
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faPenToSquare, faClose } from '@fortawesome/free-solid-svg-icons'

import Marker from './image/marker.png'

const DirectionList = ({routes, onChange}) => {
    const handleOptionChange = (val) => {
        onChange(val)
    }

    return (
        <div className="control-pad">
            <div className="title text-left">
                SAVED ROUTES 
                <a href="#" onClick={()=> handleOptionChange(null)}>add destination &nbsp;<FontAwesomeIcon icon={faPlus}/></a>
            </div>
            <div className="direction-list">
                {
                routes.map((route, index) => (
                    <div className="row list-item flex-middle" id={index}>
                        <div className='icon'>
                            <img src={Marker} alt="icon" width="24px" height="24px"/>
                        </div>
                        <div className="destination">
                            <span>{route.destination}</span>
                        </div>
                        <div className='flex-grow'></div>
                        <div>
                            <a href="#" onClick={()=> handleOptionChange({...route, action: "edit"})}>
                                <FontAwesomeIcon icon={faPenToSquare} />
                            </a>
                            <a href="#" onClick={()=> handleOptionChange({...route, action: "delete"})}>
                                <FontAwesomeIcon icon={faClose} />
                            </a>
                        </div>
                    </div>
                ))
                }
            </div>            
            <a className='button' href='#' onClick={() => handleOptionChange("route")}>SAVE CHANGES</a>
        </div>
    )
}

export default DirectionList

