import { IonButton, IonIcon, IonToolbar } from '@ionic/react';
import { enterOutline } from 'ionicons/icons';
import './Header.css'

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


