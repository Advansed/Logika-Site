import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonChip, IonCol, IonGrid
    , IonImg, IonItem, IonLoading, IonRow, IonText } from "@ionic/react"
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
        <Good info = { info[i] } 
          addBasket = { addBasket }
          setGood = { props.setGood }
          setPage = { props.setPage }
        />
      </>
    }
  
  
    return <>
      <IonLoading isOpen={ loading }  message="Подождите..." />
      <div className="i-content">
        { elem }
      </div>
    </>
}
  
function Good(props):JSX.Element {
  let info = props.info
  let elem = <>
        <IonCard class="g-card">
          <IonCardHeader        
            onClick = {()=>{
              props.setGood( info )
              props.setPage( 2 )
            }}
          >
            <IonImg src={ info.Картинка } class="img-1"></IonImg>
          </IonCardHeader>
          <IonCardContent>
            <IonItem class="item-2 w-100" lines="none"
                onClick = {()=>{
                  Store.dispatch({type: "route", route: "/goods/" + info.Код})  
                }}
             >
                <IonText class="f-14 w-100">
                  <b>{ info.Наименование }</b>
                </IonText>
            </IonItem>
              <IonGrid class="g-grid">
                <IonRow class="w-100">
                  <IonCol size="6">
                    <IonText class="f-18 blue">
                      <b>{ info.Цена + " ₽/шт" }</b>
                    </IonText>
                  </IonCol>
                  <IonCol size="6">
                    <IonChip class="f-12"
                      onClick={()=>{
                        props.addBasket(info)
                      }}
                    > В Корзину </IonChip>
                  </IonCol>
                </IonRow>
              </IonGrid>
          </IonCardContent>
        </IonCard>

  </>

  return elem;
}
