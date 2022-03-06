import React, { useCallback, useContext, useState } from 'react'
import { DataContext } from "../contexts/DataProvider"
import { MessageList } from '../components/MessageList'
import { collectionGroup, getDoc, getDocs, getFirestore, query } from 'firebase/firestore';


export const Inbox = (props) => {

  const [searchTerm, setSearchTerm] = useState('')
  const [filteredMessages, setfilteredMessages] = useState([])

  const { messages } = useContext(DataContext)
  const db = getFirestore()

  const grabFilteredData = useCallback( async (e) => {
    console.log(messages)
    setfilteredMessages(messages)
    setSearchTerm( e.target.value )
    let newMessages = messages.filter( (m) => m.body.includes(searchTerm))
    setfilteredMessages(newMessages)
    // setfilteredMessages
    // const desiredMessages = query(collectionGroup(db, 'user'))
    // const desiredSnapshot = await getDocs(desiredMessages)

    // desiredSnapshot.forEach(async doc => {
    //   const messageRef = await getDoc(doc.ref);
    //   let outputRef = messageRef.data().body
    //   console.log(outputRef)
    // })

    // return desiredSnapshot
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    grabFilteredData(e)
    setSearchTerm(e.target.name.value)
    let searchResult = e.target.name.value
    if ( searchTerm === grabFilteredData ){
      console.log(searchResult)

    }

  }

  return (
    <React.Fragment>
      <form onSubmit={ handleSubmit }>
        <label>
          Search
          <input type="text" name="name" />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <h2> You Have Mail</h2>
      <MessageList messages={filteredMessages} />
    </React.Fragment>
  )
}

