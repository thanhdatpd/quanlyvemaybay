import * as utils from "../utils.ts";
import { _danhSachChuyenBay } from "./quan_ly_chuyen_bay.ts";
import { _danhSachVeDaBan } from "./quan_ly_ve.ts";
const baoCaoTongQuan = async () => {
    console.clear();
    console.log("Module: Báo cáo hệ thống");
    console.log("Function: Báo cáo tổng quan\n\n");
    await _danhSachChuyenBay();

    console.log("\n\nThông tin vé đã bán:\n");

    await _danhSachVeDaBan();
    utils.pressToContinue();
};

const _mainBaoCaoHeThong = async () => {
    while (true) {
        const val = utils.titleBaoCaoHeThong();
        if (val == "1") {
            await baoCaoTongQuan();
            continue;
        }

        if (val == "0") {
            return;
        }

        prompt("Hãy nhập tác vụ mong muốn!");
    }
};

export { _mainBaoCaoHeThong };
