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
		const { display, operation } = this.state;
		return (
			<React.Fragment>
				<Display value={display} />
				<div style={{ width: '500px', height: '700px' }}>
					<div>
						<Button onClick={this.handleClick} label={1} />
						<Button onClick={this.handleClick} label={2} />
						<Button onClick={this.handleClick} label={3} />
						<Button highlighted={operation === Operations.Plus} onClick={this.handleOperationClick} label={Operations.Plus} />
					</div>
					<div>
						<Button onClick={this.handleClick} label={4} />
						<Button onClick={this.handleClick} label={5} />
						<Button onClick={this.handleClick} label={6} />
						<Button highlighted={operation === Operations.Minus} onClick={this.handleOperationClick} label={Operations.Minus} />
					</div>
					<div>
						<Button onClick={this.handleClick} label={7} />
						<Button onClick={this.handleClick} label={8} />
						<Button onClick={this.handleClick} label={9} />
						<Button highlighted={operation === Operations.Multiply} onClick={this.handleOperationClick} label={Operations.Multiply} />
					</div>
					<div>
						<Button onClick={this.clear} label={Operations.Clear} />
						<Button onClick={this.handleClick} label={0} />
						<Button onClick={this.handleClick} label='.' disabled={display.indexOf('.') > -1} />
						<Button highlighted={operation === Operations.Divide} onClick={this.handleOperationClick} label={Operations.Divide} />
					</div>
					<div>
						<Button highlighted={operation === Operations.Equals} onClick={this.handleOperationClick} label={Operations.Equals} />
					</div>
				</div>
			</React.Fragment>
		);
	}
}

class Button extends React.Component {
	render() {
		const { label, onClick, float, disabled, highlighted } = this.props;
		if (label === undefined) {
			return <div style={{
				width: BUTTON_WIDTH + 'px',
				height: BUTTON_WIDTH + 'px',
				float
			}}></div>;
		}

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
