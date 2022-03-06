import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, setPersistence, browserLocalPersistence, onAuthStateChanged } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { firebaseApp } from '../firebase/config';

export const AuthContext = createContext()

export function useAuth() {
    return useContext( AuthContext )
}

export const AuthProvider = ( { children } ) => {

    const provider = new GoogleAuthProvider();
    const auth = getAuth()
    const db = getFirestore()
    const [currentUser, setCurrentUser] = useState({ loggedIn: false })

    function signIn() {
        return setPersistence( auth, browserLocalPersistence )
            .then( () => {
                signInWithPopup( auth, provider )
                    .then( result => {
                        console.log( result )
                    })
            }).catch( error => console.error( error ))
    }

    function logOut() {
        signOut( auth )
            .then( () => {
                setCurrentUser({ loggedIn: false })
                console.log('User has logged out successfully')
            })
    }

    const values = {
        signIn, currentUser, logOut
    }

    useEffect(() => {
        console.log( currentUser )
        onAuthStateChanged( auth, ( user ) => {
            if ( user ) {

                // once the user logs in, we need to add them to the database as a reference
                // query the users collection to find the user
                const userRef = doc( db, 'users', user.uid )
                // if that user doesn't exist, add them to the database,
                // otherwise, if the user does exist, overwrite (don't duplicate) their information
                setDoc( userRef, { email: user.email, name: user.displayName }, { merge: true } )

                setCurrentUser({
                    id: user.uid,
                    name: user.displayName,
                    image: user.photoURL,
                    email: user.email,
                    loggedIn: true
                })
            }
        } )
    }, [ auth ])

    return (
        <AuthContext.Provider value={ values }>
            { children }
        </AuthContext.Provider>
    )
}
