// #!/usr/bin/env node

'use strict';

var customers = require('./data/customers.json');
var _ = require('underbar');

/**
 * 1. Import your lodown module using the require() method,
 *    using the string 'lodown-<my-username>', or whatever
 *    name with which you published your npm lodown project.
 *
 * 2. Solve all problems as outlined in the README.
 *
 * 3. We started the first one for you as an example! Make the rest in that style.
 *
 * 4. To test your work, run the following command in your terminal:
 *
 *    npm start --prefix ./lgf-test
 *
 *    IMPORTANT: Make sure you replace <YOUR_GITHUB_FOLDER with your actual github folder name that is in your workspace.
 */

var maleCount = function(array){
    let males = _.filter(array, function(customer){
        return customer.gender === 'male'
    });
    return males.length;
};

var femaleCount = function(array){
    let females = _.reduce(array, function(accumulator, current){ //acc => 0 | current => {0}
        if(current.gender === 'female'){
            accumulator += 1
        }
        return accumulator// return number
    }, 0)

    return females;
};

var oldestCustomer = function(array){
    // reduce
    let oldest = _.reduce(array, function(accumulator, current){
        //determine if current customer is older than accumulator
        if(current.age > accumulator.age){
            return current;
        } else{return accumulator;}
    });
    return oldest.name;
};

var youngestCustomer = function(array){
    let youngest = _.reduce(array, function(accumulator, current){
        if(current.age < accumulator.age){
            return current
        } else{return accumulator}
    });
    return youngest.name;
};

var averageBalance = function(array){
    const totalBalance = array.reduce((acc, customer) => customer.balance ? acc + +customer.balance.replaceAll(/[$,]/g, '') : acc, 0)
    const hasBalance = array.filter((customer) => customer.balance) 
    const balance = totalBalance / hasBalance.length;
    return balance;
};

var firstLetterCount = function(array, letter){
    return _.reduce(array, function(accumulator, current){ //acc => 0 | current => {0}
        if(current.name[0].toUpperCase() === letter.toUpperCase()){
            accumulator += 1
        }
        return accumulator// return number
    }, 0)
};   
   
var friendFirstLetterCount = function(array, customer, letter){    
    let myFriends = array.reduce(function(acc, person){
        return customer === person.name ? acc.concat(person.friends) : acc
        }, []); 
    let friendCount = myFriends.reduce(function(acc, friend){
        return letter.toUpperCase() === friend.name[0].toUpperCase() ? acc += 1 : acc
        }, 0);
    return friendCount;
}

var friendsCount = function(array, name){
    let friendsByName = array.reduce(function(acc, current){
        let friends = current.friends;
        for(let x = 0; x < friends.length; x++){
            if(friends[x].name === name){
                acc.push(current.name);
            }
        }
        return acc;
    }, [])
    return friendsByName;
};

var topThreeTags = function(array){
    //reduce the array by each object value
    let tags = array.reduce(function(acc, customer){
        //get the keys for all the tags in the array
        let keys = customer.tags.reduce(function(acc, currentKey){
            //push all the keys/values into a new array
            acc.push(currentKey);
            return acc;
        }, [])
        //join up all the tags in all the customer objects
        return keys.concat(acc);
    }, [])
    //create empty object to push tags into
    let countObj = {};
    for(let i = 0; i < tags.length; i++){
        //if the tag exists, add a count +1 to it
        if(countObj[tags[i]]){
            countObj[tags[i]] += 1;
        //if tag does not exist, create it and set it equal to 1
        } else{
            countObj[tags[i]] = 1;
        }
    }
    //turn object into array of arrays
    let countArray = Object.entries(countObj);
    //array.sort() method to sort array
    //we want it to read the second value in each array, from high to low
    const sortedArray = countArray.sort(function(a, b){return b[1] - a[1]});
    //get the top 3
    let topThreeArray = [sortedArray[0][0], sortedArray[1][0], sortedArray[2][0]]
    return topThreeArray; 
};

var genderCount = function(array){
    //create obj with reduced array information
    const genderObj = array.reduce(function(acc, current){
        //adding key female to value  call of function femaleCount(array)
        acc.female = femaleCount(array);
        //adding key male to value  call of function maleCount(array)
        acc.male = maleCount(array);
        //adding key non-binary to value of reduced array to find the count of gender === non-binary
        acc['non-binary'] = _.reduce(array, function(accumulator, current){ //acc => 0 | current => {0}
                if(current.gender === 'non-binary'){
                    accumulator += 1
                }
                return accumulator// return number
            }, 0)
        return acc;
    }, {})
    //returning new object
    return genderObj;
};

//////////////////////////////////////////////////////////////////////
// DON'T REMOVE THIS CODE ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

// here, export any references you need for tests //
module.exports.maleCount = maleCount;
module.exports.femaleCount = femaleCount;
module.exports.oldestCustomer = oldestCustomer;
module.exports.youngestCustomer = youngestCustomer;
module.exports.averageBalance = averageBalance;
module.exports.firstLetterCount = firstLetterCount;
module.exports.friendFirstLetterCount = friendFirstLetterCount;
module.exports.friendsCount = friendsCount;
module.exports.topThreeTags = topThreeTags;
module.exports.genderCount = genderCount;