import React from 'react'

import { Container, NameContainer, TextContainer, DateContainer } from './styles'

interface IMessage{
    author: string;
    text: string;
    createdOn: string;
    index: number;
}

export function Message({author, text, createdOn, index}: IMessage){
    return (
        <Container index={index}>
            <NameContainer>{ author }</NameContainer>
            <TextContainer>{ text}</TextContainer>
            <DateContainer>{ createdOn }</DateContainer>
        </Container>
    )
}