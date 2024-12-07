const Rooms = require('../models/rooms.model')
const addNewRoom=async (req,res)=>{
 try {
    const rooms=new Rooms(
        req.body.number,
        req.body.type,
        req.body.price,
        )
      await rooms.save()
  res.json(rooms)    
 } catch (error) {
    console.log(error)
    res.json(error)
 }
    }

    
module.exports={
    addNewRoom
}