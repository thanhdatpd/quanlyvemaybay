// deno-lint-ignore-file require-await
import * as utils from "../utils.ts";
import { db, dbType, getOneFlightData, searchFlightData } from "../data/db.ts";

const _themChuyenBay = async () => {
    utils.showAirportCode();

    let fromAirportCode = "";
    while (fromAirportCode === "") {
        fromAirportCode = String(
            prompt("Nhập mã sân bay nơi khởi hành: ")
        ).toUpperCase();
        if (fromAirportCode === "NULL") {
            fromAirportCode = "HAN";
        }

        if (!utils.isAirportExist(fromAirportCode)) {
            fromAirportCode = "";
            console.log("Mã sân bay không tồn tại, mời bạn nhập lại!");
            continue;
        }
    }
    console.log("Mã sân bay: ", fromAirportCode);

    let toAirportCode = "";
    while (toAirportCode === "") {
        toAirportCode = String(
            prompt("Nhập mã sân bay nơi đến: ")
        ).toUpperCase();
        if (toAirportCode === "NULL") {
            toAirportCode = "PXU";
        }
        if (!utils.isAirportExist(toAirportCode)) {
            toAirportCode = "";
            console.log("Mã sân bay không tồn tại, mời bạn nhập lại!");
            continue;
        }
    }
    console.log("Mã sân bay: ", toAirportCode);

    let timeStart = "";
    console.log(
        "Định dạng thời gian: Giờ:phút:giây ngày/tháng/năm. VD: 19:20:11 10/6/2022"
    );

    while (timeStart === "") {
        timeStart = String(prompt("Nhập thời gian khởi hành: ")).toUpperCase();

        if (timeStart === "NULL") {
            timeStart = utils.getCurrentTime();
        }

        if (!utils.timeCheck(timeStart)) {
            timeStart = "";
            console.log("Thời gian không hợp lệ, mời bạn nhập lại!");
            console.log(
                "Định dạng thời gian: Giờ:phút:giây ngày/tháng/năm. VD: 19:20:11 10/6/2022"
            );
            continue;
        }
    }

    console.log("Thời gian khởi hành: ", timeStart);

    let thoiGianBay = 0;
    while (thoiGianBay === 0) {
        const _thoiGianBay = String(prompt("Nhập thời gian bay: ") || "");
        if (_thoiGianBay === "") {
            thoiGianBay = 2;
        } else {
            thoiGianBay = Number.parseFloat(_thoiGianBay);
        }

        if (thoiGianBay <= 0) {
            thoiGianBay = 0;
            console.log(
                "Thời gian không hợp lệ, mời bạn nhập lại!, VD: 1, 2, 3, 4, 5"
            );
        }
    }
    console.log("Thời gian bay: ", thoiGianBay);

    let soGheTrong = 0;
    while (soGheTrong === 0) {
        const _soGheTrong = String(
            prompt("Nhập số ghế cho chuyến bay này: ") || ""
        );
        if (_soGheTrong === "") {
            soGheTrong = 160;
        } else {
            soGheTrong = Number.parseInt(_soGheTrong);
        }

        if (soGheTrong <= 0) {
            soGheTrong = 0;
            console.log("Số ghế không hợp lệ, mời bạn nhập lại!, VD: 50");
        }
    }
    console.log("Số ghế: ", soGheTrong);

    console.log("\n\nThông tin đã nhập:\n");

    const flightCode = String(utils.getRandomCode());
    console.log("Mã chuyến bay: ", flightCode);
    console.log("Mã sân bay đi: ", fromAirportCode);
    console.log("Mã sân bay đến: ", toAirportCode);
    console.log("Thời gian khởi hành: ", timeStart);
    console.log("Thời gian bay: ", thoiGianBay);
    console.log("Số ghế: ", soGheTrong);

    let data = {
        flightCode,
        fromAirportCode,
        toAirportCode,
        timeStart,
        thoiGianBay,
        soGheTrong,
    };

    return data;
};

const themChuyenBay = async () => {
    console.clear();
    console.log("Module: Quản lý chuyến bay");
    console.log("Function: Thêm chuyến bay\n");

    const data = {
        type: "chuyenbay",
        ...(await _themChuyenBay()),
    };
    await db.insert(data);
    console.log("Thêm chuyến bay hoàn tất \n");

    utils.pressToContinue();
};

const xoaChuyenBay = async () => {
    console.clear();
    console.log("Module: Quản lý chuyến bay");
    console.log("Function: Xoá chuyến bay\n");

    const countFlight = await _danhSachChuyenBay();
    if (!countFlight) {
        return;
    }
    let flightCode = "";
    let flightData = null;
    while (flightCode === "") {
        flightCode = String(
            prompt(
                "Nhập mã chuyến bay muốn xoá (VD: 541476), nhập 0 để thoát:  "
            ) || ""
        );
        if (flightCode === "0") {
            return;
        }
        flightData = await getOneFlightData(flightCode);
        if (!flightData) {
            flightCode = "";
            console.log("Mã chuyến bay không tồn tại, mời bạn nhập lại!");
            continue;
        }
    }

    await db.removeOne({ type: "chuyenbay", flightCode });
    console.log(`Xoá chuyến bay mã hiệu ${flightCode} hoàn tất!`);

    utils.pressToContinue();
};


const traCuuChuyenBay = async () => {
    console.clear();
    console.log("Module: Quản lý chuyến bay");
    console.log("Function: Tra cứu chuyến bay");

    let searchString = "";
    let flightData = null;
    while (searchString === "") {
        searchString = String(
            prompt(
                "Nhập mã chuyến bay, nơi đến, nơi đi để tìm (VD: HAN, PXU, 223942), hoặc nhập 0 để thoát:  "
            ) || ""
        );
        if (searchString === "0") {
            return;
        }
        flightData = await searchFlightData(searchString);
        if (!flightData || (flightData && !flightData.length)) {
            searchString = "";
            console.log("Không tìm thấy thông tin, mời bạn nhập lại!");
            continue;
        }
    }
    let length = flightData?.length;
    let arr = Object.create(null);
    for (let i = 0; i < length; i++) {
        arr[String(flightData[i]?.flightCode)] = { ...flightData[i] };
    }
    console.table(arr, [
        "fromAirportCode",
        "toAirportCode",
        "timeStart",
        "thoiGianBay",
        "soGheTrong",
    ]);

    utils.pressToContinue();
};

const suaChuyenBay = async () => {
    console.clear();
    console.log("Module: Quản lý chuyến bay");
    console.log("Function: Sửa chuyến bay");

    const countFlight = await _danhSachChuyenBay();
    if (!countFlight) {
        return;
    }

    let flightCode = "";
    let flightData = null;
    while (flightCode === "") {
        flightCode = String(
            prompt(
                "Nhập mã chuyến bay muốn sửa (VD: 541476), nhập 0 để thoát:  "
            ) || ""
        );
        if (flightCode === "0") {
            return;
        }
        flightData = await getOneFlightData(flightCode);
        if (!flightData) {
            flightCode = "";
            console.log("Mã chuyến bay không tồn tại, mời bạn nhập lại!");
            continue;
        }
    }

    printChuyenBay(flightData);

    console.log("Mời bạn nhập thông tin mới cho chuyến bay:");
    let newData = await _themChuyenBay();
    newData.flightCode = flightCode;

    await db.update(
        { type: "chuyenbay", flightCode: flightCode },
        { $set: { ...newData } }
    );
    console.log("Cập nhật dữ liệu chuyến bay hoàn tất");

    utils.pressToContinue();
};

const printChuyenBay = (data: any) => {
    let arr = Object.create(null);
    arr[data?.flightCode] = data;
    console.table(arr, [
        "fromAirportCode",
        "toAirportCode",
        "timeStart",
        "thoiGianBay",
        "soGheTrong",
    ]);
};

const _danhSachChuyenBay = async () => {
    const datas = await db.find({ type: "chuyenbay" });
    const ad = JSON.parse(JSON.stringify(datas));
    if (ad && ad.length) {
        let length = ad?.length;
        console.log(`Có ${length} chuyến bay trong hệ thống\n\n`);
        utils.titleChuyenBay();
        let arr = Object.create(null);
        for (let i = 0; i < length; i++) {
            arr[String(ad[i]?.flightCode)] = { ...ad[i] };
        }
        console.table(arr, [
            "fromAirportCode",
            "toAirportCode",
            "timeStart",
            "thoiGianBay",
            "soGheTrong",
        ]);
        return length;
    } else {
        console.log("Không có dữ liệu chuyến bay trong hệ thống!\n");
        return 0;
    }
};

const danhSachChuyenBay = async () => {
    console.clear();
    console.log("Module: Quản lý chuyến bay");
    console.log("Function: Danh sách chuyến bay\n");

    await _danhSachChuyenBay();

    utils.pressToContinue();
};

const _mainQuanLyChuyenBay = async () => {
    while (true) {
        const val = utils.titleQuanLyChuyenBay();

        if (val === "1") {
            await danhSachChuyenBay();
            continue;
        }
        if (val === "2") {
            await themChuyenBay();
            continue;
        }
        if (val === "3") {
            await suaChuyenBay();
            continue;
        }
        if (val === "4") {
            await xoaChuyenBay();
            continue;
        }
        if (val === "5") {
            await traCuuChuyenBay();
            continue;
        }
        if (val === "0") {
            return;
        }

        prompt("Hãy nhập tác vụ mong muốn!");
    }
};

export { _mainQuanLyChuyenBay, _danhSachChuyenBay };
