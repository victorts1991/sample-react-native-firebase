import React, { useEffect, useState } from 'react'
import { View, Alert, Text } from 'react-native'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { Header } from '../../components/Header'
import { Message } from '../../components/Message'
import { Container, ChatContainer, SendContainer, SendInput, SendButton, SendButtonLabel, LoadMoreButton } from './styles'

let subscriber = null
const qtdPerPage = 10

export function Chat ({ navigation }) {

    const [messages, setMessages] = useState([])
    const [qtdMessages, setQtdMessages] = useState(0)
    const [sendText, setSendText] = useState('')
    const [limit, setLimit] = useState(qtdPerPage)

    useEffect(() => {
        function onResult(QuerySnapshot) {
            setMessages(QuerySnapshot.docs)
        }
          
        function onError(error) {
            console.error(error);
        }

        subscriber = firestore()
                        .collection('Messages')
                        .orderBy('createdOn', 'asc')
                        .limit(limit)
                        .onSnapshot(onResult, onError)
        
        //get total messages
        firestore()
            .collection('Messages')
            .get()
            .then(querySnapshot => {
                setQtdMessages(querySnapshot.size)
            })
        
        return () => subscriber()
    }, [])

    useEffect(() => {
        if(subscriber){
            subscriber()
        }
        function onResult(QuerySnapshot) {
            setMessages(QuerySnapshot.docs)
        }
          
        function onError(error) {
            console.error(error);
        }
        
        subscriber = firestore()
                        .collection('Messages')
                        .orderBy('createdOn', 'asc')
                        .limit(limit)
                        .onSnapshot(onResult, onError)
    }, [limit])

    function clearField () {
        setSendText('')
    }

    function sendMessage () {

        if(sendText.length === 0){
            Alert.alert('Atenção', 'O campo mensagem é obrigatório.')
        }

        auth().onAuthStateChanged((user) => {
            if(user){
                firestore()
                    .collection('Messages')
                    .add({
                        author: user.displayName,
                        message: sendText,
                        createdOn: new Date().toLocaleString()
                    })
                    .then(() => {
                        console.log('Message added!')
                        clearField()
                    })
            }
        })
        
    }

    return (
        <Container>
            <Header navigation={navigation}/>
            <ChatContainer>
                {
                    qtdMessages > messages.length &&
                    <LoadMoreButton
                        onPress={() => setLimit(limit + qtdPerPage)}
                    >
                        <Text>Carregar mais antigas</Text>
                    </LoadMoreButton>
                }
                {
                    messages.map((value, index) => {
                        return <View key={index}><Message author={value._data.author} text={value._data.message} createdOn={value._data.createdOn}/></View>
                    })
                }
            </ChatContainer>
            <SendContainer>
                <SendInput 
                    placeholder="Mensagem"
                    value={sendText}
                    onChangeText={(val) => setSendText(val)}
                />
                <SendButton onPress={() => sendMessage()}>
                    <SendButtonLabel>Enviar</SendButtonLabel>
                </SendButton>
            </SendContainer>
        </Container>
    )
}