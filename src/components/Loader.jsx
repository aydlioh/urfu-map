
import loader from '../images/loader.gif'
import { useEffect, useState } from 'react';

function Loader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setIsLoading(false), 1000);
      }, [setIsLoading]);

    return (
        <> 
        {isLoading && 
            <div className="preloader">
                <img src={loader} className="preloader-text" alt="Loading..."></img>
                <div className='preloader-text'>Sweet Soft</div>
            </div>
        }
        </>
    );
  }
  
  export default Loader;
  