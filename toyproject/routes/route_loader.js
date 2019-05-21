//=========================================================================================================
// Module
const config = require('../config/config');
//=========================================================================================================
// Route loader
const route_loader = {};
//=========================================================================================================
route_loader.init = (app, router) => {
    console.log('route_loader.init 호출됨.');
    return initRoutes(app, router);
};

function initRoutes(app, router) {
    let infoLen = config.route_info.length;
    console.log(`설정에 정의된 라우팅 모듈의 수 : ${infoLen}`);
    console.dir("#########################################################################################")
    for (let i = 0; i < infoLen; i++) {
        let curItem = config.route_info[i];

        let curModule = require(curItem.file);
        console.log(`${curItem.file} 파일에서 모듈정보를 읽어옴.`);

        if (curItem.type === 'get') {
            router.route(curItem.path).get(curModule[curItem.method]);
        } else if (curItem.type === 'post') {
            router.route(curItem.path).post(curModule[curItem.method]);
        } else if (curItem.type === 'delete') {
            router.route(curItem.path).delete(curModule[curItem.method]);
        } else { // curItem.type === 'put'
            router.route(curItem.path).put(curModule[curItem.method]);
        }

        console.log(`라우팅 모듈 [${curItem.method}]이(가) 설정됨.`);
    }
    console.dir("#########################################################################################")

    app.use('/', router);
}
//=========================================================================================================
module.exports = route_loader;

