import Datastore from "https://deno.land/x/dndb@0.3.3/mod.ts";
import * as dbType from "https://deno.land/x/dndb@0.3.3/src/types.ts";
const db = new Datastore({ filename: "./database.db", autoload: true });

let testFunc = () => {
    console.log("testFunc ");
};

const getOneFlightData = async (id: String) => {
    const data = await db.findOne({ type: "chuyenbay", flightCode: id });
    // console.log({data});
    return data;
};

const searchFlightData = async (searchString: String) => {
    const data = await db.find({
        $or: [
            { type: "chuyenbay", flightCode: searchString },
            { type: "chuyenbay", toAirportCode: searchString },
            { type: "chuyenbay", fromAirportCode: searchString },
            { type: "chuyenbay", timeStart: searchString },
            { type: "chuyenbay", thoiGianBay: searchString },
            { type: "chuyenbay", soGheTrong: searchString },
        ],
    });
    return JSON.parse(JSON.stringify(data));
};

const getAllTicket = async () => {
    let data = await db.find({ type: "ve" });
    data = JSON.parse(JSON.stringify(data));
    return data;
};

const getOneTicket = async (ticketCode: string) => {
    const data = await db.findOne({ type: "ve", ticketCode });
    return data;
};

export {
    testFunc,
    db,
    dbType,
    getOneFlightData,
    searchFlightData,
    getAllTicket,
    getOneTicket,
};
