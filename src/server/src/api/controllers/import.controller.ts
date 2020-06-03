import {Request, Response} from "express";
import UserModel from "../models/user.model";

import AssociationModel from '../models/association.model';
import PermissionTypeModel from '../models/permission_type.model';
import GeneralPostModel from '../models/general_post.model';
import ItemTypeModel from '../models/item_type.model';
import ItemModel from '../models/item.model';
import MessageModel from '../models/message.model';
import PlanningModel from '../models/planning.model';
import PostModel from '../models/post.model';
import ProblemModel from '../models/problem.model';
import SectorModel from '../models/sector.model';
import ShiftModel from '../models/shift.model';
import {DateTime} from "luxon";

const dateFormat: string = "dd/MM/yyyy HH:mm:ss";

/**
 * Transform a readable date into a UTC timezoned date
 *
 * @param localDate Readable date string
 */
const createDate = (localDate: string): string => {
    return DateTime.fromFormat(localDate, dateFormat, {zone: 'Europe/Brussels'}).toUTC().toISO()
}

/**
 * Association controller
 *
 * @author Wouter Grootjans
 *
 */

const eagerLoadingOptions = {
    include: [{model: UserModel, all: true}]
}

export const deleteAll = async (req: Request, res: Response) => {
    await ProblemModel.destroy({
        truncate: true
    });
    await MessageModel.destroy({
        truncate: true
    });
    await ItemModel.destroy({
        truncate: true
    });
    await ItemTypeModel.truncate({
        cascade: true
    });
    await PlanningModel.truncate({
        cascade: true
    });
    await ShiftModel.truncate({
        cascade: true
    });
    await PostModel.truncate({
        cascade: true
    });
    await SectorModel.destroy({
        truncate: true
    });
    await GeneralPostModel.truncate({
        cascade: true
    });
    // await UserModel.truncate({
    //     cascade: true
    // });
    await UserModel.destroy({
        where : {
            permission_type_id : 1
        }
    })
    await UserModel.destroy({
        where : {
            permission_type_id : 2
        }
    })

    
    //TODO voor demo dit niet doen, maakt niet uit dat ze erin blijven staan, zijn nergens te zien
    let association = await AssociationModel.findAll();
    for (let i = 0; i < association.length; ++i) {
        if (association[i].id !== 1)
            await AssociationModel.destroy({
                where : {id : association[i].id}
            })
    }
    // await AssociationModel.truncate({
    //     cascade: true
    // });
    res.status(201).send();
    return true;
}

export const importUserAndAssociation = async (req: Request, res: Response) => {
    let association = await insertAssoxiation(req.body.association, res);

    if (association) {
        let users = await insertUser(req.body.users, res);

        if (users) {
            const users = await UserModel.findAll();
            res.status(201).send();
        } else {
            console.log('false users');
        }
    } else {
        console.log('false association');
        res.send();
    }
}
export const importGeneralPostAndPost = async (req: Request, res: Response) => {
    //console.log('post',req.body);
    console.log('in generalPostandpost');
    let generalPostResult: boolean = await insertGeneralPost(req.body.generalpost, res);
    if (generalPostResult) {
        console.log('general post succes');
        let g = await GeneralPostModel.findAll();
        console.log(g.length);

        let sectorResult: boolean = await insertSector(req.body.sector, res);

        if (sectorResult) {
            console.log('sector succes');

            let postResult: boolean = await insertPost(req.body.post, res);

            if (postResult) {
                console.log('post succes');
                res.status(200).send();
            } else {
                console.log('post fail');
            }
        } else {
            console.log('sector fail');
        }

    } else {
        console.log('genera post fail');
    }
}
export const importShifts = async (req: Request, res: Response) => {
    console.log("in import shifts");
    let shiftsresult = await insertShift(req.body.shifts, res);
    if (shiftsresult)
        res.status(200).send();
}
export const importPlanning = async (req: Request, res: Response) => {
    console.log('in inport planning');
    let PlanningResult = await insertPlanning(req.body.planning, res);
    if (PlanningResult)
        res.status(200).send();
}
export const importItems = async (req: Request, res: Response) => {
    console.log('int import items', req.body);
    let itemTypeResult = await insertItemTypes(req.body.itemType, res);
    if (itemTypeResult) {
        let itemReult = await insertItem(req.body.items, res);
        if (itemReult)
            res.status(200).send();
    }
}

const insertAssoxiation = async (associations: any[], res: Response) => {
    try {
        for (let i = 0; i < associations.length; ++i) {
            const associationExists = await AssociationModel.findOne({where: {name: associations[i].name}});

            if (associationExists) {
                console.log('association exists');
                res.status(500).send({
                    status: 'fail',
                    data: null,
                    message: 'Association allready exists'
                });
                return false;
            } else {
                const association = await AssociationModel.create({
                    name: associations[i].name
                });
            }
        }
    } catch (error) {
        console.log("error");
        res.status(500).send({
            status: 'error',
            data: null,
            message: 'Internal Server Error'
        });
        return false;
    }
    console.log('done');
    return true;
}

/**
 * inserts all the user in the database
 * the permission_type must be initialized
 * the association must be initialized
 * @param user the users to insert
 * @param res
 */
const insertUser = async (user: any[], res: Response) => {
    try {
        console.log('inserting users real');
        let associations = await AssociationModel.findAll();
        let associationsMap = new Map();
        for (let i = 0; i < associations.length; ++i)
            associationsMap.set(associations[i].name, associations[i].id);


        let ids: number[] = await getpermissionIds();
        let volunteerId: number = ids[0];
        let responsibleId: number = ids[1];
        let adminId: number = ids[2];

        if (volunteerId === -1 || responsibleId === -1 || adminId === -1) {
            return res.status(404).send({
                status: 'fail',
                data: null,
                message: 'internal server error'
            });
        } else {
            for (let i = 0; i < user.length; ++i) {
                const userExists = await UserModel.findOne({where: {phone_number: user[i].phone_number.toString()}});

                let permission_id: number = -1;
                if (user[i].permission === 'vrijwilliger') {
                    permission_id = volunteerId
                } else if (user[i].permission === 'verantwoordelijke') {
                    permission_id = responsibleId;
                } else {
                    return res.status(404).send({
                        status: 'fail',
                        data: null,
                        message: 'permission doesn\'t exist'
                    })
                }

                const association_id = associationsMap.get(user[i].association);
                if (association_id === undefined) {
                    return res.status(404).send({
                        status: 'fail',
                        data: null,
                        message: 'Association doesn\'t exist'
                    })
                }

                if (!userExists) {
                    const newUser = await UserModel.create({
                        first_name: user[i].first_name,
                        last_name: user[i].last_name,
                        password: user[i].password,
                        phone_number: user[i].phone_number,
                        email: user[i].email,
                        permission_type_id: permission_id,
                        association_id: association_id
                    });
                }
            }
        }

    } catch (error) {
        console.log("error", error);
        res.status(500).send({
            status: 'error',
            data: null,
            message: 'Internal Server Error'
        });
        return false;
    }
    return true;
}
/**
 * returns the permissions ids of the three possible types : volunteer, responsible and admin
 */
const getpermissionIds = async (): Promise<number[]> => {
    let permission_types = await PermissionTypeModel.findAll();

    let volunteerId: number = -1;
    let responsibleId: number = -1;
    let adminId: number = -1;

    for (let i = 0; i < permission_types.length; ++i) {
        if (permission_types[i].name === 'Vrijwilliger')
            volunteerId = permission_types[i].id;
        else if (permission_types[i].name === 'Sectorverantwoordelijke')
            responsibleId = permission_types[i].id;
        else
            adminId = permission_types[i].id;
    }
    return [volunteerId, responsibleId, adminId];
}

const insertGeneralPost = async (posts: any[], res: Response) => {
    try {
        for (let i = 0; i < posts.length; ++i) {
            const PostExists = await GeneralPostModel.findOne({
                where: {
                    name: posts[i].name,
                    description: posts[i].discription
                }
            });

            if (PostExists) {
                res.status(404).send({
                    status: 'fail',
                    data: null,
                    message: 'Gpost allready exists'
                });
                return false;
            } else {
                const GPost = await GeneralPostModel.create({
                    name: posts[i].name,
                    minimum_age: posts[i].minimumAge,
                    description: posts[i].discription
                });
            }
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).send({
            status: 'error',
            data: null,
            message: 'Internal Server Error'
        });
        return false;
    }
    console.log('done');
    return true;
}

const insertSector = async (sectors: any[], res: Response) => {
    console.log('inserting sector');

    let Permission_ids = await getpermissionIds();

    let Users = await UserModel.findAll({where: {permission_type_id: Permission_ids[1]}});

    if (Users.length === 0) {
        console.log('No responsible');
        res.status(404).send({
            status: 'fail',
            data: null,
            message: 'no responsible exists'
        });
        return false;
    }
    try {
        for (let i = 0; i < sectors.length; ++i) {
            const sectorsExists = await SectorModel.findOne({where: {sector_type: sectors[i].type}});

            if (sectorsExists) {
                res.status(404).send({
                    status: 'fail',
                    data: null,
                    message: 'sector allready exists'
                });
                return false;
            } else {

                let index = i;
                if (i >= Users.length)
                    index = 0;

                console.log('users', Users.length);
                console.log(index);

                const Sector = await SectorModel.create({
                    user_id: Users[index].id,
                    sector_type: sectors[i].type
                });
            }
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).send({
            status: 'error',
            data: null,
            message: 'Internal Server Error'
        });
        return false;
    }
    console.log('done');
    return true;
}

/**
 * inserts the posts in the database
 * the generalpost must be initialized
 * the sectors must be initialized
 * @param posts the list of posts to insert
 * @param res
 */
const insertPost = async (posts: any[], res: Response) => {
    try {
        let general_posts = await GeneralPostModel.findAll();
        let general_postmap: Map<string, number> = new Map();
        for (let i = 0; i < general_posts.length; ++i) {
            general_postmap.set(general_posts[i].description, general_posts[i].id);
        }

        let sectos = await SectorModel.findAll();
        let sectorMap: Map<string, number> = new Map();
        for (let i = 0; i < sectos.length; ++i) {
            let key: number = sectos[i].sector_type;
            sectorMap.set(key.toString(), sectos[i].id);
        }

        for (let i = 0; i < posts.length; ++i) {
            const postExists = await PostModel.findOne({where: {title: posts[i].title.toString()}});


            if (postExists) {
                console.log('post exists');
                res.status(404).send({
                    status: 'fail',
                    data: null,
                    message: 'post allready exists'
                });
                return false;
            } else {
                let general_posts_id = general_postmap.get(posts[i].generalpost);
                if (general_posts_id === undefined) {
                    console.log('general post undifined', posts[i].generalpost);
                    res.status(404).send({
                        status: 'fail',
                        data: null,
                        message: 'general post doesn\'t exist'
                    });
                    return false;
                }

                let sectorSearch: number = posts[i].sector;
                let sector_id = sectorMap.get(sectorSearch.toString());
                if (sector_id === undefined) {
                    console.log('sector undifined');
                    res.status(404).send({
                        status: 'fail',
                        data: null,
                        message: 'sector doesn\'t exist'
                    });
                    return false;
                }

                const post = await PostModel.create({
                    title: posts[i].title,
                    address: posts[i].address,
                    latitude: posts[i].latitude,    //TODO hoe latitude en longitude en radius
                    longitude: posts[i].longitude,
                    radius: posts[i].radius,
                    sector_id: sector_id,
                    general_post_id: general_posts_id
                });
            }
        }

    } catch (error) {
        console.log("error", error);
        res.status(500).send({
            status: 'error',
            data: null,
            message: 'Internal Server Error'
        });
        return false;
    }
    console.log('done');
    return true;
}

const insertShift = async (shifts: any[], res: Response) => {
    try {
        for (let i = 0; i < shifts.length; ++i) {
            const shiftExists = await ShiftModel.findOne({where: {name: shifts[i].name}});


            if (shiftExists) {
                console.log('Shift exists');
                res.status(404).send({
                    status: 'fail',
                    data: null,
                    message: 'Shift allready exists'
                });
                return false;
            } else {
                // let beginArray: number[] = dateparser(shifts[i].begin);
                // let endArray: number[] = dateparser(shifts[i].end);
                // let beginDate: Date = new Date(beginArray[0], beginArray[1] -1, beginArray[2], beginArray[3], beginArray[4]);
                // let endDate: Date = new Date(endArray[0], endArray[1] -1, endArray[2], endArray[3], endArray[4]);
                console.log("shift",shifts[i]);
                let beginDate = createDate(shifts[i].begin);
                let endDate = createDate(shifts[i].end);

                console.log(beginDate);
                const Shift = await ShiftModel.create({
                    name: shifts[i].name,
                    begin: beginDate,
                    end: endDate
                });
            }
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).send({
            status: 'error',
            data: null,
            message: 'Internal Server Error'
        });
        return false;
    }
    console.log('done');
    return true;
}

/**
 * inserts the planning in the database
 * posts, users and shifts need to be initialized
 * @param planning the planning data from the client
 * @param res
 */
const insertPlanning = async (planning: any[], res: Response) => {
    try {
        let shifts = await ShiftModel.findAll();
        let shiftMap: Map<string, number> = new Map();
        for (let i = 0; i < shifts.length; ++i)
            shiftMap.set(shifts[i].name, shifts[i].id);

        let users = await UserModel.findAll();
        let usersMap: Map<string, number> = new Map();
        for (let i = 0; i < users.length; ++i)
            usersMap.set(users[i].first_name + " " + users[i].last_name + " " + users[i].phone_number, users[i].id);

        let posts = await PostModel.findAll();
        let postsMap: Map<string, number> = new Map();
        for (let i = 0; i < posts.length; ++i)
            postsMap.set(posts[i].title, posts[i].id);


        for (let i = 0; i < planning.length; ++i) {

            let userId = usersMap.get(planning[i].user);
            let postsId = postsMap.get(planning[i].post.toString());
            let shiftId = shiftMap.get(planning[i].shift);

            if (userId === undefined || postsId === undefined || shiftId === undefined) {
                console.log('wrong data', planning[i]);
                console.log("userid",userId);
                console.log("post",postsId);
                console.log("shift", shiftId);
                res.status(404).send({
                    status: 'fail',
                    data: null,
                    message: 'wrong data'
                });
                return false;
            } else {
                const PlanningExists = await PlanningModel.findOne({
                    where: {
                        user_id: userId,
                        shift_id: shiftId,
                        post_id: postsId
                    }
                });

                if (PlanningExists) {
                    console.log('planning exists', planning[i]);
                    res.status(404).send({
                        status: 'fail',
                        data: null,
                        message: 'planning allready exists'
                    });
                    return false;
                } else {
                    const planning = await PlanningModel.create({
                        user_id: userId, shift_id: shiftId, post_id: postsId
                    });
                }
            }
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).send({
            status: 'error',
            data: null,
            message: 'Internal Server Error'
        });
        return false;
    }
    return true;
}

/**
 * convertes a date string from the input excel to a array : [ year, month, day, hour, time]
 * @param date the date string to parse
 */
const dateparser = (date: string): number[] => {
    let parsed: number[] = [2020, 1, 1, 12, 0];
    let split: string[] = date.split(" ");
    let dateSplit: string[] = split[0].split("/");
    parsed[0] = parseInt(dateSplit[2]);
    parsed[1] = parseInt(dateSplit[1]);
    parsed[2] = parseInt(dateSplit[0]);
    let time: string[] = split[1].split(":");
    parsed[4] = parseInt(time[0]);
    parsed[5] = parseInt(time[1]);
    return parsed;
}

const insertItemTypes = async (itemTypes: any[], res: Response) => {
    try {
        for (let i = 0; i < itemTypes.length; ++i) {
            const TypeExists = await ItemTypeModel.findOne({where: {name: itemTypes[i]}});

            // const userExists = await UserModel.findOne({where: {phone_number: req.body.phone_number}});
            // const associationExists = await AssociationModel.findByPk(req.body.association_id);

            if (TypeExists) {
                console.log('type exists');
                res.status(404).send({
                    status: 'fail',
                    data: null,
                    message: 'item type allready exists'
                });
                return false;
            } else {
                const type = await ItemTypeModel.create({
                    name: itemTypes[i]
                });
            }
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).send({
            status: 'error',
            data: null,
            message: 'Internal Server Error'
        });
        return false;
    }
    return true;
}

const insertItem = async (item: any[], res: Response) => {
    try {
        console.log("items");
        let types = await ItemTypeModel.findAll();
        let typeMap: Map<string, number> = new Map();
        for (let i = 0; i < types.length; ++i)
            typeMap.set(types[i].name, types[i].id);

        let planning = await PlanningModel.findAll(eagerLoadingOptions);
        let planningMap: Map<string, number> = new Map();
        for (let i = 0; i < planning.length; ++i)
            planningMap.set(planning[i].user.first_name + " " + planning[i].user.last_name + " " + planning[i].user.phone_number + " " +
                planning[i].post.title + " " + planning[i].shift.name
                , planning[i].id);

        for (let i = 0; i < item.length; ++i) {

            let planningID = planningMap.get(item[i].naam + " " + item[i].functie + " " + item[i].planning);
            let typeId = typeMap.get(item[i].name);

            if (planningID === undefined)
                console.log('1', planningMap)
            if (typeId === undefined)
                console.log("2");

            if (planningID === undefined || typeId === undefined) {
                console.log('wrong data', item[i],planningID,typeId);
                res.status(404).send({
                    status: 'fail',
                    data: null,
                    message: 'wrong data'
                });
                return false;
            } else {
                const ItemExists = await ItemModel.findOne({where: {planning_id: planningID, item_type_id: typeId}});

                if (ItemExists) {
                    console.log('item exists');
                    res.status(404).send({
                        status: 'fail',
                        data: null,
                        message: 'item type allready exists'
                    });
                    return false;
                } else {
                    const item = await ItemModel.create({
                        planning_id: planningID, item_type_id: typeId
                    });
                }
            }
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).send({
            status: 'error',
            data: null,
            message: 'Internal Server Error'
        });
        return false;
    }
    return true;
}