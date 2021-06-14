# MoscowCityHack2021_FoxoundTeam

## Каталоги

`Dataset` - jupyterlab-обработчик файлов датасета, выданного организаторами (файлы не включены в репозиторий ввиду размера), а также подготовленные на его основе карты спроса/предложения (используются для построния цветовых карт в веб-приложении)

`FoxhoundApp` - веб-приложение, прототип, отображающий рекомендации для двух категорий бизнеса (фуд-ритейл и бары/кафе/рестораны) на цветовой карте

`foxhound_front` - веб-клиент для веб-приложения, разработанный с использованием VueJS

`MobileApp` - мобильный клиент для веб-приложения, разработанный в QML.

## Развертывание через docker-compose
1. Установить [docker](https://docs.docker.com/engine/install/ubuntu/)
2. Установить [docker-compose](https://docs.docker.com/compose/install/)
3. В папке compose создать файлы .env и .uwsgi.env и заполнить их в соответствии с примерами
4. Запустить файл build.sh с правами суперпользователя
```bash
sudo ./build.sh
```
5. Настроить внешний nginx, который будет пересылать все запросы на порт приложения
## Команды docker-compose 
Все команды необходимо выполнять в папке compose
- Остановить все контейнеры
```bash
sudo docker-compose stop
```
- Перезапустить контейнер
```bash
sudo docker-compose restart {container_name}
```
- Запуск manage.py shell
```bash
sudo docker-compose exec web python manage.py shell
```
