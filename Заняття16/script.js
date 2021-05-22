let button = document.querySelector("button")
let check = document.querySelector("input[type='checkbox']")
let login = document.querySelector("input[name='login']")
let pass = document.querySelector("input[name='pass']")
let userList = document.querySelector("ul")

let users = window.localStorage.getItem("user")
users = JSON.parse(users)
for (let i = 0;i<users.length;i++){
	let userItem = document.createElement("li")
	userItem.innerHTML = users[i].login
	userList.appendChild(userItem)
	console.log(users[i].login)
}

check.addEventListener('click',()=>{//function(){
	if(check.checked){
		button.disabled = false
	}else{
		button.disabled = true
	}
})

button.addEventListener('click',()=>{
	let currentLogin = {"login":login.value,"pass":pass.value}
	users.push(currentLogin)
	window.localStorage.setItem("user",JSON.stringify(users))
})

