let canvas = document.querySelector("canvas")
let can = canvas.getContext("2d")
let grid = 150 // Розміри 1 клітинки ігрового поля
canvas.width = Math.floor(window.innerWidth/2.1/grid)*grid  // зміна ширини canvas 
canvas.height = Math.floor(window.innerHeight/1.1/grid)*grid  // зміна висоти canvas 
let rows = canvas.height/grid  // кількість рядків клітинок ігрового поля
let cols = canvas.width/grid  // кількість стовпців клітинок ігрового поля
let p = document.querySelector("p") // 
let apple = new Image() // створення нового малюнка, який можна використати в canvas. Потім apple використовується в рядку 91
apple.src = "apple.png" // вказування адреси малюнка
let grass = new Image()
grass.src = "grass.jpg"
let head = new Image()
head.src = "snake-head-2.png"

function makeGrid() { // функція, яка малює ігрове поле
	can.drawImage(grass,0,0,cols*grid,rows*grid)
	can.strokeStyle = "#ffffff"
	for (let i = 0; i < rows; i++){  // малюються вертикальні лінії
		can.beginPath()
		can.lineWidth = 1.5	
		can.moveTo(0,i*grid)
		can.lineTo(cols*grid,i*grid)
		can.stroke()
		can.closePath()
	}
	for (let i = 0; i < cols; i++){ // малюються горизонтальні лінії
		can.beginPath()
		can.lineWidth = 1.5	
		can.moveTo(i*grid,0)
		can.lineTo(i*grid,rows*grid)
		can.stroke()
		can.closePath()
	}
}

class snake{ // клас, який описує властивості та поведінку Змійки на ігровому полі
	constructor(){ // початкові значення властивостей змійки
		this.x = 0 // координати "голови" змійки
		this.y = 0 // координати "голови" змійки
		this.body = [{'x':0,"y":0}] // "тіло" змійки
		this.right = 1 //-1 - рухатися вліво; 0 - не рухатися по горизонталі; 1 - рухатися вправо
		this.up = 0 //-1 - рухатися вниз; 0 - не рухатися по вертикалі; 1 - рухатися вверх
	}
	draw(){ // малювання змійки
		can.fillStyle = "#97e29b"
		for (let i=0; i<this.body.length;i++)// намалюати усі квадратики "тіла" змійки
		{ 
			can.fillRect(this.body[i]["x"]*grid+grid/10,this.body[i]["y"]*grid+grid/10,grid-grid/5,grid-grid/5)
		}
		can.fillStyle = "#74b778"
		// can.fillRect(this.x*grid,this.y*grid,grid,grid) //намалювати "голову" змійки
		can.drawImage(head,this.x*grid,this.y*grid,grid,grid)
	}
	update()// оновлення положення "голови" і "тіла" змійки
	{ 
		if (this.right == 1) {
			this.x++
		}else if(this.right == -1){
			this.x--
		}
		if (this.up == 1){
			this.y--
		}else if(this.up == -1){
			this.y++
		}
		//якщо змійка виповзла за екран, то повертаємо її в межі ігрового поля
		if (this.x>cols-1){this.x=0};
		if (this.y>rows-1){this.y=0};
		if (this.x<0){this.x=cols-1};
		if (this.y<0){this.y=rows-1};
		// оновлення усіх фрагментів "тіла" змійки
		for (let i = 1; i < this.body.length; i++){
			this.body[i-1] = this.body[i]
		}
		// Додавання "голови" змійки в "тіло"
		if (this.body.length > 0){
			this.body[this.body.length-1] = {"x":this.x,"y":this.y}
		}
	}
	eat() // "поїдання" фрукта - якщо змійка і фруки перетнулися, то додаємо координати фрукта в "тіло" змійки
	{
		this.body.unshift({'x':this.x,'y':this.y})
	}
	check()
	{
		for (let i = 0; i < this.body.length-1; i++){
			if (this.x == this.body[i].x && this.y == this.body[i]["y"]){
				alert("YOU LOOSE")
				this.body = [{'x':0,"y":0}]
				this.up = 0
				this.right = 0
				this.x = 0
				this.y = 0
				speed = 500
			}
		}
	}
}

class fruit{ // клас, який описує фрукт, за яким полює змійка
	constructor(){ // початкові координати фрукта
		this.x = 2
		this.y = 2
	}	
	draw() // намалювати фрукт
	{
		// can.fillStyle = "#c43718"
		// can.fillRect(this.x*grid,this.y*grid,grid,grid)		// так у нас малювався фрукт у вигляді квадрата
		can.drawImage(apple,this.x*grid,this.y*grid,grid,grid)
	}
	update() // оновлення положення фрукта на нове випадкове положення на ігровому полі
	{ 
		this.x = Math.floor(Math.random()*cols)
		this.y = Math.floor(Math.random()*rows)
		let t = true
		while (t){
			t = false
			for (let i in s.body){
				if (this.x == s.body[i]["x"] && this.y == s.body[i]["y"]){
					this.x = Math.floor(Math.random()*cols)
					this.y = Math.floor(Math.random()*rows)
					t = true
				}
			}
		}			
	}
}
//До цього моменту описані елементи, які ми виористовуватимемо. Далі безпосередньо активна робота гри

let s = new snake() // створюємо новий екземпляр класу "змійка"
let f = new fruit() // створюємо новий екземпляр класу "фрукт"
can.clearRect(0,0,canvas.width,canvas.height)
makeGrid() // малюємо ігрове поле
f.draw() // малюємо фрукт
s.draw() // малюємо змійку

let speed = 500

let go = setInterval(play,speed)

function play(){
	clearInterval(go)
	makeGrid() // малюємо ігрове поле
	s.update() // оновлюємо положення змійки
	s.check()
	if (s.x == f.x && s.y == f.y) // якщо "голова" змійки і фрукт перетнулися (у них однакові координати)
	{
		f.update() // оновлюємо положення фрукта
		s.eat() // додаємо координати фрукта в "тіло" змійки
		speed = speed - 50
	}
	f.draw() // малюємо фрукт
	s.draw() // малюємо змійку
	p.innerHTML = s.body.length+"  "+speed // відображаємо довжину "тіла" змійки в абзац
	go = setInterval(play,speed)
}


// window.setInterval(function()// setInterval задає безкінечний цикл, все тіло якого виконується з інтервалом в 500мс (задано у рядку 123)
// {
// },500)//доробити: збільшувати швидкість при збільшенні "тіла" змійки


window.addEventListener('keydown',(e)=>{  // відслідковування натиснутих клавіш
	switch(e.keyCode){ // якщо натиснута клавіша клавіатури, то перевіряємо її код. відомо що 37 - стрілка вліво, 38 - стрілка вверх, 39 - стрілка враво, 40 - стрілка вгору 
		case 37://left
		s.right = -1
		s.up = 0
		break
		case 38://up
		s.right = 0
		s.up = 1
		break
		case 39://right
		s.right = 1
		s.up = 0
		break
		case 40://down
		s.right = 0
		s.up = -1
		break
	}
})