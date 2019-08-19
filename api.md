FORMAT: 1A
HOST: http://192.168.0.100:3000

# API GO BARBER

API do aplicativo Go Barber!

## Sobre [/]

API do módulo de NodeJS da Rocketseat feita com Express + banco de dados MySQL!

# Group Usuário

## Usuário  [/users]

### Criar Usuário [POST]

- Request (application/json)

   - Body

            {
                "name": "Bins2",
                "email": "bins22@ig.com.br",
                "password": "1234576"
            }

- Response 200 (application/json; charset=utf-8)

   - Attributes (CreateUserResponse)
   
   - Body

            {

                "message": "Usuário gravado com sucesso!",
                "user": {
                "username": "Biin1s231",
                "email": "biins111223@ig.com.br",
                "password": "$2a$10\$Fw1Nk5YFS3v7XU2DqK3rWuOhxbAStOJz30MaNS8/cukcUpuoYydsK",
                "created_at": "2019-05-05 16:29:57",
                "updated_at": "2019-05-05 16:29:57",
                "id": 52
                },
                "token": {
                    "type": "bearer",
                    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjUyLCJpYXQiOjE1NTcwODQ1OTd9.d0LDChT503W263fazumB2Hp31xb1DCxu4WEkuMozjgg",
                    "refreshToken": null
                }
            }


### Atualizar Usuário [PUT]

- Request (application/json)

   - Headers

            Authentication: Bearer JWT


   - Body

            {
                "name": "Bins",
                "email": "bins@ig.com.br",
                "oldPassword": "1234576",
                "password": "1234576",
                "confirmPassword": "1234576"
            }

- Response 200 (application/json; charset=utf-8)

   - Attributes (CreateUserResponse)
   
   - Body

            {

                "message": "Usuário gravado com sucesso!",
                "user": {
                "username": "Biin1s231",
                "email": "biins111223@ig.com.br",
                "password": "$2a$10\$Fw1Nk5YFS3v7XU2DqK3rWuOhxbAStOJz30MaNS8/cukcUpuoYydsK",
                "created_at": "2019-05-05 16:29:57",
                "updated_at": "2019-05-05 16:29:57",
                "id": 52
                },
                "token": {
                    "type": "bearer",
                    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjUyLCJpYXQiOjE1NTcwODQ1OTd9.d0LDChT503W263fazumB2Hp31xb1DCxu4WEkuMozjgg",
                    "refreshToken": null
                }
            }
         
  
## Login [/sessions]

### Login do usuário [POST]

- Request (application/json)

   - Body

            {
                "email": "bins@ig.com.br",
                "password": "123456"
            }

- Response 200 (application/json; charset=utf-8)

   - Attributes (LoginResponse)

   - Body

            {
            "user": {
               "id": 67,
               "name": "Bins",
               "email": "bins22@ig.com.br",
               "provider": false,
               "type": "USUARIO",
               "avatar": null
            },
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEyLCJpYXQiOjE1NjM3MTczNzN9.otd3_U-PxnME3M7rh0FnKXYBi0dhDOaShaPDN9Qk49w"
            }
         
- Response 404 (application/json; charset=utf-8)

   - Body      

            {
                "message": "O e-mail informado não foi localizado"
            }      

- Response 401 (application/json; charset=utf-8)

   - Body      

            {
               "message": "A senha ou o email informados estão incorretos"
            }         

- Response 403 (application/json; charset=utf-8)

   - Body      

            {
                "message": "Erro ao tentar logar o usuário. Verifique o login e a senha informados"
            }         


## Esqueceu senha [/forgot_password]

### Esqueceu senha [POST]

- Request (application/json)

   - Body

            {
                "email": "bins@ig.com.br"
            }

- Response 200 (application/json; charset=utf-8)

   - Attributes (MessageResponse)

   - Body
   
            {
                 message: 'E-mail de alterar senha enviado com sucesso'
            }         

## Validar Token [/validate_token]

### Validar Token [POST]

- Request (application/json)

   - Body

            {
                "token": "1235678910"
            }

- Response 200 (application/json; charset=utf-8)

   - Attributes (LoginResponse)

   - Body

            {
            "user": {
               "id": 67,
               "name": "Bins",
               "email": "bins22@ig.com.br",
               "provider": false,
               "type": "USUARIO",
               "avatar": null
            },
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEyLCJpYXQiOjE1NjM3MTczNzN9.otd3_U-PxnME3M7rh0FnKXYBi0dhDOaShaPDN9Qk49w"
            }

         
# Group Files
Imagens dos prestadores de serviços
         
## Imagens dos prestadores de serviços    [/files/{id}]

### Imagem do prestador [GET]

- Parameters

   - id: 1 (number) - ID do arquivo

- Request (application/json)   

- Response 200 (image/jpeg)  
    


### Atualizar imagem  [PUT]
O envio do arquivo deve ser feito atráves de form-data (multipart/form-data). O nome da variável deve ser file

- Parameters

   - id: 1 (number) - ID do arquivo

- Request (multipart/form-data; boundary=---BOUNDARY)

        -----BOUNDARY
        Content-Disposition: form-data; name="file[file]"; filename="image.jpg"
        Content-Type: image/jpeg
        Content-Transfer-Encoding: base64

        /9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0a
        HBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIy
        MjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIA
        AhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFAEB
        AAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AL+AD//Z
        -----BOUNDARY

   
   - Headers

            Authentication: Bearer JWT   
         
- Response 200 (application/json; charset=utf-8)      

   - Attributes(FileResponse)

   - Body
   
            {
            "file": {
               "file": "1558396610564.jpeg",
               "name": "0_11b748_d4d498a0_XXL.jpg",
               "type": "image",
               "subtype": "jpeg",
               "created_at": "2019-05-20 20:56:50",
               "updated_at": "2019-05-20 20:56:50",
               "id": 5
            }
            }
         

### Apagar Imagem [DELETE]

- Parameters

   - id: 1 (number) - ID do arquivo

- Request (application/json)

   - Headers

            Authentication: Bearer JWT


- Response 200 (application/json; charset=utf-8)

   - Attributes(MessageResponse)

   - Body         

            {
                "message": "Imagem excluída com sucesso"
            }


## Enviar imagem do prestador    [/files/]         
### Enviar imagem do prestador [POST]
O envio do arquivo deve ser feito atráves de form-data (multipart/form-data). O nome da variável deve ser file

- Request (multipart/form-data; boundary=---BOUNDARY)


        -----BOUNDARY
        Content-Disposition: form-data; name="file[file]"; filename="image.jpg"
        Content-Type: image/jpeg
        Content-Transfer-Encoding: base64

        /9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0a
        HBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIy
        MjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIA
        AhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFAEB
        AAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AL+AD//Z
        -----BOUNDARY

   
   - Headers

            Authentication: Bearer JWT   
      
- Response 200 (application/json; charset=utf-8)

   - Attributes(FileResponse)

   - Body
   
            {
            "file": {
               "file": "1557088194989.jpeg",
               "name": "0_11b748_d4d498a0_XXL.jpg",
               "type": "image",
               "subtype": "jpeg",
               "created_at": "2019-05-05 17:29:54",
               "updated_at": "2019-05-05 17:29:54",
               "id": 1
            }   
            }
         
# Group Providers
Prestadores de serviços da barbearia
         
## Listagem de prestadores    [/providers]

### Listagem de prestadores [GET]

- Request (application/json)

   - Headers

            Authentication: Bearer JWT


- Response 200 (application/json; charset=utf-8)

   - Attributes (array[ProvidersResponse])

   - Body 
   
            [
                {           
                    "id": 1,
                    "name": "Teste",
                    "email": "teste@teste.com.br",
                    "avatar_id": 1,
                    "avatar": {
                        "name": "teste",
                        "path": "teste",
                        "url": "http://localhost:3333/files/1"
            }      
            ]      


## Horários de atendimento    [/providers/{id}/available{?date}]
### Horários de atendimento [GET]

- Parameters

   - id: 1 (number) - ID do prestador de serviço     
   - date: 123456 (string) - Data selecionada

- Request (application/json)

   - Headers

            Authentication: Bearer JWT
   

- Response 200 (application/json; charset=utf-8)

   - Attributes (array[AvailableHoursResponse])

   - Body
   
            [
                {          
                    "time": "123456",
                    "value": "123456",
                    "available": true
            }   
            ]

## Dias de atendimento [/providers/{id}/days]
### Dias de atendimento [GET]

- Parameters

   - id: 1 (number) - ID do prestador de serviço

- Request (application/json)

   - Headers

            Authentication: Bearer JWT
   
- Response 200 (application/json; charset=utf-8)

   - Attributes (array[AvailableDaysResponse])

   - Body 

            [
                {
                "day": "2019-08-10",
                    "day_week": "5",
                    "enabled": true
                }
            ]
         
# Group Appointments
Agendamentos
         
## Agendamentos  [/appointments]

### Listagem de agendamentos [GET]


- Request (application/json)

   - Headers

            Authentication: Bearer JWT

- Response 200 (application/json; charset=utf-8)

   - Attributes (array[AppointmentResponse])

   - Body 
   
            [      
            {
                "id": 1,
                "date":"2019-08-10 20:56:50",
                "user_id": 1,
                "provider_id": 2,
                "canceled_at": "",
                "created_at":"2019-08-10 20:56:50",
                "updated_at":"2019-08-10 20:56:50",
            "provider": {
                 "name": "teste",
                    "email": "teste@teste.com.br"               
            },
                "user":{
                   "name": "teste"
                }
            }
            ]


### Novo Agendamento [POST]

- Request (application/json)

   - Headers

            Authentication: Bearer JWT
   
   - Body
   
            {
                "date" : "2019-08-23 18:00:00",
                "provider_id": 2 

            }           

- Response 200 (application/json; charset=utf-8)

   - Attributes (AppointmentResponse)

   - Body 
   
            {
                "id": 1,
                "date":"2019-08-10 20:56:50",
                "user_id": 1,
                "provider_id": 2,
                "canceled_at": "",
                "created_at":"2019-08-10 20:56:50",
                "updated_at":"2019-08-10 20:56:50",
            "provider": {
                 "name": "teste",
                    "email": "teste@teste.com.br"               
            },
                "user":{
                   "name": "teste"
                }
            }
         
         
## Agendamentos  [/appointments/{id}]

### Apagar Agendamento [DELETE]

- Parameters

   - id: 1 (number) - ID do agendamento

- Request (application/json)

   - Headers

            Authentication: Bearer JWT
   
- Response 200 (application/json; charset=utf-8)

   - Attributes (AppointmentResponse)

   - Body 

            {
                "id": 1,
                "date":"2019-08-10 20:56:50",
                "user_id": 1,
                "provider_id": 2,
                "canceled_at": "",
                "created_at":"2019-08-10 20:56:50",
                "updated_at":"2019-08-10 20:56:50",
            "provider": {
                 "name": "teste",
                    "email": "teste@teste.com.br"               
            },
                "user":{
                   "name": "teste"
                }
            }
            


# Group Notification
Lista as comunicações enviadas pelo sistema
         
## Listagem [/notifications]

### Listagem [GET]


- Request (application/json)

   - Headers

            Authentication: Bearer JWT

- Response 200 (application/json; charset=utf-8)

   - Attributes (array[NotificationResponse])

   - Body 

            [
                {
                    "id": 1,
                    "content": "teste",
                    "user": 1,
                    "read": true,
                    "created_at": "2019-08-10 20:56:50",
                    "updated_at": "2019-08-10 20:56:50"
                }         
            ]

## Marcar como visto [/notifications/{id}]

### Marcar como visto [PUT]

- Parameters

   - id: 1 (number) - ID do da notificação

- Request (application/json)

   - Headers

            Authentication: Bearer JWT
   

- Response 200 (application/json; charset=utf-8)

   - Attributes (NotificationResponse)

   - Body 

            {
                "id": 1,
                "content": "teste",
                "user": 1,
                "read": true,
                "created_at": "2019-08-10 20:56:50",
                "updated_at": "2019-08-10 20:56:50"
            }         

# Group Schedule
Agenda
         
## Agenda   [/schedule]

### Agenda [GET]


- Request (application/json)

   - Headers

            Authentication: Bearer JWT
   

- Response 200 (application/json; charset=utf-8)

   - Attributes (array[ScheduleResponse])

   - Body 
   
            [
               {
                    "id": 1,
                    "date":"2019-08-10 20:56:50",
                    "user_id": 1,
                    "provider_id": 2,
                    "canceled_at": "",
                    "created_at":"2019-08-10 20:56:50",
                    "updated_at":"2019-08-10 20:56:50",
                    "user":{
                       "name": "teste"
                    }
                }
            ]  

# Data Structures

## UsuarioResponse (object)

- id (number) - ID do usuário
- name (string) - Nome do usuário
- email (string) - E-mail do usuário, deve ser único
- provider (boolean) - Tipo de usuário (CLIENTE ou PRESTADOR DE SERVIÇO)
- avatar (AvatarResponse, nullable) - Imagem do usuário

## LoginResponse (object)

- user (UsuarioResponse) - Objeto com os dados do usuário
- token (string) - Token criptografado

## CreateUserResponse (object)

- message (string) - Retorno da operação
- user (UsuarioResponse) - Objeto com os dados do usuário
- token (string) - Token criptografado

## MessageResponse(object)

- Message (string) - Retorno da operação

## FileObject (object)

- id (number) - ID do arquivo
- name (string) - Nome do arquivo
- type (string) - Tipo do arquivo
- subtype (string) - Extensão do arquivo
- created_at (string) - Data de criação
- updated_at (string) - Data de atualização
- url (string) - Link para acessar a imagem

## FileResponse (object)

- file (FileObject) - Objeto com os dados da imagem

## AppointmentResponse (object)

- id (number) - ID do agendamento
- date (string) - Data do agendamento
- user_id (number) - ID do cliente
- provider_id (number) - ID do prestador de serviço
- canceled_at (string, nullable) - Data de cancelamento
- created_at (string) - Data de criação
- updated_at (string) - Data de criação
- provider (AppointmentProviderResponse) - Dados do prestador de serviço
- user (AppointmentUserResponse) - Dados do usuário

## AppointmentProviderResponse (object)
 
- name (string) - nome do prestador de serviço
- email (string) - E-mail do prestador de serviço

## AppointmentUserResponse (object)
      
- name (string) - nome do cliente

## NotificationResponse (object)

id (number) -ID da notificação
content (string) - Conteúdo da notificação
user (number) - ID do usuário
read (boolean, nullable) - Se a notificação foi lida
created_at (string) - Data de criação
updated_at (string) - Data de criação

## ScheduleResponse (object)

- id (number) - ID do agendamento
- date (string) - Data do agendamento
- user_id (number) - ID do cliente
- provider_id (number) - ID do prestador de serviço
- canceled_at (string, nullable) - Data de cancelamento
- created_at (string) - Data de criação
- updated_at (string) - Data de criação
- user (AppointmentUserResponse) - Dados do usuário

## AvailableDaysResponse (object)

- day (string) - Data
- day_week  (string) - Dia da semana
- enabled (boolean) - Se o dia pode ser agendado

## AvailableHoursResponse (object)

- time (string) - Horário
- value (string) - Horário formatado
- available (boolean) - Se o horário está disponível para agendamento
        
## AvatarResponse (object)

- name (string) - Nome da imagem
- path  (string) - Nome do arquivo
- url (string) - Caminho da imagem
      
## ProviderResponse
      
- id (number) - ID do prestador de serviço
- name (string) - Nome
- email (string) - Email
- avatar_id (number) - ID da imagem
- avatar (AvatarResponse) - Imagem do prestador de serviço
