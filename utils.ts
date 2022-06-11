// deno-lint-ignore-file
let airport: any = null;
import dayjs from "https://deno.land/x/deno_dayjs@v0.2.1/mod.ts";
const initUtils = () => {
    const data = Deno.readTextFileSync("./data/airport.json");
    console.log("load airport data ok");
    airport = JSON.parse(data);
};

const titleMenu = () => {
    console.clear();
    console.log("Bán vé chuyến bay");
    console.log("Nhóm 2: Phúc, H.anh, Kiên, Thắng, Đạt");
    console.log("");

    console.log("Menu:");
    console.log("1. Quản lý vé");
    console.log("2. Quản lý chuyến bay");
    console.log("3. Báo cáo hệ thống\n");
    console.log("0, Thoát chương trình");

    const input = prompt("Mời chọn tác vụ: ");
    if (input !== "0") {
        return input;
    }
    if (input === "0") {
        Deno.exit(0);
    }
    return "";
};

const titleQuanLyVe = () => {
    console.clear();
    console.log("Bán vé chuyến bay");
    console.log("Module: Quản lý vé");
    console.log("");

    console.log("Menu:");
    console.log("1. Bán vé");
    console.log("2. Sửa vé đã bán");
    console.log("3. Huỷ vé đã bán");
    console.log("4. Danh sách vé đã bán");
    console.log("0. Về menu chính\n");

    const input = prompt("Mời chọn tác vụ: ");
    // console.debug("Menu input: ", input);
    return input;
};

const titleQuanLyChuyenBay = () => {
    console.clear();
    console.log("Bán vé chuyến bay");
    console.log("Module: Quản lý chuyến bay");
    console.log("");

    console.log("Menu:");
    console.log("1. Danh sách chuyến bay");
    console.log("2. Thêm chuyến bay");
    console.log("3. Sửa chuyến bay");
    console.log("4. Xoá chuyến bay");
    console.log("5. Tra cứu chuyến bay");
    console.log("0. Về menu chính\n");

    const input = prompt("Mời chọn tác vụ: ");
    // console.debug("Menu input: ", input);
    return input;
};

const titleBaoCaoHeThong = () => {
    console.clear();
    console.log("Bán vé chuyến bay");
    console.log("Module: Báo cáo hệ thống");
    console.log("");

    console.log("Menu:");
    console.log("1. Báo tổng quan");
    console.log("0. Về menu chính\n");

    const input = prompt("Mời chọn tác vụ: ");
    // console.debug("Menu input: ", input);
    return input;
};

const titleChuyenBay = () => {
    console.log(
        "Mã chuyến bay|Sân bay đi|Sân bay đến|Thời gian khởi hành|thời gian bay|Số ghế trống"
    );
};

const pressToContinue = () => {
    prompt("Bấm nút bất kì để tiếp tục!");
};

const showAirportCode = () => {
    let s = airport
        ?.map((e: { iata: any }) => {
            return e?.iata;
        })
        .join(", ");
    console.log("Danh sách sân bay: ", s);
};

const isAirportExist = (code: String) => {
    let check = false;
    airport?.map((e: { iata: any }) => {
        if (code.toLowerCase() == String(e?.iata).toLowerCase()) {
            check = true;
        }
        return e?.iata;
    });
    return check;
};

const timeCheck = (timeString: String) => {
    let x = timeString.split(" ");

    if (x.length !== 2) {
        return false;
    }

    let timePart = x[0];
    let dayPart = x[1];
    let _timePart = timePart.split(":");
    let _dayPart = dayPart.split("/");

    if (_timePart.length !== 3) {
        return false;
    }
    if (_dayPart.length !== 3) {
        return false;
    }

    return true;
};

const getCurrentTime = () => {
    let x = dayjs().format("HH:mm:ss DD/MM/YYYY");
    // let x = dayjs dayjs().format(" HH:mm:ss DD/MM/YYYY");
    // console.log({ x });
    return x;
};

const getRandomCode = () => {
    return Math.round(Math.random() * 859999 + 100000);
};

export {
    titleMenu,
    titleQuanLyVe,
    titleQuanLyChuyenBay,
    titleBaoCaoHeThong,
    titleChuyenBay,
    pressToContinue,
    initUtils,
    airport,
    showAirportCode,
    isAirportExist,
    timeCheck,
    getCurrentTime,
    getRandomCode,
};
