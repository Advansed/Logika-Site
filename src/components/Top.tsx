import { IonButton, IonCol, IonGrid, IonIcon, IonItem, IonRow, IonSearchbar, IonText } from "@ionic/react"
import { callOutline, cartOutline, homeOutline, mailOpenOutline } from "ionicons/icons"
import './Top.css'

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
                      <IonItem class="h-2">
                        <IonIcon class="icon-1" slot="start" icon={ callOutline } />
                        <IonText class="f-13">8 (800) 723-56-56 </IonText>
                      </IonItem>
                    </IonRow>
                    <IonRow>
                      <IonItem class="h-2">
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
  
  
export function   Topv(props):JSX.Element {
  let elem = <>
    <IonRow>
      <IonCol>
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
      </IonCol>
      <IonCol>
        <IonSearchbar class="mt-1"></IonSearchbar>
        <IonText class="f-13 ml-1"> Например: <span>Риббон</span></IonText>
      </IonCol>
      <IonCol>
        <IonItem class="h-100" lines="none">
          <IonGrid class="h-100">
            <IonRow>
              <IonItem class="h-2">
                <IonIcon class="icon-1" slot="start" icon={ callOutline } />
                <IonText class="f-13">8 (800) 723-56-56 </IonText>
              </IonItem>
            </IonRow>
            <IonRow>
              <IonItem class="h-2">
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
      </IonCol>
    </IonRow>
  </>
  return elem
}