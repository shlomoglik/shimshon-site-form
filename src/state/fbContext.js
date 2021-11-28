import { createContext, useEffect, useState } from "react"
import { db } from '../App';
import { collection, onSnapshot } from "firebase/firestore";
import { USERS , SITES , ROLES, EQUIPMENT, MACHINES} from "./collections"

const initialState = {
    users: [],
    roles: [],
    sites: [],
    equipment: [],
    machines: [],
}
export const fbContext = createContext(initialState)

export default function FbProvider({ children }) {
    const [state , updateState] = useState(initialState)

    useEffect(() => {
        const listenTo = {
          [USERS]: false,
          [SITES]: false,
          [ROLES]: false,
          [EQUIPMENT]: false,
          [MACHINES]: false,
        }
        //fetch as listener~
        Object.keys(listenTo).forEach(path => {
          const colRef = collection(db, path)
          listenTo[path] = onSnapshot(colRef, snap => {
            snap.docChanges().forEach(({ doc, type }) => {
              if (type === "added") {
                updateState(prev => {
                  return {
                    ...prev,
                    [path]: [...prev[path], { id: doc.id, ...doc.data() }]
                  }
                })
              } else if (type === "modified") {
                updateState(prev => {
                  return {
                    ...prev,
                    [path]: prev[path].map(_doc => {
                      if (_doc.id === doc.id) return { id: doc.id, ...doc.data() }
                      return _doc
                    })
                  }
                })
              } else if (type === "removed") {
                updateState(prev => {
                  return {
                    ...prev,
                    [path]: prev[path].filter(_doc => _doc.id !== doc.id)
                  }
                })
              }
            })
          })
        })
        // console.log(state)
        return () => {
          updateState(...initialState)
          Object.values(listenTo).forEach(unsubscribe => {
            unsubscribe()
          })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])

    return (
        <fbContext.Provider value={state}>
            {children}
        </fbContext.Provider>
    )
}