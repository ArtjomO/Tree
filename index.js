var tree = {
	init: function(){
		this.createElements();
		this.addEvents();
	},
	
	createElements: function(){
		this.li = function(){					//creating new LI with three div's inside: .plus, .minus, .edit
			var li = this.newEl('LI'),
				div = this.newEl('DIV'),
				divPlus = this.newEl('DIV'),
				divMinus = this.newEl('DIV'),
				divEdit = this.newEl('DIV');
			divPlus.className = "plus";
			divMinus.className = "minus";
			divEdit.className = "edit";
			divEdit.innerHTML = "element";
			div.appendChild(divPlus);
			div.appendChild(divMinus);
			div.appendChild(divEdit);
			li.appendChild(div);
			return li;
		};
		
		this.newEl = function(el){
			return document.createElement(el);
		};
	},
	addEvents: function(){										//adding listener to the #tree div, wich contains main Ul and all the children
		var tree = document.getElementById("tree");
		tree.addEventListener("click", this.handler.bind(this))
	},
	
	/* handler will recognize wich button was clicked, by getting the className of this button */
	handler: function(event){
		var target = event.target;
		switch(target.className){
		/* if button .plus was clicked - this case will add li or ul>li, 
		depends on if there is ul in li from wich event was fired or not */
			case "plus":
				console.log("it's a plus!");
				var childUl = target.parentElement.nextElementSibling;
				var parentLi = target.parentElement.parentElement;
				if (childUl === null){					// in case if li>!ul, we will add one and append li to it
					parentLi.appendChild(this.newEl('UL'));
					parentLi.lastChild.appendChild(this.li());
				} else if (childUl !== null){			// in case if li>ul, we will only append li to already existing ul
					childUl.appendChild(this.li());
				};
				break;
			/* if .minus button was clicked - this case will remove li from wich event was fired, with all the subChildren */
			case "minus":
				console.log("it's a minus!");
				var parentLi = target.parentElement.parentElement;
				parentLi.remove();
				break;
			/* if .edit was clicked - .edit will be replaced with input, you will write something
			and then by hitting the "ENTER" button, there will be created new div.edit with the value of input inside,
			input will be removed */
			case "edit":
				console.log("it's edit!");
				var input = this.newEl('input');
				var div = this.newEl('div');
				target.parentElement.appendChild(input);
				target.remove(target);
				input.focus();
				input.onkeypress = function(event){
					if (event.keyCode === 13){
						this.parentElement.appendChild(div);
						div.className = "edit";
						div.innerHTML = this.value;
						this.remove(this);
					};
				};
				break;
			/* if .btn - doing same thing as .plus event  */
			case "btn":
				console.log("it's a button!");
				var childUl = target.nextElementSibling; // theese two were changed 
				var tree = target.parentNode;			 //			because of buttons different from .plus, surrounding structure
				if (childUl === null){
					tree.appendChild(this.newEl('UL'));
					tree.lastChild.appendChild(this.li());
				} else if (childUl !== null){
					childUl.appendChild(this.li());
				};
				break;
			default:
		};
	},
}

tree.init();