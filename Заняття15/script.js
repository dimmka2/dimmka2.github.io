let b = document.querySelector("button")
let body = document.querySelector("body")

b.addEventListener("click", function (){
	let x = document.createElement("button")
	x.innerHTML = "This button has been created"
	body.appendChild(x)
})