import { combineReducers  } from 'redux'
import axios from 'axios'
import { Reducer } from 'react';

interface t_list {
    num: number, type: string, func: Function,
}

var reducers: Array<Reducer<any, any>>;reducers = []

export const i_state = {

    auth:                   false,
    route:                  "",
    login:                  {
        ГУИД:                   0,
        Телефон:                "",
        ФИО:                    "",
        элПочта:                "",
        Пароль:                 "",
        Роль:                   0,
        Картинка:               "",
    },
    categories:             [],
    goods:                  [],
    basket:                 [],
    order:                  [],
    market:                 {
        Наименование:       "ООО Логика",
        Адрес:              "г.Якутск, пр Ленина д.1, оф 707",
        Доставка:           150,
    }
}


for(const [key, value] of Object.entries(i_state)){
    reducers.push(
        function (state = i_state[key], action) {
            switch(action.type){
                case key: {
                    if(typeof(value) === "object"){
                        if(Array.isArray(value)) {
                            return action[key]
                        } else {
                            let data: object; data = {};
                            for(const key1 of Object.keys(value)){ 
                                data[key1] = action[key1] === undefined ? state[key1] : action[key1]
                            }   
                            return data
                        }

                    } else return action[key]
                }
                default: return state;
            }       
        }

    )
}

export async function   getData(method : string, params){

    let res = await axios.post(
            URL + method, params,
            {
                // auth: {
                //     username: unescape(encodeURIComponent("МФО_Админ")),
                //     password: unescape(encodeURIComponent("1234"))
                // },
            }
        ).then(response => response.data)
        .then((data) => {
            if(data.Код === 200) console.log(data) 
            return data
        }).catch(error => {
          console.log(error)
          return {Код: 200}
        })
    return res

}

function                create_Store(reducer, initialState) {
    var currentReducer = reducer;
    var currentState = initialState;
    var listeners: Array<t_list>; listeners = []
    return {
        getState() {
            return currentState;
        },
        dispatch(action) {
            currentState = currentReducer(currentState, action);
            listeners.forEach((elem)=>{
                if(elem.type === action.type){
                    elem.func();
                }
            })
            return action;
        },
        subscribe(listen: t_list) {
            var ind = listeners.findIndex(function(b) { 
                return b.num === listen.num; 
            });
            if(ind >= 0){
                listeners[ind] = listen;
            }else{
                listeners = [...listeners, listen]
            }
 
        }
    };
}

const                   rootReducer = combineReducers({

    auth:           reducers[0],
    route:          reducers[1],
    login:          reducers[2],
    categories:     reducers[3],
    goods:          reducers[4], //gdReducer,
    basket:         reducers[5],  
    order:          reducers[6],  
    market:         reducers[7],

})

function gdReducer(state = i_state.goods, action){
    switch(action.type) {
        case "goods": return [...state, ...action.goods]
        default: return state
    }
}

export const Store   =  create_Store(rootReducer, i_state)


//export const URL = "https://marketac.ru/ut/hs/API/V1/"
export const URL = "http://91.185.237.187:27080/trade_zve/hs/API/V1/"

export async function getDatas(){
}

async function exec(){
    let res = await getData("Категории", {})
    Store.dispatch({type: "categories", categories: res})
    console.log(res)

    res = await getData("Продукты", {})
    Store.dispatch({type: "goods", goods: res})
    console.log(res)

}



exec();

export const categories = [
    {id: 1, name: "Мясо"}
   ,{id: 2, name: "Рыба"}
   ,{id: 3, name: "Бумага"}
   ,{id: 4, name: "Пиво"}
   ,{id: 5, name: "Водка"}
   ,{id: 6, name: "Колбаса"}
   ,{id: 7, name: "Огурки"}
]
