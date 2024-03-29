# Бэкенд проекта "Правда или Ложь"

## Документация по API
#### Авторизация
| Действие            | Метод | EndPoint     | Body                  | 
|---------------------|-------|--------------|-----------------------|
| Регистрация         | POST  | /register    | name, password, email |
| Авторизоваться      | POST  | /login       | password, email       |

#### Пользователи
| Действие                       | Метод | EndPoint     | Body                  | Защита |
|--------------------------------|-------|--------------|-----------------------|--------|
| Получить данные текущего юзера | GET   | /users/me    |                       | +      |
| Найти всех пользователей       | GET   | /users/      |                       |        |
| Найти пользователя по ID       | GET   | /users/:ID   |                       |        |
| Изменить собственные данные    | PATCH | /users/      | name, password, email | +      |
| Изменить данные юзера          | PATCH | /users/:ID   | name, password, email | Админ  |
| Удалить юзера                  | DELETE| /users/:ID   |                       | Админ  |

#### Факты
| Действие                | Метод | EndPoint     | Body                     | Защита |
|-------------------------|-------|--------------|--------------------------|--------|
| Создать                 | POST  | /facts/      | question, answer, isTrue | +      |
| Найти все факты         | GET   | /facts/all   |                          | +      |
| Найти факт по ID        | GET   | /facts/:ID   |                          | +      |
| Получить рандомный факт | GET   | /facts/      |                          |        |
| Редактировать факт      | PATCH | /facts/:ID   | question, answer, isTrue | Админ  |
| Удалить факт            | DELETE| /facts/:ID   |                          | Админ  |