import { IonAlert, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonCol, IonGrid, IonIcon, IonImg, IonItem, IonLabel, IonList, IonLoading, IonRow, IonSearchbar, IonSelect, IonSelectOption, IonText, IonToolbar } from '@ionic/react';
import { addCircleOutline, arrowBack, arrowBackOutline, bicycleOutline, businessOutline, callOutline, cardOutline, cartOutline, cashOutline, checkmarkCircleOutline, closeOutline, enterOutline, homeOutline, mailOpenOutline, mic, musicalNote, phonePortrait, removeCircleOutline, storefrontOutline, timeOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import Dropdown, { Option, Group} from 'react-dropdown';
import 'react-dropdown/style.css';
import MaskedInput from '../mask/reactTextMask';
import { AddressSuggestions } from 'react-dadata';
import { getData, Store } from '../pages/Store';
import 'react-dadata/dist/react-dadata.css';

export function   Header():JSX.Element {
  let elem = <>
    <div className="container">
      <IonToolbar>
        <IonButton fill="clear"> О компании </IonButton>
        <IonButton fill="clear"> Договор </IonButton>
        <IonButton slot="end" fill="clear">
          <IonIcon slot = "icon-only" icon = { enterOutline } />
        </IonButton>
    </IonToolbar>
    </div>
  </>

  return elem
}

export function   Top(props):JSX.Element {
  let elem = <>
           <div className="top-1" >
            <div className="top-1-1">
              <IonItem class="w-100 h-100" lines="none">
                <IonGrid class="i-grid">
                  <IonRow class="i-row-1">
                    <h1 className="m-center"> ООО Логика </h1>
                  </IonRow>
                  <IonRow  class="i-row-2">
                    <h1 className="f-13"> Торговое оборудование и к</h1>
                  </IonRow>
                </IonGrid>
              </IonItem>
            </div>
            <div className="top-1-2">
              <IonSearchbar class="mt-1"></IonSearchbar>
              <IonText class="f-13 ml-1"> Например: <span>Риббон</span></IonText>
            </div>
            <div className="top-1-3">
              <IonItem class="h-100" lines="none">
                <IonGrid class="h-100">
                  <IonRow>
                    <IonItem class="item-1">
                      <IonIcon class="icon-1" slot="start" icon={ callOutline } />
                      <IonText class="f-13">8 (800) 723-56-56 </IonText>
                    </IonItem>
                  </IonRow>
                  <IonRow>
                    <IonItem class="item-1">
                      <IonIcon class="icon-1" slot="start" icon={ mailOpenOutline } />
                      <IonText class="f-13">email: logika1c@mail.ru </IonText>
                    </IonItem>
                  </IonRow>
                  <IonRow>
                    <IonItem lines="none"> 
                      <IonIcon class="icon-1" slot="start" icon={ homeOutline } />
                      <IonText class="f-13"> г.Якутск, пр Ленина д.1, оф 707</IonText>
                    </IonItem>
                  </IonRow>
                </IonGrid>
                <IonButton slot="end" fill="clear" class="butt-1"
                  onClick = {()=>{
                     props.setPage(1) 
                  }}
                >
                  <IonIcon class="icon-2" slot="end" icon= { cartOutline } />
                  <IonText class="red-1"> { props.weight } </IonText>
                </IonButton>
              </IonItem>
            </div>
          </div> 
  </>

  return elem
}

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

const options :   Array<Option | Group> = [
    { value: 'one', label: 'One' },
    { value: 'two', label: 'Two', className: 'myOptionClassName' },
    {
     type: 'group', name: 'group1', items: [
       { value: 'three', label: 'Three', className: 'myOptionClassName' },
       { value: 'four', label: 'Four' }
     ]
    },
    {
     type: 'group', name: 'group2', items: [
       { value: 'five', label: 'Five' },
       { value: 'six', label: 'Six' }
     ]
    }
  ];

export function   Menu():JSX.Element {
    const [menu, setMenu] = useState<any>({ value: 'one', label: 'One' })
    let elem = <></>


    elem = <>
        <Dropdown 
            options={ options } 
            onChange= { ()=>{} } 
            value={ "Категории" } 
            placeholder="Select an option" />;
    </>

    return elem
}

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

  // function Pages(props):JSX.Element {
  //   let num = props.num;let pages = props.pages
    
  //   num = Math.floor((num - 1)/ 10) * 10 + 10
  //   if(num > pages){
  //     pages = pages - Math.floor(pages / 10) * 10
  //     pages = pages === 0 ? 10 : pages
  //   } else pages = 10

  //   num = num - 10;

  //   let ds = num
  //   let nums: any = []
  //   for(let i = 0;i < pages;i++){
  //     nums = [...nums, ds + i + 1]
  //   }
  //   num = props.num
  //   let item = <></>
  //   for(let i = 0;i < pages;i++){
  //     item = <>
  //       { item }
  //       <IonCol >
  //         <IonButton fill="clear"
  //           class = {
  //             num === nums[i] ? "selt" : ""  
  //           }
  //           onClick={()=>{
  //             props.setPage(nums[i])
  //           }}
  //         >
  //           { nums[i] }
  //         </IonButton>
  //       </IonCol>
  //     </>
  //   }
  //   let elem = <>
  //     <IonRow class="w-25">
  //       <IonCol ><IonButton fill="clear"
  //         onClick={()=>{
  //           if(nums[0] > 1) 
  //             props.setPage(nums[0] - 1)    
  //         }}
  //       >
  //         { '<<' }
  //       </IonButton></IonCol>
  //       { item }        
  //       <IonCol ><IonButton fill="clear"
  //         onClick={()=>{
  //           if(nums[9] < props.pages) 
  //             props.setPage(nums[9] + 1)    
  //         }}        
  //       >
  //         { '>>' }
  //       </IonButton></IonCol>
  //     </IonRow>    
  //   </>
  //   return elem;
  // }

  return <>
    <IonLoading isOpen={ loading }  message="Подождите..." />
    {/* <Pages 
        num     = { page } 
        pages   = { pages } 
        cat     = { props.info }
        setPage = { setPage }
    /> */}
    <div className="i-content">
      { elem }
    </div>
  </>
}

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
      <IonCard class="card-1" >
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
    <IonCard class="card-1" >
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
    <IonCard class="f-card">
      <IonCardHeader> Оформление заказа </IonCardHeader>
      <IonCardContent>
        <IonItem>
          <IonIcon slot="start" icon={ cardOutline } />
          <IonLabel position="stacked">Оплата</IonLabel>
          <IonSelect value={ order.МетодОплаты } okText="Okay" cancelText="Dismiss" onIonChange={e => {
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
        <div className = { dost ? "" : "d-none"}>
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
        Store.dispatch({type: "route", route: "/page/payment"})
      }
    } else {
      if(Order(order)){
        Store.dispatch({type: "order", order: order})
        Store.dispatch({type: "route", route: "/page/delivery"})
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

export function   Payment():JSX.Element {
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

export function   Delivery():JSX.Element {

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
                //Order();
                Store.dispatch({type: "route", route: "/page/main"})
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
