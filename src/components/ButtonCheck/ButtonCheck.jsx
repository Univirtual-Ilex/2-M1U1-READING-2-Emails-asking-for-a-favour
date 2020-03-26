
//Import
import React, {useState} from 'react'
import styled from 'styled-components'
import styles from './ButtonCheck_styles'

// Componente base
const Checkbox = props => (
  <input type="radio"   {...props} />
)
const ButtonCheck_base = ({arrId, setCheckedState, id,...props}) => {
	const [state, setState] = useState({ checked: false })

	const handleCheckboxChange = event => (
    		setState({ checked: event.target.checked }),
    		setCheckedState(arrId, id)
		)

    return (
        <div {...props}>
        	<label id={id} className="container1">
	            <Checkbox className='btn-clean'
	            	defaultChecked={state.checked}
	            	onClick={handleCheckboxChange}
	            >
            	</Checkbox>
            	<span className="checkmark"> </span>
            </label>
        </div>
    )
}
const ButtonCheck = styled(ButtonCheck_base)`${ styles }`
export default ButtonCheck
