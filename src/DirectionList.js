
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faPenToSquare, faClose } from '@fortawesome/free-solid-svg-icons'

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
                    <div className="row list-item flex-between flex-middle" id={index}>
                        <div className="destination">{route.destination}</div>
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

