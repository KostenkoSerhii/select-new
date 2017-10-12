
export default class Select {
	constructor(options) {
		this._el = document.querySelectorAll(options.selector);
		this._parentClass = options.cssClass;
		this._body = document.body;
		this._init();
	}
	_init() {
		this._makeDom();
		this._firstLoad();
		this._onClick();
	}
	_makeDom() {
		this._createParent();
		this._createList();
		this._createTitle();
	}
	_createParent() {
		for (let i = 0; i < this._el.length; i++) {
			let parent = document.createElement("div");
			this._el[i].parentNode.insertBefore(parent, this._el[i]);
			parent.appendChild(this._el[i])
			parent.classList.add(this._parentClass);
			parent.classList.add("sssl");
			if(this._el[i].disabled) {
				this._el[i].parentNode.classList.add("is-disabled");

			}
		}
		this._parent = document.querySelectorAll("." + this._parentClass);

	}
	_createList() {
		for (let i = 0; i < this._parent.length; i++) {
			let options = this._parent[i].querySelectorAll("option");
			let ul = document.createElement('ul');
			for (let j = 0; j < options.length; j++) {
				let li;
				if(options[j].disabled){
					li = "<li class='disabled-item'>" + options[j].innerHTML + "</li>";
				}else if(options[j].hasAttribute("data-placeholder")){
					li = "<li class='placeholder-item'>" + options[j].innerHTML + "</li>";
				}else{
					li = "<li>" + options[j].innerHTML + "</li>";
				};
				ul.insertAdjacentHTML("beforeEnd", li);
			}
			this._parent[i].appendChild(ul);
			ul.classList.add(this._parentClass + "__list");
		}
		this._ul = document.querySelectorAll(this._parentClass + " ul");

	}

	_createTitle() {
		for (let i = 0; i < this._parent.length; i++) {
			let title = document.createElement("span");
			// let icon = document.createElement("i");
			title.classList.add(this._parentClass + "__head");
			title.classList.add("placeholder");
			this._parent[i].appendChild(title);

		}
		this._title = document.querySelectorAll(this._parentClass + " span");
		
	}
	_onClick() {

		document.addEventListener("click", this._hideList.bind(this));
		for (let i = 0; i < this._parent.length; i++) {
			this._parent[i].addEventListener("click", this._clickAction.bind(this));
		}
	}
	_clickAction(event) {
		if (event.currentTarget.children[0].disabled) {
			return false;
		}
		if (event.target.tagName == "SPAN") {
			this._toggleList(event);
		}
		if (event.target.tagName == "LI") {
			if(event.target.classList.contains('disabled-item')){
			}else{
				this._changeVal(event);
			}
		};
		event.stopPropagation();
	}
	_toggleList(event) {
		let additional = $(event.currentTarget).parents('.js-informer');

		if(additional.length) {
			additional.toggleClass('is-active');
		}

		event.currentTarget.classList.toggle("is-active");
	}
	_hideList(event) {
		for (let i = 0; i < this._parent.length; i++) {
			this._parent[i].classList.remove("is-active");
		}
		if(document.querySelector('.js-informer')){
			document.querySelector('.js-informer').classList.remove("is-active");
		}
	}
	_changeVal(event) {
		let arrLi = event.currentTarget.querySelectorAll("li");
		let $arrLi = $(event.currentTarget).find("li");
		let arrOptions = event.currentTarget.querySelectorAll("option");
		let target = event.target;
		let parent = event.currentTarget;
		let index = [].indexOf.call(arrLi, target);

		for (let j = 0; j < arrOptions.length; j++) {
			if (index == j) {
				arrOptions[j].selected = true;
				break;
			}
		}
		$arrLi.removeClass('is-active');
		arrLi[index].classList.add('is-active');

		this._changeTitle(parent, arrLi[index].innerHTML);
		this._toggleList(event);
	}
	_changeTitle(parent, text) {
		parent.querySelector("span").innerHTML = text;
		parent.querySelector("span").classList.remove("placeholder");
	}
	_firstLoad() {
		for (let i = 0; i < this._parent.length; i++) {
			let options = this._parent[i].querySelectorAll("option");
			let li = this._parent[i].querySelectorAll("li");
			let arrLi = [].slice.call(li);
			let title = this._parent[i].querySelector("span");
			for (let j = 0; j < options.length; j++) {
				let option = options[j];
				if (option.selected) {
					var optionIndex = j;
					if(!option.hasAttribute("data-placeholder")){
					title.classList.remove("placeholder");
					}
					break;
				}

			}
			title.innerHTML = arrLi[optionIndex].innerHTML;

			$(arrLi[optionIndex]).addClass('is-active');


		}
	}
}
