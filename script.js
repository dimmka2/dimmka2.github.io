let newTask = document.querySelector("input")
let button = document.querySelector("button")
let tasks = document.querySelector("ul")

function saveList(){
	tasks = document.getElementsByTagName("li")
	let n = {}
	for (let i = 0; i<tasks.length;i++){
		n[i]=tasks[i].innerText
	}
	localStorage.setItem("tasks",JSON.stringify(n))
}

function addTask(){
	newTask = document.querySelector("input")
	tasks = document.querySelector("ul")
	let addLi = document.createElement("li")
	addLi.innerText = newTask.value
	addLi.addEventListener("click",()=>{
		addLi.classList.toggle("crossed")
	})
	addLi.addEventListener("dblclick",()=>{
		tasks.removeChild(addLi)
		saveList()
	})
	newTask.value = ""
	newTask.focus()
	tasks.appendChild(addLi)	
}

function loadList(){
	let n = localStorage.getItem("tasks")
	n = JSON.parse(n)
	console.log(n)
	for (let i in n){
		tasks = document.querySelector("ul")
		let addLi = document.createElement("li")
		addLi.innerText = n[i]
		addLi.addEventListener("click",()=>{
			addLi.classList.toggle("crossed")
		})
		addLi.addEventListener("dblclick",()=>{
			tasks.removeChild(addLi)
		})
		newTask.value = ""
		newTask.focus()
		tasks.appendChild(addLi)	

	}
}

newTask.addEventListener("keypress",(e)=>{
	if (e.keyCode==13){
		addTask()
		saveList()
	}
})

button.addEventListener("click",addTask,saveList)

loadList()