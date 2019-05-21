//=========================================================================================================
// Module
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
//=========================================================================================================
// Database
const database = {};
//=========================================================================================================
database.init = function(app, config) {
	console.log('init() 호출됨.');
	
	connect(app, config);
}

function connect(app, config) {
	console.log('connect() 호출됨.');
    console.log(`${config.db_url}`)
    
	mongoose.connect(config.db_url, { useNewUrlParser: true});
	database.db = mongoose.connection;
	
	database.db.on('error', console.error.bind(console, 'mongoose connection error.'));	
	database.db.on('open', () => {
        
        console.log(`데이터베이스에 연결되었습니다. : ${config.db_url}`);
		createSchema(app, config);
		
	});
	database.db.on('disconnected', connect);
}

function createSchema(app, config) {
	let schemaLen = config.db_schemas.length;
	console.log(`설정에 정의된 스키마의 수 : ${schemaLen}`);
	console.dir("#########################################################################################")
	for (let i = 0; i < schemaLen; i++) {
		let curItem = config.db_schemas[i];
		
		let curSchema = require(curItem.file).createSchema(mongoose);
		console.log(`${curItem.file} 모듈을 불러들인 후 스키마 정의함.`);
		
		let curModel = mongoose.model(curItem.collection, curSchema);
		console.log(`${curItem.collection} 컬렉션을 위해 모델 정의함.`);
		
		database[curItem.schemaName] = curSchema;
		database[curItem.modelName] = curModel;
		console.log(`스키마 이름 [${curItem.schemaName}], 모델 이름 [${curItem.modelName}] 이 database 객체의 속성으로 추가됨.`);
	}
    console.dir("#########################################################################################")
    
	app.set('database', database);
	console.log('database 객체가 app 객체의 속성으로 추가됨.');
}
 //=========================================================================================================
module.exports = database;
