import { IonImg, IonItem, IonList, IonText } from "@ionic/react"
import { useEffect, useState } from "react"
import { Store } from "../pages/Store"
import './Categories.css'

export function   Categories(props):JSX.Element {
    const [info, setInfo] = useState<any>([])
    const [cat,   setCat] = useState<any>()


    Store.subscribe({num: 1, type: "categories", func: () => setInfo( Store.getState().categories )})

    useEffect(()=> setInfo( Store.getState().categories ),[])

    let elem = <></>

    for(let i = 0;i < info.length;i++){
      if(info[i] === cat) 
        elem = <>
          { elem }
          <IonItem detail
            onClick={()=>{
              setCat(undefined)
              props.onClick(undefined)
            }}
          >
            <IonImg class="w-2 h-2" src = { info[i].Картинка } alt="" slot="start" />
            <IonText><b>{ info[i].Наименование }</b></IonText>
          </IonItem>
        </>
      else
        elem = <>
            { elem }
            <IonItem detail
              onClick={()=>{
                setCat(info[i])
                props.onClick(info[i])
              }}
            >
              <IonImg class="w-2 h-2" src = { info[i].Картинка } alt="" slot="start" />
              <IonText>{ info[i].Наименование }</IonText>
            </IonItem>
        </>
    }
    return <>
      <IonList class="list-1">
        { elem }
      </IonList>
    </>
}

