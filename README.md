# Как развернуть проект

*  Установите Docker:
`$ sudo apt install docker-ce`

* Docker должен быть установлен, демон-процесс запущен, а для процесса активирован запуск при загрузке. Проверьте, что он запущен:
`$ sudo systemctl status docker`

* Вывод должен выглядеть примерно следующим образом, указывая, что служба активна и запущена: 
```
$ docker.service - Docker Application Container Engine
     Loaded: loaded (/lib/systemd/system/docker.service; enabled; vendor preset: enabled)
     Active: active (running) since Tue 2020-05-19 17:00:41 UTC; 17s ago
TriggeredBy: docker.socket
       Docs: https://docs.docker.com
   Main PID: 24321 (dockerd)
      Tasks: 8
     Memory: 46.4M
     CGroup: /system.slice/docker.service
             └─24321 /usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock
```

    
### Разрешаем не root пользователю использовать Docker (опционально)
* Добавляем своего пользователя в группу docker:   
`$ sudo usermod -aG docker username`   
## Устанавливаем Docker-compose
* Запускаем эту команду для установки последней версии docker-compose:  
```
$ sudo curl -L "https://github.com/docker/compose/releases/download/1.26.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

* Делаем файл запускаемым: `$ sudo chmod +x /usr/local/bin/docker-compose`

* Проверяем, как все работает: `$ docker-compose --version`

* Вывод должен быть примерно таким: 
```
$ docker-compose version 1.26.0, build 8a1c60f6
```
## Запускаем решение
* Заходим в корневую папку проекта:  
```
$ cd yeticrab-testtask
```

* Собираем образы будущих контейнеров Docker:
```
$ docker-compose build
```
* Далее мы запускаем контейнеры из только что собранных образов: 
```
$ docker-compose up
```
## Останавливаем проект 
* Для того, чтобы остановить работу проекта необходимо: либо приостановить выполнение сочетанием клавиш `ctrl + c` или `ctrl + z`, а после написать `docker-compose down`, либо написать это в другом окне терминала, но для этого необходимо выполнять команду из места от куда вы запустили контейнеры.

# API   

## Get request  
#### URL: `/api/items`  
#### METHOD: `GET`  
#### RESPONSE EXAMPLE:
```json
[
  {
    "companyName": "ООО Тест",
    "fullName": "Иванов Иван Иванович",
    "phoneNumber": "+7901234582",
    "comments": "Комментарий",
    "atiCode": 12345,
    "id": 1626775405606,
    "requestNumber": 1,
    "receiveTime": "2021-07-20T10:03:25"
  }
]
```

## Add request
#### URL: `/api/items`  
#### METHOD: `POST`
#### REQUEST EXAMPLE:
```json
[
 {
    "companyName": "ООО Тест",
    "fullName": "Иванов Иван Иванович",
    "phoneNumber": "+7901234582",
    "comments": "Комментарий",
    "atiCode": 12345
  }
]
```

## Patch request
#### URL: `/api/items`  
#### METHOD: `PATCH`
#### REQUEST EXAMPLE:
```json
[
 {
    "id": 1626775405606, 
    "companyName"?: "ООО Тест",
    "fullName"?: "Иванов Иван Иванович",
    "phoneNumber"?: "+7901234582",
    "comments"?: "Комментарий",
    "atiCode"?: 12345
  }
]
```

## Delete request 
#### URL: `/api/items/:id`
#### URL Parameters: `:id` - id заявки
#### METHOD: `DELETE`

# Время работы
![image](https://user-images.githubusercontent.com/56305535/126306550-df4edc7b-e2f0-49c3-a65b-b339e9571179.png)
![image](https://user-images.githubusercontent.com/56305535/126306589-bce9d3fe-4f9b-4c38-9881-021228bd7761.png)
