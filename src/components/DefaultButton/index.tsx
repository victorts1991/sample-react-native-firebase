import React from 'react'
import { Text } from 'react-native'
import { Container, Button, ButtonText } from './styles'

interface IButton {
    onPress: () => void;
    label: string;
}

export function DefaultButton ({onPress, label}: IButton){

    return (
        <Container>
            <Button
                onPress={onPress}
            > 
                <ButtonText>{ label }</ButtonText>
            </Button>
        </Container>
    )
}

