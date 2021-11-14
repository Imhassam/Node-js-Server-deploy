import  express  from 'express';
import morgan from 'morgan';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('short'));

const port = process.env.PORT || 3000;
let users = [];

app.use((req, res, next)=>{
    console.log("reuest come", req.body);
    next();
})

app.get('/users',(req, res)=>{
    res.send(users);
})

app.get('/users/:id',(req, res)=>{
    if(users[req.params.id]){
        res.send(users[req.params.id])
    }else{
        res.send('user not found');
    }
})

app.post('/users',(req, res)=>{
    if(!req.body.user_name || !req.body.age || !req.body.rollno){
        res.status(400).send('incomplete data')
    }else{
        users.push({
            user_name:req.body.user_name,
            age:req.body.age,
            rollno:req.body.rollno
        })
    }
    res.send("users created");
})

app.put('/users/:id',(req, res)=>{
    if(users[req.params.id]){
        if(req.body.user_name){
            users[req.params.id].user_name = req.body.user_name;
        }
        if(req.body.age){
            users[req.params.id].age = req.body.age;
        }
        if(req.body.rollno){
            users[req.params.id].rollno = req.body.rollno;
        }
        res.send(users[req.params.id])
    }else{
        res.send('user not found');
    }
})

app.delete('/users/:id',(req, res)=>{
    if(users[req.params.id]){
        users[req.params.id] = {};
        res.send('user deleted')
    }else{
        res.send('user not found');
    }
})

app.listen(port,()=>{
    console.log('server is running');
})
