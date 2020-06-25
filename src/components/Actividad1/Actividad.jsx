import React, {useState} from 'react'
//Components
import Container from '../Container'
import MainTitle from '../MainTitle'
import ButtonUi from '../ButtonControlUI'
import {ICol, IRow} from '../Grid'
// Styles
import styled from 'styled-components'
import styles, { UiButtonsContainer } from './Actividad_styles'
import Ilex from '../../App/variables'

import Data from './Actividad_data'
import Answers from './Actividad_answers'

import Modal from '../Generales/Modal'
import ButtonCheck from '../ButtonCheck'
import $ from 'jquery'
import ButtonDown from '../ButtonDown'

// element.scrollHeight-element.clientHeight


const Actividad_base =  ({staticContext, ...props}) => {
	
	const [modalFlag, setModal] = useState(false)
    const [ok, setOk] = useState(false)
    const [err, setErr] = useState(false)

	
	const [begin, setBegin] = useState(false)
	const [questionId, setQuestionId] = useState(false)

   
	var score = 0


	const checkActivity = () =>{
		var count = 0
		console.log(Data)
		Data.map((data, i) =>{
	        	if(data.rigth === 1){
					count ++	        		
	        	}
	        	else{
	        		setErr(true)
	        		setOk(false)
					setModal(true)
	        	}

	        	if(count === Data.length){
	        		setOk(true)
	        		setErr(false)
	        		setModal(true)
	        	}
	        })
	}
	
	const begininPosition = (id, element_id) => {
        var area = document.getElementById('area')
        var element = document.getElementById(element_id)
        var coord = element.getBoundingClientRect()
		coord.ay = area.scrollTop
		coord.ax = window.innerWidth
		setBegin(coord)
		setQuestionId(id)
		if(document.getElementById('line_' + Data[id].id)){
			$('#line_' + Data[id].id).remove()
			Data[id].right = 0
		}
	}

	const endPosition = (id, element_id) => {
        var area = document.getElementById('area')
		var element = document.getElementById(element_id)
        var position_end = element.getBoundingClientRect()
		if(questionId !== false){
			var question = Data[questionId]

			if(question.answer === id){
				question.rigth = 1
			}else{
				question.rigth = 0
			}
			console.log(begin)

			var newLine = document.createElementNS('http://www.w3.org/2000/svg','line');
			newLine.setAttribute('id',`${'line_' + question.id}`);
			newLine.setAttribute('x1',`${ 615}`);
			newLine.setAttribute('y1',`${begin.ay + begin.y - 8}`);
			newLine.setAttribute('x2',`${ 675 }`);
			newLine.setAttribute('y2',`${position_end.y + begin.ay - 8}`);
			newLine.setAttribute("stroke", `${Ilex.violeta}`)
			var newElement = `<line x1=${ begin.x} y1=${begin.y} x2=${position_end.x} y2=${position_end.y} stroke="black" />`
			$("#svg").append(newLine);
			
			setBegin(false)
			setQuestionId(false)
		}
	}


	const questions = Data.map((data, i) => {
        return (
            <IRow key={i} className="inputsContainer">
                <ICol w={90} pr={2}> 
	    			<p> <span> {i + 1} ) </span> <span dangerouslySetInnerHTML={{ __html: data.text }} /> </p>
                </ICol>
                <ICol w={7}>
    				<ButtonCheck arrId={i} id={'question_' + i} setCheckedState={begininPosition} className="inputQuestion"/>
                </ICol>

			</IRow>
		)
	})
	
    const answers = Answers.map((answer,i) => {
        return (
            <IRow key={i} className="inputsContainer">
                <ICol w={7}>
                    <ButtonCheck arrId={i} id={'answer_' + i} setCheckedState={endPosition} className="inputAnswer"/>
                </ICol>
                <ICol w={90}>
                    <p> <span> {i + 1} ) </span> <span dangerouslySetInnerHTML={{ __html: answer.text }} /> </p>
                </ICol>
            </IRow>
        )
    })
    return (
        <Container bgImage='./src/bg_actividad1.png' {...props} h={52} id="area"  >
         <svg  id="svg">
         </svg>
            <div> 
	            <UiButtonsContainer>
	                <ButtonUi icon='ilx-ayuda' tooltip='Match the e-mails with the corresponding reply.' />
	                <ButtonUi icon='ilx-volver' tooltip='Start Again'  onClick={ () => {window.location.reload()} } />
	            </UiButtonsContainer>
	            <IRow pt={1.5} className="text-center">
	                <ICol py={ 0.5 }>
	                    <MainTitle color={Ilex.violeta2} size={1.5}>
	                    LOOK AT THE NEXT E-MAILS ASKING FOR <br/> DIFFERENT FAVOURS, THEN MATCH THE E-MAILS  
	                    </MainTitle>  
	                </ICol>
	            </IRow>

	            <IRow justify='center' align='center' pt={3} w={100} gutters={0.5} className="text-center text-content mt-0">
	            	<ICol w={45}  className="questions">
	            		{questions}
	            	</ICol>

	            	<ICol w={45} className="answers">
	            		{answers}
	            	</ICol>
	            </IRow>
            </div>
            <IRow pt={5}>
                <ICol pt={1}><ButtonDown onClick={checkActivity} text={'CHECK'} /></ICol>
            </IRow>
        <Modal visible={modalFlag} ok={ok} err={err} w={25} repeatUrl={'#/actividad1'} finished={ok} />
        </Container>
    )

}


const Actividad = styled(Actividad_base)`
    ${ styles.mistyles }
`


export default Actividad