import { Card, Input, Skeleton } from 'antd';
import { useEffect, useRef, useState } from 'react';

import { getRoomMessages } from '../apis/rooms';
import { sharedWorker } from './chatApp';
import { create_message } from '../config/socketActions';

const Message = ({ children, isUser }) => {
    return (
        <div style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start' }}>
            <Card
                style={{
                    display: 'inline-block',
                    padding: '5px 10px',
                    borderColor: isUser ? '#91caff' : '#f0f2f5',

                }}
                styles={{
                    body: { padding: 0 }
                }}
            >
                {children}
            </Card>
        </div>
    );
};

const ChatRoom = ({ roomId, userEmail, selectedRoom }) => {
    const [value, setValue] = useState('');
    const [messages, setMessages] = useState([]);
    const [isGettingRoomMessages, setIsGettingRoomMessages] = useState(false);
    const messagesEndRef = useRef(null);


    const handleSendMessage = () => {
        const messagePayload = {
            action: create_message,
            message: value,
            room_id: roomId,
            sender: userEmail,
        }

        sharedWorker.port.postMessage(messagePayload);
        setValue('');
    }

    const messageListenerRef = useRef(null);

    useEffect(() => {
        const addCurRoomMessageListener = (event) => {
            if (event.data.action === create_message) {
                setMessages(prevMessages => [...prevMessages, event.data]);
            }
        }

        sharedWorker.port.addEventListener("message", addCurRoomMessageListener);
        messageListenerRef.current = addCurRoomMessageListener;

        return () => {
            // prevent event listener being added twice
            sharedWorker.port.removeEventListener("message", messageListenerRef.current);
            // messageListenerRef.current = null;
        }
    }, [roomId]);

    useEffect(() => {
        if (selectedRoom) {
            setIsGettingRoomMessages(true);
            getRoomMessages(selectedRoom.room_id).then((data) => {
                setMessages(data.data);
                setIsGettingRoomMessages(false);
            });
        }
    }, [selectedRoom]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);


    return (
        <div style={{ width: '58%' }}>
            {roomId && (
                <>
                    <Card style={{ marginBottom: '10px', height: '500px', overflowY: 'auto' }}>
                        {isGettingRoomMessages ? <Skeleton active /> : messages.map((message) => {
                            const isUser = message.sender === userEmail;
                            return (
                                <div key={message.message_id} style={{ paddingBottom: '10px' }}>
                                    {!isUser && (<div style={{ fontSize: '12px', color: '#888' }}>
                                        {message.sender.split('@')[0]}
                                    </div>)}

                                    <Message
                                        key={message.message_id}
                                        isUser={isUser}
                                        message={message}
                                    >
                                        {message.message}
                                    </Message>
                                </div>
                            )
                        })}
                        <div ref={messagesEndRef} />
                    </Card>
                    <Input
                        disabled={isGettingRoomMessages}
                        placeholder="Your message"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        onPressEnter={handleSendMessage}
                    />
                </>
            )}
        </div>
    );
};

export default ChatRoom;