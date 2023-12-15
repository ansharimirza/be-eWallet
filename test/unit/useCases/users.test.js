const { 
    user : {
        addUserUseCase,
        readBalanceUserUseCase,
        topUpBalanceUserUseCase,
        transferBalanceUserUseCase
    }
} = require('../../../src/useCases');

const {
    User,
} = require('../../../src/entities');

const Chance = require('chance');

const chance = new Chance();

const {
    v4:uuidv4
} = require('uuid');


describe('User use case', () =>{
    const mockUserRepo = {
        add: jest.fn(async user => ({
            ...user,
            id:uuidv4()
        })),
        getByusername: jest.fn(async username => ([{
            id : chance.integer(),
            username: 'dono',
        }])),
    }
    
    const mockUserWalletRepo = {
        readBalanceUser: jest.fn(async id => ([{
            id : chance.integer(),
            user_id: 1,
            balance: 1000,
        }])),
        add: jest.fn(async user => ({
            ...user,
        })),
        update: jest.fn(async user => user),
    }

    const dependencies = {
        usersRepository: mockUserRepo,
        userWalletRepository: mockUserWalletRepo
    }

    describe('add user use case', () =>{
        test('User shoul be added', async () =>{
            //create user data
            const testUserData = new User({
                userName: chance.name(),
                createdAt: new Date(new Date().toLocaleString())
            });

            //add a user using the use case
            const addedUser = await addUserUseCase(dependencies).execute(testUserData);
            
            //check the received data
            expect(addedUser).toBeDefined();
            expect(addedUser.id).toBeDefined();
            expect(addedUser.userName).toBe(testUserData.userName);

            //check that the dependency called as expected
            const call = mockUserRepo.add.mock.calls[0][0];
            expect(call.id).toBeUndefined();
            expect(call.userName).toBe(testUserData.userName);
        })
    })

    describe('read Balance use case', () => {
        test('Return Balance', async () => {
            //generate fake username
            const fakeUsername = 'ibnu';
            //call get token by username
            const readBalanceUser =  readBalanceUserUseCase(dependencies).execute({
                username: fakeUsername
            });
            
            //check the data
            expect(readBalanceUser).toBeDefined();
        })
    })

    describe('topUp Balance use case', () => {
        test('topUp Balance', async () => {
            //generate fake username
            const fakeUsername = 'ibnu';
            //call get token by username
            const topUpBalanceUser =  topUpBalanceUserUseCase(dependencies).execute({
                username: fakeUsername,
                amount: 12
            });
            
            //check the data
            expect(topUpBalanceUser).toBeDefined();
        })
    })

    describe('transfer Balance use case', () => {
        test('transfer Balance', async () => {
            //generate fake username
            const fakeUsername = 'ibnu';
            //call get token by username
            const transferBalanceUser =  transferBalanceUserUseCase(dependencies).execute({
                fromUsername: fakeUsername,
                username: 'adit',
                amount: 120
            });
            
            //check the data
            expect(transferBalanceUser).toBeDefined();
        })
    })

})