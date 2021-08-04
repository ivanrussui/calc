'use strict';

// AJAX Asynchronous Javascript and XML


const inputRub = document.querySelector('#rub'),
	inputUsd = document.querySelector('#usd');

// используем обработчик события инпут 
inputRub.addEventListener('input', () => {
	// делаем запрос на сервер через объект XMLHttpRequest() - это конструктор
	const request = new XMLHttpRequest();


	// методы объекта XMLHttpRequest()
	
	// open(GET/POST и др., путь к серверу, асинхронность, логин, пароль) собирает настройки которые потом помогут селать запрос
	// request.open(method, url, async, login, pass); method и url обязательны
	request.open('GET', 'js/current.json');

	// setRequestHeader(тут значения) устанавливает значения HTTP заголовков
	request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

	// send(body пишем если в open('POST') в open('GET') нет данных) отправляет запрос на сервер
	request.send();


	// свойства объекта XMLHttpRequest()

	// status      это 200; 404 и т.д.
	// statusText  это OK; 	Not Found  и т.д.
	// response    это ответ от сервиса, то что пришло от бэкэндера
	// readyState  это текущее состояние нашего запроса от 0(UNSENT) до 4(DONE)


	// события объекта XMLHttpRequest()

	// 2 события
	// 1) load проще, срабатывает только один раз когда запрос полностью готов. используется чаще чем 2й
	request.addEventListener('load', () => {
		// если свойство status === OK
		if (request.status === 200) {
			// в консоль ответ от сервера
			// console.log(request.response);

			// трансформируем ответ из JSON объета в JS объект
			const data = JSON.parse(request.response);

			// расчитываем курс валют на основании от того что пришло с сервера и ввел юзер
			// вводим то что получилось в inputUsd контролируем его value берем значение из inputRub.value и делим на data.current.usd
			// inputUsd.value = +inputRub.value / data.current.usd;
			// округляем с помощью toFixed(2 знака после .) 
			inputUsd.value = (+inputRub.value / data.current.usd).toFixed(2);
		} else { // если что-то пошло не так, то
			inputUsd.value = 'Что-то пошло не так';
		}
	});

	// 2) readystatechange событие отслеживает готовность нашего запроса в текущий момент. используется реже
	// request.addEventListener('readystatechange', () => {
	// 	// если свойство readyState === DONE && свойство status === OK
	// 	if (request.readyState === 4 && request.status === 200) {
	// 		// // в консоль ответ от сервера
	// 		// console.log(request.response);

	// 		// трансформируем ответ из JSON объета в JS объект
	// 		const data = JSON.parse(request.response);

	// 		// расчитываем курс валют на основании от того что пришло с сервера и ввел юзер
	// 		// вводим то что получилось в inputUsd контролируем его value берем значение из inputRub.value и делим на data.current.usd
	// 		// inputUsd.value = +inputRub.value / data.current.usd;
	// 		// округляем с помощью toFixed(2 знака после .) 
	// 		inputUsd.value = (+inputRub.value / data.current.usd).toFixed(2);
	// 	} else { // если что-то пошло не так, то
	// 		inputUsd.value = 'Что-то пошло не так';
	// 	}
	// });
});