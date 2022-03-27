import React from 'react'
import { ActivityIndicator } from 'react-native'
import { PreLoader } from './styles'

export function Loader() {
    return (
        <PreLoader>
            <ActivityIndicator size="large" color="#9E9E9E"/>
        </PreLoader>
    )
}

