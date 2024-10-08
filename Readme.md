# express-hw-pug-ejs

Цей проект є веб-додатком, розробленим з використанням Express та Node.js. Він демонструє використання шаблонізаторів Pug та Ejs для рендерингу сторінок.

## Технології

- Express
- Node.js
- Pug
- Ejs
- Nodemon
- Postman
- Bootstrap
- JWT
- bcrypt
- Passsport
- express-session
- Cookie
- MongoDB
- Сursor

## Встановлення

1. Клонуйте репозиторій
2. Встановіть залежності: `yarn`
3. Запустіть проект: `yarn start`

## Опис проекту

Цей веб-додаток надає простий інтерфейс для перегляду користувачів та статей. Він включає наступні основні функції:

- Головна сторінка
- Сторінка зі списком користувачів
- Сторінка окремого користувача
- Сторінка зі списком статей
- Сторінка окремої статті
- Cторінка для перегляду cookies(theme and JWT)
- Сторінка реєстрації та авторизації

### Шаблонізатори

У проекті використовуються два популярні шаблонізатори:

1. **Pug** (раніше відомий як Jade) - це потужний шаблонізатор, який дозволяє писати HTML з використанням відступів замість тегів. Він пропонує чистий та лаконічний синтаксис, що робить код більш читабельним. Pug також підтримує вбудовані вирази JavaScript, міксини та наслідування шаблонів.

2. **Ejs** (Embedded JavaScript) - це простий шаблонізатор, який дозволяє вбудовувати JavaScript безпосередньо в HTML. Він використовує спеціальні теги для вставки JavaScript коду, що робить його легким для вивчення та використання, особливо для розробників, які вже знайомі з HTML та JavaScript.

Використання обох шаблонізаторів у цьому проекті демонструє їх особливості та дозволяє порівняти їх синтаксис та функціональність.

У Додатку використовуєте Pug для (index, users, userId) і EJS для шаблонів (articles.ejs, articleId.ejs, settings.ejs, login.ejs, registration.ejs).Це демонструє гнучкість Express у роботі з різними шаблонізаторами в одному додатку. Цей підхід дозволяє використовувати переваги обох шаблонізаторів у різних частинах додатку.

Цей проект є чудовим прикладом того, як створювати базові веб-додатки з використанням популярних технологій Node.js та Express, а також як використовувати різні шаблонізатори для рендерингу HTML.

## Перехід на Cursor

У маршруті GET `http://localhost:3000/users` та GET `http://localhost:3000/articles` використовується Cursor для отримання списку користувачів з бази даних. Також ми використовуємо cursor.toArray(), щоб отримати всі результати курсора як масив та передати його у відповідь.

## Агрегаційний запит:

У маршруті GET `http://localhost:3000/users/stats` використовується агрегаційний запит для отримання статистики користувачів.

- **$group:** Групуємо всі документи разом (\_id: null).
- **totalUsers:** Рахуємо загальну кількість користувачів.
- **averageAge:** Обчислюємо середній вік.
- **uniqueEmails:** Збираємо унікальні email-адреси.
- **cities:** Збираємо унікальні міста.

**$project:** Формуємо фінальний вигляд результату запиту у форматі **JSON:**

- Видаляємо \_id.
- Залишаємо totalUsers без змін.
- Округлюємо averageAge до двох знаків після коми.
- Рахуємо кількість унікальних email-адрес.
- Додаємо кількість унікальних міст.

**Відповідь сервера:**

```json
{
  "totalUsers": 20,
  "averageAge": 34.95,
  "uniqueEmailCount": 20,
  "uniqueCityCount": 20
}
```

## Статичні файли:

Додано підтримку статичних файлів. Файл **favicon.png** доступний за шляхом **/favicon.png.** Використовується для відображення іконки сайту у вкладці браузера

## Cookies:

Реалізовано роботу з cookies для зберігання налаштувань користувача. Використовується для збереження теми оформлення на роуті **/settings.** Та зберегає токен при реєстрації\авторизації. При кожному запиті до сервера перевіряється наявність куків та їх значення.

## Інтеграція JWT:

Додано підтримку **JSON Web Tokens (JWT)** для аутентифікації
Токени генеруються при реєстрації та вході користувача
Використовуються для захисту маршрутів та аутентифікації користувачів
Забезпечують безпечний механізм автентифікації без необхідності зберігання сесій на сервері.

## Процес реєстрації та автентифікації у цьому проекті виглядає наступним чином:

### Реєстрація:

1. Дані форми відправляються на сервер методом POST.
2. Сервер перевіряє, чи не існує вже користувача з таким email.
3. Якщо email унікальний, створюється новий користувач з хешованим паролем.
4. Генерується JWT токен для нового користувача.
5. Токен зберігається в куках і відправляється у відповіді.

### Авторизація:

1. Користувач вводить email та пароль на сторінці **'/login'**.
2. Дані відправляються на сервер методом POST.
3. Сервер шукає користувача за вказаним email.
4. Якщо користувач знайдений, порівнюється введений пароль з хешованим.
5. При успішній перевірці генерується новий JWT токен.
6. Токен зберігається в куках і відправляється у відповіді.

Цей процес забезпечує безпечну реєстрацію та вхід користувачів.

## Авторизація з Passport

У цьому проекті використовується Passport для реалізації авторизації користувачів. Passport - це middleware для Node.js, який спрощує процес автентифікації в Express-додатках.

## Робота з MongoDB

У цьому застосунку MongoDB використовується для зберігання та управління даними користувачів. Ось ключові моменти використання MongoDB:

Підключення до бази даних здійснюється через функцію connectDB, яка імпортується з файлу db.mjs.

У функції passport.deserializeUser використовується MongoDB для пошуку користувача за його ідентифікатором (\_id).

Колекція 'users' використовується для зберігання інформації про користувачів.

Колекція 'articles' використовується для зберігання інформації про статті.

ObjectId з MongoDB використовується для коректної роботи з ідентифікаторами користувачів.

У різних контролерах (наприклад, для реєстрації та входу) використовуються операції з MongoDB для створення, пошуку та оновлення користувачів.

## Маршрути

- http://localhost:3000/ - Головна сторінка "Home"
- http://localhost:3000/users - Сторінка "Users"
- http://localhost:3000/users/:Id - Сторінка "User"
- http://localhost:3000/articles - Cторінка "Articles"
- http://localhost:3000/articles/:Id - Cторінка "Article"
- http://localhost:3000/settings - Сторінка "Cookies Page"
- http://localhost:3000/login - Сторінка "Login"
- http://localhost:3000/registration - Сторінка "Registration"
- http://localhost:3000/protected - Захищений маршрут! Доступний тільки для авторизованих користувачів
- http://localhost:3000/logout - Вихід з облікового запису

# API Maршрути

## Users

### Створення користувача

- **URL:** `http://localhost:3000/users`
- **Метод:** POST
- **Тіло запиту:**
  ```json
  {
    "name": "Іван Петренко",
    "email": "ivan@example.com",
    "phone": "+380123456789"
  }
  ```
- **Успішна відповідь:** "Користувача створено з id 60d5ecb8b8f2f2a1b4f1e8c9"

### Отримання списку користувачів

- **URL:** http://localhost:3000/users
- **Метод:** GET
- **Успішна відповідь:** JSON-масив з даними користувачів

### Отримання користувача за ID

- **URL:** http://localhost:3000/users/:id
- **Метод:** GET
- **Успішна відповідь:** JSON-об'єкт з даними користувача

### Оновлення користувача

- **URL:** http://localhost:3000/users/:id
- **Метод:** PUT
- **Тіло запиту:**

```json
{
  "phone": "+380987654321"
}
```

- **Успішна відповідь:** "Користувача з id 60d5ecb8b8f2f2a1b4f1e8c9 оновлено"

### Видалення користувача

- **URL:** http://localhost:3000/users/:id
- **Метод:** DELETE
- **Успішна відповідь:** "Користувача з id 60d5ecb8b8f2f2a1b4f1e8c9 видалено"

### Заміна користувача

- **URL:** http://localhost:3000/users/:id/replace
- **Метод:** PUT
- **Тіло запиту:**

```json
{
  "name": "Marcus",
  "email": "aaron@gmail.com",
  "phone": "+5345343561561561"
}
```

- **Успішна відповідь:** Користувача з id 66ebb9ede2794cd448625119 замінено

## Масові операції

### Створення багатьох користувачів

- **URL:** http://localhost:3000/users
- **Метод:** POST
- **Тіло запиту:**

```json
[
  {
    "name": "Іван Петренко",
    "email": "ivan@example.com",
    "age": 30
  },
  {
    "name": "Марія Коваленко",
    "email": "maria@example.com",
    "age": 25
  },
  {
    "name": "Олег Сидоренко",
    "email": "oleg@example.com",
    "age": 35
  }
]
```

- **Успішна відповідь:** "Створено X користувачів"

### Оновлення багатьох користувачів

- **URL:** http://localhost:3000/users
- **Метод:** PUT
- **Тіло запиту:**

```json
{
  "filter": { "name": "Іван Петренко" },
  "update": { "phone": "+380123456789" }
}
```

- **Успішна відповідь:** "Оновлено X користувачів"

### Видалення багатьох користувачів

- **URL:** http://localhost:3000/users
- **Метод:** DELETE
- **Тіло запиту:**

```json
{
  "filter": { "name": "Іван Петренко" }
}
```

- **Успішна відповідь:** "Видалено X користувачів"

**Ця структура надає чіткий огляд всіх доступних маршрутів API, методів, форматів запитів та очікуваних відповідей.**

_Також у оновленому коді добавлено об'єкт проекції, який вказує, які поля повертати (1) або не повертати (0). Метод find тепер використовує цю проекцію як другий аргумент._

## Тестування маршрутів

Для тестування маршрутів використовується застосунок Postman.

link: https://www.postman.com/downloads/

## Тестування MongoDB

Для тестування MongoDB використовується застосунок MongoDB Compass.

link: https://www.mongodb.com/try/download/shell
