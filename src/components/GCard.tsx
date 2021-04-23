import { IonButton, IonCard, IonCardHeader, IonCardTitle, IonChip, IonCol, IonIcon, IonItem, IonLabel, IonRow, IonText, IonToolbar } from "@ionic/react";
import { addCircleOutline, arrowBackOutline, checkmarkCircleOutline, removeCircleOutline } from "ionicons/icons";
import { useState } from "react";
import { Store } from "../pages/Store";
import './GCard.css'

export function   GCard(props):JSX.Element {
    const [upd,   setUpd]   = useState(0)
    const [info,  setInfo]  = useState<any> ({
        Код:            props.info.Код,
        Наименование:   props.info.Наименование,
        Цена:           props.info.Цена,
        Количество:     1,
        Всего:          props.info.Цена,
        Картинка:       props.info.Картинка
    });
  
  
    function  addBasket(amount: number){
      let basket = Store.getState().basket;
      if(basket === undefined) basket = [];
      var commentIndex = basket.findIndex(function(b) { 
          return b.Код === info.Код; 
      });
      if(commentIndex >= 0){
        let b_amount = basket[commentIndex].Количество
        let sum = b_amount + (amount as number);
        let total = basket[commentIndex].Цена * sum;
  
  //    let upd = update(basket[commentIndex], {Количество: {$set: sum}, Всего: {$set: total}}); 
  
        let bask = basket.map(todo => {
          if (todo.Код === info.Код) {
            return { ...todo, Количество: sum, Всего: total}
          } else {
            return todo
          }
        })
        Store.dispatch({type: "basket", basket: bask})
  
      } else {
        basket = [...basket, {
          Код:            info.Код,
          Наименование:   info.Наименование,
          Цена:           info.Цена,
          Количество:     amount,
          Всего:          amount * info.Цена,
          Картинка:       info.Картинка
      }]
        Store.dispatch({type: "basket", basket: basket})
      }
    }
  
    let elem = <>
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
          <IonItem>
            <h4 className="a-center font-14"><b>{ props.info.Наименование }</b></h4>
          </IonItem>
          <IonRow>
            <IonCol size="5">
              <img className="f-card" src={  props.info.Картинка } alt="" />
            </IonCol>
            <IonCol size="7">
              <IonItem class="font-10">
                <IonLabel position="stacked"> Цена </IonLabel>
                <IonCardTitle class="f-price a-center"><b>{ props.info.Цена } руб.</b></IonCardTitle>
                <IonChip>
                  <IonIcon icon = { checkmarkCircleOutline }/>
                  <IonText> В Наличии { props.info.Количество } шт </IonText>
                </IonChip>
              </IonItem>
              <IonItem>
                <IonChip>
                  <IonButton class="i-but" fill="clear" onClick={()=>{
                    if(info.Количество > 0) {
                      info.Количество = info.Количество - 1;
                      info.Всего = info.Количество * info.Цена;
                      setInfo(info);
                      setUpd(upd + 1)
                    }
                  }}>
                  <IonIcon slot="icon-only" icon={ removeCircleOutline }></IonIcon>
                  </IonButton>
                    { info.Количество }
                  <IonButton class="i-but" fill="clear" onClick={()=>{
                      info.Количество = info.Количество + 1;
                      info.Всего = info.Количество * info.Цена;
                      setInfo(info);
                      setUpd(upd + 1)
                  }}>
                    <IonIcon slot="icon-only" icon={ addCircleOutline }></IonIcon>
                  </IonButton>
                    { info.Всего }
                </IonChip>
              </IonItem>
              <IonItem>
                <IonChip onClick={()=>{
                    addBasket(info.Количество)
                }}> В Корзину </IonChip>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonItem>
            <IonLabel position="stacked">Описание</IonLabel>
            {/* <IonText>
              { props.info.Описание }
            </IonText> */}
          </IonItem>
          <IonItem>
            {/* <IonLabel position="stacked">Описание</IonLabel> */}
            <IonText class="text-2 font-10">
              { props.info.Описание }
            </IonText>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Производитель</IonLabel>
            <IonText class="text-2 font-10">
              { props.info.Производитель }
            </IonText>
          </IonItem>
          <IonToolbar>
  
          </IonToolbar>
        </IonCard>
    </>
    
    return elem
  }
  