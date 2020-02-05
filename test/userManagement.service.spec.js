const User = require('../models/User');
//const stories = require('../fixtures/stories.json');
const userManagement = require('../services/userManagement.service');
const mockingoose = require('mockingoose').default;

describe('UserMangementService', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should create new User', async () => {
        const spy = jest.spyOn(User.prototype, 'save');
        mockingoose(User).toReturn({}, 'save');
        const response = await userManagement.register({
            "email": "ananth1245@gmail.com",
            "password": "nullvoid",
            "firstName": "Ananth",
            "lastName": "Prasad",
            "phoneNumber": "9840614023"
        });
        expect(response).toHaveProperty('_id');
        expect(spy).toHaveBeenCalled();
    });

});