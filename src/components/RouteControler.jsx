import { FaCarAlt } from 'react-icons/fa';
import { RiFootprintFill } from 'react-icons/ri';

const RouteContoler = ({createCarRoute, createFootRoute, routeAim, routeControl, isFootRouter, setIsFootRouter}) => {

    function RouterChangeToFoot() {
        if (routeControl){
            createFootRoute(routeAim);
        }
        setIsFootRouter(true)
    }

    function RouterChangeToCar() {
        if (routeControl){
            createCarRoute(routeAim);
        }
        setIsFootRouter(false)
    }

    return (
        <div className="route-controler">
            <div className="route-controler-item">
                <input
                    className="route-radiobtn"
                    type="radio"
                    id="foot"
                    name="routeType"
                    value="foot"
                    checked={isFootRouter}
                    onChange={RouterChangeToFoot}
                />
                <label className="route-controler-text" htmlFor="foot"><RiFootprintFill/></label>
            </div>
            <div className="route-controler-item">
                <input
                    className="route-radiobtn"
                    type="radio"
                    id="car"
                    name="routeType"
                    value="car"
                    checked={!isFootRouter}
                    onChange={RouterChangeToCar}
                />
                <label className="route-controler-text" htmlFor="car"><FaCarAlt/></label>
            </div>
        </div>
    );
}
 
export default RouteContoler;