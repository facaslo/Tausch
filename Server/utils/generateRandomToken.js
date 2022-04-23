const generateToken = (length) => { 
    return new Promise((resolve,reject) => { 
        try{
            const a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");    
            let b = [];  
            for (var i=0; i<length; i++) {
                let j = Math.floor(Math.random() * (a.length-1));
                b[i] = a[j];
            }
            resolve(b.join(""))            
        }   
        catch(error){
            reject(error)
        }        
    }).then(b => b).catch(error => console.log(error))
}

module.exports = generateToken