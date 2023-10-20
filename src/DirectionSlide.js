const DirectionSlide = ({icon, dest, dura, dist}) => {
    return (
        <div className="row slide">
            <div className="col icon">
                <img src={icon}></img>
            </div>
            <div className="col flex-grow">
                <div className="row flex-between title">
                    <div className="col title-destination">
                        <div className="main-title">{dest}</div>
                        <div className="sub-title">through Via Cenisio</div>
                    </div>
                    <div className="col values text-right">
                        <div className="values-time">{dura}</div>
                        <div className="values-dist">{dist}</div>
                    </div>
                </div>
                <div className="description">
                    Fastest route now due to traffic conditions.
                </div>
            </div>
        </div>
    )
}

export default DirectionSlide;