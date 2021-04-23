import { IonButton, IonCol, IonRow } from "@ionic/react";
import './Topper.css'

export function   Topper():JSX.Element {
    let elem = <>
      <IonRow>
        <IonCol class="list-1"><IonButton fill="clear" expand="block"> Новости </IonButton></IonCol>
        <IonCol class="list-1"><IonButton fill="clear" expand="block"> Акции </IonButton></IonCol>
        <IonCol class="list-1"><IonButton fill="clear" expand="block"> Доставка </IonButton></IonCol>
        <IonCol class="list-1"><IonButton fill="clear" expand="block"> Оплата </IonButton></IonCol>
        <IonCol class="list-1"><IonButton fill="clear" expand="block"> Контакты </IonButton></IonCol>
      </IonRow>
    </>
    return elem;
  }
  