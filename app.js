var app = {
	arInput: [{
		value: 0,
		type: 'number'
	}],
	add: function(a, b) {
		return a + b;
	},
	subtract: function(a, b) {
		return a - b;
	},
	multiply: function(a, b) {
		return a * b;
	},
	divide: function(a, b) {
		return a / b;
	},
	equal: function() {
		var arInput = this.arInput;

		if (arInput[arInput.length - 1].type === 'operation') {
			arInput.pop();
		}

		while(arInput.length > 1) {

			for (var i = 0; i < arInput.length; i++) {
				switch(arInput[i].value) {
					case '*':
						this.spliceOperand(i, this.multiply);
						break;
					case '/':
						this.spliceOperand(i, this.divide);
						break;
				}
			}

			for (var i = 0; i < arInput.length; i++) {
				switch(arInput[i].value) {
					case '+':
						this.spliceOperand(i, this.add);
						break;
					case '-':
						this.spliceOperand(i, this.subtract);
						break;
				}
			}
		}
	},
	spliceOperand: function (index, func) {
		var arInput = this.arInput,
		firstOperand = + arInput[index - 1].value,
		secondOperand = + (arInput[index + 1] ? arInput[index + 1].value : 0);
		
		arInput[index - 1].value = func(firstOperand, secondOperand);
		arInput.splice(index, index + 1);
	},
	renderWindow: function() {
		var calcWindow = document.getElementById('calcWindow'),
		text = '',
		arInput = this.arInput;
		
		if (arInput.length === 0) {
			text = '0';
		} else {
			for (var i = 0; i < arInput.length; i++) {
				text += arInput[i].value; 
			}		
		}

		calcWindow.innerHTML = text;
	},
	render: function(app) {
		var ct = this.createElement;

		app.innerHTML = '';

		ct({
			c: app,
			ach: ct({
				c: 'section',
				a: [[, 'main-wrap']],
				ach: 
				[
					ct({
						c: 'h1',
						a: [[, 'calc-title']],
						i: 'Basic calc'
					}),
					ct({
						a: [[, 'calc-window'], ['id', 'calcWindow']],
						i: '0'
					}),
					ct({
						a: [[, 'calc-commands'], ['id', 'commands']],
						ach: [
							ct({
								a: [[, 'column']],
								i: '7',
								d: {
									value: '7',
									type: 'number',
									command: true
								}
							}),
							ct({
								a: [[, 'column']],
								i: '8',
								d: {
									value: '8',
									type: 'number',
									command: true
								}
							}),
							ct({
								a: [[, 'column']],
								i: '9',
								d: {
									value: '9',
									type: 'number',
									command: true
								}
							}),
							ct({
								a: [[, 'column']],
								i: '/',
								d: {
									value: '/',
									type: 'operation',
									command: true
								}
							}),
							ct({
								a: [[, 'column']],
								i: '*',
								d: {
									value: '*',
									type: 'operation',
									command: true
								}
							}),
							ct({
								a: [[, 'column']],
								i: '4',
								d: {
									value: '4',
									type: 'number',
									command: true
								}
							}),
							ct({
								a: [[, 'column']],
								i: '5',
								d: {
									value: '5',
									type: 'number',
									command: true
								}
							}),
							ct({
								a: [[, 'column']],
								i: '6',
								d: {
									value: '6',
									type: 'number',
									command: true
								}
							}),
							ct({
								a: [[, 'column']],
								i: '+',
								d: {
									value: '+',
									type: 'operation',
									command: true
								}
							}),
							ct({
								a: [[, 'column']],
								i: '-',
								d: {
									value: '-',
									type: 'operation',
									command: true
								}
							}),
							ct({
								a: [[, 'column']],
								i: '1',
								d: {
									value: '1',
									type: 'number',
									command: true
								}
							}),
							ct({
								a: [[, 'column']],
								i: '2',
								d: {
									value: '2',
									type: 'number',
									command: true
								}
							}),
							ct({
								a: [[, 'column']],
								i: '3',
								d: {
									value: '3',
									type: 'number',
									command: true
								}
							}),
							ct({
								a: [[, 'column']],
								i: '=',
								d: {
									value: '=',
									command: true
								}
							}),
							ct({
								a: [[, 'column']],
								i: 'C',
								d: {
									value: 'C',
									command: true
								}
							})
						]
					})
				]
			})
		});
	},
	commandHandler: function(inp) {
		var arInput = this.arInput;
		var length = arInput.length;
		var lastElement = arInput[arInput.length - 1];

		switch(inp.value) {
			case '1':
			case '2':
			case '3':
			case '4':
			case '5':
			case '6':
			case '7':
			case '8':
			case '9':
				if (arInput.length === 1 && lastElement.value === 0) {
					lastElement.value = inp.value;
				} else if (lastElement.type === inp.type) {
					lastElement.value += inp.value;
				} else {
					arInput.push({
						value: inp.value,
						type: inp.type
					});
				}

				break;
			case '/':
			case '*':
			case '+':
			case '-':
				if (lastElement.type !== inp.type){
					arInput.push({
						value: inp.value,
						type: inp.type
					});
				} else if(lastElement.type == inp.type) {
					lastElement.value = inp.value;
				}

				break;
			case 'C':
				this.arInput = [{
					value: 0,
					taype: 'number'
				}];
				break;
			case '=':
				this.equal();
		}

		this.renderWindow();
	},
	createElement: function(e) {
	    var el;

	    e.c ? typeof(e.c) === 'object' ? el = e.c : el = document.createElement(e.c) : el = document.createElement('div');

	    if (e.a) for (var i = 0; i < e.a.length; i++) el.setAttribute(e.a[i][0] || 'class' , e.a[i][1] || '');

	    if (e.d) el.data = e.d;

	    e.i ? el.innerHTML = e.i : el;

	    if (e.ach && e.ach.length) {
	      	for (var i = 0; i < e.ach.length; i++) if (e.ach[i]) el.appendChild(e.ach[i]);
	    } else if (e.ach) el.appendChild(e.ach);

	    return el;
	},
	start: function() {
		this.render(document.getElementById('app'));
		
		document.getElementById('commands').onclick = function(event) {
			if (event.target.data && event.target.data.command) {
				app.commandHandler(event.target.data);
			}
		}		
	}
};

app.start();
