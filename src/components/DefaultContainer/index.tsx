import React from 'react'

import { Container } from './styles'

export function DefaultContainer ({ children }) {
    return (
        <Container>
            {children}
        </Container>
    )
}