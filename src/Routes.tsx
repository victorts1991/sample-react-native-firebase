import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

//Pages
import { Login }  from './pages/Login'
import { Signup } from './pages/Signup'
import { Chat } from './pages/Chat'


const Stack = createStackNavigator()

export function RootStack() {
  return (
    <Stack.Navigator
      initialRouteName="Signup"
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#3740FE',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen 
        name="Signup" 
        component={Signup} 
        options={{ title: 'Signup' }}
      />       
      <Stack.Screen 
        name="Login" 
        component={Login} 
        options={
          {title: 'Login'}
        }
      />
      <Stack.Screen 
       name="Chat" 
       component={Chat} 
       options={
         { title: 'Chat' } 
       }
      />
    </Stack.Navigator>
  );
}