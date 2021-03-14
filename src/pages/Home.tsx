import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonPage, IonRow, IonSearchbar, IonText, IonToolbar } from '@ionic/react';
import { callOutline, cartOutline, enterOutline, homeOutline, mailOpenOutline } from 'ionicons/icons'
import { useState } from 'react';
import { Categories, Goods, Header, Top, Topper } from '../components/Functions';
import './Home.css';

const Home: React.FC = () => {
  const [category, setCategory] = useState("")

  function onCat(props){
    if(props !== undefined) setCategory(props.Код)
    else setCategory("")
  }
  return (
    <IonPage>
      <IonHeader>
        <Header />
      </IonHeader>
      <IonContent class="i-content">
        <div className="i-body">
          <Top />
          <div className="body-1">
            <IonGrid>
              <IonRow>
                <IonCol size="3">
                  <Categories onClick = { onCat }/>
                </IonCol>
                <IonCol size="9">
                  <Topper />
                  <IonRow>
                    <Goods info = { category } />
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
