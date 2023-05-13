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
        return letter.toUpperCase() === friend[0].toUpperCase() ? acc += 1 : acc
        }, 0);
    return friendCount;
}

var friendsCount;

var topThreeTags;

var genderCount;

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