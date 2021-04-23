import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCol, IonGrid, IonImg, IonItem, IonLoading, IonRow, IonText } from "@ionic/react"
import { useEffect, useState } from "react"
import { Store } from "../pages/Store"
import './Goods.css'

export function   Goods(props):JSX.Element {
    const [info,    setInfo] = useState<any>([])
    const [pages,   setPages] = useState(0)
    const [page,    setPage] = useState(1)
    const [cats,    setCats] = useState("")
    const [loading, setLoading] = useState(false)
  
  
    Store.subscribe({num: 2, type: "goods", func: () => {
      let goods = Store.getState().goods;
      let jarr: any = []
  
      goods.forEach(elem => {
        if(elem.Категория === props.info)
          jarr = [...jarr, elem]  
      });
      setInfo(jarr)
    }})
  
  
    useEffect(()=>{
  
      let goods = Store.getState().goods;
  
      let jarr: any = []
      goods.forEach(elem => {
        if(elem.Категория === props.info)
          jarr = [...jarr, elem]  
      });
      setInfo(jarr)
  
    },[props, page])
  
    let elem = <></>
  
    function  addBasket( good ){
      let basket = Store.getState().basket;
      if(basket === undefined) basket = [];
      var commentIndex = basket.findIndex(function(b) { 
          return b.Код === good.Код; 
      });
      if(commentIndex >= 0){
        let b_amount = basket[commentIndex].Количество
        let sum = b_amount + 1;
        let total = basket[commentIndex].Цена * sum;
  
  //      let upd = update(basket[commentIndex], {Количество: {$set: sum}, Всего: {$set: total}}); 
  
        let bask = basket.map(todo => {
          if (todo.Код === good.Код) {
            return { ...todo, Количество: sum, Всего: total}
          } else {
            return todo
          }
        })
        Store.dispatch({type: "basket", basket: bask})
  
      } else {
        basket = [...basket, {
          Код:            good.Код,
          Наименование:   good.Наименование,
          Цена:           good.Цена,
          Количество:     1,
          Всего:          1 * good.Цена,
          Картинка:       good.Картинка
      }]
  
        Store.dispatch({type: "basket", basket: basket})
      }
    }
  
    for(let i = 0;i < info.length;i++){
      elem = <>
        { elem }
        <IonCard class="g-card">
          <IonCardHeader        
            onClick = {()=>{
              props.setGood( info[i] )
              props.setPage( 2 )
            }}
          >
            <IonImg src={ info[i].Картинка } class="img-1"></IonImg>
          </IonCardHeader>
          <IonCardContent>
           <IonCardSubtitle
                onClick = {()=>{
                  props.setGood( info[i] )  
                  props.setPage( 2 )
                }}
           >
            <IonItem lines="none" class="bottom-1 font-12 w-100" >
              <IonGrid class="w-100">
                <IonRow class="w-100">
                  <IonCol class="w-100">
                    <b> { "Цена " + info[i].Цена  + "  руб"} </b>
                  </IonCol>
                </IonRow>
                <IonRow class="w-100">
                  <IonCol>
                    <b> { "В наличии " + info[i].Количество + "  шт "} </b>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonItem>
            </IonCardSubtitle>
            <IonItem>
                <IonButton
                  expand="block"
                  shape="round"
                  onClick={()=>{
                    addBasket(info[i])
                  }}
                > В Корзину </IonButton>
            </IonItem>
            <IonItem class="item-2 w-100" lines="none"
                onClick = {()=>{
                  Store.dispatch({type: "route", route: "/goods/" + info[i].Код})  
                }}
             >
                <IonText class="font-10 w-100">
                  { info[i].Наименование }
                </IonText>
             </IonItem>
          </IonCardContent>
        </IonCard>
      </>
    }
  
  
    return <>
      <IonLoading isOpen={ loading }  message="Подождите..." />
      <div className="i-content">
        { elem }
      </div>
    </>
}
  