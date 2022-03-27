import React, { useState } from 'react'
import { Alert } from 'react-native'
import { LinkToLogin } from './styles'
import { DefaultContainer } from '../../components/DefaultContainer'
import { Loader } from '../../components/Loader'
import { Input } from '../../components/Input'
import { DefaultButton } from '../../components/DefaultButton'

import auth from '@react-native-firebase/auth'

export function Signup ({ navigation }) {

    const [isLoading, setIsLoading] = useState(false)
    const [fieldName, setFieldName] = useState('')
    const [fieldEmail, setFieldEmail] = useState('')
    const [fieldPassword, setFieldPassword] = useState('')

    function clearFields() {
        setFieldName('')
        setFieldEmail('')
        setFieldPassword('')
    }

    function registerUser () {
        if(fieldName === '' || fieldEmail === '' || fieldPassword === '') {
          Alert.alert('Atenção', 'Todos os campos são obrigtórios.')
        } else {
            setIsLoading(true)
            
            auth()
                .createUserWithEmailAndPassword(fieldEmail, fieldPassword)
                .then((res) => {
                    res.user.updateProfile({
                        displayName: fieldName
                    })
                    setIsLoading(false)
                    clearFields()
                    navigation.navigate('Login')
                })
            .catch(error => {
                setIsLoading(false)
                if (error.code === 'auth/email-already-in-use') {
                    Alert.alert('Atenção', 'Este e-mail já está em uso.')
                    return
                }

                if (error.code === 'auth/invalid-email') {
                    Alert.alert('Atenção', 'Este e-mail está inválido.')
                    return
                }

                if (error.code === 'auth/weak-password') {
                    Alert.alert('Atenção', 'Sua senha precisa possuir no mínimo 6 caracteres.')
                    return
                }

                Alert.alert('Atenção', 'Um erro não mapeado aconteceu, verifique sua contexão com a internet ou altere seus dados de cadastro.')

                console.error(error)
            })
        }
    }

    if(isLoading){
        return <Loader />
    }    

    return (
        <DefaultContainer>
            <Input
                placeholder="Nome"
                value={fieldName}
                onChangeText={(val) => setFieldName(val)}
            />      
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
                onPress={() => registerUser()}
                label="Cadastrar"
            />

            <LinkToLogin 
                onPress={() => navigation.navigate('Login')}
            >
                Já é registrado? Clique aqui para fazer o login.
            </LinkToLogin>              
        </DefaultContainer>
    
    )
}
