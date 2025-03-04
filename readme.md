# Balance Management API

Простое веб-приложение для управления балансом пользователя с использованием Node.js, Express и PostgreSQL.

## Требования

- Node.js (версия 14 или выше)
- PostgreSQL (версия 12 или выше)
- npm (Node Package Manager)

## Установка

1. Клонируйте репозиторий:
bash
git clone <repository-url>
cd BACKEND-TEST

2. Установите зависимости:
bash
npm install

3. Создайте базу данных в PostgreSQL:
bash
CREATE DATABASE balance_management;

4. Настройте конфигурацию базы данных в файле `.env`:

DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=balance_db
DB_HOST=localhost
PORT=3000

## Запуск приложения

1. Запустите приложение:
bash
npm run dev

2. Приложение будет доступно по адресу `http://localhost:3000`.

## API Endpoints

### Обновление баланса пользователя

POST /api/users/:userId/balance

#### Параметры запроса:
- `userId` - ID пользователя (в URL)
- `amount` - Сумма изменения баланса (в теле запроса)

#### Пример запроса:

bash
curl -X POST http://localhost:3000/api/users/1/balance \
-H "Content-Type: application/json" \
-d '{"amount": -2}'

#### Успешный ответ:

{
    "success": true,
    "balance": 8
}


## Тестирование нагрузки
Для тестирования параллельных запросов можно использовать Apache Benchmark или wrk.
Пример с использованием Apache Benchmark (10000 запросов, 100 параллельных соединений):
bash
ab -n 10000 -c 100 -p payload.json -T application/json http://localhost:3000/api/users/1/balance
Где payload.json содержит:
{
    "amount": -2
}

- Использование транзакций для атомарных операций
- Блокировка строки (SELECT FOR UPDATE) для предотвращения race conditions
- Проверка достаточности средств перед списанием
- Обработка параллельных запросов без использования очередей






