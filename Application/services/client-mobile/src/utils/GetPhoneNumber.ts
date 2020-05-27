import { Sim } from '@ionic-native/sim/ngx';

export default async () => {

    const sim : Sim = new Sim();

    if(process.env.NODE_ENV == 'development') {
        return process.env.PHONE_NUMBER || "+15555215556";
    } else {
        const hasPermission : boolean = await sim.hasReadPermission();
        if(!hasPermission) {
            await sim.requestReadPermission();
        }

        const simInfo = await sim.getSimInfo();

        // console.log("SIM INFO", simInfo)
        return simInfo.phoneNumber;
    }
}