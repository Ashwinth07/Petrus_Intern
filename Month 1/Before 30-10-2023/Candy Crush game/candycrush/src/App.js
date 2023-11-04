import {useEffect, useState} from 'react'
import BlueCandy from './images/blue-candy.png'
import GreenCandy from './images/green-candy.png'
import OrangeCandy from './images/orange-candy.png'
import PurpleCandy from './images/purple-candy.png'
import RedCandy from './images/red-candy.png'
import YellowCandy from './images/yellow-candy.png'
import blank from './images/blank.png';
import Scoreboard from './components/Scoreboard.js'
import './App.css';
const width=8
const candycolors =[
  BlueCandy,
  GreenCandy,
  OrangeCandy,
  PurpleCandy,
  RedCandy,
  YellowCandy
]
const App=()=> {
  const [currentcolorArrangement,setCurrentcolorArrangement]=useState([])
  const [squarebeingdragged,setsquarebeingdragged]= useState(null)
  const [squarebeingreplaced,setsquarebeingreplaced]= useState(null)
  const [scored,setscore]=useState(0)
  
  const checkforcolumnofthree =()=>{
    for(let i=0;i<=47;i++){
      const columnofthree=[i,i+width,i+width*2]
      const decidedcolor=currentcolorArrangement[i]

      if(columnofthree.every(square=>currentcolorArrangement[square]===decidedcolor)){
        setscore((scored)=>scored+3)
        columnofthree.forEach(square=>currentcolorArrangement[square]=blank)
        return true
      }
    }
  }
  const checkforcolumnoffour =()=>{
    for(let i=0;i<=39;i++){
      const columnoffour=[i,i+width,i+width*2,i+width*3]
      const decidedcolor=currentcolorArrangement[i]

      if(columnoffour.every(square=>currentcolorArrangement[square]===decidedcolor)){
        setscore((scored)=>scored+4)
        columnoffour.forEach(square=>currentcolorArrangement[square]=blank)
        return true
      }
    }
  }
  const checkforrowofthree =()=>{
    for(let i=0;i<64;i++){
      const rowofthree=[i,i+1,i+2]
      const decidedcolor=currentcolorArrangement[i]
      const notvalid =[6,7,14,15,22,23,30,31,38,39,46,47,54,55,63,64]

      if(notvalid.includes(i))continue
      if(rowofthree.every(square=>currentcolorArrangement[square]===decidedcolor)){
        setscore((scored)=>scored+3)
        rowofthree.forEach(square=>currentcolorArrangement[square]=blank)
        return true
      }
    }
  }
  const checkforrowoffour =()=>{
    for(let i=0;i<64;i++){
      const rowoffour=[i,i+1,i+2,i+3]
      const decidedcolor=currentcolorArrangement[i]
      const notvalid =[5,6,7,13,14,15,21,22,23,29,30,31,37,38,39,45,46,47,53,54,55,62,63,64]

      if(notvalid.includes(i))continue
      if(rowoffour.every(square=>currentcolorArrangement[square]===decidedcolor)){
        setscore((scored)=>scored+4)
        rowoffour.forEach(square=>currentcolorArrangement[square]=blank)
        return true
      }
    }
  }
  const moveintosquarebelow=()=>{
    for(let i=0;i<=55;i++){
      const firstrow=[0,1,2,3,4,5,6,7]
      const isfirstrow=firstrow.includes(i)

      if(isfirstrow && currentcolorArrangement[i]===blank){
        let randomNumber=Math.floor(Math.random() * candycolors.length)
        currentcolorArrangement[i]=candycolors[randomNumber]
      }
      if((currentcolorArrangement[i+width])===blank){
        currentcolorArrangement[i+width]=currentcolorArrangement[i]
        currentcolorArrangement[i]=blank
      }
    }
  }
  const dragStart=(e)=>{
    console.log("drag start")
    setsquarebeingdragged(e.target)
  }
  const dragDrop=(e)=>{
    console.log("drag drop")
    setsquarebeingreplaced(e.target)
  }
  const dragEnd=(e)=>{
    console.log("drag end")
    const squarebeingdraggedid=parseInt(squarebeingdragged.getAttribute('data-id'))
    const squarebeingreplacedid=parseInt(squarebeingreplaced.getAttribute('data-id'))
    currentcolorArrangement[squarebeingreplacedid]=squarebeingdragged.getAttribute('src')
    currentcolorArrangement[squarebeingdraggedid]=squarebeingreplaced.getAttribute('src')
    console.log('squarebeingreplacedid',squarebeingreplacedid)
    console.log('squarebeingdraggedid',squarebeingdraggedid)
    const validmoves=[
      squarebeingdraggedid-1,
      squarebeingdraggedid-width,
      squarebeingdraggedid+1,
      squarebeingdraggedid+width
    ]
    const validmove=validmoves.includes(squarebeingreplacedid)
    const iscolumnoffour=checkforcolumnoffour()
    const iscolumnofthree=checkforcolumnofthree()
    const isrowoffour=checkforrowoffour()
    const isrowofthree=checkforrowofthree()
    if(squarebeingreplacedid&& validmove && (isrowoffour||isrowofthree||iscolumnoffour||iscolumnofthree)){
      setsquarebeingdragged(null)
      setsquarebeingreplaced(null)
    }
    else{
      currentcolorArrangement[squarebeingreplacedid]=squarebeingreplaced.getAttribute('src')
      currentcolorArrangement[squarebeingdraggedid]=squarebeingdragged.getAttribute('src')
      setCurrentcolorArrangement([...currentcolorArrangement])
    }
  }
  const createboard=()=>{
    const randomcolorArrangement=[]
    for(let i=0;i<width*width;i++){
      const randomcolor=candycolors[Math.floor(Math.random()*candycolors.length)]
      randomcolorArrangement.push(randomcolor);
    }
    setCurrentcolorArrangement(randomcolorArrangement);
  }
  useEffect(()=>{
    createboard();
  },[])
  useEffect(()=>{
    const timer=setInterval(()=>{
      checkforcolumnoffour()
      checkforcolumnofthree()
      checkforrowoffour()
      checkforrowofthree()
      moveintosquarebelow()
      setCurrentcolorArrangement([...currentcolorArrangement])
    },50)
    return ()=>clearInterval(timer)
  },[checkforcolumnoffour,checkforcolumnofthree,checkforrowoffour,checkforrowofthree,moveintosquarebelow,currentcolorArrangement])
  // console.log(currentcolorArrangement);
  return (
    <div className="app game-board">
        <div className='game'>
          {currentcolorArrangement.map((candycolor,index)=>(
            <img key={index}
            src={candycolor}
            alt={candycolor}
            data-id={index}
            draggable={true}
            onDragStart={dragStart}
            onDragOver={(e)=>e.preventDefault()}
            onDragEnter={(e)=>e.preventDefault()}
            onDragLeave= {(e)=>e.preventDefault()}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
            />
          ))}
        </div>
        <Scoreboard score={scored}/>
    </div>
  );
}

export default App;
