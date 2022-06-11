import * as utils from "../utils.ts";
import {
    db,
    getAllTicket,
    getOneFlightData,
    getOneTicket,
} from "../data/db.ts";
import { faker } from "https://deno.land/x/deno_faker@v1.0.3/mod.ts";

import { _danhSachChuyenBay } from "./quan_ly_chuyen_bay.ts";

const _nhapVe = async () => {
    let flightCode = "";
    while (flightCode === "") {
        flightCode = String(
            prompt(
                "Nhập mã chuyến bay(VD: 541476), nhập 1 để xem danh sách chuyến bay, nhập 0 để thoát:  "
            ) || ""
        );
        if (flightCode === "0") {
            return null;
        }

        if (flightCode === "1") {
            flightCode = "";
            await _danhSachChuyenBay();
            continue;
        }

        const flightData = await getOneFlightData(flightCode);
        if (!flightData) {
            flightCode = "";
            console.log("Mã chuyến bay không tồn tại, mời bạn nhập lại!");
            continue;
        }
    }

    let fullName = "";
    while (fullName === "") {
        fullName = String(
            prompt(
                "Nhập họ tên hành khách(VD: Trần Thủ Độ), nhập 0 để thoát:  "
            ) || ""
        );
        if (fullName === "0") {
            return null;
        }
        if (!fullName) {
            fullName = faker.name.findName();
        }
    }

    let cmnd = "";
    while (cmnd === "") {
        cmnd = String(
            prompt(
                "Nhập CMND hành khách(VD: 100015411001), nhập 0 để thoát:  "
            ) || ""
        );
        if (cmnd === "0") {
            return null;
        }
        if (!cmnd) {
            cmnd =
                String(utils.getRandomCode()) + String(utils.getRandomCode());
        }
    }

    let phone = "";
    while (phone === "") {
        phone = String(
            prompt(
                "Nhập số điện thoại hành khách(VD: 0325814751), nhập 0 để thoát:  "
            ) || ""
        );
        if (phone === "0") {
            return null;
        }

        if (!phone) {
            phone = "0328" + String(utils.getRandomCode());
        }
    }

    let price = "";
    while (price === "") {
        price = String(
            prompt("Nhập giá vé(VD: 200000), nhập 0 để thoát:  ") || ""
        );
        if (price === "0") {
            return null;
        }
        if (!price) {
            price = "845000";
        }
    }

    console.log("Thông tin đã nhập: ");

    let ticketCode = "VE" + String(utils.getRandomCode());
    console.log("Mã số vé: ", ticketCode);
    console.log("Mã chuyến bay: ", flightCode);
    console.log("Họ tên khách: ", fullName);
    console.log("SĐT khách: ", phone);
    console.log("Căn cước công dân: ", cmnd);
    console.log("Mã chuyến bay: ", flightCode);
    let data = {
        ticketCode,
        price,
        fullName,
        phone,
        cmnd,
        flightCode,
    };
    return data;
};

const banVe = async () => {
    console.clear();
    console.log("Module: Quản lý bán vé");
    console.log("Function: Bán vé\n\n");
    await _danhSachChuyenBay();
    let data = await _nhapVe();

    if (!data) {
        console.log("Bạn đã huỷ nhập");
        return;
    }
    let newData = {
        ...data,
        type: "ve",
    };
    await db.insert(newData);
    console.log("Bán vé thành công!");
    utils.pressToContinue();
};

const suaVe = async () => {
    console.clear();
    console.log("Module: Quản lý bán vé");
    console.log("Function: Sửa vé đã bán\n\n");

    await _danhSachVeDaBan();

    let ticketCode = "";
    while (ticketCode === "") {
        ticketCode = String(
            prompt(
                "Nhập mã số vé cần sửa(VD: 541476), nhập 1 để xem danh sách vé, nhập 0 để thoát:  "
            ) || ""
        );
        if (ticketCode === "0") {
            return null;
        }

        if (ticketCode === "1") {
            ticketCode = "";
            await _danhSachVeDaBan();
            continue;
        }

        const veInfo = await getOneTicket(ticketCode);
        if (!veInfo) {
            ticketCode = "";
            console.log("Mã số vé không tồn tại, mời bạn nhập lại!");
            continue;
        }
    }

    let data = await _nhapVe();

    let newData = {
        ...data,
        ticketCode,
    };

    await db.update({ type: "ve", ticketCode }, { $set: { ...newData } });

    console.log(`Sửa vé ${ticketCode} thành công`);

    utils.pressToContinue();
};

const huyVe = async () => {
    console.clear();
    console.log("Module: Quản lý bán vé");
    console.log("Function: Huỷ vé đã bán\n\n");

    await _danhSachVeDaBan();

    let ticketCode = "";
    while (ticketCode === "") {
        ticketCode = String(
            prompt(
                "Nhập mã số vé cần huỷ(VD: 541476), nhập 1 để xem danh sách vé, nhập 0 để thoát:  "
            ) || ""
        );
        if (ticketCode === "0") {
            return null;
        }

        if (ticketCode === "1") {
            ticketCode = "";
            await _danhSachVeDaBan();
            continue;
        }

        const veInfo = await getOneTicket(ticketCode);
        if (!veInfo) {
            ticketCode = "";
            console.log("Mã số vé không tồn tại, mời bạn nhập lại!");
            continue;
        }
    }

    await db.remove({ type: "ve", ticketCode });
    console.log(`Đã xoá vé ${ticketCode} thành công`);

    utils.pressToContinue();
};

const _danhSachVeDaBan = async () => {
    let data: any = await getAllTicket();
    let length: any = data?.length;
    if (!data || !length) {
        console.log("Không có vé trong hệ thống\n\n");
        return;
    }
    let arr = Object.create(null);

    for (let i = 0; i < length; i++) {
        arr[data[i]?.ticketCode] = data[i];
    }
    console.table(arr, ["flightCode", "cmnd", "fullName", "phone", "price"]);
};

const danhSachVeDaBan = async () => {
    console.clear();
    console.log("Module: Quản lý bán vé");
    console.log("Function: Danh sách vé đã bán\n\n");

    await _danhSachVeDaBan();
    utils.pressToContinue();
};

const _mainQuanLyVe = async () => {
    while (true) {
        const val = utils.titleQuanLyVe();
        if (val == "1") {
            await banVe();
            continue;
        }
        if (val == "2") {
            await suaVe();
            continue;
        }
        if (val == "3") {
            await huyVe();
            continue;
        }
        if (val == "4") {
            await danhSachVeDaBan();
            continue;
        }
        if (val == "0") {
            return;
        }

        prompt("Hãy nhập tác vụ mong muốn!");
    }
};

export { _mainQuanLyVe, _danhSachVeDaBan };
