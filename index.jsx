import React from 'react';

const BUTTON_WIDTH = 50;
const Operations = {
	Plus: '+',
	Minus: '-',
	Multiply: 'x',
	Divide: '/',
	Equals: '=',
	Clear: 'ca',
}

class Calculator extends React.Component {
	state = {
		display: '',
		operation: null,
		previous: null,
	}

	handleClick = (label) => {
		const {
			display,
			operation,
			previous,
		} = this.state;

		let newState = {};

		if (operation) {
			if (previous === null) {
				newState.previous = display;
				newState.display = `${label}`;
			} else {
				newState.display = `${display}${label}`;
			}
		} else {
			newState.display = `${display}${label}`;
		}

		this.setState(newState);
	}
	
	handleOperationClick = (currentOperation) => {
		const {
			previous,
			display,
			operation,
		} = this.state;

		let newState = {};
		
		if (previous && operation) {
			if (currentOperation === Operations.Equals) {
				newState.previous = null;
				newState.operation = null;
				newState.display = handleOperation(previous, display, operation) + '';
			} else {
				newState.previous = null;
				newState.operation = currentOperation;
				newState.display = handleOperation(previous, display, currentOperation) + '';
			}
		} else {
			newState.operation = currentOperation;
		}

		this.setState(newState);
	}

	clear = () => {
		this.setState({
			display: '',
			operation: null,
			previous: null,
		});
	}

	render() {
		const { handleClick, handleOperationClick, clear, state } = this;
		const { display, operation } = state;

		return (
			<React.Fragment>
				<Display value={display} />
				<KeyPad
					display={display}
					operation={operation}
					handleClick={handleClick}
					handleOperationClick={handleOperationClick}
					clear={clear}
				/>
			</React.Fragment>
		);
	}
}

const KeyPad = ({ display, operation, handleClick, handleOperationClick, clear }) => (
	<div style={{ width: '500px', height: '700px' }}>
		<div>
			<Button onClick={handleClick} label={1} />
			<Button onClick={handleClick} label={2} />
			<Button onClick={handleClick} label={3} />
			<Button highlighted={operation === Operations.Plus} onClick={handleOperationClick} label={Operations.Plus} />
		</div>
		<div>
			<Button onClick={handleClick} label={4} />
			<Button onClick={handleClick} label={5} />
			<Button onClick={handleClick} label={6} />
			<Button highlighted={operation === Operations.Minus} onClick={handleOperationClick} label={Operations.Minus} />
		</div>
		<div>
			<Button onClick={handleClick} label={7} />
			<Button onClick={handleClick} label={8} />
			<Button onClick={handleClick} label={9} />
			<Button highlighted={operation === Operations.Multiply} onClick={handleOperationClick} label={Operations.Multiply} />
		</div>
		<div>
			<Button onClick={clear} label={Operations.Clear} />
			<Button onClick={handleClick} label={0} />
			<Button onClick={handleClick} label='.' disabled={display.indexOf('.') > -1} />
			<Button highlighted={operation === Operations.Divide} onClick={handleOperationClick} label={Operations.Divide} />
		</div>
		<div>
			<Button onClick={handleOperationClick} label={Operations.Equals} />
		</div>
	</div>
)

const Button = ({ label, onClick, float, disabled, highlighted }) => {
	let style = {
		width: BUTTON_WIDTH,
		height: BUTTON_WIDTH,
	}

	if (highlighted) {
		style.backgroundColor = 'grey';
		style.fontWeight = 'bold';
	}

	return (
		<button
			onClick={() => onClick(label)}
			style={style}
			disabled={disabled === true}
		>
			{label}
		</button>
	);
}

const Display = ({ value }) => (
	<div style={{
		width: `${4 * BUTTON_WIDTH}px`,
		height: BUTTON_WIDTH + 'px',
		border: '1px solid green'
	}}>{value}</div>
)

function handleOperation(first, second, operation) {
	first = parseFloat(first);
	second = parseFloat(second);
	switch(operation) {
		case Operations.Plus:
			return first + second;
		case Operations.Minus:
			return first - second;
		case Operations.Multiply:
			return first * second;
		case Operations.Divide:
			return first / second;
	}
}
