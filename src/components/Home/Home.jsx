import React from 'react'
import styled from 'styled-components'
import Container from '../Container'
import estilos_home from './Home_styles'
import {ICol} from '../Grid'
import { ButtonLink } from '../ButtonX'

const Home_base = function ({staticContext, ...props}) { // se le pasan las props para recibir los styled components

    return (
        <Container {...props}  row bgImage="src/bg.png" >

                    <div className='bloque-izquierdo entrada-top-Y-2'>
                        <div className='bloque-izquierdo-container'>
                            <h1> E-mails asking for a favour </h1>
                            <p>
                            This activity count with 3 parts, you must pass each <br></br> exercise to finish <br></br> <strong>Time to practice your listening skill!</strong></p>
                            <ButtonLink to='/actividad1'>Start</ButtonLink>
                        </div>
                    </div>
                    <div className='bloque-derecho entrada-top-Y-3'>
                    	<ICol mt={3} >
	                        <figure>
	                            <img src='./src/cover.png' alt='Logo' />    
	                        </figure>
                    	</ICol>

                    </div>

        </Container>
    )
}

const Home = styled(Home_base)`
    ${ estilos_home }
`

export default Home