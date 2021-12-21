// Get the mongoose object
import mongoose from 'mongoose';

// Prepare to the database movies_db in the MongoDB server running locally on port 27017
mongoose.connect(
    "mongodb://localhost:27017/workouts_db",
    { useNewUrlParser: true, useUnifiedTopology: true }
);

// Connect to to the database
const db = mongoose.connection;
// The open event is called when the database connection successfully opens
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

/**
 * Define the schema
 */
const workoutSchema = mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    unit: { type: String, required: true},
    date: { type: String, required: true}
});

/**
 * Compile the model from the schema. This must be done after defining the schema.
 */
const Workout = mongoose.model("Workout", workoutSchema);

/**
 * create exercise
 * @param {String} name
 * @param {Number} reps
 * @param {Number} weight
 * @param {String} unit 
 * @param {String} date
 * @returns A promise. Resolves to the JSON object for the document created by calling save
 */
const createWorkout = async (name, reps, weight, unit, date) => {
    const workout = new Workout({name: name, reps: reps, weight: weight, unit, date});
    return workout.save();
}

/**
 * Retrieve movies based on the filter, projection and limit parameters
 * @param {Object} filter
 * @param {String} projection
 * @param {Number} limit
 * @returns
 */

const findWorkout = async (filter, projection, limit) => {
    const query = Workout.find(filter)
        .select(projection)
        .limit(limit);
    return query.exec();
}

/**
 * 
 * @param {String} _id
 * @returns 
 */
const findWorkoutById = async (_id) => {
    const query = Workout.findById(_id);
    return query.exec();
}



/**
 * Replace title, year, language properties of movie with id value provided
 * @param _id 
 * @param name 
 * @param reps 
 * @param weight 
 * @param unit 
 * @param date
 * @returns A promise. Resolves to the number of documents modified
 */
const replaceWorkout = async (_id, name, reps, weight, unit, date) => {
    const result = await Workout.replaceOne({_id: _id},
        {name: name, reps: reps, weight: weight, unit: unit, date: date});
    //return result.nModified; mongoose six update to modified count
    return result.modifiedCount;
}
/**
 * Delete movie by id value
 * @param {String} _id
 * @returns a promise. resolves to count of delet documents
 */
const deleteById = async (_id) => {
    const result = await Workout.deleteOne({_id: _id});
    return result.deletedCount;
}

export {createWorkout, findWorkoutById, replaceWorkout, deleteById, findWorkout}