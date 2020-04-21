# Фронтенд
Этот проект представляет из себя SPA на **react** с использование **react router**. 
В качестве хранилища данных я использовал механизм **useContext**.

# Бэкенд
Бэкенд сделан на **express.js** фреймворке.
Бэкенд дает методы для регистрации пользоватей, авторизации, регистрации заказов etc. 
Пользователи и заказы просто хранятся в переменных в памяти сервера. 
Авторизация выполняется с использование библиотеки **passport.js**, а все пароли хешируются с помощью **bcrypt**.

https://github.com/hino-2/corona-v-shop-backend

# Установка
1. Скачать фронтенд
2. Выполнить npm install
3. Выполнить npm build
4. Скачать бэкенд
5. Выполнить npm install
6. Закинуть файлы из папки build из фронтенда в папку с бэкендом
7. Выполнить npm start
8. Сервер будет по адресу http://localhost:3000
9. 🤞

Заходить нужно строго на 'localhost:3000', иначе виджет Почты не будет работать из-за ограничений доступа на стороне Почты.

