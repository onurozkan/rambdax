const R = require("rambda")

const composeAsync = (...inputArguments) => {
  try{

    return async function(startArgument){
      let argumentsToPass = R.type(startArgument) === "Async"  ?
        await startArgument() :
          R.equals(startArgument.toString(),"[object Promise]") ?
          await startArgument :
          startArgument

      while(inputArguments.length!==0){
        console.log(argumentsToPass)
        const fn = inputArguments.pop()
        if(R.type(fn) === "Async"){
          argumentsToPass = await fn(argumentsToPass)
        }else if(R.type(fn) === "Promise"){
          argumentsToPass = await fn(argumentsToPass)
        }else{
          argumentsToPass = fn(argumentsToPass)
        }
      }

      return argumentsToPass
    }
  }catch(err){
    throw new Error(err)
  }
}

module.exports = composeAsync
