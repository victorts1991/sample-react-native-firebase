import styled from 'styled-components/native'
import { Dimensions } from 'react-native'

export const Container = styled.KeyboardAvoidingView`

`

export const ChatContainer = styled.ScrollView`
    background: #E5E0DA;
    height: ${(props) => (Dimensions.get('window').height - props.screenHeightWithoutScrollView) }px;
    width: 100%;
`

export const SendContainer = styled.View`
    flex-direction: row;
    height: 53px;
`

export const SendInput = styled.TextInput`
    background: #FFF;
    width: 80%;
    padding-left: 20px;
`

export const SendButton = styled.TouchableOpacity`
    width: 20%;
    background: #4CBB61;
    justify-content: center;
    align-items: center;
`

export const SendButtonLabel = styled.Text`
    font-size: 16px;
    color: #FFF;
    font-weight: bold;
`

export const LoadMoreButton = styled.TouchableOpacity`
    background: transparent;
    height: 40px;
    justify-content:center;
    align-items: center;
`

export const ActivityIndicator = styled.ActivityIndicator`
    margin-top: 10px;
`

