import React from 'react'

import { Container, NameContainer, TextContainer, DateContainer } from './styles'

interface IMessage{
    author: string;
    text: string;
    createdOn: string;
}

export function Message({author, text, createdOn}: IMessage){
    return (
        <Container>
            <NameContainer>{ author }</NameContainer>
            <TextContainer>{ text}</TextContainer>
            <DateContainer>{ createdOn }</DateContainer>
        </Container>
    )
}