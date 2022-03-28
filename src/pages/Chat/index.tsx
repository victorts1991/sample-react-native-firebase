import React, { useEffect, useState } from 'react'
import { View, Alert, Text, Keyboard } from 'react-native'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { Header } from '../../components/Header'
import { Message } from '../../components/Message'
import { Container, ChatContainer, SendContainer, SendInput, SendButton, SendButtonLabel, LoadMoreButton } from './styles'

let subscriber = null
const qtdPerPage = 5

export function Chat ({ navigation }) {

    const [messages, setMessages] = useState([])
    const [qtdMessages, setQtdMessages] = useState(0)
    const [sendText, setSendText] = useState('')
    const [limit, setLimit] = useState(qtdPerPage)
    const [screenHeightWithoutScrollView, setScreenHeightWithoutScrollView] = useState(140)

    useEffect(() => {
        messagesListener()
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            (e) => {
                setScreenHeightWithoutScrollView(e.endCoordinates.height + 185)
            }
          )
          const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setScreenHeightWithoutScrollView(140)
            }
          )
      
          return () => {
            keyboardDidHideListener.remove()
            keyboardDidShowListener.remove()
            subscriber()
          }
    }, [])

    useEffect(() => {
        messagesListener()
    }, [limit])

    function messagesListener() {
        if(subscriber){
            subscriber()
        }
        console.log('limit ---> ', limit)
        subscriber = firestore()
                        .collection('Messages')
                        .orderBy('createdOn', 'asc')
                        .limit(limit)
                        .onSnapshot((QuerySnapshot) => {
                            setMessages(QuerySnapshot.docs)
                        }, (error) => {
                            console.error(error);
                        })

        //get total messages
        firestore()
            .collection('Messages')
            .get()
            .then(querySnapshot => {
                setQtdMessages(querySnapshot.size)
            })
    }

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
                        //get total messages
                        firestore()
                        .collection('Messages')
                        .get()
                        .then(querySnapshot => {
                            setQtdMessages(querySnapshot.size)
                        })
                    })
            }
        })
        
    }

    return (
        <Container>
            <Header navigation={navigation}/>
            <ChatContainer screenHeightWithoutScrollView={screenHeightWithoutScrollView}>
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
                        return <View key={index}><Message index={index} author={value._data.author} text={value._data.message} createdOn={value._data.createdOn}/></View>
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