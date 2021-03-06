import React, {createContext, useState} from 'react';
import {Alert} from 'react-native';
import Firebase from '../firebaseConfig';
export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,


        login: async (email, password,userType) => {
          try {
            Firebase.auth().signInWithEmailAndPassword(email, password);


          } catch (e) {
            console.log(e);
            Alert.alert(
                  "Login Authentication Error",
                  {e},
                  [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                  ],
                  { cancelable: false }
                );

          }
        },
        register: async (email, password,sellerProfile) => {
          try {
            Firebase.auth().createUserWithEmailAndPassword(email, password)




          } catch (e) {
            console.log("error"+e);
            Alert.alert(
                  "Signup Authentication Error",
                  {e},
                  [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                  ],
                  { cancelable: false }
                );
          }
        },
        logout: async () => {
          try {
            Firebase.auth().signOut();
          } catch (e) {
            console.log(e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
