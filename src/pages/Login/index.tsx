import React, { useState } from 'react'
import { Alert } from 'react-native'
import auth from '@react-native-firebase/auth'
import { DefaultButton } from '../../components/DefaultButton'
import { Input } from '../../components/Input'
import { Loader } from '../../components/Loader'
import { LinkToSignup } from './styles'
import { DefaultContainer } from '../../components/DefaultContainer'

export function Login ({ navigation })  {

    const [isLoading, setIsLoading] = useState(false)
    const [fieldEmail, setFieldEmail] = useState('')
    const [fieldPassword, setFieldPassword] = useState('')

    function clearFields() {
        setFieldEmail('')
        setFieldPassword('')
    }

    function userLogin () {
        if(fieldEmail === '' || fieldPassword === '') {
            Alert.alert('Atenção', 'Todos os campos são obrigatórios.')
        } else {
            setIsLoading(true)
            auth()
                .signInWithEmailAndPassword(fieldEmail, fieldPassword)
                .then((res) => {
                    //console.log(res)
                    clearFields()
                    setIsLoading(false)
                    navigation.navigate('Chat')
            })
            .catch(error => {
                setIsLoading(false)
                Alert.alert('Atenção', 'Dados incorretos, por favor tente novamente com outros dados.')
                console.log('login error --->', error)
            })
        }
    }
    
    if(isLoading){
        if(isLoading){
            return <Loader />
        }  
    } 
    return (
        <DefaultContainer>
            <Input
                placeholder="E-mail"
                value={fieldEmail}
                onChangeText={(val) => setFieldEmail(val)}
            />
            <Input
                placeholder="Senha"
                value={fieldPassword}
                onChangeText={(val) => setFieldPassword(val)}
                secureTextEntry={true}
            />

            <DefaultButton 
                onPress={() => userLogin()}
                label="Acessar"
            />

            <LinkToSignup
                onPress={() => navigation.navigate('Signup')}
            >
                Não possui uma conta ainda? Clique aqui para cadastrar.
            </LinkToSignup> 
        </DefaultContainer>
    )
}
