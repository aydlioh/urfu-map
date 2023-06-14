import React, { useState } from 'react';
import Footer from './components/Footer';
import UrfuMap from "./Map";
import "./index.css";
import Loader from './components/Loader';


const locations = [
    { id: 51,
        color: "rgb(234, 94, 115)",
        title: 'УГИ',
        position: [56.84044615824193,60.61618275612711],
        door: [56.82649990389227,60.614767892578046],
        text: "Уральский гуманитарный институт",
        groundFloor: false,
        institute:[
            require('./images/ugi/ugi1.png'),
            require('./images/ugi/ugi2.png'),
            require('./images/ugi/ugi3.png'),
            require('./images/ugi/ugi4.png'),
        ]},
    { id: 52,
        color: "rgb(44, 121, 50)",
        title: 'ИЕНиМ',
        position: [56.84110615824193,60.61482275612711],
        door: [56.82649990389227,60.640767892578046],
        text: "Институт естественных наук и математики",
        groundFloor : false,
        institute:[
            require('./images/matmeh/matmeh1.png'),
            require('./images/matmeh/matmeh2.png'),
            require('./images/matmeh/matmeh3.png'),
            require('./images/matmeh/matmeh4.png'),
            require('./images/matmeh/matmeh5.png'),
            require('./images/matmeh/matmeh6.png'),
        ] },
    { id: 1,
        color: "rgb(106, 178, 227)",
        title: 'ИРИТ-РТФ',
        position: [56.8408212141831,60.650870100687744],
        door: [56.82971155955831,60.27868488476553],
        text: "Институт радиоэлектроники и информационных технологий-РТФ",
        groundFloor: true,
        institute:[
            require('./images/rtf/rtf0.png'),
            require('./images/rtf/rtf1.png'),
            require('./images/rtf/rtf2.png'),
            require('./images/rtf/rtf3.png'),
            require('./images/rtf/rtf4.png'),
        ]},
    { id: 2,
        color: "rgb(224, 149, 43)",
        title: 'УрФУ',
        position: [56.84402578520124,60.65379538441558],
        door: [56.82649990389227,60.614767892578046],
        text: "Главный Учебный Корпус", groundFloor : false,
        institute: [
            require('./images/guk/guk1.png'),
            require('./images/guk/guk2.png'),
            require('./images/guk/guk3.png'),
            require('./images/guk/guk4.png'),
            require('./images/guk/guk5.png')
        ]},
    { id: 3,
        color: "rgb(227, 30, 36)",
        title: 'ФТИ',
        position: [56.84272134350719,60.651752882212874],
        door: [56.82971155955831,60.27868488476553],
        text: "Физико-технологический институт",
        groundFloor : true,
        institute:[
            require('./images/fti/fti0.png'),
            require('./images/fti/fti1.png'),
            require('./images/fti/fti2.png'),
            require('./images/fti/fti3.png'),
            require('./images/fti/fti4.png')
        ]},
    { id: 4,
        color: "rgb(155, 33, 29)",
        title: 'ИНМиТ',
        position: [56.84234134350719,60.649885882212874],
        door: [56.82649990389227,60.614767892578046],
        text: "Институт новых материалов и технологий",
        groundFloor : false,
        institute:[
            require('./images/mt/mt1.png'),
            require('./images/mt/mt2.png'),
            require('./images/mt/mt3.png'),
            require('./images/mt/mt4.png'),
        ]},
    { id: 5,
        color: "rgb(149, 193, 43)",
        title: 'ХТИ',
        position: [56.84217534350719,60.648295882212874],
        door: [56.82649990389227,60.614767892578046],
        text: "Химико-технологический институт",
        groundFloor : false,
        institute:[
            require('./images/hti/hti1.png'),
            require('./images/hti/hti2.png'),
            require('./images/hti/hti3.png'),
            require('./images/hti/hti4.png'),
        ]},
    { id: 6,
        color: "rgb(178, 52, 53)",
        title: 'ИСиА',
        position: [56.84503134350719,60.650532882212874],
        door: [56.82649990389227,60.654767892578046],
        text: "Институт строительства и архитектуры",
        groundFloor : false,
        institute:[
            require('./images/isa/isa1.png'),
            require('./images/isa/isa2.png'),
            require('./images/isa/isa3.png'),
            require('./images/isa/isa4.png'),
        ]},
    { id: 8,
        color: "rgb(161, 39, 131)",
        title: 'УралЭНИН',
        position: [56.84465134350719,60.652052882212874],
        door: [56.757364690114976,60.344602853515525],
        text: "Уральский энергетический институт",
        groundFloor : false, 
        institute: [
            require('./images/guk/guk1.png'),
            require('./images/guk/guk2.png'),
            require('./images/guk/guk3.png'),
            require('./images/guk/guk4.png'),
            require('./images/guk/guk5.png')
        ]},
    { id: 9,
        color: "rgb(0, 158, 187)",
        title: 'ИнЭУ',
        position: [56.84310134350719,60.652652882212874],
        door: [56.72717878938108,60.86096027539055],
        text: "Институт экономики и управления",
        groundFloor : false,
        institute: [
            require('./images/guk/guk1.png'),
            require('./images/guk/guk2.png'),
            require('./images/guk/guk3.png'),
            require('./images/guk/guk4.png'),
            require('./images/guk/guk5.png')
        ]},
    { id: 10,
        color: "rgb(224, 149, 43)",
        title: 'ТЭФ',
        position: [56.84273134350719,60.655642882212874],
        door: [56.82649990389227,60.640767892578046],
        text: "Теплоэнергетический факультет",
        groundFloor : false,
        institute:[
            require('./images/tpf/tpf1.png'),
            require('./images/tpf/tpf2.png'),
            require('./images/tpf/tpf3.png'),
            require('./images/tpf/tpf4.png'),
            require('./images/tpf/tpf5.png'),
            require('./images/tpf/tpf6.png'),
            require('./images/tpf/tpf7.png'),
            require('./images/tpf/tpf8.png'),
            require('./images/tpf/tpf9.png'),
            require('./images/tpf/tpf10.png'),
            require('./images/tpf/tpf11.png'),
            require('./images/tpf/tpf12.png'),
        ]},
    { id: 11,
        color: "rgb(51, 186, 142)",
        title: 'НиН',
        position: [56.84509134350719,60.652362882212874],
        door: [56.82971155955831,60.27868488476553], 
        text: "Наноматериалы и нанотехнологии",
        groundFloor : true,
        institute:[
            require('./images/nin/nin0.png'),
            require('./images/nin/nin1.png'),
        ]}
];

export default function App() {
    const [data, setData] = useState({d: []})

    async function fetchData(){
        let response = await fetch("https://eqwe/52/1");
        let d = await response.json();

        setData({d: d})
    }

    return (
        <>
            <Loader />
            <div className='app'>
                <UrfuMap locations={locations}/>
                <Footer/>
            </div>
        </>
    );
}
