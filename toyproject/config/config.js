//=========================================================================================================
// Configuration
module.exports = {
    // Port Number
    server_port: 3000,
    
    //=========================================================================================================
    // Database

	db_url: 'mongodb://localhost:27017/local',
	db_schemas: [

        // toyproject/database/
		{file: './user_schema', collection:'users', schemaName:'UserSchema', modelName:'UserModel'},
		{file: './review_schema', collection:'reviews', schemaName:'ReviewSchema', modelName:'ReviewModel'},
        {file: './store_schema', collection:'stores', schemaName:'StoreSchema', modelName:'StoreModel'}
    ],
    
    //=========================================================================================================
    // Routes

    route_info: [
    
        // toyproject/
        {file: './user', path: '/login', method: 'login', type: 'get'},
	]
}