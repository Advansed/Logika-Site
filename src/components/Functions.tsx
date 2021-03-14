import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonChip, IonCol, IonGrid, IonIcon, IonImg, IonItem, IonList, IonLoading, IonRow, IonSearchbar, IonText, IonToolbar } from '@ionic/react';
import { callOutline, cartOutline, enterOutline, homeOutline, mailOpenOutline, mic, musicalNote } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import Dropdown, { Option, Group} from 'react-dropdown';
import 'react-dropdown/style.css';
import { getData, Store } from '../pages/Store';

export function Header():JSX.Element {
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

export function   Top():JSX.Element {
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
                <IonIcon class="icon-2" slot="end" icon= { cartOutline } />
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

const options : Array<Option | Group> = [
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
      if(elem.CategoryId === props.info)
        jarr = [...jarr, elem]  
    });
    setInfo(jarr)
  }})

  async function getGoods(cat, count){

    let param = {
      CategoryId:   cat,
      Номер:        count,
    }
    setLoading(true)
    let res = await getData("R_Product", param)
    setInfo(res.Данные);
    setPages(res.Страниц);
    setLoading(false);
  }

  useEffect(()=>{
    if(props.info !== cats) {
        setPage(1);setCats(props.info);
        getGoods(props.info, 1)
    } else getGoods(cats, page)

  },[props, page])

  let elem = <></>

  function  addBasket(amount: number){
    // let basket = Store.getState().basket;
    // if(basket === undefined) basket = [];
    // var commentIndex = basket.findIndex(function(b) { 
    //     return b.Код === info.Код; 
    // });
    // if(commentIndex >= 0){
    //   let b_amount = basket[commentIndex].Количество
    //   let sum = b_amount + (amount as number);
    //   let total = basket[commentIndex].Цена * sum;

    //   let upd = update(basket[commentIndex], {Количество: {$set: sum}, Всего: {$set: total}}); 
    //   let bask = basket.map(todo => {
    //     if (todo.Код === info.Код) {
    //       return { ...todo, Количество: upd.Количество, Всего: upd.Всего}
    //     } else {
    //       return todo
    //     }
    //   })
    //   Store.dispatch({type: "basket", basket: bask})

    // } else {
    //   basket = [...basket, {
    //     Код:            info.Код,
    //     Наименование:   info.Наименование,
    //     Цена:           info.Цена,
    //     Количество:     amount,
    //     Всего:          amount * info.Цена,
    //     Картинка:       info.Картинка
    // }]
    //   Store.dispatch({type: "basket", basket: basket})
    // }
  }

  for(let i = 0;i < info.length;i++){
    elem = <>
      { elem }
      <IonCard class="g-card">
        <IonCardHeader        
          onClick = {()=>{
            Store.dispatch({type: "route", route: "/goods/" + info[i].Code})  
          }}
        >
          <IonImg src={ "data:image/png;base64," + info[i].ImagePath } class="img-1"></IonImg>
        </IonCardHeader>
        <IonCardContent>
         <IonCardSubtitle
              onClick = {()=>{
                Store.dispatch({type: "route", route: "/goods/" + info[i].Code})  
              }}
         >
          <IonItem lines="none" class="bottom-1 font-12" >
              <b>{ info[i].Price } руб/шт</b>
           </IonItem>
          </IonCardSubtitle>
          <IonItem>
              <IonButton
                expand="block"
                shape="round"
                onClick={()=>{
                  addBasket(1)
                }}
              > В Корзину </IonButton>
          </IonItem>
          <IonItem class="item-2" lines="none"
              onClick = {()=>{
                Store.dispatch({type: "route", route: "/goods/" + info[i].Код})  
              }}
           >
              <IonText class="font-10">
                { info[i].Name }
              </IonText>
           </IonItem>
        </IonCardContent>
      </IonCard>
    </>
  }

  function Pages(props):JSX.Element {
    let num = props.num;let pages = props.pages
    
    num = Math.floor((num - 1)/ 10) * 10 + 10
    if(num > pages){
      pages = pages - Math.floor(pages / 10) * 10
      pages = pages === 0 ? 10 : pages
    } else pages = 10

    num = num - 10;

    let ds = num
    let nums: any = []
    for(let i = 0;i < pages;i++){
      nums = [...nums, ds + i + 1]
    }
    num = props.num
    let item = <></>
    for(let i = 0;i < pages;i++){
      item = <>
        { item }
        <IonCol >
          <IonButton fill="clear"
            class = {
              num === nums[i] ? "selt" : ""  
            }
            onClick={()=>{
              props.setPage(nums[i])
            }}
          >
            { nums[i] }
          </IonButton>
        </IonCol>
      </>
    }
    let elem = <>
      <IonRow class="w-25">
        <IonCol ><IonButton fill="clear"
          onClick={()=>{
            if(nums[0] > 1) 
              props.setPage(nums[0] - 1)    
          }}
        >
          { '<<' }
        </IonButton></IonCol>
        { item }        
        <IonCol ><IonButton fill="clear"
          onClick={()=>{
            if(nums[9] < props.pages) 
              props.setPage(nums[9] + 1)    
          }}        
        >
          { '>>' }
        </IonButton></IonCol>
      </IonRow>    
    </>
    return elem;
  }
  return <>
    <IonLoading isOpen={ loading }  message="Подождите..." />
    <Pages 
        num     = { page } 
        pages   = { pages } 
        cat     = { props.info }
        setPage = { setPage }
    />
    <div className="i-content">
      { elem }
    </div>
  </>
}