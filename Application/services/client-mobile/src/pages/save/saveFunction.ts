import { Plugins } from '@capacitor/core';
const { Storage } = Plugins; 




export async function resetActionList() {
    await Storage.remove({ key: 'action_list' });
  }

  export async function getActionList() {
    const items = await Storage.get({key: 'action_list'})

    let obj: any[];
    if(items.value != null){
        obj = JSON.parse(items.value);
    } else{
        obj = []
    }

    return obj
  }

  
  // JSON "set" example
  export async function ConcatListToActionList(list: any[]) {
    const items = await Storage.get({key: 'action_list'})

    let obj: any[];
    if(items.value != null){
        obj = JSON.parse(items.value);
        obj.concat(list)
    } else{
      obj = list
    }

    await Storage.set(
      {
      key: 'action_list',
      value: JSON.stringify(obj)
    });
  }

  // JSON "set" example
  export async function addObjectToActionList(new_url: String, new_params: any) {
    const items = await Storage.get({key: 'action_list'})

    let obj: any[];
    if(items.value != null){
        obj = JSON.parse(items.value);
       obj.push({url: new_url, params: new_params})
    } else{
      obj = [{url: new_url, params: new_params}]
    }

    await Storage.set(
      {
      key: 'action_list',
      value: JSON.stringify(obj)
    });
  }


   export async function setDefaultSector(default_sector: Number) {
    const x = 
    
    await Storage.set(
      {
      key: 'default_sector',
      value: JSON.stringify(default_sector) // TODO USERID
    });
  }

  export async function getDefaultSector() {
    const items = await Storage.get({key: 'default_sector'})

    let obj: number = -1;
    if(items.value != null){
        obj = JSON.parse(items.value);
        return obj;
    } 

    return obj
  }


  export async function setUserId(user_id: Number) {
    const x = 
    
    await Storage.set(
      {
      key: 'user_id',
      value: JSON.stringify(user_id) // TODO USERID
    });
  }

  export async function getUserId() {
    const items = await Storage.get({key: 'user_id'})

    let obj: number = -1;
    if(items.value != null){
        obj = JSON.parse(items.value);
        return obj;
    } 

    return obj
  }

  export async function removeListLocalStorage(id: string) {
    return await Storage.remove({ key: id });
  }

  export async function setListLocalStorage(id: string, list: any) {
    console.log(list)

    const x = 
    await Storage.set(
      {
      key: id,
      value: JSON.stringify(list) // TODO USERID
    });

    return x
  }

  export async function getListLocalStorage(id: string) {
    const items = await Storage.get({key: id})

    let obj: any[] = [];
    if(items.value != null){
        obj = JSON.parse(items.value);
        return obj;
    } 

    return obj
  }