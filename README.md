# Design a Chat Room

## Tech stack
- Frontend: React, Ant Design, Vite, axios
- Backend: Node.js, AWS Lambda, API Gateway, DynamoDB, Web socket

&nbsp;

## Roadmap

## Functional (Basic) requirements

Results:

https://github.com/user-attachments/assets/8316b8db-1616-4842-b5e2-182e083446c1

&nbsp;

- [x] Create user account and Login
    - [x] Build email input
    - [x] Create user by email on server
    - [x] Login by email on server
    - [x] Create / Login user on browser
    - [x] Redirect to chat room UI

- [x] Create chat room and show chat room list
    - [x] Create Room DynamoDB and define schema
    - [x] Create Connection DynamoDB and define schema for recording current connecting users
    - [x] Create Room by AWS Lambda
    - [x] Create Web socket API Gateway and connect with create-room Lambda
    - [x] Build create room dropdown and button UI
    - [x] Create User-Room DynamoDB and define schema for quickly get user's room list
    - [x] Connect to Web socket Gateway and corresponding action to
    - [x] Build chat room list UI
    - [x] Test real time new room notification for notification

- [x] Join chat room and send message
    - [x] Create Message DynamoDB and define schema
    - [x] Create Message by AWS Lambda
    - [x] Create Web socket API action Gateway and connect with send-message Lambda
    - [x] Build send message input chat message UI
    - [x] Store new message to DynamoDB
    - [x] Test new message is sent to the participant in the same room
    - [x] Query message history from DynamoDB and show on message UI
    - [x] Scroll to bottom when new message is sent for everyone


&nbsp;


### Non-functional (Advanced) requirements

#### Many to many connection

Results:

https://github.com/user-attachments/assets/8f094ef2-0271-4ca3-827b-588591efc53c

&nbsp;

- [x] Update creating a room by selecting single user to many users
- [x] Update room list UI able to show multiple users
- [x] Test multiple users can send message to others in real time


&nbsp;

#### Share connection for all the tabs and windows

- [x] Setup Shared worker for Web socket connection
- [x] Test multiple tabs and windows can accept 'create_connection' action from Shared worker
- [x] Test multiple tabs and windows can accept 'get_user_rooms' action from Shared worker
- [ ] Test multiple tabs and window can disconnect websocket when all tabs & windows are closed
- [x] Test multiple tabs and windows can accept 'create_room' action from Shared worker
- [x] Test multiple tabs and windows can accept 'create_message' action from Shared worker
- [x] Test if multiple tabs & windows only share one connection
- [x] Test if original version is required multiple tabs & windows connection

&nbsp;

#### Show user online/offline status

&nbsp;

#### Store draft in indexDB

&nbsp;

#### Show Typing indicator


#### Show message send, read status

