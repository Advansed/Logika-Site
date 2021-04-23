import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonCol, IonIcon, IonImg, IonRow } from "@ionic/react";
import { addCircleOutline, arrowBackOutline, closeOutline, removeCircleOutline } from "ionicons/icons";
import { useState } from "react";
import { Store } from "../pages/Store";
import './Basket.css'

export function   Basket(props):JSX.Element {
    const [upd, setUpd] = useState(0)
  
  
  function  delBasket(Код){
      let basket = Store.getState().basket;
  
      if(basket === undefined) basket = [];
  
      var commentIndex = basket.findIndex(function(b) { 
          return b.Код === Код  
      });
      if(commentIndex >= 0){
        basket.splice(commentIndex, 1)
        Store.dispatch({type:"basket", basket: basket})
      }
  }
  
  function  updBasket(Код: number, amount: number){
      let basket = Store.getState().basket;
  
      if(basket === undefined) basket = [];
  
      var commentIndex = basket.findIndex(function(b) { 
          return b.Код === Код
      });
      if(commentIndex >= 0){
        let b_amount = basket[commentIndex].Количество
        let sum = b_amount + amount;
        let total = basket[commentIndex].Цена * sum;
  
        if(sum === 0) delBasket(Код)
        else {
          let bask = basket.map(todo => {
            if (todo.Код === Код) {
              return { ...todo, Количество: sum, Всего: total}
            } else {
              return todo
            }
          })
          Store.dispatch({type: "basket", basket: bask})
  
        }
  
      }
  }
  
  function  BItem(props):JSX.Element{
      let info = props.info;
      return <>
        <IonRow class="r-underline">
          <IonCol size="2"><IonImg id="a-margin" src={info.Картинка} class="b_img"/></IonCol>
          <IonCol size="8">
            <IonCardSubtitle> {info.Наименование} </IonCardSubtitle>
            <IonCardTitle> 
              <IonChip>
                <IonButton class="i-but" fill="clear" onClick={()=>{
                    updBasket(info.Код, -1)
                    setUpd(upd + 1)
                }}>
                  <IonIcon slot="icon-only" icon={ removeCircleOutline }></IonIcon>
                </IonButton>
                { info.Количество }
                <IonButton class="i-but" fill="clear" onClick={()=>{
                    updBasket(info.Код, 1)
                    setUpd(upd + 1)
                }}>
                  <IonIcon slot="icon-only" icon={ addCircleOutline }></IonIcon>
                </IonButton>
                { info.Всего }
              </IonChip>
            </IonCardTitle>
          </IonCol>
          <IonCol size="2">
            <IonRow>
              <IonCol class="i-col">
                <IonButton class="i-but" fill="clear" onClick={()=>{
                  delBasket(info.Код)
                  setUpd(upd + 1)
                }}>
                  <IonIcon slot="icon-only" icon={ closeOutline }>
                  </IonIcon>
                </IonButton>
              </IonCol>
            </IonRow>
          </IonCol>
      </IonRow>
      </>
    
  }
  
    let basket = Store.getState().basket;
    let b_length = 0;
  
    for(let i = 0;i < basket.length;i++){
      b_length = b_length + basket[i].Количество;
    }  
  
    let items = <></>
  
    let sum = 0;
    for(let i = 0;i < basket.length;i++){
      sum = sum + basket[i].Всего;
      items = <>
        { items }
        <BItem info={ basket[i] } />
      </>
    }
  
    items = <>
      <IonCard class="w-100" >
        <IonCardHeader>
          <IonButton fill="clear"
            onClick= {()=>{
              props.setPage(0)
            }}
          >
            <IonIcon icon={ arrowBackOutline }></IonIcon>
          </IonButton>
        </IonCardHeader>
        <IonCardHeader>Всего товаров { b_length }</IonCardHeader>
        <IonCardContent>
          { items }
        </IonCardContent>
        <IonCardHeader>
          Итого на сумму { sum }
        </IonCardHeader>
      </IonCard>
      <IonCard class="card-1">
        <IonRow>
          <IonCol>
            <IonButton expand="block" shape="round"
              onClick={()=>{
                Store.dispatch({type: "basket", basket: []})
                props.setPage(0)
              }}
            >
              Очистить
            </IonButton>
          </IonCol>        
          <IonCol>
            <IonButton expand="block" shape="round"
              onClick={()=>{
                //getToken()
                //Store.dispatch({type: "route", route: "/page/order"})
                props.setPage(3)
              }}
            >
              Оформить
            </IonButton>
          </IonCol>        
        </IonRow>
      </IonCard>
     </>
  
    return items
  }