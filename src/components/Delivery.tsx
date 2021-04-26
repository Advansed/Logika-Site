import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCol, IonIcon, IonItem, IonLabel, IonList, IonRow, IonText } from "@ionic/react";
import { bicycleOutline, businessOutline, cashOutline, homeOutline, storefrontOutline } from "ionicons/icons";
import { getData, Store } from "../pages/Store";


export function   Delivery(props):JSX.Element {

    let order = Store.getState().order;
    let elem = <>
      <IonCard class="f-card">
        <IonCardHeader> Заказ </IonCardHeader>
        <IonCardContent>
          <IonList>
          <IonItem>
              <IonItem lines="none">
                <IonIcon slot="start" icon = { businessOutline }/>
                <IonLabel position="stacked"> Организация </IonLabel>
                <IonText><b> { order.Организация } </b></IonText>
              </IonItem>
            </IonItem>
            <IonItem>
              <IonItem lines="none">
                <IonIcon slot="start" icon = { bicycleOutline }/>
                <IonLabel position="stacked"> Доставка </IonLabel>
                <IonText><b> { order.Доставка } </b></IonText>
              </IonItem>
            </IonItem>
            <IonItem className={ order.Доставка === "Доставка" ? "" : "d-none"}>
              <IonItem lines="none">
                <IonIcon slot="start" icon = { homeOutline }/>
                <IonLabel position="stacked"> Адрес доставки </IonLabel>
                <IonText><b> { order.АдресДоставки } </b></IonText>
              </IonItem>
            </IonItem>
            <IonItem className={ order.Доставка === "Доставка" ? "d-none" : ""}>
              <IonItem lines="none">
                <IonIcon slot="start" icon = { storefrontOutline }/>
                <IonLabel position="stacked"> Забирать с адреса </IonLabel>
                <IonText><b> { order.Адрес } </b></IonText>
              </IonItem>
            </IonItem>
            <IonItem>
              <IonItem lines="none">
                <IonIcon slot="start" icon = { cashOutline }/>
                <IonLabel position="stacked"
                  className={ order.МетодОплаты === "Эквайринг" ? "d-none" : ""}
                > Оплата { order.МетодОплаты } </IonLabel>
                <IonText
                  className={ order.МетодОплаты === "Эквайринг" ? "d-none" : ""}
                ><b> Заказано на сумму { order.СуммаВсего } руб </b></IonText>
                <IonText
                  className={ order.МетодОплаты === "Эквайринг" ? "" : "d-none"}
                ><b> Оплачено { order.СуммаВсего } руб </b></IonText>
              </IonItem>
            </IonItem>
            <IonItem className={ order.Доставка === "Доставка" ? "d-none" : ""}>
             <IonText class="text-1">
                Вы можете забрать свой заказ с указанного адреса в рабочее время течение трех дней.
                Потом заказ будет отменен. 
                <span className={ order.МетодОплаты === "Эквайринг" ? "" : "d-none"}>
                  Деньги будут возвращены на карту
                </span>
             </IonText>
            </IonItem>
            <IonItem className={ order.Доставка === "Доставка" ? "" : "d-none"}>
             <IonText class="text-1">
               Ближайшее время с вами свяжутся и обговорят время доставки вашего заказа
             </IonText>
            </IonItem>
          </IonList>
          <IonRow>
            <IonCol></IonCol>
            <IonCol></IonCol>
            <IonCol>
              <IonButton
                onClick = {()=>{  
                  let order = Store.getState().order
                  order.СтатусОплаты = "Не оплачено"
                  order.МетодДоставки = order.Доставка
                  order.Покупатель = "Покупатель"
                  order.АдресДоставки 
                  console.log(order)
                  getData("Заказ", order )
                  Store.dispatch({type: "basket", basket: []})
                  props.setPage( 0 )
                }}
              > Закрыть
              </IonButton>
            </IonCol>
          </IonRow>
        </IonCardContent>
  
  
      </IonCard>
    </>
  
    return elem;
  }
