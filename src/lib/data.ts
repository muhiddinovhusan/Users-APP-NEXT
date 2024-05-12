// import fs from 'fs';

interface Users {
    id: number
    name: string;
    fullName: string;
    isMarried: boolean;
    country: string;
    gender: string;

}

export let users: Users[] = [
    {
        "id": 1,
        "name": "Husan",
        "fullName": "Muhiddinov",
        "country": "Tashkent",
        "isMarried": true, 
        "gender": "Male",

    },
    {
        "id": 2,
        "name": "Hasan",
        "fullName": "Muhiddinov",
        "country": "Tashkent",
        "isMarried": true,
        "gender": "Male",

    }
] ;


// const fileName = 'users.json';

// const saveDataToFile = () => {
//     fs.writeFileSync(fileName, JSON.stringify(users, null, 2));
// };

// const loadDataFromFile = () => {
//     try {
//         const data = fs.readFileSync(fileName, 'utf-8');
//         users = JSON.parse(data);
//     } catch (error) {
//         console.error('Error loading data from file:', error);
//     }
// };

// loadDataFromFile();







export const getUser = () => users;

export const addUser = (user :Users) => {
    users.push(user);
//  saveDataToFile();
}

export const deleteUser = (id : number) => {
    users = users.filter(user => user.id !== id);

}

export const updateUser = (id :  number, name:string , fullName:string, isMarried :string,country:string, gender:string ) => {
   const user = users.find(user => user.id === id);
   if(user){
    user.name = name;
    user.fullName = fullName;
   }
}

export const getUserById = (id: number) => {
  
    
    const user = users.find(user => user.id === id);
    
    return user;
}