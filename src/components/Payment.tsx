import { PermissionsPluginWeb } from "@capacitor/core"
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCol, IonIcon, IonItem, IonLabel, IonRow, IonText } from "@ionic/react"
import { cardOutline } from "ionicons/icons"
import { Store } from "../pages/Store"

export function   Payment(props):JSX.Element {
    let elem = <></>
  
    elem =<>
      <IonCard class="f-card">
        <IonCardHeader> Эквайринг </IonCardHeader>
        <IonCardContent>
          <IonItem>
            <IonIcon slot="start" icon={ cardOutline } />
            <IonLabel > Сумма к оплате </IonLabel>
            <IonText> { Store.getState().order.СуммаВсего } руб </IonText>
          </IonItem>
          <IonRow>
            <IonCol></IonCol>
            <IonCol></IonCol>
            <IonCol>
              <IonButton
                onClick = {()=>{
                  //  IPAY({api_token: 'v32e4mhbmbcu0o7ts1l2ps9ii5'});
                  //    ipayCheckout({
                  //      amount: Store.getState().order.СуммаВсего,
                  //      currency:'RUB',
                  //      order_number:'',
                  //      description: 'Оплата по заказу '},
                  //      function(order) { showSuccessfulPurchase(order) },
                  //      function(order) { showFailurefulPurchase(order) })  
                  // Store.dispatch({type: "route", route: "/page/delivery"})
                  props.setPage( 6 )
                }}
              >
                Оплатить
              </IonButton>
            </IonCol>
          </IonRow>
        </IonCardContent>
      </IonCard>
    </>
  
  function        showSuccessfulPurchase(order){
    console.log("success")
    console.log(order)
   // createDoc()
  }
  
  function        showFailurefulPurchase(order){
    console.log("failure")
    console.log(order)
  }
  
  
    return elem;
  }
  