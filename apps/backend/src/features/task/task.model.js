import { Schema } from "mongoose";




export const createTaskModel = ({db}) =>{
    const TaskSchema = new Schema (
        {
        title : {type : String , required : true , trim : true},
        movie :   {type : String , required : true , trim : true},
        status : {type : String , default : "Uncompleted"},
        acceptance : {type : String},
        difficulty :{type :String , required : true}
        },
        {timestamps : true}
    );
    return db.model("Task", TaskSchema);
}