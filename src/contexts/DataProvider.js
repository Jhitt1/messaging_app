import { collection, getDocs, getDoc, getFirestore, orderBy, query, collectionGroup, addDoc } from "firebase/firestore";
import { createContext, useCallback, useEffect, useState } from "react";


export const DataContext = createContext()

export const DataProvider = (props) => {

    const [messages, setMessages] = useState([])

    const db = getFirestore()

    const getMessages = useCallback(
        async () => {
            const q = query(collectionGroup(db, 'user'))

            const querySnapshot = await getDocs(q)

            let newMessages = [];
            querySnapshot.forEach(async doc => {
                const userRef = await getDoc(doc.ref);
                console.log(userRef.data())

                newMessages.push({
                    id: doc.id,
                    ...doc.data(),
                    user: { ...userRef.data() }
                })
                //   console.log( doc.data() )
                setMessages(newMessages)
            })
            //   console.log(querySnapshot)
            return querySnapshot;
        },
        [db],
    )

    
    const addMessages = async (formData) =>
    {
        let collectionRef = await collection(db, `user`)

        await addDoc(collectionRef, formData)
        setMessages([ ...messages ])
    }

    useEffect(() => {
        getMessages()
    }, [getMessages])

    useEffect(() => {
        // console.log(firebaseApp)
    }, [])

    const values = {
        messages, setMessages
    }

    return (
        <DataContext.Provider value={values} >
            {props.children}
        </DataContext.Provider>
    )
}