import { db } from "./data/db.ts";
import * as utils from "./utils.ts";
import { _mainQuanLyVe } from "./modules/quan_ly_ve.ts";
import { _mainQuanLyChuyenBay } from "./modules/quan_ly_chuyen_bay.ts";
import { _mainBaoCaoHeThong } from "./modules/bao_cao_he_thong.ts";


function _main() {
    utils.initUtils();
    mainMenuChoose();
}

const mainMenuChoose = async () => {
    while (true) {
        const val = utils.titleMenu();
        if (val == "1") {
            await _mainQuanLyVe();
            continue;
        }
        if (val == "2") {
            await _mainQuanLyChuyenBay();
            continue;
        }
        if (val == "3") {
            await _mainBaoCaoHeThong();
            continue;
        }
        if (!val) {
            continue;
        } else {
            prompt("Hãy nhập tác vụ mong muốn!");
        }
    }
};

_main();
