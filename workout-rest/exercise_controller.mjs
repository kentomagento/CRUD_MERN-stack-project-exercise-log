import * as workouts from './exercise_model.mjs';
import express from 'express';

const PORT = 3000;

const app = express();

app.use(express.json());

/**
 * Create a new workout provided in the body
 */
app.post('/workouts', (req, res) => {
    workouts.createWorkout(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date) 
    .then (workout =>{
        res.status(201).json(workout); 
    })
    .catch (error =>{
        res.status(500).json({error})
    })
    
});


/**
 * Retrive the workout corresponding to the ID provided in the URL.
 */
app.get('/workouts/:_id', (req, res) => {
    const workoutId = req.params._id;
    workouts.findWorkoutById(workoutId)
        .then(workout => {
            if (workout !== null){
                res.status(200).json(workout); //bo explicit status code so default 200
            } else {
                res.status(500).json({Error: "Resource not found -- recheck Id"})
            }
        })
        .catch (error => {
            res.status(500).json({error});
        })
});

/**
 * Retrieve workout
 */
app.get('/workouts', (req, res) => {
    let filter = {}
    if (req.query.name !== undefined){
        filter = {name: req.query.name};
    }
    workouts.findWorkout(filter, '', 0)
        .then(workouts => {
            res.status(200).send(workouts);
        })
        .catch(error => {
            console.error(error);
            res.status(500).send({ error });
        })
});



/**
 * Update the workout whose id is provided in the path parameter and set
 */
app.put('/workouts/:_id', (req, res) => {
    workouts.replaceWorkout(req.params._id, req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then (numUpdated => {
            if (numUpdated === 1){
                console.log(numUpdated)
                res.status(200).json({_id: req.params._id, name: req.body.name, reps: req.body.reps, weight: req.body.weight, unit: req.body.unit, date: req.body.date})
            } else {
                res.status(500).json({ Error: 'resource not found -- recheck Id'});
            }
        })
        .catch (error => {
            console.error(error);
            res.status(500).json({ error });
        });
});


/**
 * Delete the workout whose id is provided in the query parameters
 */

app.delete('/workouts/:_id', (req, res) => {
    workouts.deleteById(req.params._id)
    .then( deletedCount => {
        if (deletedCount === 1){
            res.status(204).send();
        } else {
            res.status(500).json({ Error: 'resource not found -- recheck Id'});
        }
    })
    .catch(error => {
        res.status(500).send({ error });
    });
    
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});