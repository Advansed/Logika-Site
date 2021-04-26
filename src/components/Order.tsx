import { IonAlert, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCol, IonIcon, IonItem, IonLabel, IonList, IonRow, IonSelect, IonSelectOption } from "@ionic/react";
import { bicycleOutline, cardOutline, phonePortrait, timeOutline } from "ionicons/icons";
import { useState } from "react";
import { AddressSuggestions } from "react-dadata";
import MaskedInput from "../mask/reactTextMask";
import { Store } from "../pages/Store";
import './Order.css'

declare type Dictionary = {
    [key: string]: any;
  };
  
export function   Order(props):JSX.Element {
    const [message, setMessage] = useState("")
    const [mp,      setMP]    = useState(
      Store.getState().order.МетодОплаты === undefined ? true 
        : Store.getState().order.МетодОплаты === "Эквайринг"
    );
    const [dost,  setDost]  = useState(
      Store.getState().order.Доставка === undefined ? true 
        : Store.getState().order.Доставка === "Доставка"
    );
  
    let basket = Store.getState().basket
    let sum = 0; 
    for(let i = 0;i < basket.length;i++){
      sum = sum + basket[i].Всего
    }
  
    let order: any
    if(Store.getState().order.Организация !== undefined) {
      order = Store.getState().order;
    } else {
      order = {
  
        Организация:      Store.getState().market.Наименование,
        Адрес:            Store.getState().market.Адрес,
        token:            Store.getState().login.ГУИД,
        Телефон:          "",
        Доставка:         "Доставка",
        МетодОплаты:      "Эквайринг",
        АдресДоставки:    "",
        ВремяДоставки:    "",
        СуммаЗаказа:      sum,
        СуммаДоставки:    Store.getState().market.Доставка,
        СуммаВсего:       Store.getState().market.Доставка + sum,
        Товары:           Store.getState().basket  
  
      }
      Store.dispatch({type: "order", order: order})
    }
  
    let item : Dictionary = {"city": "Якутск"   };
    let dict : Dictionary[] = []; dict.push(item);
    let elem = <>
      <IonCard class="o-card">
        <IonCardHeader> Оформление заказа </IonCardHeader>
        <IonCardContent>
          <IonItem>
            <IonIcon slot="start" icon={ cardOutline } />
            <IonLabel position="stacked">Оплата</IonLabel>
            <IonSelect value={ order.МетодОплаты } okText="Да" cancelText="Нет" onIonChange={e => {
                order.МетодОплаты = e.detail.value
                Store.dispatch({type: "order", order: order})
                if(order.МетодОплаты === "Эквайринг") setMP(true)
                else setMP(false)
            }}>
              <IonSelectOption value="Эквайринг">Эквайринг</IonSelectOption>
              <IonSelectOption value="наличными">Наличными</IonSelectOption>
              <IonSelectOption value="картой">Картой</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonIcon slot= "start" icon={ phonePortrait }/>
            <IonLabel position="stacked">Телефон</IonLabel>
            <MaskedInput
              mask={['+', /[1-9]/, ' ','(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-',/\d/, /\d/]}
              className="m-input"
              autoComplete="off"
              placeholder="+7 (914) 000-00-00"
              id='1'
              type='text'
              value = { order.Телефон }
              onChange={(e: any) => {
                  order.Телефон = (e.target.value as string);
                  Store.dispatch({type: "order", order: order})
                }}
            />
          </IonItem>
          <IonItem>
            <IonIcon slot="start" icon={ bicycleOutline } />
            <IonLabel position="stacked">Доставка</IonLabel>
            <IonSelect value={ order.Доставка } okText="Okay" cancelText="Dismiss" onIonChange={e => {
                order.Доставка = e.detail.value
                Store.dispatch({type: "order", order: order})
                if(order.Доставка === "Доставка") setDost(true); else setDost(false)
            }}>
              <IonSelectOption value="Доставка">Доставка до адреса</IonSelectOption>
              <IonSelectOption value="Самовывоз">Самовывоз</IonSelectOption>
            </IonSelect>
          </IonItem>
          <div className = { dost ? "" : "hidden"}>
            <IonItem>
              <IonIcon slot= "start" icon={ timeOutline }/>
              <IonLabel position="stacked">Время доставки</IonLabel>
              <MaskedInput
                mask={[/[1-9]/, /\d/, ':', /\d/, /\d/, ' ', '-', ' ', /\d/, /\d/, ':', /\d/, /\d/,]}
                className="m-input"
                autoComplete="off"
                placeholder="12:00 - 21:00"
                id='2'
                type='text'
                value = { order.ВремяДоставки }
                onChange={(e: any) => {
                    order.ВремяДоставки = (e.target.value as string);
                    Store.dispatch({type: "order", order: order})
                  }}
              />
            </IonItem>
            <IonLabel class="ml-15" >Адрес</IonLabel>
            <AddressSuggestions
              token="23de02cd2b41dbb9951f8991a41b808f4398ec6e"
              filterLocations ={ dict }
              hintText = { "г. Якутск" }
              onChange={(e)=>{
                if(e !== undefined)
                  order.АдресДоставки = e.value
                  Store.dispatch({type: "order", order: order})
              }}
            /> 
          </div>
        <IonCardHeader> Итоги по заказу </IonCardHeader>   
          <IonList>
            <IonItem class="ml-1" lines="none">
              <IonCardSubtitle>Сумма доставки </IonCardSubtitle>
              <IonLabel slot="end" class="a-right">{ order.СуммаДоставки } руб</IonLabel>
            </IonItem>
            <IonItem class="ml-1" lines="none">
              <IonCardSubtitle>Заказано на сумму </IonCardSubtitle>
              <IonLabel slot="end" class="a-right">{ order.СуммаЗаказа } руб</IonLabel>
            </IonItem>
            <IonItem class="ml-1" lines="none">
              <IonCardSubtitle>Итого </IonCardSubtitle>
              <IonLabel slot="end" class="a-right">{ order.СуммаВсего } руб</IonLabel>
            </IonItem>
          </IonList>
          <IonRow>
            <IonCol></IonCol>
            <IonCol></IonCol>
            <IonCol>
              <IonButton expand="block"
                onClick = {()=>{
                  Proov();
                }}
              >
                { mp ? "Оплатить" : "Заказать"}
              </IonButton>
            </IonCol>
          </IonRow>
  
        </IonCardContent>
      </IonCard>
      <IonAlert
            isOpen={ message !== "" }
            onDidDismiss={() => setMessage("")}
            cssClass='my-custom-class'
            header={'Ошибка'}
            message={ message }
            buttons={['OK']}
          />
  
    </>
  
    function Proov(){
      
      if( dost && order.АдресДоставки === "") 
        setMessage("Заполните адрес")
      else 
      if(order.Телефон === "" || order.Телефон.indexOf('_') > -1)
        setMessage("Заполните телефон")
      else 
      if(order.МетодОплаты === "Эквайринг"){
        if(Order(order)){
          Store.dispatch({type: "order", order: order})
          props.setPage( 5 )
        }
      } else {
        if(Order(order)){
          Store.dispatch({type: "order", order: order})
          props.setPage( 6 )
        }
      }
    }
  
    async function Order(order){
      // let res = await getData("МП_Заказ",   order)
      // if(res.Код === 100){
      //   order.Документ = res.Документ;
      //     res = await getData1("МП_Заказ",    order);
      // } else 
      // if(res.Код === 200){
      //   setMessage(res.Описание);
      //   setError(true)
      //   return false
      // }
  
      // let res = await getData1("МП_Заказ", order)
      // if(res.Код === 300){
  
      //   Store.dispatch({type: "order",        order: ""})  
      //   Store.dispatch({type: "basket",       basket: []})  
  
      //   let params = {
      //     ГУИД:   Store.getState().login.ГУИД
      //   }
        
      //   let res = await getData1("МП_Заказы", params)
      //   Store.dispatch({type: "orders", orders: res})
  
      // }
  
    
      return true
    }
  
    return elem;
  }
  