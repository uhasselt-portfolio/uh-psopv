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

    console.log(obj)

    return obj
  }

  // JSON "set" example
  export async function addObjectToActionList(new_url: String) {
    const items = await Storage.get({key: 'action_list'})

    let obj: any[];
    if(items.value != null){
        obj = JSON.parse(items.value);
       obj.push({url: new_url})
    } else{
      obj = [{url: new_url}]
    }

    await Storage.set(
      {
      key: 'action_list',
      value: JSON.stringify(obj)
    });
  }
