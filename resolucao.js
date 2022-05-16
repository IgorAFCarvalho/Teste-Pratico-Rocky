const data = require('./broken-database.json');
let newData = []
let id = 0
let tempName = []
let name = ''
let quantity = 0
let price = 0
let category = ''

createNewDatabase(data,id,tempName,name,quantity,price,category,newData)

//https://pt.stackoverflow.com/questions/342502/como-criar-um-arquivo-json-a-partir-de-um-js 
let fs = require('fs');
fs.writeFileSync('saída.json', JSON.stringify(newData,null,'\t'));

const validate = require('./saída.json');
validação1(validate)
validação2(validate)

function createNewDatabase(data,id,tempName,name,quantity,price,category,newData){
    for(let i = 0;i<data.length;i++)
        {
            id = data[i].id;
            tempName = data[i].name.split("");
            name = '';
            name = reparoNomes (name,tempName) 

            if(data[i].quantity == undefined)
                quantity = 0
                else
                quantity = data[i].quantity;

            price = parseFloat(data[i].price);
            
            category = data[i].category;
        
            let newEntry = {
                "id" : id,
                "name" : name, 
                "quantity" : quantity,
                "price": price,
                "category": category,
                }
            newData.push(newEntry)
        }
}

function reparoNomes (name,tempName)
    {
        for (let j = 0; j <tempName.length;j++)
        {
            switch (tempName[j] )
            {
                case 'æ':
                    tempName[j] = 'a';
                    name += tempName[j] ;
                    break;
        
                case '¢':
                    tempName[j]  = 'c';
                    name += tempName[j] 
                    break;
            
                case 'ø':
                    tempName[j]  = 'o';
                    name += tempName[j] 
                    break;
            
                 case 'ß':
                    tempName[j]  = 'b';
                    name += tempName[j] 
                    break;
            
                default:
                    name += tempName[j] 
                    break;
            }
        }
        return name;
}

function validação1 (validate){
    let sortedEstoque= validate.sort((v1,v2)=>{
        let v1f = v1.category.toLowerCase()
        let v2f = v2.category.toLowerCase()
        return v1f <v2f ? -1 :v1f>v2f })
        .sort((v1,v2)=>{
            if (v1.category.toLowerCase() == v2.category.toLowerCase()){
                return v1.id<v2.id ? -1:v1.id>v2.id
            }
        })
    console.log('\nValidação 1: Banco de dados em ordem de categoria e id\n',sortedEstoque.map(v1=>{
        return {name: v1.name, category: v1.category, id: v1.id}
    }))
}

function validação2 (validate)
{
    let k = 0;
    let count = 0
    let catQuantity = []
    let countCategory = validate.sort((v1,v2)=>{
                let v1f = v1.category.toLowerCase()
                let v2f = v2.category.toLowerCase()
                return v1f <v2f ? -1 :v1f>v2f
        }).map(v1 =>{
                return {category: v1.category, quantity: v1.quantity}
        })
    for(let i = 0; i<(countCategory.length);i++){
        let j = i + 1
        if(i == (countCategory.length - 1)){
            j = i - 1 
        }
        let c1 = countCategory[i].category.toLowerCase()
        let c2 = countCategory[j].category.toLowerCase()
        count += countCategory[i].quantity
        if (c1 != c2){
            catQuantity[k] = {category: countCategory[i].category, quantity: count}
                count = 0
                k++
        }
    }
    console.log('\nValidação 2: Quantidade de produtos por categoria\n', catQuantity)
}
