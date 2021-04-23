import { IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow } from '@ionic/react';
//import { callOutline, cartOutline, enterOutline, homeOutline, mailOpenOutline } from 'ionicons/icons'
import { useState } from 'react';
import { Basket } from '../components/Basket';
import { Categories } from '../components/Categories';
import { GCard } from '../components/GCard';
import { Goods } from '../components/Goods';
import { Header } from '../components/Header';
import { Order } from '../components/Order';
import { Top } from '../components/Top';
import { Topper } from '../components/Topper';
import './Home.css';
import { Store } from './Store';

const Home: React.FC = () => {

      const [category,  setCategory]  = useState( "" )
      const [weight,    setWeight]    = useState( 0  )
      const [page,      setPage]      = useState( 0  )
      const [good,      setGood]      = useState()

  Store.subscribe({num: 101, type: "basket", func: ()=>{
    let basket = Store.getState().basket;
    let sum = 0
    basket.forEach(el => {
      sum = sum + el.Количество
    });
    setWeight(sum);
  }})

  function onCat(props){
    setPage(0)
    if(props !== undefined) setCategory(props.Код)
    else setCategory("")
  }
  return (
    <IonPage>
      <IonHeader>
        <Header/>
      </IonHeader>
      <IonContent class="i-content">
        <div className="i-body">
          <Top weight = { weight } setPage =  { setPage } />
          <div className="body-1">
              <IonGrid>
                <IonRow>
                  <IonCol size="12">
                    <Topper />
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol size="3">
                    <Categories onClick = { onCat }/>
                  </IonCol>
                  <IonCol size="9">
                    <IonRow>
                      {
                        page === 0 

                        ? <Goods info = { category } setGood = { setGood } setPage = { setPage }/>
                        : page === 1

                        ? <Basket setPage = { setPage } />
                        : page === 2

                        ? <GCard setPage = { setPage } info = { good } />
                        : page === 3

                        ? <Order setPage = { setPage } />
                        : <></>
                      }
                    </IonRow>
                  </IonCol>
                </IonRow>
              </IonGrid>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
