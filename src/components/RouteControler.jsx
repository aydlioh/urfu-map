import { FaCarAlt } from 'react-icons/fa';
import { RiFootprintFill } from 'react-icons/ri';

const RouteContoler = ({isFootRouter, setIsFootRouter}) => {

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
                    onChange={() => setIsFootRouter(true)}
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
                    onChange={() => setIsFootRouter(false)}
                />
                <label className="route-controler-text" htmlFor="car"><FaCarAlt/></label>
            </div>
        </div>
    );
}
 
export default RouteContoler;