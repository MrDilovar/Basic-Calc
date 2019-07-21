var app = {
	arInput: [{
		value: '0',
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
		var arInputLength = 0;

		for (var i = 0; i < arInput.length; i++) {
			if (arInput[i].type === 'operation') arInputLength++
		}


		if (arInput[arInput.length - 1].type === 'operation') {
			arInput.pop();
		}

		for (var j = 0; j < arInputLength; j++) {

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
		
		arInput[index - 1].value = func(firstOperand, secondOperand) + '';
		arInput.splice(index, index + 1);
	},
	renderWindow: function() {
		var calcWindow = document.getElementById('calcWindow'),
		text = '';
		
		for (var i = 0; i < this.arInput.length; i++) {
			text += this.arInput[i].value; 
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
							,
							ct({
								a: [[, 'column']],
								i: '<--',
								d: {
									value: 'clearOne',
									type: 'back',
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
							}),
							ct({
								a: [[, 'column']],
								i: '0',
								d: {
									value: '0',
									type: 'number',
									command: true
								}
							}),
							ct({
								a: [[, 'column']],
								i: '.',
								d: {
									value: '.',
									type: 'point',
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
			case '0':
				if (lastElement.value !== '0') {
					if (lastElement.type !== 'operation') {
						lastElement.value += inp.value;
					} else {
						arInput.push({
							value: inp.value,
							type: inp.type
						});
					}
				}

				break;
			case '1':
			case '2':
			case '3':
			case '4':
			case '5':
			case '6':
			case '7':
			case '8':
			case '9':
				if (arInput.length === 1 && lastElement.value === '0') {
					lastElement.value = inp.value;
				} else if (lastElement.type === inp.type) {
					if (lastElement.value >= -32767  && lastElement.value <= 32767) {
						lastElement.value += inp.value;
					}
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
			case '.':
				if (lastElement.type === 'number' && lastElement.value.indexOf('.') < 0) {
					lastElement.value += inp.value;
				}

				break;
			case 'clearOne':
				if (lastElement.type === 'operation') {
					arInput.pop();
				} else if(lastElement.type === 'number') {
					if (arInput.length === 1 && lastElement.value.length === 1) {
						lastElement.value = '0';
					} else if (lastElement.value.length > 1) {
						lastElement.value = lastElement.value.slice(0, -1);
					} else {
						arInput.pop();
					}
				}

				break;
			case 'C':
				this.arInput = [{
					value: '0',
					taype: 'number'
				}];

				break;
			case '=':
				this.equal();

				break;
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
