import { Schema, model, Document ,Types} from "mongoose";

interface IAssignment extends Document {
  userId: Types.ObjectId;
  task: string;
  admin: Types.ObjectId;
  status: "Pending" | "Accepted" | "Rejected";
  createdAt: Date;
}

const assignmentSchema = new Schema<IAssignment>({
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
},
  task: { 
    type: String,
     required: true 
    },
  admin: { 
    type: Schema.Types.ObjectId,
     ref: "User", 
     required: true
     },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected"],
    default: "Pending",
  },
  createdAt: { 
    type: Date,
     default: Date.now 
    },
});

const Assignment = model<IAssignment>("Assignment", assignmentSchema);
export default Assignment;
