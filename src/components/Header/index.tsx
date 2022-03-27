import React, { useEffect, useState } from 'react'
import auth from '@react-native-firebase/auth'
import { Container, Column, GrettingLabel, LogoutButton, LogoutButtonLabel } from './styles'

export function Header({ navigation }) {

    const [userName, setUsername] = useState('...')

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged((user) => {
            if(user){
                setUsername(user.displayName)
            }
        })
        return subscriber
    }, [])

    async function signOut () {
        await auth().signOut()
        navigation.navigate('Login')
    }

    return (
        <Container>
            <Column>
                <GrettingLabel>Olá, { userName }</GrettingLabel>
            </Column>
            <Column>
                <LogoutButton
                    onPress={() => signOut()}
                >
                    <LogoutButtonLabel>Sair</LogoutButtonLabel>
                </LogoutButton>
            </Column>
        </Container>
    )
}