const Guest = require('../models/guest.model')

const AddGuest=async (req,res)=>{
    try {
       const guest= new Guest(
           req.body.name,
           req.body.phone,
           req.body.email,
           req.body.address,
           )
         await guest.save()
     res.json(guest)    
    } catch (error) {
       console.log(error)
       res.json(error)
    }
       }

              

module.exports={
   AddGuest
}       