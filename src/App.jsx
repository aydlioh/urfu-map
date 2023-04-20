import React, { useState } from 'react';
import Footer from './components/Footer';
import MenuToggle from './components/MenuToggle';
import UrfuMap from "./Map";
import Menu from './Menu';
import "./index.css";
import Loader from './components/Loader';


const locations = [
    { id: 51, color: "rgb(234, 94, 115)", title: 'УГИ', position: [56.84044615824193,60.61618275612711], text: "Уральский гуманитарный институт", institute:[] },
    { id: 52, color: "rgb(44, 121, 50)", title: 'ИЕНиМ', position: [56.84110615824193,60.61482275612711], text: "Институт естественных наук и математики", institute:[] },
    { id: 1, color: "rgb(106, 178, 227)", title: 'ИРИТ-РТФ', position: [56.8408212141831,60.650870100687744], text: "Институт радиоэлектроники и информационных технологий-РТФ", institute:[]  },
    { id: 2, color: "rgb(224, 149, 43)", title: 'УрФУ', position: [56.84402578520124,60.65379538441558], text: "Главный Учебный Корпус",
        institute: [
            "https://psv4.userapi.com/c237131/u237062606/docs/d49/0721e867e554/karta_guka1_etazh.png?extra=u71bZ1oWSPho6M8BOcD9zQICUHtom0PiDriWS0gXLczpeiXx95BPZ-dQqdwdkbqlexygM4E6-EjB0wbpfGYCu9Nkt_C1T3xGC5CyGRqjUo1p55anJQUBHUExCl6-I3QsnUykhHk7ZeHIS174wPkN",
            "https://psv4.userapi.com/c237331/u237062606/docs/d36/dc22d2d37b14/karta_guka_2_etazh.png?extra=GT6FTnYyjOBYcVKpg66W7oD-1p7WInvJ9v1qNtbLy2Ar3fam0cWq9vmMD6nG638E_1anOlaTYo7wMkmsNDJnEf31-9t_7q5RDNQjoJG91D0epd-D5O5Y7fwwnw2pwO0yas-WwMg_-uAVwlyrD5a1",
            "https://psv4.userapi.com/c237331/u237062606/docs/d6/79c5cc897f80/karta_guka_3_etazh.png?extra=wUdPCl8onaDuhp_haABbZ-BcR72w5TruJh0AZvR_qIYj5MqzYpORkelKbzwHFvTic0bh7BcN_7j8WXLo56dLuya9GfJTbjEdkSq229mtTd8HU_qx04AXjVv8BQuhdJOJTrMrko5qGazDJVd3qJux",
            "https://psv4.userapi.com/c237331/u237062606/docs/d10/e95b0446f228/karta_guka_4_etazh.png?extra=mklyAj1RkerClpv1-cmgrwm3ZRflTIV5clB1_IiJfeTPC5fy4kVV-qIGKofso0c1nR04TvAbJAZ2N8T3QA3ZulLkxCNPYXRhjX-cVDII1FjWst7tLuBNdkRqUX3rMMhDfbNSlalrX6mZFGeZTnZ5",
            "https://psv4.userapi.com/c237331/u237062606/docs/d43/63fbbb3f44d8/karta_guka_5_etazh.png?extra=IwqaOTDySfVXIN2m0OtEPKmSZEKuhwXMI2Ly2I2BRIIiumycl73jt6ZEP9Rh1iv-C08iG-Db2rsfL9YEMKKe9keyOTLwyJ2t9A5NxtuG7hKEtwgrbbnL73pMSrd8JFn-ykWuV2z_GjIEVXOghMWG"
        ]
    },
    { id: 3, color: "rgb(227, 30, 36)", title: 'ФТИ', position: [56.84272134350719,60.651752882212874], text: "Физико-технологический институт", institute:[] },
    { id: 4, color: "rgb(155, 33, 29)", title: 'ИНМиТ', position: [56.84234134350719,60.649885882212874], text: "Институт новых материалов и технологий", institute:[]  },
    { id: 5, color: "rgb(149, 193, 43)", title: 'ХТФ', position: [56.84217534350719,60.648295882212874], text: "Химико-технологический институт", institute:[]  },
    { id: 6, color: "rgb(178, 52, 53)", title: 'ИСиА', position: [56.84503134350719,60.650532882212874], text: "Институт строительства и архитектуры", institute:[]  },
    { id: 7, color: "rgb(178, 52, 53)", title: 'СП', position: [56.84502134350719,60.651732882212874], text: "СФ УрФУ", institute:[]  },
    { id: 8, color: "rgb(161, 39, 131)", title: 'УралЭНИН', position: [56.84465134350719,60.652052882212874], text: "Уральский энергетический институт", 
        institute: [
            "https://psv4.userapi.com/c237131/u237062606/docs/d49/0721e867e554/karta_guka1_etazh.png?extra=u71bZ1oWSPho6M8BOcD9zQICUHtom0PiDriWS0gXLczpeiXx95BPZ-dQqdwdkbqlexygM4E6-EjB0wbpfGYCu9Nkt_C1T3xGC5CyGRqjUo1p55anJQUBHUExCl6-I3QsnUykhHk7ZeHIS174wPkN",
            "https://psv4.userapi.com/c237331/u237062606/docs/d36/dc22d2d37b14/karta_guka_2_etazh.png?extra=GT6FTnYyjOBYcVKpg66W7oD-1p7WInvJ9v1qNtbLy2Ar3fam0cWq9vmMD6nG638E_1anOlaTYo7wMkmsNDJnEf31-9t_7q5RDNQjoJG91D0epd-D5O5Y7fwwnw2pwO0yas-WwMg_-uAVwlyrD5a1",
            "https://psv4.userapi.com/c237331/u237062606/docs/d6/79c5cc897f80/karta_guka_3_etazh.png?extra=wUdPCl8onaDuhp_haABbZ-BcR72w5TruJh0AZvR_qIYj5MqzYpORkelKbzwHFvTic0bh7BcN_7j8WXLo56dLuya9GfJTbjEdkSq229mtTd8HU_qx04AXjVv8BQuhdJOJTrMrko5qGazDJVd3qJux",
            "https://psv4.userapi.com/c237331/u237062606/docs/d10/e95b0446f228/karta_guka_4_etazh.png?extra=mklyAj1RkerClpv1-cmgrwm3ZRflTIV5clB1_IiJfeTPC5fy4kVV-qIGKofso0c1nR04TvAbJAZ2N8T3QA3ZulLkxCNPYXRhjX-cVDII1FjWst7tLuBNdkRqUX3rMMhDfbNSlalrX6mZFGeZTnZ5",
            "https://psv4.userapi.com/c237331/u237062606/docs/d43/63fbbb3f44d8/karta_guka_5_etazh.png?extra=IwqaOTDySfVXIN2m0OtEPKmSZEKuhwXMI2Ly2I2BRIIiumycl73jt6ZEP9Rh1iv-C08iG-Db2rsfL9YEMKKe9keyOTLwyJ2t9A5NxtuG7hKEtwgrbbnL73pMSrd8JFn-ykWuV2z_GjIEVXOghMWG"
        ]
    },
    { id: 9, color: "rgb(0, 158, 187)", title: 'ИнЭУ', position: [56.84310134350719,60.652652882212874], text: "Институт экономики и управления", 
        institute: [
            "https://psv4.userapi.com/c237131/u237062606/docs/d49/0721e867e554/karta_guka1_etazh.png?extra=u71bZ1oWSPho6M8BOcD9zQICUHtom0PiDriWS0gXLczpeiXx95BPZ-dQqdwdkbqlexygM4E6-EjB0wbpfGYCu9Nkt_C1T3xGC5CyGRqjUo1p55anJQUBHUExCl6-I3QsnUykhHk7ZeHIS174wPkN",
            "https://psv4.userapi.com/c237331/u237062606/docs/d36/dc22d2d37b14/karta_guka_2_etazh.png?extra=GT6FTnYyjOBYcVKpg66W7oD-1p7WInvJ9v1qNtbLy2Ar3fam0cWq9vmMD6nG638E_1anOlaTYo7wMkmsNDJnEf31-9t_7q5RDNQjoJG91D0epd-D5O5Y7fwwnw2pwO0yas-WwMg_-uAVwlyrD5a1",
            "https://psv4.userapi.com/c237331/u237062606/docs/d6/79c5cc897f80/karta_guka_3_etazh.png?extra=wUdPCl8onaDuhp_haABbZ-BcR72w5TruJh0AZvR_qIYj5MqzYpORkelKbzwHFvTic0bh7BcN_7j8WXLo56dLuya9GfJTbjEdkSq229mtTd8HU_qx04AXjVv8BQuhdJOJTrMrko5qGazDJVd3qJux",
            "https://psv4.userapi.com/c237331/u237062606/docs/d10/e95b0446f228/karta_guka_4_etazh.png?extra=mklyAj1RkerClpv1-cmgrwm3ZRflTIV5clB1_IiJfeTPC5fy4kVV-qIGKofso0c1nR04TvAbJAZ2N8T3QA3ZulLkxCNPYXRhjX-cVDII1FjWst7tLuBNdkRqUX3rMMhDfbNSlalrX6mZFGeZTnZ5",
            "https://psv4.userapi.com/c237331/u237062606/docs/d43/63fbbb3f44d8/karta_guka_5_etazh.png?extra=IwqaOTDySfVXIN2m0OtEPKmSZEKuhwXMI2Ly2I2BRIIiumycl73jt6ZEP9Rh1iv-C08iG-Db2rsfL9YEMKKe9keyOTLwyJ2t9A5NxtuG7hKEtwgrbbnL73pMSrd8JFn-ykWuV2z_GjIEVXOghMWG"
        ] 
    },
    { id: 10, color: "rgb(224, 149, 43)", title: 'ТЭФ', position: [56.84273134350719,60.655642882212874], text: "Институт строительства и архитектуры", institute:[]  },


];

function App() {
    const [position, setPosition] = useState([56.84384143906293,60.65234332360141]);
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <>
            <Loader />
            <div className='app'>
                <UrfuMap position={position} setPosition={setPosition} locations={locations} />
                <MenuToggle toggleMenu={toggleMenu} menuOpen={menuOpen}/>
                <Menu toggleMenu={toggleMenu} className={`menu ${menuOpen ? 'open' : ''}`}  setPosition={setPosition} locations={locations} />
                <Footer/>
            </div>
        </>
    );
}

export default App;